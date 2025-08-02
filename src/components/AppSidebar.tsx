import { useState } from "react";
import { Smartphone, Search, TrendingUp, Settings, BarChart3 } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainTabs = [
  { title: "Apps", url: "/", icon: Smartphone },
  { title: "Keywords", url: "/keywords", icon: Search },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-foreground">ASO Optimizer</h2>
                <p className="text-xs text-muted-foreground">App Store Analytics</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation Tabs - Horizontal Layout */}
        <div className="p-4">
          <div className="flex gap-2">
            {mainTabs.map((tab) => (
              <Button
                key={tab.title}
                asChild
                variant={isActive(tab.url) ? "default" : "ghost"}
                className="flex-1 justify-center"
              >
                <NavLink to={tab.url} end>
                  <tab.icon className="w-4 h-4" />
                  {!collapsed && <span className="ml-2">{tab.title}</span>}
                </NavLink>
              </Button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        {!collapsed && (
          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search..."
                className="pl-10"
              />
            </div>
          </div>
        )}

        {/* Spacer to push settings to bottom */}
        <div className="flex-1" />

        {/* Settings at bottom */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start"
          >
            <Settings className="w-4 h-4" />
            {!collapsed && <span className="ml-2">Settings</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}