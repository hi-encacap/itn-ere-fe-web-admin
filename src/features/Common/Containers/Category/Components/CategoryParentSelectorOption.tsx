import { ICategory } from "@encacap-group/common/dist/re";
import { BiChevronRight } from "react-icons/bi";

interface CategoryParentSelectorOptionProps {
  data: ICategory;
}

const CategoryParentSelectorOption = ({ data }: CategoryParentSelectorOptionProps) => {
  return (
    <div className="flex items-center justify-start">
      {Boolean(data.parent) && (
        <div className="mr-1 flex items-center space-x-1">
          <CategoryParentSelectorOption data={data.parent as ICategory} />
          <BiChevronRight size={18} />
        </div>
      )}
      {data.name}
    </div>
  );
};

export default CategoryParentSelectorOption;
