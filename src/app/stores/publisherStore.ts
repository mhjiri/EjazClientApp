import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Publisher, PublisherFormValues } from "../models/publisher";
import agent from "../api/agent";
import { store } from "./store";
//import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";
import { FilterParams } from "../models/filterParams";
import { OrderParams } from "../models/orderParams";
import { PublisherCmd } from "../models/publisherCmd";
import { MediumFormValues } from "../models/medium";


export default class PublisherStore {
    publisherRegistry = new Map<string, Publisher>();
    currentMedium = "00000000-0000-0000-0000-000000000000";
    src = '';
    selectedPublisher?: Publisher = undefined;
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
                this.publisherRegistry.clear();
                this.loadPublishers();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setFilterParams = (filterParams: FilterParams) => {
        this.publisherRegistry.clear();
        this.filterParams = filterParams;
    }

    setOrderParams = (orderParams: OrderParams) => {
        this.publisherRegistry.clear();
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

    get returnedPublishers() {
        return Array.from(this.publisherRegistry.values());
    }

    setSrc = (src : string) => {
        this.src = src;
    }


    loadPublishers = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Publishers.list(this.axiosParams);
            result.data.forEach(publisher => {
                this.setPublisher(publisher);
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
                if (this.selectedPublisher) {
                    this.selectedPublisher.md_ID = this.currentMedium;
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
                if (this.selectedPublisher) {
                    this.selectedPublisher.md_ID = this.currentMedium;
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
    
    loadPublisher = async (id: string) => {
        let publisher = this.getPublisher(id);
        if (publisher) {
            this.selectedPublisher = publisher;
            return publisher;
        }
        else {
            this.setLoadingInitial(true);
            try {
                publisher = await agent.Publishers.get(id);
                this.setPublisher(publisher)
                runInAction(() => this.selectedPublisher = publisher);
                this.setLoadingInitial(false);
                return publisher;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    


    private setPublisher = (publisher: Publisher) => {
        
        this.publisherRegistry.set(publisher.pb_ID, publisher);
    }

    private getPublisher= (id: string) => {
        return this.publisherRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createPublisher = async (publisher: PublisherFormValues) => {
        try {
            publisher.md_ID = this.currentMedium;
            const returnedPublisher = await agent.Publishers.create(publisher);
            publisher.pb_ID = returnedPublisher.pb_ID;
            publisher.pb_CreatedOn = returnedPublisher.pb_CreatedOn;
            publisher.pb_Creator = returnedPublisher.pb_Creator;
            publisher.genres = returnedPublisher.genres;
            const newPublisher = new Publisher(publisher);
            this.setPublisher(newPublisher);
            runInAction(() => {
                this.selectedPublisher = newPublisher;
            });
        } catch (error) {
            console.log(error);
        }
    }

    updatePublisher = async (publisher: PublisherFormValues) => {
        try {
            
            if(this.deleted == 1 || (this.currentMedium != undefined && this.currentMedium != '' && this.currentMedium != "00000000-0000-0000-0000-000000000000")) {
                publisher.md_ID = this.currentMedium;
            } 
            const returnedPublisher = await agent.Publishers.update(publisher);
            publisher = returnedPublisher;
            runInAction(() => {
                if (publisher.pb_ID) {
                    let updatedPublisher = { ...this.getPublisher(publisher.pb_ID), ...publisher };
                    this.publisherRegistry.set(publisher.pb_ID, updatedPublisher as Publisher);
                    this.selectedPublisher = updatedPublisher as Publisher;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    activatePublisher = async (id: string) => {
        try {
            await agent.Publishers.activate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    deactivatePublisher = async (id: string) => {
        try {
            await agent.Publishers.deactivate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedPublisher= () => {
        this.selectedPublisher = undefined;
    }
}