import { CapacitorConfig } from '@capacitor/cli'

export default <CapacitorConfig>{
  appId: 'com.b-ewps.ormnicro.app',
  appName: 'ORMNicro',
  webDir: 'app/dist',
  bundledWebRuntime: true,
  android: {
    minWebViewVersion: 107,
  },
  server: {
    url: 'http://192.168.100.108:8100',
    cleartext: true,
  }
}
