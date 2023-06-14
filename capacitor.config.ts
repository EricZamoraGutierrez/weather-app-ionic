import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'weather.app.ionic',
  appName: 'weather-app-ionic',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
