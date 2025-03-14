
import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  results: {
    metric: string;
    value: string;
  }[];
}

const portfolioSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  category: z.string().min(2, { message: "Category is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  image: z.string().url({ message: "Valid image URL is required" }),
  metric1: z.string().min(1, { message: "Metric is required" }),
  value1: z.string().min(1, { message: "Value is required" }),
  metric2: z.string().min(1, { message: "Metric is required" }),
  value2: z.string().min(1, { message: "Value is required" }),
  metric3: z.string().min(1, { message: "Metric is required" }),
  value3: z.string().min(1, { message: "Value is required" }),
});

type PortfolioFormValues = z.infer<typeof portfolioSchema>;

const PortfolioEditor = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const { toast } = useToast();

  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      title: '',
      category: '',
      description: '',
      image: '',
      metric1: '',
      value1: '',
      metric2: '',
      value2: '',
      metric3: '',
      value3: '',
    }
  });
  
  useEffect(() => {
    const items = localStorage.getItem('portfolioItems');
    if (items) {
      setPortfolioItems(JSON.parse(items));
    }
  }, []);

  const handleAddNew = () => {
    setEditingItem(null);
    form.reset({
      title: '',
      category: '',
      description: '',
      image: '',
      metric1: 'Completion Time',
      value1: '-30%',
      metric2: 'User Satisfaction',
      value2: '+45%',
      metric3: 'Cost Savings',
      value3: '+20%',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    form.reset({
      id: item.id,
      title: item.title,
      category: item.category,
      description: item.description,
      image: item.image,
      metric1: item.results[0]?.metric || '',
      value1: item.results[0]?.value || '',
      metric2: item.results[1]?.metric || '',
      value2: item.results[1]?.value || '',
      metric3: item.results[2]?.metric || '',
      value3: item.results[2]?.value || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
      const newItems = portfolioItems.filter(item => item.id !== id);
      setPortfolioItems(newItems);
      localStorage.setItem('portfolioItems', JSON.stringify(newItems));
      toast({
        title: "Portfolio item deleted",
        description: "The portfolio item has been successfully deleted.",
      });
    }
  };

  const onSubmit: SubmitHandler<PortfolioFormValues> = (data) => {
    const newItem: PortfolioItem = {
      id: data.id || Date.now().toString(),
      title: data.title,
      category: data.category,
      description: data.description,
      image: data.image,
      results: [
        { metric: data.metric1, value: data.value1 },
        { metric: data.metric2, value: data.value2 },
        { metric: data.metric3, value: data.value3 },
      ]
    };

    let updatedItems: PortfolioItem[];
    
    if (editingItem) {
      // Update existing item
      updatedItems = portfolioItems.map(item => 
        item.id === newItem.id ? newItem : item
      );
      toast({
        title: "Portfolio item updated",
        description: "The portfolio item has been successfully updated.",
      });
    } else {
      // Add new item
      updatedItems = [...portfolioItems, newItem];
      toast({
        title: "Portfolio item added",
        description: "New portfolio item has been successfully added.",
      });
    }
    
    setPortfolioItems(updatedItems);
    localStorage.setItem('portfolioItems', JSON.stringify(updatedItems));
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Portfolio</h2>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New Project
        </Button>
      </div>
      
      {portfolioItems.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolioItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="max-w-md truncate">{item.description}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center p-8 border rounded-lg">
          <p className="text-muted-foreground mb-4">No portfolio items found</p>
          <Button onClick={handleAddNew}>Add Your First Project</Button>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <input type="hidden" {...form.register("id")} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input 
                  id="title" 
                  {...form.register("title")} 
                  placeholder="AI Customer Service Solution"
                />
                {form.formState.errors.title && (
                  <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input 
                  id="category" 
                  {...form.register("category")} 
                  placeholder="Artificial Intelligence"
                />
                {form.formState.errors.category && (
                  <p className="text-sm text-destructive">{form.formState.errors.category.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                {...form.register("description")} 
                placeholder="Describe the project, challenges, and solutions..."
                rows={4}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input 
                id="image" 
                {...form.register("image")} 
                placeholder="https://example.com/image.jpg"
              />
              {form.formState.errors.image && (
                <p className="text-sm text-destructive">{form.formState.errors.image.message}</p>
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Project Results</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="metric1">Metric 1</Label>
                  <Input 
                    id="metric1" 
                    {...form.register("metric1")} 
                    placeholder="Conversion Rate"
                  />
                  {form.formState.errors.metric1 && (
                    <p className="text-sm text-destructive">{form.formState.errors.metric1.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="value1">Value 1</Label>
                  <Input 
                    id="value1" 
                    {...form.register("value1")} 
                    placeholder="+28%"
                  />
                  {form.formState.errors.value1 && (
                    <p className="text-sm text-destructive">{form.formState.errors.value1.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="metric2">Metric 2</Label>
                  <Input 
                    id="metric2" 
                    {...form.register("metric2")} 
                    placeholder="Avg. Order Value"
                  />
                  {form.formState.errors.metric2 && (
                    <p className="text-sm text-destructive">{form.formState.errors.metric2.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="value2">Value 2</Label>
                  <Input 
                    id="value2" 
                    {...form.register("value2")} 
                    placeholder="+35%"
                  />
                  {form.formState.errors.value2 && (
                    <p className="text-sm text-destructive">{form.formState.errors.value2.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="metric3">Metric 3</Label>
                  <Input 
                    id="metric3" 
                    {...form.register("metric3")} 
                    placeholder="Customer Retention"
                  />
                  {form.formState.errors.metric3 && (
                    <p className="text-sm text-destructive">{form.formState.errors.metric3.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="value3">Value 3</Label>
                  <Input 
                    id="value3" 
                    {...form.register("value3")} 
                    placeholder="+40%"
                  />
                  {form.formState.errors.value3 && (
                    <p className="text-sm text-destructive">{form.formState.errors.value3.message}</p>
                  )}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingItem ? 'Update Project' : 'Add Project'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioEditor;
