import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/home/ProductCard';
import CategoryFilters from '@/components/category/CategoryFilters';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

// Mock products data
const allProducts = [
  { id: 1, name: 'Audifonos Inalámbricos Pro Max con Cancelación de Ruido Activa', price: 299900, originalPrice: 449900, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', rating: 4.8, reviews: 234, isNational: true, discount: 33 },
  { id: 2, name: 'Smart Watch Ultra Series 9 GPS + Cellular', price: 1899900, originalPrice: 2199900, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', rating: 4.9, reviews: 567, isNational: false, discount: 14 },
  { id: 3, name: 'Laptop Gaming RTX 4060 16GB RAM 512GB SSD', price: 4599900, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', rating: 4.7, reviews: 89, isNational: true, isNew: true },
  { id: 4, name: 'Cámara Mirrorless 4K 24.2MP con Lente Kit', price: 3299900, originalPrice: 3899900, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400', rating: 4.6, reviews: 156, isNational: false, discount: 15 },
  { id: 5, name: 'Tablet Pro 12.9" M2 Chip 256GB WiFi', price: 5499900, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', rating: 4.9, reviews: 423, isNational: true, isNew: true },
  { id: 6, name: 'Consola Gaming Next Gen 1TB Bundle', price: 2799900, originalPrice: 3199900, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400', rating: 4.8, reviews: 892, isNational: true, discount: 13 },
  { id: 7, name: 'Monitor Curvo 34" WQHD 144Hz Gaming', price: 1899900, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400', rating: 4.5, reviews: 234, isNational: false },
  { id: 8, name: 'Teclado Mecánico RGB Wireless', price: 459900, originalPrice: 599900, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400', rating: 4.7, reviews: 567, isNational: true, discount: 23 },
  { id: 9, name: 'Mouse Gaming Inalámbrico 25600 DPI', price: 289900, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', rating: 4.6, reviews: 345, isNational: true, isNew: true },
  { id: 10, name: 'Parlante Bluetooth Portátil Waterproof', price: 199900, originalPrice: 299900, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', rating: 4.4, reviews: 678, isNational: false, discount: 33 },
  { id: 11, name: 'Drone 4K Pro con Gimbal 3 Ejes', price: 3499900, image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400', rating: 4.8, reviews: 123, isNational: false, isNew: true },
  { id: 12, name: 'Power Bank 20000mAh Fast Charge', price: 129900, originalPrice: 179900, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400', rating: 4.3, reviews: 890, isNational: true, discount: 28 },
  { id: 13, name: 'Auriculares Gaming 7.1 Surround', price: 349900, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400', rating: 4.5, reviews: 234, isNational: true },
  { id: 14, name: 'Webcam 4K Autofocus con Micrófono', price: 399900, originalPrice: 499900, image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400', rating: 4.6, reviews: 156, isNational: false, discount: 20 },
  { id: 15, name: 'Ring Light 18" LED Profesional', price: 249900, image: 'https://images.unsplash.com/photo-1516035645781-9f126e774e9e?w=400', rating: 4.4, reviews: 89, isNational: true },
  { id: 16, name: 'SSD NVMe 1TB Gen4 7000MB/s', price: 299900, originalPrice: 399900, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400', rating: 4.9, reviews: 456, isNational: true, discount: 25 },
];

const categoryNames: Record<string, string> = {
  tecnologia: 'Tecnología',
  hogar: 'Hogar & Decoración',
  belleza: 'Belleza & Cuidado Personal',
  ofertas: 'Ofertas Relámpago',
  moda: 'Moda',
  deportes: 'Deportes',
};

const PRODUCTS_PER_PAGE = 8;

export interface Filters {
  priceRange: [number, number];
  deliveryTime: string[];
  rating: number | null;
}

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const categoryName = categoryNames[slug || ''] || 'Categoría';
  
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 10000000],
    deliveryTime: [],
    rating: null,
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Price filter
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Delivery time filter
    if (filters.deliveryTime.length > 0) {
      result = result.filter((p) => {
        if (filters.deliveryTime.includes('nacional') && p.isNational) return true;
        if (filters.deliveryTime.includes('internacional') && !p.isNational) return true;
        return false;
      });
    }

    // Rating filter
    if (filters.rating) {
      result = result.filter((p) => p.rating >= filters.rating!);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'discount':
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
    }

    return result;
  }, [filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 10000000],
      deliveryTime: [],
      rating: null,
    });
    setCurrentPage(1);
  };

  const activeFiltersCount = 
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000000 ? 1 : 0) +
    filters.deliveryTime.length +
    (filters.rating ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-vitality transition-colors">Inicio</a>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{categoryName}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-deep-space mb-2">
            {categoryName}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} productos encontrados
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Filtros</h2>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-vitality hover:text-vitality/80"
                  >
                    Limpiar ({activeFiltersCount})
                  </Button>
                )}
              </div>
              <CategoryFilters filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-card rounded-xl border border-border/50">
              {/* Mobile Filter Button */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filtros
                    {activeFiltersCount > 0 && (
                      <span className="bg-vitality text-white text-xs px-2 py-0.5 rounded-full">
                        {activeFiltersCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center justify-between">
                      Filtros
                      {activeFiltersCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                          className="text-vitality hover:text-vitality/80"
                        >
                          Limpiar
                        </Button>
                      )}
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <CategoryFilters filters={filters} setFilters={setFilters} />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Active Filters Tags */}
              <div className="hidden lg:flex items-center gap-2 flex-wrap">
                {filters.deliveryTime.map((dt) => (
                  <span
                    key={dt}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-vitality/10 text-vitality rounded-full text-sm"
                  >
                    {dt === 'nacional' ? 'Nacional' : 'Internacional'}
                    <button
                      onClick={() =>
                        setFilters((f) => ({
                          ...f,
                          deliveryTime: f.deliveryTime.filter((d) => d !== dt),
                        }))
                      }
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {filters.rating && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-vitality/10 text-vitality rounded-full text-sm">
                    {filters.rating}+ estrellas
                    <button onClick={() => setFilters((f) => ({ ...f, rating: null }))}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-muted-foreground hidden sm:inline">Ordenar por:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevancia</SelectItem>
                    <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                    <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                    <SelectItem value="rating">Mejor Valorados</SelectItem>
                    <SelectItem value="newest">Más Nuevos</SelectItem>
                    <SelectItem value="discount">Mayor Descuento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${sortBy}-${currentPage}-${JSON.stringify(filters)}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
              >
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {paginatedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">
                  No se encontraron productos con los filtros seleccionados
                </p>
                <Button onClick={clearFilters} className="btn-vitality">
                  Limpiar Filtros
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? 'bg-vitality hover:bg-vitality/90' : ''}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
