import { IMAGE_VARIANT_ENUM, IPost, getImageURL } from "@encacap-group/common/dist/re";
import { useCallback, useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Avatar } from "@components/Avatar";
import { Badge } from "@components/Badge";
import { Button } from "@components/Form";
import { LoadingSkeleton } from "@components/Loading";
import useToast from "@hooks/useToast";
import { HookFormControl } from "@interfaces/Common/commonTypes";
import { adminPostService } from "@services/index";

import AdminConfigWebsitePostInputPlaceholderEmpty from "./AdminConfigWebsitePostInputPlaceholderEmpty";

interface AdminConfigWebsitePostInputPlaceholderProps {
  control: HookFormControl;
  isDisabled?: boolean;
  name: string;
  title: string;
  onClick: () => void;
}

const AdminConfigWebsitePostInputPlaceholder = ({
  control,
  isDisabled,
  name,
  title,
  onClick,
}: AdminConfigWebsitePostInputPlaceholderProps) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState<IPost | null>(null);

  const toast = useToast();

  const postId = useWatch({
    control,
    name,
  });

  const getPostData = useCallback(
    async (id: number) => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const post = await adminPostService.getPostById(id);
        setPostData(post);
      } catch (error) {
        toast.error(t("getPostError"));
      } finally {
        setIsLoading(false);
      }
    },
    [t, toast],
  );

  useEffect(() => {
    getPostData(postId);
  }, [getPostData, postId]);

  if (isLoading) {
    return <LoadingSkeleton className="h-24 w-full" />;
  }

  if ((!isLoading && !postData) || !postData) {
    return <AdminConfigWebsitePostInputPlaceholderEmpty title={title} onClick={onClick} />;
  }

  return (
    <div className="relative flex w-full items-center justify-start space-x-4 p-4">
      {isDisabled && <div className="absolute inset-0 z-10 bg-gray-100 bg-opacity-50" />}
      <Avatar
        alt={postData.title}
        className="h-16 w-16"
        src={getImageURL(postData.avatar, IMAGE_VARIANT_ENUM.THUMBNAIL)}
      />
      <div className="flex-1">
        <Badge status="success">{postData?.category.name}</Badge>
        <div className="mt-1 text-base font-semibold">{postData.title}</div>
      </div>
      <Button color="light" size="sm" onClick={onClick}>
        {t("change")}
      </Button>
    </div>
  );
};

export default AdminConfigWebsitePostInputPlaceholder;
