<template>
  <main>
    <!-- Hero -->
    <section class="section bg-primary-700 text-white" style="margin-top: 80px;">
      <div class="container text-center">
        <h1>About Elantor</h1>
        <p class="section-subtitle text-white">A professional ULV Cold Fogger manufacturer dedicated to providing world-class fogging solutions.</p>
      </div>
    </section>

    <!-- Story -->
    <section class="section">
      <div class="container">
        <div class="story-grid">
          <div>
            <h2>Our Story</h2>
            <p>Elantor was founded with a clear mission: to provide professional-grade ULV cold fogging equipment that helps protect people, animals, and environments from harmful pathogens and pests.</p>
            <p>With over a decade of manufacturing experience, we have developed a comprehensive range of ULV cold foggers that combine advanced technology with user-friendly design. Our products are trusted by healthcare facilities, agricultural businesses, and public health organizations across more than 50 countries.</p>
            <router-link to="/contact" class="btn-primary">Get in Touch</router-link>
          </div>
          
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">2014</div>
              <div class="stat-label">Founded</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">50+</div>
              <div class="stat-label">Countries</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">500+</div>
              <div class="stat-label">Clients</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">CE</div>
              <div class="stat-label">Certified</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section bg-gray-50">
      <div class="container">
        <h2 class="section-title">Our Mission & Values</h2>
        <div class="grid grid-3">
          <div v-for="value in companyValues" :key="value.title" class="card p-8 text-center">
            <div class="value-icon">{{ value.icon }}</div>
            <h3>{{ value.title }}</h3>
            <p class="text-gray-600">{{ value.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Certifications -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Certifications & Standards</h2>
        <div class="grid grid-4">
          <div v-for="cert in certifications" :key="cert.name" class="card p-6 text-center">
            <div class="cert-badge">{{ cert.badge }}</div>
            <div class="cert-name">{{ cert.name }}</div>
            <div class="cert-desc">{{ cert.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section bg-primary-700 text-white text-center">
      <div class="container">
        <h2>Partner With Elantor</h2>
        <p>Join hundreds of satisfied customers worldwide.</p>
        <router-link to="/contact" class="btn-primary" style="background-color: var(--white); color: var(--primary-700);">Contact Us Today</router-link>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'AboutView',
  data() {
    return {
      companyValues: [
        {
          icon: '🎯',
          title: 'Our Mission',
          desc: 'To protect people and environments by providing the most effective, reliable, and affordable ULV fogging solutions worldwide.'
        },
        {
          icon: '🔭',
          title: 'Our Vision',
          desc: 'To become the global leader in ULV cold fogging technology, setting the standard for quality and innovation.'
        },
        {
          icon: '💎',
          title: 'Our Values',
          desc: 'Quality first, customer-centric, continuous innovation, and honest business practices.'
        }
      ],
      certifications: [
        { badge: 'CE', name: 'CE Marking', desc: 'European Conformity' },
        { badge: 'RoHS', name: 'RoHS Compliant', desc: 'Hazardous Substances' },
        { badge: 'ISO', name: 'ISO 9001', desc: 'Quality Management' },
        { badge: 'SGS', name: 'SGS Tested', desc: 'Third-party Verified' }
      ]
    }
  }
}
</script>

<style scoped>
.story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-card {
  background-color: var(--primary-700);
  color: var(--white);
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.value-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cert-badge {
  font-size: 2rem;
  font-weight: 900;
  color: var(--primary-700);
  margin-bottom: 0.5rem;
}

.cert-name {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.cert-desc {
  font-size: 0.8rem;
  color: var(--gray-500);
}

@media (max-width: 768px) {
  .story-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
