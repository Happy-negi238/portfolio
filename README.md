# Portfolio Website

A modern, full-stack portfolio application built with Next.js 16, React 19, and TypeScript. Features an interactive admin dashboard for managing projects and showcasing your professional work.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Guide](#development-guide)
- [Available Scripts](#available-scripts)
- [Database Setup](#database-setup)
- [Deployment](#deployment)

## Features

✨ **Modern UI/UX**
- Responsive design with TailwindCSS
- Smooth animations using Motion
- Component library with Shadcn/UI

📊 **Admin Dashboard**
- Project management (CRUD operations)
- User-friendly forms with React Hook Form

📦 **Database**
- Drizzle ORM for type-safe queries
- Neon serverless database
- Database migrations and seed support

## Tech Stack

### Frontend
- **Framework**: [Next.js 16.2.6](https://nextjs.org/) - React framework with SSR
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: 
  - [TailwindCSS 4](https://tailwindcss.com/) - Utility-first CSS
- **UI Components**:
  - [Shadcn/UI](https://ui.shadcn.com/) - High-quality components
  - [Ark UI](https://ark-ui.com/) - Headless components
  - [Radix UI](https://www.radix-ui.com/) - Primitives
- **Animations**: [Motion](https://motion.dev/) - Smooth animations
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library

### State Management & Forms
- **Form Management**: [React Hook Form 7.77.0](https://react-hook-form.com/)
- **Data Validation**: [Zod 4.4.3](https://zod.dev/) - TypeScript-first schema validation
- **Theming**: [next-themes 0.4.6](https://github.com/pacocoursey/next-themes)

### Database
- **ORM**: [Drizzle ORM 0.45.2](https://orm.drizzle.team/) - Type-safe SQL query builder
- **Database**: [Neon 1.1.0](https://neon.tech/) - Serverless PostgreSQL
- **Migration Tool**: [Drizzle Kit 0.31.10](https://orm.drizzle.team/kit-docs/overview)

### UI Features
- **Data Tables**: [@tanstack/react-table 8.21.3](https://tanstack.com/table/v8/)

### Security & Auth
- **Fingerprinting**: [@fingerprintjs](https://fingerprint.com/blog/open-source-fingerprinting/)

### Development Tools
- **Linting**: [ESLint 9.39.4](https://eslint.org/)
- **Formatting**: [Prettier 3.8.3](https://prettier.io/)
- **React Compiler**: Babel plugin for optimized React compilation

## Project Structure

```
src/
├── app/                          # Next.js App Router (pages & layouts)
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── admin/                    # Admin dashboard routes
│   │   ├── layout.tsx            # Admin layout with sidebar
│   │   ├── page.tsx              # Admin overview
│   │   ├── projects/             # Project list view
│   │   │   └── page.tsx
│   │   ├── projectlist/          # Project management
│   │   │   ├── page.tsx
│   │   │   ├── deleteconfirmationdialog.tsx
│   │   │   └── updateformfields.tsx
│   │   └── config/               # Configuration page
│   │       └── page.tsx
│   ├── api/                      # API routes
│   │   └── visitors/             # Visitor tracking
│   │       └── route.ts
│   └── favicon.ico
│
├── components/                   # Reusable React components
│   ├── ui/                       # Shadcn/UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── sidebar.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── select.tsx
│   │   ├── checkbox.tsx
│   │   ├── label.tsx
│   │   ├── avatar.tsx
│   │   ├── drawer.tsx
│   │   ├── skeleton.tsx
│   │   ├── separator.tsx
│   │   ├── tooltip.tsx
│   │   ├── toggle.tsx
│   │   ├── toggle-group.tsx
│   │   ├── chart.tsx
│   │   ├── marquee.tsx
│   │   ├── marqueeskill.tsx
│   │   ├── sonner.tsx
│   │   └── sheet.tsx
│   ├── home/                     # Home page components
│   │   └── home.tsx
│   ├── landing/                  # Landing section
│   │   └── landing.tsx
│   ├── about/                    # About section
│   │   └── about.tsx
│   ├── projects/                 # Projects showcase
│   │   └── projects.tsx
│   ├── contact/                  # Contact section
│   │   └── contact.tsx
│   ├── count/                    # Statistics counter
│   │   └── count.tsx
│   ├── nav-main.tsx              # Main navigation
│   ├── nav-user.tsx              # User navigation
│   ├── site-header.tsx           # Header component
│   ├── app-sidebar.tsx           # Admin sidebar
│   ├── admindialog/              # Admin dialogs
│   │   └── admindialog.tsx
│   ├── contactpeople/            # Contact people component
│   │   └── contactpeople.tsx
│   └── systaliko-ui/             # Custom UI components
│       ├── header.tsx
│       └── ...
│
├── db/                           # Database layer
│   ├── config/
│   │   └── db.ts                 # Database connection setup
│   └── models/
│       └── schema.ts             # Drizzle schema definitions
│
├── lib/                          # Utility functions
│   ├── utils.ts                  # General utilities
│   └── systaliko-ui/             # Custom hooks and utilities
│       └── use-toggle-onscroll.ts
│
├── hooks/                        # Custom React hooks
│   └── use-mobile.ts             # Mobile detection hook
│
└── types/                        # TypeScript type definitions

public/                           # Static assets
├── profileImage.jpeg
├── profile_dot.png
├── pdf/
│   └── chandrapal_resume.pdf
├── icon/                         # Technology icons
│   ├── typescript.svg
│   ├── javascript.svg
│   ├── react.js.svg
│   ├── next.js.svg
│   ├── node.js.svg
│   ├── express.js.svg
│   ├── mongodb.svg
│   ├── postgresql.svg
│   ├── mysql.svg
│   ├── git.svg
│   ├── github.svg
│   ├── zod.svg
│   └── drizzle.svg
└── projects/                     # Project images (auto-generated)
    └── [project-id]-[hash].png
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd portfolio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Update `.env.local` with your configuration:
```env
# Database
DATABASE_URL=your_neon_database_url

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Other configurations
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Set up database**
```bash
# Generate database schema
npm run db:generate

# Run migrations
npm run db:migrate
```

5. **Run development server**
```bash
npm run dev
```

## Development Guide

### Project Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Main landing page with profile and highlights |
| Admin Dashboard | `/admin` | Admin overview and statistics |
| Project Management | `/admin/projects` | List and manage projects |
| Configuration | `/admin/config` | Settings and configuration |

### Key Components

**Home Sections:**
- **Landing**: Hero section with introduction
- **About**: Professional background and skills
- **Projects**: Portfolio projects showcase
- **Contact**: Contact information and forms
- **Count**: Statistics and achievements

**Admin Components:**
- **App Sidebar**: Navigation sidebar for admin
- **Project List**: Manage projects with CRUD operations
- **Update Form**: Project update form with validation
- **Delete Confirmation**: Confirmation dialog for deletions

### Working with Forms

This project uses **React Hook Form** for efficient form management and **Zod** for validation:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
});

export function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

## Available Scripts

### Development

```bash
npm run dev
```
Starts the Next.js development server with hot reload.

### Production Build

```bash
npm run build
```
Creates an optimized production build.

### Start Production Server

```bash
npm run start
```
Runs the production server.

### Database

```bash
npm run db:generate
```
Generates new migrations from schema changes.

```bash
npm run db:migrate
```
Applies pending database migrations.

### Linting & Formatting

```bash
npm run lint
```
Runs ESLint to check code quality.

```bash
npm run format
```
Formats code with Prettier.

## Database Setup

### Schema Definition

Database schema is defined in `src/db/models/schema.ts` using Drizzle:

```typescript
import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const projectsTable = pgTable('projects', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  description: text(),
  image: text(),
  createdAt: timestamp().defaultNow(),
});
```

### Connection

Database connection is configured in `src/db/config/db.ts`:

```typescript
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@/db/models/schema';

export const db = drizzle(
  new NeonHttpDriver(process.env.DATABASE_URL),
  { schema }
);
```

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy using any hosting provider
# The `.next` folder contains all necessary files
```

### Pre-deployment Checklist

- ✅ All environment variables are set
- ✅ Database migrations are up to date
- ✅ Tests pass (`npm run test`)
- ✅ Code is linted (`npm run lint`)
- ✅ Production build succeeds (`npm run build`)

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs)
- [Shadcn/UI](https://ui.shadcn.com/)

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please open a GitHub issue or contact the project maintainer.
