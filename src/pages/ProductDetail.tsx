import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  ShoppingCart, 
  Truck, 
  Shield, 
  RotateCcw,
  Star,
  Minus,
  Plus,
  ChevronRight,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGallery from '@/components/product/ProductGallery';
import ShippingCalculator from '@/components/product/ShippingCalculator';
import ProductReviews from '@/components/product/ProductReviews';
import ProductUpsell from '@/components/product/ProductUpsell';
import { toast } from 'sonner';

const productData = {
  id: 1,
  name: 'Smartwatch Pro X - Titanio Premium',
  brand: 'TechWear',
  price: 599000,
  originalPrice: 899000,
  discount: 33,
  rating: 4.8,
  reviews: 342,
  stock: 15,
  sku: 'SW-PRO-X-001',
  isNational: true,
  description: 'El Smartwatch Pro X redefine lo que un reloj inteligente puede hacer. Con su pantalla AMOLED de 1.5 pulgadas, monitoreo de salud 24/7, GPS integrado y una batería que dura hasta 7 días, es el compañero perfecto para tu vida activa.',
  features: [
    'Pantalla AMOLED de 1.5" con Always-On Display',
    'Monitoreo de ritmo cardíaco, SpO2 y estrés 24/7',
    'GPS integrado de alta precisión',
    'Resistente al agua hasta 50 metros',
    'Batería de larga duración: hasta 7 días',
    'Más de 100 modos de ejercicio',
    'Compatible con iOS y Android',
  ],
  colors: [
    { name: 'Titanio Natural', code: '#8B8B8B' },
    { name: 'Negro Medianoche', code: '#1A1A1A' },
    { name: 'Plata Brillante', code: '#C0C0C0' },
  ],
  images: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80',
    'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80',
    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80',
    'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&q=80',
  ],
};

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleAddToCart = () => {
    toast.success('¡Producto agregado al carrito!', {
      description: `${productData.name} x ${quantity}`,
    });
  };

  const handleBuyNow = () => {
    toast.success('Redirigiendo al checkout...', {
      description: 'Preparando tu compra',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-vitality transition-colors">Inicio</Link>
          <ChevronRight className="w-4 h-4" />
          <span>Tecnología</span>
          <ChevronRight className="w-4 h-4" />
          <span>Relojes Inteligentes</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{productData.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Gallery */}
          <ProductGallery images={productData.images} productName={productData.name} />

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground">{productData.brand}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">SKU: {productData.sku}</span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                {productData.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(productData.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{productData.rating}</span>
                <a href="#reviews" className="text-vitality hover:underline">
                  ({productData.reviews} opiniones)
                </a>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="font-display text-3xl md:text-4xl font-bold text-deep-space">
                {formatPrice(productData.price)}
              </span>
              <span className="text-xl text-muted-foreground line-through">
                {formatPrice(productData.originalPrice)}
              </span>
              <span className="bg-vitality text-accent-foreground px-3 py-1 rounded-lg font-bold">
                -{productData.discount}%
              </span>
            </div>

            {/* Shipping Badge */}
            <div className="flex items-center gap-2">
              {productData.isNational ? (
                <span className="badge-nacional flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold">
                  <Truck className="w-4 h-4" /> Envío Nacional - 2-4 días
                </span>
              ) : (
                <span className="badge-internacional flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold">
                  <Truck className="w-4 h-4" /> Internacional - 15-20 días
                </span>
              )}
              <span className="text-sm text-success font-medium">
                Stock disponible: {productData.stock} unidades
              </span>
            </div>

            {/* Color Selection */}
            <div>
              <p className="font-semibold text-foreground mb-3">
                Color: <span className="font-normal text-muted-foreground">{selectedColor.name}</span>
              </p>
              <div className="flex gap-3">
                {productData.colors.map((color) => (
                  <motion.button
                    key={color.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor.name === color.name
                        ? 'border-vitality ring-2 ring-vitality ring-offset-2'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                    style={{ backgroundColor: color.code }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="font-semibold text-foreground mb-3">Cantidad</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(productData.stock, quantity + 1))}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  Máximo {productData.stock} unidades
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1 rounded-xl py-6 text-lg border-2 border-deep-space hover:bg-deep-space hover:text-primary-foreground transition-colors"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Agregar al carrito
              </Button>
              <Button
                onClick={handleBuyNow}
                className="flex-1 btn-vitality rounded-xl py-6 text-lg"
              >
                Comprar ahora
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsFavorite(!isFavorite);
                  toast.success(isFavorite ? 'Eliminado de favoritos' : 'Agregado a favoritos');
                }}
                className="flex items-center gap-2 text-muted-foreground hover:text-vitality transition-colors"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-vitality text-vitality' : ''}`} />
                <span>Agregar a favoritos</span>
              </motion.button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-vitality transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Compartir</span>
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-2">
                  <Truck className="w-6 h-6 text-success" />
                </div>
                <span className="text-xs text-muted-foreground">Envío rápido</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-cyber-mint/10 flex items-center justify-center mb-2">
                  <Shield className="w-6 h-6 text-cyber-mint" />
                </div>
                <span className="text-xs text-muted-foreground">Compra segura</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-2">
                  <RotateCcw className="w-6 h-6 text-purple-500" />
                </div>
                <span className="text-xs text-muted-foreground">30 días garantía</span>
              </div>
            </div>

            {/* Shipping Calculator */}
            <ShippingCalculator isNational={productData.isNational} productPrice={productData.price} />

            {/* Upsell */}
            <ProductUpsell onAddToCart={(id) => toast.success('Producto agregado al carrito')} />
          </div>
        </div>

        {/* Description & Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Descripción</h2>
            <p className="text-muted-foreground leading-relaxed">{productData.description}</p>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Características</h2>
            <ul className="space-y-3">
              {productData.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reviews Section */}
        <div id="reviews">
          <ProductReviews />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
