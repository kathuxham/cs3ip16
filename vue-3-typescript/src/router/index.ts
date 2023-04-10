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
      component: () => import("../components/EntityLists/AssessmentsList.vue"),
    },
    {
      path: "/assessments/:id",
      name: "assessments-details",
      component: () => import("../components/EntityRecords/AssessmentRecord.vue"),
    },
    {
      path: "/modules",
      name: "modules",
      component: () => import("../components/EntityLists/ModulesList.vue")
    },
    {
      path: "/modules/:id",
      name: "module-details",
      component: () => import("../components/EntityRecords/ModuleRecord.vue")
    },
    {
      path: "/students",
      name: "students",
      component: () => import("../components/EntityLists/StudentsList.vue"),
    },
    {
      path: "/students/:id",
      name: "students-details",
      component: () => import("../components/EntityRecords/StudentRecord.vue"),
    },
    {
      path: "/staffMembers",
      name: "staff",
      component: () => import("../components/EntityLists/StaffMembersList.vue"),
    },
    {
      path: "/staffMembers/:id",
      name: "staff-details",
      component: () => import("../components/EntityRecords/StaffMemberRecord.vue")
    },
]});

export default router;