import { motion } from 'framer-motion';
import { Truck, Plane, ArrowRight } from 'lucide-react';

const PromoSection = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* National Shipping Promo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-cyber-mint to-success p-6 md:p-8 cursor-pointer group"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Truck className="w-5 h-5 text-success-foreground" />
              </div>
              <span className="text-success-foreground/80 font-medium">Envío Nacional</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-success-foreground mb-2">
              Envío GRATIS
            </h3>
            <p className="text-success-foreground/80 mb-4 max-w-xs">
              En compras mayores a $150.000 con entrega en 2-4 días hábiles
            </p>
            <button className="flex items-center gap-2 text-success-foreground font-semibold group-hover:gap-3 transition-all">
              Ver productos elegibles
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {/* Decorative element */}
          <div className="absolute right-0 bottom-0 w-32 h-32 opacity-20">
            <Truck className="w-full h-full" />
          </div>
        </motion.div>

        {/* International Shipping Promo */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-600 to-violet-600 p-6 md:p-8 cursor-pointer group"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-white/80 font-medium">Colección Global</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
              +1 Millón de Productos
            </h3>
            <p className="text-white/80 mb-4 max-w-xs">
              Accede a productos exclusivos de todo el mundo con envío seguro
            </p>
            <button className="flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
              Explorar colección
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {/* Decorative element */}
          <div className="absolute right-0 bottom-0 w-32 h-32 opacity-20">
            <Plane className="w-full h-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoSection;
