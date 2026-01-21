# Modern Portfolio

A stunning dark-themed portfolio website built with Next.js 15, inspired by modern design trends.

## Features

- 🎨 **Dark Theme** - Beautiful dark UI with emerald/green accents
- ✨ **Smooth Animations** - Framer Motion powered animations
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🎯 **Single Page** - Smooth scrolling sections
- 🎠 **Project Carousel** - Swipeable project showcase
- 🏆 **Hackathons Section** - Showcase your achievements
- 📧 **Contact Form** - With image upload via ImgBB
- 🔗 **Magic UI Dock** - Fixed bottom navigation with social links
- 💾 **MongoDB** - Data persistence with Prisma ORM

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Carousel:** Embla Carousel
- **Icons:** Lucide React
- **Database:** MongoDB with Prisma
- **Image Upload:** ImgBB API
- **Fonts:** Geist Sans & Geist Mono

## Getting Started

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

```bash
cp .env.example .env
```

Update the `.env` file with your:

- MongoDB connection string
- ImgBB API key
- Email credentials (optional)

3. **Generate Prisma client:**

```bash
npx prisma generate
```

4. **Push database schema:**

```bash
npx prisma db push
```

5. **Run development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## Customization

### Update Personal Info

Edit the following files:

- `components/Hero.tsx` - Your name and title
- `components/About.tsx` - About section content
- `components/Experience.tsx` - Work experience
- `components/Skills.tsx` - Your skills
- `components/Projects.tsx` - Your projects
- `components/Hackathons.tsx` - Achievements
- `components/Dock.tsx` - Social media links

### Change Colors

Edit `app/globals.css`:

```css
:root {
  --color-1: #10b981; /* Primary color */
  --color-2: #34d399; /* Secondary color */
  --background: #0a0f1e; /* Background */
}
```

## Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts
│   ├── contact/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── About.tsx
│   ├── Dock.tsx
│   ├── Experience.tsx
│   ├── Hackathons.tsx
│   ├── Hero.tsx
│   ├── Projects.tsx
│   └── Skills.tsx
├── lib/
│   └── prisma.ts
└── prisma/
    └── schema.prisma
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

Make sure to:

- Set all environment variables
- Run `npx prisma generate` in build command
- Use Node.js 20.x or higher

## License

MIT License - feel free to use this for your own portfolio!

## Credits

Design inspired by modern web trends and devsbazaar.
Built with ❤️ using Next.js and Tailwind CSS.
