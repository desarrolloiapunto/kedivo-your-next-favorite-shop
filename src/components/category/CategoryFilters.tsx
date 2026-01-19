import { Star, Truck, Plane } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Filters } from '@/pages/CategoryPage';

interface CategoryFiltersProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const CategoryFilters = ({ filters, setFilters }: CategoryFiltersProps) => {
  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleDeliveryTimeChange = (value: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      deliveryTime: checked
        ? [...prev.deliveryTime, value]
        : prev.deliveryTime.filter((d) => d !== value),
    }));
  };

  return (
    <div className="space-y-2">
      <Accordion type="multiple" defaultValue={['price', 'delivery', 'rating']} className="space-y-2">
        {/* Price Range Filter */}
        <AccordionItem value="price" className="border border-border/50 rounded-xl px-4 bg-card">
          <AccordionTrigger className="hover:no-underline py-4">
            <span className="font-semibold">Precio</span>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-4">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))
                }
                min={0}
                max={10000000}
                step={100000}
                className="mt-2"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {formatPrice(filters.priceRange[0])}
                </span>
                <span className="text-muted-foreground">
                  {formatPrice(filters.priceRange[1])}
                </span>
              </div>
              
              {/* Quick Price Ranges */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                {[
                  { label: 'Hasta $500K', range: [0, 500000] },
                  { label: '$500K - $1M', range: [500000, 1000000] },
                  { label: '$1M - $3M', range: [1000000, 3000000] },
                  { label: 'Más de $3M', range: [3000000, 10000000] },
                ].map((option) => (
                  <button
                    key={option.label}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange: option.range as [number, number],
                      }))
                    }
                    className={`text-xs py-2 px-3 rounded-lg border transition-colors ${
                      filters.priceRange[0] === option.range[0] &&
                      filters.priceRange[1] === option.range[1]
                        ? 'bg-vitality text-white border-vitality'
                        : 'border-border hover:border-vitality hover:text-vitality'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Delivery Time Filter */}
        <AccordionItem value="delivery" className="border border-border/50 rounded-xl px-4 bg-card">
          <AccordionTrigger className="hover:no-underline py-4">
            <span className="font-semibold">Tiempo de Entrega</span>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:border-cyber-mint transition-colors">
                <Checkbox
                  id="nacional"
                  checked={filters.deliveryTime.includes('nacional')}
                  onCheckedChange={(checked) =>
                    handleDeliveryTimeChange('nacional', checked as boolean)
                  }
                />
                <Label
                  htmlFor="nacional"
                  className="flex items-center gap-2 cursor-pointer flex-1"
                >
                  <span className="badge-nacional flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold">
                    <Truck className="w-3 h-3" /> Nacional
                  </span>
                  <span className="text-sm text-muted-foreground">2-4 días</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:border-purple-400 transition-colors">
                <Checkbox
                  id="internacional"
                  checked={filters.deliveryTime.includes('internacional')}
                  onCheckedChange={(checked) =>
                    handleDeliveryTimeChange('internacional', checked as boolean)
                  }
                />
                <Label
                  htmlFor="internacional"
                  className="flex items-center gap-2 cursor-pointer flex-1"
                >
                  <span className="badge-internacional flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold">
                    <Plane className="w-3 h-3" /> Internacional
                  </span>
                  <span className="text-sm text-muted-foreground">15-20 días</span>
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Rating Filter */}
        <AccordionItem value="rating" className="border border-border/50 rounded-xl px-4 bg-card">
          <AccordionTrigger className="hover:no-underline py-4">
            <span className="font-semibold">Valoración</span>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <RadioGroup
              value={filters.rating?.toString() || ''}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, rating: value ? Number(value) : null }))
              }
            >
              {[4, 3, 2, 1].map((rating) => (
                <div
                  key={rating}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:border-amber-400 transition-colors"
                >
                  <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                  <Label
                    htmlFor={`rating-${rating}`}
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">y más</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        {/* Subcategories - Example */}
        <AccordionItem value="subcategories" className="border border-border/50 rounded-xl px-4 bg-card">
          <AccordionTrigger className="hover:no-underline py-4">
            <span className="font-semibold">Subcategorías</span>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-2">
              {[
                'Smartphones',
                'Laptops',
                'Audio',
                'Wearables',
                'Gaming',
                'Accesorios',
                'Cámaras',
                'Tablets',
              ].map((sub) => (
                <div
                  key={sub}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <Checkbox id={sub} />
                  <Label htmlFor={sub} className="cursor-pointer flex-1 text-sm">
                    {sub}
                  </Label>
                  <span className="text-xs text-muted-foreground">({Math.floor(Math.random() * 50) + 5})</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CategoryFilters;
