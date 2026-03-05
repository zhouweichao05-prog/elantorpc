<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container">
      <div class="navbar-content">
        <router-link to="/" class="logo">
          <img :src="require('@/assets/images/logo.png')" alt="Elantor Logo" class="logo-img">
          <span class="logo-text">Elantor</span>
        </router-link>
        
        <div class="nav-menu">
          <router-link v-for="item in menuItems" :key="item.path" :to="item.path" class="nav-link">
            {{ item.name }}
          </router-link>
          <router-link to="/contact" class="btn-primary">Get a Quote</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isScrolled: false,
      menuItems: [
        { name: 'Home', path: '/' },
        { name: 'Product', path: '/product' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' }
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: transparent;
  padding: 1rem 0;
  transition: all 0.3s ease;
}

.navbar.scrolled {
  background-color: var(--white);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 0.75rem 0;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--white);
  text-decoration: none;
  transition: all 0.3s ease;
}

.navbar.scrolled .logo {
  color: var(--primary-700);
}

.logo-img {
  height: 70px;
  width: auto;
  transition: all 0.3s ease;
}

.navbar.scrolled .logo-img {
  height: 60px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.logo-text {
  letter-spacing: 0.05em;
  font-size: 1.3rem;
}

.navbar.scrolled .logo-text {
  font-size: 1.1rem;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  transition: color 0.3s ease;
  text-decoration: none;
}

.navbar.scrolled .nav-link {
  color: var(--gray-600);
}

.nav-link:hover {
  color: var(--white);
}

.navbar.scrolled .nav-link:hover {
  color: var(--primary-700);
}

@media (max-width: 768px) {
  .nav-menu {
    gap: 1rem;
  }
  
  .nav-link {
    font-size: 0.9rem;
  }
  
  .logo-text {
    display: none;
  }
  
  .logo-img {
    height: 50px;
  }
  
  .navbar.scrolled .logo-img {
    height: 45px;
  }
}
</style>
