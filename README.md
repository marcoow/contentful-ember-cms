# contentful

This is a short example project that show how one would load content from
Contentful as part of the Ember build, transform the content into a format that
is easily digestable for the Ember.js application and write it to JSON file(s)
that can be deployed with the application.

This uses Contentful's
[Sync API](https://contentful.github.io/contentful.js/contentful/7.10.0/Sync.html)
so that it downloads **all** of the content during the initial build (e.g. on
CI or when just starting up the Ember.js development server) and on subsequent
builds only loads the delta between the previously loaded content and the
latest content on Contentful's servers. This can be helpful during development
when working both on the Ember.js application and the content (and potentially
content model) in Cloudflare. In that case, one would want to always see the
latest content without having to download all of it every time. This behavior
can be opted in to with the `LIVE_CONTENT` environment variable:

```
LIVE_CONTENT=1 ember s
```

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd contentful`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
