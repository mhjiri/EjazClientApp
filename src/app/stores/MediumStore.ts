import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Medium, MediumFormValues } from "../models/medium";
import agent from "../api/agent";
import { store } from "./store";
//import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";
import { FilterParams } from "../models/filterParams";
import { OrderParams } from "../models/orderParams";


export default class MediumStore {
    MediumRegistry = new Map<string, Medium>();
    selectedMedium?: Medium = undefined;
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

        
    }
    
    
    
    loadMedium = async (id: string) => {
        let Medium = this.getMedium(id);
        if (Medium) {
            this.selectedMedium = Medium;
            return Medium;
        }
        else {
            this.setLoadingInitial(true);
            try {
                Medium = await agent.Media.get(id);
                this.setMedium(Medium)
                runInAction(() => this.selectedMedium = Medium);
                this.setLoadingInitial(false);
                return Medium;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setMedium = (Medium: Medium) => {
        
        this.MediumRegistry.set(Medium.md_ID, Medium);
    }

    private getMedium= (id: string) => {
        return this.MediumRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    

    

    

    clearSelectedMedium= () => {
        this.selectedMedium = undefined;
    }
}