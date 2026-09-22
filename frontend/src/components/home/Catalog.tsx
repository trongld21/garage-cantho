'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Search } from 'lucide-react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { filterProducts, filterCars, selectProductCollection } from '@/lib/catalog';
import type { ProductItem, CarItem } from '@/types';

const money = (value: number) => value.toLocaleString('vi-VN') + ' đ';
export function ProductCatalog({ products, searchable = false, initialCategory = 'all', initialSearch = '', collections = false }: { products: ProductItem[]; searchable?: boolean; initialCategory?: string; initialSearch?: string; collections?: boolean }) {
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState('featured');
  const [collection, setCollection] = useState('all');
  const categories = ['all', ...new Set(products.map(p => p.category))];
  const visible = useMemo(() => filterProducts(selectProductCollection(products, collection), category, search, sort), [products, collection, category, search, sort]);
  return <div>
    {collections && <div className="auto-collection-tabs" aria-label="Nhóm sản phẩm">{[['all', 'Tất cả sản phẩm'], ['featured', 'Sản phẩm nổi bật'], ['sale', 'Sản phẩm khuyến mãi']].map(([value, label]) => <button key={value} aria-pressed={collection === value} className={collection === value ? 'active' : ''} onClick={() => setCollection(value)}>{label}</button>)}</div>}
    <div className="auto-catalog-toolbar"><div className="auto-tabs" aria-label="Danh mục sản phẩm">{categories.map(c => <button key={c} aria-pressed={category === c} onClick={() => setCategory(c)} className={category === c ? 'active' : ''}>{c === 'all' ? 'Tất cả sản phẩm' : c}</button>)}</div><label className="auto-sort">Sắp xếp <select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Nổi bật</option><option value="price-asc">Giá thấp đến cao</option><option value="price-desc">Giá cao đến thấp</option><option value="sale">Khuyến mãi</option></select></label></div>
    {searchable && <div className="auto-catalog-search"><Search size={18} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm tên sản phẩm hoặc thương hiệu…" aria-label="Tìm trong sản phẩm" /><span>{visible.length} sản phẩm</span></div>}
    <div className="auto-product-grid">{visible.map(product => <Link key={product.id} href={`/store/${product.slug}`} className="auto-product-card"><div className="auto-product-image"><ImageWithFallback src={product.image} alt={product.name} loading="lazy" fallbackType="product" />{product.sale_price != null && product.sale_price < product.price && <span className="auto-sale">-{Math.round((1 - product.sale_price / product.price) * 100)}%</span>}<span className="auto-card-arrow"><ArrowUpRight size={18} /></span></div><div className="auto-product-body"><p className="auto-card-meta">{product.brand} / {product.category}</p><h3>{product.name}</h3><div className="auto-price">{money(product.sale_price ?? product.price)}{product.sale_price != null && <del>{money(product.price)}</del>}</div><p className="auto-stock">{product.stock > 0 ? 'Còn hàng · Liên hệ tư vấn lắp đặt' : 'Liên hệ đặt hàng'}</p></div></Link>)}</div>
    {visible.length === 0 && <div className="auto-empty"><h3>Chưa có sản phẩm phù hợp</h3><p>Thử từ khóa khác hoặc xem toàn bộ sản phẩm.</p><button className="auto-button" onClick={() => { setSearch(''); setCategory('all'); setCollection('all'); }}>Xóa bộ lọc</button></div>}
  </div>;
}
export function CarCatalog({ cars, initialBrand = 'all', initialType = 'all' }: { cars: CarItem[]; initialBrand?: string; initialType?: string }) {
  const [brand, setBrand] = useState(initialBrand);
  const [type, setType] = useState(initialType);
  const brands = [...new Set(cars.map(car => car.title.replace(/^Cho Thuê Xe Du Lịch /i, '').split(' ')[0]))];
  const visible = filterCars(cars, brand, type);
  return <><div className="auto-catalog-toolbar"><div className="auto-tabs" aria-label="Lọc hãng xe">{['all', ...brands].map(b => <button key={b} onClick={() => setBrand(b)} aria-pressed={brand === b} className={brand === b ? 'active' : ''}>{b === 'all' ? 'Tất cả hãng xe' : b}</button>)}</div><label className="auto-sort">Nhu cầu <select value={type} onChange={e => setType(e.target.value)}><option value="all">Tất cả xe</option><option value="sale">Mua xe</option><option value="rent">Thuê xe</option></select></label></div><div className="auto-product-grid">{visible.map(car => <Link className="auto-car-card" key={car.id} href={`/cars/${car.slug}`}><div className="auto-car-image"><ImageWithFallback src={car.image} alt={car.title} loading="lazy" /><span className="auto-car-type">{car.listing_type === 'sale' ? 'XE MUA BÁN' : 'XE CHO THUÊ'}</span></div><div className="auto-product-body"><p className="auto-card-meta">{car.year} · {car.transmission} · {car.mileage}</p><h3>{car.title}</h3><div className="auto-price">{money(car.price)}{car.listing_type === 'rent' && <small>/ ngày</small>}<ArrowUpRight size={20} /></div></div></Link>)}</div>{visible.length === 0 && <div className="auto-empty"><p>Chưa có xe phù hợp với lựa chọn này.</p><button className="auto-button" onClick={() => { setBrand('all'); setType('all'); }}>Xem tất cả xe</button></div>}</>;
}
