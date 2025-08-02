import { MetricCard } from "@/components/MetricCard";
import { KeywordCard } from "@/components/KeywordCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Target, TrendingUp, Eye, Award } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockKeywords = [
  {
    id: "1",
    term: "fitness tracker",
    rank: 12,
    rankChange: 3,
    difficulty: 75,
    searchVolume: "45K",
    apps: ["FitBit", "Apple Health", "Samsung Health", "MyFitnessPal"]
  },
  {
    id: "2", 
    term: "photo editor",
    rank: 8,
    rankChange: -2,
    difficulty: 85,
    searchVolume: "89K",
    apps: ["Photoshop", "VSCO", "Snapseed"]
  },
  {
    id: "3",
    term: "task manager",
    rank: 5,
    rankChange: 1,
    difficulty: 45,
    searchVolume: "23K",
    apps: ["Todoist", "Any.do", "Microsoft To Do"]
  },
  {
    id: "4",
    term: "music streaming",
    rank: 15,
    rankChange: 0,
    difficulty: 90,
    searchVolume: "156K",
    apps: ["Spotify", "Apple Music", "YouTube Music", "Amazon Music"]
  },
  {
    id: "5",
    term: "workout app",
    rank: 7,
    rankChange: 4,
    difficulty: 60,
    searchVolume: "34K",
    apps: ["Nike Training", "Adidas Training", "7 Minute Workout"]
  },
  {
    id: "6",
    term: "productivity app",
    rank: 20,
    rankChange: -5,
    difficulty: 70,
    searchVolume: "67K",
    apps: ["Notion", "Evernote", "OneNote", "Trello"]
  }
];

export default function Keywords() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Keywords Dashboard</h1>
          <p className="text-muted-foreground">Track and optimize your keyword rankings</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Keyword
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Tracked Keywords"
          value={mockKeywords.length}
          change={{ value: 15, type: "positive" }}
          icon={<Target className="w-4 h-4" />}
        />
        <MetricCard
          title="Avg Rank"
          value="11.2"
          change={{ value: 1.5, type: "positive" }}
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <MetricCard
          title="Top 10 Keywords"
          value="3"
          change={{ value: 1, type: "positive" }}
          icon={<Award className="w-4 h-4" />}
        />
        <MetricCard
          title="Total Visibility"
          value="78.5%"
          change={{ value: 3.2, type: "positive" }}
          icon={<Eye className="w-4 h-4" />}
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search keywords..."
            className="pl-10"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="low">Low (0-49)</SelectItem>
            <SelectItem value="medium">Medium (50-79)</SelectItem>
            <SelectItem value="high">High (80-100)</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rank">Rank</SelectItem>
            <SelectItem value="change">Rank Change</SelectItem>
            <SelectItem value="volume">Search Volume</SelectItem>
            <SelectItem value="difficulty">Difficulty</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockKeywords.map((keyword) => (
          <KeywordCard key={keyword.id} keyword={keyword} />
        ))}
      </div>
    </div>
  );
}