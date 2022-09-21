import { CapacitorConfig } from '@capacitor/cli'

export default <CapacitorConfig>{
  appId: 'com.ormnicro.app',
  appName: 'ORMNicro',
  webDir: 'app/dist',
  bundledWebRuntime: true,
  android: {
    minWebViewVersion: 105,
  }
}
