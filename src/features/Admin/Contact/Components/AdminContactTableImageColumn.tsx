interface AdminContactTableImageColumnProps {
  src: string;
  alt?: string;
}

const AdminContactTableImageColumn = ({ src, alt }: AdminContactTableImageColumnProps) => {
  return (
    <div className="mx-auto h-12 w-12 overflow-hidden rounded-full bg-gray-100">
      <img src={src} alt={alt ?? src} className="h-full w-full rounded-full object-cover object-center" />
    </div>
  );
};

export default AdminContactTableImageColumn;
