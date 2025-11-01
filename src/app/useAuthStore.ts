import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  const isLoading = ref(false);
  const user = ref<{ name: string; email: string } | null>(null);

  const isAuthenticated = computed(() => !!user.value);

  console.log(isAuthenticated.value);

  async function login(email: string, password: string) {
    try {
      isLoading.value = true;
      console.log(email, password);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      user.value = {
        email: "dev@gmail.com",
        name: "dev",
      };
    } finally {
      isLoading.value = false;
    }
  }

  return { isAuthenticated, login, isLoading };
});
