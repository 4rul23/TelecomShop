// Database produk untuk simulasi toko alat telekomunikasi SMK
export const PRODUCTS_DB = {
  1: {
    id: 1,
    name: "RJ45 Connector Cat6",
    slug: "rj45-connector-cat6",
    brand: "AMP",
    price: 2500,
    stock: 150,
    sku: "AMP-RJ45-C6-001",
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
      "/tel.png",
      "/tel.png"
    ],
    inStock: true,
    weight: 0.01,
    dimensions: "1.5 x 1 x 0.8 cm"
  },
  2: {
    id: 2,
    name: "Cable UTP Cat6 305m",
    slug: "cable-utp-cat6-305m",
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
      "/tel.png",
      "/tel.png"
    ],
    inStock: true,
    weight: 12.5,
    dimensions: "30 x 30 x 15 cm"
  },
  3: {
    id: 3,
    name: "Switch 24 Port Gigabit",
    slug: "switch-24-port-gigabit",
    brand: "TP-Link",
    price: 1250000,
    stock: 12,
    sku: "TPL-SG1024D",
    category: "Networking",
    type: "switch",
    description: "Switch Gigabit 24 port untuk jaringan kantor dan sekolah. Plug and play dengan auto-negotiation dan auto-MDI/MDIX.",
    specifications: {
      "Port": "24 x 10/100/1000Mbps",
      "Switching Capacity": "48 Gbps",
      "MAC Address": "8K",
      "Power": "External 48V/1.25A",
      "Mounting": "Desktop/Rackmount"
    },
    features: [
      "24 port Gigabit Ethernet",
      "Plug and play, tidak perlu konfigurasi",
      "Green technology untuk hemat energi",
      "Fanless design untuk operasi silent"
    ],
    images: [
      "/tel.png",
      "/tel.png"
    ],
    inStock: true,
    weight: 2.1,
    dimensions: "44 x 18 x 4.4 cm"
  },
  4: {
    id: 4,
    name: "Access Point WiFi 6",
    slug: "access-point-wifi-6",
    brand: "Ubiquiti",
    price: 1850000,
    stock: 8,
    sku: "UBI-UAP-AC-PRO",
    category: "Wireless",
    type: "wireless",
    description: "Access Point WiFi 6 dual-band untuk coverage area luas. Support hingga 500+ concurrent users dengan teknologi MIMO 4x4.",
    specifications: {
      "Standard": "802.11ax (WiFi 6)",
      "Frequency": "2.4 GHz & 5 GHz",
      "Speed": "Up to 1.7 Gbps",
      "Coverage": "Up to 125m radius",
      "Power": "802.3at PoE+"
    },
    features: [
      "WiFi 6 dual-band technology",
      "Support hingga 500+ users",
      "Advanced security WPA3",
      "Managed melalui UniFi Controller"
    ],
    images: [
      "/tel.png",
      "/tel.png"
    ],
    inStock: true,
    weight: 0.7,
    dimensions: "22 x 22 x 4.8 cm"
  },
  5: {
    id: 5,
    name: "Fiber Optic Cable SC-SC 50m",
    slug: "fiber-optic-cable-sc-sc-50m",
    brand: "Corning",
    price: 450000,
    stock: 20,
    sku: "COR-FOC-SC50",
    category: "Fiber Optic",
    type: "fiberoptic",
    description: "Kabel fiber optic single mode SC ke SC sepanjang 50 meter. Ideal untuk backbone network dengan kecepatan transmisi tinggi.",
    specifications: {
      "Type": "Single Mode",
      "Connector": "SC to SC",
      "Length": "50 meter",
      "Core Diameter": "9/125 μm",
      "Wavelength": "1310/1550 nm"
    },
    features: [
      "Low insertion loss",
      "High return loss performance",
      "Ceramic ferrule untuk durability",
      "Yellow jacket untuk single mode"
    ],
    images: [
      "/tel.png",
      "/tel.png"
    ],
    inStock: true,
    weight: 1.2,
    dimensions: "25 x 15 x 8 cm"
  },
  6: {
    id: 6,
    name: "Network Cable Tester",
    slug: "network-cable-tester",
    brand: "Klein Tools",
    price: 320000,
    stock: 15,
    sku: "KLN-VDV501",
    category: "Tools",
    type: "tools",
    description: "Cable tester untuk testing kabel UTP, STP, dan coaxial. Dilengkapi dengan tone generator dan probe untuk troubleshooting jaringan.",
    specifications: {
      "Cable Type": "UTP, STP, Coaxial",
      "Test": "Continuity, Miswiring, Short",
      "Tone Frequency": "1 kHz",
      "Power": "9V Battery",
      "Display": "LED Indicator"
    },
    features: [
      "Test berbagai jenis kabel",
      "Tone generator untuk tracing",
      "Compact dan portable",
      "Battery indicator"
    ],
    images: [
      "/tel.png",
      "/tel.png"
    ],
    inStock: true,
    weight: 0.5,
    dimensions: "18 x 10 x 4 cm"
  },
  7: {
    id: 7,
    name: "Patch Panel 24 Port Cat6",
    slug: "patch-panel-24-port-cat6",
    brand: "AMP",
    price: 680000,
    stock: 10,
    sku: "AMP-PP24-C6",
    category: "Networking",
    type: "networking",
    description: "Patch panel 24 port Cat6 untuk rack mounting. Dilengkapi dengan label area dan cable management yang rapi.",
    specifications: {
      "Port": "24 x RJ45 Cat6",
      "Mounting": "19 inch rack",
      "Height": "1U",
      "Material": "Steel powder coated",
      "Wiring": "T568A/B compatible"
    },
    features: [
      "24 port Cat6 certified",
      "19 inch rack mountable",
      "Color coded untuk T568A/B",
      "Built-in cable management"
    ],
    images: [
      "/tel.png",
      "/tel.png"
    ],
    inStock: true,
    weight: 2.8,
    dimensions: "48 x 25 x 4.4 cm"
  },
  8: {
    id: 8,
    name: "Crimping Tool RJ45/RJ11",
    slug: "crimping-tool-rj45-rj11",
    brand: "Klein Tools",
    price: 165000,
    stock: 25,
    sku: "KLN-VDV226",
    category: "Tools",
    type: "tools",
    description: "Crimping tool profesional untuk RJ45 dan RJ11 connector. Dilengkapi dengan ratcheting mechanism untuk hasil crimp yang konsisten.",
    specifications: {
      "Connector": "RJ45, RJ11, RJ12",
      "Wire Gauge": "22-26 AWG",
      "Handle": "Cushion grip",
      "Mechanism": "Ratcheting",
      "Length": "9 inch"
    },
    features: [
      "Ratcheting mechanism",
      "Support multiple connector types",
      "Cushion grip handle",
      "Professional grade quality"
    ],
    images: [
      "/tel.png",
      "/tel.png"
    ],
    inStock: true,
    weight: 0.4,
    dimensions: "23 x 8 x 3 cm"
  },
  9: {
    id: 9,
    name: "Router Mikrotik RB4011",
    slug: "router-mikrotik-rb4011",
    brand: "Mikrotik",
    price: 2150000,
    stock: 6,
    sku: "MTK-RB4011",
    category: "Networking",
    type: "networking",
    description: "Router enterprise Mikrotik dengan 10 port Gigabit dan 1 SFP+. Ideal untuk kantor dan sekolah dengan traffic tinggi.",
    specifications: {
      "CPU": "ARM Cortex A15 1.4GHz",
      "RAM": "1GB",
      "Storage": "512MB NAND",
      "Ports": "10x Gigabit, 1x SFP+",
      "OS": "RouterOS Level 5"
    },
    features: [
      "10 Gigabit Ethernet ports",
      "1 SFP+ port untuk fiber",
      "RouterOS dengan fitur lengkap",
      "Rack mountable design"
    ],
    images: [
      "/tel.png",
      "/tel.png"
    ],
    inStock: true,
    weight: 1.5,
    dimensions: "44 x 20 x 4.4 cm"
  },
  10: {
    id: 10,
    name: "Cable Management Tray 1U",
    slug: "cable-management-tray-1u",
    brand: "AMP",
    price: 125000,
    stock: 30,
    sku: "AMP-CMT-1U",
    category: "Accessories",
    type: "accessories",
    description: "Cable management tray 1U untuk rack 19 inch. Membantu mengorganisir kabel dengan rapi dan professional.",
    specifications: {
      "Size": "1U rack mount",
      "Width": "19 inch",
      "Material": "Steel black powder coated",
      "Capacity": "Up to 48 cables",
      "Mounting": "Front and rear mounting"
    },
    features: [
      "1U rack space efficient",
      "Organize hingga 48 kabel",
      "Steel construction yang kuat",
      "Easy front access"
    ],
    images: [
      "/tel.png",
      "/tel.png"
    ],
    inStock: true,
    weight: 1.1,
    dimensions: "48 x 25 x 4.4 cm"
  },
  11: {
    id: 11,
    name: "SFP+ Transceiver 10G SR",
    slug: "sfp-transceiver-10g-sr",
    brand: "Cisco",
    price: 1250000,
    stock: 12,
    sku: "CSC-SFP-10G-SR",
    category: "Fiber Optic",
    type: "fiberoptic",
    description: "SFP+ transceiver 10 Gigabit untuk multimode fiber. Compatible dengan berbagai switch dan router enterprise.",
    specifications: {
      "Speed": "10 Gbps",
      "Fiber Type": "Multimode",
      "Wavelength": "850nm",
      "Distance": "Up to 300m",
      "Connector": "LC Duplex"
    },
    features: [
      "10 Gigabit transmission",
      "Hot-swappable design",
      "Low power consumption",
      "Industry standard compatible"
    ],
    images: [
      "/tel.png",
      "/tel.png"
    ],
    inStock: true,
    weight: 0.02,
    dimensions: "5.6 x 1.4 x 0.8 cm"
  },
  12: {
    id: 12,
    name: "PoE Injector 30W",
    slug: "poe-injector-30w",
    brand: "TP-Link",
    price: 185000,
    stock: 18,
    sku: "TPL-TL-POE150S",
    category: "Accessories",
    type: "accessories",
    description: "PoE injector 30W untuk menyuplai daya ke perangkat PoE seperti access point, IP camera, dan VoIP phone.",
    specifications: {
      "Power Output": "30W",
      "Standard": "IEEE 802.3at",
      "Input Voltage": "100-240V AC",
      "Efficiency": "> 85%",
      "Protection": "Over current, short circuit"
    },
    features: [
      "30W power output",
      "IEEE 802.3at compliant",
      "Plug and play installation",
      "Multiple protection features"
    ],
    images: [
      "/tel.png",
      "/tel.png"
    ],
    inStock: true,
    weight: 0.3,
    dimensions: "9.8 x 5.2 x 2.8 cm"
  },
  13: {
    id: 13,
    name: "Network Rack 42U",
    slug: "network-rack-42u",
    brand: "APC",
    price: 4500000,
    stock: 3,
    sku: "APC-AR3100",
    category: "Infrastructure",
    type: "infrastructure",
    description: "Network rack 42U dengan cooling system dan cable management. Ideal untuk server room dan data center kecil.",
    specifications: {
      "Height": "42U (2000mm)",
      "Width": "600mm",
      "Depth": "1000mm",
      "Load Capacity": "1000kg",
      "Doors": "Front & rear perforated"
    },
    features: [
      "42U rack space",
      "Integrated cable management",
      "Perforated doors untuk airflow",
      "Adjustable mounting rails"
    ],
    images: [
      "/tel.png",
      "/tel.png"
    ],
    inStock: true,
    weight: 85.0,
    dimensions: "60 x 100 x 200 cm"
  },
  14: {
    id: 14,
    name: "Fiber Optic Cleaner Pen",
    slug: "fiber-optic-cleaner-pen",
    brand: "Corning",
    price: 85000,
    stock: 40,
    sku: "COR-CCP-1.25",
    category: "Tools",
    type: "tools",
    description: "Fiber optic cleaner pen untuk membersihkan connector SC, ST, dan FC. Essential tool untuk maintenance fiber optic.",
    specifications: {
      "Connector Type": "SC, ST, FC",
      "Cleaning": "Dry cleaning",
      "Usage": "Up to 500 cleanings",
      "Size": "Pen style portable",
      "Mechanism": "Push & twist"
    },
    features: [
      "Support multiple connector types",
      "Hingga 500x cleaning",
      "Portable pen design",
      "No alcohol required"
    ],
    images: [
      "/tel.png",
      "/tel.png"
    ],
    inStock: true,
    weight: 0.05,
    dimensions: "15 x 2 x 2 cm"
  },
  15: {
    id: 15,
    name: "Wireless Controller UniFi",
    slug: "wireless-controller-unifi",
    brand: "Ubiquiti",
    price: 3200000,
    stock: 5,
    sku: "UBI-UDM-PRO",
    category: "Wireless",
    type: "wireless",
    description: "Wireless controller UniFi untuk manage hingga 500+ access point. Dilengkapi dengan security gateway dan firewall.",
    specifications: {
      "Management": "Up to 500 APs",
      "Throughput": "3.5 Gbps",
      "Ports": "8x Gigabit, 2x SFP+",
      "Storage": "256GB SSD",
      "Display": "1.3 inch touch screen"
    },
    features: [
      "Manage hingga 500 access points",
      "Built-in security gateway",
      "Touch screen interface",
      "Cloud dan local management"
    ],
    images: [
      "/tel.png",
      "/tel.png"
    ],
    inStock: true,
    weight: 2.2,
    dimensions: "44 x 28 x 4.4 cm"
  },
  16: {
    id: 16,
    name: "Ethernet Cable Cat5e 100m",
    slug: "ethernet-cable-cat5e-100m",
    brand: "Belden",
    price: 250000,
    stock: 35,
    sku: "BLD-CAT5E-100",
    category: "Kabel",
    type: "kabel",
    description: "Kabel Ethernet Cat5e roll 100 meter untuk instalasi jaringan indoor. Compatible dengan Fast Ethernet dan Gigabit Ethernet.",
    specifications: {
      "Kategori": "Cat5e",
      "Panjang": "100 meter",
      "AWG": "24 AWG",
      "Impedansi": "100 Ohm",
      "Bandwidth": "100 MHz"
    },
    features: [
      "100 meter per roll",
      "Compatible Cat5e standard",
      "Flexible installation",
      "Cost effective solution"
    ],
    images: ["/tel.png", "/tel.png"],
    inStock: true,
    weight: 4.2,
    dimensions: "25 x 25 x 12 cm"
  },
  17: {
    id: 17,
    name: "Optical Power Meter",
    slug: "optical-power-meter",
    brand: "Corning",
    price: 1850000,
    stock: 7,
    sku: "COR-OPM-5600",
    category: "Tools",
    type: "tools",
    description: "Optical power meter untuk mengukur daya sinyal fiber optic. Essential tool untuk instalasi dan maintenance fiber optic network.",
    specifications: {
      "Wavelength": "850, 1300, 1310, 1550nm",
      "Power Range": "-70 to +10 dBm",
      "Accuracy": "±0.05 dB",
      "Connector": "Universal 2.5mm",
      "Display": "LCD with backlight"
    },
    features: [
      "Multiple wavelength support",
      "High accuracy measurement",
      "Universal connector",
      "Data logging capability"
    ],
    images: ["/tel.png", "/tel.png"],
    inStock: true,
    weight: 0.8,
    dimensions: "18 x 8 x 4 cm"
  },
  18: {
    id: 18,
    name: "IP Phone VoIP",
    slug: "ip-phone-voip",
    brand: "Cisco",
    price: 1250000,
    stock: 14,
    sku: "CSC-SPA504G",
    category: "VoIP",
    type: "voip",
    description: "IP Phone VoIP dengan 4 line dan HD voice quality. Ideal untuk kantor dengan sistem komunikasi berbasis IP.",
    specifications: {
      "Lines": "4 SIP lines",
      "Display": "3.2 inch backlit LCD",
      "Audio": "HD voice G.722",
      "Network": "2 port Gigabit Ethernet",
      "Power": "PoE or AC adapter"
    },
    features: [
      "4 SIP line support",
      "HD voice quality",
      "Dual Gigabit ports",
      "Programmable keys"
    ],
    images: ["/tel.png", "/tel.png"],
    inStock: true,
    weight: 1.1,
    dimensions: "24 x 20 x 8 cm"
  },
  19: {
    id: 19,
    name: "Media Converter Gigabit",
    slug: "media-converter-gigabit",
    brand: "TP-Link",
    price: 485000,
    stock: 22,
    sku: "TPL-MC220L",
    category: "Networking",
    type: "networking",
    description: "Media converter Gigabit untuk konversi sinyal dari copper ke fiber dan sebaliknya. Support jarak hingga 20km.",
    specifications: {
      "Speed": "10/100/1000 Mbps",
      "Fiber Port": "1000Base-LX SFP slot",
      "Distance": "Up to 20km",
      "Wavelength": "1310nm",
      "Power": "External 12V/1A"
    },
    features: [
      "Gigabit speed conversion",
      "SFP slot untuk flexibility",
      "Long distance support",
      "Plug and play operation"
    ],
    images: ["/tel.png", "/tel.png"],
    inStock: true,
    weight: 0.6,
    dimensions: "15 x 10 x 4 cm"
  },
  20: {
    id: 20,
    name: "Splice Tray 12 Core",
    slug: "splice-tray-12-core",
    brand: "Corning",
    price: 145000,
    stock: 28,
    sku: "COR-ST12C",
    category: "Fiber Optic",
    type: "fiberoptic",
    description: "Splice tray 12 core untuk menyimpan dan melindungi sambungan fiber optic. Dilengkapi dengan cable management yang rapi.",
    specifications: {
      "Capacity": "12 fusion splice",
      "Size": "Standard 19 inch",
      "Material": "ABS plastic",
      "Mounting": "Rack or wall mount",
      "Protection": "IP54 rated"
    },
    features: [
      "12 splice capacity",
      "Integrated cable management",
      "IP54 protection rating",
      "Easy installation"
    ],
    images: ["/tel.png", "/tel.png"],
    inStock: true,
    weight: 0.8,
    dimensions: "48 x 25 x 4 cm"
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

// Categories untuk filter
export const CATEGORIES = [
  { value: 'konektor', label: 'Konektor', count: 1 },
  { value: 'kabel', label: 'Kabel', count: 2 },
  { value: 'networking', label: 'Networking', count: 1 },
  { value: 'wireless', label: 'Wireless', count: 1 },
  { value: 'fiberoptic', label: 'Fiber Optic', count: 1 },
  { value: 'tools', label: 'Tools', count: 1 }
];

// Brands untuk filter
export const BRANDS = [
  { value: 'amp', label: 'AMP', count: 1 },
  { value: 'belden', label: 'Belden', count: 1 },
  { value: 'tp-link', label: 'TP-Link', count: 1 },
  { value: 'ubiquiti', label: 'Ubiquiti', count: 1 },
  { value: 'corning', label: 'Corning', count: 1 },
  { value: 'klein-tools', label: 'Klein Tools', count: 1 }
];

// Price ranges untuk filter
export const PRICE_RANGES = [
  { value: '0-50000', label: 'Di bawah Rp 50.000', min: 0, max: 50000 },
  { value: '50000-200000', label: 'Rp 50.000 - Rp 200.000', min: 50000, max: 200000 },
  { value: '200000-500000', label: 'Rp 200.000 - Rp 500.000', min: 200000, max: 500000 },
  { value: '500000-1000000', label: 'Rp 500.000 - Rp 1.000.000', min: 500000, max: 1000000 },
  { value: '1000000-3000000', label: 'Rp 1.000.000 - Rp 3.000.000', min: 1000000, max: 3000000 },
  { value: '3000000-up', label: 'Di atas Rp 3.000.000', min: 3000000, max: Infinity }
];
