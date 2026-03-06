
<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-content">
      <router-link to="/" class="logo-wrapper">
        <img :src="require('@/assets/images/logo_icon.png')" alt="Elantor Logo Icon" class="logo-icon-img">
        <span class="logo-text">Elantor</span>
      </router-link>
      
      <div class="nav-menu">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path" 
          :to="item.path" 
          class="nav-link"
          :class="{ active: isActive(item.path) }"
        >
          {{ item.name }}
          <span class="nav-underline"></span>
        </router-link>
        <router-link to="/contact" class="btn-cta">Get a Quote</router-link>
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
  height: 70px;
}

.navbar.scrolled .navbar-content {
  height: 60px;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.logo-wrapper:hover {
  transform: scale(1.05);
}

.logo-icon-img {
  height: 40px;
  width: auto;
  transition: height 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(45, 122, 62, 0.1));
}

.navbar.scrolled .logo-icon-img {
  height: 35px;
}

.logo-text {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d7a3e;
  letter-spacing: 0.5px;
  transition: font-size 0.3s ease;
}

.navbar.scrolled .logo-text {
  font-size: 1.6rem;
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
}

.btn-cta:hover {
  background: linear-gradient(135deg, #1f5a2e, #2d7a3e);
  box-shadow: 0 6px 20px rgba(45, 122, 62, 0.3);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .navbar-content {
    padding: 0 1rem;
  }

  .nav-menu {
    gap: 1rem;
  }

  .nav-link {
    font-size: 0.85rem;
  }

  .btn-cta {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }

  .logo-text {
    font-size: 1.2rem;
  }

  .logo-icon-img {
    height: 30px;
  }
}
</style>
