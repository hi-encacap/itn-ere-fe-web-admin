import { ReactNode } from "react";

interface TableContentBodyColumnContentProps {
  content: ReactNode;
}

const TableContentBodyColumnContent = ({ content }: TableContentBodyColumnContentProps) => {
  return <div>{content}</div>;
};

export default TableContentBodyColumnContent;
