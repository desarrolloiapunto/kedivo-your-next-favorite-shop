import { motion } from 'framer-motion';
import { Laptop, Home, Sparkles, Zap, Gift, Shirt, Gamepad2, HeartPulse } from 'lucide-react';

const categories = [
  { icon: Laptop, name: 'Tecnología', color: 'from-blue-500 to-blue-600', image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=200&q=80' },
  { icon: Home, name: 'Hogar', color: 'from-amber-500 to-orange-500', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=200&q=80' },
  { icon: Sparkles, name: 'Belleza', color: 'from-pink-500 to-rose-500', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80' },
  { icon: Zap, name: 'Ofertas', color: 'from-vitality to-orange-600', image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=200&q=80' },
  { icon: Shirt, name: 'Moda', color: 'from-purple-500 to-violet-600', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&q=80' },
  { icon: Gamepad2, name: 'Gaming', color: 'from-green-500 to-emerald-600', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&q=80' },
  { icon: HeartPulse, name: 'Salud', color: 'from-red-500 to-rose-600', image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=200&q=80' },
  { icon: Gift, name: 'Regalos', color: 'from-cyan-500 to-teal-600', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&q=80' },
];

const CategoryBubbles = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-deep-space">Explora Categorías</h2>
        <a href="#" className="text-vitality font-semibold hover:underline">Ver todas</a>
      </div>
      
      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((category, index) => (
          <motion.button
            key={category.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-2 min-w-[80px]"
          >
            <div className="category-bubble w-16 h-16 md:w-20 md:h-20 relative">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover rounded-full"
              />
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${category.color} opacity-0 hover:opacity-80 transition-opacity flex items-center justify-center`}>
                <category.icon className="w-8 h-8 text-white" />
              </div>
              {/* Animated ring */}
              <motion.div
                className="absolute -inset-1 rounded-full border-2 border-vitality opacity-0"
                whileHover={{ opacity: 1, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-sm font-medium text-foreground whitespace-nowrap">{category.name}</span>
          </motion.button>
        ))}
      </div>
    </section>
  );
};

export default CategoryBubbles;
