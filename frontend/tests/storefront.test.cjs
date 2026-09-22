const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { runInNewContext } = require('node:vm');
const ts = require('typescript');

function loadTs(file, imports = {}) {
  const exports = {};
  const source = ts.transpileModule(readFileSync(resolve(__dirname, '..', file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  runInNewContext(source, { exports, require: name => imports[name], process: { env: {} } });
  return exports;
}
const { filterProducts, filterCars, selectProductCollection } = loadTs('src/lib/catalog.ts');
const products = [
  { id: 1, name: 'Màn hình Android', brand: 'OLEDPro', category: 'Đồ chơi xe', price: 500, sale_price: 200, is_featured: true },
  { id: 2, name: 'Dầu nhớt', brand: 'Mobil 1', category: 'Phụ tùng', price: 300, sale_price: null, is_featured: false },
  { id: 3, name: 'Cảm biến', brand: 'Steelmate', category: 'Đồ chơi xe', price: 400, sale_price: null, is_featured: false },
];
const ids = items => Array.from(items, item => item.id);
test('sort uses discounted prices without mutating the source catalog', () => {
  assert.deepEqual(ids(filterProducts(products, 'all', '', 'price-asc')), [1, 2, 3]);
  assert.deepEqual(ids(filterProducts(products, 'all', '', 'price-desc')), [3, 2, 1]);
  assert.deepEqual(ids(products), [1, 2, 3]);
});
test('search combines category with case-insensitive, trimmed brand or product text', () => {
  assert.deepEqual(ids(filterProducts(products, 'Phụ tùng', ' MOBIL ', 'featured')), [2]);
  assert.deepEqual(ids(filterProducts(products, 'Đồ chơi xe', 'Mobil', 'featured')), []);
  assert.deepEqual(ids(filterProducts(products, 'all', 'màn hình', 'sale')), [1]);
});
test('car brand and rental filters work together', () => {
  const cars = [{ id: 1, title: 'Toyota Fortuner', listing_type: 'sale' }, { id: 2, title: 'Cho Thuê Xe Du Lịch Toyota Innova', listing_type: 'rent' }, { id: 3, title: 'Ford Everest', listing_type: 'sale' }];
  assert.deepEqual(ids(filterCars(cars, 'Toyota', 'rent')), [2]);
  assert.deepEqual(ids(filterCars(cars, 'Ford', 'rent')), []);
  assert.deepEqual(ids(filterCars(cars, 'all', 'all')), [1, 2, 3]);
});
test('booking only returns a receipt after server persistence is acknowledged', async () => {
  let sent;
  const { apiService } = loadTs('src/services/api.ts', { axios: { create: () => ({ post: async (url, payload) => { sent = { url, payload }; return { data: { success: true, data: { id: 42 } } }; } }) } });
  const payload = { customer_name: 'Test', phone: '0912345678' };
  const result = await apiService.createBooking(payload);
  assert.equal(result.booking_id, 'TNB-42');
  assert.equal(sent.url, '/bookings');
  assert.equal(sent.payload, payload);
});
test('booking failures and malformed acknowledgements never become fake success', async () => {
  for (const post of [async () => { throw new Error('Offline'); }, async () => ({ data: { success: false } })]) {
    const { apiService } = loadTs('src/services/api.ts', { axios: { create: () => ({ post }) } });
    await assert.rejects(apiService.createBooking({}));
  }
});

test('promotion tab excludes prices that are not actual discounts', () => {
  const catalog = [...products,
    { id: 4, price: 300, sale_price: 300 },
    { id: 5, price: 300, sale_price: 400 },
    { id: 6, price: 300, sale_price: 0 },
  ];
  assert.deepEqual(ids(selectProductCollection(catalog, 'sale')), [1, 6]);
  assert.deepEqual(ids(selectProductCollection(catalog, 'featured')), [1]);
  assert.deepEqual(ids(filterProducts(selectProductCollection(products, 'sale'), 'Phụ tùng', '', 'featured')), []);
});
