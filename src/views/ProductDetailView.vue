<template>
  <main class="product-detail-page">
    <!-- Sticky Product Sub-Nav -->
    <nav class="product-subnav">
      <div class="container flex-between">
        <div class="product-name-mini">{{ currentProduct.name }}</div>
        <div class="nav-links">
          <a href="#overview">Overview</a>
          <a href="#features">Features</a>
          <a href="#specs">Specifications</a>
          <a href="#video" v-if="currentProduct.video">Video</a>
          <router-link to="/contact" class="btn-small">Request Quote</router-link>
        </div>
      </div>
    </nav>

    <!-- Product Hero Section -->
    <section id="overview" class="product-hero">
      <div class="container grid grid-2 items-center">
        <div class="hero-image-wrapper">
          <img :src="selectedImage" :alt="currentProduct.name" class="hero-main-img">
          <div class="hero-thumbnails">
            <button v-for="(img, idx) in currentProduct.images" :key="idx" @click="selectedImage = img.src" :class="{ active: selectedImage === img.src }">
              <img :src="img.src" :alt="img.alt">
            </button>
          </div>
        </div>
        <div class="hero-content">
          <div class="brand-tag">Elantor Professional</div>
          <h1>{{ currentProduct.name }}</h1>
          <p class="model-number">Model: {{ currentProduct.model }}</p>
          <p class="hero-desc">{{ currentProduct.heroSubtitle }}</p>
          <div class="hero-badges">
            <span><i class="icon-check"></i> CE Certified</span>
            <span><i class="icon-check"></i> 1 Year Warranty</span>
            <span><i class="icon-check"></i> Global Shipping</span>
          </div>
          <div class="hero-actions">
            <router-link to="/contact" class="btn-primary">Request a Quote</router-link>
            <a href="#specs" class="btn-outline">View Specs</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature Sections (Alternating Layout) -->
    <section id="features" class="product-features">
      <div v-for="(feature, idx) in currentProduct.detailImages" :key="idx" class="feature-row" :class="{ 'row-reverse': idx % 2 !== 0 }">
        <div class="container grid grid-2 items-center">
          <div class="feature-image">
            <img :src="feature.src" :alt="feature.title">
          </div>
          <div class="feature-text">
            <h2 class="feature-title">{{ feature.title }}</h2>
            <p class="feature-desc">{{ feature.desc }}</p>
            <ul class="feature-points" v-if="feature.points">
              <li v-for="point in feature.points" :key="point">{{ point }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Specifications Section -->
    <section id="specs" class="product-specs bg-gray-50">
      <div class="container">
        <h2 class="section-title text-center">Technical Specifications</h2>
        <div class="specs-container">
          <table class="specs-table-new">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="spec in currentProduct.specs" :key="spec.label">
                <td class="spec-label">{{ spec.label }}</td>
                <td class="spec-value">{{ spec.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Video Section -->
    <section id="video" v-if="currentProduct.video" class="product-video-section">
      <div class="container text-center">
        <h2 class="section-title">Product Demonstration</h2>
        <div class="video-wrapper">
          <video controls :src="currentProduct.video" poster="/img/video-poster.jpg"></video>
        </div>
      </div>
    </section>

    <!-- Global CTA -->
    <section class="global-cta bg-primary-700 text-white">
      <div class="container text-center">
        <h2>Ready to Elevate Your Disinfection Standards?</h2>
        <p>Contact our experts for a customized solution and competitive pricing.</p>
        <div class="cta-buttons">
          <router-link to="/contact" class="btn-white">Contact Us Now</router-link>
          <a href="mailto:elant_industrial@sina.com" class="btn-outline-white">Email Sales</a>
        </div>
      </div>
    </section>

    <!-- Back to Products Button -->
    <div class="back-to-products">
      <router-link to="/product" class="btn-back">← Back to Products</router-link>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ProductDetailView',
  data() {
    // Assets for ULV
    const ulvProductMain = require('@/assets/images/product-main.jpg');
    const ulvProductWorking = require('@/assets/images/product-working.jpg');
    const ulvDetail1 = require('@/assets/images/detail-1.jpg');
    const ulvDetail2 = require('@/assets/images/detail-2.jpg');
    const ulvDetail3 = require('@/assets/images/detail-3.jpg');
    const ulvProductSafety = require("@/assets/images/product-safety.png");
    const ulvDetail5Cropped = require("@/assets/images/detail-5-cropped.jpg");
    const ulvVideo = '/videos/ulv-cold-fogger-demo.mp4';

    // Assets for TSF-35D
    const tsf35dNozzle = require('@/assets/images/products/tsf-35d/tsf-35d-nozzle.jpg');
    const tsf35dSide = require('@/assets/images/products/tsf-35d/tsf-35d-side.jpg');
    const tsf35dAccessories = require('@/assets/images/products/tsf-35d/tsf-35d-accessories.jpg');
    const tsf35dFull = require('@/assets/images/products/tsf-35d/tsf-35d-full.jpg');
    const tsf35dDetail = require('@/assets/images/products/tsf-35d/tsf-35d-detail.jpg');
    const tsf35dVideo = '/videos/tsf-35d-demo.mp4';

    const ulvColdFogger = {
      id: 'ulv',
      name: 'Electric ULV Cold Fogger',
      model: 'ELT-ULV-5L',
      heroSubtitle: 'Professional-grade electric ULV cold fogger designed for rapid, large-scale disinfection and pest control.',
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
      detailImages: [
        { 
          src: ulvDetail1, 
          title: 'High-Performance 1200W Motor', 
          desc: 'Equipped with a robust industrial-grade motor, providing consistent power for long-duration operation and superior atomization efficiency.',
          points: ['Copper-core durability', 'Overheat protection', 'High RPM performance']
        },
        { 
          src: ulvDetail2, 
          title: 'Advanced Centrifugal Atomization', 
          desc: 'Our proprietary nozzle design ensures ultra-fine droplet generation, allowing for deep penetration into hard-to-reach areas.',
          points: ['5-45μm adjustable droplets', 'Uniform coverage', 'Reduced chemical waste']
        },
        { 
          src: ulvDetail3, 
          title: '360° Flexible Spray Nozzle', 
          desc: 'The reinforced flexible hose and adjustable nozzle allow operators to direct the fog with precision, covering every corner effortlessly.',
          points: ['Extended reach', 'Ergonomic handle', 'Leak-proof design']
        },
        { 
          src: ulvProductSafety, 
          title: 'Integrated Safety Features', 
          desc: 'Designed with an anti-backflow protection system to prevent chemical leakage and ensure operator safety during and after use.',
          points: ['Anti-backflow valve', 'Corrosion-resistant tank', 'Secure power switch']
        }
      ],
      video: ulvVideo
    };

    const tsf35dThermalFogger = {
      id: 'tsf35d',
      name: 'TSF-35D Thermal Fogger',
      model: 'TSF-35D',
      heroSubtitle: 'High-efficiency thermal fogging solution for outdoor pest control and deep-penetration indoor sanitization.',
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
      detailImages: [
        { 
          src: tsf35dFull, 
          title: 'Robust Stainless Steel Build', 
          desc: 'Constructed with high-grade stainless steel to withstand harsh chemicals and extreme operating environments.',
          points: ['Corrosion resistance', 'Heat-shielded barrel', 'Long service life']
        },
        { 
          src: tsf35dNozzle, 
          title: 'Precision Fog Generation', 
          desc: 'Optimized combustion system produces high-density fog that stays suspended longer for maximum effectiveness.',
          points: ['Deep penetration', 'Wide area coverage', 'Fuel efficient']
        },
        { 
          src: tsf35dSide, 
          title: 'Ergonomic Design', 
          desc: 'Lightweight and well-balanced construction makes it comfortable to operate for extended periods.',
          points: ['Easy handling', 'Reduced operator fatigue', 'Portable setup']
        },
        { 
          src: tsf35dAccessories, 
          title: 'Complete Accessory Kit', 
          desc: 'Includes all necessary components and tools for easy setup, operation, and maintenance.',
          points: ['Professional tools included', 'Easy maintenance', 'Spare parts available']
        }
      ],
      video: tsf35dVideo
    };

    return {
      products: {
        ulv: ulvColdFogger,
        tsf35d: tsf35dThermalFogger
      },
      currentProduct: ulvColdFogger,
      selectedImage: ulvColdFogger.images[0].src
    };
  },
  methods: {
    loadProduct(productId) {
      if (this.products[productId]) {
        this.currentProduct = this.products[productId];
        this.selectedImage = this.currentProduct.images[0].src;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  },
  watch: {
    '$route.params.id'(newId) {
      this.loadProduct(newId);
    }
  },
  mounted() {
    const productId = this.$route.params.id;
    this.loadProduct(productId);
  }
};
</script>

<style scoped>
.product-detail-page {
  padding-top: 0;
}

/* Sub-nav Styles */
.product-subnav {
  position: sticky;
  top: 70px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--gray-200);
  z-index: 100;
  padding: 0.75rem 0;
}

.product-name-mini {
  font-weight: 700;
  color: var(--primary-700);
  font-size: 1.1rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: var(--gray-600);
  font-weight: 500;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--primary-600);
}

.btn-small {
  background: var(--primary-700);
  color: white !important;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  font-size: 0.85rem !important;
}

/* Hero Section */
.product-hero {
  padding: 4rem 0;
  background: #fff;
}

.hero-image-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hero-main-img {
  width: 100%;
  height: 450px;
  object-fit: contain;
  background: #f9f9f9;
  border-radius: 8px;
}

.hero-thumbnails {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.hero-thumbnails button {
  width: 70px;
  height: 70px;
  border: 2px solid transparent;
  padding: 2px;
  border-radius: 4px;
  cursor: pointer;
  background: #fff;
}

.hero-thumbnails button.active {
  border-color: var(--primary-600);
}

.hero-thumbnails img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.brand-tag {
  color: var(--primary-600);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.model-number {
  color: var(--gray-500);
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.hero-desc {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--gray-700);
  margin-bottom: 2rem;
}

.hero-badges {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--gray-800);
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

/* Feature Rows */
.feature-row {
  padding: 6rem 0;
  border-bottom: 1px solid var(--gray-100);
}

.row-reverse .grid {
  direction: rtl;
}

.row-reverse .feature-text {
  direction: ltr;
}

.feature-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

.feature-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-800);
}

.feature-desc {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--gray-600);
  margin-bottom: 2rem;
}

.feature-points {
  list-style: none;
  padding: 0;
}

.feature-points li {
  padding-left: 1.5rem;
  position: relative;
  margin-bottom: 0.75rem;
  font-weight: 500;
  color: var(--gray-800);
}

.feature-points li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--primary-600);
  font-weight: bold;
}

/* Specs Table */
.product-specs {
  padding: 5rem 0;
}

.specs-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.specs-table-new {
  width: 100%;
  border-collapse: collapse;
}

.specs-table-new th {
  text-align: left;
  padding: 1rem;
  background: var(--primary-700);
  color: white;
  font-size: 1.1rem;
}

.specs-table-new td {
  padding: 1rem;
  border-bottom: 1px solid var(--gray-100);
}

.spec-label {
  font-weight: 600;
  color: var(--gray-800);
  width: 40%;
}

.spec-value {
  color: var(--gray-600);
}

/* Video Section */
.product-video-section {
  padding: 5rem 0;
}

.video-wrapper {
  max-width: 900px;
  margin: 3rem auto 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.1);
}

.video-wrapper video {
  width: 100%;
  display: block;
}

/* CTA */
.global-cta {
  padding: 6rem 0;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2.5rem;
}

.btn-white {
  background: white;
  color: var(--primary-700);
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.3s;
}

.btn-white:hover {
  transform: translateY(-3px);
}

.btn-outline-white {
  border: 2px solid white;
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-outline-white:hover {
  background: white;
  color: var(--primary-700);
}

/* Back to Products */
.back-to-products {
  text-align: center;
  padding: 3rem 0;
}

.btn-back {
  display: inline-block;
  background: var(--gray-200);
  color: var(--gray-800);
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-back:hover {
  background: var(--primary-700);
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .product-subnav {
    top: 60px;
  }
  
  .nav-links a:not(.btn-small) {
    display: none;
  }
  
  .feature-title {
    font-size: 1.8rem;
  }
  
  .hero-main-img {
    height: 300px;
  }
  
  .row-reverse .grid {
    direction: ltr;
  }
  
  .hero-badges {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .cta-buttons {
    flex-direction: column;
  }
}
</style>
