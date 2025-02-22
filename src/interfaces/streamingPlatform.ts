export interface StreamingPlatform {
  streamingPlatform: string;
  packageTypes: {
    Basic: string[];
    Standard: string[];
    Premium: string[];
  };
  logo: string;
}
