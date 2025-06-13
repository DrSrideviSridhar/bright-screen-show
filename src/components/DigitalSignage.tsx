
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Play, Pause, RotateCcw } from 'lucide-react';
import ContentSlideshow from './ContentSlideshow';
import WeatherWidget from './WeatherWidget';
import NewsWidget from './NewsWidget';
import ClockWidget from './ClockWidget';
import SettingsPanel from './SettingsPanel';

const DigitalSignage = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [layout, setLayout] = useState('slideshow'); // slideshow, dashboard, split
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotationInterval, setRotationInterval] = useState(30000); // 30 seconds

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoRotate && isPlaying) {
      interval = setInterval(() => {
        const layouts = ['slideshow', 'dashboard', 'split'];
        const currentIndex = layouts.indexOf(layout);
        const nextIndex = (currentIndex + 1) % layouts.length;
        setLayout(layouts[nextIndex]);
      }, rotationInterval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRotate, isPlaying, layout, rotationInterval]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetRotation = () => {
    setLayout('slideshow');
  };

  const renderLayout = () => {
    switch (layout) {
      case 'slideshow':
        return (
          <div className="w-full h-full">
            <ContentSlideshow isPlaying={isPlaying} />
          </div>
        );
      
      case 'dashboard':
        return (
          <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-4 p-4">
            <div className="col-span-2 row-span-2">
              <ContentSlideshow isPlaying={isPlaying} />
            </div>
            <div className="row-span-1">
              <ClockWidget />
            </div>
            <div className="row-span-1">
              <WeatherWidget />
            </div>
            <div className="row-span-1">
              <NewsWidget />
            </div>
            <div className="col-span-3">
              <Card className="h-full p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="text-center">
                  <h2 className="text-3xl font-bold">Welcome to Our Digital Signage</h2>
                  <p className="text-xl mt-2">Stay informed with real-time updates</p>
                </div>
              </Card>
            </div>
          </div>
        );
      
      case 'split':
        return (
          <div className="w-full h-full grid grid-cols-2 gap-4 p-4">
            <div>
              <ContentSlideshow isPlaying={isPlaying} />
            </div>
            <div className="grid grid-rows-3 gap-4">
              <ClockWidget />
              <WeatherWidget />
              <NewsWidget />
            </div>
          </div>
        );
      
      default:
        return <ContentSlideshow isPlaying={isPlaying} />;
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Main Content Area */}
      <div className="w-full h-full">
        {renderLayout()}
      </div>

      {/* Control Bar - Hidden by default, shown on hover */}
      <div className="absolute bottom-4 left-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-300 z-50">
        <Card className="p-4 bg-black/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              
              <Button
                variant="secondary"
                size="sm"
                onClick={resetRotation}
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>

              <div className="text-white text-sm">
                Layout: <span className="capitalize font-semibold">{layout}</span>
              </div>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </Card>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          layout={layout}
          setLayout={setLayout}
          autoRotate={autoRotate}
          setAutoRotate={setAutoRotate}
          rotationInterval={rotationInterval}
          setRotationInterval={setRotationInterval}
        />
      )}
    </div>
  );
};

export default DigitalSignage;
