
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI in Business Transformation',
    excerpt: 'Exploring how artificial intelligence is revolutionizing business operations and decision-making processes across industries.',
    date: 'June 15, 2023',
    author: 'Alexander Oguso',
    readTime: '5 min read',
    slug: 'future-ai-business-transformation'
  },
  {
    id: '2',
    title: 'Extended Reality: Beyond the Hype',
    excerpt: 'A deep dive into practical applications of XR technologies that are creating real business value today.',
    date: 'July 22, 2023',
    author: 'Alexander Oguso',
    readTime: '7 min read',
    slug: 'extended-reality-beyond-hype'
  },
  {
    id: '3',
    title: 'Digital Transformation Success Stories',
    excerpt: 'Case studies of organizations that have successfully navigated their digital transformation journeys.',
    date: 'August 10, 2023',
    author: 'Alexander Oguso',
    readTime: '8 min read',
    slug: 'digital-transformation-success-stories'
  },
  {
    id: '4',
    title: 'Emerging Tech Trends for 2024',
    excerpt: 'A forward-looking analysis of the technologies that will shape business innovation in the coming year.',
    date: 'September 5, 2023',
    author: 'Alexander Oguso',
    readTime: '6 min read',
    slug: 'emerging-tech-trends-2024'
  }
];

const Blog = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background noise-bg">
        <div className="flex h-screen overflow-hidden">
          <AppSidebar />
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-2">Blog</h1>
              <p className="text-muted-foreground mb-8">
                Insights and thoughts on digital transformation, emerging technologies, and business innovation.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="border border-border bg-card/50 hover:bg-card/80 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle>
                        <Link to={`/blog/${post.slug}`} className="hover:text-primary">
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription>{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2 text-sm text-muted-foreground flex flex-wrap gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Blog;
