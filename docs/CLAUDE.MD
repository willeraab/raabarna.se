# Development Guide
This is the primary development reference for the Raab Consulting Group website project. Use this for understanding architecture, making structural changes, and planning new features.

## Project Overview
Create a professional-looking, humorous family consultancy website that parodies corporate consulting firms. The site should look legitimate at first glance but become increasingly absurd as visitors explore.

## Family Information
- **Wilhelm**: Chief Executive Consultant
- **Nina**: Managing Director of Operations
- **Gabriel**: Senior Technology Advisor
- **Linnéa**: Creative Director
- **Vendela** (Twin): Director of Snack Operations & Logistics
- **Vidar** (Twin): Director of Chaos Coordination & Sound Engineering

Note: While Vendela and Vidar have separate roles, they are 4-year-old twins who both attend preschool (graduating 2027) and share the Twin Studies Institute education. Their services are complementary but distinct.

**Content Reference:** All consultant bios, service descriptions, case studies, and other copy are documented in [CONTENT.md](CONTENT.md).

## Technical Requirements

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Routing**: React Router
- **Hosting**: Static site (Netlify/Vercel ready)

### Design Approach
- Clean, professional corporate aesthetic while playful and slightly asymmetrically rounded
- Responsive design (mobile-first) with multi-page routing
- Subtle animations and transitions
- Color scheme: Professional blues/grays with playful accent colors
- Corporate photography style for family photos (to be provided)

## Site Structure

### Pages/Sections

#### 1. Homepage (`/`)
- Hero section with family photo and tagline
- Key stats banner (humorous metrics)
- Service overview cards
- Client testimonials carousel
- Call-to-action for consultation booking

#### 2. About Us (`/about`)
- Company history section
- Individual consultant bios with:
  - Professional headshots (placeholder images initially)
  - Education/credentials
  - Specializations
  - Notable achievements
  - Personal quotes
- Mission & values statement

#### 3. Services (`/services`)
- Service categories organized by family member
- Detailed service descriptions
- Service package tiers (Bronze/Silver/Gold/Platinum)
- Pricing structure (humorous)
- **Note:** Service data is defined in `src/data/services.ts` and `src/data/packages.ts`
- "Request a Quote" form

#### 4. Case Studies (`/case-studies`)
- 4-6 detailed case studies:
  - "Operation Clean Plate"
  - "The Great Toy Room Reorganization"
  - "Bedtime Hour Reduction Initiative"
  - "The Birthday Party Optimization Project"
- Each with: Challenge, Solution, Results, Testimonial
- Professional layout with before/after metrics

#### 5. Contact (`/contact`)
- Contact form with fields:
  - Name, Email, Phone
  - Preferred consultant (dropdown)
  - Issue type/urgency
  - Best time to reach
  - Challenge description
  - Budget range
- Office location (placeholder map)
- Office hours
- Contact methods

#### 6. Careers (`/careers`)
- Humorous "not hiring" page
- Benefits package
- Requirements for consideration
- Internship program details

### Component Architecture

#### Reusable Components
- `Navbar` - Professional navigation with logo
- `Footer` - Contact info, social links, copyright
- `ConsultantCard` - Bio cards for family members
- `ServiceCard` - Individual service offerings
- `TestimonialCarousel` - Rotating testimonials
- `CaseStudyCard` - Case study previews/details
- `ContactForm` - Form with validation
- `StatsCounter` - Animated statistic displays
- `Button` - Consistent CTA buttons
- `Section` - Reusable section wrapper with consistent spacing

### Content Guidelines

#### Tone
- Professional corporate language mixed with absurdist humor
- Legitimate consulting jargon used for ridiculous services
- Deadpan delivery (no winking at the camera)
- Easter eggs and subtle jokes throughout

#### Copy Requirements
- All consultant bios from detailed outline
- Full service descriptions
- Complete case study narratives
- Testimonials from various "clients"
- Corporate mission/values statements
- Legal disclaimer (humorous): "Results may vary. Not responsible for increased family chaos."

### Asset Requirements

#### Images Needed (Placeholders Initially)
- Family "corporate" photo (hero)
- Individual headshots (6)
- Office location (can use generic image)
- Case study illustrations (optional)

#### Icons
- Service category icons (use Heroicons or similar)
- Contact method icons
- Social media icons (optional)

### Features to Implement

#### Must-Have
- Fully responsive design
- Working contact form (form submission to FormSpree or similar)
- Smooth page navigation
- Professional loading states
- SEO meta tags
- Accessibility (WCAG AA compliant)

#### Nice-to-Have
- Animated stats counter on scroll
- Testimonial auto-rotation
- "Schedule a Consultation" modal
- Easter egg: Konami code reveals family photo gallery
- Print stylesheet for "official documents"
- Dark mode toggle

### Development Phases

#### Phase 1: Foundation
1. Set up React + Vite + TypeScript project
2. Configure Tailwind CSS
3. Create basic routing structure (React Router)
4. Build component library (Navbar, Footer, Button, etc.)
5. Implement responsive layout system

#### Phase 2: Content Pages
1. Homepage with hero and stats
2. About Us with consultant bios
3. Services page with categorized offerings
4. Case Studies with detailed narratives
5. Contact page with working form
6. Careers page

#### Phase 3: Polish
1. Add animations and transitions
2. Implement testimonial carousel
3. Optimize images and performance
4. Add loading states
5. SEO optimization
6. Accessibility audit and fixes

#### Phase 4: Testing & Refinement
1. Build production version
2. Test across devices and browsers
3. Final accessibility audit
4. Performance optimization

## File Structure

See [PROJECT-SETUP.md](PROJECT-SETUP.md#create-directory-structure) for complete directory structure and setup commands.

Key organization:
- `/src/components/` - Reusable React components
- `/src/pages/` - Page-level components
- `/src/data/` - Content data (source of truth)
- `/src/types/` - TypeScript interfaces
- `/docs/` - Project documentation

## Data Structure Examples

### Consultant Data
```typescript
interface Consultant {
  id: string;
  name: string;
  age: number;
  title: string;
  education: string[];
  specializations: string[];
  achievement: string;
  quote: string;
  rate: string;
  image: string;
}
```

### Service Data
```typescript
interface Service {
  consultant: string;
  category: string;
  services: string[];
  description: string;
}
```

### Case Study Data
```typescript
interface CaseStudy {
  title: string;
  client: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: string;
  timeline?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}
```

## Styling Notes

### Color Palette
- Primary: Professional blue (#1e40af to #3b82f6)
- Secondary: Trustworthy gray (#4b5563 to #6b7280)
- Accent: Playful orange/yellow (#f59e0b)
- Background: Clean white/light gray
- Text: Dark gray (#1f2937)

### Typography
- Headers: Professional serif or strong sans-serif (Inter, Poppins)
- Body: Clean sans-serif (Inter, Open Sans)
- Accents: Slightly playful but still professional

### Design Principles
- Generous whitespace
- Clear hierarchy
- Professional but not stuffy
- Subtle humor in microcopy
- Corporate photography style
- Grid-based layouts

## Git Commit Guidelines

See [GIT-GUIDELINES.md](GIT-GUIDELINES.md) for commit message format and best practices.

## Success Criteria
- Site looks genuinely professional at first glance
- All pages are fully functional and responsive
- Contact form works correctly
- Content is complete and error-free
- Site loads quickly (<3s)
- Accessible to screen readers
- Works across major browsers (Chrome, Firefox, Safari, Edge)

## Notes for Development
- Use placeholder images initially (unsplash or similar)
- All copy should be ready to populate from the detailed outline
- Form should validate before submission
- Consider adding a "Print Brochure" feature that generates a PDF
- Make it easy to update family member information
- Keep all data in separate files for easy editing
