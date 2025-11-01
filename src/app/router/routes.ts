import type { RouteRecordRaw } from "vue-router";
import AppLayout from "../shared/layouts/AppLayout.vue";

export const ROUTES: RouteRecordRaw[] = [
  {
    path: "/",
    component: AppLayout,
  },
];
