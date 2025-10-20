<template>
  <div class="main-panel">

    <div class="main-left" >
      <div class="chat-header">
        <el-input class="search" v-model="searchKeyWord" clearable placeholder="搜索" :prefix-icon="Search" />
      </div>
      <div class="chat-list">

      </div>
    </div>
    <div class="main-right">
      联系人
    </div>
  </div>
</template>
<script setup lang="ts">

import {ref} from "vue";
import {Search} from "@element-plus/icons-vue";

const searchKeyWord = ref('')

</script>

<style scoped>

.main-panel {
  display: flex;
  flex: 1;
}

.main-left {
  background: #f7f7f7;
  border-right: 1px solid #e5e5e5;
  width: 210px;
  min-width: 210px;
  max-width: 450px;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 12px 16px;
  background: #f7f7f7;
  border-bottom: 1px solid #e5e5e5;
}

.search {
  width: 90%;
  height: 25px;
  border-radius: 4px;
  border: none;
  --el-input-focus-border-color: #1fea7f
}
.search :deep(.el-input__wrapper) {
  background-color: #e5e5e5 !important;
}

.chat-list {
  flex: 1;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  display: flex;
  flex-direction: column;
  user-select: none;
}

/* 以下CSS样式为了解决滚动条的显示交互*/
.chat-list::-webkit-scrollbar {
  width: 10px;
  background: transparent;
}
.chat-list::-webkit-scrollbar-thumb {
  background: transparent;
  transition: backgroud 0.2s;
}
.chat-list:hover::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.2);
}
.chat-list:hover {
  scrollbar-color: rgba(0,0,0,0.2) transparent;
}

/* 以下样式为设置聊天列表CSS样式 */
.chat-list .chat-item {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 10px 15px;
}
.chat-list .chat-item:hover {
  background: #eaeaea;
}
.chat-list .chat-item:focus {
  background: #dedede;
}
.chat-item.selected {
  background: #dedede;
}

.main-right {
  background: #ededed;
  flex: 1;
}

</style>
