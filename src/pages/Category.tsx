import { useParams } from "react-router-dom";
import { useProductsGraphQL } from "@/lib/hooks/useGraphQL";
import ProductGrid from "@/components/home/ProductGrid";

const Category = () => {
  const { slug } = useParams();

  const {
    data: productsData,
    loading,
    error,
  } = useProductsGraphQL({
    first: 20,
    where: { category: slug },
  });

  const products = productsData?.products?.nodes || [];

  if (loading) {
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
        <h1 className="text-3xl font-bold text-deep-space mb-4 capitalize">
          Categoría: {slug?.replace("-", " ")}
        </h1>
      </div>

      {products.length > 0 ? (
        <ProductGrid
          products={products}
          title={`Productos en ${slug?.replace("-", " ")}`}
          showFilters={false}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No hay productos disponibles en esta categoría.
          </p>
        </div>
      )}
    </div>
  );
};

export default Category;
