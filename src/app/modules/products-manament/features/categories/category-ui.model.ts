import type { CamelCase } from "@/app/shared/utils/type-utils";
import type { CategoryAPIModel } from "./api/category-api-model";

export type CategoryUIModel = CamelCase<CategoryAPIModel>;

export function convertToApiModel<T>(props: Partial<CategoryUIModel>) {
  return {
    ...(props.id && { id: props.id }),
    ...(props.name && { name: props.name }),
    ...(props.deletedAt && { deleted_at: props.deletedAt }),
    ...(props.isActive && { is_active: props.isActive }),
    ...(props.createdAt && { created_at: props.createdAt }),
    ...(props.updatedAt && { updated_at: props.updatedAt }),
    ...(props.description !== undefined && { description: props.description }),
  } as T;
}
