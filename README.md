# Abraham C Martin — Personal Portfolio

This is a lightweight static portfolio for Abraham C Martin. It is designed to work directly on GitHub Pages without a backend or build step.

## Quick setup

1. Open the project folder locally.
2. Open `index.html` in a browser for basic local preview, or serve the folder with a simple static server.
3. Deploy the folder to GitHub Pages by publishing the repository root.

## Files

- `index.html` — main portfolio page
- `style.css` — styling and layout
- `script.js` — content configuration, animations, and weather logic
- `404.html` — GitHub Pages fallback page
- `assets/favicon.svg` — minimal favicon
- `assets/images/` — local SVG artwork for the portfolio

## Editing your content

All personal details and portfolio content can be updated in the configuration object at the top of `script.js`.

### Update introduction / identity

Edit the text directly in `index.html` if you want to change the hero or about section copy.

### Add or remove projects

Update the `projects` array in `script.js`:

```js
projects: [
  {
    title: "Maritime Route Intelligence",
    description: "An experimental project exploring maritime routes, voyage conditions, and risk intelligence.",
    category: "Research concept",
    image: "assets/images/project-maritime.svg",
    url: ""
  }
]
```

Set `url: ""` to show a graceful `Coming soon` label.

### Add reading links

Update the `reading` array in `script.js`:

```js
reading: [
  {
    title: "Attention Is All You Need",
    description: "Transformers and the foundations of modern AI.",
    topic: "AI foundations",
    url: "https://arxiv.org/abs/1706.03762",
    readingTime: "12 min"
  }
]
```

### Configure GitHub and email links

At the top of `script.js`:

```js
const siteConfig = {
  githubUrl: "",
  email: "",
  defaultLocation: ""
};
```

- Leave `githubUrl` empty to hide the GitHub link.
- Leave `email` empty to hide the email link.
- Add values when you are ready.

### Change the default weather behavior

Set `defaultLocation` to a city name to load weather on page open, or leave it blank to require a manual city search.

Example:

```js
defaultLocation: "London"
```

## GitHub Pages deployment

1. Push this folder to a GitHub repository.
2. In GitHub, open the repository settings.
3. Go to Pages.
4. Select the branch you want to publish and keep the root folder as the site source.
5. Save the settings.
6. GitHub Pages will generate a live URL, for example: `https://username.github.io/repository-name/`

Because the site uses relative paths, it works correctly in a repository subpath.

## Notes

- No API key is required.
- Weather is loaded with the public Open-Meteo API.
- The site uses native browser APIs and static assets only.
- The portfolio remains usable even if the weather request fails.

## Access and performance

- The website uses semantic HTML and keyboard-friendly controls.
- Images are local SVG artwork for quick load times.
- Reduce motion is respected for accessibility.
