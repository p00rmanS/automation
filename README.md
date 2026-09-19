# Automation Masterclass

An interactive, from-zero learning center for automation fundamentals (webhooks, HTTP verbs, JSON, auth, status codes, arrays, cron, retries) plus dedicated tracks for n8n, Zapier, Make, GoHighLevel, and Microsoft Power Automate.

## Project structure

```
automation/
  index.html              content + markup for every lesson, tab, and quiz
  src/
    main.js               single entry point — wires up every interactive module
    styles.css            Tailwind import + the hand-authored dark/light theme design system
    js/
      navigation.js        tab switching, progress tracking, on-page jump nav, sticky-nav/scroll-indicator chrome, swipe-left/right navigation between lessons (touch only)
      theme.js              dark/light theme toggle (persisted to localStorage)
      workflowBuilder.js    "Build Your Own Workflow" demo (Fundamentals tab)
      toolRecommender.js    "Which Tool Fits You?" demo (Advanced tab) — scores all 5 tools
      nodeInspector.js      Resource/Operation/Execute-step demo (n8n tab)
      webBasicsDemos.js     polling-vs-webhook, status-code, array-processing demos
      runAfterSimulator.js  "Configure Run After" demo (Power Automate tab)
      backoffSimulator.js   "Exponential Backoff" demo (Advanced Mastery tab)
      debugSimulator.js     "Diagnose the Failure" demo (Advanced Mastery tab)
      approvalCapstone.js   third capstone simulation (Power Automate approval flow)
      capstone.js            first capstone simulation (lead pipeline)
      reputationLoop.js      second capstone simulation (GHL reputation loop)
      conditionBuilder.js   "Build a Condition" demo (Web Basics tab)
      quiz.js                answer checking + scoring (27 questions)
      glossary.js            live search across every glossary term
      faq.js                 FAQ accordion (keyboard-accessible)
      backToTop.js           floating "back to top" button
      animatedSteps.js       shared setTimeout-based log animator used by the capstone demos
  automation_masterclass.html   standalone, single-file fallback (no build step needed —
                                 just double-click it; kept in sync manually, not built —
                                 note: currently behind index.html on content added after
                                 the Power Automate track)
  dist/                    production build output (created by `npm run build`)
  .nvmrc                   pins Node 22 for hosts (also in package.json "engines")
  netlify.toml, vercel.json  host build settings: `npm run build`, publish `dist`
```

## Commands

```bash
npm install     # one-time setup
npm run dev     # local dev server with hot reload — for editing content/styles/JS
npm run build   # produces the optimized, minified site in dist/
npm run preview # serves the dist/ build locally, to sanity-check a production build
```

After `npm run build`, `dist/` is a static site you can host on any static host. It must be served over `http(s)` (any host, or `npm run preview` locally) — browsers block ES-module scripts on `file://`, so double-clicking `dist/index.html` shows the page but none of the buttons work. For a no-server, double-click version use `automation_masterclass.html` instead. The only external request is the Inter / JetBrains Mono font stylesheet from Google Fonts.

## Deploying (Netlify, Vercel, or any static host)

Publish the **build output**, not the repo root — the root `index.html` is Vite source that references `/src/main.js` and won't work as-is.

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output / publish directory | `dist` |
| Node version | 22 (pinned in `.nvmrc` and `package.json` `engines`; Tailwind v4's compiler needs Node 20+) |

`netlify.toml` and `vercel.json` already set the build command and output directory, so importing the repo into either service needs no manual settings. There are no environment variables, server routes, or rewrites to configure — it is a single static page. `automation_masterclass.html` is not part of the build and is not deployed.

## Design system

The visual language (dark theme, cyan/gold/orange accents, card depth, the icon set) is hand-authored CSS in `src/styles.css`, not Tailwind utility classes — it predates this project structure and already achieves the intended look. Tailwind is wired in via `@import "tailwindcss";` and the `@tailwindcss/vite` plugin so its utilities are available for any new UI work without needing extra config.

### Light/dark theming

A light theme is available via the toggle in the header (persisted to `localStorage`, `src/js/theme.js`). Only page **chrome** — the body canvas, header, footer, and sticky nav backdrop — actually changes between themes, driven by CSS custom properties defined in `:root` and `:root[data-theme="light"]` at the top of `styles.css`. Every lesson card (`.concept`, `.definition`, `.quiz`, `.faq-item`, etc.) keeps its dark surface in **both** themes on purpose: the accent-colored text used throughout `index.html` and the JS-generated demo output is hardcoded (not variable-driven), and it stays legible specifically because it always sits on a dark card, never directly on the page canvas. If you add a new top-level chrome element (outside any card), give it theme-aware colors via the existing CSS variables rather than a hardcoded hex value — anything inside a card can keep using the existing hardcoded palette.

## Content pattern

Every foundational concept follows the same three-part explanation: a plain-English **definition**, a **Taglish** explanation, and a real-world **analogy** — visible as the blue, green, and gold callout boxes throughout each lesson.
