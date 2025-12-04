declare module '@ducanh2912/next-pwa' {
  interface PWAConfig {
    dest?: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    sw?: string;
    scope?: string;
    workboxOptions?: {
      disableDevLogs?: boolean;
      [key: string]: any;
    };
    [key: string]: any;
  }

  function withPWA(config: PWAConfig): (nextConfig: any) => any;

  export default withPWA;
}