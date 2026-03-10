<template>
  <main>
    <!-- Product Catalog Navigation -->
    <section class="section bg-gray-100" style="margin-top: 80px;">
      <div class="container">
        <div class="product-catalog-nav">
          <button :class="{ active: currentProduct.id === 'ulv' }" @click="switchProduct('ulv')">ULV Cold Fogger</button>
          <button :class="{ active: currentProduct.id === 'tsf35d' }" @click="switchProduct('tsf35d')">TSF-35D Thermal Fogger</button>
        </div>
      </div>
    </section>

    <!-- Product Hero -->
    <section class="section bg-primary-700 text-white">
      <div class="container text-center">
        <h1>{{ currentProduct.heroTitle }}</h1>
        <p class="section-subtitle text-white">{{ currentProduct.heroSubtitle }}</p>
      </div>
    </section>

    <!-- Product Overview -->
    <section class="section">
      <div class="container">
        <div class="product-grid">
          <div class="product-images">
            <img :src="selectedImage" :alt="currentProduct.name" class="main-image">
            <div class="thumbnail-grid">
              <button v-for="(img, idx) in currentProduct.images" :key="idx" @click="selectedImage = img.src" class="thumbnail" :class="{ active: selectedImage === img.src }">
                <img :src="img.src" :alt="img.alt">
              </button>
            </div>
            <div v-if="currentProduct.video" class="product-video">
              <video controls :src="currentProduct.video" class="w-full rounded-lg"></video>
            </div>
          </div>
          
          <div class="product-info">
            <div class="badges">
              <span class="badge">In Stock</span>
              <span class="badge">CE Certified</span>
              <span class="badge">Best Seller</span>
            </div>
            
            <h2>{{ currentProduct.name }}</h2>
            <p class="model">Model: {{ currentProduct.model }}</p>
            
            <div class="specs-table">
              <div v-for="spec in currentProduct.specs" :key="spec.label" class="spec-row">
                <span class="spec-label">{{ spec.label }}</span>
                <span class="spec-value">{{ spec.value }}</span>
              </div>
            </div>
            
            <div class="functions">
              <h4>Functions</h4>
              <div class="function-grid">
                <div v-for="func in currentProduct.functions" :key="func.name" class="function-item">
                  <span class="func-icon">{{ func.icon }}</span>
                  <div>
                    <div class="func-name">{{ func.name }}</div>
                    <div class="func-desc">{{ func.desc }}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="product-buttons">
              <router-link to="/contact" class="btn-primary">Request a Quote</router-link>
              <router-link to="/contact" class="btn-outline">Contact Sales</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Details -->
    <section class="section bg-gray-50">
      <div class="container">
        <h2 class="section-title">Product Details</h2>
        <div class="grid grid-2">
          <div v-for="(img, idx) in currentProduct.detailImages" :key="idx" class="detail-card">
            <img :src="img.src" :alt="img.title" class="detail-img">
            <h4>{{ img.title }}</h4>
            <p>{{ img.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section bg-primary-700 text-white text-center">
      <div class="container">
        <h2>Interested in Our {{ currentProduct.name }}?</h2>
        <p>Get competitive pricing and detailed product information today.</p>
        <router-link to="/contact" class="btn-primary" style="background-color: var(--white); color: var(--primary-700);">Request a Quote Now</router-link>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'ProductView',
  data() {
    const ulvProductMain = require('@/assets/images/product-main.jpg');
    const ulvProductWorking = require('@/assets/images/product-working.jpg');
    const ulvDetail1 = require('@/assets/images/detail-1.jpg');
    const ulvDetail2 = require('@/assets/images/detail-2.jpg');
    const ulvDetail3 = require('@/assets/images/detail-3.jpg');
    const ulvProductSafety = require("@/assets/images/product-safety.png");
    const ulvDetail5Cropped = require("@/assets/images/detail-5-cropped.jpg");
    const ulvVideo = '/videos/ulv-cold-fogger-demo.mp4'; // Public folder video

    const tsf35dNozzle = require('@/assets/images/products/tsf-35d/tsf-35d-nozzle.jpg');
    const tsf35dSide = require('@/assets/images/products/tsf-35d/tsf-35d-side.jpg');
    const tsf35dAccessories = require('@/assets/images/products/tsf-35d/tsf-35d-accessories.jpg');
    const tsf35dFull = require('@/assets/images/products/tsf-35d/tsf-35d-full.jpg');
    const tsf35dDetail = require('@/assets/images/products/tsf-35d/tsf-35d-detail.jpg');
    const tsf35dVideo = '/videos/tsf-35d-demo.mp4'; // Public folder video

    const ulvColdFogger = {
      id: 'ulv',
      name: 'Electric ULV Cold Fogger',
      model: 'ELT-ULV-5L',
      heroTitle: 'ULV Cold Fogger',
      heroSubtitle: 'Professional Electric ULV Cold Fogger — Spraying 1000㎡ in Just 10 Minutes',
      images: [
        { src: ulvProductMain, alt: 'Main' },
        { src: ulvProductWorking, alt: 'Working' },
        { src: ulvDetail1, alt: 'Detail 1' },
        { src: ulvDetail2, alt: 'Detail 2' }
      ],
      specs: [
        { label: 'Atomization Volume', value: '0~470 ml/min (Adjustable)' },
        { label: 'Power', value: '1000 W, AC 110V 50Hz optional' },
        { label: 'Particle size', value: '5-45 μm (Adjustable)' },
        { label: 'Tank Capacity', value: '5L' },
        { label: 'Effective range', value: '6-8m' },
        { label: 'Rpm', value: '32,000 rpm' },
        { label: 'Net weight', value: '2.6kg / 5.7 lbs' },
        { label: 'Gross weight', value: '3.4 kg / 7.49 lbs' },
        { label: 'Measurement', value: '470*280*240mm' }
      ],
      functions: [
        { icon: '🦠', name: 'Sterilization', desc: 'Kill bacteria & viruses' },
        { icon: '🌿', name: 'Insecticidal', desc: 'Pest control' },
        { icon: '💧', name: 'Humidification', desc: 'Moisture regulation' },
        { icon: '🌫️', name: 'Disinfection', desc: 'Full-area sanitization' }
      ],
      detailImages: [
        { src: ulvDetail1, title: 'Powerful Motor', desc: '1200W motor ensures consistent performance' },
        { src: ulvDetail2, title: 'Centrifugal Atomization', desc: 'Ultra-fine droplet generation' },
        { src: ulvDetail3, title: 'Flexible Nozzle', desc: '360° adjustable spray direction' },
        { src: ulvProductSafety, title: 'Safety Features', desc: 'Anti-backflow protection system' },
        { src: ulvDetail5Cropped, title: 'Professional Grade', desc: 'Hospital-grade disinfection' },
        { src: ulvProductWorking, title: 'In Action', desc: 'Real-world application' }
      ],
      video: ulvVideo
    };

    const tsf35dThermalFogger = {
      id: 'tsf35d',
      name: 'TSF-35D Thermal Fogger',
      model: 'TSF-35D',
      heroTitle: 'TSF-35D Thermal Fogger',
      heroSubtitle: 'High-Efficiency Thermal Fogger for Disinfection & Pest Control',
      images: [
        { src: tsf35dFull, alt: 'TSF-35D Full View' },
        { src: tsf35dSide, alt: 'TSF-35D Side View' },
        { src: tsf35dNozzle, alt: 'TSF-35D Nozzle Detail' },
        { src: tsf35dDetail, alt: 'TSF-35D Engine Detail' },
        { src: tsf35dAccessories, alt: 'TSF-35D Accessories' }
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
      functions: [
        { icon: '🔥', name: 'Thermal Fogging', desc: 'High-density fog for wide coverage' },
        { icon: '🦟', name: 'Pest Control', desc: 'Effective against insects and mosquitoes' },
        { icon: '🛡️', name: 'Disinfection', desc: 'Deep penetration for sanitization' },
        { icon: '💨', name: 'Quick Action', desc: 'Rapid deployment and treatment' }
      ],
      detailImages: [
        { src: tsf35dFull, title: 'Robust Design', desc: 'Durable stainless steel construction' },
        { src: tsf35dNozzle, title: 'Precision Nozzle', desc: 'Optimized for fine fog generation' },
        { src: tsf35dDetail, title: 'Powerful Engine', desc: 'Reliable performance for demanding tasks' },
        { src: tsf35dAccessories, title: 'Complete Kit', desc: 'Includes all necessary tools and manual' }
      ],
      video: tsf35dVideo
    };

    return {
      products: {
        ulv: ulvColdFogger,
        tsf35d: tsf35dThermalFogger
      },
      currentProduct: ulvColdFogger, // Default to ULV Cold Fogger
      selectedImage: ulvColdFogger.images[0].src
    };
  },
  methods: {
    switchProduct(productId) {
      this.currentProduct = this.products[productId];
      this.selectedImage = this.currentProduct.images[0].src;
    }
  },
  created() {
    // Check if a product ID is provided in the route, e.g., /product?id=tsf35d
    const productId = this.$route.query.id;
    if (productId && this.products[productId]) {
      this.switchProduct(productId);
    }
  }
};
</script>

<style scoped>
.product-catalog-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.product-catalog-nav button {
  background-color: var(--gray-200);
  color: var(--gray-800);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.product-catalog-nav button:hover {
  background-color: var(--primary-100);
  color: var(--primary-700);
}

.product-catalog-nav button.active {
  background-color: var(--primary-700);
  color: var(--white);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.product-images {
  position: sticky;
  top: 120px;
}

.main-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 1rem;
  margin-bottom: 1rem;
  background-color: var(--gray-100);
}

.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.thumbnail {
  border: 2px solid transparent;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.3s ease;
  background: none;
  padding: 0;
  height: 80px;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail.active {
  border-color: var(--primary-700);
}

.product-video {
  margin-top: 1rem;
}

.badges {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  background-color: var(--primary-50);
  color: var(--primary-700);
}

.model {
  color: var(--gray-500);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.specs-table {
  background-color: var(--gray-50);
  border-radius: 0.75rem;
  overflow: hidden;
  margin-bottom: 2rem;
}

.spec-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--gray-200);
}

.spec-row:last-child {
  border-bottom: none;
}

.spec-label {
  font-weight: 600;
  color: var(--gray-600);
}

.spec-value {
  text-align: right;
  color: var(--gray-800);
}

.functions {
  margin-bottom: 2rem;
}

.functions h4 {
  margin-bottom: 1rem;
}

.function-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.function-item {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background-color: var(--gray-50);
  border-radius: 0.5rem;
}

.func-icon {
  font-size: 1.5rem;
}

.func-name {
  font-weight: 600;
  font-size: 0.9rem;
}

.func-desc {
  font-size: 0.8rem;
  color: var(--gray-500);
}

.product-buttons {
  display: flex;
  gap: 1rem;
}

.detail-card {
  border-radius: 1rem;
  overflow: hidden;
  background-color: var(--white);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.detail-img {
  width: 100%;
  height: 250px; /* 可以根据需要调整高度 */
  object-fit: contain; /* 确保图片完整显示 */
  background-color: #f0f0f0; /* 添加背景色，防止 contain 模式下出现透明区域 */
}

.detail-card h4 {
  padding: 1rem 1rem 0;
}

.detail-card p {
  padding: 0 1rem 1rem;
  font-size: 0.9rem;
  color: var(--gray-600);
}

.grid.grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .product-images {
    position: static;
    top: auto;
  }

  .main-image {
    height: 300px;
  }

  .thumbnail {
    height: 60px;
  }

  .function-grid {
    grid-template-columns: 1fr;
  }

  .product-buttons {
    flex-direction: column;
  }
  
  .grid.grid-2 {
    grid-template-columns: 1fr;
  }
}
</style>
