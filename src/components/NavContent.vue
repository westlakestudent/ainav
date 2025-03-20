<script setup>
import { ref, computed } from 'vue';
import NavCategory from './NavCategory.vue';
import Sidebar from './Sidebar.vue';
import indexData from '../data/index.js';
// 为了简化示例，暂时注释掉性能工具导入
// import { dataCache, perfMonitor, preloader } from '../utils/performance.js';

// 调试信息 - 显示索引数据
console.log("加载的索引数据:", indexData);

// 提前导入所有分类的JS模块
import category1 from '../data/1_ai平台与基础设施.js';
import category2 from '../data/2_ai大模型.js';
import category3 from '../data/3_ai开发工具.js';
import category4 from '../data/4_ai图像生成.js';
import category5 from '../data/5_ai视频与音频.js';
import category6 from '../data/6_ai生产力工具.js';
import category7 from '../data/7_ai研究与社区.js';
import category8 from '../data/8_ai创业和投资.js';

// 调试信息 - 显示加载的模块
console.log("加载的模块:", {
  category1,
  category2,
  category3,
  category4,
  category5,
  category6,
  category7,
  category8
});

// 存储所有分类数据
const categoryModules = {
  '1_ai平台与基础设施.js': category1,
  '2_ai大模型.js': category2,
  '3_ai开发工具.js': category3,
  '4_ai图像生成.js': category4,
  '5_ai视频与音频.js': category5,
  '6_ai生产力工具.js': category6,
  '7_ai研究与社区.js': category7,
  '8_ai创业和投资.js': category8
};

// 加载所有分类数据 - 现在直接从JS模块获取
const categoriesRaw = ref([]);

// 初始化加载数据 - 直接从JS模块中加载
const loadCategories = () => {
  const categories = [];
  
  // 遍历索引数据中的类别
  for (const category of indexData.categories) {
    try {
      // 输出当前类别和对应的文件名
      console.log(`尝试加载分类: ${category.name}, 文件: ${category.file}`);
      
      // 直接从JS模块中获取数据
      const categoryData = categoryModules[category.file];
      console.log(`获取到的数据:`, categoryData);
      
      if (categoryData) {
        categories.push(categoryData);
      } else {
        console.error(`找不到分类数据: ${category.file}`);
      }
    } catch (error) {
      console.error(`加载分类出错 ${category.file}:`, error);
    }
  }
  
  // 设置分类数据
  console.log("加载的所有分类:", categories);
  categoriesRaw.value = categories;
};

// 立即加载分类数据
loadCategories();

// AI导航分类和网站数据
const categories = computed(() => {
  return categoriesRaw.value.map(category => {
    return {
      ...category,
      sites: [...category.sites].sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
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