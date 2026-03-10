<template>
  <main class="product-catalog-page">
    <!-- Hero Banner -->
    <section class="catalog-hero">
      <img src="@/assets/images/hero_branding_bg.png" alt="Product Banner" class="hero-banner-img">
    </section>

    <!-- Main Content Area -->
    <div class="catalog-container">
      <!-- Left Sidebar - Categories -->
      <aside class="sidebar">
        <div class="category-section">
          <h3 class="category-title">Fogger</h3>
          <ul class="category-list">
            <li><a href="#" @click.prevent="activeCategory = 'all'" :class="{ active: activeCategory === 'all' }">All Products</a></li>
            <li><a href="#" @click.prevent="activeCategory = 'ulv'" :class="{ active: activeCategory === 'ulv' }">ULV Cold Fogger</a></li>
            <li><a href="#" @click.prevent="activeCategory = 'thermal'" :class="{ active: activeCategory === 'thermal' }">Thermal Fogger</a></li>
          </ul>
        </div>
      </aside>

      <!-- Main Content -->
      <section class="main-content">
        <!-- Breadcrumb & Search -->
        <div class="breadcrumb-search-area">
          <div class="breadcrumb">
            <span class="breadcrumb-icon">🏠</span>
            <span class="breadcrumb-text">Your current location: {{ currentCategoryLabel }}</span>
          </div>
          <div class="search-box">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Please enter search content"
              @input="filterProducts"
            >
            <button class="search-btn">🔍</button>
          </div>
        </div>

        <!-- Product Grid -->
        <div class="products-grid">
          <div v-for="product in filteredProducts" :key="product.id" class="product-card" @click="goToProductDetail(product.id)">
            <div class="product-card-content">
              <div class="product-image-wrapper">
                <img :src="product.image" :alt="product.name" class="product-image">
              </div>
              <h4 class="product-name">{{ product.name }}</h4>
              <p class="product-model" v-if="product.model">{{ product.model }}</p>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="empty-state">
          <p>No products found. Please try a different search.</p>
        </div>
      </section>
    </div>

    <!-- Floating Top Button -->
    <button class="float-top-btn" @click="scrollToTop" v-show="showTopBtn">
      <span>TOP</span>
    </button>
  </main>
</template>

<script>
export default {
  name: 'ProductView',
  data() {
    // Asset imports
    const ulvProductMain = require('@/assets/images/product-main.jpg');
    const ulvProductWorking = require('@/assets/images/product-working.jpg');
    const tsf35dFull = require('@/assets/images/products/tsf-35d/tsf-35d-full.jpg');

    // Product catalog - Only 2 main products
    const allProducts = [
      {
        id: 'ulv',
        name: 'Electric ULV Cold Fogger',
        model: 'ELT-ULV-5L',
        category: 'ulv',
        image: ulvProductMain,
        description: 'Professional electric ULV cold fogger for rapid disinfection'
      },
      {
        id: 'tsf35d',
        name: 'TSF-35D Thermal Fogger',
        model: 'TSF-35D',
        category: 'thermal',
        image: tsf35dFull,
        description: 'High-efficiency thermal fogger for pest control and disinfection'
      }
    ];

    return {
      allProducts,
      filteredProducts: allProducts,
      activeCategory: 'all',
      currentCategoryLabel: 'All Products',
      searchQuery: '',
      showTopBtn: false
    };
  },
  methods: {
    filterByCategory(category) {
      this.activeCategory = category;
      this.searchQuery = '';
      
      const labels = {
        all: 'All Products',
        ulv: 'ULV Cold Fogger',
        thermal: 'Thermal Fogger'
      };
      
      this.currentCategoryLabel = labels[category] || 'All Products';
      
      if (category === 'all') {
        this.filteredProducts = this.allProducts;
      } else {
        this.filteredProducts = this.allProducts.filter(p => p.category === category);
      }
    },
    
    filterProducts() {
      const query = this.searchQuery.toLowerCase();
      
      if (!query) {
        this.filterByCategory(this.activeCategory);
        return;
      }
      
      this.filteredProducts = this.allProducts.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.model.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    },
    
    goToProductDetail(productId) {
      // Navigate to product detail page
      this.$router.push({
        name: 'ProductDetail',
        params: { id: productId }
      });
    },
    
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    handleScroll() {
      this.showTopBtn = window.scrollY > 300;
    }
  },
  watch: {
    activeCategory(newVal) {
      this.filterByCategory(newVal);
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    // Initialize with all products
    this.filterByCategory('all');
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
.product-catalog-page {
  background-color: #fff;
  padding-top: 0;
}

/* Hero Banner */
.catalog-hero {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
}

.hero-banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Main Container */
.catalog-container {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

/* Sidebar */
.sidebar {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  height: fit-content;
  position: sticky;
  top: 100px;
}

.category-section {
  margin-bottom: 2rem;
}

.category-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2ecc71;
  background: #e8f8f5;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-list li {
  margin-bottom: 0.5rem;
}

.category-list a {
  display: block;
  padding: 0.6rem 0.75rem;
  color: #555;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.category-list a:hover {
  background-color: #e8f8f5;
  color: #2ecc71;
  font-weight: 600;
}

.category-list a.active {
  background-color: #2ecc71;
  color: white;
  font-weight: 700;
}

/* Main Content */
.main-content {
  flex: 1;
}

/* Breadcrumb & Search */
.breadcrumb-search-area {
  margin-bottom: 2rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  color: #666;
}

.breadcrumb-icon {
  font-size: 1.2rem;
}

.breadcrumb-text {
  font-weight: 600;
  color: #333;
}

.search-box {
  display: flex;
  gap: 0.5rem;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.5rem;
  max-width: 600px;
}

.search-box input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.75rem;
  font-size: 0.95rem;
  color: #333;
}

.search-box input::placeholder {
  color: #999;
}

.search-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0 0.75rem;
  color: #999;
  transition: color 0.3s;
}

.search-btn:hover {
  color: #2ecc71;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.product-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  cursor: pointer;
}

.product-card:hover {
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  transform: translateY(-5px);
}

.product-card-content {
  display: block;
  text-decoration: none;
  color: inherit;
}

.product-image-wrapper {
  width: 100%;
  height: 250px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-name {
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  line-height: 1.4;
  min-height: 2.8em;
}

.product-model {
  padding: 0 1rem 1rem;
  font-size: 0.85rem;
  color: #999;
  margin: 0;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem;
  color: #999;
  font-size: 1.1rem;
}

/* Floating Top Button */
.float-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
}

.float-top-btn:hover {
  background: #27ae60;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(46, 204, 113, 0.4);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .catalog-container {
    grid-template-columns: 240px 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .catalog-container {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }
  
  .sidebar {
    position: static;
    margin-bottom: 1.5rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .product-image-wrapper {
    height: 200px;
  }
  
  .search-box {
    max-width: 100%;
  }
  
  .catalog-hero {
    height: 150px;
  }
}

@media (max-width: 480px) {
  .catalog-container {
    padding: 0.75rem;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .category-list a {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
  
  .breadcrumb {
    font-size: 0.85rem;
  }
}
</style>
