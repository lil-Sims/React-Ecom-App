import { useState } from 'react';
import { useCategories, useProducts } from '../api/queries';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [category, setCategory] = useState('');
  const { data: categories, isLoading: catsLoading, isError: catsError } = useCategories();
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useProducts(category || undefined);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value === '' ? '' : value);
  };

  return (
    <section>
      <h2>Products</h2>

      <div className="controls">
        <label htmlFor="category">Filter by category:</label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          <option value="">All</option>
          {catsLoading && <option disabled>Loading...</option>}
          {catsError && <option disabled>Error loading categories</option>}
          {!catsLoading && !catsError && categories?.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {productsLoading && <p>Loading products...</p>}
      {productsError && <p>Error loading products.</p>}

      <div className="grid">
        {products?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
