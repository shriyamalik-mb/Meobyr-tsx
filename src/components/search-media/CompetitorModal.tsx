
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';

interface CompetitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  competitorData: any;
}

const CompetitorModal = ({ isOpen, onClose, competitorData }: CompetitorModalProps) => {
  if (!competitorData) return null;

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 2:
        return <Medal className="h-4 w-4 text-gray-400" />;
      case 3:
        return <Award className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
        return 'bg-yellow-100 text-yellow-800';
      case 2:
        return 'bg-gray-100 text-gray-800';
      case 3:
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white border-brand-light">
        <DialogHeader>
          <DialogTitle className="text-lg text-brand-navy">
            Top 3 Competitors for "{competitorData.keyword}"
          </DialogTitle>
          <p className="text-sm text-gray-600">Share of search breakdown by competitor brand</p>
        </DialogHeader>

        <div className="mt-4">
          <div className="space-y-4">
            {competitorData.topCompetitors.map((competitor: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 border border-brand-light rounded-lg">
                <div className="flex items-center gap-3">
                  {getPositionIcon(competitor.position)}
                  <div>
                    <h4 className="font-medium text-brand-navy">{competitor.brand}</h4>
                    <p className="text-sm text-gray-600">Position #{competitor.position}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPositionColor(competitor.position)}>
                    {competitor.marketShare}% share
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-brand-sage/10 rounded-lg border border-brand-sage/20">
            <h4 className="font-medium text-brand-navy mb-2">Search Analysis</h4>
            <div className="text-sm text-brand-navy">
              <p>Total share of search covered by top 3 competitors: {competitorData.topCompetitors.reduce((sum: number, comp: any) => sum + comp.marketShare, 0)}%</p>
              <p className="mt-1">Remaining search opportunity: {100 - competitorData.topCompetitors.reduce((sum: number, comp: any) => sum + comp.marketShare, 0)}%</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompetitorModal;
