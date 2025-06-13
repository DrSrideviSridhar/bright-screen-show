
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1a8f98a80c6642edb33dd884139fd284',
  appName: 'Digital Signage',
  webDir: 'dist',
  server: {
    url: 'https://1a8f98a8-0c66-42ed-b33d-d884139fd284.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    KeepAwake: {
      isEnabled: true
    },
    ScreenOrientation: {
      orientations: ['landscape']
    }
  }
};

export default config;
