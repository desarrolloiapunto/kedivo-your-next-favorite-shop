import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Minus, Plus, Trash2, Tag, Truck, Gift, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const formatPrice = (value: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);

const upsellProducts = [
  { id: 101, name: 'Cargador Inalámbrico Qi', price: 89000, originalPrice: 129000, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&q=80', isNational: true },
  { id: 102, name: 'Funda Protectora Premium', price: 45000, originalPrice: 65000, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200&q=80', isNational: true },
  { id: 103, name: 'Cable USB-C Reforzado 2m', price: 29000, originalPrice: 45000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&q=80', isNational: true },
];

const CartSidebar = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, discount, total, coupon, applyCoupon, removeCoupon, totalItems, addItem } = useCart();
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = () => {
    if (applyCoupon(couponCode)) {
      toast.success('¡Cupón aplicado exitosamente!');
      setCouponCode('');
    } else {
      toast.error('Cupón no válido');
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col">
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <SheetTitle className="font-display text-xl flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-vitality" />
            Mi Carrito ({totalItems})
          </SheetTitle>
          <SheetDescription className="sr-only">Tu carrito de compras</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-lg font-semibold text-foreground">Tu carrito está vacío</p>
            <p className="text-sm text-muted-foreground text-center">¡Explora nuestros productos y agrega tus favoritos!</p>
            <Button onClick={closeCart} className="btn-vitality rounded-xl">
              Seguir comprando
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-4">
                <AnimatePresence>
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 bg-muted/50 rounded-xl p-3"
                    >
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-foreground truncate">{item.name}</h4>
                        {item.color && <p className="text-xs text-muted-foreground">{item.color}</p>}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-bold text-deep-space">{formatPrice(item.price)}</span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-xs text-muted-foreground line-through">{formatPrice(item.originalPrice)}</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-border rounded-lg overflow-hidden">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-muted transition-colors">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-muted transition-colors">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Upsell Section */}
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 mb-3">
                    <Gift className="w-4 h-4 text-vitality" />
                    <h4 className="font-semibold text-sm text-foreground">Completa tu compra</h4>
                  </div>
                  <div className="space-y-2">
                    {upsellProducts.filter(p => !items.find(i => i.id === p.id)).slice(0, 2).map(product => (
                      <div key={product.id} className="flex items-center gap-3 bg-gradient-to-r from-vitality/5 to-transparent rounded-lg p-2 border border-vitality/10">
                        <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{product.name}</p>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-deep-space">{formatPrice(product.price)}</span>
                            <span className="text-[10px] text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-7 px-2 border-vitality text-vitality hover:bg-vitality hover:text-white"
                          onClick={() => { addItem(product); toast.success('¡Producto agregado!'); }}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t p-6 space-y-4 bg-card">
              {/* Coupon */}
              {coupon ? (
                <div className="flex items-center justify-between bg-success/10 text-success rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm font-medium">{coupon.code} aplicado</span>
                  </div>
                  <button onClick={removeCoupon} className="hover:text-destructive"><X className="w-4 h-4" /></button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Código de cupón"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()}
                    className="rounded-lg text-sm"
                  />
                  <Button variant="outline" onClick={handleApplyCoupon} className="rounded-lg shrink-0">
                    <Tag className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success font-medium">
                    <span>Descuento</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Envío</span>
                  <span className="text-success font-medium">Calcular al pagar</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-foreground pt-2 border-t">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout */}
              <Button className="w-full btn-vitality rounded-xl py-6 text-lg group" onClick={() => toast.success('Redirigiendo al checkout...')}>
                Ir a pagar
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <button onClick={closeCart} className="w-full text-center text-sm text-muted-foreground hover:text-vitality transition-colors">
                Seguir comprando
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
