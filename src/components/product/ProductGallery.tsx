import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [showLightbox, setShowLightbox] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-4">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[500px] pb-2 md:pb-0 md:pr-2">
          {images.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedIndex(index)}
              className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                selectedIndex === index
                  ? 'border-vitality shadow-lg'
                  : 'border-transparent hover:border-muted-foreground/30'
              }`}
            >
              <img
                src={image}
                alt={`${productName} - Vista ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {selectedIndex === index && (
                <motion.div
                  layoutId="thumbnail-indicator"
                  className="absolute inset-0 border-2 border-vitality rounded-xl"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 relative">
          <motion.div
            className={`relative aspect-square rounded-2xl overflow-hidden bg-muted cursor-${isZoomed ? 'zoom-out' : 'zoom-in'}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onClick={() => setShowLightbox(true)}
          >
            <motion.img
              key={selectedIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={images[selectedIndex]}
              alt={productName}
              className="w-full h-full object-cover transition-transform duration-200"
              style={{
                transform: isZoomed ? 'scale(2)' : 'scale(1)',
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              }}
            />

            {/* Zoom indicator */}
            <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm rounded-full p-2 pointer-events-none">
              {isZoomed ? (
                <ZoomOut className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ZoomIn className="w-5 h-5 text-muted-foreground" />
              )}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-vitality hover:text-accent-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-vitality hover:text-accent-foreground transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-deep-space/95 flex items-center justify-center p-4"
            onClick={() => setShowLightbox(false)}
          >
            <button
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-card/20 flex items-center justify-center text-primary-foreground hover:bg-vitality transition-colors"
              onClick={() => setShowLightbox(false)}
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/20 flex items-center justify-center text-primary-foreground hover:bg-vitality transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.img
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={images[selectedIndex]}
              alt={productName}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/20 flex items-center justify-center text-primary-foreground hover:bg-vitality transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Thumbnails in lightbox */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(index);
                  }}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedIndex === index
                      ? 'border-vitality'
                      : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Vista ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductGallery;
