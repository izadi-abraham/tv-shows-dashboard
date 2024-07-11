import { fetch } from "@/services/utils";


// add interface

export class ShowsListService {
    private showsList = []


    fetchShowsList = async () => {
        try {
            const response = await fetch.get('shows?page=1')
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
}