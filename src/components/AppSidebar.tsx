import { useState, useRef, useEffect } from "react";
import { Smartphone, Search, TrendingUp, Settings, BarChart3, Plus, Filter, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";

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

const regions = [
  { value: "us", label: "United States", code: "US" },
  { value: "gb", label: "United Kingdom", code: "GB" },
  { value: "ca", label: "Canada", code: "CA" },
  { value: "au", label: "Australia", code: "AU" },
  { value: "de", label: "Germany", code: "DE" },
  { value: "fr", label: "France", code: "FR" },
  { value: "jp", label: "Japan", code: "JP" },
  { value: "kr", label: "South Korea", code: "KR" },
  { value: "cn", label: "China", code: "CN" },
  { value: "in", label: "India", code: "IN" },
  { value: "br", label: "Brazil", code: "BR" },
  { value: "mx", label: "Mexico", code: "MX" },
  { value: "es", label: "Spain", code: "ES" },
  { value: "it", label: "Italy", code: "IT" },
  { value: "nl", label: "Netherlands", code: "NL" },
];

interface SearchResult {
  package: string;
  title: string;
  developer: string;
  icon: string;
}

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolling, setIsScrolling] = useState(false);
  const [isAddAppOpen, setIsAddAppOpen] = useState(false);
  const [newAppName, setNewAppName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("us");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { userApps, selectedApp, setSelectedApp, addUserApp } = useAppContext();
  const navigate = useNavigate();

  // Reset search query when component mounts
  useEffect(() => {
    setSearchQuery("");
    setNewAppName("");
    setSearchResults([]);
    setIsSearching(false);
  }, []);

  const filteredApps = userApps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedRegionData = regions.find(r => r.value === selectedRegion);

  // Search function that only runs on Enter key
  const handleSearch = async () => {
    if (!newAppName.trim() || newAppName.length < 2) {
      setSearchResults([]);
      return;
    }

    console.log("Searching for:", newAppName, "in region:", selectedRegionData?.code);
    setIsSearching(true);
    
    try {
      const formData = new URLSearchParams();
      formData.append("appstore", "2"); // 2 = app store
      formData.append("keyword", newAppName);
      formData.append("country", selectedRegionData?.code || "US");

      console.log("Form data:", {
        appstore: "2",
        keyword: newAppName,
        country: selectedRegionData?.code || "US"
      });

      const response = await fetch("https://new.keyapp.top/api/public/v2/apps/search", {
        method: "POST",
        headers: {
          "x-api-key": "fa8fbcf2a53824fee0ce48810cfc9e22",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (response.ok) {
        const data = await response.json();
        console.log("Search results:", data);
        
        // Access response.data as shown in the code snippet
        const apps = data.data || data || [];
        console.log("Apps array:", apps);
        
        // Log the first app to see its structure
        if (apps.length > 0) {
          console.log("First app structure:", apps[0]);
          console.log("Available fields:", Object.keys(apps[0]));
          console.log("Package field value:", apps[0].package);
          console.log("Package field type:", typeof apps[0].package);
          // Log all fields and their values
          Object.entries(apps[0]).forEach(([key, value]) => {
            console.log(`${key}:`, value, `(type: ${typeof value})`);
          });
        }
        
        setSearchResults(Array.isArray(apps) ? apps : []);
      } else {
        console.error("Search failed:", response.status);
        const errorText = await response.text();
        console.error("Error response:", errorText);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleAddApp = () => {
    if (newAppName.trim() && selectedRegion) {
      // Here you would typically make an API call to add the app
      console.log("Adding app:", { name: newAppName, region: selectedRegion });
      
      // Reset form
      setNewAppName("");
      setSelectedRegion("us");
      setSearchResults([]);
      setIsAddAppOpen(false);
    }
  };

  const handleAppSelect = (app: SearchResult) => {
    // Add the selected app to user's apps
    const newApp = {
      id: app.package,
      name: app.title,
      icon: app.icon,
      status: "active" as const,
      lastUpdated: "Just added",
      package: app.package,
      developer: app.developer,
      country: selectedRegionData?.code || "US"
    };
    
    addUserApp(newApp);
    setSelectedApp(newApp);
    setNewAppName("");
    setSearchResults([]);
    setIsAddAppOpen(false);
  };

  const handleAppClick = (app: any) => {
    setSelectedApp(app);
    // Navigate back to main page if we're on settings page
    if (window.location.pathname === '/settings') {
      navigate('/');
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1500); // Hide after 1.5 seconds of no scrolling
    };

    const handleMouseEnter = () => {
      setIsScrolling(true);
    };

    const handleMouseLeave = () => {
      setIsScrolling(false);
    };

    scrollElement.addEventListener('scroll', handleScroll);
    scrollElement.addEventListener('mouseenter', handleMouseEnter);
    scrollElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
      scrollElement.removeEventListener('mouseenter', handleMouseEnter);
      scrollElement.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <>
      {/* Hidden dummy form to prevent autocomplete */}
      <form style={{ display: 'none' }}>
        <input type="text" name="fakeusernameremembered" />
        <input type="password" name="fakepasswordremembered" />
      </form>
      
      <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
        <SidebarContent className="flex flex-col h-full bg-background">
          {/* Header */}
          <div className="p-6 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <img 
                  src="/ASOLYT (4).png" 
                  alt="ASOLYT Logo" 
                  className="w-8 h-8"
                />
              </div>
              {!collapsed && (
                <div>
                  <h1 className="font-bold text-lg text-foreground">ASOLYT</h1>
                  <p className="text-xs text-muted-foreground font-medium">App Store Analytics</p>
                </div>
              )}
            </div>
          </div>

          {/* Search & Actions */}
          {!collapsed && (
            <div className="px-6 pb-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search your apps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 bg-background/50 border-border/50 focus:border-primary/50 rounded-full"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              </div>
              <Button 
                className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm rounded-full"
                onClick={() => setIsAddAppOpen(true)}
                data-add-app-button
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New App
              </Button>
            </div>
          )}

          {/* Collapsed Search */}
          {collapsed && (
            <div className="px-3 pb-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full h-10"
                onClick={() => setIsAddAppOpen(true)}
                data-add-app-button
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Apps Section */}
          <div className="flex-1 px-6 min-h-0">
            {!collapsed && (
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground">Your Apps</h2>
                <Badge variant="secondary" className="text-xs">
                  {filteredApps.length} apps
                </Badge>
              </div>
            )}
            
            <div 
              ref={scrollRef}
              className={`space-y-1 max-h-[calc(100vh-300px)] overflow-y-auto transition-all duration-300 ${
                isScrolling ? 'custom-scrollbar-visible' : 'custom-scrollbar-hidden'
              }`}
            >
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="group"
                >
                  <div 
                    className={`flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer ${
                      selectedApp?.id === app.id ? 'bg-primary/10 border border-primary/20' : ''
                    }`}
                    onClick={() => handleAppClick(app)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0">
                      {app.icon ? (
                        <img
                          src={app.icon}
                          alt={app.name}
                          className="w-8 h-8 rounded-lg object-cover"
                          onError={e => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                        />
                      ) : (
                        app.name.charAt(0)
                      )}
                    </div>
                    
                    {!collapsed && (
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-foreground truncate">{app.name}</h3>
                        <p className="text-xs text-muted-foreground">{app.lastUpdated}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {filteredApps.length === 0 && !collapsed && (
                <div className="text-center py-4">
                  <Smartphone className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">No apps found</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-border/50">
            <Button
              variant="ghost"
              className="w-full justify-start h-9 text-muted-foreground hover:text-foreground"
              onClick={() => navigate('/settings')}
            >
              <Settings className="w-4 h-4 mr-3" />
              {!collapsed && <span className="font-medium">Settings</span>}
            </Button>
          </div>
        </SidebarContent>
      </Sidebar>

      {/* Add App Modal */}
      <Dialog open={isAddAppOpen} onOpenChange={setIsAddAppOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New App</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="app-name">App Name</Label>
              <Input
                id="app-name"
                placeholder="Enter app name"
                value={newAppName}
                onChange={(e) => setNewAppName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="app-region">Region</Label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{region.code}</span>
                        <span className="text-xs text-muted-foreground">{region.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddAppOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddApp}
              disabled={!newAppName.trim() || isSearching}
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                'Add App'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


    </>
  );
}