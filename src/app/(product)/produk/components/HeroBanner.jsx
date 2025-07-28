'use client';

export default function HeroBanner({ searchTerm, resultsCount }) {
  return (
    <div className="relative h-48 md:h-64 mb-8 rounded-xl overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/image.png')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 via-red-800/60 to-transparent" />

      <div className="relative h-full flex flex-col justify-center px-6 md:px-12">
        <div className="max-w-2xl">
          {searchTerm ? (
            <>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Hasil Pencarian: "{searchTerm}"
              </h1>
              <p className="text-lg md:text-xl text-red-100 mb-6">
                Ditemukan {resultsCount} produk yang sesuai dengan pencarian Anda
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Peralatan Telekomunikasi
              </h1>
              <p className="text-lg md:text-xl text-red-100 mb-6">
                Solusi lengkap untuk kebutuhan komunikasi modern Anda
              </p>
            </>
          )}
          <div className="flex flex-wrap gap-3">
            <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              Kualitas Terjamin
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              Garansi Resmi
            </span>
            <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              Support 24/7
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
