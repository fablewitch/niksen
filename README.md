# Niksen

A quiet blog on minimalism, herbalism, and living in the moment.
Built with **Jekyll** — content is Markdown, pages are rendered at build time.

*niksen*, Dutch — doing nothing, on purpose.

## Files

```
site/
  _config.yml               Site settings, collections, permalinks
  Gemfile                   Jekyll + plugins
  index.html                Home / journal
  herbarium.html            Herb index with filters  → /herbarium/
  about.html                About                    → /about/
  _posts/                   One Markdown file per post
    2026-07-14-doing-one-thing.md
  _herbs/                   Herbs collection         → /herbarium/:slug/
    chamomile.md
  _layouts/
    default.html            Shell: head, header, footer
    post.html               Single post
    herb.html               Single herb
  _includes/
    header.html  footer.html  placeholder.html
  assets/
    styles.css              All styling
    main.js                 Filter chips + newsletter form
```

## Writing

Add a post as `_posts/YYYY-MM-DD-slug.md`:

```yaml
---
title: "A title"
topic: "Herbalism"          # Minimalism | Herbalism | Living in the moment
date: 2026-07-14
reading_time: "6 min read"
featured: false             # true pins it to the top of the home page
image: ""                   # empty renders a placeholder block
image_alt: ""               # describe the photo; required whenever image is set
image_credit: ""            # source line shown under the image
excerpt: "One or two sentences — used on the home page and in the RSS feed."
---

Body in Markdown.
```

Add a herb as `_herbs/slug.md` with `name`, `latin`, `tag`, `photo`, `image`,
`image_alt`, `image_credit`, `note`, `good_for`, and a `facts` list of `k`/`v`
pairs.

Topics and herbarium filter chips are derived from the content — no list to
keep in sync.

## Run it locally

```
bundle install
bundle exec jekyll serve
# visit http://localhost:4000
```

Needs Ruby 3.0+. macOS ships 2.6, so install a newer one first
(`brew install ruby`) or build in Docker:

```
docker run --rm -v "$PWD":/srv -w /srv -p 4000:4000 ruby:3.3-alpine \
  sh -c "apk add --no-cache build-base && bundle install && \
         bundle exec jekyll serve --host 0.0.0.0"
```

## Publishing to GitHub Pages

`.github/workflows/jekyll.yml` builds and deploys the site. It is currently
**manual-only** (`workflow_dispatch`) because Pages is not enabled yet.

To go live:

1. GitHub Pages needs a public repo unless the account is on GitHub Pro.
2. Repo → **Settings → Pages → Source: GitHub Actions**.
3. Add the push trigger back to the workflow so every commit deploys:
   ```yaml
   on:
     push:
       branches: [main]
     workflow_dispatch:
   ```
4. Set `url` in `_config.yml` to the published address. The workflow passes
   `--baseurl` automatically, and every link uses `relative_url`, so a project
   site served from `/niksen/` works without further changes.
