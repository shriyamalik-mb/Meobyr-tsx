
import { Badge } from "@/components/ui/badge";

interface ScoreBadgeProps {
  score: number;
}

export const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-brand-sage text-white border-brand-sage";
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-brand-brick/10 text-brand-brick border-brand-brick/20";
  };

  return (
    <Badge variant="outline" className={getScoreColor(score)}>
      {score}
    </Badge>
  );
};
