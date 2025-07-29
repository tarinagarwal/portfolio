# Professional Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Express.js featuring a dark royal theme with smoky effects and smooth animations.

## Features

- **Multi-page Portfolio**: Home, About, Portfolio, Skills, Experience, and Contact pages
- **SQLite Database**: Real portfolio data with proper backend API
- **Dark Royal Theme**: Professional design with glassmorphism effects
- **Smooth Animations**: Framer Motion for page transitions and loading states
- **Responsive Design**: Optimized for all device sizes
- **Modern Stack**: React 18, TypeScript, Tailwind CSS, Express.js

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Lucide React for icons

### Backend
- Express.js server
- SQLite database with better-sqlite3
- CORS and security middleware
- RESTful API endpoints

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd server
   npm install
   cd ..
   ```

### Development

To run both frontend and backend simultaneously:
```bash
npm run dev:full
```

Or run them separately:

**Frontend only:**
```bash
npm run dev
```

**Backend only:**
```bash
npm run dev:server
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:3001`

### API Endpoints

- `GET /api/profile` - Get profile information
- `GET /api/projects` - Get all projects
- `GET /api/projects?featured=true` - Get featured projects only
- `GET /api/projects/:id` - Get specific project
- `GET /api/skills` - Get all skills
- `GET /api/skills/category/:category` - Get skills by category
- `GET /api/experience` - Get work experience
- `GET /api/testimonials` - Get testimonials
- `POST /api/contact` - Submit contact form

### Database

The SQLite database is automatically created and populated with sample data when the server starts. The database includes:

- Profile information
- Projects with technologies and links
- Skills with proficiency levels
- Work experience timeline
- Client testimonials

### Customization

To customize the portfolio with your own data:

1. Edit the sample data in `server/database.js`
2. Replace profile images and project screenshots
3. Update social media links and contact information
4. Modify the color scheme in Tailwind configuration

## Deployment

### Frontend
Build the frontend for production:
```bash
npm run build
```

### Backend
The backend can be deployed to any Node.js hosting service. Make sure to:
1. Set environment variables for production
2. Configure CORS origins for your domain
3. Set up proper database backups

## License

This project is licensed under the MIT License.