import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  color?: string;
  isNational?: boolean;
}

interface CouponDiscount {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  coupon: CouponDiscount | null;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  total: number;
}

const COUPONS: Record<string, CouponDiscount> = {
  'KEDIVO10': { code: 'KEDIVO10', type: 'percentage', value: 10 },
  'KEDIVO20': { code: 'KEDIVO20', type: 'percentage', value: 20 },
  'ENVIO': { code: 'ENVIO', type: 'fixed', value: 15000 },
  'BIENVENIDO': { code: 'BIENVENIDO', type: 'percentage', value: 15 },
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [coupon, setCoupon] = useState<CouponDiscount | null>(null);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...item, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.id !== id));
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
    }
  }, []);

  const clearCart = useCallback(() => { setItems([]); setCoupon(null); }, []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen(prev => !prev), []);

  const applyCoupon = useCallback((code: string): boolean => {
    const found = COUPONS[code.toUpperCase()];
    if (found) { setCoupon(found); return true; }
    return false;
  }, []);

  const removeCoupon = useCallback(() => setCoupon(null), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = coupon
    ? coupon.type === 'percentage' ? subtotal * (coupon.value / 100) : Math.min(coupon.value, subtotal)
    : 0;
  const total = subtotal - discount;

  return (
    <CartContext.Provider value={{
      items, isOpen, coupon, addItem, removeItem, updateQuantity, clearCart,
      openCart, closeCart, toggleCart, applyCoupon, removeCoupon,
      totalItems, subtotal, discount, total,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
