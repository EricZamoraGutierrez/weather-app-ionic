import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'weather-app-ionic',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
