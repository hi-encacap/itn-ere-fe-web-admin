import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { SidebarItemType } from "@interfaces/Common/commonTypes";

import LayoutSidebarItemChildrenItem from "./LayoutSidebarItemChildrenItem";

interface LayoutSidebarItemChildrenProps {
  items: SidebarItemType[];
  isShow: boolean;
}

const LayoutSidebarItemChildren = ({ items, isShow = false }: LayoutSidebarItemChildrenProps) => {
  return (
    <motion.div
      animate={isShow ? "show" : "hide"}
      initial={{ height: 0 }}
      variants={{
        show: {
          height: "auto",
          overflow: "hidden",
        },
        hide: {
          height: 0,
          overflow: "hidden",
        },
      }}
      transition={{
        duration: 0.1,
      }}
      className={twMerge(isShow && "mt-1")}
    >
      {items.map((item) => (
        <LayoutSidebarItemChildrenItem key={item.key} item={item} />
      ))}
    </motion.div>
  );
};

export default LayoutSidebarItemChildren;
