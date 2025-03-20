<script setup>
import { ref, computed, onMounted } from 'vue';
import NavCategory from './NavCategory.vue';
import Sidebar from './Sidebar.vue';
import indexData from '../data/index.json';

// 加载所有分类数据
const categoriesRaw = ref([]);

const loadCategories = async () => {
  const categories = [];
  for (const category of indexData.categories) {
    const categoryData = await import(/* @vite-ignore */ `../data/${category.file}`);
    categories.push(categoryData.default);
  }
  categoriesRaw.value = categories;
};

// 在组件挂载时加载数据
onMounted(() => {
  loadCategories();
});

// AI导航分类和网站数据
const categories = computed(() => {
  return categoriesRaw.value.map(category => {
    return {
      ...category,
      sites: [...category.sites].sort((a, b) => a.name.localeCompare(b.name))
    };
  });
});

// 当前选中的分类ID，0表示显示所有分类
const activeCategory = ref(0);

// 当前要显示的分类列表
const currentCategories = computed(() => {
  if (activeCategory.value === 0) {
    // 显示所有分类
    return categories.value;
  } else {
    // 只显示选中的分类
    return categories.value.filter(category => category.id === activeCategory.value);
  }
});

// 处理分类选择
const handleSelectCategory = (categoryId) => {
  activeCategory.value = categoryId;
  
  // 如果在移动设备上，滚动到内容区域
  if (window.innerWidth <= 991) {
    setTimeout(() => {
      const contentElement = document.querySelector('.content-area');
      if (contentElement) {
        contentElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
};
</script>

<template>
  <div class="nav-content">
    <div class="layout-container">
      <!-- 左侧侧边栏 -->
      <div class="sidebar-container">
        <Sidebar 
          :categories="categories" 
          :activeCategory="activeCategory"
          @select-category="handleSelectCategory"
        />
      </div>
      
      <!-- 右侧内容区域 -->
      <div class="content-area">
        <!-- 导航分类列表 -->
        <div class="categories-container">
          <NavCategory 
            v-for="category in currentCategories" 
            :key="category.id"
            :category="category"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-content {
  display: flex;
  flex-direction: column;
  width: 100% !important;
  min-width: 100% !important;
  max-width: 100% !important;
  transition: var(--theme-transition);
}

.layout-container {
  display: flex;
  gap: 24px;
  width: 100%;
}

.sidebar-container {
  width: 260px;
  flex-shrink: 0;
}

.content-area {
  flex: 1;
  min-width: 0; /* 防止内容溢出 */
}

.categories-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100% !important;
  min-width: 100% !important;
}

/* 不同屏幕尺寸下的间距调整 */
@media (min-width: 1800px) {
  .categories-container {
    gap: 40px;
  }
  
  .sidebar-container {
    width: 300px;
  }
  
  .layout-container {
    gap: 30px;
  }
}

@media (min-width: 1400px) and (max-width: 1799px) {
  .categories-container {
    gap: 35px;
  }
}

@media (min-width: 992px) and (max-width: 1399px) {
  .categories-container {
    gap: 30px;
  }
  
  .sidebar-container {
    width: 240px;
  }
  
  .layout-container {
    gap: 20px;
  }
}

@media (max-width: 991px) {
  .layout-container {
    flex-direction: column;
    gap: 20px;
  }
  
  .sidebar-container {
    width: 100%;
  }
  
  .categories-container {
    gap: 25px;
  }
}

@media (max-width: 480px) {
  .categories-container {
    gap: 20px;
  }
}
</style> 