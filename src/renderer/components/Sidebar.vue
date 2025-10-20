<template>

  <div class="sidebar"
       @mousedown="onMouseDown"
       @mouseenter="hover = true"
       @mouseleave="hover = false"
  >
    <template v-for="(module, idx) in modules" :key="module.id" >
      <!-- 用户头像 -->
      <img v-if="module.type === 'avatar'" :class="module.class" :src="module.imgUrl" :alt="module.imgUrl" @mousedown.stop draggable="false" />
      <!-- 功能模块 -->
      <div v-else-if="module.type === 'module'" :class="[module.class, { selected: selectModel === idx}]" :title="module.title" @mousedown.stop @click="handleClick(module, idx)" >
        <img :src="module.imgUrl" :alt="module.title" />
      </div>
    </template>
    <!-- 更多弹窗 -->
    <div class="more-menu-popup" ref="moreMenu" v-if="showMoreMenu">
      <ul>
        <li @click="onMoreMenuClick('新建群聊')">新建群聊</li>
        <li @click="onMoreMenuClick('添加朋友')">添加朋友</li>
        <li @click="onMoreMenuClick('设置')">设置</li>
        <li @click="onMoreMenuClick('退出登录')">退出登录</li>
      </ul>
    </div>
  </div>

</template>

<script setup>

import { reactive, ref, onMounted, onBeforeUnmount } from "vue";

/* 定义子组件接受父组件传参的对象 */
const props = defineProps({
  modules: { type: Array, default: () => [] },
  activeModuleId: { type: Number, default: 2 },
})

/* 定义向父组件触发事件 */
const emit = defineEmits(['update:activeModuleId'])

/* 实现鼠标拖拽功能 */
const hover = ref(false)
const dragging = ref(false)
const last = reactive({ x: 0, y: 0 })
const selectModel = ref(1)

/* 鼠标按下 */
function onMouseDown(e) {
  dragging.value = true
  last.value = { x: e.screenX, y: e.screenY }
  document.addEventListener("mousemove", onMouseMove)
  document.addEventListener("mouseup", onMouseUp)
}

/* 鼠标移动 */
function onMouseMove(e) {
  if (!dragging.value) return
  const dx = e.screenX - last.value.x
  const dy = e.screenY - last.value.y
  window.electronAPI && window.electronAPI.dragWindow(Number(dx), Number(dy))
  last.value = { x: e.screenX, y: e.screenY }
}

/* 鼠标放开 */
function onMouseUp(e) {
  dragging.value = false
  document.addEventListener("mousemove", onMouseMove)
  document.addEventListener("mouseup", onMouseUp)
}

// module的点击事件
const moreMenu = ref(null)
const showMoreMenu = ref(false)

// 监听点击外部，关闭弹窗
function handleClickOutside(event) {
  if(showMoreMenu.value && !moreMenu.value.contains(event.target)) {
    showMoreMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside)
  var module = props.modules.find(item => item.id === 2);
  handleClick(module, 1)
})
onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside)
})

function handleClick(module, idx) {

  if(module.id === 5) {
    // 打开朋友圈新窗口
    openMomentWindow()
  } else if (module.id === 6) {
    // 打开小程序新窗口
    openMiniProgramWindow()
  } else if (module.id === 7) {
    showMoreMenu.value = true
  } else {
    selectModel.value = idx
    emit("update:activeModuleId", Number(module.id))
  }
}

/* 打开朋友圈窗口 */
const openMiniProgramWindow = () => {
  window.electronAPI?.openMiniProgramWindow()
}

/* 打开收藏窗口 */
const openMomentWindow = () => {
  window.electronAPI?.openMomentWindow()
}

/* 点击更多 */
function onMoreMenuClick(item) {
  alert('点击了: ' + item)
  showMoreMenu.value = false
}

</script>

<style scoped>

.sidebar {
  background: #ededed;
  width: 60px;
  min-width: 60px;
  max-width: 60px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  /* 禁止鼠标选中内容 */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.sidebar-header {
  width: 36px;
  height: 36px;
  border-radius: 10%;
}
.img-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
.img-btn img {
  width: 25px;
  height: 25px;
}
.img-btn:hover {
  background: rgba(195, 194, 194, 0.92);
}
.sidebar-footer {
  margin-top: auto;
  margin-bottom: 20px;
}

img {
  -webkit-user-drag: none;
  user-drag: none;
}

.selected {
  background: #c6c6c6;
}

/* 点击更多 */
.more-menu-popup {
  position: absolute;
  left: 70px;
  bottom: 20px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  border-radius: 6px;
  padding: 8px 0;
  font-size: 15px;
  color: #222;
  z-index: 9999;
  animation: fadeIn 0.15s;
}

.more-menu-popup ul {
  list-style: none;
  margin: 0px 5px;
  padding: 0;
}
.more-menu-popup li {
  padding: 10px 24px 10px 20px;
  cursor: pointer;
  transition: background 0.2s;
  border-radius: 4px;
}
.more-menu-popup li:hover {
  background: #1fea7f;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

</style>
