# Yuxia Xie — academic website

Website: https://yuxiaxie1.github.io/
Repository: https://github.com/YuxiaXie1/YuxiaXie1.github.io

A multi-page portfolio for GitHub Pages, built with plain HTML, CSS, and JavaScript. It includes interactive spatial-expression maps, an annotated EGFR–MAPK pathway, an animated xMINT walkthrough, filterable news archive, reduced-motion-aware scroll reveals, and a custom monogram.

## Pages

- `index.html` — homepage
- `research.html` — research themes, funding, and tools
- `publications.html` — selected publications, manuscripts, and software
- `news.html` — filterable research news and milestones
- `teaching.html` — teaching and student mentoring
- `about.html` — biography and recent presentations
- `field-notes.html` — personal photo diary
- `contact.html` — contact information
- `cv.html` — embedded academic CV with open/download PDF links

The CV navigation opens `cv.html`, which embeds the locally hosted `Xie_CV.pdf` and offers direct open/download links. To update the CV, replace the root `Xie_CV.pdf` file. Personal photos are stored locally in `assets/` and are served with the website.

## Publish with GitHub Pages

In repository settings, open **Pages**, choose **Deploy from a branch**, select the `main` branch and `/ (root)`, then save. No custom domain is required. The `.nojekyll` file tells GitHub Pages to serve this static site directly.

## Research figures and photo diary

`science.css` and `science.js` supply the research interactions and diary filters. The xMINT walkthrough has play/pause and manual step controls; it starts paused for visitors who prefer reduced motion. Scientific figures remain visible without JavaScript.

Original xMINT, xGATE, and xSCOPE figures and 24 additional photos were imported from the public Google Sites Research Projects and Recent News pages. Files are served locally; provenance is recorded in `assets/imported/sources.json`. The photo diary contains 28 images in total.

Spatial panels are crops of the original xMINT overview, not newly generated measurements. The source does not identify the three output genes or a numeric color scale. The pathway is an explanatory EGFR–RAS–RAF–MEK–ERK diagram based on Reactome, not an xGATE result. Full method figures can be enlarged from the Research page.

To add a diary photo, add a `diary-card` figure in `field-notes.html`, set `data-photo-category` to `travel`, `community`, or `milestones`, and use a local image path. Update the initial photo count. The shared image viewer supports Escape, left/right arrows, focus restoration, and navigation within the visible category.

## License and content rights

Website software (CSS, JavaScript, and reusable HTML structure) is licensed under [Apache-2.0](LICENSE). Photos, research figures, original editorial text, the CV, and personal branding are separately governed by [Content rights](CONTENT-RIGHTS.md). See [License scope](LICENSE-SCOPE.md) for exact boundaries and treatment of earlier releases. Third-party rights and licenses remain with their respective holders.

The website includes a public [rights and permissions page](https://yuxiaxie1.github.io/rights.html). Provenance records do not establish image ownership.

## Design structure

`editorial.css` supplies the shared visual treatment and responsive research chapter layout. Research uses one numbered heading per project (01 xGATE, 02 xMINT, 03 SPACT / SPACT-ST); figure labels are descriptive rather than independently numbered. Complete method figures are grouped within their project using native disclosure controls.

The Research page opens with `assets/research-overview.svg`, an original program-wide illustration combining conceptual diagrams with embedded panels from the xMINT overview. It introduces molecular measurements, tissue morphology, spatial context, and their connection to the three project chapters. The full-size SVG is available from the page for zooming.
