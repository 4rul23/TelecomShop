// Database produk untuk simulasi toko alat telekomunikasi SMK
export const PRODUCTS_DB = {
  1: {
    id: 1,
    name: "Konektor RJ45 Cat 6 UTP Connector",
    slug: "konektor-rj45-cat6-utp",
    brand: "Generic",
    price: 2500,
    stock: 150,
    sku: "RJ45-CAT6-001",
    category: "Konektor",
    type: "konektor",
    description: "Konektor RJ45 Cat6 berkualitas tinggi untuk jaringan komputer. Cocok untuk instalasi kabel UTP pada jaringan LAN dengan kecepatan tinggi.",
    specifications: {
      "Kategori": "Cat6",
      "Material": "Plastik ABS + Metal",
      "Plating": "Gold Plated",
      "Impedansi": "100 Ohm",
      "Suhu Operasi": "-40°C to +70°C"
    },
    features: [
      "Gold plated contacts untuk konektivitas optimal",
      "Desain snap-in yang mudah dipasang",
      "Compatible dengan kabel Cat6 dan Cat5e",
      "Tahan lama dan anti korosi"
    ],
    images: [
      "/products/Konektor RJ45 Cat 6 UTP Connector.jpeg"
    ],
    inStock: true,
    weight: 0.01,
    dimensions: "1.5 x 1 x 0.8 cm"
  },
  2: {
    id: 2,
    name: "Kabel LAN Belden UTP Cat6 Cable (Solid Bare Copper, UTP)",
    slug: "kabel-lan-belden-utp-cat6",
    brand: "Belden",
    price: 850000,
    stock: 25,
    sku: "BLD-UTP6-305",
    category: "Kabel",
    type: "kabel",
    description: "Kabel UTP Cat6 berkualitas premium untuk instalasi jaringan. Roll 305 meter dengan sertifikasi internasional untuk performa jaringan terbaik.",
    specifications: {
      "Kategori": "Cat6",
      "Panjang": "305 meter",
      "AWG": "23 AWG",
      "Impedansi": "100 Ohm ± 15%",
      "Bandwidth": "250 MHz"
    },
    features: [
      "Sertifikasi ETL dan UL",
      "Bandwidth hingga 250 MHz",
      "Support Gigabit Ethernet",
      "Jacket PVC yang tahan lama"
    ],
    images: [
      "/products/Kabel LAN  Belden UTP Cat6 Cable (Solid Bare Copper, UTP).jpg"
    ],
    inStock: true,
    weight: 12.5,
    dimensions: "30 x 30 x 15 cm"
  },
  3: {
    id: 3,
    name: "Switch 8 Port D-Link DES-1008C",
    slug: "switch-8-port-dlink-des1008c",
    brand: "D-Link",
    price: 275000,
    stock: 12,
    sku: "DLK-DES1008C",
    category: "Networking",
    type: "switch",
    description: "Switch 8 port Fast Ethernet untuk jaringan kantor kecil dan rumah. Plug and play dengan auto-negotiation dan auto-MDI/MDIX.",
    specifications: {
      "Port": "8 x 10/100Mbps",
      "Switching Capacity": "1.6 Gbps",
      "MAC Address": "2K",
      "Power": "External 5V/1A",
      "Mounting": "Desktop"
    },
    features: [
      "8 port Fast Ethernet",
      "Plug and play, tidak perlu konfigurasi",
      "Green technology untuk hemat energi",
      "Compact design"
    ],
    images: [
      "/products/Switch 8 Port D-Link DES-1008C.jpeg"
    ],
    inStock: true,
    weight: 0.5,
    dimensions: "15.8 x 10.1 x 2.5 cm"
  },
  4: {
    id: 4,
    name: "TP‑Link TL‑WA801ND – Access Point Wireless N300 (2.4 GHz)",
    slug: "tp-link-tl-wa801nd-access-point-n300",
    brand: "TP-Link",
    price: 385000,
    stock: 8,
    sku: "TPL-WA801ND",
    category: "Wireless",
    type: "wireless",
    description: "Access Point Wireless N300 untuk coverage area luas. Mendukung mode AP, Client, Bridge, dan Repeater dengan kecepatan hingga 300Mbps.",
    specifications: {
      "Standard": "802.11n/g/b",
      "Frequency": "2.4 GHz",
      "Speed": "Up to 300 Mbps",
      "Antenna": "2 x 4dBi Fixed",
      "Power": "802.3af PoE"
    },
    features: [
      "Multiple operation modes",
      "Easy setup dengan WPS button",
      "Advanced security WPA/WPA2",
      "PoE support untuk instalasi fleksibel"
    ],
    images: [
      "/products/TP‑Link TL‑WA801ND – Access Point Wireless N300 (2.4 GHz).jpeg"
    ],
    inStock: true,
    weight: 0.4,
    dimensions: "15.8 x 10.1 x 3.3 cm"
  },
  5: {
    id: 5,
    name: "Patch Cord SC–SC Simplex Single‑Mode UPC (10 m)",
    slug: "patch-cord-sc-sc-simplex-singlemode-upc-10m",
    brand: "Generic",
    price: 125000,
    stock: 20,
    sku: "PC-SC-SC-10M",
    category: "Fiber Optic",
    type: "fiberoptic",
    description: "Patch cord fiber optic SC ke SC single mode sepanjang 10 meter. Ideal untuk koneksi antar perangkat fiber optic dengan loss rendah.",
    specifications: {
      "Type": "Single Mode",
      "Connector": "SC to SC",
      "Length": "10 meter",
      "Core Diameter": "9/125 μm",
      "Polish": "UPC (Ultra Physical Contact)"
    },
    features: [
      "Low insertion loss",
      "High return loss performance",
      "UPC polish untuk performa optimal",
      "Yellow jacket untuk single mode"
    ],
    images: [
      "/products/Patch Cord SC–SC Simplex Single‑Mode UPC (10 m).jpeg"
    ],
    inStock: true,
    weight: 0.2,
    dimensions: "1000 x 2 x 2 cm"
  },
  6: {
    id: 6,
    name: "Patch Cord SC–SC Simplex Single‑Mode APC (10 m)",
    slug: "patch-cord-sc-sc-simplex-singlemode-apc-10m",
    brand: "Generic",
    price: 135000,
    stock: 15,
    sku: "PC-SC-SC-APC-10M",
    category: "Fiber Optic",
    type: "fiberoptic",
    description: "Patch cord fiber optic SC ke SC single mode APC sepanjang 10 meter. Polish APC memberikan return loss yang lebih rendah.",
    specifications: {
      "Type": "Single Mode",
      "Connector": "SC to SC",
      "Length": "10 meter",
      "Core Diameter": "9/125 μm",
      "Polish": "APC (Angled Physical Contact)"
    },
    features: [
      "Ultra low insertion loss",
      "Superior return loss dengan APC polish",
      "Green connector untuk APC type",
      "Yellow jacket untuk single mode"
    ],
    images: [
      "/products/Patch Cord SC–SC Simplex Single‑Mode APC (10 m).jpeg"
    ],
    inStock: true,
    weight: 0.2,
    dimensions: "1000 x 2 x 2 cm"
  },
  7: {
    id: 7,
    name: "Tester Kabel",
    slug: "tester-kabel-network",
    brand: "Generic",
    price: 85000,
    stock: 15,
    sku: "TST-CBL-001",
    category: "Tools",
    type: "tools",
    description: "Cable tester untuk testing kabel UTP dan STP. Dapat mendeteksi continuity, short circuit, dan miswiring dengan indikator LED yang jelas.",
    specifications: {
      "Cable Type": "UTP, STP",
      "Test": "Continuity, Miswiring, Short",
      "Indicator": "LED Display",
      "Power": "9V Battery",
      "Size": "Portable"
    },
    features: [
      "Test kabel UTP dan STP",
      "LED indicator untuk setiap pin",
      "Compact dan portable",
      "Battery operated"
    ],
    images: [
      "/products/Tester Kabel_.jpg"
    ],
    inStock: true,
    weight: 0.3,
    dimensions: "15 x 8 x 3 cm"
  },
  8: {
    id: 8,
    name: "Keystone Jack",
    slug: "keystone-jack-cat6",
    brand: "Generic",
    price: 8500,
    stock: 100,
    sku: "KJ-CAT6-001",
    category: "Konektor",
    type: "konektor",
    description: "Keystone jack Cat6 untuk instalasi outlet jaringan. Kompatibel dengan faceplate dan patch panel standar 19 inch.",
    specifications: {
      "Kategori": "Cat6",
      "Wiring": "T568A/B",
      "Material": "Thermoplastic",
      "Contact": "Phosphor bronze",
      "IDC": "110 style"
    },
    features: [
      "Cat6 certified performance",
      "110 style IDC termination",
      "T568A/B wiring compatible",
      "Snap-in mounting design"
    ],
    images: [
      "/products/Keystone Jack.jpg"
    ],
    inStock: true,
    weight: 0.02,
    dimensions: "2 x 1.5 x 1 cm"
  },
  9: {
    id: 9,
    name: "Crimping Tool",
    slug: "crimping-tool-rj45-rj11",
    brand: "Generic",
    price: 65000,
    stock: 25,
    sku: "CMP-TOOL-001",
    category: "Tools",
    type: "tools",
    description: "Crimping tool untuk RJ45 dan RJ11 connector. Dilengkapi dengan ratcheting mechanism untuk hasil crimp yang konsisten dan profesional.",
    specifications: {
      "Connector": "RJ45, RJ11, RJ12",
      "Wire Gauge": "22-26 AWG",
      "Handle": "Ergonomic grip",
      "Mechanism": "Ratcheting",
      "Length": "8.5 inch"
    },
    features: [
      "Ratcheting mechanism",
      "Support multiple connector types",
      "Ergonomic handle design",
      "Durable construction"
    ],
    images: [
      "/products/Crimping Tool.jpg"
    ],
    inStock: true,
    weight: 0.35,
    dimensions: "21 x 7 x 2.5 cm"
  },
  10: {
    id: 10,
    name: "Router Wi-fi TP-Link Archer C6",
    slug: "router-wifi-tp-link-archer-c6",
    brand: "TP-Link",
    price: 485000,
    stock: 6,
    sku: "TPL-AC1200",
    category: "Networking",
    type: "networking",
    description: "Router WiFi dual-band AC1200 dengan teknologi MU-MIMO. Kecepatan hingga 1200Mbps untuk streaming 4K dan gaming online.",
    specifications: {
      "Standard": "802.11ac Wave 2",
      "Speed": "AC1200 (300+867 Mbps)",
      "Antenna": "4 × External Antennas",
      "Ports": "4 × Gigabit LAN, 1 × Gigabit WAN",
      "CPU": "Dual-core processor"
    },
    features: [
      "Dual-band WiFi AC1200",
      "MU-MIMO technology",
      "4 Gigabit Ethernet ports",
      "Easy setup dengan Tether app"
    ],
    images: [
      "/products/Router Wi-fi TP-Link Archer C6.jpeg"
    ],
    inStock: true,
    weight: 0.9,
    dimensions: "23 x 14.4 x 3.2 cm"
  },
  11: {
    id: 11,
    name: "Modem TP-Link TL-MR6400 (4G LTE Router-Modem)",
    slug: "modem-tp-link-tl-mr6400-4g-lte",
    brand: "TP-Link",
    price: 1250000,
    stock: 8,
    sku: "TPL-MR6400",
    category: "Networking",
    type: "modem",
    description: "Router-Modem 4G LTE untuk koneksi internet wireless. Mendukung semua operator seluler di Indonesia dengan kecepatan download hingga 150Mbps.",
    specifications: {
      "LTE Speed": "150/50 Mbps (DL/UL)",
      "WiFi Speed": "300 Mbps (2.4GHz)",
      "Antenna": "2x Internal + 2x External",
      "SIM Slot": "Micro SIM",
      "Ports": "3x Fast Ethernet"
    },
    features: [
      "4G LTE Cat4 support",
      "All-in-one router dan modem",
      "External antenna untuk signal lebih kuat",
      "Easy setup dengan web interface"
    ],
    images: [
      "/products/Modem TP-Link TL-MR6400 (4G LTE Router-Modem).jpeg"
    ],
    inStock: true,
    weight: 0.8,
    dimensions: "20 x 14 x 3.5 cm"
  },
  12: {
    id: 12,
    name: "Antena TP-Link CPE605 - Outdoor Wireless CPE 5GHz",
    slug: "antena-tp-link-cpe605-outdoor-wireless-5ghz",
    brand: "TP-Link",
    price: 975000,
    stock: 5,
    sku: "TPL-CPE605",
    category: "Wireless",
    type: "wireless",
    description: "CPE outdoor 5GHz untuk point-to-point atau point-to-multipoint connection. Ideal untuk ISP dan enterprise network dengan jarak jauh.",
    specifications: {
      "Frequency": "5.150-5.875 GHz",
      "Speed": "Up to 150 Mbps",
      "Antenna": "23dBi Directional",
      "Range": "Up to 5km+",
      "Power": "802.3at PoE"
    },
    features: [
      "High-gain 23dBi antenna",
      "Long-range transmission",
      "Weather-resistant design",
      "Easy alignment tools"
    ],
    images: [
      "/products/Antena TP-Link CPE605 - Outdoor Wireless CPE 5GHz.jpeg"
    ],
    inStock: true,
    weight: 1.2,
    dimensions: "34.5 x 28.5 x 6.8 cm"
  },
  13: {
    id: 13,
    name: "Cable Tie",
    slug: "cable-tie-plastic",
    brand: "Generic",
    price: 15000,
    stock: 200,
    sku: "CT-100-001",
    category: "Accessories",
    type: "accessories",
    description: "Cable tie plastik untuk manajemen kabel yang rapi. Tersedia dalam berbagai ukuran untuk kebutuhan instalasi jaringan.",
    specifications: {
      "Material": "Nylon 66",
      "Length": "100mm - 300mm",
      "Width": "2.5mm - 4.8mm",
      "Tensile Strength": "18-50 lbs",
      "Color": "Natural/Black"
    },
    features: [
      "High tensile strength",
      "UV resistant",
      "Self-locking design",
      "Multiple sizes available"
    ],
    images: [
      "/products/Cable Tie.jpg"
    ],
    inStock: true,
    weight: 0.5,
    dimensions: "Varies"
  },
  14: {
    id: 14,
    name: "Converter TP-Link TL-FC311A-2 + TL-FC311B",
    slug: "converter-tp-link-tl-fc311a2-tl-fc311b",
    brand: "TP-Link",
    price: 485000,
    stock: 10,
    sku: "TPL-FC311-SET",
    category: "Networking",
    type: "converter",
    description: "Media converter set untuk konversi sinyal Ethernet ke Fiber Optic. Ideal untuk extend jaringan menggunakan fiber optic cable.",
    specifications: {
      "Speed": "10/100Mbps",
      "Fiber Type": "Single Mode",
      "Distance": "Up to 20km",
      "Connector": "SC",
      "Power": "External adapter"
    },
    features: [
      "Auto-negotiation",
      "Link fault pass-through",
      "Hot-swappable SFP",
      "LED indicators"
    ],
    images: [
      "/products/Converter TP-Link TL-FC311A-2 + TL-FC311B.jpg"
    ],
    inStock: true,
    weight: 0.4,
    dimensions: "8.6 x 5.3 x 2.6 cm"
  },
  15: {
    id: 15,
    name: "Fiber Optic Pigtail SC‑LC Simplex Single‑Mode UPC",
    slug: "fiber-optic-pigtail-sc-lc-simplex-singlemode-upc",
    brand: "Generic",
    price: 45000,
    stock: 50,
    sku: "PG-SC-LC-SM",
    category: "Fiber Optic",
    type: "fiberoptic",
    description: "Pigtail fiber optic SC ke LC single mode untuk terminasi fiber. Digunakan untuk splicing pada distribution box atau ODF.",
    specifications: {
      "Type": "Single Mode",
      "Connector": "SC to LC",
      "Length": "1.5 meter",
      "Core Diameter": "9/125 μm",
      "Polish": "UPC"
    },
    features: [
      "Low insertion loss",
      "Factory terminated",
      "Color coded untuk easy identification",
      "Pre-polished connectors"
    ],
    images: [
      "/products/Fiber Optic Pigtail SC‑LC Simplex Single‑Mode UPC.webp"
    ],
    inStock: true,
    weight: 0.05,
    dimensions: "150 x 2 x 2 cm"
  },
  16: {
    id: 16,
    name: "Konektor LC (Lucent Connector)",
    slug: "konektor-lc-lucent-connector",
    brand: "Generic",
    price: 8500,
    stock: 80,
    sku: "LC-CONN-001",
    category: "Konektor",
    type: "konektor",
    description: "Konektor LC untuk fiber optic single mode dan multimode. Small form factor connector yang popular untuk high-density applications.",
    specifications: {
      "Type": "LC Duplex",
      "Fiber Type": "SM/MM",
      "Polish": "UPC/APC",
      "Housing": "Ceramic",
      "Flange": "Metal"
    },
    features: [
      "Small form factor",
      "High density design",
      "Low insertion loss",
      "RoHS compliant"
    ],
    images: [
      "/products/Konektor LC (Lucent Connector).png"
    ],
    inStock: true,
    weight: 0.01,
    dimensions: "1.2 x 0.65 x 0.65 cm"
  },
  17: {
    id: 17,
    name: "Konektor ST (Straight Tip)",
    slug: "konektor-st-straight-tip",
    brand: "Generic",
    price: 12000,
    stock: 60,
    sku: "ST-CONN-001",
    category: "Konektor",
    type: "konektor",
    description: "Konektor ST fiber optic dengan bayonet coupling mechanism. Standard connector untuk aplikasi multimode fiber optic.",
    specifications: {
      "Type": "ST",
      "Fiber Type": "Multimode",
      "Polish": "PC",
      "Housing": "Ceramic",
      "Coupling": "Bayonet"
    },
    features: [
      "Bayonet coupling",
      "Secure connection",
      "Industry standard",
      "Easy termination"
    ],
    images: [
      "/products/Konektor ST (Straight Tip).jpg"
    ],
    inStock: true,
    weight: 0.02,
    dimensions: "2.5 x 1 x 1 cm"
  },
  18: {
    id: 18,
    name: "LS Kabel Coaxial RG6+ Power (300 m Roll)",
    slug: "ls-kabel-coaxial-rg6-power-300m",
    brand: "LS Cable",
    price: 1850000,
    stock: 5,
    sku: "LS-RG6-PWR-300",
    category: "Kabel",
    type: "kabel",
    description: "Kabel coaxial RG6 dengan power cable terintegrasi untuk instalasi CCTV. Roll 300 meter untuk proyek besar.",
    specifications: {
      "Type": "RG6 + Power",
      "Length": "300 meter",
      "Impedance": "75 Ohm",
      "Power Wire": "2 x 0.5mm²",
      "Jacket": "PE Black"
    },
    features: [
      "Coax + power dalam satu kabel",
      "Weather resistant jacket",
      "Low loss coaxial",
      "Easy installation"
    ],
    images: [
      "/products/LS Kabel Coaxial RG6+ Power (300 m Roll).jpg"
    ],
    inStock: true,
    weight: 25.0,
    dimensions: "40 x 40 x 20 cm"
  },
  19: {
    id: 19,
    name: "Optical Power Meter",
    slug: "optical-power-meter",
    brand: "Generic",
    price: 1250000,
    stock: 8,
    sku: "OPM-001",
    category: "Tools",
    type: "tools",
    description: "Optical power meter untuk mengukur daya sinyal pada fiber optic. Essential tool untuk testing dan troubleshooting fiber optic network.",
    specifications: {
      "Wavelength": "850/1300/1310/1550nm",
      "Power Range": "-70 to +10 dBm",
      "Accuracy": "±0.05 dB",
      "Connector": "Universal (FC/SC/ST/LC)",
      "Display": "LCD with backlight"
    },
    features: [
      "Multiple wavelength support",
      "High accuracy measurement",
      "Universal connector interface",
      "Data logging capability"
    ],
    images: [
      "/products/Optical Power Meter_.jpg"
    ],
    inStock: true,
    weight: 0.6,
    dimensions: "18 x 8 x 4 cm"
  },
  20: {
    id: 20,
    name: "Splicer (Fusion)",
    slug: "splicer-fusion",
    brand: "Fujikura",
    price: 25000000,
    stock: 2,
    sku: "FJK-FSM-12S",
    category: "Tools",
    type: "tools",
    description: "Fusion splicer untuk menyambung fiber optic dengan teknologi core alignment. Professional tool untuk instalasi fiber optic berkualitas tinggi.",
    specifications: {
      "Alignment": "Core Alignment",
      "Splice Loss": "≤0.02dB (SM), ≤0.01dB (MM)",
      "Splice Time": "7 seconds",
      "Tube Heat": "30 seconds",
      "Battery": "7.2V Li-ion"
    },
    features: [
      "Core alignment technology",
      "Ultra-low splice loss",
      "Fast splice time",
      "Weather resistant design"
    ],
    images: [
      "/products/Splicer (Fusion).jpg"
    ],
    inStock: true,
    weight: 2.5,
    dimensions: "20 x 15 x 8 cm"
  },
  21: {
    id: 21,
    name: "Splitter",
    slug: "splitter-fiber-optic",
    brand: "Generic",
    price: 185000,
    stock: 15,
    sku: "SPL-1x8-SC",
    category: "Fiber Optic",
    type: "fiberoptic",
    description: "Optical splitter 1x8 untuk membagi sinyal fiber optic. Menggunakan teknologi PLC (Planar Lightwave Circuit) untuk performa optimal.",
    specifications: {
      "Configuration": "1x8",
      "Connector": "SC/UPC",
      "Wavelength": "1260-1650nm",
      "Insertion Loss": "≤10.5dB",
      "Uniformity": "≤1.0dB"
    },
    features: [
      "PLC technology",
      "Low insertion loss",
      "High reliability",
      "Compact design"
    ],
    images: [
      "/products/Splitter_.jpg"
    ],
    inStock: true,
    weight: 0.2,
    dimensions: "10 x 5 x 2 cm"
  }
};

// Helper functions untuk manipulasi data produk
export const getProductById = (id) => {
  return PRODUCTS_DB[id] || null;
};

export const getProductBySlug = (slug) => {
  return Object.values(PRODUCTS_DB).find(product => product.slug === slug) || null;
};

export const getAllProducts = () => {
  return Object.values(PRODUCTS_DB);
};

export const getProductsByCategory = (category) => {
  return Object.values(PRODUCTS_DB).filter(product =>
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getProductsByType = (type) => {
  return Object.values(PRODUCTS_DB).filter(product =>
    product.type.toLowerCase() === type.toLowerCase()
  );
};

export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return Object.values(PRODUCTS_DB).filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
};

export const getProductsInPriceRange = (minPrice, maxPrice) => {
  return Object.values(PRODUCTS_DB).filter(product =>
    product.price >= minPrice && product.price <= maxPrice
  );
};

export const getFeaturedProducts = () => {
  // Return products with good stock availability
  return Object.values(PRODUCTS_DB)
    .filter(product => product.stock >= 10)
    .sort((a, b) => b.stock - a.stock);
};

export const getPopularProducts = () => {
  // Return products sorted by price (assuming popular = affordable)
  return Object.values(PRODUCTS_DB)
    .sort((a, b) => a.price - b.price);
};

// Categories untuk filter - convert to label strings for unique keys
export const CATEGORIES = [
  { value: 'konektor', label: 'Konektor' },
  { value: 'kabel', label: 'Kabel' },
  { value: 'networking', label: 'Networking' },
  { value: 'wireless', label: 'Wireless' },
  { value: 'fiber-optic', label: 'Fiber Optic' },
  { value: 'tools', label: 'Tools' },
  { value: 'accessories', label: 'Accessories' }
];

// Brands untuk filter
export const BRANDS = [
  "Generic",
  "Belden",
  "D-Link", 
  "TP-Link",
  "LS Cable",
  "Fujikura"
];

// Price ranges untuk filter
export const PRICE_RANGES = [
  { label: "Semua", min: 0, max: 50000000 },
  { label: "< Rp 50.000", min: 0, max: 50000 },
  { label: "Rp 50.000 - 200.000", min: 50000, max: 200000 },
  { label: "Rp 200.000 - 500.000", min: 200000, max: 500000 },
  { label: "Rp 500.000 - 1.000.000", min: 500000, max: 1000000 },
  { label: "Rp 1.000.000 - 5.000.000", min: 1000000, max: 5000000 },
  { label: "> Rp 5.000.000", min: 5000000, max: 50000000 }
];
