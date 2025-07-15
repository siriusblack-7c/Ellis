import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, Upload } from "lucide-react";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
  uploadDate: string;
  isActive: boolean;
}

interface GalleryTabProps {
  images: GalleryImage[];
  onAddImage: (image: Omit<GalleryImage, "id" | "uploadDate">) => void;
  onEditImage: (id: string, image: Partial<GalleryImage>) => void;
  onDeleteImage: (id: string) => void;
  onToggleActive: (id: string) => void;
}

export function GalleryTab({
  images,
  onAddImage,
  onEditImage,
  onDeleteImage,
  onToggleActive,
}: GalleryTabProps) {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [editDialog, setEditDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState({
    src: "",
    alt: "",
    caption: "",
    category: "caregiving",
    isActive: true,
  });

  const categories = ["all", "caregiving", "facilities", "activities", "staff"];

  const filteredImages = images.filter(
    (img) => selectedCategory === "all" || img.category === selectedCategory
  );

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      src: image.src,
      alt: image.alt,
      caption: image.caption,
      category: image.category,
      isActive: image.isActive,
    });
    setEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (editingImage) {
      onEditImage(editingImage.id, formData);
      toast({
        title: "Image updated",
        description: "Gallery image has been updated successfully.",
      });
    }
    setEditDialog(false);
    setEditingImage(null);
    resetForm();
  };

  const handleAdd = () => {
    if (!formData.src || !formData.alt || !formData.caption) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    onAddImage(formData);
    toast({
      title: "Image added",
      description: "New gallery image has been added successfully.",
    });
    setAddDialog(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    onDeleteImage(id);
    toast({
      title: "Image deleted",
      description: "Gallery image has been deleted successfully.",
    });
  };

  const resetForm = () => {
    setFormData({
      src: "",
      alt: "",
      caption: "",
      category: "caregiving",
      isActive: true,
    });
  };

  const mockUpload = () => {
    // Simulate file upload with random Unsplash image
    const mockImages = [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=400&fit=crop",
    ];
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    setFormData(prev => ({ ...prev, src: randomImage }));
    toast({
      title: "Image uploaded",
      description: "Mock image has been uploaded successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gallery Management</h2>
          <p className="text-muted-foreground">
            Manage your gallery images and content
          </p>
        </div>
        <Button onClick={() => setAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative aspect-video">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={image.isActive ? "default" : "secondary"}>
                    {image.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-sm font-medium line-clamp-2">
                {image.caption}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1 capitalize">
                {image.category}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(image.uploadDate).toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onToggleActive(image.id)}
              >
                <Eye className="h-3 w-3 mr-1" />
                {image.isActive ? "Hide" : "Show"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(image)}
              >
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(image.id)}
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Add Image Dialog */}
      <Dialog open={addDialog} onOpenChange={setAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-url">Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="image-url"
                  value={formData.src}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, src: e.target.value }))
                  }
                  placeholder="Enter image URL or upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={mockUpload}
                  className="shrink-0"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="alt-text">Alt Text</Label>
              <Input
                id="alt-text"
                value={formData.alt}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, alt: e.target.value }))
                }
                placeholder="Describe the image"
              />
            </div>
            <div>
              <Label htmlFor="caption">Caption</Label>
              <Textarea
                id="caption"
                value={formData.caption}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, caption: e.target.value }))
                }
                placeholder="Image caption or description"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, category: e.target.value }))
                }
                className="w-full p-2 border rounded"
              >
                <option value="caregiving">Caregiving</option>
                <option value="facilities">Facilities</option>
                <option value="activities">Activities</option>
                <option value="staff">Staff</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd}>Add Image</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Image Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-image-url">Image URL</Label>
              <Input
                id="edit-image-url"
                value={formData.src}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, src: e.target.value }))
                }
                placeholder="Enter image URL"
              />
            </div>
            <div>
              <Label htmlFor="edit-alt-text">Alt Text</Label>
              <Input
                id="edit-alt-text"
                value={formData.alt}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, alt: e.target.value }))
                }
                placeholder="Describe the image"
              />
            </div>
            <div>
              <Label htmlFor="edit-caption">Caption</Label>
              <Textarea
                id="edit-caption"
                value={formData.caption}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, caption: e.target.value }))
                }
                placeholder="Image caption or description"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="edit-category">Category</Label>
              <select
                id="edit-category"
                value={formData.category}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, category: e.target.value }))
                }
                className="w-full p-2 border rounded"
              >
                <option value="caregiving">Caregiving</option>
                <option value="facilities">Facilities</option>
                <option value="activities">Activities</option>
                <option value="staff">Staff</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}