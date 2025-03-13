
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type TierFeature = {
  text: string;
  included: boolean;
};

type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: TierFeature[];
  buttonText: string;
  isHighlighted?: boolean;
};

interface PricingTiersProps {
  serviceTitle: string;
  serviceDescription: string;
  tiers: PricingTier[];
}

const PricingTiers = ({ serviceTitle, serviceDescription, tiers }: PricingTiersProps) => {
  return (
    <div className="py-12 px-4 md:px-6 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{serviceTitle} Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {serviceDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div 
              key={index} 
              className={cn(
                "flex flex-col p-6 rounded-xl border",
                tier.isHighlighted 
                  ? "border-primary shadow-lg relative" 
                  : "border-border"
              )}
            >
              {tier.isHighlighted && (
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
                </div>
                <p className="text-muted-foreground">{tier.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className={cn(
                    "flex items-start",
                    !feature.included && "text-muted-foreground"
                  )}>
                    <span className={cn(
                      "mr-2 h-5 w-5 rounded-full flex items-center justify-center",
                      feature.included ? "text-primary" : "text-muted-foreground"
                    )}>
                      {feature.included ? <Check className="h-4 w-4" /> : "–"}
                    </span>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  "px-5 py-2.5 rounded-lg font-medium",
                  tier.isHighlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary hover:bg-secondary/80"
                )}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingTiers;
