import { ICategory } from "@encacap-group/common/dist/re";

interface CategoryParentSelectorOptionProps {
  data: ICategory;
}

const CategoryParentSelectorOption = ({ data }: CategoryParentSelectorOptionProps) => {
  return (
    <div className="flex items-center justify-start">
      {data.name}
      {!!data.parent && <CategoryParentSelectorOption data={data.parent as ICategory} />}
    </div>
  );
};

export default CategoryParentSelectorOption;
