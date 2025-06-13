
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Clock } from 'lucide-react';

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="h-full p-4 bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0">
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Clock className="h-8 w-8 mx-auto mb-4 text-blue-400" />
          <div className="text-3xl font-mono font-bold mb-2">
            {formatTime(time)}
          </div>
          <div className="text-sm opacity-80">
            {formatDate(time)}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ClockWidget;
