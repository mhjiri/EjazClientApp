import { makeAutoObservable, reaction, runInAction } from "mobx";
import { BannerLocation, BannerLocationFormValues } from "../models/bannerLocation";
import agent from "../api/agent";
import { store } from "./store";
//import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";
import { FilterParams } from "../models/filterParams";
import { OrderParams } from "../models/orderParams";


export default class BannerLocationStore {
    bannerLocationRegistry = new Map<string, BannerLocation>();
    selectedBannerLocation?: BannerLocation = undefined;
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
                this.bannerLocationRegistry.clear();
                this.loadBannerLocations();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setFilterParams = (filterParams: FilterParams) => {
        this.bannerLocationRegistry.clear();
        this.filterParams = filterParams;
    }

    setOrderParams = (orderParams: OrderParams) => {
        this.bannerLocationRegistry.clear();
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

    get returnedBannerLocations() {
        return Array.from(this.bannerLocationRegistry.values());
    }


    loadBannerLocations = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.BannerLocations.list(this.axiosParams);
            result.data.forEach(bannerLocation => {
                this.setBannerLocation(bannerLocation);
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
    
    loadBannerLocation = async (id: string) => {
        let bannerLocation = this.getBannerLocation(id);
        if (bannerLocation) {
            this.selectedBannerLocation = bannerLocation;
            return bannerLocation;
        }
        else {
            this.setLoadingInitial(true);
            try {
                bannerLocation = await agent.BannerLocations.get(id);
                this.setBannerLocation(bannerLocation)
                runInAction(() => this.selectedBannerLocation = bannerLocation);
                this.setLoadingInitial(false);
                return bannerLocation;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setBannerLocation = (bannerLocation: BannerLocation) => {
       
        
        this.bannerLocationRegistry.set(bannerLocation.bl_ID, bannerLocation);
    }

    private getBannerLocation= (id: string) => {
        return this.bannerLocationRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createBannerLocation = async (bannerLocation: BannerLocationFormValues) => {
        try {
            const returnedBannerLocation = await agent.BannerLocations.create(bannerLocation);
            bannerLocation.bl_ID = returnedBannerLocation.bl_ID;
            bannerLocation.bl_CreatedOn = returnedBannerLocation.bl_CreatedOn;
            bannerLocation.bl_Creator = returnedBannerLocation.bl_Creator;
            const newBannerLocation = new BannerLocation(returnedBannerLocation);
            this.setBannerLocation(newBannerLocation);
            runInAction(() => {
                this.selectedBannerLocation = newBannerLocation;
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateBannerLocation = async (bannerLocation: BannerLocationFormValues) => {
        try {
            const returnedBannerLocation = await agent.BannerLocations.update(bannerLocation);
            bannerLocation = returnedBannerLocation;
            runInAction(() => {
                if (bannerLocation.bl_ID) {
                    let updatedBannerLocation = { ...this.getBannerLocation(bannerLocation.bl_ID), ...bannerLocation };
                    this.bannerLocationRegistry.set(bannerLocation.bl_ID, updatedBannerLocation as BannerLocation);
                    this.selectedBannerLocation = updatedBannerLocation as BannerLocation;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    activateBannerLocation = async (id: string) => {
        try {
            await agent.BannerLocations.activate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    deactivateBannerLocation = async (id: string) => {
        try {
            await agent.BannerLocations.deactivate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedBannerLocation= () => {
        this.selectedBannerLocation = undefined;
    }
}