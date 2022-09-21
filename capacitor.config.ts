import { CapacitorConfig } from '@capacitor/cli'

export default <CapacitorConfig>{
  appId: 'com.b-ewps.ormnicro.app',
  appName: 'ORMNicro',
  webDir: 'app/dist',
  bundledWebRuntime: true,
  android: {
    minWebViewVersion: 105,
  }
}
