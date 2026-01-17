import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const flashProducts = [
  {
    id: 1,
    name: 'Tablet Samsung Galaxy Tab S9',
    originalPrice: 2899000,
    price: 1999000,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80',
    sold: 78,
    total: 100,
  },
  {
    id: 2,
    name: 'Robot Aspirador Xiaomi S10',
    originalPrice: 1599000,
    price: 899000,
    image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=400&q=80',
    sold: 45,
    total: 50,
  },
  {
    id: 3,
    name: 'Cámara GoPro Hero 12 Black',
    originalPrice: 2199000,
    price: 1649000,
    image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=400&q=80',
    sold: 23,
    total: 30,
  },
  {
    id: 4,
    name: 'Kindle Paperwhite 16GB',
    originalPrice: 599000,
    price: 399000,
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80',
    sold: 89,
    total: 100,
  },
];

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-deep-space via-deep-space to-deep-space/90 rounded-3xl p-6 md:p-8 overflow-hidden relative">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-vitality/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyber-mint/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-12 h-12 rounded-2xl bg-vitality flex items-center justify-center"
              >
                <Zap className="w-6 h-6 text-accent-foreground" />
              </motion.div>
              <div>
                <h2 className="font-display text-2xl font-bold text-primary-foreground">
                  Flash Sale
                </h2>
                <p className="text-primary-foreground/70 text-sm">¡Ofertas que vuelan!</p>
              </div>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-vitality" />
              <span className="text-primary-foreground/70 text-sm">Termina en:</span>
              <div className="flex items-center gap-1">
                <span className="bg-vitality text-accent-foreground px-3 py-2 rounded-lg font-display font-bold text-xl">
                  {formatTime(timeLeft.hours)}
                </span>
                <span className="text-vitality font-bold text-xl">:</span>
                <span className="bg-vitality text-accent-foreground px-3 py-2 rounded-lg font-display font-bold text-xl">
                  {formatTime(timeLeft.minutes)}
                </span>
                <span className="text-vitality font-bold text-xl">:</span>
                <span className="bg-vitality text-accent-foreground px-3 py-2 rounded-lg font-display font-bold text-xl">
                  {formatTime(timeLeft.seconds)}
                </span>
              </div>
            </div>
          </div>

          {/* Products Carousel */}
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {flashProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="min-w-[220px] md:min-w-[260px] bg-card rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer group"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 left-2 bg-vitality text-accent-foreground px-2 py-1 rounded-lg text-xs font-bold animate-pulse-glow">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-foreground line-clamp-1 mb-2 text-sm">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-display font-bold text-lg text-vitality">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-xs text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="relative">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(product.sold / product.total) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          className="h-full bg-gradient-to-r from-vitality to-orange-400 rounded-full"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 block">
                        {product.sold}/{product.total} vendidos
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-card shadow-lg items-center justify-center hover:bg-vitality hover:text-accent-foreground transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-card shadow-lg items-center justify-center hover:bg-vitality hover:text-accent-foreground transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
