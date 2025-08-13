// Products database with real images from public/products/
export const PRODUCTS_DB = [
  {
    id: 1,
    name: "Antena TP-Link CPE605 - Outdoor Wireless CPE 5GHz",
    slug: "antena-tp-link-cpe605",
    price: 1850000,
    originalPrice: 2100000,
    image: "/products/Antena TP-Link CPE605 - Outdoor Wireless CPE 5GHz.jpeg",
    category: "Wireless",
    brand: "TP-Link",
    description: "Antena outdoor wireless CPE 5GHz berkinerja tinggi dengan teknologi 802.11ac untuk koneksi point-to-point jarak jauh hingga 5km. Dilengkapi dengan directional antenna 23dBi gain yang memberikan fokus sinyal optimal dan throughput hingga 300Mbps. Tahan cuaca ekstrim dengan rating IP65 dan operating temperature -40°C hingga +70°C. Mudah dikonfigurasi dengan PoE power supply dan mounting hardware lengkap untuk instalasi tower atau pole. Ideal untuk backbone link, wireless bridge, dan WISP deployment.",
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
    description: "Cable tie berkualitas tinggi dengan bahan nylon 66 tahan UV untuk pengorganisasian dan manajemen kabel profesional. Tersedia dalam berbagai ukuran dari 100mm hingga 900mm dengan tensile strength hingga 50lbs. Self-locking mechanism memastikan ikatan yang kuat dan permanen. Flame retardant rating UL94V-2 aman untuk aplikasi elektrikal. Tersedia dalam warna hitam dan putih, cocok untuk instalasi indoor, outdoor, data center, dan industrial applications.",
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
    description: "Media converter profesional untuk konversi sinyal ethernet 10/100/1000Mbps ke fiber optic single-mode atau multimode dengan jarak transmisi hingga 20km. Dilengkapi dengan SFP slot yang mendukung berbagai jenis transceiver sesuai kebutuhan aplikasi. Auto-negotiation dan auto-MDI/MDIX memudahkan instalasi tanpa konfigurasi manual. LED indicator status membantu monitoring dan troubleshooting. Power supply eksternal 12V DC dengan mounting bracket untuk rack installation.",
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
    description: "Tool crimping profesional heavy-duty untuk terminasi konektor RJ45, RJ11, RJ12 dan coaxial dengan precision die yang memberikan hasil crimp konsisten. Dilengkapi dengan ratcheting mechanism yang memastikan crimp sempurna setiap kali digunakan. Ergonomic handle dengan cushion grip mengurangi fatigue saat penggunaan intensif. Built-in wire stripper dan cable cutter menghemat waktu instalasi. Essential tool untuk teknisi jaringan, installer kabel, dan maintenance personel.",
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
    description: "Pigtail fiber optic SC ke LC simplex single-mode UPC berkualitas premium dengan panjang 1.5 meter untuk koneksi equipment ke patch panel. Menggunakan ceramic ferrule grade A+ yang memberikan insertion loss rendah (<0.2dB) dan return loss tinggi (>55dB). Jacket PVC flame retardant dengan bend radius protection mencegah kerusakan serat optik. Color coding sesuai standar TIA untuk mudah identifikasi. Kompatibel dengan semua equipment yang menggunakan connector SC dan LC.",
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
    description: "Kabel LAN UTP Cat6 premium dengan solid bare copper conductor untuk performa jaringan superior. Memenuhi standar TIA/EIA-568-C.2 untuk instalasi jaringan enterprise dan residential. Kabel ini dirancang khusus untuk mendukung aplikasi Gigabit Ethernet dengan bandwidth hingga 250MHz, memberikan transmisi data yang stabil dan handal untuk berbagai kebutuhan networking modern.",
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
    description: "Keystone jack Cat6 berkualitas tinggi untuk terminasi kabel UTP dalam sistem structured cabling. Dilengkapi dengan IDC terminal yang mudah dipasang tanpa memerlukan tools khusus. Kompatibel dengan standar T568A dan T568B, cocok untuk instalasi outlet jaringan, patch panel, dan surface mount box. Konstruksi yang robust memastikan koneksi yang stabil dan tahan lama.",
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
    description: "Konektor LC (Lucent Connector) premium untuk fiber optic single-mode dan multi-mode dengan form factor yang compact. Menggunakan teknologi push-pull coupling mechanism yang memudahkan instalasi dalam ruang terbatas. Dilengkapi dengan ceramic ferrule berkualitas tinggi yang memberikan insertion loss rendah dan return loss optimal. Ideal untuk aplikasi high-density dalam data center dan telecommunication equipment.",
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
    image: "/products/Konektor RJ45 Cat 6 UTP Connector.jpeg",
    category: "Konektor",
    brand: "Generic",
    description: "Konektor RJ45 Cat6 berkualitas profesional dengan gold plated contacts untuk kabel UTP. Dirancang khusus untuk mendukung performa Cat6 dengan frekuensi hingga 250MHz. Konstruksi yang presisi memastikan koneksi yang stabil dan tahan korosi. Dilengkapi dengan strain relief yang mencegah kerusakan pada titik sambungan kabel. Ideal untuk instalasi jaringan enterprise dan data center yang membutuhkan reliabilitas tinggi.",
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
    description: "Konektor ST (Straight Tip) premium untuk fiber optic dengan mekanisme bayonet coupling yang aman dan mudah digunakan. Menggunakan ceramic ferrule berkualitas tinggi yang memberikan performa optik optimal dengan insertion loss rendah. Desain spring-loaded memastikan koneksi yang konsisten dan repeatable. Cocok untuk aplikasi multimode fiber dalam LAN, telekomunikasi, dan sistem fiber optic jarak pendek hingga menengah.",
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
    image: "/products/LS Kabel Coaxial RG6+ Power (300 m Roll).jpg",
    category: "Kabel",
    brand: "LS Cable",
    description: "Kabel coaxial RG6 premium dengan integrated power cable dalam kemasan roll 300 meter, ideal untuk instalasi CCTV dan sistem surveillance skala besar. Dilengkapi dengan quad shield construction untuk perlindungan optimal terhadap interferensi elektromagnetik. Power cable terintegrasi memudahkan instalasi dengan mengurangi jumlah kabel yang diperlukan. Jacket PE berkualitas tinggi tahan terhadap kondisi outdoor dan UV exposure.",
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
    description: "4G LTE Router-Modem canggih dengan WiFi 802.11n untuk solusi internet mobile broadband yang handal. Mendukung semua operator seluler Indonesia dengan kecepatan download hingga 150Mbps. Dilengkapi dengan 3 port LAN Gigabit dan WiFi 300Mbps untuk konektivitas multiple device. Antena 4G eksternal dapat dilepas untuk penggunaan antena external berkekuatan tinggi. Ideal untuk backup internet, remote office, atau area tanpa infrastruktur fiber.",
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
    description: "Optical Power Meter profesional untuk mengukur daya sinyal fiber optic dengan akurasi tinggi. Mendukung multiple wavelength (850/1300/1310/1550nm) untuk testing berbagai jenis fiber dan sistem komunikasi. Dilengkapi dengan universal connector interface yang kompatibel dengan FC, SC, ST, dan LC. Display LCD dengan backlight memudahkan pembacaan dalam kondisi cahaya rendah. Essential tool untuk instalasi, maintenance, dan troubleshooting sistem fiber optic.",
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
    image: "/products/Patch Cord SC–SC Simplex Single‑Mode APC (10 m).jpeg",
    category: "Fiber Optic",
    brand: "Generic",
    description: "Patch cord SC ke SC simplex single-mode APC premium sepanjang 10 meter dengan connector grade A untuk aplikasi high-performance. Menggunakan ceramic ferrule yang dipoles dengan precision optical polishing untuk mencapai insertion loss ultra-low (<0.15dB) dan return loss superior (>65dB). APC (Angled Physical Contact) 8° polish mengurangi back reflection untuk aplikasi analog video dan high-speed data. LSZH jacket ramah lingkungan dengan flame retardant properties. Ideal untuk backbone connection dan critical applications.",
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
    image: "/products/Patch Cord SC–SC Simplex Single‑Mode UPC (10 m).jpeg",
    category: "Fiber Optic",
    brand: "Generic",
    description: "Patch cord SC ke SC simplex single-mode UPC berkualitas tinggi sepanjang 10 meter untuk koneksi equipment fiber optic standard. Menggunakan ceramic ferrule dengan UPC (Ultra Physical Contact) polish yang memberikan insertion loss rendah (<0.2dB) dan return loss optimal (>55dB). Konstruksi simplex memungkinkan transmisi satu arah yang ideal untuk aplikasi point-to-point. OFNR rated jacket tahan api dan fleksibel untuk instalasi dalam conduit atau cable tray. Compatible dengan semua equipment fiber optic yang menggunakan SC connector.",
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
    description: "Router WiFi dual-band AC1200 dengan teknologi MU-MIMO untuk performa jaringan optimal di rumah dan kantor kecil. Menyediakan kecepatan kombinasi hingga 1200Mbps (300Mbps di 2.4GHz + 867Mbps di 5GHz) dengan coverage area hingga 200m². Dilengkapi 4 antena eksternal high-gain dan teknologi Beamforming untuk sinyal yang lebih fokus dan stabil. Fitur OneMesh memungkinkan pembentukan mesh network dengan range extender TP-Link yang kompatibel.",
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
    description: "Fusion splicer profesional untuk penyambungan fiber optic dengan presisi tinggi dan splice loss ultra-low (<0.02dB untuk SM, <0.01dB untuk MM). Dilengkapi dengan dual motors dan active cladding alignment system untuk hasil splice yang konsisten. Built-in heater shrink sleeve dengan programmable heat cycle. Color LCD display 5 inci dengan menu user-friendly dan multilanguage support. Battery operation hingga 200 splice cycles, ideal untuk instalasi lapangan dan maintenance fiber optic network.",
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
    description: "Optical splitter 1x8 PLC (Planar Lightwave Circuit) untuk pembagian sinyal fiber optic dengan uniformity tinggi dan insertion loss rendah. Mendukung wavelength range 1260-1650nm cocok untuk aplikasi FTTH, PON, dan CATV. Compact package dengan pigtail SC/APC connectors dan protective housing. Operating temperature range -40°C hingga +85°C untuk instalasi outdoor. Excess loss <1.0dB dan uniformity <0.4dB memastikan distribusi sinyal yang optimal ke semua output port.",
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
    description: "Unmanaged switch 8 port Fast Ethernet untuk jaringan kecil dan home office yang membutuhkan ekspansi port jaringan. Plug-and-play design tidak memerlukan konfigurasi apapun, cukup hubungkan kabel dan langsung dapat digunakan. Dilengkapi dengan auto-MDI/MDIX yang otomatis mendeteksi jenis kabel (straight atau crossover). Green technology menghemat konsumsi daya hingga 80% dibanding switch konvensional. Compact design cocok untuk penempatan di desktop atau mounting ke dinding.",
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
    description: "Cable tester multifungsi untuk pengujian kabel UTP, STP, dan coaxial dengan akurasi tinggi. Mampu mendeteksi berbagai jenis kerusakan seperti open circuit, short circuit, miswiring, dan crossed pairs. Dilengkapi LED indicator yang jelas untuk setiap pin/wire, memudahkan identifikasi masalah pada kabel. Desain portable dengan battery operation memungkinkan testing di lapangan tanpa sumber listrik eksternal. Essential tool untuk teknisi jaringan dan installer kabel.",
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
    image: "/products/TP‑Link TL‑WA801ND – Access Point Wireless N300 (2.4 GHz).jpeg",
    category: "Wireless",
    brand: "TP-Link",
    description: "Access Point Wireless N300 dual-mode untuk perluasan jaringan WiFi dengan kemampuan Access Point, Range Extender, dan Client mode. Mendukung kecepatan hingga 300Mbps dengan 2 antena eksternal 5dBi untuk coverage optimal. Dilengkapi dengan PoE support untuk instalasi fleksibel tanpa sumber listrik terpisah. WDS bridging memungkinkan koneksi wireless ke router utama. Web-based management dengan wizard setup yang user-friendly untuk konfigurasi mudah.",
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
    description: "CCTV camera HD 1080p dengan teknologi AHD/TVI/CVI untuk keamanan dan monitoring area 24/7. Dilengkapi dengan IR night vision hingga 30 meter dan sensor CMOS high-sensitivity untuk gambar jernih dalam kondisi cahaya rendah. Weather resistant housing IP66 tahan terhadap cuaca ekstrim. Lens variofocal 2.8-12mm dengan angle coverage yang dapat disesuaikan. Mendukung rekaman motion detection dan remote viewing via smartphone app.",
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
    description: "Ground tester digital precision untuk mengukur resistansi tanah dan sistem grounding dengan akurasi 0.01Ω. Menggunakan metode pengukuran 3-pole dan 4-pole sesuai standar IEEE untuk hasil yang akurat. Auto range measurement dengan display LCD backlight yang mudah dibaca. Built-in memory menyimpan hingga 99 hasil pengukuran dengan timestamp. Dilengkapi dengan lead wire set dan ground spike untuk pengukuran di lapangan. Essential untuk commissioning electrical installation dan lightning protection system.",
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
    description: "Laser tester visual fault locator untuk fiber optic dengan output power 1mW pada wavelength 650nm untuk troubleshooting dan identifikasi kerusakan fiber. Continuous wave dan pulsed mode operation memudahkan tracing fiber dalam bundle cable. Compact design dengan battery operation hingga 8 jam continuous use. Universal connector adapter mendukung FC, SC, ST, dan LC connectors. LED indicator menunjukkan status power dan mode operasi. Essential tool untuk maintenance dan commissioning fiber optic network.",
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
    description: "Kabel coaxial RG6 premium dengan integrated power cable per meter untuk fleksibilitas instalasi CCTV dan surveillance system. Menggunakan conductor tembaga berkualitas tinggi dengan impedansi 75 ohm yang stabil untuk transmisi video analog dan digital. Quad shield construction memberikan perlindungan maksimal terhadap interferensi elektromagnetik dan crosstalk. Jacket PE tahan UV cocok untuk instalasi outdoor dan indoor. Power cable 18AWG terintegrasi menghemat waktu dan biaya instalasi.",
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
    description: "Measuring receiver spektrum analyzer untuk pengukuran sinyal RF dan TV broadcasting dengan frequency range 5MHz-3GHz. Dilengkapi dengan high-resolution TFT display dan advanced measurement functions seperti channel power, occupied bandwidth, dan ACPR. Built-in pre-amplifier meningkatkan sensitivity untuk weak signal measurement. Battery operation dengan charging dock untuk portable field testing. Pre-loaded TV standards (DVB-T/T2, ATSC, ISDB-T) dan LTE signal analysis untuk comprehensive RF testing.",
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
    description: "Multimeter digital true-RMS dengan 6000 counts display untuk pengukuran voltage AC/DC, current, resistance, capacitance, frequency, dan temperature dengan akurasi tinggi. Dilengkapi dengan auto-ranging, data hold, dan min/max recording functions. Safety rating CAT III 1000V/CAT IV 600V untuk aplikasi electrical dan industrial. Backlit LCD display dengan bargraph untuk trend indication. Non-contact voltage detection dan audible continuity buzzer untuk safety testing.",
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
    description: "ONU (Optical Network Unit) GPON untuk konversi sinyal fiber optic ke ethernet dalam deployment FTTH dan business applications. Mendukung downstream 2.5Gbps dan upstream 1.25Gbps sesuai standar ITU-T G.984. Dilengkapi dengan 4 port Gigabit Ethernet, 2 port POTS untuk voice service, dan WiFi 802.11n built-in. Web management interface dengan remote provisioning capability dari OLT. Compact desktop design dengan external power adapter dan wall mounting option.",
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
    description: "Optical spectrum analyzer (OSA) precision instrument untuk analisis sinyal fiber optic dengan wavelength range 1250-1650nm dan resolution 0.05nm. Dilengkapi dengan high-sensitivity detector untuk pengukuran DWDM, CWDM, dan fiber laser applications. Built-in OTDR function untuk distance measurement dan fault location. Touch screen interface dengan measurement wizards untuk user-friendly operation. Data logging dan PC connectivity untuk advanced analysis dan reporting. Essential untuk R&D, manufacturing, dan field maintenance fiber optic systems.",
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
    description: "Patch cord SC ke SC simplex single-mode APC alternatif dengan premium grade connectors untuk aplikasi high-end. Menggunakan ultra-low insertion loss ferrule (<0.1dB) dan superior return loss (>65dB) untuk mission-critical installations. Triple-tested quality assurance memastikan performa konsisten. Bend-insensitive fiber G.657.A1 mengurangi signal loss pada radius bengkok kecil. LSZH jacket dengan pulling eye untuk instalasi dalam tight spaces dan cable management systems.",
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
    description: "Patch panel 24 port Cat6 untuk manajemen kabel jaringan dalam rack system 19 inci. Menggunakan keystone jack design yang memungkinkan fleksibilitas konfigurasi T568A atau T568B. Powder-coated steel construction dengan cable management bar dan labeling area untuk organized installation. Supports PoE+ applications hingga 60W per port dengan thermal management. Rear cable management dengan sufficient depth untuk bend radius compliance. Essential untuk structured cabling dan data center applications.",
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
    description: "Pelindung sambungan fiber optic untuk splice protection.",
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
    image: "/products/Safety Goggles (Kacamata Pelindung).png",
    category: "Safety",
    brand: "Generic",
    description: "Kacamata pelindung untuk keselamatan kerja teknisi.",
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
    image: "/products/Safety Helmet (Helm Pelindung).png",
    category: "Safety",
    brand: "Generic",
    description: "Helm pelindung untuk keselamatan kerja di lapangan.",
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
    description: "Sarung tangan anti listrik untuk kerja fiber optic dan listrik.",
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
    description: "Set solder dan tenol untuk penyolderan komponen elektronik.",
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
    description: "Pelindung spiral untuk kabel fiber optic.",
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
    description: "Wire stripper untuk mengupas kabel dengan berbagai ukuran.",
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
    description: "Tang potong untuk memotong kabel dan kawat.",
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
    description: "Vector network analyzer untuk analisis jaringan RF dan microwave.",
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
