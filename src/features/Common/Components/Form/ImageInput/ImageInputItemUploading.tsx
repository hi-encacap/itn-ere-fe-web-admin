import LoadingSpinner from "@components/Loading/LoadingSpinner";

const ImageInputItemUploading = () => {
  return (
    <div className="absolute inset-3 flex items-center justify-center rounded-lg">
      <LoadingSpinner className="h-5 w-5 border-teal-500" />
    </div>
  );
};

export default ImageInputItemUploading;
