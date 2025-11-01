import type { RouteRecordRaw } from "vue-router";
import CreateCategoryPage from "./pages/create-category.page.vue";

export const CATEGORIES_ROUTES: RouteRecordRaw[] = [
  {
    name: "Categories",
    path: "/categories",
    meta: { requiresAuth: true },
    component: CreateCategoryPage,
  },
];
