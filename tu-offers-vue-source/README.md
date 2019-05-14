# tuoffers

> TU Offers

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



## Updating & Deploying Changes 

- Make the necessary code changes within the `src` folder

- Run `npm run export` to generate the bundled assets

- The updated JavaScript bundle files can be found in `dist/static/js`

  - Note that these `.js` files also include the CSS used by the Vue components

- Copy these new files and use them to replace the old files, wherever they are deployed.

  - In the HTML folder, these can be found at `tu-offers-extracted/js/offers`

- The new Vue code should now be available in the environment that you pasted the new bundle into. (May require clearing cache/incognito window to see changes immediately)
