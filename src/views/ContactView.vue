<template>
  <main>
    <!-- Hero -->
    <section class="section bg-primary-700 text-white" style="margin-top: 80px;">
      <div class="container text-center">
        <h1>Contact Us</h1>
        <p class="section-subtitle text-white">Get in touch with our team for product inquiries, support, or business opportunities.</p>
      </div>
    </section>

    <!-- Contact Information -->
    <section class="section">
      <div class="container">
        <div class="info-grid">
          <div v-for="item in contactDetails" :key="item.title" class="info-card">
            <div class="info-icon">{{ item.icon }}</div>
            <h3>{{ item.title }}</h3>
            <p v-if="item.link" class="info-link">
              <a :href="item.link" target="_blank" rel="noopener noreferrer">{{ item.value }}</a>
            </p>
            <p v-else>{{ item.value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Media Section -->
    <section class="section bg-gray-50">
      <div class="container">
        <h2 class="section-title">Connect With Us</h2>
        <p class="section-subtitle">Follow us on social media for the latest updates and product news.</p>
        
        <div class="social-grid">
          <div v-for="social in socialMedia" :key="social.name" class="social-card">
            <div class="social-icon">{{ social.icon }}</div>
            <h4>{{ social.name }}</h4>
            <p>{{ social.handle }}</p>
            <a v-if="social.link" :href="social.link" target="_blank" rel="noopener noreferrer" class="social-link">
              Visit Profile
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Frequently Asked Questions</h2>
        <p class="section-subtitle">Find answers to common questions about our products and services.</p>
        
        <div class="faq-container">
          <div v-for="(faq, idx) in faqs" :key="idx" class="faq-item">
            <button @click="activeFaq = activeFaq === idx ? null : idx" class="faq-question">
              <span class="faq-text">{{ faq.q }}</span>
              <span class="faq-toggle">{{ activeFaq === idx ? '−' : '+' }}</span>
            </button>
            <div v-show="activeFaq === idx" class="faq-answer">
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section bg-primary-700 text-white text-center">
      <div class="container">
        <h2>Ready to Work With Us?</h2>
        <p>Reach out to our sales team for product information, pricing, and custom solutions.</p>
        <div class="cta-buttons">
          <a href="mailto:elant_industrial@sina.com" class="btn-primary" style="background-color: var(--white); color: var(--primary-700);">Send Email</a>
          <a href="tel:+8619540736965" class="btn-outline">Call Us</a>
          <a href="https://wa.me/8619540736965" target="_blank" rel="noopener noreferrer" class="btn-outline">WhatsApp Us</a>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'ContactView',
  data() {
    return {
      activeFaq: 0,
      contactDetails: [
        { 
          title: 'Email Address', 
          value: 'elant_industrial@sina.com',
          icon: '✉️',
          link: 'mailto:elant_industrial@sina.com'
        },
        { 
          title: 'WhatsApp', 
          value: '+86 19540736965',
          icon: '📞',
          link: 'tel:+8619540736965'
        },
        {
          title: 'Fax Number',
          value: '+86-0755-23766051',
          icon: '📠'
        },
        { 
          title: 'Our Location', 
          value: 'Xing Business Building 310, Bulong Road, Bantian Street, Longgang District, Shenzhen, China, 518118',
          icon: '📍'
        },
        { 
          title: 'Business Hours', 
          value: 'Monday - Friday: 9:00 AM - 6:00 PM (GMT+8)',
          icon: '⏰'
        }
      ],
      socialMedia: [
        {
          name: 'WhatsApp',
          handle: '+86 19540736965',
          icon: '💬',
          link: 'https://wa.me/8619540736965'
        }
      ],
      faqs: [
        { 
          q: 'What is the lead time for orders?', 
          a: 'For standard models, we usually have stock available for immediate shipment. For bulk orders (100+ units), the lead time is typically 7-15 working days.' 
        },
        { 
          q: 'Do you offer OEM/ODM services?', 
          a: 'Yes, we provide comprehensive OEM/ODM services including custom branding, colors, and technical specification adjustments.' 
        },
        { 
          q: 'What certifications do your products have?', 
          a: 'All Elantor ULV Cold Foggers are CE and RoHS certified, ensuring they meet international safety and environmental standards.' 
        },
        { 
          q: 'How do you handle global shipping?', 
          a: 'We work with leading global logistics partners to provide air, sea, and express shipping options to over 50 countries worldwide.' 
        },
        { 
          q: 'Can I request a product demo or trial?', 
          a: 'Absolutely! We offer product demonstrations and trial periods for qualified customers. Please contact our sales team to arrange one.' 
        },
        { 
          q: 'What payment methods do you accept?', 
          a: 'We accept bank transfers, credit cards, PayPal, and other international payment methods. Custom payment arrangements can be negotiated for bulk orders.' 
        }
      ]
    }
  }
}
</script>

<style scoped>
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.info-card {
  background-color: var(--white);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.info-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}

.info-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.info-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--gray-900);
}

.info-card p {
  color: var(--gray-600);
  margin: 0;
  word-break: break-word;
}

.info-link a {
  color: var(--primary-700);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.info-link a:hover {
  color: var(--primary-600);
  text-decoration: underline;
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.social-card {
  background-color: var(--white);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.social-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}

.social-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.social-card h4 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--gray-900);
}

.social-card p {
  color: var(--gray-600);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.social-link {
  display: inline-block;
  color: var(--primary-700);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--primary-700);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: var(--primary-700);
  color: var(--white);
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border: 1px solid var(--gray-200);
  border-radius: 0.75rem;
  overflow: hidden;
  margin-bottom: 1rem;
  background-color: var(--white);
}

.faq-question {
  width: 100%;
  padding: 1.5rem;
  background-color: var(--white);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  text-align: left;
  color: var(--gray-900);
}

.faq-question:hover {
  background-color: var(--gray-50);
}

.faq-text {
  flex: 1;
}

.faq-toggle {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-700);
  margin-left: 1rem;
  flex-shrink: 0;
}

.faq-answer {
  padding: 1.5rem;
  background-color: var(--gray-50);
  color: var(--gray-600);
  line-height: 1.8;
  border-top: 1px solid var(--gray-200);
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.btn-outline {
  display: inline-block;
  border: 2px solid var(--white);
  color: var(--white);
  background-color: transparent;
  padding: 0.875rem 2.375rem;
  border-radius: 0.75rem;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-outline:hover {
  background-color: var(--white);
  color: var(--primary-700);
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .social-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-buttons {
    flex-direction: column;
  }
  
  .cta-buttons a {
    width: 100%;
  }
}
</style>
