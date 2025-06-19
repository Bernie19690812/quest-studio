import React, { useState } from 'react';
import { MarketplaceHeader } from '@/components/marketplace/MarketplaceHeader';
import { MarketplaceGrid } from '@/components/marketplace/MarketplaceGrid';
import { MarketplaceItemModal } from '@/components/marketplace/MarketplaceItemModal';
import { CartDrawer } from '@/components/marketplace/CartDrawer';
import { FavoritesDrawer } from '@/components/marketplace/FavoritesDrawer';
import { PaymentSuccessModal } from '@/components/marketplace/PaymentSuccessModal';
import { useMarketplace } from '@/hooks/useMarketplace';

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  category: 'solutions' | 'teams' | 'individuals';
  type: 'product' | 'service';
  tags: string[];
  featured?: boolean;
  level?: string;
}

const marketplaceItems: MarketplaceItem[] = [
  // Solutions
  {
    id: '1',
    name: 'AI-Powered Analytics Dashboard',
    description: 'Advanced analytics platform with machine learning insights for business intelligence and data visualization.',
    price: 299,
    rating: 4.8,
    reviewCount: 124,
    category: 'solutions',
    type: 'product',
    tags: ['Analytics', 'AI', 'Dashboard', 'Business Intelligence'],
    featured: true
  },
  {
    id: '2',
    name: 'Automated Customer Service Chatbot',
    description: '24/7 customer support solution that uses natural language processing to answer queries and resolve issues instantly.',
    price: 149,
    rating: 4.5,
    reviewCount: 89,
    category: 'solutions',
    type: 'service',
    tags: ['Customer Service', 'Chatbot', 'NLP', 'Automation']
  },
  {
    id: '3',
    name: 'Predictive Maintenance System',
    description: 'IoT-enabled system that predicts equipment failures and optimizes maintenance schedules to reduce downtime and costs.',
    price: 499,
    rating: 4.9,
    reviewCount: 156,
    category: 'solutions',
    type: 'product',
    tags: ['IoT', 'Predictive Maintenance', 'Machine Learning', 'Manufacturing']
  },

  // Teams
  {
    id: '4',
    name: 'Full-Stack Development Team',
    description: 'A team of experienced developers proficient in front-end, back-end, and database technologies, ready to build your web or mobile application.',
    price: 80,
    rating: 4.7,
    reviewCount: 62,
    category: 'teams',
    type: 'service',
    tags: ['Full-Stack', 'Web Development', 'Mobile App', 'React', 'Node.js']
  },
  {
    id: '5',
    name: 'AI Research Team',
    description: 'A team of AI researchers specializing in deep learning, computer vision, and natural language processing, available for research projects and consulting.',
    price: 120,
    rating: 4.6,
    reviewCount: 78,
    category: 'teams',
    type: 'service',
    tags: ['AI Research', 'Deep Learning', 'Computer Vision', 'NLP', 'TensorFlow']
  },

  // Individuals
  {
    id: '6',
    name: 'Senior Data Scientist',
    description: 'An experienced data scientist with a strong background in statistical modeling, machine learning, and data visualization.',
    price: 60,
    rating: 4.8,
    reviewCount: 95,
    category: 'individuals',
    type: 'service',
    tags: ['Data Science', 'Machine Learning', 'Statistical Modeling', 'Python', 'R'],
    level: 'Senior'
  },
  {
    id: '7',
    name: 'AI Consultant',
    description: 'An AI consultant with expertise in AI strategy, implementation, and ethical considerations, available for consulting engagements.',
    price: 80,
    rating: 4.9,
    reviewCount: 112,
    category: 'individuals',
    type: 'service',
    tags: ['AI Consulting', 'AI Strategy', 'Ethics', 'Implementation'],
    level: 'Expert'
  },
  {
    id: '8',
    name: 'Cloud Solutions Architect',
    description: 'A solutions architect specializing in cloud computing, DevOps, and infrastructure automation.',
    price: 75,
    rating: 4.7,
    reviewCount: 80,
    category: 'individuals',
    type: 'service',
    tags: ['Cloud Computing', 'AWS', 'Azure', 'DevOps', 'Automation'],
    level: 'Lead'
  },
];

const Marketplace = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedType,
    setSelectedType,
    selectedPriceRange,
    setSelectedPriceRange,
    showFilters,
    setShowFilters,
    cartItems,
    favorites,
    filteredItems,
    addToCart,
    removeFromCart,
    toggleFavorite,
    clearCart
  } = useMarketplace(marketplaceItems);

  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const handleCheckout = () => {
    setShowPaymentSuccess(true);
    setIsCartOpen(false);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <MarketplaceHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedPriceRange={selectedPriceRange}
          onPriceRangeChange={setSelectedPriceRange}
          cartItemsCount={cartItems.length}
          favoritesCount={favorites.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenFavorites={() => setIsFavoritesOpen(true)}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        <MarketplaceGrid
          filteredItems={filteredItems}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          cartItems={cartItems}
          favorites={favorites}
          onAddToCart={addToCart}
          onToggleFavorite={toggleFavorite}
          onOpenModal={setSelectedItem}
        />

        <MarketplaceItemModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={addToCart}
          onToggleFavorite={toggleFavorite}
          isFavorited={selectedItem ? favorites.some(fav => fav.id === selectedItem.id) : false}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
        />

        <FavoritesDrawer
          isOpen={isFavoritesOpen}
          onClose={() => setIsFavoritesOpen(false)}
          items={favorites}
          onToggleFavorite={toggleFavorite}
          onAddToCart={addToCart}
        />

        <PaymentSuccessModal
          isOpen={showPaymentSuccess}
          onClose={() => setShowPaymentSuccess(false)}
        />
      </div>
    </div>
  );
};

export default Marketplace;
