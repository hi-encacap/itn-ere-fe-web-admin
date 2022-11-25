const setDocumentTitle = (title: string) => {
  window.document.title = `${title} - ${process.env.REACT_APP_FRONTEND_WEBSITE_NAME ?? 'Encacap'}`;
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export { setDocumentTitle };
