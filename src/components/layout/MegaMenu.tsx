import { motion } from 'framer-motion';
import { Laptop, Home, Sparkles, Gift, Shirt, Gamepad2, Car, Baby, Dumbbell } from 'lucide-react';

const categories = [
  {
    icon: Laptop,
    name: 'Tecnología',
    subcategories: ['Celulares', 'Computadores', 'Audio', 'Gaming', 'Accesorios'],
  },
  {
    icon: Home,
    name: 'Hogar',
    subcategories: ['Muebles', 'Decoración', 'Cocina', 'Baño', 'Jardín'],
  },
  {
    icon: Sparkles,
    name: 'Belleza',
    subcategories: ['Maquillaje', 'Cuidado Facial', 'Perfumes', 'Cabello', 'Uñas'],
  },
  {
    icon: Shirt,
    name: 'Moda',
    subcategories: ['Hombre', 'Mujer', 'Niños', 'Zapatos', 'Accesorios'],
  },
  {
    icon: Gamepad2,
    name: 'Gaming',
    subcategories: ['Consolas', 'Videojuegos', 'Accesorios', 'PC Gaming', 'Sillas'],
  },
  {
    icon: Gift,
    name: 'Regalos',
    subcategories: ['Para Ella', 'Para Él', 'Niños', 'Experiencias', 'Personalizado'],
  },
  {
    icon: Dumbbell,
    name: 'Deportes',
    subcategories: ['Fitness', 'Running', 'Ciclismo', 'Outdoor', 'Suplementos'],
  },
  {
    icon: Baby,
    name: 'Bebés',
    subcategories: ['Coches', 'Alimentación', 'Ropa', 'Juguetes', 'Cuidado'],
  },
  {
    icon: Car,
    name: 'Autos',
    subcategories: ['Accesorios', 'Audio', 'Limpieza', 'Herramientas', 'Repuestos'],
  },
];

const MegaMenu = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 right-0 mega-menu z-50"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-vitality transition-colors">
                  <category.icon className="w-5 h-5 text-deep-space group-hover:text-accent-foreground transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-deep-space group-hover:text-vitality transition-colors">
                  {category.name}
                </h3>
              </div>
              <ul className="space-y-2">
                {category.subcategories.map((sub) => (
                  <li key={sub}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-vitality hover:translate-x-1 transition-all inline-block"
                    >
                      {sub}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Promo Banner */}
        <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-deep-space to-deep-space/80 text-primary-foreground flex items-center justify-between">
          <div>
            <p className="font-display font-bold text-lg">🎉 Descuento de Bienvenida</p>
            <p className="text-sm opacity-80">Usa el código KEDIVO10 y obtén 10% de descuento en tu primera compra</p>
          </div>
          <button className="btn-vitality px-6 py-2 rounded-full font-semibold text-sm">
            Comprar Ahora
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenu;
