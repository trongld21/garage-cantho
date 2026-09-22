import type { CarItem, ProductItem } from '@/types';

export function filterProducts(products: ProductItem[], category: string, search: string, sort: string) {
  const query = search.trim().toLocaleLowerCase('vi');
  return products.filter(product =>
    (category === 'all' || product.category === category) &&
    `${product.name} ${product.brand}`.toLocaleLowerCase('vi').includes(query)
  ).sort((a, b) => {
    if (sort === 'price-asc') return (a.sale_price ?? a.price) - (b.sale_price ?? b.price);
    if (sort === 'price-desc') return (b.sale_price ?? b.price) - (a.sale_price ?? a.price);
    if (sort === 'sale') return Number(b.sale_price != null) - Number(a.sale_price != null);
    return Number(b.is_featured) - Number(a.is_featured);
  });
}

export function filterCars(cars: CarItem[], brand: string, type: string) {
  return cars.filter(car =>
    (brand === 'all' || car.title.toLowerCase().includes(brand.toLowerCase())) &&
    (type === 'all' || car.listing_type === type)
  );
}

export function selectProductCollection(products: ProductItem[], collection: string) {
  if (collection === 'featured') return products.filter(product => product.is_featured);
  if (collection === 'sale') return products.filter(product => product.sale_price != null && product.sale_price < product.price);
  return products;
}
