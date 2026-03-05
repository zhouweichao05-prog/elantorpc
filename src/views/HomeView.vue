<template>
  <main>
    <!-- Hero Section -->
    <section class="hero">
      <img :src="require('@/assets/images/product-working.jpg')" alt="Hero" class="hero-bg">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <h1 class="hero-title">ULV Cold Fogger by Elantor</h1>
        <p class="hero-subtitle">Spraying 1000 Square Meters in Just 10 Minutes</p>
        <div class="hero-buttons">
          <router-link to="/product" class="btn-primary">View Product</router-link>
          <router-link to="/contact" class="btn-outline">Get a Quote</router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section bg-gray-50">
      <div class="container">
        <h2 class="section-title">5 Features Quality Guarantee</h2>
        <p class="section-subtitle">Our ULV Cold Fogger is engineered with precision to deliver outstanding performance.</p>
        
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
      features: [
        { title: 'Strong Power & High Efficiency', desc: 'Capable of spraying 1000 square meters in 10 minutes.' },
        { title: 'Centrifugal Rotating Sprayer', desc: 'No blocking design with adjustable droplet size.' },
        { title: 'Flexible Hose Nozzle', desc: 'Can swing at will for convenient angle adjustment.' },
        { title: 'Medicine Liquid Check Device', desc: 'Prevents backflow of liquid in shutdown state.' },
        { title: 'Meets All Sanitary Standards', desc: 'Suitable for professional disinfection worldwide.' }
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

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  color: var(--white);
  max-width: 600px;
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

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-buttons {
    flex-direction: column;
  }
}
</style>
