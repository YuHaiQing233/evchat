import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 引入Element Plus及其样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 测试
var app = createApp(App);
app.use(router)
app.use(ElementPlus)
app.mount('#app')
