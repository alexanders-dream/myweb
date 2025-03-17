
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ContentEditor from '@/components/admin/ContentEditor';
import ServicesEditor from '@/components/admin/ServicesEditor';
import BlogPostEditor from '@/components/admin/BlogPostEditor';
import PortfolioEditor from '@/components/admin/PortfolioEditor';
import DocumentUploader from '@/components/admin/DocumentUploader';
import AiSettings from '@/components/admin/AiSettings';

const Admin = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  
  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <div className="flex items-center gap-4">
              <p className="text-muted-foreground">
                Signed in as: {user.email}
              </p>
              <Button
                onClick={handleLogout}
                variant="destructive"
              >
                Logout
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="content">Website Content</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="blog">Blog Posts</TabsTrigger>
              <TabsTrigger value="documents">Knowledge Base</TabsTrigger>
              <TabsTrigger value="ai">AI Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4">
              <ContentEditor />
            </TabsContent>
            
            <TabsContent value="services" className="space-y-4">
              <ServicesEditor />
            </TabsContent>
            
            <TabsContent value="portfolio" className="space-y-4">
              <PortfolioEditor />
            </TabsContent>
            
            <TabsContent value="blog" className="space-y-4">
              <BlogPostEditor />
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-4">
              <DocumentUploader />
            </TabsContent>
            
            <TabsContent value="ai" className="space-y-4">
              <AiSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
