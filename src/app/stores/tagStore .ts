import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Tag, TagFormValues } from "../models/tag";
import agent from "../api/agent";
import { store } from "./store";
//import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";
import { FilterParams } from "../models/filterParams";
import { OrderParams } from "../models/orderParams";


export default class TagStore {
    tagRegistry = new Map<string, Tag>();
    selectedTag?: Tag = undefined;
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
                this.tagRegistry.clear();
                this.loadTags();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setFilterParams = (filterParams: FilterParams) => {
        this.tagRegistry.clear();
        this.filterParams = filterParams;
    }

    setOrderParams = (orderParams: OrderParams) => {
        this.tagRegistry.clear();
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

    get returnedTags() {
        return Array.from(this.tagRegistry.values());
    }


    loadTags = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Tags.list(this.axiosParams);
            result.data.forEach(tag => {
                this.setTag(tag);
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
    
    loadTag = async (id: string) => {
        let tag = this.getTag(id);
        if (tag) {
            this.selectedTag = tag;
            return tag;
        }
        else {
            this.setLoadingInitial(true);
            try {
                tag = await agent.Tags.get(id);
                this.setTag(tag)
                runInAction(() => this.selectedTag = tag);
                this.setLoadingInitial(false);
                return tag;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setTag = (tag: Tag) => {
        
        this.tagRegistry.set(tag.tg_ID, tag);
    }

    private getTag= (id: string) => {
        return this.tagRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createTag = async (tag: TagFormValues) => {
        try {
            const returnedTag = await agent.Tags.create(tag);
            tag.tg_ID = returnedTag.tg_ID;
            tag.tg_CreatedOn = returnedTag.tg_CreatedOn;
            tag.tg_Creator = returnedTag.tg_Creator;
            const newTag = new Tag(returnedTag);
            this.setTag(newTag);
            runInAction(() => {
                this.selectedTag = newTag;
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateTag = async (tag: TagFormValues) => {
        try {
            const returnedTag = await agent.Tags.update(tag);
            tag = returnedTag;
            runInAction(() => {
                if (tag.tg_ID) {
                    let updatedTag = { ...this.getTag(tag.tg_ID), ...tag };
                    this.tagRegistry.set(tag.tg_ID, updatedTag as Tag);
                    this.selectedTag = updatedTag as Tag;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    activateTag = async (id: string) => {
        try {
            await agent.Tags.activate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    deactivateTag = async (id: string) => {
        try {
            await agent.Tags.deactivate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedTag= () => {
        this.selectedTag = undefined;
    }
}