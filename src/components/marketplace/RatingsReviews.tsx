
import React, { useState } from 'react';
import { Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MarketplaceItem } from '@/pages/Marketplace';

interface RatingBreakdown {
  stars: number;
  count: number;
  percentage: number;
}

interface ReviewData {
  overallRating: number;
  totalReviews: number;
  breakdown: RatingBreakdown[];
  summary: string;
  featureTags: string[];
  sampleReviews: Array<{
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

interface RatingsReviewsProps {
  item: MarketplaceItem;
}

// Dummy data generator based on item category
const generateReviewData = (item: MarketplaceItem): ReviewData => {
  const baseData = {
    capabilities: {
      overallRating: 4.6,
      totalReviews: 12547,
      summary: "Users praise this capability for its reliability and ease of integration. Most reviews highlight excellent performance and comprehensive documentation.",
      featureTags: ["Reliable", "Well-documented", "Fast", "Easy to use"],
      sampleReviews: [
        { id: '1', author: 'Sarah M.', rating: 5, comment: 'Exceptional capability that delivered exactly what we needed. Integration was seamless.', date: '2024-01-15' },
        { id: '2', author: 'Mike R.', rating: 4, comment: 'Great performance and solid documentation. Minor learning curve but worth it.', date: '2024-01-10' },
        { id: '3', author: 'Emma K.', rating: 5, comment: 'Outstanding results! This has become an essential part of our workflow.', date: '2024-01-08' }
      ]
    },
    solutions: {
      overallRating: 4.4,
      totalReviews: 8932,
      summary: "Clients consistently rate this solution highly for its comprehensive approach and professional delivery. Reviews emphasize strong ROI and expert implementation.",
      featureTags: ["Comprehensive", "Professional", "ROI-focused", "Expert delivery"],
      sampleReviews: [
        { id: '1', author: 'James L.', rating: 5, comment: 'Transformative solution that exceeded our expectations. Professional team and great results.', date: '2024-01-20' },
        { id: '2', author: 'Lisa P.', rating: 4, comment: 'Solid solution with clear ROI. Implementation was smooth and support was excellent.', date: '2024-01-18' },
        { id: '3', author: 'David W.', rating: 5, comment: 'Best investment we made this year. The solution addressed all our pain points perfectly.', date: '2024-01-12' }
      ]
    },
    individuals: {
      overallRating: 4.8,
      totalReviews: 2847,
      summary: "Clients consistently praise this professional for their expertise, communication skills, and ability to deliver high-quality work on time.",
      featureTags: ["Expert", "Communicative", "Reliable", "Creative"],
      sampleReviews: [
        { id: '1', author: 'Rachel T.', rating: 5, comment: 'Incredible expertise and professionalism. Delivered beyond expectations and great to work with.', date: '2024-01-25' },
        { id: '2', author: 'Mark S.', rating: 5, comment: 'Outstanding communication and technical skills. Would definitely work with again.', date: '2024-01-22' },
        { id: '3', author: 'Anna B.', rating: 4, comment: 'Very knowledgeable and reliable. Great quality work delivered on schedule.', date: '2024-01-20' }
      ]
    },
    teams: {
      overallRating: 4.5,
      totalReviews: 1456,
      summary: "Organizations highlight this team's collaborative approach, diverse skill set, and consistent delivery of complex projects within budget and timeline.",
      featureTags: ["Collaborative", "Diverse skills", "On-time", "Budget-conscious"],
      sampleReviews: [
        { id: '1', author: 'Corporate Client', rating: 5, comment: 'Exceptional team collaboration and project management. Delivered a complex project flawlessly.', date: '2024-01-28' },
        { id: '2', author: 'Startup Founder', rating: 4, comment: 'Great team dynamics and technical expertise. Helped us scale efficiently.', date: '2024-01-24' },
        { id: '3', author: 'Tech Director', rating: 5, comment: 'Professional team with diverse skills. Excellent communication throughout the project.', date: '2024-01-21' }
      ]
    }
  };

  const categoryData = baseData[item.category] || baseData.capabilities;
  
  // Generate rating breakdown
  const breakdown = [
    { stars: 5, count: Math.floor(categoryData.totalReviews * 0.65), percentage: 65 },
    { stars: 4, count: Math.floor(categoryData.totalReviews * 0.20), percentage: 20 },
    { stars: 3, count: Math.floor(categoryData.totalReviews * 0.10), percentage: 10 },
    { stars: 2, count: Math.floor(categoryData.totalReviews * 0.03), percentage: 3 },
    { stars: 1, count: Math.floor(categoryData.totalReviews * 0.02), percentage: 2 }
  ];

  return {
    ...categoryData,
    breakdown
  };
};

export const RatingsReviews: React.FC<RatingsReviewsProps> = ({ item }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const reviewData = generateReviewData(item);

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    };

    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${sizeClasses[size]} ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'
        }`}
      />
    ));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Overall Rating Display */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Ratings & Reviews</h3>
        
        <div className="flex items-start space-x-6">
          {/* Large Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground mb-1">
              {reviewData.overallRating}
            </div>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {renderStars(reviewData.overallRating, 'lg')}
            </div>
            <p className="text-sm text-muted-foreground">
              {formatNumber(reviewData.totalReviews)} ratings
            </p>
          </div>

          {/* Star Breakdown */}
          <div className="flex-1 space-y-2">
            {reviewData.breakdown.map((item) => (
              <div key={item.stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-12">
                  <span className="text-sm text-muted-foreground">{item.stars}</span>
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                </div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI-Generated Review Summary */}
      <div className="space-y-3">
        <h4 className="text-base font-medium text-foreground flex items-center space-x-2">
          <Users className="w-4 h-4" />
          <span>Review summary based on {formatNumber(reviewData.totalReviews)} reviews</span>
        </h4>
        <p className="text-muted-foreground leading-relaxed">
          {reviewData.summary}
        </p>
      </div>

      {/* Feature Tags */}
      <div className="space-y-3">
        <h4 className="text-base font-medium text-foreground">Most mentioned features</h4>
        <div className="flex flex-wrap gap-2">
          {reviewData.featureTags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 text-xs px-3 py-1"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* See All CTA */}
      <div className="pt-2">
        <Button
          variant="outline"
          onClick={() => setShowAllReviews(true)}
          className="w-full sm:w-auto"
        >
          See all reviews
        </Button>
      </div>

      {/* Full Reviews Modal */}
      <Dialog open={showAllReviews} onOpenChange={setShowAllReviews}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <span>All Reviews for {item.name}</span>
              <Badge variant="secondary">{formatNumber(reviewData.totalReviews)} reviews</Badge>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {reviewData.sampleReviews.map((review) => (
              <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{review.author}</span>
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating, 'sm')}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
              </div>
            ))}
            
            {/* Load more placeholder */}
            <div className="text-center pt-4">
              <Button variant="ghost" className="text-muted-foreground">
                Load more reviews...
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
