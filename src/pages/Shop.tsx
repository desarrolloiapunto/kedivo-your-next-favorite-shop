import { useState } from "react";
import { useProducts } from "@/lib/useWooCommerce";
import ProductGrid from "@/components/home/ProductGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    data: products,
    isLoading,
    error,
  } = useProducts({
    per_page: 20,
    ...(selectedCategory && { category: selectedCategory }),
  });

  const filteredProducts =
    products?.filter((product: any) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Cargando productos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          Error al cargar productos: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-deep-space mb-4">Tienda</h1>

        {/* Search and Filter Bar */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchTerm
              ? "No se encontraron productos con ese término de búsqueda."
              : "No hay productos disponibles."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Shop;
