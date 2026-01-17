import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, Camera, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Review {
  id: number;
  userName: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  images?: string[];
  helpful: number;
  verified: boolean;
}

const reviews: Review[] = [
  {
    id: 1,
    userName: 'Carlos M.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
    date: 'Hace 2 días',
    title: '¡Excelente calidad!',
    content: 'El producto llegó en perfectas condiciones y antes de lo esperado. La calidad es increíble, supera mis expectativas. El empaque era muy profesional y seguro. Definitivamente compraré más productos aquí.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80',
    ],
    helpful: 24,
    verified: true,
  },
  {
    id: 2,
    userName: 'María L.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 4,
    date: 'Hace 1 semana',
    title: 'Muy buen producto',
    content: 'Funciona muy bien, aunque tardó un poco más en llegar de lo esperado. La relación calidad-precio es excelente. Lo recomiendo.',
    helpful: 12,
    verified: true,
  },
  {
    id: 3,
    userName: 'Andrés R.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    rating: 5,
    date: 'Hace 2 semanas',
    title: 'Superó mis expectativas',
    content: 'Increíble producto. Lo uso todos los días y funciona de maravilla. El servicio al cliente también fue excelente cuando tuve una duda.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    ],
    helpful: 18,
    verified: true,
  },
  {
    id: 4,
    userName: 'Laura G.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5,
    date: 'Hace 3 semanas',
    title: 'Lo mejor que he comprado',
    content: 'Estaba dudando en comprarlo pero valió totalmente la pena. La calidad del material es premium y se nota. 100% recomendado.',
    helpful: 31,
    verified: true,
  },
];

const ratingBreakdown = [
  { stars: 5, percentage: 78 },
  { stars: 4, percentage: 15 },
  { stars: 3, percentage: 5 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 },
];

const ProductReviews = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const averageRating = 4.8;
  const totalReviews = 342;

  return (
    <div className="py-8">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        Opiniones de Clientes
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Rating Summary */}
        <div className="bg-card rounded-2xl p-6 border border-border h-fit">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.floor(averageRating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-muted'
                  }`}
                />
              ))}
            </div>
            <p className="font-display text-4xl font-bold text-foreground">{averageRating}</p>
            <p className="text-muted-foreground">{totalReviews} opiniones</p>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground w-6">{item.stars}</span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full bg-amber-400 rounded-full"
                  />
                </div>
                <span className="text-sm text-muted-foreground w-10">{item.percentage}%</span>
              </div>
            ))}
          </div>

          {/* Write Review Button */}
          <Button className="w-full mt-6 btn-vitality rounded-xl">
            <Camera className="w-4 h-4 mr-2" />
            Escribir una reseña
          </Button>
        </div>

        {/* Reviews List */}
        <div className="md:col-span-2 space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
            {['all', 'photos', '5stars', '4stars'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === filter
                    ? 'bg-deep-space text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted-foreground/20'
                }`}
              >
                {filter === 'all' && 'Todas'}
                {filter === 'photos' && '📷 Con fotos'}
                {filter === '5stars' && '⭐ 5 estrellas'}
                {filter === '4stars' && '⭐ 4 estrellas'}
              </button>
            ))}
          </div>

          {/* Review Cards */}
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-5 border border-border"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.userName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{review.userName}</span>
                      {review.verified && (
                        <span className="flex items-center gap-1 text-xs text-success bg-success/10 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3" />
                          Compra verificada
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < review.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
              <p className="text-muted-foreground text-sm mb-4">{review.content}</p>

              {/* Images */}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {review.images.map((image, imgIndex) => (
                    <motion.button
                      key={imgIndex}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedImage(image)}
                      className="w-20 h-20 rounded-xl overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`Foto de reseña ${imgIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Helpful */}
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-vitality transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Útil ({review.helpful})</span>
                </button>
              </div>
            </motion.div>
          ))}

          {/* Load More */}
          <Button variant="outline" className="w-full rounded-xl">
            Ver más opiniones
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-deep-space/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            src={selectedImage}
            alt="Imagen de reseña"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </motion.div>
      )}
    </div>
  );
};

export default ProductReviews;
