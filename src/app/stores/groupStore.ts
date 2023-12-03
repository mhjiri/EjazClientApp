import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Group, GroupFormValues } from "../models/group";
import agent from "../api/agent";
import { store } from "./store";
//import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";
import { FilterParams } from "../models/filterParams";
import { OrderParams } from "../models/orderParams";


export default class GroupStore {
    groupRegistry = new Map<string, Group>();
    src = '';
    selectedGroup?: Group = undefined;
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
                this.groupRegistry.clear();
                this.loadGroups();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setFilterParams = (filterParams: FilterParams) => {
        this.groupRegistry.clear();
        this.filterParams = filterParams;
    }

    setOrderParams = (orderParams: OrderParams) => {
        this.groupRegistry.clear();
        this.orderParams = orderParams;
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        params.append('search', this.filterParams.search.toString());
        params.append('status', this.filterParams.status.toString());
        params.append('orderBy', this.orderParams.orderBy.toString());
        params.append('orderAs', this.orderParams.orderAs.toString());
        this.predicate.forEach((value, key) => {
            params.append(key, value);
        })
        return params;
    }

    get returnedGroups() {
        return Array.from(this.groupRegistry.values());
    }

    setSrc = (src : string) => {
        this.src = src;
    }


    loadGroups = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Groups.list(this.axiosParams);
            result.data.forEach(group => {
                this.setGroup(group);
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
    
    loadGroup = async (id: string) => {
        let group = this.getGroup(id);
        if (group) {
            this.selectedGroup = group;
            return group;
        }
        else {
            this.setLoadingInitial(true);
            try {
                group = await agent.Groups.get(id);
                this.setGroup(group)
                runInAction(() => this.selectedGroup = group);
                this.setLoadingInitial(false);
                return group;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    


    private setGroup = (group: Group) => {
        
        this.groupRegistry.set(group.gr_ID, group);
    }

    private getGroup= (id: string) => {
        return this.groupRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createGroup = async (group: GroupFormValues) => {
        try {
            const returnedGroup = await agent.Groups.create(group);
            group.gr_ID = returnedGroup.gr_ID;
            group.gr_CreatedOn = returnedGroup.gr_CreatedOn;
            group.gr_Creator = returnedGroup.gr_Creator;
            group.genres = returnedGroup.genres;
            group.categories = returnedGroup.categories;
            group.thematicAreas = returnedGroup.thematicAreas;
            group.tags = returnedGroup.tags;
            const newGroup = new Group(group);
            this.setGroup(newGroup);
            runInAction(() => {
                this.selectedGroup = newGroup;
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateGroup = async (group: GroupFormValues) => {
        try {
            
            
            const returnedGroup = await agent.Groups.update(group);
            group = returnedGroup;
            runInAction(() => {
                if (group.gr_ID) {
                    let updatedGroup = { ...this.getGroup(group.gr_ID), ...group };
                    this.groupRegistry.set(group.gr_ID, updatedGroup as Group);
                    this.selectedGroup = updatedGroup as Group;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    activateGroup = async (id: string) => {
        try {
            await agent.Groups.activate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    deactivateGroup = async (id: string) => {
        try {
            await agent.Groups.deactivate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedGroup= () => {
        this.selectedGroup = undefined;
    }
}