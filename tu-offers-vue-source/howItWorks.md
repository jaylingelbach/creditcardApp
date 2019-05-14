# Basic overview

> TU Offers

The code that you should edit is in the src folder.
This is not in depth, just enough to show how data flows and basic structure.

There are two main folders within src

> Components Folder

Within This folder are two categories of folders:
1. Common : The files within this folder are meant to be imported into other files. These are individual components mainly dropdown menus.
2. Offer page specific folders: You will see one for credit, another for deposits, etc. Within each of these folders 
will be several types of vue files. 
  * offerResults.vue and offerDetails.vue show results from the API.  
  * Files named like xMobileFilters.vue (i.e. depositsMobileFilters.vue) control the layout of the mobile version of filters.
  * compareMoffers control the layout of the compare function in mobile.

> Offers folder

These are the parent pages. 
* They are templates that import custom components such as the filters or offerResults.
* This is also the source of data that is used to display in components such as the filters. For example in creditOffers.vue the first dropdownFilter component used on line 36 
```
# creditOffers.vue
<dropdownFilter 
    :filters="creditRating" 
    :multiCol=false
    @filtersChanged="onCreditRatingChange">
</dropdownFilter>
```
would use the creditRating.filterList.name on line 119 to populate the menu.
```
# creditOffers.vue
creditRating: {
        queryType: 'ccrate',
        defaultFilterText: 'Credit Score Rank',
        filterList: [{
          name: "Excellent Credit",
          active: true,
          query: "1"
        }, {
          name: "Good Credit",
          active: false,
          query: "2"
        }, {
          name: "Fair Credit",
          active: false,
          query: "3"
        }, {
          name: "Poor Credit",
          active: false,
          query: "4"
        }, {
          name: "New to Credit",
          active: false,
          query: "5"
        }]
      },
```

 See lines 8-20 in dropdownFilter.vue to see how the data is populated.

```
# dropdownFilter.vue
# Iterates through the filterList and displays the filter.name for every item in the filterList.
<ul>
    <li v-for="filter in filtersList" :key="filter.id">
        <div class="checkbox">
            <label>
                <input type="checkbox" 
                    :value="filter.query" 
                    id="filter.query"
                    @click="onFilterChange($event)"
                    v-model="selectedFilters">
                    <span>{{filter.name}}</span>
            </label>
        </div>
    </li>
</ul>
```

> The QuinnStreet API

Query Params are different for each API. 
* The access token is typically queried as src: XXXXXX it may not be labeled as src, check the API docs for the correct query param
* I missed this first time through the API docs but ip address, user agent, referring URL and NOT required or used for JS.


The getOffers function is responsible for the query. It passes in the queryParams obj in the data function of the same page.
* getOffers function
```
# In each of the offers pages, but this is taken from creditOffers.vue

getOffers: function () {
      this.$http.jsonp('https://www.nextinsure.com/ListingDisplay/Display/', {
        params: this.queryParams
      }).then(function (data) {
        if (data.body.ResultSet) {
          this.creditResults = Number(data.body.ResultSet.TotalRecords) > 0 ? data.body.ResultSet.Listing.map(item => Object.assign({}, item, {
            selectToCompare: false
          })) : [];
          this.showNoResults = Number(data.body.ResultSet.TotalRecords) > 0 ? false : true;
        }
      }, function (error) {
        this.noResultsMsg = 'Sorry, system is unavailable now. Please try again later.';
        this.showNoResults = true;
      });
    },
```
* queryParams object

```
# example from creditOffers.vue

      queryParams: {
        src: 189006,
        json: 1,
        ccrate: 1,
        crd: '',
        ccis: ''
      },
```

These are set when the filters are changed. See corresponding functions for filter changes. Typically named onXfilterChanged()
(i.e. onCreditRatingChange)


