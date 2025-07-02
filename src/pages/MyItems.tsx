import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star, User, Search, ChevronDown, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { MarketplaceCard } from '@/components/marketplace/MarketplaceCard';
import { MarketplaceItemModal } from '@/components/marketplace/MarketplaceItemModal';
import { FavoritesDrawer } from '@/components/marketplace/FavoritesDrawer';
import { FullPageCart } from '@/components/marketplace/FullPageCart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { MarketplaceItem } from './Marketplace';
import { ReviewModal } from '@/components/marketplace/ReviewModal';

const MyItems = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isFullPageCartOpen, setIsFullPageCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<MarketplaceItem[]>([]);
  const [cartItems, setCartItems] = useState<MarketplaceItem[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReviewItem, setSelectedReviewItem] = useState<MarketplaceItem | null>(null);
  
  const [purchasedItems] = useState<MarketplaceItem[]>([
    {
      id: '1',
      name: 'Advanced Data Analytics',
      category: 'capabilities',
      type: 'service',
      price: 0.05,
      rating: 4.8,
      reviewCount: 245,
      tags: ['Analytics', 'Machine Learning', 'Data Science'],
      description: 'Powerful analytics capability for processing large datasets with advanced machine learning algorithms and real-time insights.'
    },
    {
      id: '2',
      name: 'Natural Language Processing',
      category: 'capabilities',
      type: 'service',
      price: 0.03,
      rating: 4.6,
      reviewCount: 189,
      tags: ['NLP', 'Text Analysis', 'Sentiment Analysis'],
      description: 'Advanced NLP tools for text processing, sentiment analysis, and language understanding with high accuracy.'
    },
    {
      id: '3',
      name: 'Image Recognition Suite',
      category: 'capabilities',
      type: 'service',
      price: 0.08,
      rating: 4.7,
      reviewCount: 156,
      tags: ['Computer Vision', 'AI', 'Image Processing'],
      description: 'Comprehensive image recognition and processing tools with state-of-the-art computer vision algorithms.'
    },
    {
      id: '4',
      name: 'Custom E-commerce Solution',
      category: 'solutions',
      type: 'service',
      price: 2500,
      rating: 4.9,
      reviewCount: 78,
      tags: ['E-commerce', 'Custom Development', 'Full-stack'],
      description: 'Complete e-commerce platform with custom features, payment integration, and scalable architecture.'
    },
    {
      id: '5',
      name: 'Marketing Dashboard Template',
      category: 'solutions',
      type: 'service',
      price: 299,
      rating: 4.5,
      reviewCount: 92,
      tags: ['Dashboard', 'Analytics', 'Marketing'],
      description: 'Pre-built marketing dashboard with comprehensive analytics, reporting tools, and customizable widgets.'
    }
  ]);

  // Mock user reviews (in a real app, this would come from an API)
  const [userReviews, setUserReviews] = useState<Record<string, { rating: number; review: string }>>({
    '1': { rating: 5, review: 'Excellent analytics capability, very easy to integrate!' },
    '3': { rating: 4, review: 'Great image recognition accuracy, though setup took a bit longer than expected.' }
  });

  const addToCart = (item: MarketplaceItem) => {
    setCartItems(prev => [...prev.filter(i => i.id !== item.id), item]);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
  };

  const toggleFavorite = (item: MarketplaceItem) => {
    setFavorites(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isFavorited = (itemId: string) => {
    return favorites.some(item => item.id === itemId);
  };

  const handleOpenModal = (item: MarketplaceItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCheckout = () => {
    // Implementation would go here
  };

  const handleReviewItem = (item: MarketplaceItem) => {
    setSelectedReviewItem(item);
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = (itemId: string, rating: number, review: string) => {
    setUserReviews(prev => ({
      ...prev,
      [itemId]: { rating, review }
    }));
    // In a real app, this would make an API call to save the review
    console.log('Review submitted:', { itemId, rating, review });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl quest-gradient flex items-center justify-center">
                <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-6 h-6" />
              </div>
              <div className="text-xl font-bold text-foreground">Quest AI</div>
            </div>
            <nav className="flex items-center space-x-1">
              <Button
                variant="ghost"
                onClick={() => navigate('/marketplace')}
                className="text-muted-foreground hover:text-foreground flex items-center space-x-2"
              >
                <ArrowLeft size={16} />
                <span>Back to Marketplace</span>
              </Button>
              <Button
                variant="ghost"
                className="text-foreground font-medium"
              >
                My Items
              </Button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search my items..."
                className="pl-10 w-64 bg-secondary border-border"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFavoritesOpen(true)}
              className="border-border hover:bg-accent"
            >
              <Star size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFullPageCartOpen(true)}
              className="relative border-border hover:bg-accent"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                  {cartItems.length}
                </Badge>
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-border hover:bg-accent flex items-center space-x-2 px-3"
                >
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="text-xs">U</AvatarFallback>
                  </Avatar>
                  <ChevronDown size={12} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
                <DropdownMenuItem>Request Agent</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* My Items Content */}
      <main className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Items</h1>
          <p className="text-muted-foreground">
            {purchasedItems.length} items purchased
          </p>
        </div>

        {purchasedItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-bold text-foreground mb-4">No items purchased yet</h2>
            <p className="text-muted-foreground mb-8">Browse our marketplace to find amazing products and services</p>
            <Button onClick={() => navigate('/marketplace')}>Browse Marketplace</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedItems.map((item) => (
              <Card key={item.id} className="bg-card border border-border hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  {/* Item Header */}
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <img src="/lovable-uploads/6afb39a4-7ab6-4eee-b62e-bf83a883bb52.png" alt="Quest AI" className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground mb-1 truncate">{item.name}</h3>
                      <Badge variant="outline" className="capitalize text-xs">
                        {item.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* User's Review Status */}
                  {userReviews[item.id] && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-primary">Your Rating:</span>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={i < userReviews[item.id].rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenModal(item)}
                      className="text-muted-foreground hover:text-foreground flex items-center space-x-1"
                    >
                      <ExternalLink size={14} />
                      <span>View Details</span>
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleReviewItem(item)}
                      className="flex items-center space-x-2"
                    >
                      <Star size={14} />
                      <span>
                        {userReviews[item.id] ? 'Edit Review' : 'Write Review'}
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Existing Modals */}
      <MarketplaceItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={addToCart}
        onToggleFavorite={toggleFavorite}
        isFavorited={selectedItem ? isFavorited(selectedItem.id) : false}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        items={favorites}
        onAddToCart={addToCart}
        onRemoveFavorite={(itemId) => 
          setFavorites(prev => prev.filter(i => i.id !== itemId))
        }
      />

      <FullPageCart
        isOpen={isFullPageCartOpen}
        onClose={() => setIsFullPageCartOpen(false)}
        items={cartItems}
        allItems={[]}
        onRemoveItem={removeFromCart}
        onAddToCart={addToCart}
        onToggleFavorite={toggleFavorite}
        onOpenModal={handleOpenModal}
        onCheckout={handleCheckout}
        isFavorited={isFavorited}
      />

      {/* Review Modal */}
      <ReviewModal
        item={selectedReviewItem}
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setSelectedReviewItem(null);
        }}
        onSubmitReview={handleSubmitReview}
        existingReview={selectedReviewItem ? userReviews[selectedReviewItem.id] : null}
      />
    </div>
  );
};

export default MyItems;
