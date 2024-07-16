import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { changeFilter, filterType } from '../ShowFilter/ShowFilter.vue'
import { mockShows, onlyDramaGenre } from '../ShowFilter/ShowFilter.mock'
import { useShowListStore } from '../../stores/show-list'
import { createPinia } from 'pinia'

describe('filtering shows based on different criteria', () => {
  useShowListStore(createPinia())

  beforeEach(() => {
    useShowListStore().setShowList(mockShows)
    useShowListStore().clearFilters()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('should filter shows that only has Drama in their genres', function () {
    useShowListStore().addFilter('Drama')
    filterType.value = 'exact-match'
    changeFilter()
    expect(useShowListStore().getFilteredList.length).toBe(1)
    expect(JSON.stringify(useShowListStore().getFilteredList)).toBe(JSON.stringify(onlyDramaGenre))
  })

  it('should filter shows that has both Drama and Crime in their genres', function () {
    useShowListStore().addFilter('Drama')
    useShowListStore().addFilter('Crime')
    filterType.value = 'subset-match'
    changeFilter()
    expect(useShowListStore().getFilteredList.length).toBe(10)
  })

  it('should filter shows that has whether Romance or Thriller in their genres', function () {
    useShowListStore().addFilter('Romance')
    useShowListStore().addFilter('Thriller')
    filterType.value = 'partial-match'
    changeFilter()
    expect(useShowListStore().getFilteredList.length).toBe(8)
  })
})
