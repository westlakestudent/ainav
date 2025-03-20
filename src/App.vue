<script setup>
import { ref, onMounted, watch } from 'vue';
import NavHeader from './components/NavHeader.vue'
import NavContent from './components/NavContent.vue'

// 主题状态管理
const isDarkMode = ref(false);
const isSystemDark = ref(false);
const themePreference = ref('system'); // 'system', 'light', 'dark'

// 检查系统主题
const checkSystemTheme = () => {
  isSystemDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (themePreference.value === 'system') {
    isDarkMode.value = isSystemDark.value;
  }
};

// 应用主题
const applyTheme = () => {
  isDarkMode.value = 
    themePreference.value === 'dark' || 
    (themePreference.value === 'system' && isSystemDark.value);
};

// 设置主题
const setTheme = (theme) => {
  themePreference.value = theme;
  localStorage.setItem('themePreference', theme);
  applyTheme();
};

// 初始化主题
onMounted(() => {
  // 从本地存储获取主题偏好
  const savedTheme = localStorage.getItem('themePreference');
  if (savedTheme) {
    themePreference.value = savedTheme;
  }
  
  checkSystemTheme();
  applyTheme();
  
  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkSystemTheme);
});

// 监视主题偏好变化
watch(themePreference, () => {
  applyTheme();
});
</script>

<template>
  <div class="app-container" :class="{ 'dark-theme': isDarkMode }">
    <NavHeader :isDarkMode="isDarkMode" :themePreference="themePreference" @setTheme="setTheme" />
    <NavContent />
    <footer class="footer">
      <p>&copy; {{ new Date().getFullYear() }} AI导航中心 | 汇聚全球顶尖AI技术与工具</p>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #3e7bfa;
  --primary-light: #6c9cff;
  --primary-dark: #2c5ce0;
  --secondary-color: #5d36be;
  --background-color: #f5f7fa;
  --card-color: #ffffff;
  --card-inner: #f9fafc;
  --card-hover: #f1f4f9;
  --text-primary: #1a202c;
  --text-secondary: #4a5568;
  --text-tertiary: #718096;
  --text-link: #3e7bfa;
  --text-light: #f8fafc;
  --border-color: rgba(226, 232, 240, 0.8);
  --shadow-color: rgba(0, 0, 0, 0.06);
  --shadow-hover: rgba(0, 0, 0, 0.1);
  --accent-bg: rgba(62, 123, 250, 0.08);
  --accent-light: rgba(62, 123, 250, 0.12);
  --accent-strong: rgba(62, 123, 250, 0.9);
  --icon-bg-color: rgba(255, 255, 255, 0.2);
  --success-color: #38a169;
  --error-color: #e53e3e;
  --warning-color: #dd6b20;
  --info-color: #3182ce;
  --theme-transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  --sidebar-width: 260px;
  --sidebar-bg: var(--card-color);
  --sidebar-width-large: 300px;
  --sidebar-width-medium: 240px;
}

.dark-theme {
  --primary-color: #4d8eff;
  --primary-light: #6c9cff;
  --primary-dark: #3674e0;
  --secondary-color: #6d46ce;
  --background-color: #121926;
  --card-color: #1e293b;
  --card-inner: #283548;
  --card-hover: #334155;
  --text-primary: #e2e8f0;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;
  --text-link: #60a5fa;
  --text-light: #f8fafc;
  --border-color: rgba(51, 65, 85, 0.8);
  --shadow-color: rgba(0, 0, 0, 0.25);
  --shadow-hover: rgba(0, 0, 0, 0.4);
  --accent-bg: rgba(79, 141, 255, 0.15);
  --accent-light: rgba(79, 141, 255, 0.2);
  --accent-strong: rgba(79, 141, 255, 0.9);
  --icon-bg-color: rgba(255, 255, 255, 0.1);
  --success-color: #38a169;
  --error-color: #e53e3e;
  --warning-color: #dd6b20;
  --info-color: #3182ce;
  --sidebar-bg: var(--card-color);
}

html, body {
  width: 100vw !important;
  max-width: 100vw !important;
  min-width: 100vw !important;
  overflow-x: hidden !important;
}

body {
  font-family: 'Inter', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--background-color);
  color: var(--text-primary);
  line-height: 1.6;
  transition: var(--theme-transition);
}

.app-container {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 40px 30px !important;
  background-color: var(--background-color);
  transition: var(--theme-transition);
}

@media (max-width: 1399px) {
  .app-container {
    padding: 30px 25px !important;
  }
}

@media (max-width: 991px) {
  .app-container {
    padding: 25px 20px !important;
  }
}

@media (max-width: 768px) {
  .app-container {
    padding: 20px 15px !important;
  }
}

@media (max-width: 480px) {
  .app-container {
    padding: 15px 12px !important;
  }
}

@media (min-width: 1800px) {
  .app-container {
    max-width: 1720px;
    margin: 0 auto !important;
  }
}

@media (min-width: 1400px) and (max-width: 1799px) {
  .app-container {
    max-width: 1320px;
    margin: 0 auto !important;
  }
}

a {
  text-decoration: none;
  color: var(--text-link);
  transition: var(--theme-transition);
}

a:hover {
  text-decoration: none;
}

button {
  cursor: pointer;
  border: none;
  outline: none;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s;
}

.footer {
  text-align: center;
  margin-top: 4rem;
  padding: 2rem 0;
  color: var(--text-tertiary);
  font-size: 0.9rem;
  border-top: 1px solid var(--border-color);
}

/* 滚动条美化 */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: var(--background-color);
}

::-webkit-scrollbar-thumb {
  background: var(--text-tertiary);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}

.dark-theme::-webkit-scrollbar-track {
  background: var(--background-color);
}

.dark-theme::-webkit-scrollbar-thumb {
  background: var(--text-tertiary);
}

.dark-theme::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}
</style>
