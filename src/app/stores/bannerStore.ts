import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Banner, BannerFormValues } from "../models/banner";
import agent from "../api/agent";
import { store } from "./store";
//import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";
import { FilterParams } from "../models/filterParams";
import { OrderParams } from "../models/orderParams";
import { MediumFormValues } from "../models/medium";


export default class BannerStore {
    bannerRegistry = new Map<string, Banner>();
    currentMedium = "00000000-0000-0000-0000-000000000000";
    src = '';
    selectedBanner?: Banner = undefined;
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
                this.bannerRegistry.clear();
                this.loadBanners();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setFilterParams = (filterParams: FilterParams) => {
        this.bannerRegistry.clear();
        this.filterParams = filterParams;
    }

    setOrderParams = (orderParams: OrderParams) => {
        this.bannerRegistry.clear();
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

    get returnedBanners() {
        return Array.from(this.bannerRegistry.values());
    }

    setSrc = (src : string) => {
        this.src = src;
    }


    loadBanners = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Banners.list(this.axiosParams);
            result.data.forEach(banner => {
                this.setBanner(banner);
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
                if (this.selectedBanner) {
                    this.selectedBanner.md_ID = this.currentMedium;
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
                if (this.selectedBanner) {
                    this.selectedBanner.md_ID = this.currentMedium;
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
    
    loadBanner = async (id: string) => {
        let banner = this.getBanner(id);
        if (banner) {
            this.selectedBanner = banner;
            return banner;
        }
        else {
            this.setLoadingInitial(true);
            try {
                banner = await agent.Banners.get(id);
                this.setBanner(banner)
                runInAction(() => this.selectedBanner = banner);
                this.setLoadingInitial(false);
                return banner;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    


    private setBanner = (banner: Banner) => {
        
        this.bannerRegistry.set(banner.bn_ID, banner);
    }

    private getBanner = (id: string) => {
        return this.bannerRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createBanner = async (banner: BannerFormValues) => {
        try {
            banner.md_ID = this.currentMedium;
            const returnedBanner = await agent.Banners.create(banner);
            banner.bn_ID = returnedBanner.bn_ID;
            banner.bn_CreatedOn = returnedBanner.bn_CreatedOn;
            banner.bn_Creator = returnedBanner.bn_Creator;
            banner.bl_ID = returnedBanner.bl_ID;
            banner.bn_BannerLocationTitle = returnedBanner.bn_BannerLocationTitle;
            banner.bn_BannerLocationTitle_Ar = returnedBanner.bn_BannerLocationTitle_Ar;
            banner.gr_ID = returnedBanner.gr_ID;
            banner.bn_GroupTitle = returnedBanner.bn_GroupTitle;
            banner.bn_GroupTitle_Ar = returnedBanner.bn_GroupTitle_Ar;
            const newBanner = new Banner(banner);
            this.setBanner(newBanner);
            runInAction(() => {
                this.selectedBanner = newBanner;
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateBanner = async (banner: BannerFormValues) => {
        try {
            
            if(this.deleted==1 || (this.currentMedium != undefined && this.currentMedium != '' && this.currentMedium != "00000000-0000-0000-0000-000000000000")) {
                banner.md_ID = this.currentMedium;
            } 
            const returnedBanner = await agent.Banners.update(banner);
            banner = returnedBanner;
            runInAction(() => {
                if (banner.bn_ID) {
                    let updatedBanner = { ...this.getBanner(banner.bn_ID), ...banner };
                    this.bannerRegistry.set(banner.bn_ID, updatedBanner as Banner);
                    this.selectedBanner = updatedBanner as Banner;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    activateBanner = async (id: string) => {
        try {
            await agent.Banners.activate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    deactivateBanner = async (id: string) => {
        try {
            await agent.Banners.deactivate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedBanner= () => {
        this.selectedBanner = undefined;
    }
}