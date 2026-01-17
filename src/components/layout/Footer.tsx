import { motion } from 'framer-motion';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail,
  CreditCard,
  Shield,
  Truck,
  RotateCcw
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-deep-space text-primary-foreground">
      {/* Features Bar */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-vitality/20 flex items-center justify-center">
                <Truck className="w-6 h-6 text-vitality" />
              </div>
              <div>
                <p className="font-semibold">Envío Rápido</p>
                <p className="text-sm text-primary-foreground/70">Entrega en 2-4 días</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyber-mint/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-cyber-mint" />
              </div>
              <div>
                <p className="font-semibold">Compra Segura</p>
                <p className="text-sm text-primary-foreground/70">100% protegida</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                <RotateCcw className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="font-semibold">Devoluciones</p>
                <p className="text-sm text-primary-foreground/70">30 días garantía</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <p className="font-semibold">Pago Fácil</p>
                <p className="text-sm text-primary-foreground/70">Múltiples métodos</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h2 className="font-display text-3xl font-extrabold mb-4">
              Ked<span className="text-vitality">i</span>vo
            </h2>
            <p className="text-primary-foreground/70 mb-6">
              Tu tienda departamental online con los mejores productos nacionales e internacionales.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-vitality transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-vitality transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-vitality transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-vitality transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Comprar</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/70 hover:text-vitality transition-colors">Ofertas del Día</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-vitality transition-colors">Flash Sale</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-vitality transition-colors">Nuevos Productos</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-vitality transition-colors">Más Vendidos</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-vitality transition-colors">Cupones</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Ayuda</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary-foreground/70 hover:text-vitality transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-vitality transition-colors">Seguir mi Pedido</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-vitality transition-colors">Devoluciones</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-vitality transition-colors">Políticas de Envío</a></li>
              <li><a href="#" className="text-primary-foreground/70 hover:text-vitality transition-colors">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <MapPin className="w-5 h-5 text-vitality" />
                <span>Bogotá, Colombia</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <Phone className="w-5 h-5 text-vitality" />
                <span>+57 1 800 123 456</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <Mail className="w-5 h-5 text-vitality" />
                <span>hola@kedivo.com</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm text-primary-foreground/70 mb-2">Suscríbete a ofertas exclusivas</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:border-vitality transition-colors"
                />
                <button className="btn-vitality px-4 py-2 rounded-lg font-semibold">
                  Unirse
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/50">
              © 2024 Kedivo. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/50">
              <a href="#" className="hover:text-vitality transition-colors">Términos y Condiciones</a>
              <a href="#" className="hover:text-vitality transition-colors">Privacidad</a>
              <a href="#" className="hover:text-vitality transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
