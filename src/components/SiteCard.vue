<template>
  <div class="site-card" :style="{ '--card-color': site.color }">
    <div class="card-glow"></div>
    <div class="card-content">
      <div class="site-icon">{{ site.icon }}</div>
      <div class="site-info">
        <h3 class="site-name">{{ site.name }}</h3>
        <p class="site-description">{{ site.description }}</p>
      </div>
    </div>
    <div class="card-shine"></div>
  </div>
</template>

<script setup lang="ts">
import type { Site } from '../types'

defineProps<{
  site: Site
}>()
</script>

<style scoped>
.site-card {
  position: relative;
  background: rgba(20, 30, 50, 0.6);
  border: 1px solid rgba(100, 200, 255, 0.2);
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
}

.site-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg,
    rgba(100, 200, 255, 0.05) 0%,
    transparent 50%,
    rgba(100, 200, 255, 0.05) 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

.site-card:hover {
  transform: translateY(-8px);
  border-color: rgba(100, 200, 255, 0.5);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 40px rgba(100, 200, 255, 0.2),
    inset 0 0 20px rgba(100, 200, 255, 0.1);
}

.site-card:hover::before {
  opacity: 1;
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, var(--card-color, rgba(100, 200, 255, 0.3)) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.6s ease;
  pointer-events: none;
}

.site-card:hover .card-glow {
  opacity: 0.15;
}

.card-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 16px;
}

.site-icon {
  font-size: 48px;
  line-height: 1;
  filter: drop-shadow(0 0 8px rgba(100, 200, 255, 0.5));
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.site-card:hover .site-icon {
  transform: scale(1.1) rotate(5deg);
}

.site-info {
  flex: 1;
}

.site-name {
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: #e0e8ff;
  text-shadow: 0 0 10px rgba(100, 200, 255, 0.3);
  transition: color 0.3s ease;
}

.site-card:hover .site-name {
  color: #64c8ff;
}

.site-description {
  margin: 0;
  font-size: 14px;
  color: rgba(200, 220, 255, 0.7);
  line-height: 1.5;
}

.card-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
  pointer-events: none;
}

.site-card:hover .card-shine {
  transform: translateX(100%);
}

@media (max-width: 768px) {
  .site-card {
    padding: 16px;
  }

  .site-icon {
    font-size: 36px;
  }

  .site-name {
    font-size: 18px;
  }

  .site-description {
    font-size: 13px;
  }
}
</style>
