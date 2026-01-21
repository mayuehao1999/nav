<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ParticleBackground from './components/ParticleBackground.vue'
import CategorySection from './components/CategorySection.vue'
import type { SitesConfig } from './types'
import sitesData from './config/sites.json'

const config = ref<SitesConfig>(sitesData as SitesConfig)
const currentTime = ref('')

const updateTime = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  currentTime.value = `${hours}:${minutes}`
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})
</script>

<template>
  <div class="app">
    <ParticleBackground />

    <div class="content">
      <header class="header">
        <div class="header-content">
          <h1 class="title">
            <span class="title-icon">✨</span>
            <span class="title-text">星际导航中心</span>
          </h1>
          <div class="time-display">{{ currentTime }}</div>
        </div>
        <p class="subtitle">探索无限可能的数字宇宙</p>
      </header>

      <main class="main">
        <CategorySection
          v-for="category in config.categories"
          :key="category.id"
          :category="category"
        />
      </main>

      <footer class="footer">
        <p>本人觉得有意义的网站收录</p>
      </footer>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  overflow-x: hidden;
}

#app {
  width: 100%;
  min-height: 100vh;
}
</style>

<style scoped>
.app {
  position: relative;
  min-height: 100vh;
  width: 100%;
}

.content {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 40px;
}

.header {
  text-align: center;
  margin-bottom: 80px;
  animation: fadeInDown 0.8s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  margin-bottom: 16px;
}

.title {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 56px;
  font-weight: 800;
  margin: 0;
}

.title-icon {
  font-size: 64px;
  animation: rotate 20s linear infinite;
  filter: drop-shadow(0 0 20px rgba(255, 200, 100, 0.6));
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.title-text {
  background: linear-gradient(135deg, #64c8ff 0%, #a0d8ff 50%, #64c8ff 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s linear infinite;
  text-shadow: 0 0 40px rgba(100, 200, 255, 0.5);
}

@keyframes shimmer {
  to {
    background-position: 200% center;
  }
}

.time-display {
  font-size: 48px;
  font-weight: 700;
  color: rgba(100, 200, 255, 0.9);
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 20px rgba(100, 200, 255, 0.5);
  letter-spacing: 2px;
}

.subtitle {
  font-size: 20px;
  color: rgba(200, 220, 255, 0.8);
  font-weight: 300;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(100, 200, 255, 0.3);
}

.main {
  position: relative;
}

.footer {
  margin-top: 80px;
  padding-top: 40px;
  text-align: center;
  border-top: 1px solid rgba(100, 200, 255, 0.2);
  color: rgba(200, 220, 255, 0.6);
  font-size: 14px;
}

@media (max-width: 768px) {
  .content {
    padding: 40px 20px;
  }

  .header {
    margin-bottom: 48px;
  }

  .header-content {
    flex-direction: column;
    gap: 16px;
  }

  .title {
    font-size: 36px;
    flex-direction: column;
    gap: 8px;
  }

  .title-icon {
    font-size: 48px;
  }

  .time-display {
    font-size: 32px;
  }

  .subtitle {
    font-size: 16px;
  }

  .footer {
    margin-top: 48px;
    font-size: 12px;
  }
}
</style>
