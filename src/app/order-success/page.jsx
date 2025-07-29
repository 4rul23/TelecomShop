import { Suspense } from 'react';
import OrderSuccessContent from './OrderSuccessContent';

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
