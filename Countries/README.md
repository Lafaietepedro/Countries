# Countries Atlas

A modern country directory built with React and Vite.

## Highlights

- Fast country search with region filtering
- Detailed country pages with neighboring-country navigation
- Persisted light and dark theme
- Responsive layout for desktop, tablet and mobile
- Leaner data layer with batched API requests

## Project Status

This app was validated with:

- `npm run lint`
- `npm run build`
- `npm audit --omit=dev`

## Getting Started

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Scripts

- `npm run dev`: start the development server
- `npm run build`: create the production build
- `npm run preview`: preview the production build locally
- `npm run lint`: run ESLint

## Architecture

- `src/components`: reusable UI building blocks
- `src/routes`: route-level screens
- `src/lib`: API and formatting helpers

## Data Source

This project uses the [REST Countries API](https://restcountries.com/).
