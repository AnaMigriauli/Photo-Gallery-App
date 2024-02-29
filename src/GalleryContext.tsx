import { useState, createContext, useContext, ReactNode, FC } from "react";
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";

interface Photo {
  id: string;
  urls: { small: string };
  alt_descrition: string;
}

interface GalleryContextType {
  data: Photo[] | null;
  isLoading: boolean;
  error: Error | null;
  searchHistory: string[];
  executeSearch: (query: string) => void;
}

const GalleryContext = createContext<GalleryContextType>({
  data: null,
  isLoading: false,
  error: null,
  searchHistory: [],
  executeSearch: () => {},
});

interface GalleryProviderProps {
  children: ReactNode;
}

const accessKey = "L2sqDC0mPRAmNahheL0QLjwgIqNLwj8b59SXSG7UncQ";

export const GalleryProvider: FC<GalleryProviderProps> = ({ children }) => {
  const [searchHistory, setSearchHistory] = useState([]);

  const fetchGallery = async ({
    queryKey,
  }: QueryFunctionContext<[string, string]>) => {
    const [, query] = queryKey;
    const response = await fetch(
      `https://api.unsplash.com/photos?order_by=popular&per_page=20${
        query ? `&query=${query}` : ""
      }`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error fetching from Unsplash API");
    }

    return response.json();
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["photos", ""],
    queryFn: fetchGallery,
    enabled: true,
  });
  const executeSearch = (query: string) => {
    if (query !== searchHistory[searchHistory.length - 1]) {
      refetch({ queryKey: ["photos", query] });
      setSearchHistory((prevHistory) => [...prevHistory, query]);
    }
  };

  return (
    <GalleryContext.Provider
      value={{ data, isLoading, error, searchHistory, executeSearch }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = (): GalleryContextType => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
};
