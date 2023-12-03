import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Category, CategoryFormValues } from "../models/category";
import agent from "../api/agent";
import { store } from "./store";
//import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";
import { FilterParams } from "../models/filterParams";
import { OrderParams } from "../models/orderParams"; 
import { MediumFormValues } from "../models/medium";


export default class CategoryStore {
    categoryRegistry = new Map<string, Category>();
    classificationRegistry = new Map<string, Category>();
    currentMedium = "00000000-0000-0000-0000-000000000000";
    src = '';
    selectedCategory?: Category = undefined;
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
                this.categoryRegistry.clear();
                this.loadCategories();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setFilterParams = (filterParams: FilterParams) => {
        this.categoryRegistry.clear();
        this.filterParams = filterParams;
    }

    setOrderParams = (orderParams: OrderParams) => {
        this.categoryRegistry.clear();
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

    get returnedCategories() {
        return Array.from(this.categoryRegistry.values());
    }

    get returnedClassifications() {
        return Array.from(this.classificationRegistry.values());
    }

    setSrc = (src : string) => {
        this.src = src;
    }


    loadCategories = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Categories.list(this.axiosParams);
            result.data.forEach(category => {
                this.setCategory(category);
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadClassifications = async () => {
        try {
            const result = await agent.Categories.list(this.axiosParams);
            result.data.forEach(category => {
                this.setClassification(category);
            })
            this.setPagination(result.pagination);
        } catch (error) {
            console.log(error);
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
                if (this.selectedCategory) {
                    this.selectedCategory.md_ID = this.currentMedium;
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
                if (this.selectedCategory) {
                    this.selectedCategory.md_ID = this.currentMedium;
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
    
    loadCategory = async (id: string) => {
        let category = this.getCategory(id);
        if (category) {
            this.selectedCategory = category;
            return category;
        }
        else {
            this.setLoadingInitial(true);
            try {
                category = await agent.Categories.get(id);
                this.setCategory(category)
                runInAction(() => this.selectedCategory = category);
                this.setLoadingInitial(false);
                return category;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    


    private setCategory = (category: Category) => {
        
        this.categoryRegistry.set(category.ct_ID, category);
    }

    private setClassification = (category: Category) => {
        
        this.classificationRegistry.set(category.ct_ID, category);
    }

    private getCategory= (id: string) => {
        return this.categoryRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createCategory = async (category: CategoryFormValues) => {
        try {
            category.md_ID = this.currentMedium;
            const returnedCategory = await agent.Categories.create(category);
            category.ct_ID = returnedCategory.ct_ID;
            category.ct_CreatedOn = returnedCategory.ct_CreatedOn;
            category.ct_Creator = returnedCategory.ct_Creator;
            category.tags = returnedCategory.tags;
            category.classificationID = returnedCategory.classificationID;
            category.classification = returnedCategory.classification;
            category.classification_Ar = returnedCategory.classification_Ar;
            const newCategory = new Category(category);
            this.setCategory(newCategory);
            runInAction(() => {
                this.selectedCategory = newCategory;
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateCategory = async (category: CategoryFormValues) => {
        try {
            
            if(this.deleted == 1 || (this.currentMedium != undefined && this.currentMedium != '' && this.currentMedium != "00000000-0000-0000-0000-000000000000")) {
                category.md_ID = this.currentMedium;
            } 
            const returnedCategory = await agent.Categories.update(category);
            category = returnedCategory;
            runInAction(() => {
                if (category.ct_ID) {
                    let updatedCategory = { ...this.getCategory(category.ct_ID), ...category };
                    this.categoryRegistry.set(category.ct_ID, updatedCategory as Category);
                    this.selectedCategory = updatedCategory as Category;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    activateCategory = async (id: string) => {
        try {
            await agent.Categories.activate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    deactivateCategory = async (id: string) => {
        try {
            await agent.Categories.deactivate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedCategory= () => {
        this.selectedCategory = undefined;
    }
}