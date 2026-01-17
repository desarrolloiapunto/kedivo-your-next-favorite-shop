import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max 256GB - Titanio Natural',
    price: 5499000,
    originalPrice: 6199000,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80',
    rating: 4.8,
    reviews: 342,
    isNational: true,
    discount: 11,
  },
  {
    id: 2,
    name: 'Samsung Galaxy Watch 6 Classic - Negro',
    price: 1299000,
    originalPrice: 1599000,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80',
    rating: 4.6,
    reviews: 128,
    isNational: true,
    discount: 19,
  },
  {
    id: 3,
    name: 'MacBook Air M3 15" 512GB - Medianoche',
    price: 7299000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    rating: 4.9,
    reviews: 89,
    isNational: true,
    isNew: true,
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5 Auriculares Bluetooth',
    price: 1499000,
    originalPrice: 1899000,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80',
    rating: 4.7,
    reviews: 256,
    isNational: false,
    discount: 21,
  },
  {
    id: 5,
    name: 'Nintendo Switch OLED - Blanco',
    price: 1799000,
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=600&q=80',
    rating: 4.8,
    reviews: 412,
    isNational: true,
  },
  {
    id: 6,
    name: 'Dyson V15 Detect Aspiradora Inalámbrica',
    price: 3299000,
    originalPrice: 3899000,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&q=80',
    rating: 4.5,
    reviews: 67,
    isNational: false,
    discount: 15,
  },
  {
    id: 7,
    name: 'Apple AirPods Pro 2da Generación',
    price: 1099000,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80',
    rating: 4.9,
    reviews: 534,
    isNational: true,
    isNew: true,
  },
  {
    id: 8,
    name: 'PlayStation 5 Digital Edition + 2 Controles',
    price: 2499000,
    originalPrice: 2899000,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&q=80',
    rating: 4.7,
    reviews: 289,
    isNational: true,
    discount: 14,
  },
];

const ProductGrid = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-deep-space">Productos Destacados</h2>
          <p className="text-muted-foreground">Los más vendidos de la semana</p>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button className="px-4 py-2 rounded-full bg-deep-space text-primary-foreground text-sm font-medium">
            Todos
          </button>
          <button className="px-4 py-2 rounded-full bg-muted text-muted-foreground hover:bg-deep-space hover:text-primary-foreground text-sm font-medium transition-colors">
            Tecnología
          </button>
          <button className="px-4 py-2 rounded-full bg-muted text-muted-foreground hover:bg-deep-space hover:text-primary-foreground text-sm font-medium transition-colors">
            Hogar
          </button>
          <button className="px-4 py-2 rounded-full bg-muted text-muted-foreground hover:bg-deep-space hover:text-primary-foreground text-sm font-medium transition-colors">
            Moda
          </button>
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </motion.div>

      <div className="flex justify-center mt-8">
        <button className="btn-vitality px-8 py-3 rounded-full font-semibold">
          Ver más productos
        </button>
      </div>
    </section>
  );
};

export default ProductGrid;
