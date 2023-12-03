import { makeAutoObservable, reaction, runInAction } from "mobx";
import { BookCollection, BookCollectionFormValues } from "../models/bookCollection";
import agent from "../api/agent";
import { store } from "./store";
//import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";
import { FilterParams } from "../models/filterParams";
import { OrderParams } from "../models/orderParams";
import { MediumFormValues } from "../models/medium";


export default class BookCollectionStore {
    bookCollectionRegistry = new Map<string, BookCollection>();
    currentMedium = "00000000-0000-0000-0000-000000000000";
    src = '';
    selectedBookCollection?: BookCollection = undefined;
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
                this.bookCollectionRegistry.clear();
                this.loadBookCollections();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setFilterParams = (filterParams: FilterParams) => {
        this.bookCollectionRegistry.clear();
        this.filterParams = filterParams;
    }

    setOrderParams = (orderParams: OrderParams) => {
        this.bookCollectionRegistry.clear();
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

    get returnedBookCollections() {
        return Array.from(this.bookCollectionRegistry.values());
    }

    setSrc = (src : string) => {
        this.src = src;
    }


    loadBookCollections = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.BookCollections.list(this.axiosParams);
            result.data.forEach(bookCollection => {
                this.setBookCollection(bookCollection);
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
                if (this.selectedBookCollection) {
                    this.selectedBookCollection.md_ID = this.currentMedium;
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
                if (this.selectedBookCollection) {
                    this.selectedBookCollection.md_ID = this.currentMedium;
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
    
    loadBookCollection = async (id: string) => {
        let bookCollection = this.getBookCollection(id);
        if (bookCollection) {
            this.selectedBookCollection = bookCollection;
            return bookCollection;
        }
        else {
            this.setLoadingInitial(true);
            try {
                bookCollection = await agent.BookCollections.get(id);
                this.setBookCollection(bookCollection)
                runInAction(() => this.selectedBookCollection = bookCollection);
                this.setLoadingInitial(false);
                return bookCollection;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    


    private setBookCollection = (bookCollection: BookCollection) => {
        
        this.bookCollectionRegistry.set(bookCollection.bc_ID, bookCollection);
    }

    private getBookCollection= (id: string) => {
        return this.bookCollectionRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createBookCollection = async (bookCollection: BookCollectionFormValues) => {
        try {
            bookCollection.md_ID = this.currentMedium;
            const returnedBookCollection = await agent.BookCollections.create(bookCollection);
            bookCollection.bc_ID = returnedBookCollection.bc_ID;
            bookCollection.bc_CreatedOn = returnedBookCollection.bc_CreatedOn;
            bookCollection.bc_Creator = returnedBookCollection.bc_Creator;
            bookCollection.books = returnedBookCollection.books;
            const newBookCollection = new BookCollection(bookCollection);
            this.setBookCollection(newBookCollection);
            runInAction(() => {
                this.selectedBookCollection = newBookCollection;
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateBookCollection = async (bookCollection: BookCollectionFormValues) => {
        try {
            
            if(this.deleted == 1 || (this.currentMedium != undefined && this.currentMedium != '' && this.currentMedium != "00000000-0000-0000-0000-000000000000")) {
                bookCollection.md_ID = this.currentMedium;
            } 
            const returnedBookCollection = await agent.BookCollections.update(bookCollection);
            bookCollection = returnedBookCollection;
            runInAction(() => {
                if (bookCollection.bc_ID) {
                    let updatedBookCollection = { ...this.getBookCollection(bookCollection.bc_ID), ...bookCollection };
                    this.bookCollectionRegistry.set(bookCollection.bc_ID, updatedBookCollection as BookCollection);
                    this.selectedBookCollection = updatedBookCollection as BookCollection;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    activateBookCollection = async (id: string) => {
        try {
            await agent.BookCollections.activate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    deactivateBookCollection = async (id: string) => {
        try {
            await agent.BookCollections.deactivate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedBookCollection= () => {
        this.selectedBookCollection = undefined;
    }
}