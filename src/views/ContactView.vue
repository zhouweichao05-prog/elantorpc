<template>
  <main>
    <!-- Hero -->
    <section class="section bg-primary-700 text-white" style="margin-top: 80px;">
      <div class="container text-center">
        <h1>Contact Us</h1>
        <p class="section-subtitle text-white">Have questions? Our team is here to help you find the right solution.</p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <!-- Form -->
          <div class="contact-form">
            <h2>Send Us a Message</h2>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label>Full Name *</label>
                <input type="text" required class="form-input">
              </div>
              <div class="form-group">
                <label>Email Address *</label>
                <input type="email" required class="form-input">
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <input type="tel" class="form-input">
              </div>
              <div class="form-group">
                <label>Subject *</label>
                <select required class="form-input">
                  <option value="">Select a topic</option>
                  <option value="quote">Request a Quote</option>
                  <option value="support">Technical Support</option>
                  <option value="distributor">Become a Distributor</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>
              <div class="form-group">
                <label>Your Message *</label>
                <textarea required rows="5" class="form-input"></textarea>
              </div>
              <button type="submit" class="btn-primary w-full">Send Inquiry Now</button>
            </form>
          </div>

          <!-- Info -->
          <div class="contact-info">
            <h2>Contact Information</h2>
            <div class="info-items">
              <div v-for="item in contactDetails" :key="item.title" class="info-item">
                <span class="info-icon">{{ item.icon }}</span>
                <div>
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.value }}</p>
                </div>
              </div>
            </div>

            <h3 style="margin-top: 2rem; margin-bottom: 1rem;">Frequently Asked Questions</h3>
            <div class="faq-items">
              <div v-for="(faq, idx) in faqs" :key="idx" class="faq-item">
                <button @click="activeFaq = activeFaq === idx ? null : idx" class="faq-question">
                  <span>{{ faq.q }}</span>
                  <span>{{ activeFaq === idx ? '−' : '+' }}</span>
                </button>
                <div v-show="activeFaq === idx" class="faq-answer">
                  {{ faq.a }}
                </div>
              </div>
            </div>
          </div>
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
        { title: 'Our Location', value: 'No.123 Industrial Zone, Guangzhou, China', icon: '📍' },
        { title: 'Email Address', value: 'info@elantor.com', icon: '✉️' },
        { title: 'Phone Number', value: '+86 123 4567 8901', icon: '📞' },
        { title: 'Business Hours', value: 'Monday - Friday: 9:00 AM - 6:00 PM (GMT+8)', icon: '⏰' }
      ],
      faqs: [
        { q: 'What is the lead time for orders?', a: 'For standard models, we usually have stock available for immediate shipment. For bulk orders (100+ units), the lead time is typically 7-15 working days.' },
        { q: 'Do you offer OEM/ODM services?', a: 'Yes, we provide comprehensive OEM/ODM services including custom branding, colors, and technical specification adjustments.' },
        { q: 'What certifications do your products have?', a: 'All Elantor ULV Cold Foggers are CE and RoHS certified, ensuring they meet international safety and environmental standards.' },
        { q: 'How do you handle global shipping?', a: 'We work with leading global logistics partners to provide air, sea, and express shipping options to over 50 countries worldwide.' }
      ]
    }
  },
  methods: {
    handleSubmit() {
      alert('Thank you for your inquiry! Our team will contact you within 24 hours.')
    }
  }
}
</script>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.contact-form {
  background-color: var(--gray-50);
  padding: 2rem;
  border-radius: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--gray-700);
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-700);
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
}

.w-full {
  width: 100%;
}

.info-items {
  space-y: 1.5rem;
}

.info-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--gray-200);
}

.info-item:last-child {
  border-bottom: none;
}

.info-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.info-item h4 {
  margin-bottom: 0.25rem;
}

.info-item p {
  color: var(--gray-600);
  margin: 0;
}

.faq-items {
  space-y: 1rem;
}

.faq-item {
  border: 1px solid var(--gray-200);
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1rem;
}

.faq-question {
  width: 100%;
  padding: 1rem;
  background-color: var(--white);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  transition: background-color 0.3s ease;
  text-align: left;
}

.faq-question:hover {
  background-color: var(--gray-50);
}

.faq-answer {
  padding: 1rem;
  background-color: var(--gray-50);
  color: var(--gray-600);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
