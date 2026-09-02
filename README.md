# Shopify Growth AI

An editable Shopify growth command center for clothing brands. It includes analysis, a $10k roadmap, campaign ideas, creative direction, and an editable tech-pack builder.

## Edit in VS Code

Open this folder in VS Code. The editable site files are in `public/`:

- `index.html` — dashboard structure and copy
- `styles.css` and `techpack.css` — visual design
- `app.js` — interactions, calculators, strategy generators, and tech-pack export

## Run it locally

Use `npm run dev`, then open the shown local address.

## Publish an update

Run `npm run build`, commit your changes, then publish a new GPT Sites version. The deployment package is generated in `dist/`.

## Important

The current dashboard uses interactive demonstration data. Connecting it to a live Shopify store requires a private/custom app and server-side access-token configuration; never put a Shopify Admin API token in browser code.
