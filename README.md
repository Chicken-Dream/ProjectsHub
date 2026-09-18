# Dream Team Hub

Static home page for **dreamteamhub.ca**: a grid of project cards. Each card links to a project's own
subdomain (e.g. `https://turtle.dreamteamhub.ca`). The projects themselves live elsewhere; this repo
only holds the home page.

No build step and no dependencies. Plain HTML, CSS and JS.

```
.
├── index.html            # page shell
├── 404.html              # not-found page (used by both GitHub Pages and Cloudflare Pages)
├── css/styles.css        # all styling (grid, cards, hover overlay, dark mode)
├── js/projects.js        # ← the project list, the only file you normally edit
├── js/main.js            # renders the cards from projects.js
├── images/projects/      # card images
├── CNAME                 # custom domain for GitHub Pages (ignored by Cloudflare)
└── .nojekyll             # tells GitHub Pages to serve files as-is
```

## Adding a project

1. Put an image in `images/projects/`. A 16:10 image works best (e.g. 1280×800). It's cropped to fill the card.
2. Add an entry to `js/projects.js`:

   ```js
   {
     title: "Turtle",
     description: "One or two sentences shown on hover.",
     subdomain: "turtle",                  // links to https://turtle.dreamteamhub.ca
     image: "images/projects/turtle.png",
   },
   ```

   To link somewhere other than a `dreamteamhub.ca` subdomain, set `url: "https://..."` instead of `subdomain`.
3. Add a DNS record for the subdomain (see [Project subdomains](#project-subdomains)).

## Local preview

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

---

## Deploying

Pick **one** host for the home page. Both are free and serve the repo as-is.

### Option A: GitHub Pages

1. **Push the repo to GitHub** (public, or private on a paid plan).
2. **Enable Pages:** go to *Settings → Pages → Build and deployment*, set **Source** to *Deploy from a branch*,
   then choose **Branch** `main` and folder `/ (root)`. Click Save.
3. **Custom domain:** in the same page, enter `dreamteamhub.ca` under *Custom domain* and save.
   The `CNAME` file in this repo already contains `dreamteamhub.ca`, which keeps the setting from being lost on redeploys.
   It must hold exactly one domain, with no `https://` and no path.
4. **DNS at your registrar** (or at Cloudflare if it manages your DNS):

   | Type  | Name  | Value                     |
   |-------|-------|---------------------------|
   | A     | `@`   | `185.199.108.153`         |
   | A     | `@`   | `185.199.109.153`         |
   | A     | `@`   | `185.199.110.153`         |
   | A     | `@`   | `185.199.111.153`         |
   | AAAA  | `@`   | `2606:50c0:8000::153`     |
   | AAAA  | `@`   | `2606:50c0:8001::153`     |
   | AAAA  | `@`   | `2606:50c0:8002::153`     |
   | AAAA  | `@`   | `2606:50c0:8003::153`     |
   | CNAME | `www` | `<your-github-username>.github.io` |

   - The apex (`dreamteamhub.ca`) **cannot** be a CNAME at most registrars, which is why it uses A/AAAA records.
   - Delete any other A/AAAA/ALIAS records on `@` (for example the registrar's parking page).
   - GitHub automatically redirects `www.dreamteamhub.ca` to `dreamteamhub.ca` once both are set up.
5. **Verify the domain (recommended):** go to *your GitHub profile → Settings → Pages → Add a domain* and add the TXT record it gives you.
   This stops anyone else from claiming `dreamteamhub.ca` or its subdomains on GitHub Pages.
6. **HTTPS:** once DNS has propagated (from a few minutes up to 24 h), the certificate is issued automatically.
   Then tick **Enforce HTTPS** in *Settings → Pages*.

Every push to `main` redeploys the site.

> **If Cloudflare manages the DNS** but GitHub hosts the site: set those records to **DNS only** (grey cloud).
> With the orange proxy turned on, GitHub can't issue its certificate. If you do proxy them later, set Cloudflare's SSL/TLS mode to **Full**, never *Flexible*, or you'll get redirect loops.

### Option B: Cloudflare Pages

Cloudflare Pages can only serve the **apex** domain (`dreamteamhub.ca`) if the domain's DNS is on Cloudflare.
So first:

1. **Add the domain to Cloudflare:** in the dashboard, go to *Add a domain*, enter `dreamteamhub.ca`, choose the Free plan, then at your `.ca` registrar
   change the nameservers to the two Cloudflare gives you. Wait until the zone shows **Active**.
   Cloudflare copies your existing DNS records over; check that any MX/email records came across.
2. **Create the Pages project:** go to *Workers & Pages → Create → Pages → Connect to Git*, then pick this repo and use:
   - Production branch: `main`
   - Framework preset: `None`
   - Build command: *(leave empty)*
   - Build output directory: `/`

   Deploy. The site becomes available at `<project-name>.pages.dev`.
3. **Custom domain:** in the Pages project, go to *Custom domains → Set up a custom domain* and add `dreamteamhub.ca`.
   Cloudflare creates the DNS record for you (a flattened CNAME on `@` pointing to `<project-name>.pages.dev`) and issues the certificate.
   Add `www.dreamteamhub.ca` the same way if you want it.
   - **Don't** add the domain as a manual CNAME record only. It has to be attached under *Custom domains*, or you'll get a 522 error.
4. **(Optional) Redirect www to the apex:** go to *Rules → Redirect Rules → Create rule*, match on hostname `www.dreamteamhub.ca`, and set a dynamic
   redirect to `concat("https://dreamteamhub.ca", http.request.uri.path)` with status 301.

Every push to `main` redeploys, and pull requests get preview URLs. The `CNAME` and `.nojekyll` files are ignored by Cloudflare and do no harm.

If you'd rather not connect Git, you can deploy straight from your machine:
`npx wrangler pages deploy . --project-name <project-name>`

---

## Project subdomains

Each card links to `https://<subdomain>.dreamteamhub.ca`. Where that project is hosted doesn't matter to this repo.
You only need **one DNS record per project** in whichever DNS provider manages `dreamteamhub.ca`:

| Project hosted on           | DNS record for `turtle`                                   | Also do this on the host |
|-----------------------------|-----------------------------------------------------------|--------------------------|
| GitHub Pages (another repo) | `CNAME turtle → <username>.github.io`                     | In that repo's Pages settings, set the custom domain to `turtle.dreamteamhub.ca` (commits a `CNAME` file there) |
| Cloudflare Pages / Workers  | *(created automatically)*                                 | In that project, go to *Custom domains* and add `turtle.dreamteamhub.ca` |
| Vercel / Netlify / Render   | `CNAME turtle → <target the host gives you>`              | Add `turtle.dreamteamhub.ca` as a domain in that project |
| Your own server / VPS       | `A turtle → <server IPv4>` (plus `AAAA` for IPv6)          | Configure the web server and TLS for `turtle.dreamteamhub.ca` |

Notes:
- A subdomain CNAME only works with a single domain in it. Use `<username>.github.io`, **not** `<username>.github.io/turtle`.
  Repo paths are handled by GitHub once the custom domain is set in that repo.
- Avoid wildcard records (`*.dreamteamhub.ca`) that point at GitHub Pages. Someone else could claim an unused subdomain.
  Verifying the domain on GitHub (step 5 above) also guards against this.
- When you retire a project, delete its DNS record so it doesn't leave a dangling pointer.
