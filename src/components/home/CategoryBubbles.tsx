import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Laptop,
  Home,
  Sparkles,
  Zap,
  Gift,
  Shirt,
  Gamepad2,
  HeartPulse,
  Package,
} from "lucide-react";
import { useCategoriesGraphQL } from "@/lib/hooks/useGraphQL";

// Icon mapping for categories
const getCategoryIcon = (slug: string) => {
  const iconMap: Record<string, any> = {
    tecnologia: Laptop,
    electronica: Laptop,
    hogar: Home,
    belleza: Sparkles,
    salud: HeartPulse,
    moda: Shirt,
    gaming: Gamepad2,
    regalos: Gift,
    ofertas: Zap,
  };

  return iconMap[slug] || Package;
};

// Color mapping for categories
const getCategoryColor = (slug: string) => {
  const colorMap: Record<string, string> = {
    tecnologia: "from-blue-500 to-blue-600",
    electronica: "from-blue-500 to-blue-600",
    hogar: "from-amber-500 to-orange-500",
    belleza: "from-pink-500 to-rose-500",
    salud: "from-red-500 to-rose-600",
    moda: "from-purple-500 to-violet-600",
    gaming: "from-green-500 to-emerald-600",
    regalos: "from-cyan-500 to-teal-600",
    ofertas: "from-vitality to-orange-600",
  };

  return colorMap[slug] || "from-gray-500 to-gray-600";
};

const CategoryBubbles = () => {
  const {
    data: categoriesData,
    isLoading: loading,
    error,
  } = useCategoriesGraphQL();
  const categories =
    categoriesData?.productCategories?.nodes?.slice(0, 8) || [];

  // Fallback images for categories
  const getCategoryImage = (slug: string) => {
    const imageMap: Record<string, string> = {
      tecnologia:
        "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=200&q=80",
      electronica:
        "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=200&q=80",
      hogar:
        "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=200&q=80",
      belleza:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80",
      salud:
        "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=200&q=80",
      moda: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&q=80",
      gaming:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&q=80",
      regalos:
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&q=80",
    };

    return (
      imageMap[slug] ||
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80"
    );
  };

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-8">
        <div className="text-center">Cargando categorías...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          Error al cargar categorías: {error.message}
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null; // Don't render if no categories
  }
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-deep-space">
          Explora Categorías
        </h2>
        <a href="#" className="text-vitality font-semibold hover:underline">
          Ver todas
        </a>
      </div>

      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((category: any, index: number) => {
          const IconComponent = getCategoryIcon(category.slug);
          const colorClass = getCategoryColor(category.slug);

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 min-w-[80px]"
            >
              <Link
                to={`/categoria/${category.slug}`}
                className="flex flex-col items-center gap-2"
              >
                <div className="category-bubble w-16 h-16 md:w-20 md:h-20 relative">
                  <img
                    src={getCategoryImage(category.slug)}
                    alt={category.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${colorClass} opacity-0 hover:opacity-80 transition-opacity flex items-center justify-center`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  {/* Animated ring */}
                  <motion.div
                    className="absolute -inset-1 rounded-full border-2 border-vitality opacity-0"
                    whileHover={{ opacity: 1, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground whitespace-nowrap">
                  {category.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({category.count})
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryBubbles;
