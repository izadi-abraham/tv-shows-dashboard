import { fetch } from "@/services/utils";
import axios from "axios";


// add interface

export class ShowsListService {
    private showsList = []


    fetchShowsList = async () => {
        try {
            const response = await fetch.get('shows')
            this.showsList = response.data;
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
}