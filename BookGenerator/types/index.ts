export interface Design {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  subscription?: {
    status: 'active' | 'canceled' | 'past_due';
    plan: 'free' | 'pro' | 'enterprise';
    currentPeriodEnd: string;
  };
}