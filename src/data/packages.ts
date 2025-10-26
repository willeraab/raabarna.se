import { ServicePackage } from '../types';

export const servicePackages: ServicePackage[] = [
  {
    name: 'Bronze Tier',
    price: '$99/month',
    features: [
      'Email consultation',
      'Receive advice in 3-5 business days (or whenever mom checks email)',
      'One follow-up question allowed',
      'Access to FAQ page',
    ],
  },
  {
    name: 'Silver Tier',
    price: '$299/month',
    features: [
      'Everything in Bronze',
      'Video call session (15 minutes or until someone needs a snack)',
      'Personalized recommendations',
      'Quarterly newsletter',
    ],
  },
  {
    name: 'Gold Tier',
    price: '$599/month',
    featured: true,
    features: [
      'Everything in Silver',
      'On-site consultation (1 hour)',
      'Includes free crayon drawings',
      'Priority response time',
      'Access to premium case studies',
    ],
  },
  {
    name: 'Platinum "Naptime" Tier',
    price: '$1,999/month',
    features: [
      'Everything in Gold',
      'Uninterrupted 2-hour session (availability: rare)',
      'Dedicated consultant assignment',
      '24/7 emergency hotline',
      'Complimentary snacks during consultation',
    ],
  },
];
