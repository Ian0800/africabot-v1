export interface BotConfig {
  businessName: string;
  businessType: string;
  welcomeMessage: string;
  menuOptions: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export type ViewState = 'landing' | 'demo' | 'success';
