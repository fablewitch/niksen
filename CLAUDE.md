# Niksen

A Jekyll blog about minimalism, herbalism, and living slowly, published at
https://niksenday.com via GitHub Pages.

## Anonymity — read this first

The site is deliberately anonymous. The author is described only as a technical
person looking for a slower, calmer life away from the hustle of the tech
industry.

- **Never add a name** — not to content, front matter, `_config.yml`, alt text,
  image captions, or commit messages. There is no pen name; don't invent one.
- Refer to the author in the first person ("I work in tech") or as "someone who
  works in tech". Never third-person-with-a-name.
- Commits here must be authored as `fablewitch
  <113906533+fablewitch@users.noreply.github.com>`. This is already set in the
  repo-local git config — don't override it, and don't fall back to the global
  identity.
- `git push` uses SSH and is pinned in `~/.ssh/config` to the fablewitch key.
  If a push ever authenticates as another GitHub account, stop and fix the key
  before pushing.

## Deploying

**Deploys are manual.** `.github/workflows/jekyll.yml` triggers on
`workflow_dispatch` only — pushing to `main` does not publish. To go live, run
"Deploy Jekyll site to Pages" from the Actions tab.

The custom domain is configured in the repo's Pages settings (there is no
`CNAME` file, and none is needed). `_site/` is build output: gitignored, never
committed.

## Layout

| Path | What it is |
|---|---|
| `_posts/` | Journal entries. Topic is one of Minimalism, Herbalism, Living in the moment. |
| `_herbs/` | The Herbarium collection, one file per plant, rendered at `/herbarium/:name/`. |
| `_layouts/` | `default`, `post`, `herb`. |
| `_includes/` | `header`, `footer`, `placeholder`. |
| `assets/` | `styles.css`, `main.js`, and `images/`. |

Post front matter: `title`, `topic`, `date`, `reading_time`, `featured`,
`image`, `excerpt`. Herb front matter: `name`, `title`, `latin`, `tag`, `photo`,
`image`, `note`, `good_for`, `facts`.

There is no `author` field anywhere. Don't reintroduce one.

## Images

Every `image:` field is currently empty, which renders a grey placeholder block.
Real images replace those placeholders.

### Source

Use the **Biodiversity Heritage Library** Flickr stream:
https://www.flickr.com/photos/biodivlibrary/

It holds scanned botanical illustrations from historic natural-history books —
the right period feel for this site, and the collection is published with **"No
known copyright restrictions"**.

### Process

Plates usually show several plants, or a plant surrounded by text and page
margins. Crop to the single subject rather than using the full scan.

1. Search the BHL stream for the plant, preferring its Latin name — search
   `Melissa officinalis` before `lemon balm`. Historic plates are catalogued
   botanically.
1. **Read the caption printed on the plate and check the species matches the
   herb's `latin:` field.** This is the step that actually catches mistakes: of
   the first three plates picked by eye, two were the wrong species — a mint
   plate was *Mentha rotundifolia* rather than *Mentha × piperita*, and a
   chamomile plate was *Anthemis arvensis*, the scentless field lookalike, on a
   page about brewing chamomile tea. French and German captions need
   translating: "menthe poivrée" is peppermint, but plain "camomille" is usually
   Roman chamomile, not German.
2. **Check the licence on that specific photo.** Most BHL items are "No known
   copyright restrictions", but not all are — confirm per image, don't assume
   from the collection.
3. Download the largest available size.
4. Crop out the single plant: drop surrounding plates, page edges, captions, and
   library stamps. Keep the illustration's paper background — it suits the
   palette.
5. Save to `assets/images/<slug>.jpg`, matching the file slug
   (`assets/images/lemon-balm.jpg`).
6. Set the front matter, root-relative: `image: "/assets/images/lemon-balm.jpg"`.

### How plates are displayed

Plates are tall; the layouts are wide. Rather than cropping them to a banner,
the `.plate` class in `styles.css` sits the whole illustration on a paper-toned
mount (`object-fit: contain` on `#f6f2e4`). Crop the source to the illustration
itself — drop page margins, plate numbers, and the engraver credit line — and
let the mount do the rest. Don't crop to an aspect ratio. A printed species
caption may stay when it's set inside the plate, as on the Köhler chamomile.

Images take three front-matter fields on both herbs and posts: `image`,
`image_alt`, and `image_credit`. The credit renders as a small line directly
under the image — that per-image line is the only attribution the site carries,
so fill it in every time. Post lead images still use `16/9` with
`object-fit: cover`; only herb plates get the paper mount.

### Attribution

The licence doesn't require it, but credit the source book and link the BHL
photo page where there's a natural place to do so. Never credit a person by
name — see the anonymity rules above.

### Alt text

The layouts currently emit `alt=""`. When adding a real image, write a real alt
describing the plant and the illustration, e.g.
`alt="Botanical illustration of lemon balm, showing leaves and small flowers"`.

## Local builds

`bundle exec jekyll serve`. Note that system Ruby on this machine is 2.6 and
lacks the bundler version pinned in `Gemfile.lock`, so local builds may not run
without installing a newer Ruby first. CI builds on Ruby 3.3.
