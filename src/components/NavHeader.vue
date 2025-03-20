<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  isDarkMode: {
    type: Boolean,
    default: false
  },
  themePreference: {
    type: String,
    default: 'system'
  }
});

const emit = defineEmits(['setTheme']);

// 控制下拉菜单显示状态
const isDropdownVisible = ref(false);

// 切换下拉菜单
const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

// 关闭下拉菜单
const closeDropdown = () => {
  isDropdownVisible.value = false;
};

// 切换主题
const toggleTheme = () => {
  if (props.themePreference === 'system') {
    emit('setTheme', props.isDarkMode ? 'light' : 'dark');
  } else if (props.themePreference === 'light') {
    emit('setTheme', 'dark');
  } else {
    emit('setTheme', 'light');
  }
};

// 设置特定主题
const setTheme = (theme) => {
  emit('setTheme', theme);
  // 选择后自动关闭下拉菜单
  closeDropdown();
};

// 点击外部区域关闭下拉菜单
const handleClickOutside = (event) => {
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle && !themeToggle.contains(event.target)) {
    closeDropdown();
  }
};

// 生命周期钩子，添加和移除点击事件监听器
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <header class="nav-header">
    <div class="theme-toggle-container">
      <div class="theme-toggle">
        <button @click="toggleDropdown" class="theme-btn" :title="isDarkMode ? '切换到亮色模式' : '切换到暗色模式'">
          <span v-if="isDarkMode" class="theme-icon">🌞</span>
          <span v-else class="theme-icon">🌙</span>
        </button>
        <div v-show="isDropdownVisible" class="theme-dropdown">
          <button @click="setTheme('light')" class="theme-option" :class="{ active: themePreference === 'light' }">
            <span class="option-icon">☀️</span>
            <span class="option-text">亮色</span>
          </button>
          <button @click="setTheme('dark')" class="theme-option" :class="{ active: themePreference === 'dark' }">
            <span class="option-icon">🌙</span>
            <span class="option-text">暗色</span>
          </button>
          <button @click="setTheme('system')" class="theme-option" :class="{ active: themePreference === 'system' }">
            <span class="option-icon">💻</span>
            <span class="option-text">系统</span>
          </button>
        </div>
      </div>
    </div>
    
    <div class="header-content">
      <div class="logo-container">
        <div class="logo">
          <div class="logo-inner">
            <div class="brain"></div>
            <div class="circuit-lines">
              <div class="line line-1"></div>
              <div class="line line-2"></div>
              <div class="line line-3"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="title-container">
        <h1 class="title">AI导航中心</h1>
        <p class="description">全球顶尖人工智能项目与工具一站式导航</p>
      </div>
    </div>
    
    <div class="decorative-elements">
      <div class="decorative-circle circle-1"></div>
      <div class="decorative-circle circle-2"></div>
      <div class="decorative-circle circle-3"></div>
      <div class="decorative-dot-grid"></div>
    </div>
  </header>
</template>

<style scoped>
.nav-header {
  position: relative;
  text-align: center;
  padding: 2.2rem 2rem 2rem;
  margin-bottom: 1.8rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 14px;
  box-shadow: 0 8px 20px rgba(62, 123, 250, 0.18);
  overflow: hidden;
  color: white;
  width: 100% !important;
  min-width: 100% !important;
  max-width: 100% !important;
  transition: var(--theme-transition);
}

.theme-toggle-container {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 20;
}

.theme-toggle {
  position: relative;
  display: inline-block;
}

.theme-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--icon-bg-color);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.theme-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.theme-icon {
  font-size: 1.2rem;
}

.theme-dropdown {
  position: absolute;
  top: 42px;
  right: 0;
  background: var(--card-color);
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  width: 120px;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  z-index: 30;
  transition: var(--theme-transition);
  border: 1px solid var(--border-color);
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  transition: background-color 0.2s;
  color: var(--text-primary);
  z-index: 30;
  position: relative;
}

.theme-option:hover {
  background-color: var(--card-hover);
}

.theme-option.active {
  background-color: var(--primary-color);
  color: white;
}

.option-icon {
  font-size: 1.1rem;
}

.option-text {
  font-size: 0.9rem;
  font-weight: 500;
}

.header-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100% !important;
  margin: 0 auto;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 0.4rem;
}

.logo {
  width: 85px;
  height: 85px;
  border-radius: 50%;
  background: linear-gradient(145deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05));
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: float 6s ease-in-out infinite;
}

.logo-inner {
  width: 70%;
  height: 70%;
  position: relative;
}

.brain {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
  border-radius: 40% 40% 40% 40%;
  position: relative;
  transform: rotate(-10deg);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
}

.brain:before, .brain:after {
  content: '';
  position: absolute;
  background: radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
  border-radius: 50%;
}

.brain:before {
  width: 60%;
  height: 60%;
  top: -15%;
  left: -15%;
}

.brain:after {
  width: 60%;
  height: 60%;
  top: -15%;
  right: -15%;
}

.circuit-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
}

.line {
  position: absolute;
  background: var(--primary-light);
  border-radius: 4px;
}

.line-1 {
  width: 40%;
  height: 3px;
  top: 30%;
  left: 30%;
  transform: rotate(45deg);
  animation: pulse-line 3s infinite alternate;
}

.line-2 {
  width: 25%;
  height: 3px;
  bottom: 35%;
  right: 35%;
  transform: rotate(-45deg);
  animation: pulse-line 2.5s infinite alternate 0.3s;
}

.line-3 {
  width: 35%;
  height: 3px;
  bottom: 25%;
  left: 25%;
  transform: rotate(30deg);
  animation: pulse-line 3.5s infinite alternate 0.6s;
}

@keyframes pulse-line {
  0% {
    opacity: 0.5;
    box-shadow: 0 0 5px var(--primary-light);
  }
  100% {
    opacity: 1;
    box-shadow: 0 0 10px var(--primary-light), 0 0 20px var(--primary-light);
  }
}

.title-container {
  max-width: 100%;
}

.title {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(120deg, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.description {
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.4;
}

.decorative-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.decorative-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.circle-1 {
  width: 150px;
  height: 150px;
  top: -40px;
  left: -40px;
  animation: pulse 8s ease-in-out infinite;
}

.circle-2 {
  width: 100px;
  height: 100px;
  bottom: -30px;
  right: 10%;
  animation: pulse 12s ease-in-out infinite;
}

.circle-3 {
  width: 70px;
  height: 70px;
  top: 30%;
  right: -25px;
  animation: pulse 6s ease-in-out infinite;
}

.decorative-dot-grid {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  opacity: 0.5;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
}

@media (min-width: 768px) {
  .header-content {
    flex-direction: row;
    text-align: left;
    justify-content: center;
  }
  
  .logo-container {
    margin-bottom: 0;
    margin-right: 1.8rem;
  }
  
  .title {
    font-size: 3rem;
  }

  .nav-header {
    padding: 2.5rem 2.5rem;
  }
}

@media (min-width: 1400px) {
  .title {
    font-size: 3.2rem;
  }
  
  .description {
    font-size: 1.2rem;
  }

  .logo {
    width: 90px;
    height: 90px;
  }
  
  .nav-header {
    padding: 2.8rem 3rem;
  }
}

@media (max-width: 991px) {
  .nav-header {
    padding: 2.2rem 1.5rem;
  }
  
  .title {
    font-size: 2.6rem;
  }
  
  .description {
    font-size: 1.1rem;
  }
  
  .logo {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 767px) {
  .nav-header {
    padding: 1.8rem 1.5rem;
    margin-bottom: 1.8rem;
  }
  
  .title {
    font-size: 2.2rem;
  }
  
  .description {
    font-size: 1rem;
  }
  
  .logo {
    width: 70px;
    height: 70px;
  }
  
  .theme-toggle-container {
    top: 0.75rem;
    right: 0.75rem;
  }
  
  .theme-btn {
    width: 34px;
    height: 34px;
  }
  
  .theme-icon {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .nav-header {
    padding: 1.6rem 1rem;
    margin-bottom: 1.5rem;
  }
  
  .logo {
    width: 60px;
    height: 60px;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .description {
    font-size: 0.9rem;
  }
}
</style> 