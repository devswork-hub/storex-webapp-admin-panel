import { createRouter, createWebHistory } from "vue-router";
import { featuresRoutes } from "../modules/products-manament/features/routes";
import AppLayout from "../shared/layouts/AppLayout.vue";
import DashboardPage from "../modules/admin/dashboard/pages/dashboard.page.vue";
import { useAuthStore } from "../useAuthStore";
import LoginPage from "../modules/auth/features/login/pages/login-page.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { name: "Auth", path: "/auth", component: LoginPage },
    {
      path: "/",
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        {
          name: "Home",
          path: "",
          component: DashboardPage,
        },
        ...featuresRoutes,
      ],
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (
    to.name !== "Auth" &&
    to.meta.requiresAuth &&
    !authStore.isAuthenticated
  ) {
    console.log("ok");
    return { name: "Auth", query: { redirect: to.fullPath } };
  }

  if (authStore.isAuthenticated && to.name === "Auth") {
    const redirect = (to.query.redirect as string) ?? {
      name: "Home",
    };
    return redirect;
  }
});

export default router;
