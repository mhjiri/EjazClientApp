import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Author, AuthorFormValues } from "../models/author";
import agent from "../api/agent";
import { store } from "./store";
//import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";
import { FilterParams } from "../models/filterParams";
import { OrderParams } from "../models/orderParams";
import { AuthorCmd } from "../models/authorCmd";
import { MediumFormValues } from "../models/medium";


export default class AuthorStore {
    authorRegistry = new Map<string, Author>();
    currentMedium = "00000000-0000-0000-0000-000000000000";
    src = '';
    selectedAuthor?: Author = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    uploading = false;
    uploaded = 0;
    deleted = 0;
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
                this.authorRegistry.clear();
                this.loadAuthors();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setFilterParams = (filterParams: FilterParams) => {
        this.authorRegistry.clear();
        this.filterParams = filterParams;
    }

    setOrderParams = (orderParams: OrderParams) => {
        this.authorRegistry.clear();
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

    get returnedAuthors() {
        return Array.from(this.authorRegistry.values());
    }

    setSrc = (src : string) => {
        this.src = src;
    }


    loadAuthors = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Authors.list(this.axiosParams);
            result.data.forEach(author => {
                this.setAuthor(author);
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    uploadMedium = async (file: any) => {
        this.uploaded = 0
        this.uploading = true;
        try {
            const response = await agent.Media.create(file);
            const medium : MediumFormValues = response.data;
            runInAction(() => {
                this.currentMedium = (medium.md_ID) ? medium.md_ID : "00000000-0000-0000-0000-000000000000";
                if (this.selectedAuthor) {
                    this.selectedAuthor.md_ID = this.currentMedium;
                }
                this.src = ''; 
                this.src = this.src.concat('data:',medium.md_FileType,';base64,',medium.md_Medium);
                this.uploaded = 1;
                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.uploaded = -1
                this.uploading = false
            });
        }
    }

    deleteMedium = async () => {
        try {
            runInAction(() => {
                this.currentMedium = "00000000-0000-0000-0000-000000000000";
                if (this.selectedAuthor) {
                    this.selectedAuthor.md_ID = this.currentMedium;
                }
                this.src = ''; 
                this.deleted = 1;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                
            });
        }
    }

    


    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }
    
    loadAuthor = async (id: string) => {
        let author = this.getAuthor(id);
        if (author) {
            this.selectedAuthor = author;
            return author;
        }
        else {
            this.setLoadingInitial(true);
            try {
                author = await agent.Authors.get(id);
                this.setAuthor(author)
                runInAction(() => this.selectedAuthor = author);
                this.setLoadingInitial(false);
                return author;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    


    private setAuthor = (author: Author) => {
        
        this.authorRegistry.set(author.at_ID, author);
    }

    private getAuthor= (id: string) => {
        return this.authorRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createAuthor = async (author: AuthorFormValues) => {
        try {
            author.md_ID = this.currentMedium;
            const returnedAuthor = await agent.Authors.create(author);
            author.at_ID = returnedAuthor.at_ID;
            author.at_CreatedOn = returnedAuthor.at_CreatedOn;
            author.at_Creator = returnedAuthor.at_Creator;
            author.genres = returnedAuthor.genres;
            const newAuthor = new Author(author);
            this.setAuthor(newAuthor);
            runInAction(() => {
                this.selectedAuthor = newAuthor;
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateAuthor = async (author: AuthorFormValues) => {
        try {
            
            if(this.deleted==1 || (this.currentMedium != undefined && this.currentMedium != '' && this.currentMedium != "00000000-0000-0000-0000-000000000000")) {
                author.md_ID = this.currentMedium;
            } 
            const returnedAuthor = await agent.Authors.update(author);
            author = returnedAuthor;
            runInAction(() => {
                if (author.at_ID) {
                    let updatedAuthor = { ...this.getAuthor(author.at_ID), ...author };
                    this.authorRegistry.set(author.at_ID, updatedAuthor as Author);
                    this.selectedAuthor = updatedAuthor as Author;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    activateAuthor = async (id: string) => {
        try {
            await agent.Authors.activate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    deactivateAuthor = async (id: string) => {
        try {
            await agent.Authors.deactivate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedAuthor= () => {
        this.selectedAuthor = undefined;
    }
}