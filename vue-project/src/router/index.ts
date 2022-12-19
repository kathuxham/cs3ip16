import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/individuals",
      name: "individuals",
      component: () => import("../views/RecordView.vue"),
    },
    {
      path: "/staff",
      name: "staff",
      component: () => import("../views/RecordView.vue"),
    },
    {
      path: "/students",
      name: "students",
      component: () => import("../views/ReportView.vue"),
    },
    {
      path: "/courses",
      name: "courses",
      component: () => import("../views/RecordView.vue"),
    },
    {
      path: "/schools",
      name: "schools",
      component: () => import("../views/RecordView.vue"),
    },
    {
      path: "/degrees",
      name: "degrees",
      component: () => import("../views/RecordView.vue"),
    },
    {
      path: "/modules",
      name: "modules",
      component: () => import("../views/RecordView.vue"),
    },
  ],
});

export default router;
