import { createContext, useContext, useState, ReactNode } from "react";
import { mockGalleryImages, MockGalleryImage } from "@/data/mockData";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
  uploadDate: string;
  isActive: boolean;
}

interface GalleryContextType {
  images: GalleryImage[];
  activeImages: GalleryImage[];
  addImage: (image: Omit<GalleryImage, "id" | "uploadDate">) => void;
  editImage: (id: string, updates: Partial<GalleryImage>) => void;
  deleteImage: (id: string) => void;
  toggleImageActive: (id: string) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<GalleryImage[]>(mockGalleryImages);

  const activeImages = images.filter(img => img.isActive);

  const addImage = (image: Omit<GalleryImage, "id" | "uploadDate">) => {
    const newImage: GalleryImage = {
      ...image,
      id: Date.now().toString(),
      uploadDate: new Date().toISOString(),
    };
    setImages(prev => [...prev, newImage]);
  };

  const editImage = (id: string, updates: Partial<GalleryImage>) => {
    setImages(prev => 
      prev.map(img => img.id === id ? { ...img, ...updates } : img)
    );
  };

  const deleteImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const toggleImageActive = (id: string) => {
    setImages(prev => 
      prev.map(img => img.id === id ? { ...img, isActive: !img.isActive } : img)
    );
  };

  return (
    <GalleryContext.Provider value={{
      images,
      activeImages,
      addImage,
      editImage,
      deleteImage,
      toggleImageActive,
    }}>
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
}