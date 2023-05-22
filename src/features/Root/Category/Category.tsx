import { Category } from "@containers/Category";

import { rootCategoryService } from "@services/index";

const RootCategory = () => {
  return (
    <Category
      onGetMany={rootCategoryService.getCategories}
      onCreate={rootCategoryService.createCategory}
      onUpdate={rootCategoryService.updateCategoryByCode}
      onDelete={rootCategoryService.deleteCategoryByCode}
      onGetAll={rootCategoryService.getAllCategories}
    />
  );
};

export default RootCategory;
