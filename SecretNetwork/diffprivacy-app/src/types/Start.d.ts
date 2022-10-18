export {};

declare global {
  interface Window {
    getOfflineSigner: any,
    keplr: any,
    getEnigmaUtils: any,
    getOfflineSignerOnlyAmino: any;
  }
}