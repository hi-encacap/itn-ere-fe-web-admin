import { Category } from "@containers/Category";

import { adminCategoryService } from "@services/index";

const AdminCategory = () => {
  return (
    <Category
      onGetMany={adminCategoryService.getCategories}
      onGetAll={adminCategoryService.getAllCategories}
      onCreate={adminCategoryService.createCategory}
      onUpdate={adminCategoryService.updateCategoryByCode}
      onDelete={adminCategoryService.deleteCategoryByCode}
    />
  );
};

export default AdminCategory;
