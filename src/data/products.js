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
    description: "Antena outdoor wireless CPE 5GHz dengan kecepatan tinggi untuk koneksi point-to-point.",
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
    description: "Cable tie berkualitas tinggi untuk pengorganisasian kabel.",
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
    description: "Media converter untuk konversi ethernet ke fiber optic.",
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
    description: "Tool crimping profesional untuk konektor RJ45 dan RJ11.",
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
    description: "Pigtail fiber optic SC ke LC simplex single-mode UPC.",
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
    description: "Kabel LAN UTP Cat6 dengan solid bare copper conductor.",
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
    description: "Keystone jack Cat6 untuk terminasi kabel UTP.",
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
    description: "Konektor LC untuk fiber optic single-mode dan multi-mode.",
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
    description: "Konektor RJ45 Cat6 untuk kabel UTP.",
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
    description: "Konektor ST untuk fiber optic dengan mekanisme bayonet.",
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
    description: "Kabel coaxial RG6 dengan power cable dalam roll 300 meter.",
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
    description: "4G LTE Router dengan WiFi untuk internet mobile broadband.",
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
    description: "Optical power meter untuk mengukur daya sinyal fiber optic.",
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
    description: "Patch cord SC ke SC simplex single-mode APC sepanjang 10 meter.",
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
    description: "Patch cord SC ke SC simplex single-mode UPC sepanjang 10 meter.",
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
    description: "Router WiFi dual-band AC1200 dengan teknologi MU-MIMO.",
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
    description: "Fusion splicer untuk penyambungan fiber optic dengan presisi tinggi.",
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
    description: "Optical splitter 1x8 untuk pembagian sinyal fiber optic.",
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
    description: "Unmanaged switch 8 port Fast Ethernet untuk jaringan kecil.",
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
    description: "Cable tester untuk pengujian kabel UTP dan coaxial.",
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
    description: "Access Point Wireless N300 untuk perluasan jaringan WiFi.",
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
  "Accessories"
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
