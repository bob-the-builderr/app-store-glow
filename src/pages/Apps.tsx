import { MetricCard } from "@/components/MetricCard";
import { AppCard } from "@/components/AppCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Smartphone, TrendingUp, Download, Star } from "lucide-react";

const mockApps = [
  {
    id: "1",
    name: "FitTracker Pro",
    icon: "/placeholder.svg",
    category: "Health & Fitness",
    rating: 4.8,
    downloads: "125K",
    rank: 12,
    rankChange: 3,
    keywords: 45
  },
  {
    id: "2",
    name: "PhotoEdit Master",
    icon: "/placeholder.svg",
    category: "Photo & Video",
    rating: 4.6,
    downloads: "89K",
    rank: 8,
    rankChange: -2,
    keywords: 32
  },
  {
    id: "3",
    name: "TaskManager Plus",
    icon: "/placeholder.svg",
    category: "Productivity",
    rating: 4.9,
    downloads: "156K",
    rank: 5,
    rankChange: 1,
    keywords: 28
  },
  {
    id: "4",
    name: "Music Streamer",
    icon: "/placeholder.svg",
    category: "Music",
    rating: 4.7,
    downloads: "234K",
    rank: 15,
    rankChange: 0,
    keywords: 67
  }
];

export default function Apps() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Apps Dashboard</h1>
          <p className="text-muted-foreground">Monitor and optimize your app store presence</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add App
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Apps"
          value={mockApps.length}
          change={{ value: 25, type: "positive" }}
          icon={<Smartphone className="w-4 h-4" />}
        />
        <MetricCard
          title="Avg Rating"
          value="4.75"
          change={{ value: 0.1, type: "positive" }}
          icon={<Star className="w-4 h-4" />}
        />
        <MetricCard
          title="Total Downloads"
          value="604K"
          change={{ value: 12, type: "positive" }}
          icon={<Download className="w-4 h-4" />}
        />
        <MetricCard
          title="Avg Rank"
          value="10"
          change={{ value: 2, type: "positive" }}
          icon={<TrendingUp className="w-4 h-4" />}
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search apps..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockApps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}