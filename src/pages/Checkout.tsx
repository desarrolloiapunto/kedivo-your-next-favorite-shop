import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, CreditCard, Truck, Shield, Lock, Tag, User, Mail, Phone,
  MapPin, Building, FileText, CheckCircle2, ShoppingCart, ArrowLeft, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const colombianDepartments = [
  'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bogotá D.C.', 'Bolívar',
  'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó',
  'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira',
  'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío',
  'Risaralda', 'San Andrés', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca',
  'Vaupés', 'Vichada',
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, discount, total, coupon, applyCoupon, removeCoupon } = useCart();
  const [authTab, setAuthTab] = useState('guest');
  const [couponCode, setCouponCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', documentType: 'CC',
    documentNumber: '', department: '', city: '', address: '', addressDetail: '',
    notes: '',
  });

  const shippingCost = subtotal >= 150000 ? 0 : 12000;
  const grandTotal = total + shippingCost;

  const updateField = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleApplyCoupon = () => {
    if (applyCoupon(couponCode)) {
      toast.success('¡Cupón aplicado!');
      setCouponCode('');
    } else {
      toast.error('Cupón inválido');
    }
  };

  const handlePlaceOrder = async () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'documentNumber', 'department', 'city', 'address'];
    const missing = required.filter(k => !form[k as keyof typeof form]);
    if (missing.length) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }
    setIsProcessing(true);
    // Simulate ePayco redirect
    await new Promise(r => setTimeout(r, 2000));
    setIsProcessing(false);
    setOrderPlaced(true);
    toast.success('¡Pedido realizado exitosamente!');
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="font-display text-2xl font-bold mb-2">Tu carrito está vacío</h2>
          <p className="text-muted-foreground mb-6">Agrega productos antes de ir al checkout</p>
          <Button asChild className="btn-vitality rounded-xl"><Link to="/">Ir a comprar</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center max-w-lg">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
            <CheckCircle2 className="w-20 h-20 mx-auto text-success mb-6" />
          </motion.div>
          <h2 className="font-display text-3xl font-bold mb-2">¡Pedido Confirmado!</h2>
          <p className="text-muted-foreground mb-2">Orden #KDV-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
          <p className="text-sm text-muted-foreground mb-8">
            Te enviamos un correo a <strong>{form.email}</strong> con los detalles de tu pedido.
          </p>
          <div className="bg-card border rounded-2xl p-6 text-left mb-8 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total pagado</span>
              <span className="font-bold text-foreground">{formatPrice(grandTotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Método de pago</span>
              <span className="font-medium">ePayco (PSE)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Envío a</span>
              <span className="font-medium">{form.city}, {form.department}</span>
            </div>
          </div>
          <Button asChild className="btn-vitality rounded-xl"><Link to="/">Seguir comprando</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-vitality transition-colors">Inicio</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">Checkout</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Auth Tabs */}
            <div className="bg-card rounded-2xl border p-6">
              <Tabs value={authTab} onValueChange={setAuthTab}>
                <TabsList className="grid grid-cols-2 w-full mb-6">
                  <TabsTrigger value="guest" className="rounded-xl">Comprar como invitado</TabsTrigger>
                  <TabsTrigger value="login" className="rounded-xl">Iniciar sesión</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <div className="space-y-4 max-w-sm mx-auto text-center py-4">
                    <p className="text-sm text-muted-foreground">Inicia sesión para una experiencia más rápida y seguir tus pedidos</p>
                    <Input placeholder="Correo electrónico" type="email" className="rounded-xl" />
                    <Input placeholder="Contraseña" type="password" className="rounded-xl" />
                    <Button className="w-full btn-vitality rounded-xl">Iniciar Sesión</Button>
                    <p className="text-xs text-muted-foreground">¿No tienes cuenta? <button className="text-vitality hover:underline" onClick={() => setAuthTab('guest')}>Compra como invitado</button></p>
                  </div>
                </TabsContent>
                <TabsContent value="guest">
                  <p className="text-sm text-muted-foreground">Completa tus datos para procesar tu compra</p>
                </TabsContent>
              </Tabs>
            </div>

            {/* Personal Info */}
            <div className="bg-card rounded-2xl border p-6 space-y-4">
              <h3 className="font-display text-lg font-bold flex items-center gap-2">
                <User className="w-5 h-5 text-vitality" /> Datos Personales
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Nombre *</Label>
                  <Input id="firstName" placeholder="Tu nombre" className="rounded-xl mt-1" value={form.firstName} onChange={e => updateField('firstName', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="lastName">Apellido *</Label>
                  <Input id="lastName" placeholder="Tu apellido" className="rounded-xl mt-1" value={form.lastName} onChange={e => updateField('lastName', e.target.value)} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Correo electrónico *</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="correo@ejemplo.com" className="rounded-xl pl-10" value={form.email} onChange={e => updateField('email', e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono *</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="phone" placeholder="300 123 4567" className="rounded-xl pl-10" value={form.phone} onChange={e => updateField('phone', e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Tipo de documento *</Label>
                  <Select value={form.documentType} onValueChange={v => updateField('documentType', v)}>
                    <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                      <SelectItem value="CE">Cédula de Extranjería</SelectItem>
                      <SelectItem value="NIT">NIT</SelectItem>
                      <SelectItem value="PP">Pasaporte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="documentNumber">Número de documento *</Label>
                  <div className="relative mt-1">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="documentNumber" placeholder="1234567890" className="rounded-xl pl-10" value={form.documentNumber} onChange={e => updateField('documentNumber', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-card rounded-2xl border p-6 space-y-4">
              <h3 className="font-display text-lg font-bold flex items-center gap-2">
                <Truck className="w-5 h-5 text-vitality" /> Dirección de Envío
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Departamento *</Label>
                  <Select value={form.department} onValueChange={v => updateField('department', v)}>
                    <SelectTrigger className="rounded-xl mt-1"><SelectValue placeholder="Selecciona" /></SelectTrigger>
                    <SelectContent>
                      {colombianDepartments.map(d => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="city">Ciudad *</Label>
                  <div className="relative mt-1">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="city" placeholder="Tu ciudad" className="rounded-xl pl-10" value={form.city} onChange={e => updateField('city', e.target.value)} />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="address">Dirección *</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="address" placeholder="Calle 123 #45-67" className="rounded-xl pl-10" value={form.address} onChange={e => updateField('address', e.target.value)} />
                </div>
              </div>
              <div>
                <Label htmlFor="addressDetail">Detalle adicional</Label>
                <Input id="addressDetail" placeholder="Apto, torre, conjunto, barrio..." className="rounded-xl mt-1" value={form.addressDetail} onChange={e => updateField('addressDetail', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="notes">Notas del pedido</Label>
                <Input id="notes" placeholder="Instrucciones especiales de entrega..." className="rounded-xl mt-1" value={form.notes} onChange={e => updateField('notes', e.target.value)} />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-card rounded-2xl border p-6 space-y-4">
              <h3 className="font-display text-lg font-bold flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-vitality" /> Método de Pago
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['PSE', 'Visa / MC', 'Nequi', 'Daviplata'].map(method => (
                  <button
                    key={method}
                    className="border-2 border-vitality/30 hover:border-vitality rounded-xl p-3 text-center text-sm font-medium transition-all hover:bg-vitality/5"
                  >
                    {method}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
                <Lock className="w-4 h-4 flex-shrink-0" />
                <span>Tus datos están protegidos con encriptación SSL de 256 bits. Procesado de forma segura por ePayco.</span>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-4">
              <div className="bg-card rounded-2xl border p-6 space-y-4">
                <h3 className="font-display text-lg font-bold">Resumen del Pedido</h3>

                {/* Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Cant: {item.quantity}</p>
                        <p className="text-sm font-bold text-deep-space">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Coupon */}
                {coupon ? (
                  <div className="flex items-center justify-between bg-success/10 text-success rounded-lg px-3 py-2 text-sm">
                    <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {coupon.code}</span>
                    <button onClick={removeCoupon}><X className="w-4 h-4" /></button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input placeholder="Cupón" value={couponCode} onChange={e => setCouponCode(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()} className="rounded-lg text-sm" />
                    <Button variant="outline" size="sm" onClick={handleApplyCoupon} className="rounded-lg shrink-0"><Tag className="w-4 h-4" /></Button>
                  </div>
                )}

                <Separator />

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} productos)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Descuento</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    <span className={shippingCost === 0 ? 'text-success font-medium' : ''}>
                      {shippingCost === 0 ? '¡Gratis!' : formatPrice(shippingCost)}
                    </span>
                  </div>
                  {shippingCost > 0 && (
                    <p className="text-xs text-muted-foreground">Envío gratis en compras mayores a $150.000</p>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-deep-space">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <Button
                  className="w-full btn-vitality rounded-xl py-6 text-lg"
                  disabled={isProcessing}
                  onClick={handlePlaceOrder}
                >
                  {isProcessing ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Pagar con ePayco
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Compra segura</span>
                  <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Envío rastreable</span>
                </div>
              </div>

              <Button variant="ghost" asChild className="w-full text-muted-foreground">
                <Link to="/"><ArrowLeft className="w-4 h-4 mr-2" /> Seguir comprando</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
