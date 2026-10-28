@AGENTS.md

# Blog SEO Rules

Apply to every new or revised article in `data/blog/*.md`:

- One primary topic (search intent) per article. Don't split one topic across articles or mix two topics in one.
- Search title max ~60 characters including the ` | Iqbal Hamdani` suffix (16 chars), so the title itself ≤ 44. If the H1 `title` is longer, add a shorter `seoTitle` in frontmatter; the H1 stays as written.
- `description`: 120–160 characters, one honest sentence naming the main topic. It is also the article subtitle and the blog-list excerpt.
- `coverImage`: PNG or JPG (social sites don't render SVG), 16:9, e.g. 1600×900. Keep an SVG source next to it if the cover is drawn in SVG.
- Internal links: link the new article to at least one related existing article, and add a link back from that article. Example: the Vercel domain article links to the SSR/SSG/ISR article and vice versa.
- After publishing, request indexing for the new URL in Google Search Console (property `https://www.iqbalhamdani.com/`).
