import type { RouteRecordRaw } from "vue-router";
import CreateCategoryPage from "./pages/create-category.page.vue";
import ListCategoriesPage from "./pages/list-categories.page.vue";

const isRequired = { meta: { requiresAuth: true } };

export const CATEGORIES_ROUTES: RouteRecordRaw[] = [
  {
    name: "Categories",
    path: "/categories",
    children: [
      {
        path: "", // 👈 equivalente ao "index: true" do React Router
        name: "ListCategories",
        component: ListCategoriesPage,
        ...isRequired,
      },
      {
        path: "/create",
        name: "CreateCategory",
        component: CreateCategoryPage,
      },
    ],
  },
];
