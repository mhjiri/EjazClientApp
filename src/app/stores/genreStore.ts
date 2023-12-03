import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Genre, GenreFormValues } from "../models/genre";
import agent from "../api/agent";
import { store } from "./store";
//import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";
import { FilterParams } from "../models/filterParams";
import { OrderParams } from "../models/orderParams";


export default class GenreStore {
    genreRegistry = new Map<string, Genre>();
    selectedGenre?: Genre = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    filterParams = new FilterParams();
    orderParams = new OrderParams();
    predicate = new Map().set('all', true);

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.predicate.keys(),
            () => {
                this.pagingParams = new PagingParams();
                this.orderParams = new OrderParams();
                this.filterParams = new FilterParams();
                this.genreRegistry.clear();
                this.loadGenres();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setFilterParams = (filterParams: FilterParams) => {
        this.genreRegistry.clear();
        this.filterParams = filterParams;
    }

    setOrderParams = (orderParams: OrderParams) => {
        this.genreRegistry.clear();
        this.orderParams = orderParams;
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        params.append('search', this.filterParams.search.toString());
        params.append('status', this.filterParams.status.toString());
        params.append('language', this.filterParams.language.toString());
        params.append('orderBy', this.orderParams.orderBy.toString());
        params.append('orderAs', this.orderParams.orderAs.toString());
        this.predicate.forEach((value, key) => {
            params.append(key, value);
        })
        return params;
    }

    get returnedGenres() {
        return Array.from(this.genreRegistry.values());
    }
    

    loadGenres = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Genres.list(this.axiosParams);
            result.data.forEach(genre => {
                this.setGenre(genre);
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }
    
    loadGenre = async (id: string) => {
        let genre = this.getGenre(id);
        if (genre) {
            this.selectedGenre = genre;
            return genre;
        }
        else {
            this.setLoadingInitial(true);
            try {
                genre = await agent.Genres.get(id);
                this.setGenre(genre)
                runInAction(() => this.selectedGenre = genre);
                this.setLoadingInitial(false);
                return genre;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setGenre = (genre: Genre) => {
        
        this.genreRegistry.set(genre.gn_ID, genre);
    }

    private getGenre= (id: string) => {
        return this.genreRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createGenre = async (genre: GenreFormValues) => {
        try {
            const returnedGenre = await agent.Genres.create(genre);
            genre.gn_ID = returnedGenre.gn_ID;
            genre.gn_CreatedOn = returnedGenre.gn_CreatedOn;
            genre.gn_Creator = returnedGenre.gn_Creator;
            const newGenre = new Genre(returnedGenre);
            this.setGenre(newGenre);
            runInAction(() => {
                this.selectedGenre = newGenre;
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateGenre = async (genre: GenreFormValues) => {
        try {
            const returnedGenre = await agent.Genres.update(genre);
            genre = returnedGenre;
            runInAction(() => {
                if (genre.gn_ID) {
                    let updatedGenre = { ...this.getGenre(genre.gn_ID), ...genre };
                    this.genreRegistry.set(genre.gn_ID, updatedGenre as Genre);
                    this.selectedGenre = updatedGenre as Genre;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    activateGenre = async (id: string) => {
        try {
            await agent.Genres.activate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    deactivateGenre = async (id: string) => {
        try {
            await agent.Genres.deactivate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedGenre= () => {
        this.selectedGenre = undefined;
    }
}