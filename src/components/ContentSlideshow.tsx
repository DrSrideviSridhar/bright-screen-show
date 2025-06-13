
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ContentSlide {
  id: number;
  type: 'image' | 'video' | 'text' | 'announcement';
  content: string;
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
}

interface ContentSlideshowProps {
  isPlaying: boolean;
}

const ContentSlideshow: React.FC<ContentSlideshowProps> = ({ isPlaying }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Sample content - in a real app, this would come from a CMS or API
  const slides: ContentSlide[] = [
    {
      id: 1,
      type: 'text',
      title: 'Welcome to Our Store',
      subtitle: 'Discover amazing deals and products',
      content: 'Shop with confidence and enjoy our exceptional service',
      backgroundColor: 'from-blue-600 to-blue-800'
    },
    {
      id: 2,
      type: 'announcement',
      title: 'Special Offer',
      subtitle: '50% OFF All Electronics',
      content: 'Limited time offer - Don\'t miss out!',
      backgroundColor: 'from-red-600 to-red-800'
    },
    {
      id: 3,
      type: 'text',
      title: 'New Arrivals',
      subtitle: 'Fresh products just in',
      content: 'Check out our latest collection of premium items',
      backgroundColor: 'from-green-600 to-green-800'
    },
    {
      id: 4,
      type: 'announcement',
      title: 'Store Hours',
      subtitle: 'Mon-Fri: 9AM-9PM',
      content: 'Saturday: 9AM-10PM | Sunday: 10AM-8PM',
      backgroundColor: 'from-purple-600 to-purple-800'
    },
    {
      id: 5,
      type: 'text',
      title: 'Customer Service',
      subtitle: 'We\'re here to help',
      content: 'Visit our help desk or call us at (555) 123-4567',
      backgroundColor: 'from-orange-600 to-orange-800'
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const current = slides[currentSlide];

  return (
    <div className="relative w-full h-full">
      {/* Main Slide Content */}
      <Card className={`w-full h-full bg-gradient-to-br ${current.backgroundColor} text-white border-0 rounded-none`}>
        <div className="h-full flex items-center justify-center p-8">
          <div className="text-center max-w-4xl">
            {current.title && (
              <h1 className="text-6xl font-bold mb-6 animate-fade-in">
                {current.title}
              </h1>
            )}
            {current.subtitle && (
              <h2 className="text-3xl font-light mb-8 opacity-90 animate-fade-in-delay">
                {current.subtitle}
              </h2>
            )}
            <p className="text-xl leading-relaxed animate-fade-in-delay-2">
              {current.content}
            </p>
          </div>
        </div>
      </Card>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {isPlaying && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-5000 ease-linear"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ContentSlideshow;
