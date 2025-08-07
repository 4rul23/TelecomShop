import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      <section className="relative overflow-hidden">


        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1.5" fill="#ef4444"/>
                <circle cx="15" cy="15" r="0.8" fill="#ef4444" opacity="0.5"/>
                <circle cx="45" cy="45" r="0.8" fill="#ef4444" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="60" height="60" fill="url(#hexPattern)"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">


            <div className="space-y-8 lg:space-y-10">


              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[0.9]">
                  <span className="block">Peralatan</span>
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
                      Telekomunikasi
                    </span>
                    <div className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-red-400 to-red-600 opacity-30 rounded-full"></div>
                  </span>
                  <span className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-gray-700 font-semibold mt-4">
                    untuk SMK
                  </span>
                </h1>


                <div className="space-y-4 max-w-2xl">
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed font-medium">
                    Lengkapi <span className="relative inline-block">
                      <span className="font-bold text-gray-800 bg-gradient-to-r from-yellow-100 to-yellow-200 px-3 py-2 rounded-xl shadow-sm">
                        laboratorium SMK
                      </span>
                    </span> Anda dengan peralatan telekomunikasi berkualitas tinggi.
                  </p>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-500 leading-relaxed">
                    Dapatkan tools terbaik untuk praktikum dan pembelajaran siswa dengan teknologi terdepan dan standar industri.
                  </p>
                </div>
              </div>


              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link
                  href="/produk"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center gap-3">
                    Jelajahi Produk
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>

                <Link
                  href="/cart"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white/95 backdrop-blur-sm text-gray-900 font-bold text-lg rounded-2xl border-2 border-gray-200 hover:border-red-300 hover:bg-red-50/80 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <span className="flex items-center gap-3">
                    Lihat Keranjang
                    <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 0L5 7m0 0h14m-14 0L3 3m4 4v10a2 2 0 002 2h6a2 2 0 002-2V7" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>


            <div className="relative lg:pl-8">


              <div className="relative bg-gradient-to-br from-white via-red-50/40 to-red-100/50 rounded-3xl p-8 lg:p-12 shadow-xl border border-red-100/60 backdrop-blur-sm">


                <div className="absolute top-6 left-6 w-8 h-8 border-l-3 border-t-3 border-red-300 rounded-tl-xl opacity-70"></div>
                <div className="absolute top-6 right-6 w-8 h-8 border-r-3 border-t-3 border-red-300 rounded-tr-xl opacity-70"></div>
                <div className="absolute bottom-6 left-6 w-8 h-8 border-l-3 border-b-3 border-red-300 rounded-bl-xl opacity-70"></div>
                <div className="absolute bottom-6 right-6 w-8 h-8 border-r-3 border-b-3 border-red-300 rounded-br-xl opacity-70"></div>


                <div className="absolute top-8 left-8 opacity-15">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <g fill="#dc2626">
                      {[...Array(5)].map((_, row) =>
                        [...Array(5)].map((_, col) => (
                          <circle
                            key={`${row}-${col}`}
                            cx={10 + col * 15}
                            cy={10 + row * 15}
                            r="2"
                          />
                        ))
                      )}
                    </g>
                    <path d="M10,40 L70,40" stroke="#dc2626" strokeWidth="3" opacity="0.8"/>
                    <circle cx="70" cy="40" r="4" fill="#dc2626"/>
                    <polygon points="66,36 66,44 74,40" fill="#dc2626"/>
                  </svg>
                </div>

                <div className="absolute bottom-8 right-8 opacity-12">
                  <svg width="70" height="70" viewBox="0 0 70 70">
                    <g fill="#dc2626">
                      {[...Array(4)].map((_, row) =>
                        [...Array(4)].map((_, col) => (
                          <circle
                            key={`${row}-${col}`}
                            cx={12 + col * 15}
                            cy={12 + row * 15}
                            r="2"
                          />
                        ))
                      )}
                    </g>
                    <path d="M57,35 L12,35" stroke="#dc2626" strokeWidth="3" opacity="0.9"/>
                    <circle cx="12" cy="35" r="4" fill="#dc2626"/>
                    <polygon points="16,31 16,39 8,35" fill="#dc2626"/>
                  </svg>
                </div>


                <div className="flex items-center justify-center relative py-8">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-red-100/60 to-red-200/40 opacity-50 animate-pulse"></div>
                  </div>

                  <Image
                    src="/tel.png"
                    alt="Peralatan Telekomunikasi SMK"
                    width={400}
                    height={400}
                    className="object-contain relative z-10 transform transition-transform duration-500 hover:scale-105 filter drop-shadow-lg"
                    priority
                  />
                </div>


                <div className="absolute top-4 left-4 w-3 h-3 bg-red-500 rounded-full opacity-60 animate-bounce shadow-sm"></div>
                <div className="absolute bottom-4 right-4 w-2.5 h-2.5 bg-red-400 rounded-full opacity-50 animate-bounce shadow-sm" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute top-1/3 right-8 w-1.5 h-1.5 bg-red-600 rounded-full opacity-70 animate-pulse"></div>
                <div className="absolute bottom-1/3 left-8 w-1.5 h-1.5 bg-red-300 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>


              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-red-200 to-red-300 rounded-full opacity-60 blur-sm animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-red-300 to-red-400 rounded-full opacity-50 blur-sm animate-pulse" style={{animationDelay: '1s'}}></div>


              <div className="absolute top-1/4 -left-4 w-2 h-16 bg-gradient-to-b from-red-400 to-transparent opacity-25 rounded-full transform rotate-12"></div>
              <div className="absolute bottom-1/4 -right-4 w-1.5 h-12 bg-gradient-to-t from-red-500 to-transparent opacity-20 rounded-full transform -rotate-12"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
