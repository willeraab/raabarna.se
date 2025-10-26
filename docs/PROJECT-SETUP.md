# Project Setup Reference

**Status:** This project is already initialized. Use this document for:
- Understanding the project configuration
- Setting up a new development environment
- Reference for build and deployment

> **Note:** This project uses **Yarn** as the package manager. Install if needed: `npm install -g yarn`

## Current Development Commands

The project is already set up. Use these commands:

```bash
yarn install   # Install/update dependencies
yarn dev      # Start development server (http://localhost:5173)
yarn build    # Build for production
yarn preview  # Preview production build
yarn lint     # Check code quality
```

## Initial Setup Commands

### 1. Create React + Vite + TypeScript Project

```bash
yarn create vite family-consultancy --template react-ts
cd family-consultancy
```

### 2. Install Dependencies

```bash
# Core dependencies
yarn add react-router-dom clsx

# Tailwind CSS
yarn add -D tailwindcss postcss autoprefixer
yarn dlx tailwindcss init -p

# Optional but recommended
yarn add @heroicons/react  # For icons
```

### 3. Configure Tailwind CSS

Create/update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

Update `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-50 text-gray-900;
  }
}
```

### 4. Setup Routing Structure

Update `src/App.tsx`:

```typescript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import CaseStudies from './pages/CaseStudies';
import Contact from './pages/Contact';
import Careers from './pages/Careers';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
```

### 5. Create Directory Structure

```bash
mkdir -p src/{components,pages,data,assets/images,styles}
```

### 6. Create Data Files

These files will hold all the content from CONTENT.md:

```bash
touch src/data/consultants.ts
touch src/data/services.ts
touch src/data/caseStudies.ts
touch src/data/testimonials.ts
```

### 7. Create Component Files

```bash
touch src/components/Navbar.tsx
touch src/components/Footer.tsx
touch src/components/ConsultantCard.tsx
touch src/components/ServiceCard.tsx
touch src/components/CaseStudyCard.tsx
touch src/components/TestimonialCarousel.tsx
touch src/components/ContactForm.tsx
touch src/components/StatsCounter.tsx
touch src/components/Button.tsx
```

### 8. Create Page Files

```bash
touch src/pages/Home.tsx
touch src/pages/About.tsx
touch src/pages/Services.tsx
touch src/pages/CaseStudies.tsx
touch src/pages/Contact.tsx
touch src/pages/Careers.tsx
```

## TypeScript Interfaces

Create `src/types/index.ts`:

```typescript
export interface Consultant {
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

export interface Service {
  id: string;
  consultant: string;
  category: string;
  services: string[];
  description: string;
}

export interface CaseStudy {
  id: string;
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

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
}

export interface ServicePackage {
  name: string;
  price: string;
  features: string[];
  featured?: boolean;
}
```

## Package.json Scripts

These scripts are available via Yarn:

```bash
yarn dev      # Start development server
yarn build    # Build for production
yarn preview  # Preview production build
yarn lint     # Run ESLint
```

The scripts are defined in `package.json`:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

## Environment Variables (Optional)

Create `.env` file for any configuration:

```
VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
VITE_SITE_URL=https://yourfamilyname.com
```

## Git Setup

Create `.gitignore`:

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env
.env.local
.env.production
```

## Placeholder Images

For initial development, use placeholder services:
- Profile photos: https://i.pravatar.cc/300?img=[1-70]
- Generic images: https://picsum.photos/[width]/[height]
- Illustrations: https://undraw.co/illustrations

Replace these with actual family photos later.

## Development Workflow

1. Start with data files (populate from CONTENT.md)
2. Build reusable components (Navbar, Footer, Button, Cards)
3. Create page layouts (one at a time)
4. Add styling and animations
5. Test responsiveness
6. Optimize performance

## Testing Checklist

- [ ] All routes work correctly
- [ ] Responsive on mobile (375px+)
- [ ] Responsive on tablet (768px+)
- [ ] Responsive on desktop (1024px+)
- [ ] Contact form validates inputs
- [ ] Contact form submits successfully
- [ ] Images load properly (or show fallbacks)
- [ ] Navigation works on all pages
- [ ] Footer links work
- [ ] Site loads in <3 seconds
- [ ] No console errors
- [ ] Accessible (keyboard navigation, screen readers)

## Building for Production

```bash
yarn build
```

This creates an optimized production build in the `dist/` directory.

## Production Checklist

- [ ] Replace all placeholder names with actual family names
- [ ] Add actual family photos
- [ ] Update contact information
- [ ] Set up contact form endpoint
- [ ] Test on multiple browsers
- [ ] Test on actual mobile devices
- [ ] Create favicon
- [ ] Add Open Graph meta tags for social sharing

## Maintenance

To update content:
1. Edit data files in `src/data/`
2. Rebuild: `yarn build`

No code changes needed for content updates!

## Yarn vs NPM

This project uses Yarn for dependency management. Key differences:

| Task | NPM | Yarn |
|------|-----|------|
| Install dependencies | `npm install` | `yarn` or `yarn install` |
| Add dependency | `npm install <package>` | `yarn add <package>` |
| Add dev dependency | `npm install -D <package>` | `yarn add -D <package>` |
| Remove dependency | `npm uninstall <package>` | `yarn remove <package>` |
| Run script | `npm run <script>` | `yarn <script>` |
| Update dependencies | `npm update` | `yarn upgrade` |

**Benefits of Yarn:**
- Faster installs with parallel downloads
- More reliable with `yarn.lock` file
- Better offline support
- Cleaner console output
