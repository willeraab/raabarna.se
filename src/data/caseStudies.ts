import { CaseStudy } from '../types';

export const caseStudies: CaseStudy[] = [
  {
    id: 'operation-clean-plate',
    title: 'Operation Clean Plate',
    client: 'Stubborn 8-year-old refusing vegetables',
    challenge: 'Three-week vegetable boycott threatening family nutrition goals. Client demonstrated advanced negotiation tactics and unwavering commitment to carbohydrate-only diet.',
    solution: `Multi-pronged approach including:
• Strategic rebranding (broccoli became "dinosaur trees")
• Gamification system (veggie points redeemable for dessert)
• Competitive eating challenges
• Visual presentation optimization`,
    results: [
      '60% increase in vegetable consumption',
      'Complete elimination of dinner table standoffs',
      'Improved family mealtime atmosphere',
      'Discovery that ranch dressing solves everything',
    ],
    timeline: '2 weeks',
    testimonial: 'Fine, I\'ll eat ONE bite',
    metrics: [
      { label: 'Vegetable Intake Increase', value: '60%' },
      { label: 'Standoffs Eliminated', value: '100%' },
      { label: 'Ranch Dressing Usage', value: '+300%' },
    ],
  },
  {
    id: 'toy-room-reorganization',
    title: 'The Great Toy Room Reorganization',
    client: 'Overwhelmed parents, toys achieving sentience',
    challenge: '847 toys occupying a 200-square-foot space. Floor visibility at 0%. Missing toys discovered in HVAC system. Family tripping hazards at all-time high.',
    solution: `• Ruthless audit methodology
• Strategic donation campaign
• Color-coded bin system implementation
• "One in, one out" policy establishment
• Regular maintenance schedule`,
    results: [
      '40% space improvement',
      'Can now see the floor',
      'Only 3 toys currently "missing"',
      'Reduced toy-related injuries by 78%',
      'Improved room aesthetics rating from "disaster zone" to "manageable chaos"',
    ],
    timeline: '6 hours (3 hours actual work, 3 hours arguing over what to keep)',
    testimonial: 'I can walk through the room without stepping on a LEGO!',
    metrics: [
      { label: 'Space Reclaimed', value: '40%' },
      { label: 'Injury Reduction', value: '78%' },
      { label: 'Floor Visibility', value: '95%' },
    ],
  },
  {
    id: 'bedtime-reduction',
    title: 'Bedtime Hour Reduction Initiative',
    client: 'Exhausted parents',
    challenge: 'Bedtime routine averaging 2+ hours. Multiple "I need water" requests. Strategic stalling tactics employed by children. Parent sleep deprivation reaching critical levels.',
    solution: `• Complete process mapping and bottleneck identification
• Incentive restructuring (star charts, weekend privileges)
• Water limit protocols
• Story time optimization
• Firm boundary establishment`,
    results: [
      '47% time reduction (now averaging 67 minutes)',
      'Decreased "I need water" requests by 83%',
      'Parents now asleep by 10pm',
      'Improved morning mood across all family members',
      'Reduced parent eye twitching',
    ],
    timeline: '3 weeks implementation',
    testimonial: 'I can watch a whole TV show now before I pass out',
    metrics: [
      { label: 'Previous Average', value: '132 min' },
      { label: 'New Average', value: '67 min' },
      { label: 'Time Saved Weekly', value: '7.6 hrs' },
      { label: 'Parent Sanity', value: 'Restored' },
    ],
  },
  {
    id: 'birthday-party-optimization',
    title: 'The Birthday Party Optimization Project',
    client: 'Anxious parents planning for 20 children',
    challenge: 'Planning and executing birthday party for 20 children in backyard. Weather unpredictability. Dietary restrictions. Parental anxiety levels critical.',
    solution: `• Detailed activity scheduling (15-minute intervals)
• Sugar intake management protocols
• Strategic parent deployment across activity zones
• Weather contingency planning
• Gift opening ceremony optimization
• Cake cutting workflow analysis`,
    results: [
      'Zero injuries',
      'Only 1 crying incident (resolved in <5 minutes)',
      'All guests left with correct parents',
      'No property damage',
      'Successful photo documentation',
      'Client satisfaction: 94%',
    ],
    timeline: '6 weeks planning, 3 hours execution',
    testimonial: "We'll never do that again, but it was perfect",
    metrics: [
      { label: 'Injuries', value: '0' },
      { label: 'Satisfaction Rate', value: '94%' },
      { label: 'Property Damage', value: '$0' },
      { label: 'Fun Level', value: 'Maximum' },
    ],
  },
];
