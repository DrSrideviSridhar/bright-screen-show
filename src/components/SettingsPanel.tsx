
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  layout: string;
  setLayout: (layout: string) => void;
  autoRotate: boolean;
  setAutoRotate: (autoRotate: boolean) => void;
  rotationInterval: number;
  setRotationInterval: (interval: number) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  layout,
  setLayout,
  autoRotate,
  setAutoRotate,
  rotationInterval,
  setRotationInterval
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-96 p-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Digital Signage Settings</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Layout Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Layout</label>
            <Select value={layout} onValueChange={setLayout}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slideshow">Slideshow</SelectItem>
                <SelectItem value="dashboard">Dashboard</SelectItem>
                <SelectItem value="split">Split View</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Auto Rotate */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Auto Rotate Layouts</label>
            <Switch checked={autoRotate} onCheckedChange={setAutoRotate} />
          </div>

          {/* Rotation Interval */}
          {autoRotate && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Rotation Interval (seconds)
              </label>
              <Select 
                value={rotationInterval.toString()} 
                onValueChange={(value) => setRotationInterval(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15000">15 seconds</SelectItem>
                  <SelectItem value="30000">30 seconds</SelectItem>
                  <SelectItem value="60000">1 minute</SelectItem>
                  <SelectItem value="120000">2 minutes</SelectItem>
                  <SelectItem value="300000">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Fullscreen Button */}
          <Button 
            onClick={() => {
              if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
              }
              onClose();
            }}
            className="w-full"
          >
            Enter Fullscreen
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPanel;
