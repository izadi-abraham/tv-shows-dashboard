# tv-shows-dashboard
#### Built with TV shows API http://www.tvmaze.com/api <br>
Allows users to view, filter and sort a list of TV shows. Selecting a particular show 
from the dashboard will redirect to a detailed screen with comprehensive information about the show.

## Filtering & Sorting

All available genres among the shows will have a badge.
After selecting at least one badge, you can select the criteria for filter:<br>
E.G. "Drama" and "Family" are selected:
* Partial: Filter shows that whether it has Drama or Family in its 
  genre(s).
* Subset: Filter shows that has both Drama and Family in its genre(s).
* Exact: Filter shows that its genres are exactly "Drama" and "Family".
* Sorting can be done based on show's "rating" and "updated" property on show entity.
* Descriptions about filtering were added in title attributes to have more intuitive UI.


## Styling

Tailwindcss is used for styling, hence no need for the css naming conventions. 
Only outermost template elements in each component have semantic namings.
This is for better development experience.<br>
* `ShowSearch` and `ShowFilter` components are mounted in modals as part of 
responsive design.<br>
* A go-back arrow button in `showView` page will appear in small screens.<br>
* Skeleton for `showCard` component and filter section help to increase the perceived 
  performance and would provide a smooth transition for user. 
  * Shows without any image have been considered.
  


## Stores and Services

`showList` store hosts the data of shows' list.<br>
It is mainly being set inside the `showlistService` and helps to cache the show's 
list on the same route.<br>
(Switching between search results, filtered list and show lists).<br>
For cross-routes caching, a private variable in the service could help which is not 
implemented.<br>
`currentShow` store is written to avoid prop drilling among child components in 
`showView` page.<br>
(Would have been nicer to have interfaces for the entities and a separate service for 
the `showView` page.)


## Components

* multi-word-component-names are used to prevent conflicts with native components.
* FontAwesome free icons are used inside any `Icon-Component`.
* `ShowFilter` component has a normal script together with a setup one. That's 
  because of exposing limitation in script setups.
* `GenericTabs` accepts different slots for the tabs' content. `ShowMainTab` component 
  is the content for the first tab.
* `GenericModal` added to use in small screens only. Should look nicer on large 
screens indeed.
* `GenericRating` component has no logic to render stars. Couldn't fit in the 
  schedule to be implemented. 

## Routes
 
`ShowView` page is lazy-loaded. Route level code-splitting 
generates a separate chunk.


## Composable and Utilities

* `useObserver` is a tiny stateful utility for the specific needs of the 
  app.<br>
* `utils` including `fetch` and `notifyError` functions is currently just used in the 
  services' directory.


## Tests

Few test cases were written for the `showFilter` component. Filtering logic seemed a 
critical part with possible edge cases.

#### Run Unit Tests

```sh
yarn test:unit
```

## Notes

* Node.js version 18.3 or higher is a prerequisite.
* Vite, Vue Router, Pinia and Vitest are used. [Creating a Vue Application](https://vuejs.org/guide/quick-start#creating-a-vue-application)


## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```
