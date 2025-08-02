import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KeywordCardProps {
  keyword: {
    id: string;
    term: string;
    rank: number;
    rankChange: number;
    difficulty: number;
    searchVolume: string;
    apps: string[];
  };
}

export function KeywordCard({ keyword }: KeywordCardProps) {
  const getRankChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-success" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-destructive" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const getRankChangeColor = (change: number) => {
    if (change > 0) return "text-success";
    if (change < 0) return "text-destructive";
    return "text-muted-foreground";
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty >= 80) return "text-destructive";
    if (difficulty >= 50) return "text-warning";
    return "text-success";
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty >= 80) return "High";
    if (difficulty >= 50) return "Medium";
    return "Low";
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">{keyword.term}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {keyword.searchVolume} searches/month
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              {getRankChangeIcon(keyword.rankChange)}
              <span className="text-sm font-medium">#{keyword.rank}</span>
            </div>
            <div className={`text-xs ${getRankChangeColor(keyword.rankChange)}`}>
              {keyword.rankChange !== 0 && (
                <>
                  {keyword.rankChange > 0 ? "+" : ""}{keyword.rankChange} this week
                </>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Difficulty</span>
            <span className={`text-sm font-medium ${getDifficultyColor(keyword.difficulty)}`}>
              {getDifficultyLabel(keyword.difficulty)}
            </span>
          </div>
          <Progress 
            value={keyword.difficulty} 
            className="h-2"
          />
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-2">Competing Apps</p>
          <div className="flex flex-wrap gap-1">
            {keyword.apps.slice(0, 3).map((app, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {app}
              </Badge>
            ))}
            {keyword.apps.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{keyword.apps.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}