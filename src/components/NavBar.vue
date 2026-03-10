
<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-content">
      <router-link to="/" class="logo-wrapper">
        <img :src="require('@/assets/images/logo_icon.png')" alt="Elantor Logo Icon" class="logo-icon-img">
        <span class="logo-text">Elantor</span>
      </router-link>
      
      <button class="menu-toggle" @click="mobileMenuOpen = !mobileMenuOpen" :class="{ active: mobileMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div class="nav-menu" :class="{ active: mobileMenuOpen }">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path" 
          :to="item.path" 
          class="nav-link"
          :class="{ active: isActive(item.path) }"
          @click="mobileMenuOpen = false"
        >
          {{ item.name }}
          <span class="nav-underline"></span>
        </router-link>
        <router-link to="/contact" class="btn-cta" @click="mobileMenuOpen = false">Get a Quote</router-link>
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
      currentRoute: '/',
      mobileMenuOpen: false,
      menuItems: [
        { name: 'Home', path: '/' },
        { name: 'Product', path: '/product' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' }
      ]
    }
  },
  watch: {
    '$route.path'(newPath) {
      this.currentRoute = newPath
      this.mobileMenuOpen = false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.currentRoute = this.$route.path
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    },
    isActive(path) {
      return this.currentRoute === path
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
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(45, 122, 62, 0.1);
  transition: all 0.3s ease;
  padding: 0.75rem 0;
}

.navbar.scrolled {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 4px 20px rgba(45, 122, 62, 0.08);
  padding: 0.5rem 0;
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
}

.navbar.scrolled .navbar-content {
  height: 75px;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.logo-wrapper:hover {
  transform: scale(1.05);
}

.logo-icon-img {
  height: 70px;
  width: auto;
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(45, 122, 62, 0.1));
  margin-top: -10px;
}

.navbar.scrolled .logo-icon-img {
  height: 60px;
  margin-top: -8px;
}

.logo-text {
  font-size: 3.2rem;
  font-weight: 700;
  color: #2d7a3e;
  letter-spacing: -1px;
  transition: font-size 0.3s ease;
  line-height: 1;
  display: flex;
  align-items: center;
}

.navbar.scrolled .logo-text {
  font-size: 2.8rem;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  position: relative;
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
}

.nav-link:hover,
.nav-link.active {
  color: #2d7a3e;
}

.nav-underline {
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #2d7a3e, #4a9d5f);
  transition: width 0.3s ease;
}

.nav-link:hover .nav-underline,
.nav-link.active .nav-underline {
  width: 100%;
}

.btn-cta {
  padding: 0.6rem 1.5rem;
  background: linear-gradient(135deg, #2d7a3e, #4a9d5f);
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(45, 122, 62, 0.2);
  cursor: pointer;
  border: none;
  display: inline-block;
}

.btn-cta:hover {
  background: linear-gradient(135deg, #1f5a2e, #2d7a3e);
  box-shadow: 0 6px 20px rgba(45, 122, 62, 0.3);
  transform: translateY(-2px);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  gap: 0.35rem;
}

.menu-toggle span {
  width: 25px;
  height: 2.5px;
  background-color: #2d7a3e;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

@media (max-width: 768px) {
  .navbar-content {
    padding: 0 1rem;
    height: 70px;
  }

  .navbar.scrolled .navbar-content {
    height: 60px;
  }

  .logo-text {
    font-size: 1.5rem;
  }

  .logo-icon-img {
    height: 40px;
    margin-top: -6px;
  }

  .navbar.scrolled .logo-icon-img {
    height: 35px;
    margin-top: -5px;
  }

  .navbar.scrolled .logo-text {
    font-size: 1.3rem;
  }

  .menu-toggle {
    display: flex;
  }

  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    flex-direction: column;
    gap: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    border-bottom: 1px solid rgba(45, 122, 62, 0.1);
  }

  .nav-menu.active {
    max-height: 400px;
  }

  .nav-link {
    font-size: 0.95rem;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid rgba(45, 122, 62, 0.05);
  }

  .nav-underline {
    display: none;
  }

  .btn-cta {
    margin: 0.75rem 1.5rem;
    width: calc(100% - 3rem);
    text-align: center;
  }
}

@media (max-width: 480px) {
  .navbar-content {
    padding: 0 0.75rem;
  }

  .logo-text {
    font-size: 1.2rem;
  }

  .logo-icon-img {
    height: 35px;
  }

  .nav-link {
    font-size: 0.9rem;
    padding: 0.85rem 1rem;
  }

  .btn-cta {
    margin: 0.5rem 1rem;
    width: calc(100% - 2rem);
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }
}
</style>
