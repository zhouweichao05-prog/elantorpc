<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-section">
          <h3 class="footer-title">Elantor</h3>
          <p class="footer-desc">Professional ULV Cold Fogger manufacturer and exporter. Trusted by hospitals, schools, hotels and farms worldwide.</p>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links">
            <li v-for="item in quickLinks" :key="item.path">
              <router-link :to="item.path">{{ item.name }}</router-link>
            </li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-heading">Contact Info</h4>
          <ul class="footer-links">
            <li v-for="item in contactInfo" :key="item.text">
              <span>{{ item.icon }} {{ item.text }}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2024 Elantor Co., Ltd. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterBar',
  data() {
    return {
      quickLinks: [
        { name: 'Home', path: '/' },
        { name: 'Product', path: '/product' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' }
      ],
      contactInfo: [
        { icon: '📍', text: 'Guangzhou, China' },
        { icon: '✉️', text: 'info@elantor.com' },
        { icon: '📞', text: '+86 123 4567 8901' }
      ]
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: var(--gray-900);
  color: var(--gray-300);
  padding: 4rem 0 2rem;
  margin-top: 4rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-section {
  padding: 1rem 0;
}

.footer-title {
  font-size: 1.5rem;
  color: var(--white);
  margin-bottom: 1rem;
}

.footer-desc {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--gray-400);
}

.footer-heading {
  font-size: 1rem;
  color: var(--white);
  margin-bottom: 1rem;
  font-weight: 700;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: var(--gray-400);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--primary-500);
}

.footer-links span {
  color: var(--gray-400);
}

.footer-bottom {
  border-top: 1px solid var(--gray-800);
  padding-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: var(--gray-500);
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
