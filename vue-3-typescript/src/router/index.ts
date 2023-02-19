import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
    path: "/",
    alias: "/home",
    name: "home",
    component: () => import("../components/HomeWindow/HomeWindow.vue")
    },
    {
      path: "/assessments",
      name: "assessments",
      component: () => import("../components/EntityWindows/AssessmentsList.vue"),
    },
    {
      path: "/assessments/:id",
      name: "assessments-details",
      component: () => import("../components/EntityRecords/AssessmentRecord.vue"),
    },
    {
      path: "/modules",
      name: "modules",
      component: () => import("../components/EntityWindows/ModulesList.vue")
    },
    {
      path: "/modules/:id",
      name: "module-details",
      component: () => import("../components/EntityRecords/ModuleRecord.vue")
    },
    {
      path: "/individuals",
      name: "individuals",
      component: () => import("../components/EntityWindows/IndividualsList.vue"),
    },
    {
      path: "/students",
      name: "students",
      component: () => import("../components/EntityWindows/StudentsList.vue"),
    },
    {
      path: "/students/:id",
      name: "students-details",
      component: () => import("../components/EntityRecords/StudentRecord.vue"),
    },
    {
      path: "/staffMembers",
      name: "staff",
      component: () => import("../components/EntityWindows/StaffMembersList.vue"),
    },
    {
      path: "/staffMembers/:id",
      name: "staff-details",
      component: () => import("../components/EntityRecords/StaffMemberRecord.vue")
    },
]});

export default router;