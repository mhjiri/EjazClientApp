import { makeAutoObservable, reaction, runInAction } from "mobx";
import { AdminUser, AdminUserFormValues } from "../models/adminUser";
import agent from "../api/agent";
import { Pagination, PagingParams } from "../models/pagination";
import { FilterParams } from "../models/filterParams";
import { OrderParams } from "../models/orderParams";
import { MediumFormValues } from "../models/medium";


export default class AdminUserStore {
    adminUserRegistry = new Map<string, AdminUser>();
    currentMedium = "00000000-0000-0000-0000-000000000000";
    src = '';
    selectedAdminUser?: AdminUser = undefined;
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
                this.adminUserRegistry.clear();
                this.loadAdminUsers();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setFilterParams = (filterParams: FilterParams) => {
        this.adminUserRegistry.clear();
        this.filterParams = filterParams;
    }

    setOrderParams = (orderParams: OrderParams) => {
        this.adminUserRegistry.clear();
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

    get returnedAdminUsers() {
        return Array.from(this.adminUserRegistry.values());
    }

    setSrc = (src : string) => {
        this.src = src;
    }


    loadAdminUsers = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.AdminUsers.list(this.axiosParams);
            result.data.forEach(adminUser => {
                this.setAdminUser(adminUser);
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
                if (this.selectedAdminUser) {
                    this.selectedAdminUser.md_ID = this.currentMedium;
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
                if (this.selectedAdminUser) {
                    this.selectedAdminUser.md_ID = this.currentMedium;
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
    
    loadAdminUser = async (id: string) => {
        let adminUser = this.getAdminUser(id);
        if (adminUser) {
            this.selectedAdminUser = adminUser;
            return adminUser;
        }
        else {
            this.setLoadingInitial(true);
            try {
                adminUser = await agent.AdminUsers.get(id);
                this.setAdminUser(adminUser)
                runInAction(() => this.selectedAdminUser = adminUser);
                this.setLoadingInitial(false);
                return adminUser;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    loadProfile = async () => {
        
        this.setLoadingInitial(true);
        try {
            let adminUser = await agent.AdminUsers.getProfile();
            this.setAdminUser(adminUser)
            runInAction(() => this.selectedAdminUser = adminUser);
            this.setLoadingInitial(false);
            return adminUser;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    


    private setAdminUser = (adminUser: AdminUser) => {
        
        this.adminUserRegistry.set(adminUser.username, adminUser);
    }

    private getAdminUser= (id: string) => {
        return this.adminUserRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createAdminUser = async (adminUser: AdminUserFormValues) => {
        try {
            adminUser.md_ID = this.currentMedium;
            adminUser.us_SubscriptionExpiryDate = null;
            adminUser.us_CreatedOn =  "2000-01-01";
            adminUser.us_ModifyOn = null;
            const returnedAdminUser = await agent.AdminUsers.create(adminUser);
            adminUser.username = returnedAdminUser.username;
            adminUser.us_CreatedOn = returnedAdminUser.us_CreatedOn;
            adminUser.us_Creator = returnedAdminUser.us_Creator;
            adminUser.us_SubscriptionExpiryDate = "";
            const newAdminUser = new AdminUser(adminUser);
            this.setAdminUser(newAdminUser);
            runInAction(() => {
                this.selectedAdminUser = newAdminUser;
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateAdminUser = async (adminUser: AdminUserFormValues) => {
        try {
            
            if(this.deleted == 1 || (this.currentMedium != undefined && this.currentMedium != '' && this.currentMedium != "00000000-0000-0000-0000-000000000000")) {
                adminUser.md_ID = this.currentMedium;
            } 
            const returnedAdminUser = await agent.AdminUsers.update(adminUser);
            adminUser = returnedAdminUser;
            runInAction(() => {
                if (adminUser.username) {
                    let updatedAdminUser = { ...this.getAdminUser(adminUser.username), ...adminUser };
                    this.adminUserRegistry.set(adminUser.username, updatedAdminUser as AdminUser);
                    this.selectedAdminUser = updatedAdminUser as AdminUser;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateProfile = async (adminUser: AdminUserFormValues) => {
        try {
            
            if(this.deleted == 1 || (this.currentMedium != undefined && this.currentMedium != '' && this.currentMedium != "00000000-0000-0000-0000-000000000000")) {
                adminUser.md_ID = this.currentMedium;
            } 
            const returnedAdminUser = await agent.AdminUsers.updateProfile(adminUser);
            adminUser = returnedAdminUser;
            runInAction(() => {
                if (adminUser.username) {
                    let updatedAdminUser = { ...this.getAdminUser(adminUser.username), ...adminUser };
                    this.adminUserRegistry.set(adminUser.username, updatedAdminUser as AdminUser);
                    this.selectedAdminUser = updatedAdminUser as AdminUser;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    activateAdminUser = async (id: string) => {
        try {
            await agent.AdminUsers.activate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    deactivateAdminUser = async (id: string) => {
        try {
            await agent.AdminUsers.deactivate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteAdminUser = async (id: string) => {
        try {
            await agent.AdminUsers.delete(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedAdminUser= () => {
        this.selectedAdminUser = undefined;
    }
}