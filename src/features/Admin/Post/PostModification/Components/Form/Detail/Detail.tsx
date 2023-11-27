import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Editor from "@components/Form/Editor/Editor";
import FormGroupTitle from "@components/Form/GroupTitle";
import ImageInput from "@components/Form/ImageInput/ImageInput";
import { PostFormDataType } from "@interfaces/Admin/postTypes";

const AdminPostModificationFormDetail = () => {
  const { t } = useTranslation();

  const { control, watch } = useFormContext<PostFormDataType>();

  // @ts-ignore Due to react-hook-form type issues.
  const title = watch("title");

  return (
    <div>
      <FormGroupTitle title={t("detailInfo")} />
      <div className="mt-5 grid gap-y-6 pt-0.5">
        <ImageInput
          className="md:grid-cols-5 xl:grid-cols-7"
          control={control}
          isRequired
          label={t("avatar")}
          name="avatar"
        />
        <ImageInput
          control={control}
          itemContainerClassName="md:grid-cols-5 xl:grid-cols-7"
          isMultiple
          isRequired
          label={t("image")}
          name="images"
        />
        <Editor label={t("content")} control={control} name="content" isRequired fullScreenTitle={title} />
      </div>
    </div>
  );
};

export default AdminPostModificationFormDetail;
