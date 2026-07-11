# Product Engineer Portfolio

A modern, production-ready portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. This template showcases a product engineer&apos;s work and expertise.

## Features

- ✅ **App Router**: Next.js 15 App Router for optimal performance
- ✅ **TypeScript**: Full type safety across the application
- ✅ **Dark Mode**: Theme system with light/dark mode support
- ✅ **Responsive Design**: Mobile-first, fully responsive layout
- ✅ **Animations**: Framer Motion for smooth, performant animations
- ✅ **SEO Optimized**: Meta tags, Open Graph, structured data
- ✅ **Accessibility**: WCAG compliant components
- ✅ **Clean Architecture**: Reusable components and utilities

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
│   ├── Button.tsx   # Button component (primary, secondary, outline)
│   ├── Card.tsx     # Card component with hover effect
│   ├── Section.tsx  # Section wrapper for consistent spacing
│   ├── Navbar.tsx   # Navigation bar with mobile menu
│   ├── Footer.tsx   # Footer with links and social
│   ├── Hero.tsx     # Hero section
│   ├── About.tsx    # About section
│   ├── Experience.tsx # Experience/work history section
│   ├── Projects.tsx  # Portfolio projects showcase
│   ├── Skills.tsx   # Skills section
│   ├── Contact.tsx  # Contact form and methods
│   └── LoadingScreen.tsx # Initial loading animation
├── config/          # Configuration files
│   └── theme.ts    # Theme colors and spacing constants
├── lib/             # Utility functions and providers
│   └── theme-provider.tsx # Theme context and hook
└── styles/
    └── globals.css  # Global styles and CSS variables
```

## Getting Started

### Prerequisites

- Node.js 18+ (Next.js 15 requirement)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Start development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see your portfolio.

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Key Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion 11
- **Linting**: ESLint with Next.js preset

## Customization

### Update Personal Information

Edit components to add your actual content:
- `src/components/Hero.tsx` - Hero title and description
- `src/components/About.tsx` - About section content
- `src/components/Experience.tsx` - Work experience
- `src/components/Projects.tsx` - Project details
- `src/components/Skills.tsx` - Your skills
- `src/components/Contact.tsx` - Contact links

### Theme Customization

Edit `src/config/theme.ts` to customize colors and spacing:

```typescript
export const lightTheme = {
  colors: {
    accent: '#2563eb', // Change primary accent color
    // ... other colors
  },
};
```

CSS variables are applied in `src/lib/theme-provider.tsx`.

### Add Images

Replace placeholder images in components:
- Hero section background
- Project images
- Profile picture

## TODO Items

Throughout the codebase, there are TODO comments indicating areas for enhancement:

### High Priority
- [ ] Integrate email service (SendGrid, Resend, etc.)
- [ ] Add form validation and reCAPTCHA
- [ ] Replace placeholder images with actual assets
- [ ] Update personal information in all sections

### Medium Priority
- [ ] Add scroll-triggered animations
- [ ] Implement image lazy loading
- [ ] Add project filtering by technology
- [ ] Create project detail modals

### Low Priority (Polish)
- [ ] Add typing animations
- [ ] Add floating shape animations
- [ ] Add parallax effects
- [ ] Add page transition animations

## Performance Optimization

- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- CSS-in-JS with Tailwind for minimal bundle
- SEO metadata for better search rankings

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

```bash
vercel
```

### Deploy to Other Platforms

- **Netlify**: `netlify deploy`
- **AWS Amplify**: AWS Amplify console
- **Self-hosted**: `npm run build && npm start`

## SEO Checklist

- [ ] Update meta tags in `src/app/layout.tsx`
- [ ] Add Open Graph images
- [ ] Create sitemap
- [ ] Add robots.txt
- [ ] Submit to Google Search Console
- [ ] Add structured data (JSON-LD)
- [ ] Optimize Core Web Vitals

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Color contrast ratios meet WCAG AA standards
- Keyboard navigation support
- Focus states on all interactive elements

## License

MIT License - feel free to use this template for your portfolio.

## Support

For issues or questions, please check the TODO comments throughout the codebase for guidance on common customizations.
