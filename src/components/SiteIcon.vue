<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  url: {
    type: String,
    required: true
  },
  fallbackIcon: {
    type: String,
    default: '🔗'
  }
});

const isLoaded = ref(false);
const currentImageIndex = ref(0);
const hasError = ref(false);

// 从URL中提取域名
const getDomain = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (e) {
    console.error('Invalid URL:', url);
    return '';
  }
};

// 为特定网站设置特定图标的方法
const getSiteSpecificIcon = (url, domain) => {
  // 阿里系产品（通义万相）
  if (domain === 'wanxiang.aliyun.com' || url.includes('wanxiang.aliyun.com')) {
    return 'https://img.alicdn.com/imgextra/i1/O1CN01FgRHUY1FC0HYjQzsl_!!6000000000451-73-tps-64-64.ico';
  }
  
  // 其他已知有问题的网站可以在这里添加特殊处理

  return null; // 没有特定图标
};

// 从URL或域名生成初始字母图标
const getInitials = (url) => {
  try {
    const domain = getDomain(url);
    if (!domain) return '';
    
    // 移除www.前缀和常见的后缀
    let name = domain.replace(/^www\./i, '').split('.')[0];
    
    // 对于某些域名进行特殊处理
    if (name.length <= 2) {
      // 对于非常短的域名，尝试使用整个主域名
      name = domain.replace(/^www\./i, '');
    }
    
    // 返回第一个字符，优先选择字母而不是数字
    const firstChar = name.split('').find(char => /[a-zA-Z]/.test(char)) || name[0] || '';
    return firstChar.toUpperCase();
  } catch (e) {
    return '';
  }
};

const domain = computed(() => getDomain(props.url));
const initialLetter = computed(() => getInitials(props.url));

// 生成背景色
const backgroundColorHue = computed(() => {
  // 根据域名生成一个稳定的色调值（0-360）
  if (!domain.value) return 210; // 默认蓝色
  
  let hash = 0;
  for (let i = 0; i < domain.value.length; i++) {
    hash = domain.value.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return Math.abs(hash) % 360;
});

// 定义多个favicon来源，按优先级排序
const iconSources = computed(() => {
  if (!domain.value) return [];
  
  // 首先检查是否有特定网站的图标（比如通义万相）
  const specificIcon = getSiteSpecificIcon(props.url, domain.value);
  if (specificIcon) {
    return [specificIcon];
  }
  
  // 默认仅使用网站自身的favicon.ico
  return [
    // 直接尝试获取网站根目录的favicon
    `https://${domain.value}/favicon.ico`
  ];
});

// 当前正在尝试的图标URL
const currentIconUrl = computed(() => {
  if (currentImageIndex.value < iconSources.value.length) {
    return iconSources.value[currentImageIndex.value];
  }
  return null;
});

// 处理图片加载成功
const handleImageLoad = () => {
  isLoaded.value = true;
  hasError.value = false;
};

// 处理图片加载失败，直接使用默认图标
const handleImageError = () => {
  // 直接设置为失败状态，使用默认图标
  hasError.value = true;
  
  // 如果是开发环境，记录一下哪些网站的图标加载失败
  if (process.env.NODE_ENV === 'development') {
    console.log(`图标加载失败: ${domain.value}, 使用默认图标: ${props.fallbackIcon}`);
  }
};

// 检查是否应该显示fallback图标（所有图标源都失败或者使用emoji）
const shouldShowFallback = computed(() => {
  return hasError.value || (!isLoaded.value && initialLetter.value === '');
});
</script>

<template>
  <div class="site-icon" :style="!isLoaded ? { '--icon-hue': backgroundColorHue + 'deg' } : {}">
    <!-- 初始或加载中显示字母图标 -->
    <div 
      v-if="!shouldShowFallback" 
      class="initial-icon"
      :class="{ 'hidden': isLoaded }"
    >
      {{ initialLetter }}
    </div>
    
    <!-- 如果有可用的图标URL且正在加载或已加载成功 -->
    <img 
      v-if="currentIconUrl && !hasError" 
      :src="currentIconUrl" 
      :alt="domain"
      @load="handleImageLoad" 
      @error="handleImageError"
      class="favicon"
      :class="{ 'visible': isLoaded }"
    />
    
    <!-- 如果所有图标源都失败，使用表情符号作为备用 -->
    <span v-if="shouldShowFallback" class="fallback-icon">{{ fallbackIcon }}</span>
  </div>
</template>

<style scoped>
.site-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--accent-light);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  transition: var(--theme-transition);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* 默认字母图标样式 */
.initial-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background-color: hsl(var(--icon-hue), 70%, 50%);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
  transition: opacity 0.4s ease;
}

.favicon {
  width: 20px;  /* 减小尺寸提高渲染速度 */
  height: 20px;
  object-fit: contain;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  transition: all 0.4s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  will-change: opacity, transform; /* 优化动画性能 */
}

.favicon.visible {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.site-icon:hover .favicon.visible {
  transform: translate(-50%, -50%) scale(1.1);
}

/* 当favicon加载完成时，隐藏初始图标 */
.site-icon:has(.favicon.visible) .initial-icon {
  opacity: 0;
}

/* 对于不支持:has选择器的浏览器的备选方案 */
.initial-icon.hidden {
  opacity: 0;
}

.fallback-icon {
  font-size: 22px;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
}

/* 响应式调整 */
@media (max-width: 768px) {
  .site-icon {
    width: 36px;
    height: 36px;
  }
  
  .favicon {
    width: 22px;
    height: 22px;
  }
  
  .initial-icon {
    font-size: 16px;
  }
  
  .fallback-icon {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .site-icon {
    width: 32px;
    height: 32px;
  }
  
  .favicon {
    width: 20px;
    height: 20px;
  }
  
  .initial-icon {
    font-size: 14px;
  }
  
  .fallback-icon {
    font-size: 18px;
  }
}
</style> 