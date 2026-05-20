<template>
  <main class="product-catalog-page">
    <!-- Hero Banner -->
    <section class="catalog-hero">
      <img src="@/assets/images/hero_branding_bg.png" alt="Product Banner" class="hero-banner-img">
    </section>

    <!-- Main Content Area -->
    <div class="catalog-container">
      <!-- Left Sidebar - Categories -->
      <aside class="sidebar">
        <div class="category-section all-products-section">
          <ul class="category-list">
            <li><a href="#" @click.prevent="showProductList()" :class="{ active: viewMode === 'list' && activeCategory === 'all' }">All Products</a></li>
          </ul>
        </div>
        <div class="category-section">
          <h3 class="category-title">Fogger</h3>
          <ul class="category-list">
            <li><a href="#" @click.prevent="showProductList('ulv')" :class="{ active: viewMode === 'list' && activeCategory === 'ulv' }">ULV Cold Fogger</a></li>
            <li><a href="#" @click.prevent="showProductList('thermal')" :class="{ active: viewMode === 'list' && activeCategory === 'thermal' }">Thermal Fogger</a></li>
          </ul>
        </div>
        <div class="category-section">
          <h3 class="category-title">Sprayer</h3>
          <ul class="category-list">
            <li><a href="#" @click.prevent="showProductList('spray')" :class="{ active: viewMode === 'list' && activeCategory === 'spray' }">ULV Sprayer</a></li>
          </ul>
        </div>
      </aside>

      <!-- Main Content -->
      <section class="main-content">
        <!-- Product List View -->
        <div v-if="viewMode === 'list'" class="list-view">
          <!-- Breadcrumb & Search -->
          <div class="breadcrumb-search-area">
            <div class="breadcrumb">
              <span class="breadcrumb-icon">🏠</span>
              <span class="breadcrumb-text">Your current location: {{ currentCategoryLabel }}</span>
            </div>
            <div class="search-box">
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Please enter search content"
                @input="filterProducts"
              >
              <button class="search-btn">🔍</button>
            </div>
          </div>

          <!-- Product Grid -->
          <div class="products-grid">
            <div v-for="product in filteredProducts" :key="product.id" class="product-card" @click="showProductDetail(product.id)">
              <div class="product-card-content">
                <div class="product-image-wrapper">
                  <img :src="product.image" :alt="product.name" class="product-image">
                </div>
                <h4 class="product-name">{{ product.name }}</h4>
                <p class="product-model" v-if="product.model">{{ product.model }}</p>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredProducts.length === 0" class="empty-state">
            <p>No products found. Please try a different search.</p>
          </div>
        </div>

        <!-- Product Detail View -->
        <div v-if="viewMode === 'detail' && selectedProduct" class="detail-view">
          <!-- Breadcrumb -->
          <div class="breadcrumb-detail">
            <a href="#" @click.prevent="showProductList()" class="breadcrumb-link">ULV Cold Fogger</a>
            <span class="breadcrumb-sep">></span>
            <span class="breadcrumb-current">{{ selectedProduct.name }}</span>
          </div>

          <!-- Detail Header with Image -->
          <div class="detail-header">
            <div class="detail-images">
              <div class="main-image-wrapper">
                <img v-if="selectedMediaType === 'image'" :src="selectedImage" :alt="selectedProduct.name" class="main-image">
                <video v-if="selectedMediaType === 'video'" :src="selectedImage" controls class="main-video"></video>
              </div>
              <div class="thumbnail-images">
                <button v-for="(media, idx) in selectedProduct.images" :key="idx" @click="selectMedia(media)" :class="{ active: selectedImage === media.src }" class="thumb-btn">
                  <img v-if="media.type === 'image'" :src="media.src" :alt="media.alt">
                  <div v-if="media.type === 'video'" class="video-thumb-placeholder">
                    <span class="play-icon">▶</span>
                  </div>
                </button>
              </div>
            </div>

            <div class="detail-info">
              <h2 class="detail-title">{{ selectedProduct.name }}</h2>
              <p class="detail-model">{{ selectedProduct.model }}</p>
              
              <div class="specs-list">
                <div v-for="spec in selectedProduct.specs" :key="spec.label" class="spec-item">
                  <span class="spec-label">{{ spec.label }}</span>
                  <span class="spec-value">{{ spec.value }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Features Section -->
          <div class="detail-features">
            <h3>Feature</h3>
            <p v-for="(feature, idx) in selectedProduct.features" :key="idx" class="feature-text">
              {{ feature }}
            </p>
          </div>

          <!-- Back to List Button -->
          <div class="detail-footer">
            <button @click="showProductList()" class="btn-back-list">← Back to Products</button>
          </div>
        </div>
      </section>
    </div>

    <!-- Floating Top Button -->
    <button class="float-top-btn" @click="scrollToTop" v-show="showTopBtn">
      <span>TOP</span>
    </button>
  </main>
</template>

<script>
export default {
  name: 'ProductView',
  data() {
    // Asset imports
    const ulvProductMain = require('@/assets/images/product-main.jpg');
    const ulvProductWorking = require('@/assets/images/product-working.jpg');
    const ulvDetail1 = require('@/assets/images/detail-1.jpg');
    const ulvDetail2 = require('@/assets/images/detail-2.jpg');
    const ulvDetail3 = require('@/assets/images/detail-3.jpg');
    const ulvProductSafety = require("@/assets/images/product-safety.png");
    const ulvDetail5Cropped = require("@/assets/images/detail-5-cropped.jpg");
    const tsf35dFull = require('@/assets/images/products/tsf-35d/tsf-35d-full.jpg');
    const tsf35dSide = require('@/assets/images/products/tsf-35d/tsf-35d-side.jpg');
    const tsf35dNozzle = require('@/assets/images/products/tsf-35d/tsf-35d-nozzle.jpg');
    const tsf35dDetail = require('@/assets/images/products/tsf-35d/tsf-35d-detail.jpg');
    const mf100Main = require('@/assets/images/mf100/mf100-main.jpg');
    const mf100Detail1 = require('@/assets/images/mf100/mf100-detail1.jpg');
    const mf100Detail2 = require('@/assets/images/mf100/mf100-detail2.jpg');
    const mf100Application = require('@/assets/images/mf100/mf100-application.png');
    const mf100Package = require('@/assets/images/mf100/mf100-package.jpg');
    const backpackMain = require('@/assets/images/products/backpack-fogger/backpack-main.jpg');
    const backpackSide = require('@/assets/images/products/backpack-fogger/backpack-side.jpg');
    const backpackDetail = require('@/assets/images/products/backpack-fogger/backpack-detail.jpg');
    const backpackFront = require('@/assets/images/products/backpack-fogger/backpack-front.jpg');
    const backpackAccessories = require('@/assets/images/products/backpack-fogger/backpack-accessories.jpg');
    const backpackBox = require('@/assets/images/products/backpack-fogger/backpack-box.jpg');
    const backpackSpecs = require('@/assets/images/products/backpack-fogger/backpack-specs.jpg');
    const yf450Main = require('@/assets/images/products/yf-450/yf450-main.jpg');
    const yf450Side = require('@/assets/images/products/yf-450/yf450-side.jpg');
    const yf450Back = require('@/assets/images/products/yf-450/yf450-back.jpg');
    const yf450Front = require('@/assets/images/products/yf-450/yf450-front.jpg');
    const yf450Angle = require('@/assets/images/products/yf-450/yf450-angle.jpg');
    const pantryMothMain = require('@/assets/images/products/pantry-moth-trap/pantry-moth-main.jpg');
    const pantryMothDetail1 = require('@/assets/images/products/pantry-moth-trap/pantry-moth-detail1.jpg');
    const pantryMothDetail2 = require('@/assets/images/products/pantry-moth-trap/pantry-moth-detail2.jpg');
    const pantryMothDetail3 = require('@/assets/images/products/pantry-moth-trap/pantry-moth-detail3.jpg');
    const pantryMothDetail4 = require('@/assets/images/products/pantry-moth-trap/pantry-moth-detail4.jpg');

    // Product catalog
    const allProducts = [
      {
        id: 'ulv',
        name: 'Electric ULV Cold Fogger',
        model: 'ELT-ULV-5L',
        category: 'ulv',
        image: ulvProductMain,
        description: 'Professional electric ULV cold fogger for rapid disinfection',
        images: [
          { src: ulvProductMain, alt: 'Main', type: 'image' },
          { src: ulvProductWorking, alt: 'Working', type: 'image' },
          { src: ulvDetail1, alt: 'Detail 1', type: 'image' },
          { src: ulvDetail2, alt: 'Detail 2', type: 'image' },
          { src: '/videos/ulv-cold-fogger-intro.mp4', alt: 'Video', type: 'video' }
        ],
        specs: [
          { label: 'Atomization Volume', value: '0~470 ml/min (Adjustable)' },
          { label: 'Power', value: '1000w' },
          { label: 'Motor', value: '220v/110v' },
          { label: 'Effective Range', value: '8m' },
          { label: 'Particle Size', value: '10-150μm (adjustable)' },
          { label: 'Tank Capacity', value: '5L' },
          { label: 'Net weight', value: '2.35KGS' },
          { label: 'Gross weight', value: '3.45KGS' },
          { label: 'Measurement', value: '560 mm×240 mm×320 mm' },
          { label: 'Volume', value: '0.048/per carton' },
          { label: 'Big Carton Size', value: '59x52x71cm (4 in 1)' }
        ],
        features: [
          'ULV Cold fogger Dragon is mounted on wheels, convenient moving while spraying, save labor.',
          'Mobile handrail can set any spraying direction for the nozzle, take out nozzle handle, also convenient spraying to every direction.',
          'Spray gun incorporates an adjustment knob for continuous flow rate and fog droplet size adjustment.'
        ],
        video: '/videos/ulv-cold-fogger-intro.mp4'
      },
      {
        id: 'tsf35d',
        name: 'TSF-35D Thermal Fogger',
        model: 'TSF-35D',
        category: 'thermal',
        image: tsf35dFull,
        description: 'High-efficiency thermal fogger for pest control and disinfection',
        images: [
          { src: tsf35dFull, alt: 'TSF-35D Full View', type: 'image' },
          { src: tsf35dSide, alt: 'TSF-35D Side View', type: 'image' },
          { src: tsf35dNozzle, alt: 'TSF-35D Nozzle Detail', type: 'image' },
          { src: tsf35dDetail, alt: 'TSF-35D Engine Detail', type: 'image' },
          { src: '/videos/tsf-35d-intro.mp4', alt: 'Video', type: 'video' }
        ],
        specs: [
          { label: 'Model', value: 'TSF-35D' },
          { label: 'Combustion Chamber Output', value: '17.6-19.3KW' },
          { label: 'Fuel Consumption', value: '1.8-2.2L/H' },
          { label: 'Flow Rate (with oil)', value: '8-42L/H' },
          { label: 'Fuel Tank Capacity', value: '1.2L' },
          { label: 'Solution Tank Capacity', value: '5.5L' },
          { label: 'Energy', value: 'DC6V (4x1.5V)' },
          { label: 'Weight (empty)', value: '8.0kg' },
          { label: 'Dimensions (LxWxH)', value: '1150x270x330MM' },
          { label: 'Weight (empty, shipping)', value: '12 kg' },
          { label: 'Dimensions (shipping)', value: '1290x270x340MM' }
        ],
        features: [
          'Thermal Fogger TSF35D - Durable, High-Performance, and Easy to Operate',
          'The Thermal Fogger TSF35D is designed for optimal performance, ease of use, and long-lasting reliability. This model offers a powerful fogging solution for both commercial and industrial applications, providing exceptional results for pest control and disinfection.',
          'Key Features:',
          'Robust Construction: Made with high-quality stainless steel for the fuel tank, fog tube, resonator, cooling jacket, and protective shield, ensuring long-lasting performance and reliability.',
          'Corrosion-Resistant Design: Critical components like seals, gaskets, and diaphragms that come in contact with chemicals are made from Teflon and Viton, ensuring superior corrosion resistance and an extended lifespan.',
          'Efficient Start-up: Features a no-spark plug ignition system, allowing for quick start-ups and minimal maintenance.',
          'Low Maintenance: Designed for ease of use and long-term reliability with minimal upkeep required.',
          'Accessories Included:',
          'The TSF35D is provided with a comprehensive set of accessories, including:',
          '• Tool bag',
          '• Spare parts',
          '• Funnels',
          'These ensure your machine operates seamlessly for over 6 years.',
          'Applications:',
          'The Thermal Fogger TSF35D is versatile and suitable for dispensing both water- and oil-based chemicals, including:',
          '• Pesticides, fungicides, disinfectants, miticides, and poultry vaccines',
          '• Odor neutralizers',
          'It is commonly used for:',
          '• Agricultural crop protection',
          '• Public health disinfection (including mosquito control, malaria, dengue fever, and pest control)',
          'Ideal for sanitation professionals, public health protection, and pest control services.',
          'Why Choose TSF35D?',
          'High Efficiency: Designed for maximum chemical dispersion, ensuring effective coverage with fewer chemicals.',
          'Durability: Built to withstand continuous use with top-quality materials and construction.',
          'Versatility: Can be used for a wide range of applications, from agriculture to public health.'
        ],
        video: '/videos/tsf-35d-intro.mp4'
      },
      {
        id: 'mf100',
        name: 'Mini Mist Fogger MF-100',
        model: 'MF-100',
        category: 'thermal',
        image: mf100Main,
        description: 'Portable mini mist fogger for small-scale pest control and disinfection',
        images: [
          { type: 'image', src: mf100Main },
          { type: 'image', src: mf100Detail1 },
          { type: 'image', src: mf100Detail2 },
          { type: 'image', src: mf100Application },
          { type: 'image', src: mf100Package }
        ],
        specs: [
          { label: 'Model', value: 'MF-100' },
          { label: 'Type', value: 'Mini Mist Fogger' },
          { label: 'Fuel', value: 'Liquid Propane Gas' },
          { label: 'Consumption', value: '1EA/30Min' },
          { label: 'Fuel Tank - Fog', value: 'diesel' },
          { label: 'Fuel Tank - Mist', value: 'water' },
          { label: 'Fuel Tank - Semi Fog', value: 'water' },
          { label: 'Chemicals Tank - Fog', value: 'diesel+water' },
          { label: 'Chemicals Tank - Mist', value: 'water+chemicals' },
          { label: 'Chemicals Tank - Semi Fog', value: 'diesel+chemicals' },
          { label: 'Weight (empty)', value: '2kg' },
          { label: 'Weight (max)', value: '4kg' },
          { label: 'Dimension', value: '600x175x420mm' }
        ],
        features: [
          'Mini Mist Fogger MF-100 - Compact, Efficient, and Versatile',
          'The Mini Mist Fogger MF-100 is designed for portable pest control and disinfection applications. This lightweight and easy-to-operate fogger is ideal for small-scale commercial use, agricultural applications, and household pest management.',
          'Key Features:',
          'Portable Design: Weighing only 2-4kg, the MF-100 is highly portable and easy to carry to different locations.',
          'Liquid Propane Gas Powered: Utilizes liquid propane gas for efficient fuel consumption of just 1EA per 30 minutes.',
          'Multi-Purpose Fogging: Supports three fogging modes - fog, mist, and semi-fog - for flexible application options.',
          'Dual Tank System: Separate fuel and chemical tanks for precise control over fog composition.',
          'Quick Start-up: Easy ignition and minimal setup time for rapid deployment.',
          'Compact Dimensions: 600x175x420mm size makes it easy to store and transport.',
          'Applications:',
          'Ideal for small-scale pest control in residential and commercial settings',
          'Agricultural crop protection and disease prevention',
          'Quick disinfection of small areas and equipment',
          'Mosquito and insect control in gardens and outdoor spaces',
          'Why Choose MF-100?',
          'Affordability: Cost-effective solution for small-scale fogging needs',
          'Ease of Use: Simple operation suitable for non-professional users',
          'Portability: Lightweight design for convenient transportation',
          'Versatility: Multiple fogging modes for different applications'
        ],
        video: null
      },
      {
        id: 'backpack-fogger',
        name: 'Portable Backpack Thermal Fogger',
        model: 'Backpack Fogger',
        category: 'thermal',
        image: backpackMain,
        description: 'High-power portable backpack gasoline thermal fogger for large-area pest control and disinfection',
        images: [
          { src: backpackMain, alt: 'Backpack Fogger Front View', type: 'image' },
          { src: backpackSide, alt: 'Backpack Fogger Side View', type: 'image' },
          { src: backpackDetail, alt: 'Backpack Fogger Detail', type: 'image' },
          { src: backpackFront, alt: 'Backpack Fogger Full View', type: 'image' },
          { src: backpackAccessories, alt: 'Accessories Included', type: 'image' },
          { src: backpackBox, alt: 'Package Contents', type: 'image' },
          { src: backpackSpecs, alt: 'Product Specifications', type: 'image' },
          { src: '/videos/backpack-fogger-intro.mp4', alt: 'Product Video', type: 'video' }
        ],
        specs: [
          { label: 'Working Temperature', value: '-10°C to 35°C' },
          { label: 'Air Humidity', value: '30–80%' },
          { label: 'Spray Volume', value: '50–60 L/h' },
          { label: 'Medicine Tank Volume', value: '7.5L' },
          { label: 'Auxiliary Tank Volume', value: '7.5L' },
          { label: 'Fuel Tank Volume', value: '2.0L' },
          { label: 'Machine Weight', value: '7.5 kg' },
          { label: 'Host Dimensions (LxWxH)', value: '430×150×170 mm' },
          { label: 'Medicine Box Size', value: '430×300×400 mm' },
          { label: 'Fuel Type', value: 'Unleaded Gasoline (no lubricant)' },
          { label: 'Fuel Consumption', value: '3.0 L/h' },
          { label: 'Ignition Power', value: '24V Lithium Battery' }
        ],
        features: [
          'Portable Backpack Thermal Fogger - High Power, Large Coverage, Easy to Carry',
          'This high-power backpack thermal fogger is engineered for professional-grade pest control, agricultural spraying, and disinfection over large areas. With a powerful gasoline engine and a generous 7.5L medicine tank, it delivers outstanding coverage and efficiency.',
          'Key Features:',
          'High-Power Gasoline Engine: Delivers a spray volume of 50–60 L/h for rapid, large-area coverage — ideal for farms, orchards, forests, and public spaces.',
          'Large Dual-Tank Design: 7.5L medicine tank + 7.5L auxiliary tank + 2.0L fuel tank for extended operation without frequent refilling.',
          'Backpack Ergonomics: Comfortable shoulder-strap backpack design distributes weight evenly, reducing fatigue during prolonged use.',
          '24V Lithium Battery Ignition: Reliable electric ignition system for quick, hassle-free start-up every time.',
          'Wide Operating Range: Functions effectively in temperatures from -10°C to 35°C and humidity of 30–80%, suitable for diverse climates.',
          'Simple Structure & Easy Maintenance: Straightforward mechanical design allows for quick field repairs with minimal tools.',
          'Accessories Included:',
          'Complete accessory kit including tool bag, spare parts, funnels, shoulder strap, and protective mask — everything needed for immediate deployment.',
          'Applications:',
          'Agricultural crop protection — pesticide and fungicide application for orchards, farms, and plantations',
          'Forest and green space management — mosquito control and pest prevention',
          'Livestock and poultry farm disinfection',
          'Public health and epidemic prevention — disinfection of large outdoor and semi-enclosed areas',
          'Greenhouse and nursery treatment',
          'Why Choose This Backpack Fogger?',
          'Massive Coverage: 50–60 L/h spray rate covers large areas quickly, saving time and labor.',
          'Fuel Efficient: Uses only 3.0 L/h of unleaded gasoline for cost-effective operation.',
          'Professional Grade: Built for continuous commercial use with durable materials and reliable ignition.',
          'Ready Stock: Available for immediate shipment with full accessory kit included.'
        ],
        video: '/videos/backpack-fogger-intro.mp4'
      },
      {
        id: 'spray-ulv',
        name: '5.6L Ultra-Low Volume Sprayer',
        model: 'ELT-SPRAY-5.6L',
        category: 'ulv',
        image: require('@/assets/images/products/spray-ulv/spray-detail2.jpg'),
        description: 'Professional electric ULV sprayer with 5.6L tank for indoor and outdoor disinfection and pest control',
        images: [
          { src: require('@/assets/images/products/spray-ulv/spray-detail1.jpg'), alt: 'Component Assembly View', type: 'image' },
          { src: require('@/assets/images/products/spray-ulv/spray-detail2.jpg'), alt: 'Side View & Switch Detail', type: 'image' },
          { src: require('@/assets/images/products/spray-ulv/spray-detail3.jpg'), alt: 'Disassembly & Tank Interior', type: 'image' },
          { src: require('@/assets/images/products/spray-ulv/spray-detail4.jpg'), alt: 'Product Dimensions', type: 'image' },
          { src: '/videos/spray-ulv-intro.mp4', alt: 'Product Video', type: 'video' }
        ],
        specs: [
          { label: 'Product Name', value: '5.6 L Ultra-Low Volume Sprayer' },
          { label: 'Power Supply', value: '220V 50HZ' },
          { label: 'Rated Power', value: '1200W' },
          { label: 'Tank Capacity', value: '5.6L' },
          { label: 'Maximum Spray Output', value: '400ML/Min' },
          { label: 'Spray Distance', value: '10-12 Meters' },
          { label: 'Cable Length', value: '2.5M' },
          { label: 'Plug Options', value: 'US standards' },
          { label: 'Dimension', value: '26×22×40CM' },
          { label: 'Net Weight', value: '3.6 KG' },
          { label: 'Gross Weight', value: '7 KG' }
        ],
        features: [
          '5.6L Ultra-Low Volume Sprayer - Professional Electric Disinfection & Pest Control',
          'The 5.6L ULV Sprayer is a high-performance electric sprayer designed for efficient disinfection, pest control, and agricultural applications. With a powerful 1200W motor and a generous 5.6L tank, it delivers professional-grade results for both indoor and outdoor use.',
          'Key Features:',
          'High-Power 1200W Motor: Delivers a maximum spray output of 400ML/min for rapid, thorough coverage of large areas.',
          'Large 5.6L Tank Capacity: Reduces the need for frequent refilling, enabling extended operation without interruption.',
          'Long Spray Distance: Reaches up to 10-12 meters, allowing effective coverage from a safe distance.',
          'Standard Power Supply: Operates on 220V 50Hz, compatible with standard household and commercial power outlets.',
          'Portable Design: Compact dimensions (26×22×40CM) and lightweight (3.6KG net weight) for easy transport and storage.',
          'Long Power Cord: 2.5M cable length provides freedom of movement without the need for extension cords in most settings.',
          'Applications:',
          'Indoor and outdoor disinfection — hospitals, schools, offices, warehouses, and public spaces',
          'Agricultural pest control — greenhouses, nurseries, and crop protection',
          'Mosquito and insect control in residential and commercial settings',
          'Livestock and poultry farm sanitation',
          'Why Choose This ULV Sprayer?',
          'Professional Performance: 1200W power and 400ML/min output ensure fast, effective coverage.',
          'Easy to Use: Simple operation suitable for both professional and non-professional users.',
          'Versatile Application: Suitable for a wide range of disinfection and pest control scenarios.',
          'Reliable Quality: Built with durable materials for long-lasting, consistent performance.'
        ],
        video: null
      },
      {
        id: 'spray-backpack',
        name: 'Stainless Steel Backpack Pressure Sprayer',
        model: 'ZL-210A',
        category: 'spray',
        image: require('@/assets/images/products/spray-backpack/backpack-main.jpg'),
        description: 'Professional SUS-304 stainless steel backpack pressure sprayer with pressure gauge, Viton seals, and brass adjustable nozzle for all-chemical compatibility',
        images: [
          { src: require('@/assets/images/products/spray-backpack/backpack-main.jpg'), alt: 'Main View', type: 'image' },
          { src: require('@/assets/images/products/spray-backpack/backpack-gauge.jpg'), alt: 'Pressure Gauge Detail', type: 'image' },
          { src: require('@/assets/images/products/spray-backpack/backpack-top.jpg'), alt: 'Top View', type: 'image' },
          { src: require('@/assets/images/products/spray-backpack/backpack-side.jpg'), alt: 'Side View', type: 'image' },
          { src: '/videos/backpack-sprayer.mp4', alt: 'Product Video', type: 'video' }
        ],
        specs: [
          { label: 'Model', value: 'ZL-210A Series (21012A / 21014A / 21016A)' },
          { label: 'Tank Capacity', value: '12L (3GAL) / 14L (3.5GAL) / 16L (4GAL)' },
          { label: 'Working Pressure', value: '25–55 psi' },
          { label: 'Tank Material', value: 'SUS-304 Stainless Steel' },
          { label: 'Pump Material', value: 'SUS-304 Stainless Steel' },
          { label: 'Spray Wand', value: 'SUS-304 Stainless Steel' },
          { label: 'Seal Material', value: 'Viton (Chemical Resistant)' },
          { label: 'Nozzle', value: 'Brass, Adjustable' },
          { label: 'Shut-off Valve', value: 'Brass with Lock-on Feature' },
          { label: 'Pressure Gauge', value: 'Built-in with Safety Relief Valve' },
          { label: 'Dimensions (16L)', value: '22 × 22 × 71 cm' },
          { label: 'Pack Qty', value: '1 per carton' }
        ],
        features: [
          'Stainless Steel Backpack Pressure Sprayer (210A Series) — Industrial-Grade Chemical Spraying Solution',
          'The ZL-210A Series is a professional-grade backpack pressure sprayer engineered for demanding agricultural, industrial, and disinfection applications. Constructed entirely from high-quality SUS-304 stainless steel, it delivers exceptional corrosion resistance and long service life.',
          'Key Features:',
          'Full SUS-304 Stainless Steel Construction: Tank, pump, and spray wand are all made from premium stainless steel, ensuring maximum durability and resistance to harsh chemicals.',
          'Viton Seals & Gaskets: Viton material is compatible with virtually all types of chemicals, pesticides, herbicides, and disinfectants, making this sprayer highly versatile.',
          'Brass Shut-off with Lock-on Feature: Reduces operator fatigue during extended spraying sessions with a convenient lock-on mechanism.',
          'Adjustable Brass Nozzle: Provides flexible spray patterns from fine mist to concentrated jet, suitable for various application needs.',
          'Built-in Pressure Gauge & Safety Relief Valve: Allows precise pressure monitoring and safe depressurization before opening the tank.',
          'Ergonomic Handle & Shoulder Strap: Designed for comfortable carrying and easy pumping during extended use.',
          'Applications:',
          'Agricultural pest and weed control — crops, orchards, and greenhouses',
          'Industrial and construction equipment maintenance — oil and lubricant application',
          'Public health disinfection — hospitals, schools, and public spaces',
          'Livestock and poultry farm sanitation',
          'Available Capacities: 12L (3GAL), 14L (3.5GAL), 16L (4GAL)'
        ],
        video: '/videos/backpack-sprayer.mp4'
      },
      {
        id: 'yf-450',
        name: 'Electric ULV Cold Fogger YF-450',
        model: 'YF-450',
        category: 'ulv',
        image: yf450Main,
        description: 'Portable electric ULV cold fogger with 4.5L tank, 1200W motor, 6-8m spray range for disinfection and pest control',
        images: [
          { src: yf450Main, alt: 'YF-450 Main View', type: 'image' },
          { src: yf450Side, alt: 'YF-450 Side View', type: 'image' },
          { src: yf450Back, alt: 'YF-450 Back View', type: 'image' },
          { src: yf450Front, alt: 'YF-450 Front View', type: 'image' },
          { src: yf450Angle, alt: 'YF-450 Angle View', type: 'image' },
          { src: '/videos/yf450-intro.mp4', alt: 'Product Video', type: 'video' }
        ],
        specs: [
          { label: 'Model', value: 'YF-450' },
          { label: 'Product Name', value: 'Electric ULV Cold Fogger Machine' },
          { label: 'Capacity', value: '4.5L' },
          { label: 'Power', value: '1200W' },
          { label: 'Voltage', value: '110V/60Hz, 220V–240V/50Hz' },
          { label: 'Spray Range', value: '6–8 meters' },
          { label: 'Sprayer Type', value: 'Pump' },
          { label: 'Power Source', value: 'Electric' },
          { label: 'Nozzle', value: 'Spray' },
          { label: 'Feature', value: 'Automatic' },
          { label: 'Color', value: 'White & Blue' },
          { label: 'Net Weight', value: '2.76 kg / 6.08 lbs' },
          { label: 'Measurement (LxWxH)', value: '390×230×430 mm / 15.35×9×16.9 inch' },
          { label: 'Place of Origin', value: 'Guangdong, China' }
        ],
        features: [
          'Electric ULV Cold Fogger YF-450 — Portable, Powerful, and Versatile Disinfection Solution',
          'The YF-450 is a high-performance portable electric ULV cold fogger designed for efficient disinfection, pest control, and sterilization across a wide range of environments. With a powerful 1200W motor and a 4.5L tank, it delivers professional-grade fogging results for both indoor and outdoor use.',
          'Key Features:',
          'Powerful 1200W Motor: Delivers strong, consistent fogging performance with a spray range of 6–8 meters, ensuring effective coverage of large areas.',
          'Large 4.5L Tank Capacity: Reduces the need for frequent refilling, enabling extended continuous operation.',
          'Wide Voltage Compatibility: Supports both 110V/60Hz and 220V–240V/50Hz, making it suitable for use in markets worldwide.',
          'Automatic Pump System: Fully automatic electric pump ensures stable, consistent spray output with minimal operator effort.',
          'Adjustable Flow Rate: Fine-tune the spray output to suit different application requirements and chemical concentrations.',
          'Compact & Portable Design: Lightweight at just 2.76 kg with a compact footprint (390×230×430 mm), easy to carry and store.',
          'CE & UE Certified: Meets international safety and quality standards for worry-free compliance.',
          'Applications:',
          'Garden, lawn, and farm spraying — pesticide and fungicide application',
          'Hospital and clinic disinfection — rapid sterilization of large spaces',
          'School and office sanitation — regular hygiene maintenance',
          'Home pest control — mosquito, insect, and mold treatment',
          'Hotel and hospitality — guest room and common area disinfection',
          'Why Choose YF-450?',
          'Professional Performance: 1200W power and 6–8m spray range ensure fast, thorough coverage.',
          'Global Compatibility: Dual-voltage design supports worldwide use without adapters.',
          'Ease of Use: Simple automatic operation suitable for both professional and non-professional users.',
          'Reliable Quality: CE/UE certified with durable construction for long-lasting performance.'
        ],
        video: '/videos/yf450-intro.mp4'
      },
      {
        id: 'pantry-moth-trap',
        name: 'Pantry Moth Glue Trap',
        model: 'PMT-001',
        category: 'other',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mouse%20and%20insect%20glue%20trap%20packaging%20boxes%20white%20background%20how%20to%20use%20instructions%20bug%20icons%20spider%20fly%20beetle%20professional%20product%20photo&image_size=square',
        description: 'Non-toxic pantry moth glue trap with natural pheromone attractant for effective kitchen pest control',
        images: [
          { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pantry%20moth%20glue%20trap%20triangular%20shape%20ideal%20home%20product%2011cm%20x%209.7cm%20x%209cm%20dimensions%20white%20background&image_size=landscape_4_3', alt: 'Pantry Moth Trap Main View', type: 'image' },
          { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pantry%20moth%20trap%20before%20after%20comparison%20quick%20effect%20non%20toxic%20natural%20ingredients%20butterfly%20moths%20stuck%20on%20trap&image_size=landscape_16_9', alt: 'Before & After Effect', type: 'image' },
          { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pantry%20moth%20glue%20trap%20glue%20sheets%20stacked%20black%20border%20white%20background%20product%20detail&image_size=landscape_4_3', alt: 'Glue Sheets Detail', type: 'image' },
          { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pantry%20moth%20glue%20trap%20triangular%20product%20with%20dimensions%2011cm%204.33inch%209.7cm%203.81inch%209cm%203.54inch%20white%20background&image_size=landscape_4_3', alt: 'Product Dimensions', type: 'image' },
          { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pantry%20moth%20glue%20trap%20sticky%20sheet%20with%20protective%20film%20peeled%20off%20black%20grid%20pattern%20white%20background&image_size=landscape_4_3', alt: 'Sticky Sheet with Protective Film', type: 'image' }
        ],
        specs: [
          { label: 'Product Name', value: 'Pantry Moth Glue Trap' },
          { label: 'Model', value: 'PMT-001' },
          { label: 'Size', value: '11cm x 9.7cm x 9cm (4.33" x 3.81" x 3.54")' },
          { label: 'Material', value: 'Premium Cardboard + Strong Adhesive' },
          { label: 'Attractant', value: 'Natural Pheromone Lure' },
          { label: 'Coverage Area', value: 'Up to 100 sq. ft' },
          { label: 'Duration', value: 'Up to 3 months' },
          { label: 'Package Includes', value: '6 traps per pack' },
          { label: 'Application', value: 'Kitchen, Pantry, Storage Areas' },
          { label: 'Safety', value: 'Non-toxic, Eco-friendly' }
        ],
        features: [
          'Pantry Moth Glue Trap — Quick Effect, Non-toxic, Natural Ingredients',
          'The Ideal Home Pantry Moth Glue Trap is a safe and effective solution for controlling pantry moths in your kitchen and storage areas. Using natural pheromone attractants and strong adhesive, it provides quick results without harmful chemicals.',
          'Key Features:',
          'Quick Effect: Powerful pheromone attractant lures male moths to the trap, breaking the breeding cycle and reducing moth populations rapidly.',
          'Non-toxic Formula: Made with natural ingredients, safe for use around food, children, and pets.',
          'Strong Adhesive: Premium-grade glue ensures moths stick securely and cannot escape.',
          'Easy to Use: Simple 4-step setup — open the trap, peel off protective layer, fold into triangular shape, and place in pantry or storage area.',
          'Long-lasting: Each trap remains effective for up to 3 months, providing continuous protection.',
          'Discreet Design: Compact triangular shape fits easily in cabinets, shelves, and pantries without taking up much space.',
          'Reclaim Your Closet In 4 Simple Steps:',
          '1. Open the trap — Remove from packaging and unfold',
          '2. Peel off protective layer — Expose the adhesive surface',
          '3. Fold into place — Form the triangular trap shape',
          '4. Hang 1-2 traps in closet & replace when full',
          'Applications:',
          'Kitchen pantries — protect cereal, flour, grains, and dried goods',
          'Food storage areas — prevent infestation in cabinets and shelves',
          'Closets — protect clothing from moth damage',
          'Garages and basements — control moths in storage boxes',
          'Why Choose Our Pantry Moth Trap?',
          'Natural & Safe: Non-toxic ingredients make it safe for food areas',
          'Effective: Proven pheromone technology attracts male moths',
          'Easy: No assembly required, ready to use in seconds',
          'Long-lasting: Each trap works for up to 3 months',
          'Value Pack: 6 traps per package for comprehensive coverage'
        ],
        video: null
      }
    ];

    return {
      allProducts,
      filteredProducts: allProducts,
      viewMode: 'list', // 'list' or 'detail'
      activeCategory: 'all',
      currentCategoryLabel: 'All Products',
      selectedProduct: null,
      selectedImage: null,
      selectedMediaType: 'image', // 'image' or 'video'
      searchQuery: '',
      showTopBtn: false
    };
  },
  methods: {
    showProductList(category = 'all') {
      this.viewMode = 'list';
      this.activeCategory = category;
      this.searchQuery = '';
      
      const labels = {
        all: 'All Products',
        ulv: 'ULV Cold Fogger',
        thermal: 'Thermal Fogger',
        mist: 'Mini Mist Fogger',
        spray: 'ULV Sprayer'
      };
      
      this.currentCategoryLabel = labels[category] || 'All Products';
      
      if (category === 'all') {
        this.filteredProducts = this.allProducts;
      } else {
        this.filteredProducts = this.allProducts.filter(p => p.category === category);
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    showProductDetail(productId) {
      const product = this.allProducts.find(p => p.id === productId);
      if (product) {
        this.selectedProduct = product;
        this.selectedImage = product.images[0].src;
        this.selectedMediaType = product.images[0].type || 'image';
        this.viewMode = 'detail';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    
    selectMedia(media) {
      this.selectedImage = media.src;
      this.selectedMediaType = media.type || 'image';
    },
    
    filterProducts() {
      const query = this.searchQuery.toLowerCase();
      
      if (!query) {
        this.showProductList(this.activeCategory);
        return;
      }
      
      this.filteredProducts = this.allProducts.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.model.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    },
    
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    handleScroll() {
      this.showTopBtn = window.scrollY > 300;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.showProductList('all');
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
.product-catalog-page {
  background-color: #fff;
  padding-top: 0;
}

/* Hero Banner */
.catalog-hero {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
}

.hero-banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Main Container */
.catalog-container {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

/* Sidebar */
.sidebar {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  height: fit-content;
  position: sticky;
  top: 100px;
}

.category-section {
  margin-bottom: 2rem;
}

.category-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2ecc71;
  background: #e8f8f5;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.all-products-section {
  margin-bottom: 0.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e8f8f5;
}

.all-products-section .category-list a {
  font-size: 1rem;
  font-weight: 700;
  color: #27ae60;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-list li {
  margin-bottom: 0.5rem;
}

.category-list a {
  display: block;
  padding: 0.6rem 0.75rem;
  color: #555;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.category-list a:hover {
  background-color: #e8f8f5;
  color: #2ecc71;
  font-weight: 600;
}

.category-list a.active {
  background-color: #2ecc71;
  color: white;
  font-weight: 700;
}

/* Main Content */
.main-content {
  flex: 1;
}

/* List View */
.list-view {
  animation: fadeIn 0.3s ease;
}

/* Breadcrumb & Search */
.breadcrumb-search-area {
  margin-bottom: 2rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  color: #666;
}

.breadcrumb-icon {
  font-size: 1.2rem;
}

.breadcrumb-text {
  font-weight: 600;
  color: #333;
}

.search-box {
  display: flex;
  gap: 0.5rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.5rem;
  max-width: 600px;
}

.search-box input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.75rem;
  font-size: 0.95rem;
  color: #333;
}

.search-box input::placeholder {
  color: #999;
}

.search-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0 0.75rem;
  color: #999;
  transition: color 0.3s;
}

.search-btn:hover {
  color: #2ecc71;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.product-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  cursor: pointer;
}

.product-card:hover {
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  transform: translateY(-5px);
}

.product-card-content {
  display: block;
  text-decoration: none;
  color: inherit;
}

.product-image-wrapper {
  width: 100%;
  height: 250px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-name {
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  line-height: 1.4;
  min-height: 2.8em;
}

.product-model {
  padding: 0 1rem 1rem;
  font-size: 0.85rem;
  color: #999;
  margin: 0;
}

/* Detail View */
.detail-view {
  animation: fadeIn 0.3s ease;
}

.breadcrumb-detail {
  margin-bottom: 2rem;
  font-size: 0.95rem;
  color: #666;
}

.breadcrumb-link {
  color: #2ecc71;
  text-decoration: none;
  font-weight: 600;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-sep {
  margin: 0 0.5rem;
  color: #999;
}

.breadcrumb-current {
  color: #2ecc71;
  font-weight: 600;
}

.detail-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
}

.detail-images {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image-wrapper {
  width: 100%;
  height: 400px;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
}

.main-video {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.video-thumb-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.play-icon {
  font-size: 2rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.thumbnail-images {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.thumb-btn {
  width: 80px;
  height: 80px;
  border: 2px solid #ddd;
  border-radius: 4px;
  padding: 2px;
  cursor: pointer;
  background: white;
  transition: all 0.3s;
}

.thumb-btn:hover {
  border-color: #2ecc71;
}

.thumb-btn.active {
  border-color: #2ecc71;
  box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.1);
}

.thumb-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-info {
  display: flex;
  flex-direction: column;
}

.detail-title {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 0.5rem 0;
}

.detail-model {
  font-size: 1.1rem;
  color: #999;
  margin: 0 0 2rem 0;
}

.specs-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.spec-item {
  display: grid;
  grid-template-columns: 40% 60%;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.spec-label {
  font-weight: 600;
  color: #333;
}

.spec-value {
  color: #666;
}

/* Features Section */
.detail-features {
  margin: 3rem 0;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
}

.detail-features h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 1.5rem 0;
}

.feature-text {
  margin: 0 0 1rem 0;
  line-height: 1.6;
  color: #555;
}

.feature-text:last-child {
  margin-bottom: 0;
}

/* Detail Footer */
.detail-footer {
  text-align: center;
  padding: 2rem 0;
}

.btn-back-list {
  background: #f0f0f0;
  color: #333;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-back-list:hover {
  background: #2ecc71;
  color: white;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem;
  color: #999;
  font-size: 1.1rem;
}

/* Floating Top Button */
.float-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
}

.float-top-btn:hover {
  background: #27ae60;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(46, 204, 113, 0.4);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .catalog-container {
    grid-template-columns: 240px 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  .detail-header {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .catalog-container {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }
  
  .sidebar {
    position: static;
    margin-bottom: 1.5rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .product-image-wrapper {
    height: 200px;
  }
  
  .search-box {
    max-width: 100%;
  }
  
  .catalog-hero {
    height: 150px;
  }
  
  .detail-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .catalog-container {
    padding: 0.75rem;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .category-list a {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
  
  .breadcrumb {
    font-size: 0.85rem;
  }
}
</style>
