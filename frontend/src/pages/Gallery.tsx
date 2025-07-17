import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGallery } from "@/contexts/GalleryContext";
import { Filter } from "lucide-react";

export default function Gallery() {
  const { activeImages } = useGallery();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ["all", "caregiving", "facilities", "activities", "staff"];

  const filteredImages = activeImages.filter(
    (img) => selectedCategory === "all" || img.category === selectedCategory
  );

  const categoryCount = (category: string) => {
    if (category === "all") return activeImages.length;
    return activeImages.filter(img => img.category === category).length;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 bg-blue-50 dark:bg-blue-950/20 mt-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-4">Our Gallery</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto">
              A glimpse into the compassionate care and meaningful connections we foster every day.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Filter by Category</h3>
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize hover-scale"
                  >
                    {category}
                    <Badge variant="secondary" className="ml-2">
                      {categoryCount(category)}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg shadow-lg animate-fade-in hover-scale"
                >
                  <div className="aspect-video">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center p-4">
                      <p className="text-white text-sm font-medium mb-2">{image.caption}</p>
                      <Badge variant="secondary" className="capitalize">
                        {image.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredImages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  No images found in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
