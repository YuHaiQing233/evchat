<template>

  <div class="main-panel">

    <div class="main-left" >
      <div class="chat-header">
        <el-input class="search" v-model="searchKeyWord" clearable placeholder="搜索" :prefix-icon="Search" />
      </div>
      <div class="chat-list">
        <div v-for="(chat, idx) in chatList" :key="chat.id" :class="['chat-item', { selected: selectedIdx === idx }]" @click="selectChat(chat, idx)" >
          <div class="chat-item-left">
            <img :src="chat.avatar"  alt="头像"/>
          </div>
          <div class="chat-item-right">
            <div class="chat-item-right-header">
              <span style="font-size: 14px;">{{ truncate(chat.name, 7) }}</span>
              <span style="font-size: 12px;color: #655f5f">{{ chat.time }}</span>
            </div>
            <div class="chat-item-right-message">
              <span>{{ truncate(chat.lastMessage, 10) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-right">
      <div class="message-header">
        <div class="message-header-title">
          {{ chatDetail.participants[0].nickname }}
        </div>
        <div class="message-header-event">
          <div class="window-event">
            <div class="img-btn" title="最小化" @click="handleEventClient('minimize')"><img src="../assets/events/win-minimize.png" alt=""/></div>
            <div class="img-btn" title="最大化" @click="handleEventClient('maximize')"><img src="../assets/events/win-maximize.png" alt=""/></div>
            <div class="img-btn" title="关闭" @click="handleEventClient('close')"><img src="../assets/events/win-close.png" alt=""/></div>
          </div>
          <div class="chat-event">
            <div class="img-btn" title="聊天信息"><img src="../assets/chats/chat-info.png" alt=""/></div>
          </div>
        </div>
      </div>
      <div class="message-content">

        <div v-for="session in chatDetail.messages" :class="['user-message', session.isSelf ? 'me' : 'friend']">
          <img class="user-avatar" :src="session.avatar" alt="头像" />
          <div :class="['message-text', session.isSelf ? 'message-text-me' : 'message-text-friend' ]">{{ session.content }}</div>
        </div>

      </div>
      <div class="message-compile">
        <div class="chat-menu-bar">
          <div class="toolbar-left" >
            <div class="toolbar" title="发送表情"><img src="../assets/chats/emoji.png" alt="emoji" /></div>
            <div class="toolbar" title="发送收藏"><img src="../assets/chats/bookmark.png" alt="emoji" /></div>
            <div class="toolbar" title="发送文件" @click="openFolder()"><img src="../assets/chats/folder.png" alt="emoji" /></div>
            <div class="toolbar" title="截图"><img src="../assets/chats/screenshot.png" alt="emoji" /></div>
            <div class="toolbar" title="聊天记录"><img src="../assets/chats/chat_history.png" alt="emoji" /></div>
          </div>
          <div class="toolbar-right" >
            <div class="toolbar" title="语音聊天"><img src="../assets/chats/voice.png" alt="emoji" /></div>
            <div class="toolbar" title="视频聊天"><img src="../assets/chats/video.png" alt="emoji" /></div>
          </div>
        </div>
        <div class="chat-input">
          <textarea class="no-border-input" />
        </div>
        <div class="chat-send-btn">
          <el-button type="success" style="width: 95px;height: 30px;background: #07c160">发送</el-button>
        </div>
      </div>
    </div>

  </div>

</template>
<script setup lang="ts">
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { session_data } from '../mock/mock_conversation.js'

const selectedIdx = ref(0)
const searchKeyWord = ref('')

// Mock 聊天数据
const chatDetail = session_data[0]


/* 定义子组件接受父组件传参的对象 */
const chatProps = defineProps({
  chatList: { type: Array, default: () => [] },
  activeModuleId: { type: Number, default: 1 },
})

/* 字符串截短 */
function truncate(str, len) {
  return str.length > len ? str.slice(0, len) + '...' : str
}

/* 选择聊天，如果当前选择的为已经选中的聊条则取消选中，否则选中 */
function selectChat(chat, idx) {
  selectedIdx.value = selectedIdx.value === idx ? null : idx
  this.chatDetail = session_data.find(item => item.chat_id === chat.id)
}

/* 处理系统点击事件 */
function handleEventClient(event: String) {

  if(event === "minimize") {
    window.electronAPI?.minimize()
  } else if(event === "maximize") {
    window.electronAPI?.isWindowMaximized().then(isMaximized => {
      if (isMaximized) {
        window.electronAPI?.unmaximize()
      } else {
        window.electronAPI?.maximize()
      }
    })
  } else if(event === "close") {
    window.electronAPI?.close()
  }
}

function openFolder() {
  window.electronAPI?.openFolder('C:\\Users\\ltech\\Desktop\\图标');
}


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
  height: 45px;
  align-content: center;
}
.search {
  width: 90%;
  height: 25px;
  border-radius: 4px;
  border: none;
  --el-input-focus-border-color: #1fea7f;
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

/* 设置滚动条 */
.chat-list::-webkit-scrollbar {
  width: 8px;
}
.chat-list::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}
.chat-list::-webkit-scrollbar-track {
  background: transparent;
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

.chat-list .chat-item-left {
  flex: 1;
}

.chat-list .chat-item-left img {
  width: 35px;
  height: 35px;
  border-radius: 10%;
}

.chat-list .chat-item-right {
  flex: 4;
  padding: 0 0 0 8px;
}

.chat-item-right-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-item-right-message {
  color: #655f5f;
  font-size: 12px;
  margin-top: 2px;
}

.main-right {
  background: #ededed;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main-right .message-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #c5c2c2;
  height: 69px;
  user-select: none;
}
.message-header .message-header-title {
  align-content: center;
  padding-left: 15px;
  color: #434343;
}
.message-header .message-header-event {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 5px;
}
.message-header-event .img-btn {
  width: 35px;
  height: 35px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.message-header-event .img-btn:hover {
  background: rgba(195, 194, 194, 0.92);
}
.message-header-event .window-event {
  display: flex;
  flex-direction: row;
}
.message-header-event .window-event img {
  width: 12px;
  height: 12px;
}
.message-header-event .chat-event img {
  width: 20px;
  height: 20px;
}
.main-right .message-content {
  flex: 1;
  overflow-y: auto;
  margin-right: 3px;
}
/* 设置滚动条 */
.message-content::-webkit-scrollbar {
  width: 8px;
}
.message-content::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}
.message-content::-webkit-scrollbar-track {
  background: transparent;
}
.message-content .friend {
  flex-direction: row;
  justify-content: flex-start;
}
.message-content .me {
  flex-direction: row-reverse;
  justify-content: flex-start;
}
.user-message {
  display: flex;
  margin: 15px 15px;
  gap: 12px;
  user-select: none;
}
.user-message .user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 4px;
}
.user-message .message-text {
  max-width: 55%;
  word-break: break-all;
  border-radius: 4px;
  align-content: center;
  padding: 5px 10px 5px 10px;
  font-size: 14px;
  user-select: text;
}
.message-text-me {
  background: #95ec69;
  position: relative;
}
.message-text-me::after {
  content: '';
  position: absolute;
  right: -8px;
  top: 10px;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 8px solid #95ec69;
}
.message-text-friend {
  background: #f5f6f5;
  position: relative;
}
.message-text-friend::before {
  content: '';
  position: absolute;
  left: -8px;
  top: 10px;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid #f5f6f5;
}


.main-right .message-compile {
  height: 150px;
  border-top: 1px solid #c5c2c2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.message-compile .chat-menu-bar {
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.toolbar-left {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 0 5px 10px;
  flex: 2;
  gap: 5px;
}
.toolbar-right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  padding: 5px 15px 5px 0;
  gap: 5px;
}
.toolbar {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.toolbar:hover {
  border-radius: 4px;
  background: rgba(195, 194, 194, 0.92);
}
.toolbar img {
  width: 20px;
  height: 20px;
}
.message-compile .chat-input {
  flex: 1;
}
.chat-input .no-border-input {
  width: 100%;
  padding: 0 12px;
  font-size: 16px;
  border: none;
  outline: none;
  border-radius: 4px;
  box-sizing: border-box;
  resize: none;
  overflow-y: auto;
  background: #ededed;
}
/* 设置滚动条 */
.no-border-input::-webkit-scrollbar {
  width: 8px;
}
.no-border-input::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}
.no-border-input::-webkit-scrollbar-track {
  background: transparent;
}
.no-border-input:focus {
  caret-color: #07c160;
}

.message-compile .chat-send-btn {
  height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 14px;
}

</style>
