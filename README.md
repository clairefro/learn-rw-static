# Zap

A first attempt at a micro static site generator for rendering docs from markdown.

Inspired by [this lovely piece](https://medium.com/better-programming/how-to-build-a-simple-static-site-generator-using-node-js-6425b71272e0) by [Kartik Nair](https://kartikn.me/about)

### Concept

Run `yarn build` to take all markdown files in `content` directory and parse them into an indexed static website with a homepage.

Site config is set in `config.js`.

### Style

It's got none.

### Server

Some features require a local server to view, like highlightjs syntax highlighting.

Remember there is always good ol' `python3 -m http.server`
