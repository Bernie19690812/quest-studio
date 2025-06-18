
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, ShoppingCart, Heart, Filter, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MarketplaceCard } from '@/components/marketplace/MarketplaceCard';
import { MarketplaceItemModal } from '@/components/marketplace/MarketplaceItemModal';
import { CartDrawer } from '@/components/marketplace/CartDrawer';
import { FavoritesDrawer } from '@/components/marketplace/FavoritesDrawer';
import { FilterBar } from '@/components/marketplace/FilterBar';
import { CategorySection } from '@/components/marketplace/CategorySection';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  category: 'solutions' | 'capabilities' | 'individuals' | 'teams';
  type: 'product' | 'service';
  featured?: boolean;
  level?: string;
  teamMembers?: string[];
  reviews?: Review[];
}

export interface Review {
  id: string;
  rating: number;
  reviewer: string;
  company?: string;
  comment: string;
  date: string;
}

const Marketplace = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [cartItems, setCartItems] = useState<MarketplaceItem[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<Set<string>>(new Set());

  // Sample data with enhanced teams and reviews
  const marketplaceItems: MarketplaceItem[] = [
    // Solutions
    {
      id: '1',
      name: 'AI Content Generator',
      description: 'Advanced AI-powered tool for generating high-quality content across multiple formats and industries.',
      price: 299,
      rating: 4.8,
      reviewCount: 124,
      tags: ['AI', 'Content', 'Marketing', 'Automation'],
      category: 'solutions',
      type: 'product',
      featured: true,
      reviews: [
        { id: '1', rating: 5, reviewer: 'Sarah Chen', company: 'TechCorp', comment: 'Incredible tool that has revolutionized our content creation process. The AI understands context perfectly.', date: '2024-06-10' },
        { id: '2', rating: 4, reviewer: 'Mike Rodriguez', company: 'StartupX', comment: 'Great functionality, saves us hours of work daily. Some minor UI improvements could be made.', date: '2024-06-08' },
        { id: '3', rating: 5, reviewer: 'Emily Watson', comment: 'Best investment we made this year. The quality of generated content is outstanding.', date: '2024-06-05' },
        { id: '4', rating: 5, reviewer: 'David Park', company: 'MediaFlow', comment: 'Seamless integration with our existing workflow. Highly recommended for any content team.', date: '2024-06-03' },
        { id: '5', rating: 4, reviewer: 'Lisa Thompson', company: 'Creative Agency', comment: 'Powerful features and great support team. Minor learning curve but worth it.', date: '2024-06-01' },
        { id: '6', rating: 5, reviewer: 'James Wilson', comment: 'Game changer for our marketing campaigns. The variety of content types is impressive.', date: '2024-05-30' }
      ]
    },
    {
      id: '2',
      name: 'Data Analytics Dashboard',
      description: 'Comprehensive analytics platform with real-time insights and customizable reporting features.',
      price: 199,
      rating: 4.6,
      reviewCount: 89,
      tags: ['Analytics', 'Dashboard', 'Data', 'Reporting'],
      category: 'solutions',
      type: 'product',
      reviews: [
        { id: '7', rating: 5, reviewer: 'Alex Kumar', company: 'DataTech', comment: 'Excellent visualization capabilities and intuitive interface. Perfect for our data team.', date: '2024-06-12' },
        { id: '8', rating: 4, reviewer: 'Rachel Green', company: 'Insights Co', comment: 'Good product with solid features. Could use more customization options.', date: '2024-06-09' },
        { id: '9', rating: 5, reviewer: 'Tom Bradley', comment: 'Outstanding real-time performance and easy to set up. Highly recommend.', date: '2024-06-07' },
        { id: '10', rating: 4, reviewer: 'Nina Patel', company: 'Analytics Plus', comment: 'Great value for money. The reporting features are comprehensive.', date: '2024-06-04' },
        { id: '11', rating: 5, reviewer: 'Chris Lee', comment: 'Best dashboard solution we\'ve tried. Clean design and powerful features.', date: '2024-06-02' }
      ]
    },

    // Teams - Updated with cross-functional teams
    {
      id: '3',
      name: 'W4D Squad',
      description: 'Elite cross-functional team specializing in full-stack development, agile methodologies, and product delivery.',
      price: 150,
      rating: 4.9,
      reviewCount: 67,
      tags: ['Full-Stack', 'Agile', 'React', 'Node.js', 'Scrum'],
      category: 'teams',
      type: 'service',
      teamMembers: ['Scrum Master', 'Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'QA Engineer'],
      reviews: [
        { id: '12', rating: 5, reviewer: 'Jennifer Adams', company: 'TechFlow', comment: 'W4D Squad delivered exceptional results. Their agile approach and technical expertise are unmatched.', date: '2024-06-11' },
        { id: '13', rating: 5, reviewer: 'Marcus Johnson', company: 'StartupVenture', comment: 'Incredible team collaboration and delivery speed. They understood our vision perfectly.', date: '2024-06-08' },
        { id: '14', rating: 4, reviewer: 'Anna Rodriguez', comment: 'Professional team with great communication skills. Delivered on time and within budget.', date: '2024-06-06' },
        { id: '15', rating: 5, reviewer: 'Robert Chen', company: 'InnovateCorp', comment: 'Best development team we\'ve worked with. Highly technical and process-oriented.', date: '2024-06-04' },
        { id: '16', rating: 5, reviewer: 'Sophie Miller', company: 'Digital Solutions', comment: 'Outstanding project management and technical delivery. Will definitely work with them again.', date: '2024-06-01' }
      ]
    },
    {
      id: '4',
      name: 'BuildForce',
      description: 'Dynamic team of builders focused on scalable web applications and modern development practices.',
      price: 135,
      rating: 4.7,
      reviewCount: 45,
      tags: ['Web Development', 'Scalability', 'Modern Stack', 'DevOps'],
      category: 'teams',
      type: 'service',
      teamMembers: ['Technical Lead', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'Product Manager'],
      reviews: [
        { id: '17', rating: 5, reviewer: 'Kevin Park', company: 'ScaleUp Inc', comment: 'BuildForce transformed our infrastructure. Their scalability expertise is impressive.', date: '2024-06-10' },
        { id: '18', rating: 4, reviewer: 'Lisa Wang', company: 'GrowthTech', comment: 'Solid technical skills and good project management. Delivered quality work.', date: '2024-06-07' },
        { id: '19', rating: 5, reviewer: 'Daniel Smith', comment: 'Excellent team for complex web applications. Their modern approach is refreshing.', date: '2024-06-05' },
        { id: '20', rating: 4, reviewer: 'Maria Gonzalez', company: 'WebSolutions', comment: 'Great collaboration and technical expertise. Minor communication improvements needed.', date: '2024-06-03' },
        { id: '21', rating: 5, reviewer: 'Andrew Lee', company: 'TechBuild', comment: 'Outstanding results and professional approach. Highly recommend for any web project.', date: '2024-05-31' }
      ]
    },
    {
      id: '5',
      name: 'SprintCore',
      description: 'Agile-focused team delivering rapid prototypes and MVP development with continuous integration practices.',
      price: 120,
      rating: 4.8,
      reviewCount: 52,
      tags: ['Agile', 'MVP', 'Prototyping', 'CI/CD', 'Rapid Development'],
      category: 'teams',
      type: 'service',
      teamMembers: ['Agile Coach', 'Full-Stack Developer', 'Frontend Specialist', 'Backend Engineer', 'QA Tester'],
      reviews: [
        { id: '22', rating: 5, reviewer: 'Sarah Johnson', company: 'QuickStart', comment: 'SprintCore helped us launch our MVP in record time. Their agile expertise is exceptional.', date: '2024-06-09' },
        { id: '23', rating: 5, reviewer: 'Michael Brown', company: 'RapidTech', comment: 'Perfect for fast-paced development. Great communication and delivery speed.', date: '2024-06-06' },
        { id: '24', rating: 4, reviewer: 'Emma Davis', comment: 'Excellent prototyping skills and agile methodology. Very responsive team.', date: '2024-06-04' },
        { id: '25', rating: 5, reviewer: 'Jason Wong', company: 'StartupAccel', comment: 'They understand startup needs perfectly. Quick iterations and quality delivery.', date: '2024-06-02' },
        { id: '26', rating: 4, reviewer: 'Nicole Taylor', company: 'InnovateNow', comment: 'Good agile practices and technical skills. Helped us validate our product quickly.', date: '2024-05-30' }
      ]
    },

    // Individuals
    {
      id: '6',
      name: 'Alex Chen',
      description: 'Senior Full-Stack Developer with expertise in React, Node.js, and cloud architecture. 8+ years of experience.',
      price: 95,
      rating: 4.9,
      reviewCount: 156,
      tags: ['React', 'Node.js', 'AWS', 'TypeScript', 'GraphQL'],
      category: 'individuals',
      type: 'service',
      level: 'Senior',
      reviews: [
        { id: '27', rating: 5, reviewer: 'Mark Thompson', company: 'CloudTech', comment: 'Alex is an exceptional developer. Delivered complex features with clean, maintainable code.', date: '2024-06-12' },
        { id: '28', rating: 5, reviewer: 'Linda Martinez', company: 'WebCorp', comment: 'Outstanding technical skills and great communication. Highly professional and reliable.', date: '2024-06-09' },
        { id: '29', rating: 4, reviewer: 'Peter Kim', comment: 'Solid full-stack skills and good problem-solving abilities. Would work with again.', date: '2024-06-07' },
        { id: '30', rating: 5, reviewer: 'Grace Liu', company: 'TechStart', comment: 'Alex helped us scale our application efficiently. Deep knowledge of cloud architecture.', date: '2024-06-05' },
        { id: '31', rating: 5, reviewer: 'Brian Wilson', company: 'DevSolutions', comment: 'Excellent developer with strong TypeScript and React skills. Delivered ahead of schedule.', date: '2024-06-03' },
        { id: '32', rating: 4, reviewer: 'Amanda Foster', comment: 'Great technical expertise and collaborative approach. Minor improvements in documentation.', date: '2024-06-01' }
      ]
    },

    // Capabilities
    {
      id: '7',
      name: 'Advanced Authentication',
      description: 'Comprehensive authentication solution with multi-factor authentication and social login integration.',
      price: 149,
      rating: 4.7,
      reviewCount: 78,
      tags: ['Authentication', 'Security', 'OAuth', 'MFA', 'SSO'],
      category: 'capabilities',
      type: 'product',
      reviews: [
        { id: '33', rating: 5, reviewer: 'John Davis', company: 'SecureTech', comment: 'Robust authentication system with excellent security features. Easy integration.', date: '2024-06-11' },
        { id: '34', rating: 4, reviewer: 'Mary Johnson', company: 'AuthSolutions', comment: 'Good security features and documentation. Some setup complexity but worth it.', date: '2024-06-08' },
        { id: '35', rating: 5, reviewer: 'Steve Rodriguez', comment: 'Perfect for our enterprise needs. Multi-factor authentication works flawlessly.', date: '2024-06-06' },
        { id: '36', rating: 4, reviewer: 'Jennifer Lee', company: 'SafeLogin', comment: 'Comprehensive solution with good support. Minor UI improvements needed.', date: '2024-06-04' },
        { id: '37', rating: 5, reviewer: 'Carlos Garcia', company: 'TechSecure', comment: 'Excellent authentication platform. Social login integration is seamless.', date: '2024-06-02' }
      ]
    }
  ];

  const [filters, setFilters] = useState({
    category: '',
    type: '',
    priceRange: { min: 0, max: 1000 },
    rating: 0,
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const applyFilters = (item: MarketplaceItem): boolean => {
    if (filters.category && item.category !== filters.category) {
      return false;
    }
    if (filters.type && item.type !== filters.type) {
      return false;
    }
    if (item.price < filters.priceRange.min || item.price > filters.priceRange.max) {
      return false;
    }
    if (item.rating < filters.rating) {
      return false;
    }
    return true;
  };

  const filteredItems = useMemo(() => {
    return marketplaceItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    });
  }, [searchTerm]);

  const handleAddToCart = (item: MarketplaceItem) => {
    setCartItems(prev => [...prev, item]);
  };

  const handleToggleFavorite = (item: MarketplaceItem) => {
    setFavoriteItems(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(item.id)) {
        newFavorites.delete(item.id);
      } else {
        newFavorites.add(item.id);
      }
      return newFavorites;
    });
  };

  const handleOpenModal = (item: MarketplaceItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const isFavorited = (itemId: string) => favoriteItems.has(itemId);

  const groupedItems = {
    solutions: filteredItems.filter(item => item.category === 'solutions'),
    capabilities: filteredItems.filter(item => item.category === 'capabilities'),
    individuals: filteredItems.filter(item => item.category === 'individuals'),
    teams: filteredItems.filter(item => item.category === 'teams'),
  };

  const handleSeeMore = (category: string) => {
    // Handle see more functionality
    console.log('See more for category:', category);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft size={16} />
                <span>Studio</span>
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-semibold text-foreground">Quest AI Marketplace</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>

              {/* Favorites */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFavoritesOpen(true)}
                className="relative"
              >
                <Heart size={20} />
                {favoriteItems.size > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {favoriteItems.size}
                  </Badge>
                )}
              </Button>

              {/* Profile Avatar */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" alt="User" />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        JD
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem onClick={() => navigate('/my-items')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Items</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Search solutions, capabilities, people..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filter Bar */}
        <FilterBar 
          category=""
          activeFilters={[]}
          onFilterToggle={() => {}}
          onClearFilters={() => {}}
        />

        {/* Category Sections */}
        <div className="space-y-12">
          {/* Solutions */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Solutions</h2>
            <CategorySection
              items={groupedItems.solutions}
              category="solutions"
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              onOpenModal={handleOpenModal}
              onSeeMore={handleSeeMore}
              isFavorited={isFavorited}
            />
          </section>

          {/* Capabilities */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Capabilities</h2>
            <CategorySection
              items={groupedItems.capabilities}
              category="capabilities"
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              onOpenModal={handleOpenModal}
              onSeeMore={handleSeeMore}
              isFavorited={isFavorited}
            />
          </section>

          {/* Teams */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Teams</h2>
            <CategorySection
              items={groupedItems.teams}
              category="teams"
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              onOpenModal={handleOpenModal}
              onSeeMore={handleSeeMore}
              isFavorited={isFavorited}
            />
          </section>

          {/* Individuals */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Individuals</h2>
            <CategorySection
              items={groupedItems.individuals}
              category="individuals"
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              onOpenModal={handleOpenModal}
              onSeeMore={handleSeeMore}
              isFavorited={isFavorited}
            />
          </section>
        </div>
      </main>

      {/* Modals and Drawers */}
      <MarketplaceItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
        isFavorited={selectedItem ? isFavorited(selectedItem.id) : false}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={(itemId) => setCartItems(prev => prev.filter(item => item.id !== itemId))}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        items={marketplaceItems.filter(item => favoriteItems.has(item.id))}
        onOpenModal={handleOpenModal}
      />
    </div>
  );
};

export default Marketplace;
