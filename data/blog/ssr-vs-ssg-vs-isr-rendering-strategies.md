---
slug: ssr-vs-ssg-vs-isr-rendering-strategies
title: SSR vs SSG vs ISR: Understanding Rendering Strategies in Modern JavaScript Frameworks
description: Learn how SSR, SSG, and ISR work, how they differ in freshness and server cost, and how to choose the right strategy for each page in a modern JavaScript application.
date: 2026-07-13
readTime: 9 min read
category: Engineering
tags: [nextjs, nuxt, sveltekit, astro, rendering, performance]
coverImage: /blog/ssr-vs-ssg-vs-isr-rendering-strategies/cover.svg
coverAlt: A visual comparison of server-side rendering, static site generation, and incremental static regeneration.
featured: false
---

When building a modern web application with frameworks such as Next.js, Nuxt, SvelteKit, Gatsby, or Astro, one decision affects both user experience and infrastructure cost: **when should a page be rendered?**

The three most common rendering strategies are:

- **SSR (Server-Side Rendering):** render the page when a request arrives.
- **SSG (Static Site Generation):** render the page during the build.
- **ISR (Incremental Static Regeneration):** serve a cached page and regenerate it when it becomes stale.

None of these strategies is always best. The right choice depends on how fresh the data must be, whether the page is personalized, and how much traffic you expect.

## SSR: Server-Side Rendering

With SSR, the server generates the HTML for a page each time a user requests it.

The basic flow is:

1. A user requests a URL.
2. The server receives the request.
3. The server fetches data from an API or database.
4. The server renders the page into HTML.
5. The browser receives the response.

SSR is a good fit when the response depends on the current request or on private data. Common examples include:

- `/dashboard`
- `/account`
- `/admin`
- `/search?q=laptop`
- `/checkout`

A dashboard, for example, should show the current user's data. A checkout page should use the latest price, stock level, and payment state. Rendering on the server makes it possible to prepare the correct response for that request.

### The cost of uncached SSR

Suppose an e-commerce product page takes 200 milliseconds to fetch product data and another 100 milliseconds to render. An uncached SSR request may take roughly 300 milliseconds.

If many people request the same page, the server might repeat that work for every request:

```text
User A → database query → server render → HTML
User B → database query → server render → HTML
User C → database query → server render → HTML
```

Under heavy traffic, repeated database calls and render operations can consume CPU, memory, and database connections. Requests may wait in a queue, increasing response times or even causing timeouts.

SSR is not automatically slow, and it does not have to query a database on every request. Response caching, database caching, CDN caching, and efficient data fetching can make SSR very fast. The important distinction is that **the default rendering decision happens at request time**.

### When SSR is the right choice

Choose SSR when:

- The page contains private or user-specific data.
- The result must reflect the latest server state.
- The URL, cookies, headers, or session affect the response.
- Slightly stale content would be unacceptable.

For some pages, client-side rendering (CSR) after an initial shell is also a good option. A private dashboard, for instance, may render its interactive data in the browser after authentication rather than embedding it in the initial HTML.

## SSG: Static Site Generation

With SSG, pages are generated during the build process. The build fetches the required data and writes the resulting HTML as a static artifact.

The flow looks like this:

```text
Build or deploy app → fetch content → generate HTML → serve through a CDN
```

When a user opens a static page, the server or CDN can return a file that already exists. There is no need to run the page's rendering logic for every request.

SSG works well for content that is public and changes infrequently, such as:

- About pages
- Marketing pages
- Documentation
- Blog posts
- Project pages

Because static files are easy to cache and distribute, SSG usually provides excellent response times and low server cost.

### The freshness trade-off

The main limitation of pure SSG is that content does not change automatically after deployment.

Imagine that a pricing page is generated with a Pro plan priced at $29 per month. If the price changes to $39 after the build, users may continue seeing $29 until the site is rebuilt and redeployed:

```text
Content changes → rebuild → generate new HTML → deploy again
```

That workflow is perfectly reasonable for stable content. It becomes inconvenient when editors need changes to appear frequently or when a site has thousands of pages that are expensive to rebuild.

## ISR: Incremental Static Regeneration

ISR combines the delivery model of SSG with a controlled way to refresh pages after deployment.

A page is generated and cached like a static page. After a configured period, the cached result becomes stale. A later request can then trigger regeneration, allowing the application to produce a new version without rebuilding the entire site.

The mental model is:

```text
Serve cached page → page becomes stale → regenerate → replace cached page
```

In Next.js, a route or data request can commonly use a revalidation interval such as:

```ts
export const revalidate = 60;
```

This means the cached result can be considered fresh for 60 seconds. It does **not** necessarily mean that a background job rebuilds the page exactly every 60 seconds, even if nobody visits it.

### A typical ISR timeline

Consider a product page generated at 10:00:00 with a price of $999:

- At 10:00:30, a request receives the still-fresh cached page.
- At 10:01:05, the page is stale. Depending on the framework and cache configuration, the request may receive the old page while regeneration starts.
- After regeneration finishes, later requests receive the new page.

This improves performance because most users receive cached HTML, while the application refreshes content only when it needs to.

The exact behavior depends on the framework, hosting platform, cache handler, and whether the application uses blocking or stale-while-revalidate semantics. Treat `revalidate` as a cache policy, not as a universal promise about precisely when every user sees new data.

### When ISR is a good fit

ISR is useful for public pages that change sometimes but do not need a perfectly current response on every request:

- Product catalogs
- Blog posts
- Documentation
- News articles
- Public profile pages
- Marketing pages managed by a CMS

A visitor may briefly see the previous version while the new version is being generated. That is usually an acceptable trade-off for fast delivery and lower server work.

ISR is a poor fit for information that must be immediately correct, such as:

- Bank balances
- Checkout totals
- Private account settings
- Real-time trading prices
- Security-sensitive authorization state

For these pages, use request-time or client-side data fetching with appropriate validation instead of relying on a stale cache.

## How the frameworks differ

The terms are similar across frameworks, but their implementations are not identical.

### Next.js

Next.js has the most recognizable ISR model. Depending on whether you use the App Router or Pages Router, revalidation can be configured through route-level settings, data-fetching options, or on-demand invalidation. The result is generally a cached page or data request that can be refreshed after a defined period.

### Nuxt

Nuxt uses Nitro route rules to configure caching and rendering behavior. For example:

```ts
export default defineNuxtConfig({
  routeRules: {
    "/products/**": { swr: 60 },
    "/blog/**": { isr: 60 },
  },
});
```

`SWR` describes stale-while-revalidate behavior, while `ISR` provides an incremental-regeneration-style model. The exact behavior can vary with the Nitro preset and deployment platform.

### SvelteKit

SvelteKit supports server rendering and prerendering. ISR-like behavior is often provided by the adapter or hosting platform rather than by one universal framework-level switch. Cache-control headers and platform features therefore matter when designing the deployment.

### Gatsby

Gatsby's Deferred Static Generation (DSG) is related to, but different from, ISR. DSG defers generating selected pages until their first request. It is primarily a way to reduce build time for very large sites.

For example, a site with 100,000 posts might generate its most important pages during the build and defer the rest. After a deferred page is generated, subsequent requests can reuse it. That is different from periodically regenerating an already-generated page.

### Astro

Astro is static-first, while adapters can add server rendering and deployment-specific caching. Astro can achieve ISR-like results through server rendering, cache headers, platform features, and server islands, but it does not use exactly the same cache model as Next.js.

## SSG vs ISR: which is faster?

For most users, SSG and ISR are very similar when the page is served from a warm cache. Both can deliver pre-rendered HTML through a CDN or edge cache.

The larger difference is freshness and operational complexity:

- **SSG** is simpler and often cheaper. Content updates require a rebuild and deployment.
- **ISR** is more flexible. Content can refresh after deployment, but it requires cache and regeneration behavior to be understood.

ISR may have extra work on a cache miss or during regeneration, but that usually affects only the requests involved in refreshing the page. For normal cached requests, the user-visible performance difference can be small.

## A practical decision guide

Ask these questions for every route:

1. **Does the page contain private or personalized data?** Use SSR or CSR.
2. **Must the data be correct at the moment of the request?** Use SSR or a client-side request with server validation.
3. **Is the content public and stable?** Use SSG.
4. **Is the content public but updated periodically?** Use ISR or another caching strategy.
5. **Is the site so large that building every page is expensive?** Consider ISR, DSG, or on-demand generation.

A single application can use several strategies at once:

- Landing page → SSG
- Pricing page → SSG or ISR
- Blog and documentation → SSG or ISR
- Product catalog → ISR
- Dashboard → SSR or CSR
- Checkout → SSR or CSR
- Admin panel → SSR or CSR

## Final takeaway

SSR, SSG, and ISR are not competing labels for an entire application. They are tools for deciding when individual pages or data requests should be produced and cached.

- **SSR** prioritizes request-time freshness and personalization.
- **SSG** prioritizes simple, fast, inexpensive delivery for stable content.
- **ISR** balances static performance with the ability to refresh public content after deployment.

The best question is not, “Which rendering strategy is the fastest?” Instead, ask:

- How fresh must this page be?
- Is the content public or user-specific?
- Can users tolerate a short period of stale data?
- What will traffic and build size look like?
- What caching behavior does the chosen deployment platform actually provide?

Once those questions are clear, choosing a rendering strategy becomes a product and infrastructure decision rather than a framework trend.
