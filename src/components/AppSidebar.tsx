
import React, { useState, useEffect } from 'react';
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
  Home,
  BookOpen, 
  BriefcaseIcon, 
  UserCircle, 
  MessageSquare, 
  ChevronDown, 
  ChevronRight,
  BrainCircuit,
  Layers,
  Video,
  LockKeyhole,
  Sun,
  Moon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';
import { Switch } from '@/components/ui/switch';

const AppSidebar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAdminAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 overflow-hidden rounded-md">
              <img 
                src="/lovable-uploads/060b31f6-ea45-490a-89da-eb7c894826d8.png" 
                alt="Alexander Oguso Logo" 
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-semibold text-lg">Alexander Oguso</h1>
              <p className="text-xs text-muted-foreground">Digital Transformation</p>
            </div>
          </Link>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/">
                <Home className="mr-2" />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
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
                  <Link to="/services/multimedia" className="flex items-center">
                    <Video className="mr-2 h-4 w-4" />
                    <span>Multimedia Production</span>
                  </Link>
                </SidebarMenuButton>
              </div>
            )}
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/portfolio">
                <BriefcaseIcon className="mr-2" />
                <span>Portfolio</span>
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
              <Link to="/about">
                <UserCircle className="mr-2" />
                <span>About</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-primary hover:text-primary/90" asChild>
              <Link to="/contact">
                <MessageSquare className="mr-2" />
                <span>Contact</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          {/* Admin panel link - conditionally styled */}
          <SidebarMenuItem>
            <SidebarMenuButton 
              className={cn(
                isAuthenticated ? "text-green-500 hover:text-green-600" : "text-muted-foreground hover:text-foreground"
              )} 
              asChild
            >
              <Link to="/admin">
                <LockKeyhole className="mr-2" />
                <span>Admin Panel{isAuthenticated ? " (Logged In)" : ""}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          {/* Theme toggle switch */}
          <SidebarMenuItem>
            <div className="px-3 py-2 flex items-center justify-between">
              <div className="flex items-center">
                {theme === 'dark' ? (
                  <Moon className="mr-2 h-4 w-4" />
                ) : (
                  <Sun className="mr-2 h-4 w-4" />
                )}
                <span>{theme === 'dark' ? 'Dark' : 'Light'} Mode</span>
              </div>
              <Switch 
                checked={theme === 'dark'} 
                onCheckedChange={toggleTheme}
                aria-label="Toggle dark mode"
              />
            </div>
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
