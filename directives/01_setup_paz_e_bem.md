# Setup Paz e Bem Landing Page

## Objective
Initialize the Next.js project for the "Escola PAZ e BEM" landing page, including Tailwind CSS configuration and basic folder structure.

## Inputs
- `docs/paz_e_bem/PRD.md`
- `docs/paz_e_bem/PLANNING.md`

## Tools
- `npx` (Node Package Executor)
- `npm` (Node Package Manager)

## Execution Steps
1. Navigate to the `src` directory.
2. Initialize a new Next.js project named `paz-e-bem` using `create-next-app@latest`.
   - Use TypeScript: Yes
   - Use ESLint: Yes
   - Use Tailwind CSS: Yes
   - Use `src/` directory: Yes
   - Use App Router: Yes
   - Customize default import alias: No (@/*)
3. Navigate into the new project directory.
4. Create the following folder structure inside `src/`:
   - `components/sections` (for Hero, FAQ, etc.)
   - `components/ui` (for buttons, inputs, etc.)
   - `lib` (for utility functions)
   - `styles` (if additional global styles are needed)
5. Verify the installation by running `npm run build` to ensure no initial errors.

## Success Criteria
- Project folder `src/paz-e-bem` exists.
- `package.json` includes `next`, `react`, `react-dom`, `tailwindcss`.
- Specified folder structure is created.
- Build command executes successfully.
