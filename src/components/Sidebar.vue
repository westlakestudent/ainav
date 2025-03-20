<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  activeCategory: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['select-category']);

const isMobile = ref(false);
const sidebarVisible = ref(true);

// 在移动设备上切换侧边栏显示/隐藏
const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value;
};

// 选择分类
const selectCategory = (categoryId) => {
  emit('select-category', categoryId);
  
  // 在移动设备上选择分类后自动隐藏侧边栏
  if (isMobile.value) {
    sidebarVisible.value = false;
  }
};

// 检查是否为移动设备
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 991;
  
  // 如果是移动设备，默认隐藏侧边栏
  if (isMobile.value) {
    sidebarVisible.value = false;
  } else {
    sidebarVisible.value = true;
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>

<template>
  <div class="sidebar-wrapper">
    <!-- 移动设备上的切换按钮 -->
    <button 
      v-if="isMobile" 
      class="sidebar-toggle"
      @click="toggleSidebar"
    >
      {{ sidebarVisible ? '隐藏分类' : '显示分类' }}
    </button>
    
    <div 
      class="sidebar"
      :class="{ 'sidebar-hidden': isMobile && !sidebarVisible }"
    >
      <div class="sidebar-title">分类导航</div>
      <ul class="category-list">
        <li 
          class="category-item"
          :class="{ active: activeCategory === 0 }"
          @click="selectCategory(0)"
        >
          <span class="category-icon">🏠</span>
          <span class="category-name">全部分类</span>
        </li>
        
        <li 
          v-for="category in categories" 
          :key="category.id"
          class="category-item"
          :class="{ active: category.id === activeCategory }"
          @click="selectCategory(category.id)"
        >
          <span class="category-icon">{{ category.icon }}</span>
          <span class="category-name">{{ category.name }}</span>
          <span class="site-count">{{ category.sites.length }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.sidebar-wrapper {
  position: relative;
  width: 100%;
}

.sidebar-toggle {
  width: 100%;
  padding: 12px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.sidebar-toggle:hover {
  background-color: var(--primary-dark);
  transform: translateY(-1px);
}

.sidebar {
  background-color: var(--sidebar-bg);
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--shadow-color);
  padding: 20px 0;
  width: 100%;
  max-width: 100%;
  height: calc(100vh - 140px);
  position: sticky;
  top: 100px;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.sidebar-hidden {
  display: none;
}

.sidebar-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  padding: 0 20px 15px;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
  transition: var(--theme-transition);
  text-align: center;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  position: relative;
}

.category-item:hover {
  background-color: var(--card-hover);
}

.category-item.active {
  background-color: var(--accent-bg);
  border-left: 3px solid var(--primary-color);
}

.category-icon {
  margin-right: 12px;
  font-size: 18px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--accent-bg);
  border-radius: 6px;
  transition: all 0.2s ease;
}

.category-item.active .category-icon,
.category-item:hover .category-icon {
  background-color: var(--accent-light);
  transform: scale(1.05);
}

.category-name {
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  transition: var(--theme-transition);
}

.site-count {
  background-color: var(--accent-light);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 12px;
  transition: var(--theme-transition);
}

.category-item.active .category-name {
  color: var(--primary-color);
  font-weight: 600;
}

.category-item.active .site-count {
  background-color: var(--primary-light);
  color: var(--text-light);
}

/* 为第一个条目添加特殊样式 */
.category-item:first-child {
  margin-bottom: 8px;
  border-bottom: 1px dashed var(--border-color);
}

.category-item:first-child .category-icon {
  background-color: var(--primary-light);
  color: var(--text-light);
}

@media (max-width: 991px) {
  .sidebar {
    height: auto;
    position: relative;
    top: 0;
    margin-bottom: 20px;
    max-height: 400px;
  }
  
  .category-item {
    padding: 10px 16px;
  }
  
  .category-icon {
    width: 24px;
    height: 24px;
    font-size: 16px;
  }
  
  .category-name {
    font-size: 14px;
  }
  
  .site-count {
    font-size: 11px;
    padding: 1px 6px;
  }
}
</style> 