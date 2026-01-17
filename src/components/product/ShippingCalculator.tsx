import { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Plane, MapPin, Clock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const cities = [
  { name: 'Bogotá', region: 'Cundinamarca', nationalCost: 0, nationalDays: '1-2', internationalDays: '12-15' },
  { name: 'Medellín', region: 'Antioquia', nationalCost: 8000, nationalDays: '2-3', internationalDays: '14-18' },
  { name: 'Cali', region: 'Valle del Cauca', nationalCost: 10000, nationalDays: '2-3', internationalDays: '14-18' },
  { name: 'Barranquilla', region: 'Atlántico', nationalCost: 12000, nationalDays: '3-4', internationalDays: '15-20' },
  { name: 'Cartagena', region: 'Bolívar', nationalCost: 12000, nationalDays: '3-4', internationalDays: '15-20' },
  { name: 'Bucaramanga', region: 'Santander', nationalCost: 10000, nationalDays: '2-3', internationalDays: '14-18' },
  { name: 'Pereira', region: 'Risaralda', nationalCost: 9000, nationalDays: '2-3', internationalDays: '14-18' },
  { name: 'Santa Marta', region: 'Magdalena', nationalCost: 14000, nationalDays: '3-4', internationalDays: '16-20' },
];

interface ShippingCalculatorProps {
  isNational?: boolean;
  productPrice: number;
}

const ShippingCalculator = ({ isNational = true, productPrice }: ShippingCalculatorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<typeof cities[0] | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const freeShippingThreshold = 150000;
  const isFreeShipping = productPrice >= freeShippingThreshold && isNational;
  const shippingCost = isFreeShipping ? 0 : (selectedCity?.nationalCost || 15000);
  const internationalCost = 35000;

  return (
    <div className="bg-muted/50 rounded-2xl p-5 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-vitality" />
        <h3 className="font-display font-semibold text-foreground">Calcular envío</h3>
      </div>

      {/* City Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Ingresa tu ciudad..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-vitality outline-none transition-colors"
        />

        {showDropdown && searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-xl border max-h-48 overflow-y-auto z-10"
          >
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <button
                  key={city.name}
                  onClick={() => {
                    setSelectedCity(city);
                    setSearchQuery(city.name);
                    setShowDropdown(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center justify-between"
                >
                  <span>
                    {city.name}, <span className="text-muted-foreground">{city.region}</span>
                  </span>
                  {selectedCity?.name === city.name && (
                    <Check className="w-4 h-4 text-success" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-muted-foreground">
                No encontramos esa ciudad
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Shipping Options */}
      {selectedCity && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {/* National Shipping */}
          {isNational && (
            <div className="flex items-center justify-between p-4 rounded-xl bg-success/10 border border-success/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Envío Nacional</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Llega en {selectedCity.nationalDays} días hábiles</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                {isFreeShipping ? (
                  <div>
                    <span className="text-success font-bold">GRATIS</span>
                    <p className="text-xs text-muted-foreground line-through">
                      {formatPrice(selectedCity.nationalCost)}
                    </p>
                  </div>
                ) : (
                  <span className="font-bold text-foreground">
                    {formatPrice(shippingCost)}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* International Shipping */}
          {!isNational && (
            <div className="flex items-center justify-between p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Envío Internacional</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Llega en {selectedCity.internationalDays} días hábiles</span>
                  </div>
                </div>
              </div>
              <span className="font-bold text-foreground">
                {formatPrice(internationalCost)}
              </span>
            </div>
          )}

          {/* Free shipping message */}
          {!isFreeShipping && isNational && (
            <p className="text-sm text-muted-foreground text-center">
              🚀 Agrega {formatPrice(freeShippingThreshold - productPrice)} más para envío gratis
            </p>
          )}
        </motion.div>
      )}

      {!selectedCity && (
        <p className="text-sm text-muted-foreground text-center">
          Ingresa tu ciudad para ver opciones de envío
        </p>
      )}
    </div>
  );
};

export default ShippingCalculator;
