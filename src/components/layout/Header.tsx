import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Heart, Menu, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MegaMenu from './MegaMenu';

const searchSuggestions = [
  'iPhone 15 Pro Max',
  'Samsung Galaxy S24',
  'MacBook Pro M3',
  'AirPods Pro',
  'PlayStation 5',
  'Nintendo Switch OLED',
  'Reloj inteligente',
  'Audífonos Bluetooth',
];

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = searchSuggestions.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-deep-space text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <span className="hidden md:block">🚀 Envío gratis en compras mayores a $150.000</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-vitality transition-colors">Centro de Ayuda</a>
              <a href="#" className="hover:text-vitality transition-colors">Mis Pedidos</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-card shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <a href="/" className="flex-shrink-0">
              <h1 className="font-display text-3xl font-extrabold text-deep-space">
                Ked<span className="text-vitality">i</span>vo
              </h1>
            </a>

            {/* Search Bar - Desktop */}
            <div ref={searchRef} className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full search-container">
                <div className="flex items-center w-full bg-muted rounded-full overflow-hidden border-2 border-transparent focus-within:border-vitality transition-all duration-300">
                  <input
                    type="text"
                    placeholder="Buscar productos, marcas y más..."
                    className="w-full px-6 py-3 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                  />
                  <Button className="btn-vitality rounded-full m-1 px-6">
                    <Search className="w-5 h-5" />
                  </Button>
                </div>

                {/* Search Suggestions */}
                <AnimatePresence>
                  {showSuggestions && searchQuery && filteredSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-xl border overflow-hidden z-50"
                    >
                      {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                        <button
                          key={index}
                          className="w-full px-6 py-3 text-left hover:bg-muted transition-colors flex items-center gap-3"
                          onClick={() => {
                            setSearchQuery(suggestion);
                            setShowSuggestions(false);
                          }}
                        >
                          <Search className="w-4 h-4 text-muted-foreground" />
                          <span>{suggestion}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <button className="hidden md:flex flex-col items-center text-muted-foreground hover:text-deep-space transition-colors">
                <User className="w-6 h-6" />
                <span className="text-xs mt-1">Cuenta</span>
              </button>
              <button className="hidden md:flex flex-col items-center text-muted-foreground hover:text-deep-space transition-colors">
                <Heart className="w-6 h-6" />
                <span className="text-xs mt-1">Favoritos</span>
              </button>
              <button className="relative flex flex-col items-center text-muted-foreground hover:text-deep-space transition-colors">
                <ShoppingCart className="w-6 h-6" />
                <span className="text-xs mt-1 hidden md:block">Carrito</span>
                <span className="absolute -top-1 -right-1 bg-vitality text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  3
                </span>
              </button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="hidden md:block border-t">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-8 py-3">
              <button
                className="flex items-center gap-2 font-semibold text-deep-space hover:text-vitality transition-colors"
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
              >
                <Menu className="w-5 h-5" />
                <span>Departamentos</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <a href="#" className="text-muted-foreground hover:text-deep-space transition-colors">Ofertas</a>
              <a href="#" className="text-muted-foreground hover:text-deep-space transition-colors">Nuevos</a>
              <a href="#" className="text-muted-foreground hover:text-deep-space transition-colors">Envío Gratis</a>
              <a href="#" className="text-cyber-mint font-semibold hover:text-vitality transition-colors">🔥 Flash Sale</a>
            </nav>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {showMegaMenu && (
            <div
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <MegaMenu />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-t overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="flex items-center bg-muted rounded-full overflow-hidden">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full px-4 py-3 bg-transparent outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button className="btn-vitality rounded-full m-1">
                    <Search className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <nav className="flex flex-col gap-2">
                <a href="#" className="py-2 text-foreground hover:text-vitality transition-colors">Departamentos</a>
                <a href="#" className="py-2 text-foreground hover:text-vitality transition-colors">Ofertas</a>
                <a href="#" className="py-2 text-foreground hover:text-vitality transition-colors">Nuevos</a>
                <a href="#" className="py-2 text-foreground hover:text-vitality transition-colors">Mi Cuenta</a>
                <a href="#" className="py-2 text-foreground hover:text-vitality transition-colors">Favoritos</a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
