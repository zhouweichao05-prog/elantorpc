<template>
  <main>
    <!-- Product Hero -->
    <section class="section bg-primary-700 text-white" style="margin-top: 80px;">
      <div class="container text-center">
        <h1>ULV Cold Fogger</h1>
        <p class="section-subtitle text-white">Professional Electric ULV Cold Fogger — Spraying 1000㎡ in Just 10 Minutes</p>
      </div>
    </section>

    <!-- Product Overview -->
    <section class="section">
      <div class="container">
        <div class="product-grid">
          <div class="product-images">
            <img :src="selectedImage" :alt="'Product'" class="main-image">
            <div class="thumbnail-grid">
              <button v-for="(img, idx) in productImages" :key="idx" @click="selectedImage = img.src" class="thumbnail" :class="{ active: selectedImage === img.src }">
                <img :src="img.src" :alt="img.alt">
              </button>
            </div>
          </div>
          
          <div class="product-info">
            <div class="badges">
              <span class="badge">In Stock</span>
              <span class="badge">CE Certified</span>
              <span class="badge">Best Seller</span>
            </div>
            
            <h2>Electric ULV Cold Fogger</h2>
            <p class="model">Model: ELT-ULV-5L</p>
            
            <div class="specs-table">
              <div v-for="spec in specs" :key="spec.label" class="spec-row">
                <span class="spec-label">{{ spec.label }}</span>
                <span class="spec-value">{{ spec.value }}</span>
              </div>
            </div>
            
            <div class="functions">
              <h4>Functions</h4>
              <div class="function-grid">
                <div v-for="func in functions" :key="func.name" class="function-item">
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
          <div v-for="(img, idx) in detailImages" :key="idx" class="detail-card">
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
        <h2>Interested in Our ULV Cold Fogger?</h2>
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
    const productMain = require('@/assets/images/product-main.jpg')
    const productWorking = require('@/assets/images/product-working.jpg')
    const detail1 = require('@/assets/images/detail-1.jpg')
    const detail2 = require('@/assets/images/detail-2.jpg')
    const detail3 = require('@/assets/images/detail-3.jpg')
    const productSafety = require("@/assets/images/product-safety.png")
    const detail5 = require('@/assets/images/detail-5.jpg')

    return {
      selectedImage: productMain,
      productImages: [
        { src: productMain, alt: 'Main' },
        { src: productWorking, alt: 'Working' },
        { src: detail1, alt: 'Detail 1' },
        { src: detail2, alt: 'Detail 2' }
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
        { src: detail1, title: 'Powerful Motor', desc: '1200W motor ensures consistent performance' },
        { src: detail2, title: 'Centrifugal Atomization', desc: 'Ultra-fine droplet generation' },
        { src: detail3, title: 'Flexible Nozzle', desc: '360° adjustable spray direction' },
        { src: productSafety, title: 'Safety Features', desc: 'Anti-backflow protection system' }
        { src: detail5, title: 'Professional Grade', desc: 'Hospital-grade disinfection' },
        { src: productWorking, title: 'In Action', desc: 'Real-world application' }
      ]
    }
  }
}
</script>

<style scoped>
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
  height: 250px;
  object-fit: cover;
}

.detail-card h4 {
  padding: 1rem 1rem 0;
}

.detail-card p {
  padding: 0 1rem 1rem;
  font-size: 0.9rem;
  color: var(--gray-600);
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
  
  .product-images {
    position: static;
  }
  
  .function-grid {
    grid-template-columns: 1fr;
  }
  
  .product-buttons {
    flex-direction: column;
  }
}
</style>
