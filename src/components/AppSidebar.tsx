
import React, { useState } from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  BriefcaseIcon, 
  UserCircle, 
  MessageSquare, 
  ChevronDown, 
  ChevronRight,
  BrainCircuit,
  Layers,
  Database
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AppSidebar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              AO
            </div>
            <div>
              <h1 className="font-semibold text-lg">Alexander Oguso</h1>
              <p className="text-xs text-muted-foreground">Digital Transformation</p>
            </div>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="relative group"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              <BriefcaseIcon className="mr-2" />
              <span>Services</span>
              {isServicesOpen ? 
                <ChevronDown className="ml-auto h-5 w-5" /> : 
                <ChevronRight className="ml-auto h-5 w-5" />
              }
            </SidebarMenuButton>

            {isServicesOpen && (
              <div className="ml-6 mt-2 space-y-2">
                <SidebarMenuButton asChild>
                  <Link to="/services/ai" className="flex items-center">
                    <BrainCircuit className="mr-2 h-4 w-4" />
                    <span>AI Solutions</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link to="/services/xr" className="flex items-center">
                    <Layers className="mr-2 h-4 w-4" />
                    <span>XR Development</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <Link to="/services/data" className="flex items-center">
                    <Database className="mr-2 h-4 w-4" />
                    <span>Data Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </div>
            )}
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/">
                <BriefcaseIcon className="mr-2" />
                <span>Case Studies</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/blog">
                <BookOpen className="mr-2" />
                <span>Blog</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/">
                <UserCircle className="mr-2" />
                <span>About</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-primary hover:text-primary/90" asChild>
              <Link to="/">
                <MessageSquare className="mr-2" />
                <span>Contact</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4 text-xs text-muted-foreground">
          © 2023 Alexander Oguso
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
