<template>
  <main>
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-carousel">
        <div 
          v-for="(image, index) in carouselImages" 
          :key="index" 
          class="hero-bg"
          :class="{ active: currentSlide === index, 'hero-bg-contain': index === 2 || index === 3, 'hero-bg-contain-dark': index === 0 }"
          :style="{ backgroundImage: 'url(' + require('@/assets/images/' + image) + ')' }"
        ></div>
      </div>
      <div class="hero-overlay" :class="{ 'hero-overlay-light': currentSlide === 2 || currentSlide === 3 }"></div>
      <div class="container hero-content" :class="{ 'hero-content-dark': currentSlide === 2 || currentSlide === 3 }">
        <h1 class="hero-title">Professional Pest Control Equipment Manufacturer</h1>
        <p class="hero-subtitle">10 Years of R&D and Manufacturing Experience</p>
        <div class="hero-buttons">
          <router-link to="/product" class="btn-primary">View Product</router-link>
          <router-link to="/contact" class="btn-outline">Get a Quote</router-link>
        </div>
      </div>
      <div class="carousel-indicators">
        <span 
          v-for="(image, index) in carouselImages" 
          :key="index" 
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
        ></span>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section bg-gray-50">
      <div class="container">
        <h2 class="section-title">5 Features Customer Guarantee</h2>
        
        <div class="grid grid-3">
          <div v-for="(feature, idx) in features" :key="idx" class="card p-8">
            <div class="feature-number">0{{ idx + 1 }}</div>
            <h3>{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Scenarios Section -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Real Application Scenarios</h2>
        <p class="section-subtitle">Trusted by hospitals, schools, hotels, farms, and public spaces globally.</p>
        
        <div class="grid grid-3">
          <div v-for="scenario in scenarios" :key="scenario.title" class="scenario-card">
            <img :src="scenario.image" :alt="scenario.title" class="scenario-img">
            <div class="scenario-overlay">
              <h3>{{ scenario.title }}</h3>
              <p>{{ scenario.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="section bg-primary-700 text-white">
      <div class="container">
        <h2 class="section-title text-white">Why Choose Elantor?</h2>
        
        <div class="grid grid-2">
          <div v-for="item in whyChoose" :key="item.title" class="why-item">
            <div class="why-icon">{{ item.icon }}</div>
            <h4>{{ item.title }}</h4>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section bg-gray-100">
      <div class="container text-center">
        <h2 class="section-title">Ready to Get Started?</h2>
        <p class="section-subtitle">Contact us today for pricing and customization options.</p>
        <router-link to="/contact" class="btn-primary">Get a Free Quote</router-link>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      currentSlide: 0,
      carouselImages: [
        'product-working.jpg',
        'carousel-tsf35d.jpg',
        'carousel-mf100.jpg',
        'carousel-backpack.jpg'
      ],
      features: [
        { title: 'CE Certified Products', desc: 'All products meet CE and international safety standards for worry-free compliance.' },
        { title: 'Quality Inspection', desc: 'Every unit is fully tested before shipment to ensure consistent performance.' },
        { title: 'Fast Delivery', desc: 'Orders dispatched within 3–5 business days with reliable global logistics.' },
        { title: 'OEM & ODM Support', desc: 'Custom branding, labeling, and specification adjustments available on request.' },
        { title: 'Secure Packaging', desc: 'Reinforced export-standard packaging to ensure products arrive safely without damage.' },
        { title: 'Spare Parts Supply', desc: 'Long-term spare parts availability to keep your equipment running at all times.' },
        { title: 'Technical Support', desc: 'Professional technical guidance provided via WhatsApp, email, and video call.' },
        { title: 'Competitive Pricing', desc: 'Factory-direct pricing with flexible MOQ to suit importers of all sizes.' },
        { title: 'Trusted by 50+ Countries', desc: 'Proven track record with distributors and buyers across more than 50 countries.' }
      ],
      scenarios: [
        { title: 'Hospital', desc: 'Medical disinfection', image: require('@/assets/images/scenarios/hospital.jpg') },
        { title: 'School', desc: 'Campus sanitation', image: require('@/assets/images/scenarios/school.jpg') },
        { title: 'Hotel', desc: 'Guest room hygiene', image: require('@/assets/images/scenarios/hotel.jpg') },
        { title: 'Farm', desc: 'Livestock protection', image: require('@/assets/images/scenarios/farm.jpg') },
        { title: 'Station', desc: 'Public space safety', image: require('@/assets/images/scenarios/station.jpg') }
      ],
      whyChoose: [
        { icon: '🏭', title: 'Professional Manufacturing', desc: '10+ years of experience in producing high-quality equipment.' },
        { icon: '🌍', title: 'Global Export', desc: 'Successfully exported to 50+ countries worldwide.' },
        { icon: '✅', title: 'CE & RoHS Certified', desc: 'Meet international safety and quality standards.' },
        { icon: '🎨', title: 'Custom OEM/ODM', desc: 'Customization options for branding and specifications.' }
      ]
    }
  },
  mounted() {
    this.startCarousel();
  },
  beforeUnmount() {
    clearInterval(this.carouselInterval);
  },
  methods: {
    startCarousel() {
      this.carouselInterval = setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
      }, 5000); // Change image every 5 seconds
    },
    goToSlide(index) {
      this.currentSlide = index;
      clearInterval(this.carouselInterval);
      this.startCarousel();
    }
  }
}
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-top: 80px;
}

.hero-carousel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 0;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.hero-bg.active {
  opacity: 1;
}

.hero-bg.hero-bg-contain {
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #f0f4f0;
}

.hero-bg.hero-bg-contain-dark {
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #1a1a2e;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  transition: background-color 0.5s ease;
}

.hero-overlay.hero-overlay-light {
  background-color: rgba(0, 0, 0, 0.15);
}

.hero-content {
  position: relative;
  z-index: 2;
  color: var(--white);
  max-width: 600px;
  transition: color 0.5s ease;
}

.hero-content.hero-content-dark {
  color: #1a1a1a;
}

.hero-content.hero-content-dark .hero-title {
  color: #1a1a1a;
  text-shadow: none;
}

.hero-content.hero-content-dark .hero-subtitle {
  color: #333333;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  gap: 10px;
}

.carousel-indicators span {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.carousel-indicators span.active {
  background-color: var(--primary-500);
}

.feature-number {
  font-size: 3rem;
  font-weight: 900;
  color: var(--primary-700);
  margin-bottom: 1rem;
  opacity: 0.2;
}

.scenario-card {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  height: 300px;
  cursor: pointer;
}

.scenario-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.scenario-card:hover .scenario-img {
  transform: scale(1.1);
}

.scenario-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: var(--white);
  padding: 2rem 1.5rem 1.5rem;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.scenario-card:hover .scenario-overlay {
  transform: translateY(0);
}

.scenario-overlay h3 {
  margin-bottom: 0.5rem;
}

.scenario-overlay p {
  font-size: 0.9rem;
}

.why-item {
  text-align: center;
  padding: 2rem;
}

.why-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.why-item h4 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.why-item p {
  opacity: 0.9;
}

.grid.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.grid.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.card {
  background-color: var(--white);
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}

.p-8 {
  padding: 2rem;
}

@media (max-width: 1024px) {
  .grid.grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero {
    height: auto;
    min-height: 60vh;
    margin-top: 70px;
    padding: 2rem 0;
  }

  .hero-content {
    max-width: 100%;
    padding: 0 1rem;
  }

  .hero-title {
    font-size: 1.75rem;
  }
  
  .hero-subtitle {
    font-size: 0.95rem;
  }
  
  .hero-buttons {
    flex-direction: column;
  }

  .grid.grid-3 {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .grid.grid-2 {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .scenario-card {
    height: 250px;
  }

  .why-item {
    padding: 1.5rem;
  }

  .feature-number {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero {
    min-height: 50vh;
    margin-top: 60px;
    padding: 1rem 0;
  }

  .hero-content {
    padding: 0 0.75rem;
  }

  .hero-title {
    font-size: 1.4rem;
    margin-bottom: 0.75rem;
  }
  
  .hero-subtitle {
    font-size: 0.85rem;
    margin-bottom: 1.5rem;
  }

  .carousel-indicators {
    bottom: 10px;
    gap: 6px;
  }

  .carousel-indicators span {
    width: 8px;
    height: 8px;
  }

  .card {
    padding: 1.5rem;
  }

  .scenario-card {
    height: 200px;
  }

  .scenario-overlay {
    padding: 1.5rem 1rem 1rem;
  }

  .why-item {
    padding: 1rem;
  }

  .why-icon {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }

  .why-item h4 {
    font-size: 1rem;
    margin-bottom: 0.35rem;
  }

  .why-item p {
    font-size: 0.85rem;
  }
}
</style>
