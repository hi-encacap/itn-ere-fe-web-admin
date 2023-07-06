import { ICategory } from "@encacap-group/common/dist/re";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useController } from "react-hook-form";

import { Select } from "@components/Form";
import { SelectProps } from "@components/Form/Select/Select";
import { ServiceGetAllFunctionType } from "@interfaces/Common/commonTypes";

import CategorySelectorName from "./CategorySelectorName";

interface CategorySelectorProps extends Omit<SelectProps, "options" | "label" | "onChange" | "onSelect"> {
  label: string;
  onGet: ServiceGetAllFunctionType<ICategory>;
  onSelect?: (value: ICategory) => void;
}

const CategorySelector = ({ control, name, onGet, onSelect, ...props }: CategorySelectorProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const {
    field: { value },
  } = useController({
    name,
    control,
  });

  const selectedCategory = useMemo(() => categories.find((item) => item.id === value), [categories, value]);

  const categoryOptions = useMemo(
    () =>
      categories.map((item) => ({
        value: item.id,
        label: <CategorySelectorName data={item} />,
      })),
    [categories],
  );

  const getOptions = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await onGet({
        expand: "parent",
      });
      setCategories(response);
    } catch (error) {
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }, [onGet]);

  useEffect(() => {
    getOptions();
  }, [getOptions]);

  useEffect(() => {
    if (!selectedCategory) {
      return;
    }

    onSelect?.(selectedCategory);
  }, [selectedCategory, onSelect]);

  return (
    <Select
      className="block"
      control={control}
      disabled={isLoading}
      name={name}
      options={categoryOptions}
      {...props}
    />
  );
};

export default memo(CategorySelector);
