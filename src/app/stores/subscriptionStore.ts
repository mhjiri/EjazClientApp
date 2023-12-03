import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Subscription, SubscriptionFormValues } from "../models/subscription";
import agent from "../api/agent";
import { store } from "./store";
//import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";
import { FilterParams } from "../models/filterParams";
import { OrderParams } from "../models/orderParams";
import { MediumFormValues } from "../models/medium";


export default class SubscriptionStore {
    subscriptionRegistry = new Map<string, Subscription>();
    currentMedium = "00000000-0000-0000-0000-000000000000";
    src = '';
    selectedSubscription?: Subscription = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    uploading = false;
    uploaded = 0;
    deleted = 1;
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
                this.subscriptionRegistry.clear();
                this.loadSubscriptions();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setFilterParams = (filterParams: FilterParams) => {
        this.subscriptionRegistry.clear();
        this.filterParams = filterParams;
    }

    setOrderParams = (orderParams: OrderParams) => {
        this.subscriptionRegistry.clear();
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

    get returnedSubscriptions() {
        return Array.from(this.subscriptionRegistry.values());
    }

    setSrc = (src : string) => {
        this.src = src;
    }


    loadSubscriptions = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Subscriptions.list(this.axiosParams);
            result.data.forEach(subscription => {
                this.setSubscription(subscription);
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
                if (this.selectedSubscription) {
                    this.selectedSubscription.md_ID = this.currentMedium;
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
                if (this.selectedSubscription) {
                    this.selectedSubscription.md_ID = this.currentMedium;
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
    
    loadSubscription = async (id: string) => {
        let subscription = this.getSubscription(id);
        if (subscription) {
            this.selectedSubscription = subscription;
            return subscription;
        }
        else {
            this.setLoadingInitial(true);
            try {
                subscription = await agent.Subscriptions.get(id);
                this.setSubscription(subscription)
                runInAction(() => this.selectedSubscription = subscription);
                this.setLoadingInitial(false);
                return subscription;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    


    private setSubscription = (subscription: Subscription) => {
        
        this.subscriptionRegistry.set(subscription.sb_ID, subscription);
    }

    private getSubscription= (id: string) => {
        return this.subscriptionRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createSubscription = async (subscription: SubscriptionFormValues) => {
        try {
            subscription.md_ID = this.currentMedium;
            const returnedSubscription = await agent.Subscriptions.create(subscription);
            subscription.sb_ID = returnedSubscription.sb_ID;
            subscription.sb_CreatedOn = returnedSubscription.sb_CreatedOn;
            subscription.sb_Creator = returnedSubscription.sb_Creator;
            const newSubscription = new Subscription(subscription);
            this.setSubscription(newSubscription);
            runInAction(() => {
                this.selectedSubscription = newSubscription;
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateSubscription = async (subscription: SubscriptionFormValues) => {
        try {
            
            if(this.deleted == 1 || (this.currentMedium != undefined && this.currentMedium != '' && this.currentMedium != "00000000-0000-0000-0000-000000000000")) {
                subscription.md_ID = this.currentMedium;
            } 
            const returnedSubscription = await agent.Subscriptions.update(subscription);
            subscription = returnedSubscription;
            runInAction(() => {
                if (subscription.sb_ID) {
                    let updatedSubscription = { ...this.getSubscription(subscription.sb_ID), ...subscription };
                    this.subscriptionRegistry.set(subscription.sb_ID, updatedSubscription as Subscription);
                    this.selectedSubscription = updatedSubscription as Subscription;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    activateSubscription = async (id: string) => {
        try {
            await agent.Subscriptions.activate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    deactivateSubscription = async (id: string) => {
        try {
            await agent.Subscriptions.deactivate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedSubscription= () => {
        this.selectedSubscription = undefined;
    }
}