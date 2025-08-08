import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Lightbulb, Smartphone, X, RefreshCw, MoreHorizontal, ArrowUpDown, TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAppContext } from "@/contexts/AppContext";

// Country code to country name mapping
const countryMap: { [key: string]: string } = {
  "us": "United States",
  "gb": "United Kingdom", 
  "ca": "Canada",
  "au": "Australia",
  "de": "Germany",
  "fr": "France",
  "jp": "Japan",
  "kr": "South Korea",
  "cn": "China",
  "in": "India",
  "br": "Brazil",
  "mx": "Mexico",
  "es": "Spain",
  "it": "Italy",
  "nl": "Netherlands"
};

// Interface for keyword data from API
interface KeywordData {
  id: number;
  keyword: string;
  score: number;
  rank: number;
  lang: string;
}

// Mock keywords data for different apps
const mockKeywordsByApp = {
  "1": [
    {
      id: "1",
      keyword: "fitness tracker",
      lastUpdate: "2024-01-15",
      popularity: "45K",
      difficulty: 75,
      position: 12,
      competition: ["FitBit", "Apple Health", "Samsung Health"]
    },
    {
      id: "2", 
      keyword: "workout tracking",
      lastUpdate: "2024-01-14",
      popularity: "32K",
      difficulty: 65,
      position: 8,
      competition: ["Nike Training", "Adidas Training", "7 Minute Workout"]
    },
    {
      id: "3",
      keyword: "step counter",
      lastUpdate: "2024-01-13",
      popularity: "28K",
      difficulty: 55,
      position: 5,
      competition: ["Pedometer", "Step Counter", "Activity Tracker"]
    }
  ],
  "2": [
    {
      id: "4",
      keyword: "photo editor",
      lastUpdate: "2024-01-15",
      popularity: "89K",
      difficulty: 85,
      position: 8,
      competition: ["Photoshop", "VSCO", "Snapseed"]
    },
    {
      id: "5",
      keyword: "image filter",
      lastUpdate: "2024-01-14",
      popularity: "67K",
      difficulty: 70,
      position: 12,
      competition: ["Instagram", "TikTok", "Snapchat"]
    },
    {
      id: "6",
      keyword: "photo collage",
      lastUpdate: "2024-01-13",
      popularity: "45K",
      difficulty: 60,
      position: 6,
      competition: ["PicCollage", "Layout", "PhotoGrid"]
    }
  ],
  "3": [
    {
      id: "7",
      keyword: "task manager",
      lastUpdate: "2024-01-15",
      popularity: "23K",
      difficulty: 45,
      position: 5,
      competition: ["Todoist", "Any.do", "Microsoft To Do"]
    },
    {
      id: "8",
      keyword: "todo list",
      lastUpdate: "2024-01-14",
      popularity: "34K",
      difficulty: 55,
      position: 8,
      competition: ["Wunderlist", "Things", "OmniFocus"]
    },
    {
      id: "9",
      keyword: "project management",
      lastUpdate: "2024-01-13",
      popularity: "18K",
      difficulty: 40,
      position: 3,
      competition: ["Trello", "Asana", "Monday.com"]
    }
  ],
  "4": [
    {
      id: "10",
      keyword: "music streaming",
      lastUpdate: "2024-01-15",
      popularity: "156K",
      difficulty: 90,
      position: 15,
      competition: ["Spotify", "Apple Music", "YouTube Music"]
    },
    {
      id: "11",
      keyword: "playlist creator",
      lastUpdate: "2024-01-14",
      popularity: "78K",
      difficulty: 75,
      position: 10,
      competition: ["Spotify", "Apple Music", "Amazon Music"]
    },
    {
      id: "12",
      keyword: "music discovery",
      lastUpdate: "2024-01-13",
      popularity: "92K",
      difficulty: 80,
      position: 12,
      competition: ["Pandora", "Last.fm", "SoundCloud"]
    }
  ]
};

// Removed unused difficulty helper functions since we now filter by score

// Removed unused position change icon function

export default function Keywords() {
  const { selectedApp, userApps } = useAppContext();
  const [selectedRegion, setSelectedRegion] = React.useState<string>("");
  const [isAddKeywordOpen, setIsAddKeywordOpen] = React.useState(false);
  const [keywordInput, setKeywordInput] = React.useState("");
  const [keywords, setKeywords] = React.useState<KeywordData[]>([]);
  const [storedKeywords, setStoredKeywords] = React.useState<{ [appId: string]: { [region: string]: KeywordData[] } }>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = React.useState(false);
  const [keywordToDelete, setKeywordToDelete] = React.useState<KeywordData | null>(null);
  const [updatingKeywordId, setUpdatingKeywordId] = React.useState<number | null>(null);
  
  // New state for filtering and sorting
  const [scoreFilter, setScoreFilter] = React.useState<string>("all");
  const [rankFilter, setRankFilter] = React.useState<string>("all");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");
  const [rankSortOrder, setRankSortOrder] = React.useState<"asc" | "desc">("asc");
  
  // Get keywords for the selected app, or empty array if no app selected
  const mockKeywords = selectedApp ? (mockKeywordsByApp[selectedApp.id as keyof typeof mockKeywordsByApp] || []) : [];

  // Set the selected region when an app is selected
  React.useEffect(() => {
    if (selectedApp?.country) {
      setSelectedRegion(selectedApp.country.toLowerCase());
    }
  }, [selectedApp]);

  // Function to handle keyword search
  const handleKeywordSearch = async () => {
    console.log("Search button clicked");
    console.log("selectedApp:", selectedApp);
    console.log("selectedRegion:", selectedRegion);
    console.log("keywordInput:", keywordInput);
    
    if (!selectedApp?.package || !selectedRegion || !keywordInput.trim()) {
      console.log("Validation failed - missing required fields");
      return;
    }

    // Split keywords by comma and clean them up
    const keywords = keywordInput
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    if (keywords.length === 0) {
      console.log("No valid keywords found");
      return;
    }

    setIsLoading(true);
    
    const maxRetries = 3;
    let retryCount = 0;
    let allKeywordData: KeywordData[] = [];

    while (retryCount < maxRetries) {
      try {
        console.log(`Making API call (attempt ${retryCount + 1}/${maxRetries}) with:`, {
          appstore: 2,
          package: selectedApp.package,
          country: selectedRegion.toUpperCase(),
          keywords: keywords
        });

        const response = await fetch("https://new.keyapp.top/api/public/v2/keywords", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "fa8fbcf2a53824fee0ce48810cfc9e22"
          },
          body: JSON.stringify({
            appstore: 2,
            package: selectedApp.package,
            country: selectedRegion.toUpperCase(),
            keywords: keywords
          })
        });

        console.log("Response status:", response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log("API response:", data);
          console.log("Response data type:", typeof data);
          console.log("Response data keys:", Object.keys(data));
          console.log("Data.data:", data.data);
          console.log("Data.data type:", typeof data.data);
          console.log("Data.data length:", Array.isArray(data.data) ? data.data.length : 'not an array');
          
          if (data.data && data.data.length > 0) {
            allKeywordData = data.data;
            
            // Check if any keywords have null scores or ranks
            const hasNullValues = allKeywordData.some(keyword => 
              keyword.score === null || keyword.rank === null
            );
            
            if (hasNullValues) {
              console.log(`Attempt ${retryCount + 1}: Some keywords have null values, retrying...`);
              retryCount++;
              if (retryCount < maxRetries) {
                // Wait a bit before retrying
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
              } else {
                console.log("Max retries reached, adding keywords with null values");
              }
            } else {
              console.log("Valid response received, adding keywords");
              break;
            }
          }
          
          setKeywords(data.data || []);
        } else {
          console.error("Keyword search failed:", response.status);
          const errorText = await response.text();
          console.error("Error response:", errorText);
          setKeywords([]);
          break;
        }
      } catch (error) {
        console.error("Keyword search error:", error);
        setKeywords([]);
        break;
      }
    }

    // Add all keywords to table if we have data (even with null values after max retries)
    if (allKeywordData.length > 0) {
      setStoredKeywords(prev => ({
        ...prev,
        [selectedApp?.id]: {
          ...prev[selectedApp?.id],
          [selectedRegion]: [...(prev[selectedApp?.id]?.[selectedRegion] || []), ...allKeywordData]
        }
      }));
      setIsAddKeywordOpen(false);
      setKeywordInput("");
    }
    
    setIsLoading(false);
  };

  // Handle Enter key press for keyword search
  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleKeywordSearch();
    }
  };

  // Function to add keyword to the table
  const handleAddKeyword = (keywordData: KeywordData) => {
    // Add the keyword to the stored keywords list
    setStoredKeywords(prev => ({
      ...prev,
      [selectedApp?.id]: {
        ...prev[selectedApp?.id],
        [selectedRegion]: [...(prev[selectedApp?.id]?.[selectedRegion] || []), keywordData]
      }
    }));
    console.log("Adding keyword:", keywordData);
    setIsAddKeywordOpen(false);
    setKeywordInput("");
    setKeywords([]);
  };

  // Function to delete keyword from the table
  const handleDeleteKeyword = (keywordId: number) => {
    setStoredKeywords(prev => ({
      ...prev,
      [selectedApp?.id]: {
        ...prev[selectedApp?.id],
        [selectedRegion]: prev[selectedApp?.id]?.[selectedRegion]?.filter(keyword => keyword.id !== keywordId) || []
      }
    }));
  };

  // Function to show delete confirmation
  const showDeleteConfirmation = (keyword: KeywordData) => {
    setKeywordToDelete(keyword);
    setIsDeleteConfirmOpen(true);
  };

  // Function to confirm delete
  const confirmDelete = () => {
    if (keywordToDelete) {
      setStoredKeywords(prev => ({
        ...prev,
        [selectedApp?.id]: {
          ...prev[selectedApp?.id],
          [selectedRegion]: prev[selectedApp?.id]?.[selectedRegion]?.filter(keyword => keyword.id !== keywordToDelete.id) || []
        }
      }));
      setKeywordToDelete(null);
    }
    setIsDeleteConfirmOpen(false);
  };

  // Function to update a specific keyword
  const updateKeyword = async (keywordToUpdate: KeywordData) => {
    setUpdatingKeywordId(keywordToUpdate.id);
    const maxRetries = 3;
    let retryCount = 0;
    let updatedKeywordData = null;

    while (retryCount < maxRetries) {
      try {
        console.log(`Updating keyword "${keywordToUpdate.keyword}" (attempt ${retryCount + 1}/${maxRetries})`);

        const response = await fetch("https://new.keyapp.top/api/public/v2/keywords", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "fa8fbcf2a53824fee0ce48810cfc9e22"
          },
          body: JSON.stringify({
            appstore: 2,
            package: selectedApp.package,
            country: selectedRegion.toUpperCase(),
            keywords: [keywordToUpdate.keyword]
          })
        });

        if (response.ok) {
          const data = await response.json();
          
          if (data.data && data.data.length > 0) {
            updatedKeywordData = data.data[0];
            
            // Check if score or rank is null
            if (updatedKeywordData.score === null || updatedKeywordData.rank === null) {
              console.log(`Attempt ${retryCount + 1}: Score or rank is null, retrying...`);
              retryCount++;
              if (retryCount < maxRetries) {
                // Wait a bit before retrying
                await new Promise(resolve => setTimeout(resolve, 1000));
                continue;
              } else {
                console.log("Max retries reached, updating keyword with null values");
              }
            } else {
              console.log("Valid response received, updating keyword");
              break;
            }
          }
        } else {
          console.error("Keyword update failed:", response.status);
          break;
        }
      } catch (error) {
        console.error("Keyword update error:", error);
        break;
      }
    }

    // Update keyword in table if we have data
    if (updatedKeywordData) {
      setStoredKeywords(prev => ({
        ...prev,
        [selectedApp?.id]: {
          ...prev[selectedApp?.id],
          [selectedRegion]: prev[selectedApp?.id]?.[selectedRegion]?.map(keyword => 
            keyword.id === keywordToUpdate.id ? updatedKeywordData : keyword
          ) || []
        }
      }));
    }
    
    setUpdatingKeywordId(null);
  };

  // Helper function to get keyword count for a region
  const getKeywordCount = (region: string) => {
    return storedKeywords[selectedApp?.id]?.[region]?.length || 0;
  };

  // Get current region's keywords with filtering and sorting
  const currentRegionKeywords = React.useMemo(() => {
    let keywords = storedKeywords[selectedApp?.id]?.[selectedRegion] || [];
    
    // Apply score filtering
    if (scoreFilter !== "all") {
      keywords = keywords.filter(keyword => {
        const score = keyword.score || 0;
        switch (scoreFilter) {
          case "low":
            return score >= 0 && score <= 30;
          case "medium":
            return score > 30 && score <= 70;
          case "high":
            return score > 70 && score <= 100;
          default:
            return true;
        }
      });
    }
    
    // Apply rank filtering
    if (rankFilter !== "all") {
      keywords = keywords.filter(keyword => {
        const rank = keyword.rank || 0;
        switch (rankFilter) {
          case "top10":
            return rank >= 1 && rank <= 10;
          case "top25":
            return rank >= 1 && rank <= 25;
          case "top50":
            return rank >= 1 && rank <= 50;
          case "top100":
            return rank >= 1 && rank <= 100;
          default:
            return true;
        }
      });
    }
    
    // Apply sorting by score
    keywords.sort((a, b) => {
      const scoreA = a.score || 0;
      const scoreB = b.score || 0;
      return sortOrder === "asc" ? scoreA - scoreB : scoreB - scoreA;
    });
    
    // Apply sorting by rank
    keywords.sort((a, b) => {
      const rankA = a.rank || 0;
      const rankB = b.rank || 0;
      return rankSortOrder === "asc" ? rankA - rankB : rankB - rankA;
    });
    
    return keywords;
  }, [storedKeywords, selectedApp?.id, selectedRegion, scoreFilter, rankFilter, sortOrder, rankSortOrder]);

  return (
    <div className="space-y-6">
      {selectedApp ? (
        // App selected - show keyword management interface
        <>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Keyword Rankings</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Track and optimize keywords for {selectedApp.name}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="default" className="rounded-full">
                <Lightbulb className="w-4 h-4 mr-2" />
                Find Suggestions
              </Button>
              <Button size="default" className="bg-primary hover:bg-primary/90 rounded-full" onClick={() => setIsAddKeywordOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Keyword
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search keywords..."
                className="pl-10 rounded-full"
              />
            </div>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-[180px] rounded-full">
                <SelectValue placeholder="App Store Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States ({getKeywordCount("us")})</SelectItem>
                <SelectItem value="gb">United Kingdom ({getKeywordCount("gb")})</SelectItem>
                <SelectItem value="ca">Canada ({getKeywordCount("ca")})</SelectItem>
                <SelectItem value="au">Australia ({getKeywordCount("au")})</SelectItem>
                <SelectItem value="de">Germany ({getKeywordCount("de")})</SelectItem>
                <SelectItem value="fr">France ({getKeywordCount("fr")})</SelectItem>
                <SelectItem value="jp">Japan ({getKeywordCount("jp")})</SelectItem>
                <SelectItem value="kr">South Korea ({getKeywordCount("kr")})</SelectItem>
                <SelectItem value="cn">China ({getKeywordCount("cn")})</SelectItem>
                <SelectItem value="in">India ({getKeywordCount("in")})</SelectItem>
                <SelectItem value="br">Brazil ({getKeywordCount("br")})</SelectItem>
                <SelectItem value="mx">Mexico ({getKeywordCount("mx")})</SelectItem>
                <SelectItem value="es">Spain ({getKeywordCount("es")})</SelectItem>
                <SelectItem value="it">Italy ({getKeywordCount("it")})</SelectItem>
                <SelectItem value="nl">Netherlands ({getKeywordCount("nl")})</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Select value={scoreFilter} onValueChange={setScoreFilter}>
                <SelectTrigger className="w-[180px] rounded-full pr-10">
                  <SelectValue placeholder="Filter by score" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="all">All Scores</SelectItem>
                  <SelectItem value="low">Low (0-30)</SelectItem>
                  <SelectItem value="medium">Medium (31-70)</SelectItem>
                  <SelectItem value="high">High (71-100)</SelectItem>
              </SelectContent>
            </Select>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              >
                <ArrowUpDown className="w-3 h-3" />
              </Button>
            </div>
            <div className="relative">
              <Select value={rankFilter} onValueChange={setRankFilter}>
                <SelectTrigger className="w-[180px] rounded-full pr-10">
                  <SelectValue placeholder="Filter by rank" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="all">All Ranks</SelectItem>
                  <SelectItem value="top10">Top 10</SelectItem>
                  <SelectItem value="top25">Top 25</SelectItem>
                  <SelectItem value="top50">Top 50</SelectItem>
                  <SelectItem value="top100">Top 100</SelectItem>
              </SelectContent>
            </Select>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
                onClick={() => setRankSortOrder(rankSortOrder === "asc" ? "desc" : "asc")}
              >
                <TrendingUp className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Keyword</TableHead>
                  <TableHead className="font-semibold">Last Update</TableHead>
                  <TableHead className="font-semibold">Score</TableHead>
                  <TableHead className="font-semibold">Rank</TableHead>
                  <TableHead className="font-semibold w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentRegionKeywords.length > 0 ? (
                  currentRegionKeywords.map((keyword) => (
                    <TableRow key={keyword.id}>
                      <TableCell className="font-medium">{keyword.keyword}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date().toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">{keyword.score}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">#{keyword.rank}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => updateKeyword(keyword)}>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Update
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => showDeleteConfirmation(keyword)}>
                              <X className="mr-2 h-4 w-4 text-destructive" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      No keywords added for {selectedRegion.toUpperCase()} yet. Use the 'Add Keyword' button to search and add keywords for this region.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        // Simple empty state when no app is selected
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="text-center">
            <Smartphone className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No App Selected</h3>
            <p className="text-muted-foreground mb-4">
              Select an app from the sidebar to view its keyword rankings and analytics.
            </p>
            <Button 
              className="w-52 h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm rounded-full"
              onClick={() => (document.querySelector('[data-add-app-button]') as HTMLElement | null)?.click()}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New App
            </Button>
          </div>
        </div>
      )}

      {/* Add Keyword Modal */}
      <Dialog open={isAddKeywordOpen} onOpenChange={setIsAddKeywordOpen}>
        <DialogContent className="sm:max-w-lg rounded-xl [&>button]:hidden">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="You can add multiple keywords separated by comma"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyPress={handleKeywordKeyPress}
                  className="flex-1 rounded-xl"
                />
                <Button 
                  onClick={handleKeywordSearch}
                  disabled={isLoading || !selectedApp?.package || !selectedRegion || !keywordInput.trim()}
                  className="rounded-xl"
                >
                  {isLoading ? "Searching..." : "Add"}
                </Button>
              </div>
            </div>

            {!selectedApp && (
              <div className="text-center py-4 text-muted-foreground">
                Please select an app first to add keywords.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center">
            <p>Are you sure you want to delete this keyword?</p>
            <p className="font-semibold text-lg mt-3">{keywordToDelete?.keyword}</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}