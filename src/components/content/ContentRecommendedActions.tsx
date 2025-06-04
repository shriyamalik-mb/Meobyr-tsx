
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface RecommendedAction {
  action: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
}

interface ContentRecommendedActionsProps {
  title: string;
  actions: RecommendedAction[];
}

export const ContentRecommendedActions = ({ title, actions }: ContentRecommendedActionsProps) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <XCircle className="h-4 w-4 text-brand-brick" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-brand-sage" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityBg = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-brand-brick/5 border-brand-brick/20';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      case 'low':
        return 'bg-brand-sage/5 border-brand-sage/20';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-brand-navy">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <div key={index} className={`p-3 rounded-lg border ${getPriorityBg(action.priority)}`}>
            <div className="flex items-start space-x-3">
              {getPriorityIcon(action.priority)}
              <div className="flex-1">
                <p className="text-sm font-medium text-brand-navy">{action.action}</p>
                <p className="text-xs text-gray-600 mt-1">{action.impact}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
