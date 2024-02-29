import { useGallery } from "./GalleryContext";
import { useEffect } from "react";

const HomePage: React.FC = () => {
  const { data, isLoading, error, executeSearch } = useGallery();

  useEffect(() => {
    executeSearch("");
  }, [executeSearch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <div>
      <input placeholder="Search..." />
      {data && (
        <div>
          {data.map((photo) => (
            <img key={photo.id} src={photo.urls.small} alt="ana" />
          ))}
        </div>
      )}
    </div>
  );
};
export default HomePage;
