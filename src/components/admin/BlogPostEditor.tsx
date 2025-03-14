
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash, FilePlus } from 'lucide-react';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  imageUrl?: string;
};

const BlogPostEditor = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Load blog posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setBlogPosts(JSON.parse(savedPosts));
    } else {
      // Initialize with sample posts if none exist
      const samplePosts: BlogPost[] = [
        {
          id: '1',
          title: 'The Future of AI in Business',
          slug: 'future-of-ai-in-business',
          excerpt: 'Exploring how artificial intelligence is transforming business operations and decision-making.',
          content: 'Artificial intelligence is rapidly changing how businesses operate. From automated customer service to predictive analytics, AI is enabling companies to work smarter and more efficiently.\n\nIn this post, we explore the latest trends in AI for business and how you can prepare your organization for the future.',
          date: '2023-05-15',
          author: 'Alexander Oguso',
          imageUrl: 'https://images.unsplash.com/photo-1677442135968-6f8f4dd30868'
        },
        {
          id: '2',
          title: 'XR Applications in Manufacturing',
          slug: 'xr-applications-in-manufacturing',
          excerpt: 'How extended reality technologies are revolutionizing the manufacturing sector.',
          content: 'Extended Reality (XR) technologies including VR and AR are creating new possibilities for manufacturing processes. Companies are using these technologies for training, maintenance, and quality control.\n\nThis post examines real-world case studies of XR implementation in manufacturing settings.',
          date: '2023-06-22',
          author: 'Alexander Oguso',
          imageUrl: 'https://images.unsplash.com/photo-1633345472992-f2bbd6f1653f'
        }
      ];
      setBlogPosts(samplePosts);
      localStorage.setItem('blogPosts', JSON.stringify(samplePosts));
    }
  }, []);

  const handleCreateNew = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      author: 'Alexander Oguso',
      imageUrl: ''
    };
    setCurrentPost(newPost);
    setIsEditing(true);
  };

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    const updatedPosts = blogPosts.filter(post => post.id !== id);
    setBlogPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    toast({
      title: "Post deleted",
      description: "The blog post has been deleted successfully.",
    });
  };

  const handleChange = (field: keyof BlogPost, value: string) => {
    if (currentPost) {
      setCurrentPost({
        ...currentPost,
        [field]: value,
        // Auto-generate slug from title if slug is empty
        ...(field === 'title' && !currentPost.slug 
          ? { slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') } 
          : {})
      });
    }
  };

  const handleSave = () => {
    if (!currentPost?.title || !currentPost?.content) {
      toast({
        title: "Validation error",
        description: "Title and content are required fields.",
        variant: "destructive",
      });
      return;
    }

    let updatedPosts: BlogPost[];
    const existingPostIndex = blogPosts.findIndex(post => post.id === currentPost.id);
    
    if (existingPostIndex !== -1) {
      // Update existing post
      updatedPosts = [...blogPosts];
      updatedPosts[existingPostIndex] = currentPost;
    } else {
      // Add new post
      updatedPosts = [...blogPosts, currentPost];
    }
    
    setBlogPosts(updatedPosts);
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
    setCurrentPost(null);
    setIsEditing(false);
    
    toast({
      title: "Post saved",
      description: "Your blog post has been saved successfully.",
    });
  };

  const handleCancel = () => {
    setCurrentPost(null);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{currentPost?.id ? 'Edit' : 'Create'} Blog Post</h2>
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={currentPost?.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter post title"
            />
          </div>
          
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={currentPost?.slug || ''}
              onChange={(e) => handleChange('slug', e.target.value)}
              placeholder="enter-post-slug"
            />
          </div>
          
          <div>
            <Label htmlFor="date">Publication Date</Label>
            <Input
              id="date"
              type="date"
              value={currentPost?.date || ''}
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={currentPost?.author || ''}
              onChange={(e) => handleChange('author', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="imageUrl">Featured Image URL</Label>
            <Input
              id="imageUrl"
              value={currentPost?.imageUrl || ''}
              onChange={(e) => handleChange('imageUrl', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={currentPost?.excerpt || ''}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              placeholder="Brief summary of the post"
              rows={2}
            />
          </div>
          
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={currentPost?.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Write your blog post content here..."
              rows={12}
            />
          </div>
          
          <Button onClick={handleSave}>Save Post</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Blog Post Management</h2>
        <Button onClick={handleCreateNew}>
          <FilePlus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>
      
      {blogPosts.length === 0 ? (
        <p className="text-muted-foreground">No blog posts found. Create your first post!</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(post.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default BlogPostEditor;
