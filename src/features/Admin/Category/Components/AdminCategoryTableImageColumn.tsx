interface AdminCategoryTableImageColumnProps {
  src: string;
  alt: string;
}

const AdminCategoryTableImageColumn = ({ src, alt }: AdminCategoryTableImageColumnProps) => {
  console.log(src);

  return (
    <div className="mx-auto h-12 w-12 overflow-hidden rounded-full bg-gray-100">
      <img
        src={src}
        alt={alt}
        className="h-full w-full rounded-full border-2 border-gray-100 object-cover object-center"
      />
    </div>
  );
};

export default AdminCategoryTableImageColumn;
