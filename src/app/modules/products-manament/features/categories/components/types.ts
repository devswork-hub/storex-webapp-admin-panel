import type { CategoryUIModel } from "../category-ui.model";

export type CategoryFormFields = Omit<
  CategoryUIModel,
  "id" | "deletedAt" | "createdAt" | "updatedAt"
>;
