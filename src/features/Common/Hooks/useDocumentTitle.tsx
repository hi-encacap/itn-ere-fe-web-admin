import { ReactNode, useEffect, useMemo } from "react";

const useDocumentTitle = (title: ReactNode) => {
  const formattedTitle = useMemo(() => {
    if (typeof title !== "string") {
      return "";
    }

    const appName = process.env.REACT_APP_RE_DASH_APP_NAME;

    if (!appName) {
      return title;
    }

    return `${title} - ${appName}`;
  }, [title]);

  useEffect(() => {
    if (typeof title !== "string") {
      return;
    }

    window.document.title = formattedTitle;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [formattedTitle]);
};

export default useDocumentTitle;
