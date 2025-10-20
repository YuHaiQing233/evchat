<template>
  <component :is="currentComponent" v-bind="currentProps" />
</template>


<script setup lang="ts">
import { watch, computed } from "vue";
import ChatList from "./ChatList.vue";
import ContactsList from "./ContactsList.vue";
import FavoritesList from "./FavoritesList.vue";
import MiniProgramList from "./MiniProgramList.vue";
import MomentsList from "./MomentsList.vue";


/* 定义子组件接受父组件传参的对象 */
const props = defineProps({
  chatList: { type: Array, default: () => [] },
  activeModuleId: { type: Number, default: 2 },
})

/* 动态组件 */

// 定义全部组件
const componentMap = { 2: ChatList, 3: ContactsList, 4: FavoritesList, 5: MiniProgramList, 6: MomentsList }
// 当前选中组件
const currentComponent = computed(() => {
  return componentMap[props.activeModuleId] || null
})
// 当前选择组件入参
const currentProps = computed(() => {
  switch (props.activeModuleId) {
    case 2:
      return { chatList: props.chatList, activeModuleId: props.activeModuleId }
    case 3:
      return { activeModuleId: props.activeModuleId }
    default:
      return {}
  }
})

</script>

<style scoped>
</style>
