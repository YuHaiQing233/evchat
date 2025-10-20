import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../components/Home.vue';
import MomentsList from '../components/MomentsList.vue';
import MiniProgramList from '../components/MiniProgramList.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },{
        path: '/moment',
        name: 'MomentWindow',
        component: MomentsList
    },{
        path: '/mini-program',
        name: 'MiniProgram',
        component: MiniProgramList
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;
