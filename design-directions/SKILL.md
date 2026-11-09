---
name: design-directions
description: Four distinct visual directions for an app, a site or a concept, each in light and dark mode, on one page to compare and pick from; then a v2 of the chosen one. Works from a new idea or on an interface that already exists (evolve, restyle, or from scratch so the current look doesn't steer it), and can stay inside a style the person names. Use for "/design-directions <concept>", "4 variantes de…", "propuestas de diseño", "design directions for…", "explore looks for my app", "redesign options for this site", "4 variantes de esta app desde cero".
---

# Design directions

Four visual directions for one product, shown on one page, so the person can compare them side by side and pick one (or a mix) before anything is built. This is how Strata's look was chosen: Desk, Canvas, Glass and Field, from the steadiest to the most forward-looking, each showing the same screen in light and dark.

Load the `frontend-design` skill before designing: its calibration (the default AI looks to avoid) applies here.

## 1. Read the request

Settle three things from the person's words. Ask only when the first is missing; otherwise assume and say what you assumed at the top of the page.

1. **The subject.** What it is, who it's for, and the one screen that matters most (the hero screen). For an existing interface, that's the screen people use most.
2. **The style.**
   - Nothing said: four free directions, as different from each other as possible.
   - A style named ("Swiss brutalist", "editorial japonés") or a reference given ("like Teenage Engineering", "like Linear", a URL, a screenshot): all four are variants **inside** that style, different on the other axes (layout, density, colour, type). Look at the reference itself first (open the URL, read the screenshot); never work from the name alone.
   - "One in X, the rest free": pin that one, explore the other three.
3. **The starting point**, when an interface already exists:

| Level | Taken from what exists | Left out on purpose |
|---|---|---|
| **Evolve** | Brand, colours, layout, refreshed | Little |
| **Restyle** (default) | Content, screens, layout | The whole visual system: colours, type, shapes, effects |
| **From scratch** | Only content, data and flows: what it does and which screens it has | Everything visual, layout included |

From scratch: read the app only to learn what it has, never how it looks. Don't take its colours, fonts, radius or layout as a starting point, and don't open its stylesheets until the four are drafted. The page says what was taken from the app and what was ignored.

## 2. Gather the real content

- **Existing interface:** read the code (routes, components, copy, data shapes), run it or use the person's screenshots, and list the real screens, names, labels and data. Use them in every mockup.
- **New concept:** write realistic content for the subject (real-looking names, numbers, states), never lorem ipsum. Mark sample data as sample at the foot of the page.
- When the concept has no name and the person wants one, propose one with a short "why", plus 3-4 alternatives each with its catch (a collision, hard to spell). Nothing is checked for trademarks or domains: say so.

## 3. Design four directions

Each direction must be credible to ship, and the four must differ on at least three of these axes: layout model (fixed panes, full canvas, floating panels, instrument), type pairing, colour strategy, shape (radius, borders, depth), density, motion. Order them from steadiest to most forward-looking, and show that order as a spectrum.

For each direction, give:
- a one-word name and a one-line promise ("A workspace you can stay in all day");
- **Feels like:** three real products or objects;
- **How it works:** three short points (layout, surfaces, how selection or focus shows);
- the palette as 4-6 named hex values for light and for dark, and the type pair with its role;
- **the same hero screen**, built in real HTML and CSS at real size (scaled down with `transform` when it has to fit), plus one key state (a selection, an empty state, a detail);
- **its own Light / Dark switch.** Both modes are designed: dark is its own palette, not an inversion.

Also give:
- **Effort**, for an existing interface: whether it's tokens only, components, or a new layout;
- **The same in all four:** content, structure and voice stay; only the look changes. Say plainly that two can be mixed ("Canvas's floating panels with Field's 3D").
- **A comparison table:** density, motion, effort to build, risk, what each is best for.

## 4. Build the page

One self-contained HTML file:
- Header: the subject, what was assumed, the level (evolve, restyle, from scratch) or the style asked for.
- Name block (only when naming was asked).
- The spectrum, then the four directions, then "The same in all four", then the comparison, then how to pick: "reply with a name, or a mix".
- A global Light / Dark switch next to each direction's own. Tokens are scoped per direction and mode (`[data-dir="desk"][data-mode="dark"]`), so one direction never leaks into another.
- Fonts from Google Fonts. No build step and no framework, unless the person's project already has one and the mockups should use its components.
- Works from 1440 px down to phone width, with no horizontal scroll on the page itself (a mockup may scroll inside its frame). Keyboard focus visible; reduced motion respected.
- The page copy is in the product's language; talk to the person in theirs.

## 5. Check it before showing it

Open it in the browser pane. For each direction, take a screenshot in light and in dark at 1440 px, then one at 390 px. Fix overlapping labels, clipped mockups, unreadable contrast, and any direction that ended up looking like another. Check the console for errors.

## 6. Save and share

- Save it in the project's design folder (`design/`, or the folder the person names): `<slug>-directions.html`.
- Also publish it as a **private** Artifact, following the Artifact tool's own rules (load `artifact-design` before publishing), and give the link in one line. If there's no Artifact tool, give the file path.
- Never share it with anyone; the person shares it if they want to.

## 7. After the pick: v2

When the person picks ("Desk", or "Desk with Canvas's panels"), make `<slug>-<name>-v2.html`:
- the hero screen at full size;
- two more real screens;
- a component sheet (buttons, inputs, cards, lists, empty and error states);
- everything in light and dark, with the tokens written out so they can go into code;
- a short "kept / changed" list against the first version, and what's still open.

Iterate on that file (v3, v4) until the person approves it. Only then propose turning the tokens into the project's theme.
