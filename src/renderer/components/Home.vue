<template>

  <div class="wechat-main" >
    <!-- 第一列：侧边栏 -->
    <Sidebar
        :modules="modules"
        :activeModuleId="activeModuleId.value"
        @update:activeModuleId="activeModuleIdChange"
    />

    <!-- 第二列：功能区 -->
    <MainPanel
        :chatList="chatList"
        :activeModuleId="activeModuleId"
    />

  </div>

</template>

<script setup>

// 1.定义第一列中的模块列表
import {ref, watch} from "vue";
import Sidebar from "../components/Sidebar.vue";
import MainPanel from "../components/MainPanel.vue";

const modules = [
  { id: 1, type: 'avatar' ,title: '', imgUrl: './assets/user/avatar.jpg', class: 'sidebar-header' },
  { id: 2, type: 'module' ,title: '聊天', imgUrl: './assets/message.png', class: 'img-btn' },
  { id: 3, type: 'module' ,title: '联系人', imgUrl: './assets/contacts.png', class: 'img-btn' },
  { id: 4, type: 'module' ,title: '收藏', imgUrl: './assets/favorites.png', class: 'img-btn' },
  { id: 5, type: 'module' ,title: '朋友圈', imgUrl: './assets/moments.png', class: 'img-btn' },
  { id: 6, type: 'module' ,title: '小程序', imgUrl: './assets/mini_program_panel.png', class: 'img-btn' },
  { id: 7, type: 'module' ,title: '更多', imgUrl: './assets/more.png', class: 'img-btn sidebar-footer' }
]

// 2. 设置默认激活的模块
const activeModuleId = ref(1)
const chatList = ref(
    [
      { id: 1, avatar: './assets/user/avatar_2.jpg', name: '咖啡续命选手', lastMessage: '你桌上的咖啡杯怎么又换新了？', time: '14:13', unread: 1 },
      { id: 2, avatar: './assets/user/avatar_3.jpg', name: '甲方克星·阿伟', lastMessage: '救救孩子吧', time: '12:11', unread: 2 },
      { id: 3, avatar: './assets/user/avatar_4.png', name: '月亮邮递员_Zzz', lastMessage: '', time: '', unread: 0 },
      { id: 4, avatar: './assets/user/avatar_5.png', name: '代码修仙协会', lastMessage: '', time: '', unread: 2 },
      { id: 5, avatar: './assets/user/avatar_6.png', name: '周末躺平许可证', lastMessage: '周末别躺了！新开的剧本杀缺DM！', time: '14:30', unread: 0 },
      { id: 6, avatar: './assets/user/avatar_7.png', name: '追星少女·栗子', lastMessage: '栗子姐威武！下次团购我跟你！', time: '12:11', unread: 2 },
      { id: 7, avatar: './assets/user/avatar_8.png', name: '暴躁健身教练老王', lastMessage: '', time: '', unread: 1 }
    ]
)

// 选中模块变更
function activeModuleIdChange(selectId) {
  activeModuleId.value = Number(selectId)
}

</script>

<style scoped>

.wechat-main{
  width: 100vw;
  height: 100vh;
  display: flex;
}

</style>
