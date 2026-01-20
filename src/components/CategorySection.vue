<template>
  <div class="category-section">
    <div class="category-header">
      <span class="category-icon">{{ category.icon }}</span>
      <h2 class="category-name">{{ category.name }}</h2>
      <div class="category-line"></div>
    </div>
    <div class="sites-grid">
      <a
        v-for="site in category.sites"
        :key="site.url"
        :href="site.url"
        target="_blank"
        rel="noopener noreferrer"
        class="site-link"
      >
        <SiteCard :site="site" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '../types'
import SiteCard from './SiteCard.vue'

defineProps<{
  category: Category
}>()
</script>

<style scoped>
.category-section {
  margin-bottom: 64px;
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  position: relative;
}

.category-icon {
  font-size: 36px;
  filter: drop-shadow(0 0 12px rgba(100, 200, 255, 0.6));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.category-name {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #64c8ff 0%, #a0d8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(100, 200, 255, 0.5);
  letter-spacing: 1px;
}

.category-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg,
    rgba(100, 200, 255, 0.5) 0%,
    rgba(100, 200, 255, 0.1) 50%,
    transparent 100%
  );
  position: relative;
}

.category-line::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background: #64c8ff;
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(100, 200, 255, 0.8);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
  50% {
    opacity: 0.6;
    transform: translateY(-50%) scale(1.2);
  }
}

.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.site-link {
  text-decoration: none;
  display: block;
}

@media (max-width: 768px) {
  .category-section {
    margin-bottom: 48px;
  }

  .category-icon {
    font-size: 28px;
  }

  .category-name {
    font-size: 24px;
  }

  .sites-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
