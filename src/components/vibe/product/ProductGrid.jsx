import ProductCard from '../product/ProductCard';

export default function ProductGrid({ items, columns }) {
  const colClass =
    columns || 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';
  return (
    <div className={`grid ${colClass} gap-x-4 gap-y-8`}>
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
