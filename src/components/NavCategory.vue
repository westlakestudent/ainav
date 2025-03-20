<script setup>
import { ref, computed } from 'vue';
import SiteIcon from './SiteIcon.vue';

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
});

const isExpanded = ref(false);

// 计算是否显示展开/折叠按钮
const showExpandButton = computed(() => {
  return props.category.sites.length > 12;
});

// 计算当前显示的网站列表
const displayedSites = computed(() => {
  return isExpanded.value ? props.category.sites : props.category.sites.slice(0, 12);
});

// 切换展开/折叠状态
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <div class="category">
    <!-- 分类标题 -->
    <div class="category-header">
      <div class="header-left">
        <span class="category-icon">{{ category.icon }}</span>
        <h2 class="category-title">{{ category.name }}</h2>
      </div>
      <div class="header-right">
        <span class="site-count">{{ category.sites.length }}个网站</span>
      </div>
    </div>
    
    <!-- 网站列表 -->
    <div class="sites-grid">
      <a 
        v-for="site in displayedSites" 
        :key="site.id" 
        :href="site.url" 
        target="_blank" 
        rel="noopener noreferrer"
        class="site-card"
        :title="site.desc"
      >
        <SiteIcon :url="site.url" :fallback-icon="site.icon" />
        <div class="site-info">
          <div class="site-name">{{ site.name }}</div>
          <div class="site-desc">{{ site.desc }}</div>
        </div>
      </a>
    </div>

    <!-- 展开/折叠按钮 -->
    <div v-if="showExpandButton" class="expand-button-container">
      <button @click="toggleExpand" class="expand-button">
        {{ isExpanded ? '收起' : `展开更多 (${category.sites.length - 12})` }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.category {
  background-color: var(--card-color);
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--shadow-color);
  padding: 24px;
  width: 100%;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-icon {
  font-size: 28px;
  background-color: var(--accent-bg);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  transition: var(--theme-transition);
}

.category-title {
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
  transition: var(--theme-transition);
}

.site-count {
  background-color: var(--accent-bg);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  transition: var(--theme-transition);
}

.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.site-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 10px;
  text-decoration: none;
  background-color: var(--card-inner);
  transition: var(--theme-transition);
  border: 1px solid var(--border-color);
}

.site-card:hover {
  box-shadow: 0 6px 16px var(--shadow-hover);
  transform: translateY(-2px);
  background-color: var(--card-hover);
}

.site-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.site-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: var(--theme-transition);
}

.site-desc {
  font-size: 14px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: var(--theme-transition);
}

.expand-button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.expand-button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.expand-button:hover {
  background: var(--primary-color-hover);
  transform: translateY(-1px);
}

/* 自适应 */
@media (max-width: 1536px) {
  .sites-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 1280px) {
  .sites-grid {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
}

@media (max-width: 1024px) {
  .sites-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
  
  .category-icon {
    font-size: 24px;
    width: 42px;
    height: 42px;
  }
  
  .category-title {
    font-size: 20px;
  }
}

@media (max-width: 767px) {
  .sites-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}

@media (max-width: 480px) {
  .sites-grid {
    grid-template-columns: 1fr;
  }
  
  .site-card {
    padding: 12px;
  }
}
</style> 