
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const AppSidebar = () => {
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
            <SidebarMenuButton>
              <span>Services</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <span>Case Studies</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <span>About</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-primary hover:text-primary/90">
              <span>Contact</span>
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
