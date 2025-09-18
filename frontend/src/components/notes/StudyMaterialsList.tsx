import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, FileText, ExternalLink, Trash2, File } from "lucide-react";
import { StudyMaterial } from "./StudyMaterials";

interface StudyMaterialsListProps {
  materials: StudyMaterial[];
  onRemoveMaterial: (id: number) => void;
  readonly?: boolean;
}

export const StudyMaterialsList = ({ materials, onRemoveMaterial, readonly = false }: StudyMaterialsListProps) => {
  const getIcon = (type: StudyMaterial['type']) => {
    switch (type) {
      case 'link':
        return <Link className="h-4 w-4" />;
      case 'file':
        return <File className="h-4 w-4" />;
      case 'text':
        return <FileText className="h-4 w-4" />;
    }
  };

  const getBadgeVariant = (type: StudyMaterial['type']) => {
    switch (type) {
      case 'link':
        return 'default';
      case 'file':
        return 'secondary';
      case 'text':
        return 'outline';
    }
  };

  const handleLinkClick = (material: StudyMaterial) => {
    if (material.type === 'link') {
      window.open(material.content, '_blank');
    }
  };

  if (materials.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No study materials added yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {materials.map((material) => (
        <Card key={material.id} className="p-3">
          <CardContent className="p-0">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-1">
                  {getIcon(material.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">{material.title}</h4>
                    <Badge variant={getBadgeVariant(material.type)} className="text-xs">
                      {material.type}
                    </Badge>
                  </div>
                  
                  {material.description && (
                    <p className="text-xs text-muted-foreground mb-2">{material.description}</p>
                  )}
                  
                  {material.type === 'link' ? (
                    <button
                      onClick={() => handleLinkClick(material)}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 break-all"
                    >
                      {material.content}
                      <ExternalLink className="h-3 w-3 flex-shrink-0" />
                    </button>
                  ) : material.type === 'file' ? (
                    <p className="text-xs text-muted-foreground break-all">{material.content}</p>
                  ) : (
                    <p className="text-xs text-muted-foreground line-clamp-2">{material.content}</p>
                  )}
                  
                  <p className="text-xs text-muted-foreground mt-1">
                    Added {new Date(material.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              {!readonly && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveMaterial(material.id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};