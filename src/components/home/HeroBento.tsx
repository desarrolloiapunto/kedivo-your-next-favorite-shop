import { motion } from 'framer-motion';
import { ArrowRight, Clock, Truck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroBento = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[220px]">
        {/* Main Hero - Oferta del día */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative col-span-1 md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden group cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
            alt="Oferta del día - Reloj inteligente"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent" />
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-vitality text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <Zap className="w-4 h-4" /> Oferta del Día
              </span>
              <span className="bg-success text-success-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <Truck className="w-3 h-3" /> Nacional
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-primary-foreground mb-2">
              Smartwatch Pro X
            </h2>
            <p className="text-primary-foreground/80 mb-4 max-w-md">
              Monitoreo de salud 24/7, GPS integrado y batería de 7 días
            </p>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-muted line-through text-lg">$899.000</span>
              <span className="font-display text-3xl font-bold text-vitality">$599.000</span>
              <span className="bg-vitality/20 text-vitality px-2 py-1 rounded text-sm font-bold">-33%</span>
            </div>
            <div className="flex items-center gap-3 text-primary-foreground/70 text-sm mb-4">
              <Clock className="w-4 h-4" />
              <span>Termina en: <strong className="text-vitality">02:45:30</strong></span>
            </div>
            <Button className="btn-vitality w-fit rounded-full group/btn">
              <span>Comprar Ahora</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </motion.div>

        {/* Secondary - Colección Global */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative col-span-1 md:col-span-2 rounded-3xl overflow-hidden group cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
            alt="Colección Global - Auriculares"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-space/90 to-transparent" />
          <div className="absolute inset-0 p-6 flex flex-col justify-center">
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold w-fit mb-2">
              🌍 Colección Internacional
            </span>
            <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-1">
              Audífonos Premium
            </h3>
            <p className="text-primary-foreground/70 text-sm">Desde $89.000</p>
          </div>
        </motion.div>

        {/* Tech Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden group cursor-pointer bg-gradient-to-br from-cyber-mint to-success"
        >
          <div className="absolute inset-0 p-5 flex flex-col justify-between">
            <div>
              <span className="text-success-foreground/80 text-xs font-medium">TECNOLOGÍA</span>
              <h3 className="font-display text-lg font-bold text-success-foreground">
                Accesorios Tech
              </h3>
            </div>
            <p className="text-success-foreground font-display text-2xl font-bold">
              Hasta 50% OFF
            </p>
          </div>
          <motion.div 
            className="absolute bottom-0 right-0 w-24 h-24 opacity-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" fill="currentColor" className="text-success-foreground">
              <circle cx="50" cy="50" r="40" strokeWidth="2" stroke="currentColor" fill="none" strokeDasharray="10 5" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Moda Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative rounded-3xl overflow-hidden group cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80"
            alt="Moda"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-space/90 to-transparent" />
          <div className="absolute inset-0 p-5 flex flex-col justify-end">
            <span className="text-primary-foreground/80 text-xs font-medium">MODA</span>
            <h3 className="font-display text-lg font-bold text-primary-foreground">
              Nueva Colección
            </h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBento;
