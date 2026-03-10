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
        <div class="category-section">
          <h3 class="category-title">Fogger</h3>
          <ul class="category-list">
            <li><a href="#" @click.prevent="showProductList()" :class="{ active: viewMode === 'list' }">All Products</a></li>
            <li><a href="#" @click.prevent="showProductList('ulv')" :class="{ active: viewMode === 'list' && activeCategory === 'ulv' }">ULV Cold Fogger</a></li>
            <li><a href="#" @click.prevent="showProductList('thermal')" :class="{ active: viewMode === 'list' && activeCategory === 'thermal' }">Thermal Fogger</a></li>
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
                <img :src="selectedImage" :alt="selectedProduct.name" class="main-image">
              </div>
              <div class="thumbnail-images">
                <button v-for="(img, idx) in selectedProduct.images" :key="idx" @click="selectedImage = img.src" :class="{ active: selectedImage === img.src }" class="thumb-btn">
                  <img :src="img.src" :alt="img.alt">
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
          { src: ulvProductMain, alt: 'Main' },
          { src: ulvProductWorking, alt: 'Working' },
          { src: ulvDetail1, alt: 'Detail 1' },
          { src: ulvDetail2, alt: 'Detail 2' }
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
        ]
      },
      {
        id: 'tsf35d',
        name: 'TSF-35D Thermal Fogger',
        model: 'TSF-35D',
        category: 'thermal',
        image: tsf35dFull,
        description: 'High-efficiency thermal fogger for pest control and disinfection',
        images: [
          { src: tsf35dFull, alt: 'TSF-35D Full View' },
          { src: tsf35dSide, alt: 'TSF-35D Side View' },
          { src: tsf35dNozzle, alt: 'TSF-35D Nozzle Detail' },
          { src: tsf35dDetail, alt: 'TSF-35D Engine Detail' }
        ],
        specs: [
          { label: 'Power Supply', value: 'AC220V or 110V' },
          { label: 'Power', value: '1000W' },
          { label: 'Tank Capacity', value: '5L' },
          { label: 'Sprayer Volume', value: '470ml/min (adjustable)' },
          { label: 'Droplet Size', value: '5-150 μm' },
          { label: 'Effective Range', value: '6-8m' },
          { label: 'Net Weight', value: '2.6kg' },
          { label: 'Gross Weight', value: '3.2kg' },
          { label: 'Measurement(mm)', value: '480*280*260' }
        ],
        features: [
          'Robust Stainless Steel Build - Constructed with high-grade stainless steel to withstand harsh chemicals and extreme operating environments.',
          'Precision Fog Generation - Optimized combustion system produces high-density fog that stays suspended longer for maximum effectiveness.',
          'Ergonomic Design - Lightweight and well-balanced construction makes it comfortable to operate for extended periods.',
          'Complete Accessory Kit - Includes all necessary components and tools for easy setup, operation, and maintenance.'
        ]
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
        thermal: 'Thermal Fogger'
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
        this.viewMode = 'detail';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
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
