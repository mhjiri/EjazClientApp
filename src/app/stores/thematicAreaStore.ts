import { makeAutoObservable, reaction, runInAction } from "mobx";
import { ThematicArea, ThematicAreaFormValues } from "../models/thematicArea";
import agent from "../api/agent";
import { store } from "./store";
//import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";
import { FilterParams } from "../models/filterParams";
import { OrderParams } from "../models/orderParams";


export default class ThematicAreaStore {
    thematicAreaRegistry = new Map<string, ThematicArea>();
    selectedThematicArea?: ThematicArea = undefined;
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
                this.thematicAreaRegistry.clear();
                this.loadThematicAreas();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setFilterParams = (filterParams: FilterParams) => {
        this.thematicAreaRegistry.clear();
        this.filterParams = filterParams;
    }

    setOrderParams = (orderParams: OrderParams) => {
        this.thematicAreaRegistry.clear();
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
    get returnedThematicAreas() {
        return Array.from(this.thematicAreaRegistry.values());
    }


    loadThematicAreas = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.ThematicAreas.list(this.axiosParams);
            result.data.forEach(thematicArea => {
                this.setThematicArea(thematicArea);
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
    
    loadThematicArea = async (id: string) => {
        let thematicArea = this.getThematicArea(id);
        if (thematicArea) {
            this.selectedThematicArea = thematicArea;
            return thematicArea;
        }
        else {
            this.setLoadingInitial(true);
            try {
                thematicArea = await agent.ThematicAreas.get(id);
                this.setThematicArea(thematicArea)
                runInAction(() => this.selectedThematicArea = thematicArea);
                this.setLoadingInitial(false);
                return thematicArea;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setThematicArea = (thematicArea: ThematicArea) => {
        
        this.thematicAreaRegistry.set(thematicArea.th_ID, thematicArea);
    }

    private getThematicArea= (id: string) => {
        return this.thematicAreaRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createThematicArea = async (thematicArea: ThematicAreaFormValues) => {
        try {
            const returnedThematicArea = await agent.ThematicAreas.create(thematicArea);
            thematicArea.th_ID = returnedThematicArea.th_ID;
            thematicArea.th_CreatedOn = returnedThematicArea.th_CreatedOn;
            thematicArea.th_Creator = returnedThematicArea.th_Creator;
            const newThematicArea = new ThematicArea(returnedThematicArea);
            this.setThematicArea(newThematicArea);
            runInAction(() => {
                this.selectedThematicArea = newThematicArea;
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateThematicArea = async (thematicArea: ThematicAreaFormValues) => {
        try {
            const returnedThematicArea = await agent.ThematicAreas.update(thematicArea);
            thematicArea = returnedThematicArea;
            runInAction(() => {
                if (thematicArea.th_ID) {
                    let updatedThematicArea = { ...this.getThematicArea(thematicArea.th_ID), ...thematicArea };
                    this.thematicAreaRegistry.set(thematicArea.th_ID, updatedThematicArea as ThematicArea);
                    this.selectedThematicArea = updatedThematicArea as ThematicArea;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    activateThematicArea = async (id: string) => {
        try {
            await agent.ThematicAreas.activate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    deactivateThematicArea = async (id: string) => {
        try {
            await agent.ThematicAreas.deactivate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedThematicArea= () => {
        this.selectedThematicArea = undefined;
    }
}