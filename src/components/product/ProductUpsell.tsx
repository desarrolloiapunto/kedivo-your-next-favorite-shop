import { motion } from 'framer-motion';
import { ShoppingCart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UpsellProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
}

const upsellProducts: UpsellProduct[] = [
  {
    id: 1,
    name: 'Correa de Silicona Premium',
    price: 89000,
    originalPrice: 120000,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&q=80',
    discount: 26,
  },
  {
    id: 2,
    name: 'Protector de Pantalla HD',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&q=80',
  },
  {
    id: 3,
    name: 'Base de Carga Inalámbrica',
    price: 149000,
    originalPrice: 199000,
    image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=300&q=80',
    discount: 25,
  },
];

interface ProductUpsellProps {
  onAddToCart: (productId: number) => void;
}

const ProductUpsell = ({ onAddToCart }: ProductUpsellProps) => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-muted/30 rounded-2xl p-5 border border-border">
      <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="text-xl">🎯</span> Completa el set
        <span className="text-xs bg-vitality text-accent-foreground px-2 py-0.5 rounded-full ml-auto">
          10% extra
        </span>
      </h3>

      <div className="space-y-3">
        {upsellProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-card hover:shadow-md transition-shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm truncate">
                {product.name}
              </h4>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-deep-space">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onAddToCart(product.id)}
              className="w-10 h-10 rounded-full bg-vitality text-accent-foreground flex items-center justify-center shadow-md"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Bundle Deal */}
      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-cyber-mint/20 to-success/20 border border-success/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">Llévate los 3</p>
            <p className="text-sm text-muted-foreground">Ahorra {formatPrice(48000)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground line-through">{formatPrice(319000)}</p>
            <p className="font-display font-bold text-lg text-success">{formatPrice(271000)}</p>
          </div>
        </div>
        <Button className="w-full mt-3 btn-cyber rounded-xl">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Agregar bundle al carrito
        </Button>
      </div>
    </div>
  );
};

export default ProductUpsell;
