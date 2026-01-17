import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Star, Truck, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNational?: boolean;
  discount?: number;
  isNew?: boolean;
}

const ProductCard = ({
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  isNational = true,
  discount,
  isNew,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="product-card bg-card rounded-2xl overflow-hidden border border-border/50 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount && (
            <span className="bg-vitality text-accent-foreground px-2 py-1 rounded-lg text-xs font-bold">
              -{discount}%
            </span>
          )}
          {isNew && (
            <span className="bg-cyber-mint text-success-foreground px-2 py-1 rounded-lg text-xs font-bold">
              Nuevo
            </span>
          )}
        </div>

        {/* Shipping Badge */}
        <div className="absolute top-3 right-3">
          {isNational ? (
            <span className="badge-nacional flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold">
              <Truck className="w-3 h-3" /> 2-4 días
            </span>
          ) : (
            <span className="badge-internacional flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold">
              <Plane className="w-3 h-3" /> 15-20 días
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-card shadow-lg flex items-center justify-center transition-colors"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite ? 'fill-vitality text-vitality' : 'text-muted-foreground'
            }`}
          />
        </motion.button>

        {/* Quick Add Button */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-3 left-3 right-14"
            >
              <Button className="btn-vitality w-full rounded-xl py-2 text-sm flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Agregar
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>

        {/* Name */}
        <h3 className="font-medium text-foreground line-clamp-2 mb-2 min-h-[2.5rem] group-hover:text-vitality transition-colors">
          {name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-display text-xl font-bold text-deep-space">
            {formatPrice(price)}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
