# AI Coding Agent Guidelines for This Codebase

## Overview
This project is an Express.js application with the following structure:
- **`app.js`**: The main entry point of the application.
- **`routes/`**: Contains route handlers for different endpoints.
- **`views/`**: Includes Pug templates for rendering HTML.
- **`public/`**: Static assets like CSS, JavaScript, and images.

## Key Components
1. **Routing**:
   - Routes are defined in `routes/index.js` and `routes/users.js`.
   - Follow the pattern of separating route logic into these files.

2. **Views**:
   - Pug templates are used for rendering views.
   - The layout is defined in `views/layout.pug`.
   - Error handling views are in `views/error.pug`.

3. **Static Files**:
   - Static assets are served from the `public/` directory.
   - Organized into subdirectories: `images/`, `javascripts/`, and `stylesheets/`.

## Developer Workflows
### Running the Application
- Use `yarn start` to start the application.
- The entry point is `bin/www`.

### Debugging
- Debugging can be done by setting breakpoints in `app.js` or route files.
- Use `node --inspect` for debugging with Chrome DevTools.

### Adding Routes
- Create a new file in `routes/`.
- Export a router instance using `express.Router()`.
- Mount the router in `app.js`.

### Modifying Views
- Edit the corresponding `.pug` file in `views/`.
- Ensure consistency with the layout defined in `layout.pug`.

## Project-Specific Conventions
- **Error Handling**:
  - Use middleware for centralized error handling.
  - Example: `app.use((err, req, res, next) => { ... });` in `app.js`.
- **Static Assets**:
  - Place all static files in the `public/` directory.
  - Use relative paths in `.pug` files to reference these assets.

## External Dependencies
- **Express.js**: Core framework for the application.
- **Pug**: Template engine for rendering views.
- **Yarn**: Dependency management.

## Integration Points
- Middleware is added in `app.js`.
- Static files are served using `express.static()`.
- Routes are modularized in the `routes/` directory.

## Examples
### Adding a New Route
1. Create `routes/example.js`:
   ```javascript
   const express = require('express');
   const router = express.Router();

   router.get('/', (req, res) => {
       res.send('Example route');
   });

   module.exports = router;
   ```
2. Mount the route in `app.js`:
   ```javascript
   const exampleRouter = require('./routes/example');
   app.use('/example', exampleRouter);
   ```

### Adding a New View
1. Create `views/example.pug`:
   ```pug
   extends layout

   block content
       h1 Example Page
   ```
2. Add a route to render the view:
   ```javascript
   router.get('/example', (req, res) => {
       res.render('example');
   });
   ```

---

This document is a living guide. Update it as the project evolves.