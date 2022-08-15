import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import AppLayoutVue from "../components/AppLayout.vue";
import Login from "../page/login/index.vue"
import User from "../page/user/index.vue"
import Home from "../page/home/index.vue"

const routes: RouteRecordRaw[] = [
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/",
        component: AppLayoutVue,
        children: [
            {
                path: "/home",
                component: Home,
            },
            {
                path: "/user",
                component: User,
            },
        ]
    }
];
const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

export default router