# Learn Redwood - custom static site generator test

An attempt to build a multi-lingual, verisoned documentation site generator for Redwoodjs.


### Concept

Run `yarn build` to take all markdown files in `content` directory and parse them into an indexed static website with a homepage.

Site config is set in `config.js`.

### Convention

The nesting of the source dir content will become the public html path.

Therefore, markdown files must be organized in the source dir (defaults to "content" and can be configured in `config.js`) with a minimum of a version tier and language tier. 

```
content 
  version
    lang
```

The version tier can be freely named. The language tier dirs should be valid [ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes). 

example:
```terminal
content
  v1
    en
      tutorial
        welcome-to-redwood.md
        installation.md
      cookbook
        how-to-do-it.md
        how-to-do-something-else.md
    ja
      tutorial
        welcome-to-redwood.md
        installation.md
      cookbook
        how-to-do-it.md
        how-to-do-something-else.md
```

^ Note: doc staleness of translations would be monitored with Gitlocalize. 

The above structure outputs html rendering of the markdown into the output public static dir (also configurable in `config.js`, deafults to `public/docs`

```terminal
public
  v1
    en
      tutorial
        welcome-to-redwood.html
        installation.html
      cookbook
        how-to-do-it.html
        how-to-do-something-else.html
    ja
      tutorial
        welcome-to-redwood.html
        installation.html
      cookbook
        how-to-do-it.html
        how-to-do-something-else.html
```

### Style

It's got none.

### Server

Some features require a local server to view, like highlightjs syntax highlighting.

Remember there is always good ol' `python3 -m http.server`
