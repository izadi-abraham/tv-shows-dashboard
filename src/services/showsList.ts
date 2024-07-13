import { fetch } from "@/services/utils";
import { useShowListStore } from "@/stores/show-list";


// add interface

export class ShowsListService {
    public showsList = [];
    private genreSet: Set<string> = new Set();
    public genres: string[] = [];

    fetchShowsList = async () => {
        try {
            const response = await fetch.get('shows')
            this.showsList = response.data;
            useShowListStore().setShowList(response.data)
            this.setGenres();
        } catch (error) {
            window.alert(`There is an error, ${error}`)
        }
    };

    getShowList = async () => {
        if (this.showsList.length) {
            return this.showsList
        }

        await this.fetchShowsList()
        return this.showsList;
    }

    getShow = async (showId: number) => {
        try {
            const response = await fetch.get(`shows/${showId}`)
            return response.data;
        } catch (error) {
            //@TODO: add a function/component to show the error DRY, with specific message - the Notify component?
            window.alert(`There is an error, ${error}`)
        }
    }

    searchShows = async (query: string) => {
        try {
            const results = await fetch.get(`/search/shows?q=${query}`)
            return results.data;
        } catch (error) {
            window.alert(`There is an error, ${error}`)
        }
    }

    setGenres = () => {
        this.showsList.forEach((show) => {
            show.genres.forEach((genre: string[]) => {
                if (!this.genreSet.has(genre)) {
                    this.genreSet.add(genre)
                }
            })
        })

        this.genreSet.forEach((genreKey) => this.genres.push(genreKey))
    }

    getGenres = () => {
        return this.genres
    }

}