import { Suspense } from 'react';
import ProductListPage from './ProductListPage';

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductListPage />
    </Suspense>
  );
}
