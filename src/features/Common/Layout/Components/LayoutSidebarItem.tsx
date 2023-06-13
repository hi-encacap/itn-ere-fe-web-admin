import { MouseEventHandler, ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { Link, matchRoutes, useLocation } from "react-router-dom";

import { SidebarItemType } from "@interfaces/Common/commonTypes";

import LayoutSidebarItemChildren from "./LayoutSidebarItemChildren";
import LayoutSidebarItemContent from "./LayoutSidebarItemContent";

interface LayoutSidebarItemProps {
  icon: ReactElement;
  isLoading?: boolean;
  label: string;
  to: string;
  childrenItems?: SidebarItemType[];
}

const LayoutSidebarItem = ({ icon, isLoading, label, to, childrenItems }: LayoutSidebarItemProps) => {
  const { pathname } = useLocation();

  const [isShowChildren, setIsShowChildren] = useState(false);

  const childPaths = useMemo(() => childrenItems?.map((item) => item.to) ?? [], [childrenItems]);
  const childActivePath = useMemo(() => {
    const matchedRoutes = matchRoutes(
      childPaths.map((item) => ({
        path: `${item}/*`,
      })),
      pathname,
    );

    if (!matchedRoutes) {
      return "";
    }

    return matchedRoutes[0].pathnameBase;
  }, [childPaths, pathname]);
  const isActive = useMemo(
    () => pathname === to || Boolean(childActivePath),
    [pathname, to, childActivePath],
  );

  const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      e.preventDefault();
      setIsShowChildren((prevState) => {
        if (isActive) {
          return true;
        }

        return !prevState;
      });
    },
    [isActive],
  );

  useEffect(() => {
    setIsShowChildren(isActive);
  }, [isActive]);

  if (!childrenItems?.length) {
    return (
      <Link to={to}>
        <LayoutSidebarItemContent
          icon={icon}
          label={label}
          hasChildren={Boolean(childrenItems?.length)}
          isActive={isActive}
          isLoading={isLoading}
          isShowChildren={isShowChildren}
        />
      </Link>
    );
  }

  return (
    <div role="button" tabIndex={0} aria-hidden="true" onClick={handleClick}>
      <LayoutSidebarItemContent
        icon={icon}
        label={label}
        hasChildren={Boolean(childrenItems?.length)}
        isActive={isActive}
        isLoading={isLoading}
        isShowChildren={isShowChildren}
      />
      {Boolean(childrenItems?.length) && (
        <LayoutSidebarItemChildren
          items={childrenItems}
          isShow={isShowChildren}
          activePath={childActivePath}
        />
      )}
    </div>
  );
};

export default LayoutSidebarItem;
