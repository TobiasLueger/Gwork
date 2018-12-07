[![npm Version][NPM VERSION BADGE]][NPM PAGE]
[![Node.js][NODE VERSION BADGE]][NODE PAGE]
[![gulp][GULP VERSION BADGE]][GULP PAGE]


# lern_projekt
*Simple repo to learn new things!*

- It works fine together with gits GitHub Pages

## What have I done?

- [Gulp](https://gulpjs.com/): I have build my own workflow with gulp and npm scripts.
- [SCSS](https://sass-lang.com/): I write my CSS3 code in SCSS and it is compiled over 'gulp' to one minified CSS file.


## Documentation
### Gulp Workflow

**Install all packages from package.json**

```
$ npm install
```

<br>
<br>

**Get started**

```
$ npm start
```

- This command generates a 'public' folder
- Then it changes all SCSS Files to CSS and copies them into the 'public' dir.
- Also all HTML and JS files are copied into the 'public' folder.
- Then a browsersync server will be started with the 'public' folder as it base dir.
- After this gulp is watching for file changes in all SCSS, JS and HTML files
- And if you change a file gulp will track it and update it in the public folder.

<br>
<br>

**Build a new folder with all relevant files**

```
$ npm run build
```

- This command generates a 'docs' folder
- Then it chanes all SCSS and JS Files to CSS and  and copys them into the 'public' dir.
- Also all HTML files are copyed into the 'public' folder.
- Then a browsersync server will be started with the 'public' folder as its base dir.
- After this gulp is watching for file changes in all SCSS, JS and HTML files
- And if you change a file gulp will track it and update it


[NODE PAGE]: https://nodejs.org/
[NODE VERSION BADGE]: https://img.shields.io/badge/node-v8.11.3-orange.svg
[NPM PAGE]: https://www.npmjs.com/
[NPM VERSION BADGE]: https://img.shields.io/badge/npm-6.4.1-green.svg
[GULP PAGE]: https://gulpjs.com/
[GULP VERSION BADGE]: https://img.shields.io/badge/gulp-4.0.0-blue.svg