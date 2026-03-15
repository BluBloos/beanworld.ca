# beanworld.ca

A website for our family Minecraft server. The idea is a family heirloom — a living record of the world we've built together.

## Goals

### Photo Gallery

A collection of screenshots from the server. Builds, adventures, moments.

### Build Database

The server has a history of named builds with creation dates (sourced from in-game signage). This data is embedded in the HTML as JSON and rendered in two ways:

- **Map view** — A hand-drawn map of the world (by our artist cousin) with build locations plotted as interactive points on top of it.
- **Timeline view** — A chronological view of the same builds, showing the history of the server over time.

Both views read from the same data and each have their own JavaScript `render()` function.

## Technical Approach

Plain HTML, CSS, and JavaScript. No build system, no frameworks, no dependencies. The site should "just work" when you open the files. Static hosting only.
