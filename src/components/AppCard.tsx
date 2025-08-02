import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Download, TrendingUp, ExternalLink } from "lucide-react";

interface AppCardProps {
  app: {
    id: string;
    name: string;
    icon: string;
    category: string;
    rating: number;
    downloads: string;
    rank: number;
    rankChange: number;
    keywords: number;
  };
}

export function AppCard({ app }: AppCardProps) {
  const getRankChangeColor = (change: number) => {
    if (change > 0) return "text-success";
    if (change < 0) return "text-destructive";
    return "text-muted-foreground";
  };

  const getRankChangeSymbol = (change: number) => {
    if (change > 0) return "+";
    if (change < 0) return "";
    return "";
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white font-bold text-lg">
              {app.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{app.name}</h3>
              <Badge variant="secondary" className="text-xs">
                {app.category}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-warning fill-current" />
              <span className="text-sm font-medium">{app.rating}</span>
            </div>
            <p className="text-xs text-muted-foreground">Rating</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4 text-info" />
              <span className="text-sm font-medium">{app.downloads}</span>
            </div>
            <p className="text-xs text-muted-foreground">Downloads</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">#{app.rank}</span>
              <span className={`text-xs ${getRankChangeColor(app.rankChange)}`}>
                ({getRankChangeSymbol(app.rankChange)}{Math.abs(app.rankChange)})
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Category Rank</p>
          </div>
          
          <div className="space-y-1">
            <span className="text-sm font-medium">{app.keywords}</span>
            <p className="text-xs text-muted-foreground">Tracked Keywords</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}