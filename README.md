# tv-shows-dashboard

This template should help get you started developing with Vue 3 in Vite.

## Filtering

All available genres among the shows will have a badge.
After selecting at least one badge, you can select the criteria for filter:<br>
E.G. "Drama" and "Family" are selected:
* Partial: Filter shows that whether it has Drama or Family in its 
  genre(s).
* Subset: Filter shows that has both Drama and Family in its genre(s).
* Exact: Filter shows that its genres are exactly "Drama" and "Family".

## Sorting

Sorting can be done based on show's "rating" and "updated" property on show entity.

## Skeleton

Skeletons help to increase the perceived performance and would provide a smooth 
transition for user.

## Responsive

Responsive elements like search component and filter section are to showcase

Caching store
Composable
Grid used for table
title attributes (of course due to delay for the first hover)
utility functions
store for search queries

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

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
