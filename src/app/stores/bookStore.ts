import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Book, BookFormValues } from "../models/book";
import agent from "../api/agent";
import { store } from "./store";
//import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";
import { FilterParams } from "../models/filterParams";
import { OrderParams } from "../models/orderParams";
import { MediumFormValues } from "../models/medium";
import { ItemFormValues } from "../models/item";


export default class BookStore {
    bookRegistry = new Map<string, Book>();
    currentMedium = "00000000-0000-0000-0000-000000000000";
    currentAudioEn = "00000000-0000-0000-0000-000000000000";
    currentAudioAr = "00000000-0000-0000-0000-000000000000";
    src = '';
    srcAudioEn = '';
    srcAudioAr = '';
    selectedBook?: Book = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    uploading = false;
    uploaded = 0;
    deleted = 0;
    deletedAudioEn = 0;
    deletedAudioAr = 0;
    uploadingAudioEn = false;
    uploadedAudioEn = 0;
    uploadingAudioAr = false;
    uploadedAudioAr = 0;
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
                this.bookRegistry.clear();
                this.loadBooks();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setFilterParams = (filterParams: FilterParams) => {
        this.bookRegistry.clear();
        this.filterParams = filterParams;
    }

    setOrderParams = (orderParams: OrderParams) => {
        this.bookRegistry.clear();
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

    get returnedBooks() {
        return Array.from(this.bookRegistry.values());
    }

    setSrc = (src : string) => {
        this.src = src;
    }

    setDeleted = (flag : number) => {
        this.deleted = flag;
    }

    setSrcAudioEn = (srcAudioEn : string) => {
        this.srcAudioEn = srcAudioEn;
    }

    setSrcAudioAr = (srcAudioAr : string) => {
        this.srcAudioAr = srcAudioAr;
    }


    loadBooks = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Books.list(this.axiosParams);
            result.data.forEach(book => {
                this.setBook(book);
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
                if (this.selectedBook) {
                    this.selectedBook.md_ID = this.currentMedium;
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
                if (this.selectedBook) {
                    this.selectedBook.md_ID = this.currentMedium;
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

    uploadAudioEn = async (file: any) => {
        this.uploadedAudioEn= 0
        this.uploadingAudioEn = true;
        try {
            const response = await agent.Media.create(file);
            const medium : MediumFormValues = response.data;
            runInAction(() => {
                this.currentAudioEn = (medium.md_ID) ? medium.md_ID : "00000000-0000-0000-0000-000000000000";
                if (this.selectedBook) {
                    this.selectedBook.md_AudioEn_ID = this.currentAudioEn;
                }
                this.srcAudioEn = ''; 
                this.srcAudioEn = this.srcAudioEn.concat('data:',medium.md_FileType,';base64,',medium.md_Medium);
                this.uploadedAudioEn = 1;
                this.uploadingAudioEn = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.uploadedAudioEn = -1
                this.uploadingAudioEn = false
            });
        }
    }

    deleteAudioEn = async () => {
        try {
            
            runInAction(() => {
                this.currentAudioEn = "00000000-0000-0000-0000-000000000000";
                if (this.selectedBook) {
                    this.selectedBook.md_AudioEn_ID = this.currentAudioEn;
                }
                this.srcAudioEn= ''; 
                this.deletedAudioEn= 1;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                
            });
        }
    }

    uploadAudioAr = async (file: any) => {
        this.uploadedAudioAr = 0
        this.uploadingAudioAr = true;
        try {
            const response = await agent.Media.create(file);
            const medium : MediumFormValues = response.data;
            runInAction(() => {
                this.currentAudioAr = (medium.md_ID) ? medium.md_ID : "00000000-0000-0000-0000-000000000000";
                if (this.selectedBook) {
                    this.selectedBook.md_AudioAr_ID = this.currentAudioAr;
                }
                this.srcAudioAr = ''; 
                this.srcAudioAr = this.srcAudioAr.concat('data:',medium.md_FileType,';base64,',medium.md_Medium);
                this.uploadedAudioAr = 1;
                this.uploadingAudioAr = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.uploadedAudioAr = -1
                this.uploadingAudioAr = false
            });
        }
    }

    deleteAudioAr = async () => {
        try {
            
            runInAction(() => {
                this.currentAudioAr = "00000000-0000-0000-0000-000000000000";
                if (this.selectedBook) {
                    this.selectedBook.md_AudioAr_ID = this.currentAudioAr;
                }
                this.srcAudioAr= ''; 
                this.deletedAudioAr= 1;
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
    
    loadBook = async (id: string) => {
        let book = this.getBook(id);
        if (book) {
            this.selectedBook = book;
            return book;
        }
        else {
            this.setLoadingInitial(true);
            try {
                book = await agent.Books.get(id);
                this.setBook(book)
                runInAction(() => this.selectedBook = book);
                this.setLoadingInitial(false);
                return book;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    


    private setBook = (book: Book) => {
        
        this.bookRegistry.set(book.bk_ID, book);
    }

    private getBook= (id: string) => {
        return this.bookRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createBook = async (book: BookFormValues) => {
        try {
            if(this.deleted == 1 || (this.currentMedium != undefined && this.currentMedium != '' && this.currentMedium != "00000000-0000-0000-0000-000000000000")) {
                book.md_ID = this.currentMedium;
                let item = new ItemFormValues(book.md_ID,0);
                book.mediumItems = [item];
            } else if(this.deleted == 1 || (book.md_ID != undefined && book.md_ID != '' && book.md_ID!= "00000000-0000-0000-0000-000000000000")) {
                let item = new ItemFormValues(book.md_ID,0);
                book.mediumItems = [item];
            }
            if(this.deletedAudioEn == 1 || (this.currentAudioEn != undefined && this.currentAudioEn != '' && this.currentAudioEn != "00000000-0000-0000-0000-000000000000")) {
                book.md_AudioEn_ID = this.currentAudioEn;
            }
            if(this.deletedAudioAr==1 || (this.currentAudioAr != undefined && this.currentAudioAr != '' && this.currentAudioAr != "00000000-0000-0000-0000-000000000000")) {
                book.md_AudioAr_ID = this.currentAudioAr;
            }
            const returnedBook = await agent.Books.create(book);
            book.bk_ID = returnedBook.bk_ID;
            book.bk_CreatedOn = returnedBook.bk_CreatedOn;
            book.bk_Creator = returnedBook.bk_Creator;
            book.genres = returnedBook.genres;
            const newBook = new Book(returnedBook);
            this.setBook(newBook);
            runInAction(() => {
                this.selectedBook = newBook;
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateBook = async (book: BookFormValues) => {
        try {
            if(this.deleted == 1 || (this.currentMedium != undefined && this.currentMedium != '' && this.currentMedium != "00000000-0000-0000-0000-000000000000")) {
                book.md_ID = this.currentMedium;
                let item = new ItemFormValues(book.md_ID,0);
                book.mediumItems = [item];
            } else if(this.deleted == 1 || (book.md_ID != undefined && book.md_ID != '' && book.md_ID!= "00000000-0000-0000-0000-000000000000")) {
                let item = new ItemFormValues(book.md_ID,0);
                book.mediumItems = [item];
            }
            if(this.deletedAudioEn == 1 || (this.currentAudioEn != undefined && this.currentAudioEn != '' && this.currentAudioEn != "00000000-0000-0000-0000-000000000000")) {
                book.md_AudioEn_ID = this.currentAudioEn;
            }
            if(this.deletedAudioAr == 1 || (this.currentAudioAr != undefined && this.currentAudioAr != '' && this.currentAudioAr != "00000000-0000-0000-0000-000000000000")) {
                book.md_AudioAr_ID = this.currentAudioAr;
            }
            const returnedBook = await agent.Books.update(book);
            book = returnedBook;
            runInAction(() => {
                if (book.bk_ID) {
                    let updatedBook = { ...this.getBook(book.bk_ID), ...book };
                    this.bookRegistry.set(book.bk_ID, updatedBook as Book);
                    this.selectedBook = updatedBook as Book;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    activateBook = async (id: string) => {
        try {
            await agent.Books.activate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    deactivateBook = async (id: string) => {
        try {
            await agent.Books.deactivate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedBook= () => {
        this.selectedBook = undefined;
    }
}