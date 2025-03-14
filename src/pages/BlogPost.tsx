
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

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

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load blog post from localStorage
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      const posts: BlogPost[] = JSON.parse(savedPosts);
      const foundPost = posts.find(p => p.slug === slug);
      
      if (foundPost) {
        setPost(foundPost);
      }
    }
    setIsLoading(false);
  }, [slug]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format content with paragraph breaks
  const formattedContent = post?.content.split('\n').map((paragraph, index) => (
    <p key={index} className="mb-4">{paragraph}</p>
  ));

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <div className="flex-1 p-6 flex items-center justify-center">
            <p>Loading post...</p>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  if (!post) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <div className="flex-1 p-6">
            <div className="max-w-3xl mx-auto text-center py-12">
              <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The blog post you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate('/blog')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </div>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all posts
            </Link>
            
            <article>
              <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="text-muted-foreground">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </div>
              </header>
              
              {post.imageUrl && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-auto object-cover max-h-[500px]"
                  />
                </div>
              )}
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {formattedContent}
              </div>
            </article>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default BlogPost;
