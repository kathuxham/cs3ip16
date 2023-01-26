import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
    path: "/",
    alias: "/modules",
    name: "modules",
    component: () => import("../components/ModulesList.vue")
  },
]});

export default router;