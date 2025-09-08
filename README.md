# Botifyx - Professional Web Development & AI Solutions

A modern, production-ready marketing website for Botifyx built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations and micro-interactions
- **Fully Responsive**: Optimized for all device sizes from mobile to desktop
- **SEO Optimized**: Meta tags, Open Graph, and structured data for better search visibility
- **Performance Focused**: Optimized images, lazy loading, and efficient code splitting
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels and keyboard navigation
- **Interactive Components**: Engaging UI elements with hover states and transitions

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom configuration
- **Fonts**: Inter & Manrope from Google Fonts
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Animations**: CSS transitions and Tailwind animations

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   ├── services/         # Services page
│   ├── solutions/        # AI/ML solutions page
│   ├── contact/          # Contact page
│   └── thank-you/        # Thank you page
├── components/            # Reusable components
│   ├── Navigation.tsx    # Main navigation
│   ├── Hero.tsx         # Hero section
│   ├── ValueProps.tsx   # Value propositions
│   ├── Process.tsx      # Process timeline
│   ├── CaseStudyCard.tsx # Case study cards
│   ├── Testimonial.tsx  # Testimonial component
│   ├── PricingCards.tsx # Pricing section
│   ├── LeadForm.tsx     # Contact form
│   ├── Footer.tsx       # Site footer
│   ├── WhatsAppButton.tsx # WhatsApp floating button
│   └── StickyConsultButton.tsx # Sticky consultation CTA
├── public/               # Static assets
└── lib/                 # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd botifyx-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Manual Build

```bash
npm run build
npm run start
```

## 🎨 Customization

### Colors

The design system uses a custom color palette defined in `tailwind.config.ts`:

- **Primary**: Indigo (#4F46E5)
- **Dark**: #0B1020
- **Accent**: Cyan (#22D3EE)

### Fonts

- **Headings**: Manrope (Google Fonts)
- **Body**: Inter (Google Fonts)

### Components

All components are modular and reusable. Key components include:

- **Hero**: Main landing section with animated elements
- **ValueProps**: 4-column value proposition grid
- **Process**: Interactive 4-step timeline
- **PricingCards**: 3-tier pricing with toggle
- **LeadForm**: Contact form with validation

## 📱 Pages

1. **Home** (`/`) - Hero, value props, process, case studies, testimonials, pricing
2. **Services** (`/services`) - Detailed service offerings
3. **Solutions** (`/solutions`) - AI/ML and chatbot solutions
4. **Contact** (`/contact`) - Contact form and information
5. **Thank You** (`/thank-you`) - Post-form submission page

## 🔧 Environment Variables

Create a `.env.local` file for any environment-specific variables:

```env
# Add any required environment variables here
NEXT_PUBLIC_SITE_URL=https://www.botifyx.in
```

## 📊 Performance

- **Core Web Vitals**: Optimized for excellent scores
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic code splitting for optimal loading
- **Caching**: Proper caching headers for static assets

## 🔒 Security

- **Form Validation**: Client and server-side validation
- **XSS Protection**: Sanitized inputs and outputs
- **HTTPS**: SSL/TLS encryption in production

## 📞 Support

For support and questions:

- **Email**: info@botifyx.in
- **Phone**: +91 95664 43876
- **WhatsApp**: Available via floating button
- **Calendar**: Schedule consultation via zcal.co integration

## 📄 License

This project is proprietary and confidential. All rights reserved by Botifyx.

---

Built with ❤️ by the Botifyx team