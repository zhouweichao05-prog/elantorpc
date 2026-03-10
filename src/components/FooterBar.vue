<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-section">
          <div class="footer-logo-section">
            <img :src="require('@/assets/images/logo_icon.png')" alt="Elantor Logo Icon" class="footer-logo">
            <h3 class="footer-brand-name">Elantor</h3>
          </div>
          <p class="footer-desc">Professional ULV Cold Fogger manufacturer and exporter. Trusted by hospitals, schools, hotels and farms worldwide.</p>
          <div class="social-icons">
            <a href="https://www.facebook.com/david.zhou.9659283/" target="_blank" rel="noopener noreferrer" title="Facebook">👥</a>
            <a href="https://wa.me/8619540736965" target="_blank" rel="noopener noreferrer" title="WhatsApp">💬</a>
            <span title="WeChat: Elantor">🔗</span>
          </div>
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
              <a v-if="item.link" :href="item.link" target="_blank" rel="noopener noreferrer">
                {{ item.icon }} {{ item.text }}
              </a>
              <span v-else>{{ item.icon }} {{ item.text }}</span>
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
        { icon: '📍', text: 'Xing Business Building 310, Bulong Road, Bantian Street, Longgang District, Shenzhen, China, 518118' },
        { icon: '✉️', text: 'elant_industrial@sina.com', link: 'mailto:elant_industrial@sina.com' },
        { icon: '💬', text: '+86 19540736965', link: 'https://wa.me/8619540736965' },
        { icon: '📠', text: '+86-0755-23766051' } // Add Fax number
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

.footer-logo-section {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer-logo {
  height: 100px;
  width: auto;
  opacity: 0.9;
  transition: opacity 0.3s ease;
  margin-bottom: 1rem;
  filter: drop-shadow(0 2px 4px rgba(45, 122, 62, 0.2));
}

.footer-logo:hover {
  opacity: 1;
}

.footer-brand-name {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-500);
  letter-spacing: 0.05em;
  margin: 0;
  line-height: 1;
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
  margin-bottom: 1rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
  font-size: 1.5rem;
}

.social-icons a {
  color: var(--gray-400);
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;
}

.social-icons a:hover {
  color: var(--primary-500);
}

.social-icons span {
  color: var(--gray-400);
  cursor: help;
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
  word-break: break-word;
}

.footer-links a:hover {
  color: var(--primary-500);
}

.footer-links span {
  color: var(--gray-400);
  word-break: break-word;
}

.footer-bottom {
  border-top: 1px solid var(--gray-800);
  padding-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: var(--gray-500);
}

@media (max-width: 768px) {
  .footer {
    padding: 3rem 0 1.5rem;
    margin-top: 3rem;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-logo {
    height: 70px;
  }

  .footer-brand-name {
    font-size: 1.5rem;
  }

  .footer-desc {
    font-size: 0.85rem;
  }

  .social-icons {
    font-size: 1.3rem;
  }

  .footer-heading {
    font-size: 0.95rem;
  }

  .footer-links a,
  .footer-links span {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 2rem 0 1rem;
    margin-top: 2rem;
  }

  .footer-grid {
    gap: 1.5rem;
  }

  .footer-logo {
    height: 60px;
    margin-bottom: 0.75rem;
  }

  .footer-brand-name {
    font-size: 1.25rem;
  }

  .footer-desc {
    font-size: 0.8rem;
    line-height: 1.5;
  }

  .social-icons {
    font-size: 1.2rem;
    gap: 0.75rem;
  }

  .footer-heading {
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }

  .footer-links li {
    margin-bottom: 0.5rem;
  }

  .footer-links a,
  .footer-links span {
    font-size: 0.8rem;
  }

  .footer-bottom {
    padding-top: 1rem;
    font-size: 0.75rem;
  }
}
</style>
