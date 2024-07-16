import { fetch, notifyError } from "@/services/utils";
import { useShowListStore } from "@/stores/show-list";
import { useCurrentShowStore } from "@/stores/current-show";


export class ShowsListService {
    private genreSet: Set<string> = new Set();

    fetchShowsList = async () => {
        try {
            const response = await fetch.get('shows')
            useShowListStore().setShowList(response.data)
            this.setGenres();
        } catch (error) {
            notifyError(`There is an error, ${error}`)
        }
    };

    getShow = async (showId: number) => {
        try {
            const response = await fetch.get(`shows/${showId}`)
            useCurrentShowStore().setCurrentShow(response.data)
        } catch (error) {
            notifyError(`There is an error, ${error}`)
        }
    }

    fetchShowSeasons = async (showId: number) => {
        useCurrentShowStore().setSeasonFetching(true)
        const response = await fetch.get(`/shows/${showId}/seasons`)
        useCurrentShowStore().setSeasons(response.data)
    }

    searchShows = async (query: string) => {
        try {
            const results = await fetch.get(`/search/shows?q=${query}`)
            return results.data;
        } catch (error) {
            notifyError(`There is an error, ${error}`)
        }
    }

    setGenres = () => {
        const genres: string[] = []
        useShowListStore().getShowList.forEach((show) => {
            show.genres.forEach((genre: string) => {
                if (!this.genreSet.has(genre)) {
                    this.genreSet.add(genre)
                }
            })
        })

        this.genreSet.forEach((genreKey) => genres.push(genreKey))
        useShowListStore().setGenres(genres);
    }

}