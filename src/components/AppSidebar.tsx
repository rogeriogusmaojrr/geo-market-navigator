
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, 
  PieChart, 
  Store, 
  FileText, 
  Settings, 
  LogOut,
  Map,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Sales Analytics", href: "/sales", icon: PieChart },
    { name: "Store Locations", href: "/stores", icon: Store },
    { name: "Reports", href: "/reports", icon: FileText },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="py-6 px-2">
        <div className="flex items-center px-2">
          <Map className="h-8 w-8 text-geo-primary" />
          <span className="ml-2 text-xl font-semibold">GeoMarket</span>
        </div>
        <SidebarTrigger className="absolute right-2 top-6 lg:hidden" />
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </SidebarContent>
      
      <SidebarFooter className="p-2">
        <div className="space-y-1">
          <Link
            to="/settings"
            className="flex items-center px-3 py-2 text-sm rounded-md font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start px-3 py-2 text-sm rounded-md font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
            onClick={logout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
