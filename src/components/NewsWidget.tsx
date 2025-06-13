
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Newspaper } from 'lucide-react';

interface NewsItem {
  id: number;
  headline: string;
  category: string;
}

const NewsWidget = () => {
  const [currentNews, setCurrentNews] = useState(0);
  
  const newsItems: NewsItem[] = [
    { id: 1, headline: "Local business sees record growth this quarter", category: "Business" },
    { id: 2, headline: "New community center opens downtown", category: "Local" },
    { id: 3, headline: "Technology conference coming to city next month", category: "Tech" },
    { id: 4, headline: "Weather forecast shows sunny weekend ahead", category: "Weather" },
    { id: 5, headline: "Local school district announces new programs", category: "Education" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
    }, 8000); // Change news every 8 seconds

    return () => clearInterval(interval);
  }, [newsItems.length]);

  return (
    <Card className="h-full p-4 bg-gradient-to-br from-green-900 to-green-800 text-white border-0">
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Newspaper className="h-8 w-8 mx-auto mb-4 text-green-400" />
          <div className="text-xs opacity-70 mb-2 uppercase tracking-wide">
            {newsItems[currentNews].category}
          </div>
          <div className="text-sm font-medium leading-tight">
            {newsItems[currentNews].headline}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NewsWidget;
