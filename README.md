# NERV Coffee

NERV Coffee is a concept coffee-shop website exploring the overlap between visual design and front-end development. It is a static, multi-page site built with HTML, CSS, and vanilla JavaScript.

## Live Demo

The live site is available at <https://choreocoder.github.io/NERV-COFFEE/>.

## Features

- Home, About, Menu, and Find Us pages with shared navigation.
- Product and brand imagery, responsive layouts, and scroll-based visual effects.
- A browser-based cart that supports adding, removing, and clearing items.

Cart contents are stored in `localStorage` for the current browser. They are not shared across visitors or devices, and the demo does not process orders or payments.

## Project Timeline

1. **Research and direction:** Reviewed reference sites and established the brand, content, and visual direction.
2. **Structure and identity:** Built the page layouts, navigation, responsive styling, and visual assets.
3. **Interaction:** Added the browser-based cart, scroll behavior, and logo animation with vanilla JavaScript.
4. **Deployment preparation:** Added a GitHub Actions workflow to publish the static site through GitHub Pages.

## Technology

- HTML5, CSS, and vanilla JavaScript.
- GitHub Actions and GitHub Pages for deployment.
- `localStorage` for browser-local cart state.

The optional Express/MySQL code in `backend/` is not used by the live demo and is excluded from the Pages artifact.

## Run Locally

Open `index.html` in a browser, or serve the repository root with a static web server. A local web server is recommended for testing the same relative paths used by Pages.

## Deploy

The workflow at `.github/workflows/deploy.yaml` runs on pushes to `main`. In the repository settings, select **Settings > Pages > GitHub Actions** as the deployment source. After a successful run, use the URL shown in the Actions deployment summary.