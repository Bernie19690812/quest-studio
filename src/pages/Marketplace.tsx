import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MarketplaceCard } from '@/components/marketplace/MarketplaceCard';
import { CartDrawer } from '@/components/marketplace/CartDrawer';
import { FavoritesDrawer } from '@/components/marketplace/FavoritesDrawer';
import { MarketplaceItemModal } from '@/components/marketplace/MarketplaceItemModal';
import { PaymentSuccessModal } from '@/components/marketplace/PaymentSuccessModal';
import { StripeCheckoutModal } from '@/components/marketplace/StripeCheckoutModal';

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  type: 'product' | 'service';
  image: string;
  isFavorite?: boolean;
}

const marketplaceItems: MarketplaceItem[] = [
  {
    id: '1',
    name: 'AI-Powered Content Generator',
    description: 'Generate high-quality content for your blog or website using AI.',
    price: 49,
    category: 'capabilities',
    type: 'product',
    image: '/images/item1.jpg',
  },
  {
    id: '2',
    name: 'Social Media Management Tool',
    description: 'Manage all your social media accounts in one place and schedule posts.',
    price: 29,
    category: 'solutions',
    type: 'product',
    image: '/images/item2.jpg',
  },
  {
    id: '3',
    name: 'Data Analysis Service',
    description: 'Get insights from your data with our expert data analysis service.',
    price: 99,
    category: 'teams',
    type: 'service',
    image: '/images/item3.jpg',
  },
  {
    id: '4',
    name: 'SEO Optimization Tool',
    description: 'Improve your website\'s SEO ranking with our powerful optimization tool.',
    price: 39,
    category: 'capabilities',
    type: 'product',
    image: '/images/item4.jpg',
  },
  {
    id: '5',
    name: 'Customer Support Chatbot',
    description: 'Provide 24/7 customer support with our AI-powered chatbot.',
    price: 79,
    category: 'solutions',
    type: 'product',
    image: '/images/item5.jpg',
  },
  {
    id: '6',
    name: 'Marketing Automation Service',
    description: 'Automate your marketing campaigns and save time and resources.',
    price: 129,
    category: 'individuals',
    type: 'service',
    image: '/images/item6.jpg',
  },
  {
    id: '7',
    name: 'AI-Powered Content Generator',
    description: 'Generate high-quality content for your blog or website using AI.',
    price: 49,
    category: 'capabilities',
    type: 'product',
    image: '/images/item1.jpg',
  },
  {
    id: '8',
    name: 'Social Media Management Tool',
    description: 'Manage all your social media accounts in one place and schedule posts.',
    price: 29,
    category: 'solutions',
    type: 'product',
    image: '/images/item2.jpg',
  },
  {
    id: '9',
    name: 'Data Analysis Service',
    description: 'Get insights from your data with our expert data analysis service.',
    price: 99,
    category: 'teams',
    type: 'service',
    image: '/images/item3.jpg',
  },
  {
    id: '10',
    name: 'SEO Optimization Tool',
    description: 'Improve your website\'s SEO ranking with our powerful optimization tool.',
    price: 39,
    category: 'capabilities',
    type: 'product',
    image: '/images/item4.jpg',
  },
  {
    id: '11',
    name: 'Customer Support Chatbot',
    description: 'Provide 24/7 customer support with our AI-powered chatbot.',
    price: 79,
    category: 'solutions',
    type: 'product',
    image: '/images/item5.jpg',
  },
  {
    id: '12',
    name: 'Marketing Automation Service',
    description: 'Automate your marketing campaigns and save time and resources.',
    price: 129,
    category: 'individuals',
    type: 'service',
    image: '/images/item6.jpg',
  },
];

export default function Marketplace() {
  const [cart, setCart] = useState<MarketplaceItem[]>([]);
  const [favorites, setFavorites] = useState<MarketplaceItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  useEffect(() => {
    // Load cart and favorites from local storage or database here
  }, []);

  const addToCart = (item: MarketplaceItem) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const toggleFavorite = (item: MarketplaceItem) => {
    if (favorites.some(fav => fav.id === item.id)) {
      setFavorites(favorites.filter(fav => fav.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  const removeFavorite = (itemId: string) => {
    setFavorites(favorites.filter(item => item.id !== itemId));
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePaymentSuccess = () => {
    setShowCheckout(false);
    setShowPaymentSuccess(true);
    setCart([]); // Clear the cart after successful payment
  };

  const filterItems = () => {
    let filtered = marketplaceItems;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    if (selectedPriceRange !== 'all') {
      const [min, max] = selectedPriceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(item => item.price >= min && item.price <= max);
      } else {
        filtered = filtered.filter(item => item.price >= min);
      }
    }

    return filtered;
  };

  const filteredItems = filterItems();

  const categoryGroups = {
    capabilities: marketplaceItems.filter(item => item.category === 'capabilities'),
    solutions: marketplaceItems.filter(item => item.category === 'solutions'),
    teams: marketplaceItems.filter(item => item.category === 'teams'),
    individuals: marketplaceItems.filter(item => item.category === 'individuals'),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">AI Marketplace</h1>
              <Badge variant="secondary" className="px-3 py-1">
                {filteredItems.length} items
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFavorites(true)}
                className="relative"
              >
                <Heart size={16} className="mr-2" />
                Favorites
                {favorites.length > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                    {favorites.length}
                  </Badge>
                )}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCart(true)}
                className="relative"
              >
                <ShoppingCart size={16} className="mr-2" />
                Cart
                {cart.length > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1 border border-border rounded-md text-sm"
              >
                <option value="all">All Categories</option>
                <option value="capabilities">Capabilities</option>
                <option value="solutions">Solutions</option>
                <option value="teams">Teams</option>
                <option value="individuals">Individuals</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Type:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-1 border border-border rounded-md text-sm"
              >
                <option value="all">All Types</option>
                <option value="product">Products</option>
                <option value="service">Services</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Price:</span>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="px-3 py-1 border border-border rounded-md text-sm"
              >
                <option value="all">All Prices</option>
                <option value="0-50">$0 - $50</option>
                <option value="51-100">$51 - $100</option>
                <option value="101-500">$101 - $500</option>
                <option value="500+">$500+</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedCategory === 'all' ? (
          <div className="space-y-12">
            {Object.entries(categoryGroups).map(([category, items]) => (
              <div key={category}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold capitalize">{category}</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    See all <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {items.slice(0, 8).map((item) => (
                    <MarketplaceCard
                      key={item.id}
                      item={item}
                      onAddToCart={addToCart}
                      onToggleFavorite={toggleFavorite}
                      onOpenModal={setSelectedItem}
                      isFavorited={favorites.some(fav => fav.id === item.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <MarketplaceCard
                key={item.id}
                item={item}
                onAddToCart={addToCart}
                onToggleFavorite={toggleFavorite}
                onOpenModal={setSelectedItem}
                isFavorited={favorites.some(fav => fav.id === item.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        items={cart}
        allItems={marketplaceItems}
        onRemoveItem={removeFromCart}
        onAddToCart={addToCart}
        onToggleFavorite={toggleFavorite}
        onOpenModal={setSelectedItem}
        onCheckout={handleCheckout}
        isFavorited={(itemId: string) => favorites.some(fav => fav.id === itemId)}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        items={favorites}
        onAddToCart={addToCart}
        onRemoveFavorite={removeFavorite}
      />

      {/* Item Modal */}
      {selectedItem && (
        <MarketplaceItemModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={addToCart}
          onToggleFavorite={toggleFavorite}
          isFavorited={favorites.some(fav => fav.id === selectedItem.id)}
        />
      )}

      {/* Payment Success Modal */}
      <PaymentSuccessModal
        isOpen={showPaymentSuccess}
        onClose={() => setShowPaymentSuccess(false)}
        purchasedItems={cart}
        onGoToStudio={() => {
          setShowPaymentSuccess(false);
          // Navigate to studio or handle the action
        }}
      />

      {/* Stripe Checkout Modal */}
      <StripeCheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        items={cart}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
