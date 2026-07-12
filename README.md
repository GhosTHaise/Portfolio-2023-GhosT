# Fitiavana's Portfolio

A responsive portfolio for Fitiavana, a full-stack developer and data scientist. It presents selected work, skills, experience, testimonials, and a contact form in a motion-rich single-page experience.

[View the live site](https://fitiavanasambatraportfolio.netlify.app/)

## Features

- Filterable project gallery with Sanity-backed content and local fallbacks
- Skills and experience loaded from Sanity
- Validated contact form that stores submissions in Sanity and sends email through Brevo
- Smooth scrolling, section reveals, and Framer Motion interactions
- Responsive, accessible layout with a skip link and keyboard-friendly controls
- Static rendering and optimized images and fonts through Next.js

## Tech stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS and Sass modules
- Framer Motion and Lenis
- Sanity
- Brevo transactional email
- Netlify

## Getting started

### Prerequisites

- Node.js 22 (see `.nvmrc`)
- [pnpm](https://pnpm.io/installation)

### Installation

```bash
git clone https://github.com/GhosTHaise/Portfolio-2023-GhosT.git
cd Portfolio-2023-GhosT
pnpm install
cp .env.example .env.local
```

Update `.env.local` with your service credentials, then start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `BREVO_API_KEY` | Yes, for contact email | Brevo API credential |
| `BREVO_SENDER_EMAIL` | Yes, for contact email | Verified Brevo sender address |
| `BREVO_SENDER_NAME` | No | Display name for contact emails |
| `CONTACT_RECEIVER_EMAIL` | No | Contact recipient; defaults to the portfolio owner |
| `REACT_APP_SANITY_PROJECT_ID` | Yes, for CMS content | Sanity project identifier |
| `SANITY_TOKEN` | Yes, for contact submissions | Sanity write token |

Keep these values server-side and never commit `.env.local`.

## Available commands

```bash
pnpm dev      # start the development server
pnpm build    # create a production build
pnpm start    # run the production server
pnpm lint     # run ESLint
```

## Project structure

```text
app/          App Router entry points and metadata
Container/    Page sections such as About, Work, Skills, and Contact
components/   Shared navigation, layout, motion, and UI components
constants/    Images and portfolio constants
lib/actions/  Sanity queries and contact-form server actions
styles/       Global styles
assets/       Source images and icons
public/       Public static files
tests/        Playwright test suite
```

## Deployment

The repository includes `netlify.toml` for Netlify. Configure the environment variables in the Netlify dashboard, connect the repository, and deploy; Netlify runs `next build` and publishes the `.next` output.
