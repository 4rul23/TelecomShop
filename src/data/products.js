// Products database with real images from public/products/
export const PRODUCTS_DB = [
  {
    id: 1,
    name: "Antena TP-Link CPE605 - Outdoor Wireless CPE 5GHz",
    slug: "antena-tp-link-cpe605",
    price: 1850000,
    originalPrice: 2100000,
    image: "/products/TP‑Link TL‑WA801ND – Access Point Wireless N300 (2.4 GHz).jpeg",
    category: "Wireless",
    brand: "TP-Link",
    description: "Antena outdoor 5GHz dengan gain tinggi 23dBi untuk koneksi jarak jauh. Ideal untuk point-to-point atau point-to-multipoint. Tahan terhadap kondisi cuaca ekstrem dengan desain IP65.",
    specifications: {
      "Frequency": "5GHz",
      "Speed": "Up to 150Mbps",
      "Range": "Up to 15km",
      "Power": "802.3af PoE"
    },
    stock: 15,
    rating: 4.5,
    reviews: 28,
    dateAdded: "2024-01-15"
  },
  {
    id: 2,
    name: "Cable Tie",
    slug: "cable-tie",
    price: 25000,
    originalPrice: 35000,
    image: "/products/Cable Tie.jpg",
    category: "Accessories",
    brand: "Generic",
    description: "Cable tie digunakan untuk merapikan dan mengikat kabel dalam instalasi jaringan. Terbuat dari nylon berkualitas tinggi yang kuat dan tahan lama. Tersedia dalam berbagai ukuran.",
    specifications: {
      "Material": "Nylon",
      "Length": "200mm",
      "Width": "4.8mm",
      "Color": "Black"
    },
    stock: 500,
    rating: 4.2,
    reviews: 45,
    dateAdded: "2024-01-20"
  },
  {
    id: 3,
    name: "Converter TP-Link TL-FC311A-2 + TL-FC311B",
    slug: "converter-tp-link-fc311",
    price: 850000,
    originalPrice: 950000,
    image: "/products/Converter TP-Link TL-FC311A-2 + TL-FC311B.jpg",
    category: "Fiber Optic",
    brand: "TP-Link",
    description: "Media converter ini mengubah sinyal dari kabel tembaga menjadi fiber optic dan sebaliknya. Mendukung transmisi jarak jauh dengan kualitas tinggi. Cocok untuk menghubungkan dua jaringan berbeda.",
    specifications: {
      "Port": "1x RJ45, 1x SFP",
      "Speed": "10/100/1000Mbps",
      "Distance": "Up to 20km",
      "Standard": "IEEE 802.3z"
    },
    stock: 8,
    rating: 4.7,
    reviews: 12,
    dateAdded: "2024-01-25"
  },
  {
    id: 4,
    name: "Crimping Tool",
    slug: "crimping-tool",
    price: 185000,
    originalPrice: 220000,
    image: "/products/Crimping Tool.jpg",
    category: "Tools",
    brand: "Generic",
    description: "Crimping tool digunakan untuk memasang konektor RJ45, RJ11, dan sejenisnya pada kabel jaringan atau telepon. Dilengkapi pemotong dan pengupas kabel. Desain ergonomis untuk kenyamanan kerja.",
    specifications: {
      "Type": "RJ45/RJ11",
      "Material": "Steel",
      "Length": "200mm",
      "Function": "Cut, Strip, Crimp"
    },
    stock: 25,
    rating: 4.3,
    reviews: 67,
    dateAdded: "2024-02-01"
  },
  {
    id: 5,
    name: "Fiber Optic Pigtail SC‑LC Simplex Single‑Mode UPC",
    slug: "pigtail-sc-lc-upc",
    price: 45000,
    originalPrice: 55000,
    image: "/products/Fiber Optic Pigtail SC‑LC Simplex Single‑Mode UPC.webp",
    category: "Fiber Optic",
    brand: "Generic",
    description: "Kabel serat optik pendek dengan konektor di satu ujung, digunakan untuk menyambungkan serat optik ke perangkat jaringan. Produk ini menggunakan konektor SC atau LC dengan finishing UPC (Ultra Physical Contact) yang menghasilkan redaman rendah dan kualitas transmisi tinggi. Dirancang untuk jaringan single mode, pigtail ini mampu menghantarkan data jarak jauh dengan kecepatan stabil. Lapisan pelindungnya kuat dan fleksibel, meminimalkan risiko kerusakan saat instalasi. Cocok digunakan pada patch panel, ODF, atau penyambungan splicing di proyek FTTH dan jaringan optik lainnya.",
    specifications: {
      "Connector": "SC to LC",
      "Type": "Single-mode",
      "Polish": "UPC",
      "Length": "1.5m"
    },
    stock: 100,
    rating: 4.4,
    reviews: 23,
    dateAdded: "2024-02-05"
  },
  {
    id: 6,
    name: "Kabel LAN Belden UTP Cat6 Cable",
    slug: "kabel-lan-belden-cat6",
    price: 8500,
    originalPrice: 12000,
    image: "/products/Kabel LAN  Belden UTP Cat6 Cable (Solid Bare Copper, UTP).jpg",
    category: "Kabel",
    brand: "Belden",
    description: "Kabel LAN Belden Cat6 berbahan tembaga murni solid, memastikan transmisi data cepat dan stabil. Cocok untuk jaringan rumah, kantor, maupun industri. Memiliki isolasi berkualitas untuk mengurangi interferensi.",
    specifications: {
      "Category": "Cat6",
      "Type": "UTP",
      "Conductor": "Solid Bare Copper",
      "Length": "Per meter"
    },
    stock: 1000,
    rating: 4.8,
    reviews: 156,
    dateAdded: "2024-02-10"
  },
  {
    id: 7,
    name: "Keystone Jack",
    slug: "keystone-jack",
    price: 15000,
    originalPrice: 20000,
    image: "/products/Keystone Jack.jpg",
    category: "Konektor",
    brand: "Generic",
    description: "Digunakan sebagai port koneksi di panel patch atau wall plate. Kompatibel dengan kabel UTP Cat5e/Cat6. Memudahkan manajemen jaringan dan penggantian port.",
    specifications: {
      "Category": "Cat6",
      "Type": "UTP",
      "Color": "White",
      "Standard": "T568A/B"
    },
    stock: 200,
    rating: 4.1,
    reviews: 89,
    dateAdded: "2024-02-15"
  },
  {
    id: 8,
    name: "Konektor LC (Lucent Connector)",
    slug: "konektor-lc",
    price: 35000,
    originalPrice: 45000,
    image: "/products/Konektor LC (Lucent Connector).png",
    category: "Konektor",
    brand: "Generic",
    description: "Konektor LC adalah tipe konektor fiber optic dengan ukuran kecil dan mekanisme latch. Cocok untuk aplikasi high-density pada data center. Menawarkan kinerja tinggi dengan low insertion loss.",
    specifications: {
      "Type": "LC",
      "Mode": "Single/Multi-mode",
      "Polish": "UPC/APC",
      "Insertion Loss": "<0.2dB"
    },
    stock: 75,
    rating: 4.6,
    reviews: 34,
    dateAdded: "2024-02-20"
  },
  {
    id: 9,
    name: "Konektor RJ45 Cat 6 UTP",
    slug: "konektor-rj45-cat6",
    price: 2500,
    originalPrice: 3500,
    image: "/products/Konektor RJ45 Cat 6 UTP Connector.jpeg",
    category: "Konektor",
    brand: "Generic",
    description: "Konektor RJ45 Cat6 untuk kabel UTP, mendukung transmisi data hingga 1 Gbps. Desain presisi untuk meminimalkan noise dan crosstalk. Digunakan pada instalasi jaringan Ethernet.",
    specifications: {
      "Category": "Cat6",
      "Type": "UTP",
      "Material": "Gold plated",
      "Quantity": "Per piece"
    },
    stock: 1000,
    rating: 4.2,
    reviews: 234,
    dateAdded: "2024-02-25"
  },
  {
    id: 10,
    name: "Konektor ST (Straight Tip)",
    slug: "konektor-st",
    price: 40000,
    originalPrice: 50000,
    image: "/products/Konektor ST (Straight Tip).jpg",
    category: "Konektor",
    brand: "Generic",
    description: "Konektor ST untuk sambungan fiber optic dengan sistem bayonet. Cocok digunakan pada instalasi jaringan LAN berbasis fiber. Terbuat dari bahan berkualitas tinggi untuk koneksi stabil.",
    specifications: {
      "Type": "ST",
      "Mode": "Single/Multi-mode",
      "Coupling": "Bayonet",
      "Insertion Loss": "<0.3dB"
    },
    stock: 60,
    rating: 4.4,
    reviews: 18,
    dateAdded: "2024-03-01"
  },
  {
    id: 11,
    name: "LS Kabel Coaxial RG6+ Power (300 m Roll)",
    slug: "kabel-coaxial-rg6-power",
    price: 2800000,
    originalPrice: 3200000,
    image: "/products/LS Kabel Coaxial RG6+ Power (300 m Roll).jpg",
    category: "Kabel",
    brand: "LS Cable",
    description: "Kabel coaxial RG6+ dengan jalur power, panjang 300 meter, cocok untuk instalasi CCTV dan antena parabola. Lapisan pelindung ganda memastikan sinyal stabil dan tahan gangguan elektromagnetik.",
    specifications: {
      "Type": "RG6 + Power",
      "Length": "300m",
      "Impedance": "75 Ohm",
      "Shield": "Quad shield"
    },
    stock: 5,
    rating: 4.9,
    reviews: 8,
    dateAdded: "2024-03-05"
  },
  {
    id: 12,
    name: "Modem TP-Link TL-MR6400 (4G LTE Router-Modem)",
    slug: "modem-tp-link-mr6400",
    price: 1250000,
    originalPrice: 1450000,
    image: "/products/Modem TP-Link TL-MR6400 (4G LTE Router-Modem).jpeg",
    category: "Networking",
    brand: "TP-Link",
    description: "Router-modem TL-MR6400 mendukung koneksi 4G LTE dengan kecepatan hingga 150 Mbps. Dilengkapi slot SIM card dan 4 port LAN. Ideal untuk lokasi yang belum terjangkau jaringan kabel.",
    specifications: {
      "Network": "4G LTE",
      "WiFi": "802.11n 300Mbps",
      "Ports": "3x LAN, 1x WAN",
      "SIM": "Standard SIM"
    },
    stock: 12,
    rating: 4.5,
    reviews: 76,
    dateAdded: "2024-03-10"
  },
  {
    id: 13,
    name: "Optical Power Meter",
    slug: "optical-power-meter",
    price: 950000,
    originalPrice: 1150000,
    image: "/products/Optical Power Meter_.jpg",
    category: "Tools",
    brand: "Generic",
    description: "Optical power meter digunakan untuk mengukur daya optik pada jaringan fiber. Akurat dalam mendeteksi loss dan kekuatan sinyal. Cocok untuk instalasi, perawatan, dan troubleshooting jaringan optik.",
    specifications: {
      "Range": "-70 to +10 dBm",
      "Wavelength": "850/1300/1310/1550nm",
      "Accuracy": "±0.05dB",
      "Display": "LCD"
    },
    stock: 6,
    rating: 4.7,
    reviews: 14,
    dateAdded: "2024-03-15"
  },
  {
    id: 14,
    name: "Patch Cord SC–SC Simplex Single‑Mode APC (10 m)",
    slug: "patch-cord-sc-sc-apc-10m",
    price: 125000,
    originalPrice: 150000,
    image: "/products/Patch Cord SC–SC Simplex Single‑Mode APC (10 m).jpeg",
    category: "Fiber Optic",
    brand: "Generic",
    description: "Kabel patch cord SC-SC simplex single-mode berjenis UPC, panjang 10 meter. Digunakan untuk menghubungkan perangkat jaringan fiber optic dengan akurasi tinggi. Memiliki lapisan pelindung untuk mencegah kerusakan serat.",
    specifications: {
      "Connector": "SC to SC",
      "Type": "Single-mode",
      "Polish": "APC",
      "Length": "10m"
    },
    stock: 30,
    rating: 4.6,
    reviews: 22,
    dateAdded: "2024-03-20"
  },
  {
    id: 15,
    name: "Patch Cord SC–SC Simplex Single‑Mode UPC (10 m)",
    slug: "patch-cord-sc-sc-upc-10m",
    price: 115000,
    originalPrice: 140000,
    image: "/products/Patch Cord SC–SC Simplex Single‑Mode UPC (10 m).jpeg",
    category: "Fiber Optic",
    brand: "Generic",
    description: "Kabel fiber optik dengan konektor SC berpolish APC untuk mengurangi pantulan cahaya. Dirancang untuk jaringan single-mode jarak jauh dengan transmisi stabil. Cocok untuk instalasi FTTH, data center, dan perangkat telekomunikasi.",
    specifications: {
      "Connector": "SC to SC",
      "Type": "Single-mode",
      "Polish": "UPC",
      "Length": "10m"
    },
    stock: 35,
    rating: 4.5,
    reviews: 19,
    dateAdded: "2024-03-25"
  },
  {
    id: 16,
    name: "Router Wi-fi TP-Link Archer C6",
    slug: "router-tp-link-archer-c6",
    price: 485000,
    originalPrice: 550000,
    image: "/products/Router Wi-fi TP-Link Archer C6.jpeg",
    category: "Networking",
    brand: "TP-Link",
    description: "Router dual-band AC1200 dengan teknologi MU-MIMO untuk koneksi cepat dan stabil ke banyak perangkat. Mendukung mode router dan access point. Dilengkapi empat antena eksternal untuk jangkauan sinyal luas.",
    specifications: {
      "Standard": "802.11ac",
      "Speed": "1200Mbps",
      "Band": "Dual-band",
      "Antennas": "4x external"
    },
    stock: 20,
    rating: 4.8,
    reviews: 142,
    dateAdded: "2024-04-01"
  },
  {
    id: 17,
    name: "Splicer (Fusion)",
    slug: "splicer-fusion",
    price: 15500000,
    originalPrice: 17000000,
    image: "/products/Splicer (Fusion).jpg",
    category: "Tools",
    brand: "Generic",
    description: "Alat penyambung fiber optik menggunakan metode fusi untuk hasil sambungan dengan loss sangat rendah. Cocok untuk proyek instalasi jaringan backbone atau distribusi. Dilengkapi layar LCD dan sistem align otomatis untuk presisi tinggi.",
    specifications: {
      "Type": "Core alignment",
      "Splice Loss": "<0.02dB",
      "Splice Time": "7 seconds",
      "Display": "5.7 inch LCD"
    },
    stock: 2,
    rating: 4.9,
    reviews: 3,
    dateAdded: "2024-04-05"
  },
  {
    id: 18,
    name: "Splitter",
    slug: "splitter",
    price: 185000,
    originalPrice: 220000,
    image: "/products/Splitter_.jpg",
    category: "Fiber Optic",
    brand: "Generic",
    description: "Perangkat pasif untuk membagi sinyal optik menjadi beberapa jalur tanpa memerlukan daya listrik. Umumnya digunakan dalam instalasi jaringan FTTH atau FTTx. Memiliki tingkat redaman rendah untuk menjaga kualitas transmisi data.",
    specifications: {
      "Type": "PLC Splitter",
      "Ratio": "1x8",
      "Insertion Loss": "<10.5dB",
      "Operating Temperature": "-40°C to +85°C"
    },
    stock: 15,
    rating: 4.4,
    reviews: 27,
    dateAdded: "2024-04-10"
  },
  {
    id: 19,
    name: "Switch 8 Port D-Link DES-1008C",
    slug: "switch-dlink-des-1008c",
    price: 165000,
    originalPrice: 195000,
    image: "/products/Switch 8 Port D-Link DES-1008C.jpeg",
    category: "Networking",
    brand: "D-Link",
    description: "Switch Ethernet dengan 8 port 10/100 Mbps untuk membagi koneksi internet ke banyak perangkat. Desain plug-and-play tanpa konfigurasi, cocok untuk rumah atau kantor kecil. Hemat energi dengan teknologi Green Ethernet.",
    specifications: {
      "Ports": "8x 10/100Mbps",
      "Switching Capacity": "1.6Gbps",
      "MAC Address": "1K",
      "Power": "External adapter"
    },
    stock: 40,
    rating: 4.3,
    reviews: 95,
    dateAdded: "2024-04-15"
  },
  {
    id: 20,
    name: "Tester Kabel",
    slug: "tester-kabel",
    price: 125000,
    originalPrice: 155000,
    image: "/products/Tester Kabel_.jpg",
    category: "Tools",
    brand: "Generic",
    description: "Alat untuk menguji koneksi kabel LAN atau jaringan agar memastikan instalasi bebas dari putus atau sambungan yang salah. Memiliki indikator LED untuk menampilkan status koneksi setiap pin. Praktis digunakan oleh teknisi jaringan maupun instalator.",
    specifications: {
      "Type": "UTP/STP/Coaxial",
      "Function": "Continuity test",
      "LED": "Status indicator",
      "Power": "9V battery"
    },
    stock: 18,
    rating: 4.2,
    reviews: 41,
    dateAdded: "2024-04-20"
  },
  {
    id: 21,
    name: "TP‑Link TL‑WA801ND – Access Point Wireless N300",
    slug: "tp-link-wa801nd-access-point",
    price: 285000,
    originalPrice: 325000,
    image: "/products/images.jpg",
    category: "Wireless",
    brand: "TP-Link",
    description: "Access Point Wireless N300 ini dirancang untuk memperluas jaringan Wi-Fi dengan kecepatan hingga 300 Mbps di frekuensi 2.4 GHz. Ideal untuk penggunaan di rumah, kantor kecil, atau area publik. Dilengkapi dengan antena eksternal yang dapat dilepas untuk jangkauan sinyal optimal.",
    specifications: {
      "Standard": "802.11n",
      "Speed": "300Mbps",
      "Frequency": "2.4GHz",
      "Mode": "AP/Client/Repeater"
    },
    stock: 25,
    rating: 4.6,
    reviews: 58,
    dateAdded: "2024-04-25"
  },
  {
    id: 22,
    name: "CCTV Camera",
    slug: "cctv-camera",
    price: 750000,
    originalPrice: 850000,
    image: "/products/CCTV.jpg",
    category: "Security",
    brand: "Generic",
    description: "Kamera pengawas untuk keamanan rumah, kantor, atau area publik. Menyediakan rekaman real-time berkualitas tinggi. Mendukung pemantauan jarak jauh.",
    specifications: {
      "Resolution": "1080p HD",
      "Night Vision": "Up to 20m",
      "Power": "12V DC",
      "Lens": "3.6mm fixed"
    },
    stock: 30,
    rating: 4.3,
    reviews: 42,
    dateAdded: "2024-05-01"
  },
  {
    id: 23,
    name: "Ground Tester - Earth Resistance Tester",
    slug: "ground-tester-earth-resistance",
    price: 2500000,
    originalPrice: 2800000,
    image: "/products/Ground Tester -Earth Resistance Tester.jpeg",
    category: "Tools",
    brand: "Generic",
    description: "Mengukur tahanan tanah untuk memastikan sistem pembumian aman. Penting pada instalasi listrik dan proteksi petir. Memberikan data presisi tinggi.",
    specifications: {
      "Range": "0.01Ω to 2000Ω",
      "Accuracy": "±2%",
      "Test Voltage": "20V/48V",
      "Display": "Digital LCD"
    },
    stock: 5,
    rating: 4.8,
    reviews: 8,
    dateAdded: "2024-05-05"
  },
  {
    id: 24,
    name: "Laser Fiber Optic",
    slug: "laser-fiber-optic",
    price: 1850000,
    originalPrice: 2100000,
    image: "/products/Laser fiber optic.jpg",
    category: "Tools",
    brand: "Generic",
    description: "Sumber cahaya laser untuk pengujian jaringan fiber optik. Memberikan sinyal stabil untuk deteksi kerusakan atau redaman. Cocok untuk teknisi lapangan dan laboratorium.",
    specifications: {
      "Wavelength": "650nm",
      "Power": "1mW",
      "Connector": "Universal",
      "Battery": "AAA x2"
    },
    stock: 8,
    rating: 4.7,
    reviews: 15,
    dateAdded: "2024-05-10"
  },
  {
    id: 25,
    name: "LS Kabel Coaxial RG6+ Power",
    slug: "ls-kabel-coaxial-rg6-power-per-meter",
    price: 12000,
    originalPrice: 15000,
    image: "/products/LS Kabel Coaxial RG6+ Power.jpg",
    category: "Kabel",
    brand: "LS Cable",
    description: "Kabel coaxial RG6+ dengan jalur power, panjang 300 meter, cocok untuk instalasi CCTV dan antena parabola. Lapisan pelindung ganda memastikan sinyal stabil dan tahan gangguan elektromagnetik.",
    specifications: {
      "Type": "RG6 + Power",
      "Length": "Per meter",
      "Impedance": "75 Ohm",
      "Shield": "Quad shield"
    },
    stock: 500,
    rating: 4.6,
    reviews: 32,
    dateAdded: "2024-05-15"
  },
  {
    id: 26,
    name: "Measuring Receiver",
    slug: "measuring-receiver",
    price: 5500000,
    originalPrice: 6200000,
    image: "/products/Measuring Receiver.jpg",
    category: "Tools",
    brand: "Generic",
    description: "Perangkat pengukur frekuensi dan daya sinyal dengan presisi tinggi. Cocok untuk kalibrasi instrumen laboratorium. Memenuhi standar internasional pengujian.",
    specifications: {
      "Frequency Range": "5-2150 MHz",
      "Input Level": "-30 to +30 dBm",
      "Display": "Color LCD",
      "Power": "Rechargeable battery"
    },
    stock: 3,
    rating: 4.9,
    reviews: 5,
    dateAdded: "2024-05-20"
  },
  {
    id: 27,
    name: "Multimeter Digital",
    slug: "multimeter-digital",
    price: 350000,
    originalPrice: 420000,
    image: "/products/Multimeter.jpg",
    category: "Tools",
    brand: "Generic",
    description: "Alat ukur listrik untuk tegangan, arus, dan resistansi. Dapat digunakan untuk perawatan dan perbaikan peralatan elektronik. Praktis dengan hasil akurat.",
    specifications: {
      "DC Voltage": "200mV-1000V",
      "AC Voltage": "200V-750V",
      "Current": "200μA-10A",
      "Resistance": "200Ω-20MΩ"
    },
    stock: 45,
    rating: 4.4,
    reviews: 78,
    dateAdded: "2024-05-25"
  },
  {
    id: 28,
    name: "ONU (Optical Network Unit)",
    slug: "onu-optical-network-unit",
    price: 450000,
    originalPrice: 520000,
    image: "/products/ONU.jpg",
    category: "Networking",
    brand: "Generic",
    description: "Perangkat penerima sinyal fiber optik dari OLT dan mengubahnya menjadi sinyal data untuk perangkat pengguna. Mendukung koneksi internet cepat dan stabil untuk rumah maupun kantor. Ideal untuk jaringan FTTH dengan kualitas transmisi tinggi.",
    specifications: {
      "Ports": "1x GPON, 4x GE",
      "Speed": "1.25Gbps downstream",
      "Power": "12V/1A",
      "Interface": "SC/UPC"
    },
    stock: 20,
    rating: 4.5,
    reviews: 35,
    dateAdded: "2024-06-01"
  },
  {
    id: 29,
    name: "Optical Spectrum Analyzer (OSA)",
    slug: "optical-spectrum-analyzer",
    price: 25000000,
    originalPrice: 28000000,
    image: "/products/Optical Spectrum Analyzer (OSA).jpg",
    category: "Tools",
    brand: "Generic",
    description: "Alat analisis spektrum optik untuk memeriksa panjang gelombang dan kualitas sinyal fiber. Digunakan pada instalasi dan pemeliharaan jaringan optik. Memberikan hasil visual detail spektrum cahaya.",
    specifications: {
      "Wavelength Range": "600-1700nm",
      "Resolution": "0.1nm",
      "Dynamic Range": "60dB",
      "Display": "7 inch touchscreen"
    },
    stock: 1,
    rating: 5.0,
    reviews: 2,
    dateAdded: "2024-06-05"
  },
  {
    id: 30,
    name: "Patch Cord SC–SC Simplex Single‑Mode APC",
    slug: "patch-cord-sc-sc-apc-alternative",
    price: 95000,
    originalPrice: 115000,
    image: "/products/Patch Cord SC–SC Simplex Single‑Mode APC.jpg",
    category: "Fiber Optic",
    brand: "Generic",
    description: "Patch cord SC ke SC simplex single-mode APC (versi alternatif).",
    specifications: {
      "Connector": "SC to SC",
      "Type": "Single-mode",
      "Polish": "APC",
      "Length": "3m"
    },
    stock: 50,
    rating: 4.5,
    reviews: 28,
    dateAdded: "2024-06-10"
  },
  {
    id: 31,
    name: "Patch Panel 24 Port",
    slug: "patch-panel-24-port",
    price: 285000,
    originalPrice: 340000,
    image: "/products/Patch Panel.jpeg",
    category: "Networking",
    brand: "Generic",
    description: "Panel penghubung kabel jaringan untuk manajemen koneksi yang rapi. Memudahkan identifikasi dan pengaturan port. Cocok untuk data center dan instalasi LAN.",
    specifications: {
      "Ports": "24 port",
      "Category": "Cat6",
      "Mounting": "19 inch rack",
      "Material": "Steel"
    },
    stock: 15,
    rating: 4.6,
    reviews: 22,
    dateAdded: "2024-06-15"
  },
  {
    id: 32,
    name: "Protection Sleeve Fiber Optic",
    slug: "protection-sleeve-fiber-optic",
    price: 15000,
    originalPrice: 20000,
    image: "/products/Protection Sleeve Fiber Optic – Pelindung Sambungan Fiber Optik.jpeg",
    category: "Accessories",
    brand: "Generic",
    description: "Pelindung sambungan fusion splicing fiber optik. Melindungi dari debu, kelembaban, dan tekanan. Menjaga kualitas transmisi sinyal.",
    specifications: {
      "Length": "60mm",
      "Diameter": "3mm",
      "Material": "Heat shrink",
      "Color": "Clear"
    },
    stock: 200,
    rating: 4.2,
    reviews: 55,
    dateAdded: "2024-06-20"
  },
  {
    id: 33,
    name: "Safety Goggles (Kacamata Pelindung)",
    slug: "safety-goggles",
    price: 85000,
    originalPrice: 105000,
    image: "/products/safetyglass.jpg",
    category: "Safety",
    brand: "Generic",
    description: "Melindungi mata dari debu, percikan, atau serpihan. Ideal untuk pekerjaan teknis dan laboratorium. Ringan dan ergonomis.",
    specifications: {
      "Material": "Polycarbonate",
      "Protection": "UV protection",
      "Standard": "ANSI Z87.1",
      "Weight": "35g"
    },
    stock: 100,
    rating: 4.3,
    reviews: 67,
    dateAdded: "2024-06-25"
  },
  {
    id: 34,
    name: "Safety Helmet (Helm Pelindung)",
    slug: "safety-helmet",
    price: 150000,
    originalPrice: 180000,
    image: "/products/safetyhelmet.jpg",
    category: "Safety",
    brand: "Generic",
    description: "Pelindung kepala dari benturan dan jatuhan benda. Wajib untuk pekerjaan konstruksi dan instalasi. Nyaman digunakan dalam waktu lama.",
    specifications: {
      "Material": "ABS",
      "Standard": "SNI 1811:2007",
      "Adjustment": "Ratchet system",
      "Weight": "380g"
    },
    stock: 75,
    rating: 4.4,
    reviews: 43,
    dateAdded: "2024-07-01"
  },
  {
    id: 35,
    name: "Sarung Tangan Anti Listrik",
    slug: "sarung-tangan-anti-listrik",
    price: 125000,
    originalPrice: 155000,
    image: "/products/Sarung Tangan Anti Listrik -Fiber.jpeg",
    category: "Safety",
    brand: "Generic",
    description: "Melindungi tangan dari sengatan listrik dan serpihan fiber. Nyaman digunakan dan anti slip. Cocok untuk teknisi listrik dan optik.",
    specifications: {
      "Material": "Rubber",
      "Voltage": "Up to 1000V",
      "Size": "L/XL",
      "Standard": "IEC 60903"
    },
    stock: 50,
    rating: 4.5,
    reviews: 31,
    dateAdded: "2024-07-05"
  },
  {
    id: 36,
    name: "Solder & Tenol Set",
    slug: "solder-tenol-set",
    price: 95000,
    originalPrice: 120000,
    image: "/products/Solder-tenol.jpg",
    category: "Tools",
    brand: "Generic",
    description: "Alat untuk menyambung komponen elektronik menggunakan timah. Cocok untuk reparasi dan pembuatan rangkaian. Memberikan sambungan kuat dan rapi.",
    specifications: {
      "Power": "30W",
      "Temperature": "200-450°C",
      "Voltage": "220V",
      "Tip": "Changeable"
    },
    stock: 40,
    rating: 4.2,
    reviews: 58,
    dateAdded: "2024-07-10"
  },
  {
    id: 37,
    name: "Spiral Fiber Optic Protector",
    slug: "spiral-fiber-optic-protector",
    price: 25000,
    originalPrice: 35000,
    image: "/products/Spiral Fiber Optic – Pelindung Kabel Fiber Optik.jpeg",
    category: "Accessories",
    brand: "Generic",
    description: "Pelindung kabel berbentuk spiral untuk mencegah tekukan tajam. Menambah umur kabel dan memudahkan pengaturan jalur kabel. Fleksibel dan tahan lama.",
    specifications: {
      "Material": "Polyethylene",
      "Length": "1m",
      "Diameter": "6-8mm",
      "Color": "Black"
    },
    stock: 150,
    rating: 4.1,
    reviews: 39,
    dateAdded: "2024-07-15"
  },
  {
    id: 38,
    name: "Wire Stripper Tool",
    slug: "wire-stripper-tool",
    price: 65000,
    originalPrice: 85000,
    image: "/products/Stripper.jpg",
    category: "Tools",
    brand: "Generic",
    description: "Alat untuk mengupas pelindung kabel fiber atau kabel listrik dengan presisi. Membantu pekerjaan rapi tanpa merusak inti kabel. Ringan dan mudah digunakan.",
    specifications: {
      "Wire Size": "10-24 AWG",
      "Material": "Carbon steel",
      "Length": "200mm",
      "Function": "Strip & cut"
    },
    stock: 60,
    rating: 4.3,
    reviews: 45,
    dateAdded: "2024-07-20"
  },
  {
    id: 39,
    name: "Tang Potong",
    slug: "tang-potong",
    price: 45000,
    originalPrice: 60000,
    image: "/products/Tang potong.jpg",
    category: "Tools",
    brand: "Generic",
    description: "Digunakan untuk memotong kabel, kawat, atau komponen kecil. Tajam dan tahan lama. Ideal untuk pekerjaan instalasi dan reparasi.",
    specifications: {
      "Material": "Carbon steel",
      "Length": "160mm",
      "Cutting Capacity": "2.5mm wire",
      "Handle": "Insulated"
    },
    stock: 80,
    rating: 4.2,
    reviews: 52,
    dateAdded: "2024-07-25"
  },
  {
    id: 40,
    name: "Vector Network Analyzer (VNA)",
    slug: "vector-network-analyzer",
    price: 35000000,
    originalPrice: 38000000,
    image: "/products/Vector Network Analyzer (VNA).jpg",
    category: "Tools",
    brand: "Generic",
    description: "Alat pengukur kinerja jaringan RF/mikrowave seperti impedansi, S-parameter, dan frekuensi. Digunakan di riset dan industri telekomunikasi. Memberikan hasil akurat untuk analisis perangkat.",
    specifications: {
      "Frequency Range": "10 MHz - 8.5 GHz",
      "Dynamic Range": "130 dB",
      "Ports": "2-port",
      "Display": "10.1 inch touchscreen"
    },
    stock: 1,
    rating: 5.0,
    reviews: 1,
    dateAdded: "2024-08-01"
  }
];

// Categories for filtering
export const CATEGORIES = [
  "Konektor",
  "Kabel",
  "Networking",
  "Wireless",
  "Fiber Optic",
  "Tools",
  "Accessories",
  "Security",
  "Safety"
];

// Price ranges for filtering
export const PRICE_RANGES = [
  { label: "Semua", min: 0, max: Infinity },
  { label: "Di bawah 50rb", min: 0, max: 50000 },
  { label: "50rb - 200rb", min: 50000, max: 200000 },
  { label: "200rb - 500rb", min: 200000, max: 500000 },
  { label: "500rb - 1jt", min: 500000, max: 1000000 },
  { label: "Di atas 1jt", min: 1000000, max: Infinity }
];

// Helper functions
export const getAllProducts = () => PRODUCTS_DB;

export const searchProducts = (query, options = {}) => {
  if (!query || query.trim() === '') {
    return getAllProducts();
  }

  const {
    categories = [],
    priceRange = [0, Infinity],
    sortBy = 'name',
    inStock = null
  } = options;

  const searchTerm = query.toLowerCase().trim();

  let filtered = PRODUCTS_DB.filter(product => {
    // Text search
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      (product.specifications && Object.values(product.specifications).some(spec =>
        spec.toLowerCase().includes(searchTerm)
      ));

    // Category filter
    const matchesCategory = categories.length === 0 || categories.includes(product.category);

    // Price filter
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    // Stock filter
    const matchesStock = inStock === null || (inStock ? product.stock > 0 : product.stock === 0);

    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  // Sort results
  switch (sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'newest':
      filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      break;
    default:
      break;
  }

  return filtered;
};

export const getProductById = (id) => {
  return PRODUCTS_DB.find(product => product.id === parseInt(id));
};

export const getProductBySlug = (slug) => {
  return PRODUCTS_DB.find(product => product.slug === slug);
};

export const getProductsByCategory = (category) => {
  return PRODUCTS_DB.filter(product => product.category === category);
};

export const getRelatedProducts = (productId, limit = 4) => {
  const product = getProductById(productId);
  if (!product) return [];

  const related = PRODUCTS_DB.filter(p =>
    p.id !== productId &&
    (p.category === product.category || p.brand === product.brand)
  );

  return related.slice(0, limit);
};
