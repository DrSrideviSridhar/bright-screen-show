
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Cloud, Sun, CloudRain, Thermometer } from 'lucide-react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState({
    temperature: 72,
    condition: 'sunny',
    humidity: 45,
    location: 'New York, NY'
  });

  // Simulate weather updates
  useEffect(() => {
    const conditions = ['sunny', 'cloudy', 'rainy'];
    const interval = setInterval(() => {
      setWeather(prev => ({
        ...prev,
        temperature: Math.floor(Math.random() * 20) + 65, // 65-85°F
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        humidity: Math.floor(Math.random() * 40) + 30 // 30-70%
      }));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun className="h-8 w-8 text-yellow-400" />;
      case 'cloudy':
        return <Cloud className="h-8 w-8 text-gray-400" />;
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-blue-400" />;
      default:
        return <Sun className="h-8 w-8 text-yellow-400" />;
    }
  };

  return (
    <Card className="h-full p-4 bg-gradient-to-br from-blue-900 to-blue-800 text-white border-0">
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="mb-4">
            {getWeatherIcon()}
          </div>
          <div className="text-2xl font-bold mb-2">
            {weather.temperature}°F
          </div>
          <div className="text-sm opacity-80 mb-2 capitalize">
            {weather.condition}
          </div>
          <div className="flex items-center justify-center text-xs opacity-70">
            <Thermometer className="h-3 w-3 mr-1" />
            {weather.humidity}% humidity
          </div>
          <div className="text-xs opacity-60 mt-2">
            {weather.location}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherWidget;
