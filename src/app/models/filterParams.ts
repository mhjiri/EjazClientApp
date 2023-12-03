export interface FilterParams {
    search: string;
    status: string;
    language: string;
}

export class FilterParams {
    search = '';
    status = '';
    language = '';

    constructor(search='', status = '', language = '') {
        this.search = search;
        this.status = status;
        this.language = language;
    }
}