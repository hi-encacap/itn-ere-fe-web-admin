import { IEstate } from "@encacap-group/common/dist/re";

import { EstateDraftDataType } from "@interfaces/Admin/estateTypes";

import { CustomTableBodyProps } from "@components/Table/Table";
import TableContentBodyEmptyContent from "@components/Table/TableContentBody/TableContentBodyEmptyContent";

import PostTableBodyItem from "./TableBodyItem";
import PostTableBodyLoading from "./TableBodyLoading";

const PostTableBody = ({
  data,
  isLoading,
  ...props
}: CustomTableBodyProps<IEstate | EstateDraftDataType>) => {
  if (isLoading && !data.length) return <PostTableBodyLoading />;

  if (!data.length) return <TableContentBodyEmptyContent />;

  return (
    <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {isLoading && <div className="absolute inset-0 bg-white bg-opacity-50" />}
      {data.map((item) => (
        <PostTableBodyItem key={item.id} data={item} {...props} />
      ))}
    </div>
  );
};

export default PostTableBody;
