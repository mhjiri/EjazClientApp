import { makeAutoObservable, reaction, runInAction } from "mobx";
import { TrialUser, TrialUserFormValues } from "../models/trialUser";
import agent from "../api/agent";
import { store } from "./store";
//import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";
import { FilterParams } from "../models/filterParams";
import { OrderParams } from "../models/orderParams";
import { MediumFormValues } from "../models/medium";


export default class TrialUserStore {
    trialUserRegistry = new Map<string, TrialUser>();
    currentMedium = "00000000-0000-0000-0000-000000000000";
    src = '';
    selectedTrialUser?: TrialUser = undefined;
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
                this.trialUserRegistry.clear();
                this.loadTrialUsers();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setFilterParams = (filterParams: FilterParams) => {
        this.trialUserRegistry.clear();
        this.filterParams = filterParams;
    }

    setOrderParams = (orderParams: OrderParams) => {
        this.trialUserRegistry.clear();
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

    get returnedTrialUsers() {
        return Array.from(this.trialUserRegistry.values());
    }

    setSrc = (src : string) => {
        this.src = src;
    }


    loadTrialUsers = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.TrialUsers.list(this.axiosParams);
            result.data.forEach(trialUser => {
                this.setTrialUser(trialUser);
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
                if (this.selectedTrialUser) {
                    this.selectedTrialUser.md_ID = this.currentMedium;
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
                if (this.selectedTrialUser) {
                    this.selectedTrialUser.md_ID = this.currentMedium;
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
    
    loadTrialUser = async (id: string) => {
        let trialUser = this.getTrialUser(id);
        if (trialUser) {
            this.selectedTrialUser = trialUser;
            return trialUser;
        }
        else {
            this.setLoadingInitial(true);
            try {
                trialUser = await agent.TrialUsers.get(id);
                this.setTrialUser(trialUser)
                runInAction(() => this.selectedTrialUser = trialUser);
                this.setLoadingInitial(false);
                return trialUser;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    


    private setTrialUser = (trialUser: TrialUser) => {
        
        this.trialUserRegistry.set(trialUser.username, trialUser);
    }

    private getTrialUser= (id: string) => {
        return this.trialUserRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createTrialUser = async (trialUser: TrialUserFormValues) => {
        try {
            trialUser.md_ID = this.currentMedium;
            trialUser.us_SubscriptionExpiryDate = null;
            trialUser.us_CreatedOn =  "2000-01-01";
            trialUser.us_ModifyOn = null;
            const returnedTrialUser = await agent.TrialUsers.create(trialUser);
            trialUser.username = returnedTrialUser.username;
            trialUser.us_CreatedOn = returnedTrialUser.us_CreatedOn;
            trialUser.us_Creator = returnedTrialUser.us_Creator;
            trialUser.us_SubscriptionExpiryDate = "";
            const newTrialUser = new TrialUser(trialUser);
            this.setTrialUser(newTrialUser);
            runInAction(() => {
                this.selectedTrialUser = newTrialUser;
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateTrialUser = async (trialUser: TrialUserFormValues) => {
        try {
            
            if(this.deleted == 1 || (this.currentMedium != undefined && this.currentMedium != '' && this.currentMedium != "00000000-0000-0000-0000-000000000000")) {
                trialUser.md_ID = this.currentMedium;
            } 
            const returnedTrialUser = await agent.TrialUsers.update(trialUser);
            trialUser = returnedTrialUser;
            runInAction(() => {
                if (trialUser.username) {
                    let updatedTrialUser = { ...this.getTrialUser(trialUser.username), ...trialUser };
                    this.trialUserRegistry.set(trialUser.username, updatedTrialUser as TrialUser);
                    this.selectedTrialUser = updatedTrialUser as TrialUser;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    activateTrialUser = async (id: string) => {
        try {
            await agent.TrialUsers.activate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteTrialUser = async (id: string) => {
        try {
            await agent.TrialUsers.delete(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    deactivateTrialUser = async (id: string) => {
        try {
            await agent.TrialUsers.deactivate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedTrialUser= () => {
        this.selectedTrialUser = undefined;
    }
}