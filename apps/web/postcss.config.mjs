// apps/web/postcss.config.mjs
import path from "path";

export default {
  plugins: {
    '@tailwindcss/postcss': {
      // Tell Tailwind to look at the monorepo root so it sees /packages/ui
      base: path.resolve(process.cwd(), "../../"), 
    },
    'autoprefixer': {},
  },
}