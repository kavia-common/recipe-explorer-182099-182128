# Recipe Explorer (Frontend)

A lightweight React app to browse, search, save, and submit recipes. It uses a playful theme, minimal dependencies, and a simple data layer abstraction that can be swapped for a REST backend.

## Quick Start

- Install: `npm install`
- Run dev server: `npm start` (http://localhost:3000)
- Run tests: `npm test`
- Build: `npm run build`

## Project Structure

- src/
  - App.js: App shell + routes
  - index.js: Entry point with BrowserRouter and RecipesProvider
  - theme.css, index.css, App.css: Theme tokens, base styles, and app styling
  - components/: Reusable UI pieces (NavBar, RecipeCard, SearchBar, CategoryFilter, EmptyState)
  - routes/: Top-level pages (RecipeList, RecipeDetail, SavedRecipes, SubmitRecipe, RootLayout)
  - services/recipesApi.js: Data layer abstraction (mock now, REST-ready later)
  - state/recipesContext.jsx: Context store for query, category, results, loading, error
  - hooks/: Reusable hooks (useSavedRecipes for persistence, useQueryParams for URL sync)
  - data/mockRecipes.json: Static dataset consumed by the mock data layer
  - __tests__/: Integration tests for routing, detail, search/filter, and saved persistence
  - test-utils.js: Testing helper to render with providers

## Theming

- Tokens defined in src/theme.css under Ocean Professional theme, with dark mode via [data-theme="dark"].
- The App sets documentElement data-theme in App.js and provides a theme toggle button.
- Use CSS variables (e.g. `--color-secondary`, `--card-bg`) and utilities (`.btn`, `.card`, `.surface`, `.grid`) for consistent styling.

## Routing

- React Router v6 is used.
- Routes defined in App.js with RootLayout wrapper:
  - / (RecipeList): Search, category filter, results grid
  - /recipe/:id (RecipeDetail): Detail view with ingredients/instructions and save toggle
  - /saved (SavedRecipes): Saved items list
  - /submit (SubmitRecipe): Form to submit a recipe (session-only in mock mode)

## Data Layer Abstraction

- src/services/recipesApi.js exports async functions:
  - listRecipes({ query, category, tag })
  - getRecipeById(id)
  - listCategories()
  - saveRecipe(recipe)
- Currently backed by mockRecipes.json and an in-memory session array for creations.
- All functions simulate async to match real network calls.
- Each function contains TODO(backendswap) notes showing how to replace with real fetch calls and how to wire BASE_URL via env.

## Persistence (localStorage)

- Saved recipe IDs are stored via the hook src/hooks/useSavedRecipes.js.
- The storage key is namespaced and versioned: recipeExplorer.saved.v1
  - Format: <app>.<domain>.<version>
  - This avoids collisions and makes migration easier when schema changes.

## URL Sync

- useQueryParams synchronizes `?q` (search query) and `?cat` (category) with the RecipesContext state.
- It updates the URL on state changes and initializes state from the URL, enabling sharable filtered links.

## Replacing the Mock API with a Real Backend

1. Configure the API base URL via environment:
   - Create a .env file (do not commit secrets):
     - REACT_APP_API_BASE_URL=https://api.example.com
   - Restart `npm start` so CRA picks up env vars.

2. Update src/services/recipesApi.js:
   - Uncomment/add `const BASE_URL = process.env.REACT_APP_API_BASE_URL;`
   - Replace implementations per function using the TODO(backendswap) comments:
     - listRecipes: GET `${BASE_URL}/recipes?q=${q}&cat=${cat}&tag=${tag}`
     - getRecipeById: GET `${BASE_URL}/recipes/:id`
     - listCategories: GET `${BASE_URL}/categories` (or derive server-side)
     - saveRecipe: POST `${BASE_URL}/recipes` with JSON body

3. Error handling & loading:
   - The context already manages loading and error states. Ensure your API responds with appropriate status codes.

4. Auth or headers:
   - If needed, add headers to fetch requests (e.g., Authorization).
   - Consider centralizing fetch with a small client wrapper for interceptors and retries.

5. Data shape:
   - Ensure the backend response shape matches the app’s expectations:
     - Recipe fields used: id, title, categories[], ingredients[], instructions[], time{total,unit}, servings, tags[].
   - If different, adapt mapping in recipesApi before returning values.

6. Submissions:
   - After POST saveRecipe, the UI prepends the returned recipe to current results. Alternatively, re-run listRecipes.

## Accessibility Notes

- Keyboard navigation and skip link provided.
- ARIA labels and roles for navigation, search, list states, and alerts.
- Theme toggle provides aria-label and pressed state.

## Testing

- Tests live in src/__tests__/ covering:
  - Routes and navigation
  - Recipe detail loading and error case
  - Search and category filter behavior
  - Saved recipes persistence via localStorage
- Use `npm test` to run.

## Scripts

- `npm start` - Development server
- `npm test` - Jest in watch mode
- `npm run build` - Production build

