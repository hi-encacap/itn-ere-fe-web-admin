import { IEstate, IPost } from "@encacap-group/common/dist/re";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "@components/Loading/LoadingSpinner";
import { CustomTableBodyProps } from "@components/Table/Table";
import TableContentBodyEmptyContent from "@components/Table/TableContentBody/TableContentBodyEmptyContent";
import { ADMIN_PATH } from "@constants/urls";
import { EstateDraftDataType } from "@interfaces/Admin/estateTypes";
import { PostDraftDataType } from "@interfaces/Admin/postTypes";

import PostTableBodyItem from "./TableBodyItem";
import PostTableBodyLoading from "./TableBodyLoading";

const PostTableBody = ({
  data,
  isLoading,
  ...props
}: CustomTableBodyProps<IEstate | EstateDraftDataType>) => {
  const navigate = useNavigate();

  const handleClickEdit = useCallback(
    (data: IPost | PostDraftDataType) => {
      navigate(ADMIN_PATH.POST_EDIT_PATH(data.id, data.status));
    },
    [navigate],
  );

  if (isLoading && !data.length) return <PostTableBodyLoading />;

  if (!data.length) return <TableContentBodyEmptyContent />;

  return (
    <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-70">
          <LoadingSpinner className="h-8 w-8 border-teal-500" />
        </div>
      )}
      {data.map((item) => (
        <PostTableBodyItem key={item.id} data={item} onClickEdit={handleClickEdit} {...props} />
      ))}
    </div>
  );
};

export default PostTableBody;
