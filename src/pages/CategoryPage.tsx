import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { useProductsByCategoryGraphQL } from "@/lib/hooks/useGraphQL";
import { normalizeProducts } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/home/ProductCard";
import CategoryFilters from "@/components/category/CategoryFilters";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const categoryNames: Record<string, string> = {
  tecnologia: "Tecnología",
  hogar: "Hogar & Decoración",
  belleza: "Belleza & Cuidado Personal",
  ofertas: "Ofertas Relámpago",
  moda: "Moda",
  deportes: "Deportes",
};

const PRODUCTS_PER_PAGE = 8;

export interface Filters {
  priceRange: [number, number];
  deliveryTime: string[];
  rating: number | null;
}

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const categoryName = categoryNames[slug || ""] || "Categoría";

  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 10000000],
    deliveryTime: [],
    rating: null,
  });
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Fetch products from GraphQL
  const {
    data: productsData,
    isLoading,
    error,
  } = useProductsByCategoryGraphQL(slug!, {
    first: 50, // Fetch more products for client-side filtering
  });

  const rawProducts = productsData?.nodes
    ? normalizeProducts(productsData.nodes)
    : [];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...rawProducts];

    // Price filter
    result = result.filter((p) => {
      const price = parseFloat(p.price || "0");
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Rating filter
    if (filters.rating) {
      result = result.filter((p) => (p.averageRating || 0) >= filters.rating!);
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort(
          (a, b) => parseFloat(a.price || "0") - parseFloat(b.price || "0"),
        );
        break;
      case "price-desc":
        result.sort(
          (a, b) => parseFloat(b.price || "0") - parseFloat(a.price || "0"),
        );
        break;
      case "rating":
        result.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        break;
      case "newest":
        // For now, sort by ID (newer products might have higher IDs)
        result.sort((a, b) => b.databaseId - a.databaseId);
        break;
    }

    return result;
  }, [rawProducts, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
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
          <a href="/" className="hover:text-vitality transition-colors">
            Inicio
          </a>
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
              <Sheet
                open={mobileFiltersOpen}
                onOpenChange={setMobileFiltersOpen}
              >
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="lg:hidden flex items-center gap-2"
                  >
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
                    <CategoryFilters
                      filters={filters}
                      setFilters={setFilters}
                    />
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
                    {dt === "nacional" ? "Nacional" : "Internacional"}
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
                    <button
                      onClick={() =>
                        setFilters((f) => ({ ...f, rating: null }))
                      }
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  Ordenar por:
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevancia</SelectItem>
                    <SelectItem value="price-asc">
                      Precio: Menor a Mayor
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Precio: Mayor a Menor
                    </SelectItem>
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
                  <ProductCard
                    key={product.id}
                    id={product.databaseId}
                    name={product.name}
                    price={parseFloat(product.price || "0")}
                    originalPrice={
                      product.regularPrice
                        ? parseFloat(product.regularPrice)
                        : undefined
                    }
                    image={product.image?.sourceUrl || ""}
                    rating={product.averageRating || 0}
                    reviews={product.reviewCount || 0}
                    isNational={true} // Default to national shipping
                    isNew={product.status === "publish" && product.featured}
                  />
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
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={
                          currentPage === page
                            ? "bg-vitality hover:bg-vitality/90"
                            : ""
                        }
                      >
                        {page}
                      </Button>
                    ),
                  )}
                </div>

                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
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
