import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Avatar, AvatarFormValues } from "../models/avatar";
import agent from "../api/agent";
import { store } from "./store";
//import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";
import { FilterParams } from "../models/filterParams";
import { OrderParams } from "../models/orderParams";
import { MediumFormValues } from "../models/medium";


export default class AvatarStore {
    avatarRegistry = new Map<string, Avatar>();
    currentMedium = "00000000-0000-0000-0000-000000000000";
    src = '';
    selectedAvatar?: Avatar = undefined;
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
                this.avatarRegistry.clear();
                this.loadAvatars();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setFilterParams = (filterParams: FilterParams) => {
        this.avatarRegistry.clear();
        this.filterParams = filterParams;
    }

    setOrderParams = (orderParams: OrderParams) => {
        this.avatarRegistry.clear();
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

    get returnedAvatars() {
        return Array.from(this.avatarRegistry.values());
    }

    setSrc = (src : string) => {
        this.src = src;
    }


    loadAvatars = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Avatars.list(this.axiosParams);
            result.data.forEach(avatar => {
                this.setAvatar(avatar);
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
                if (this.selectedAvatar) {
                    this.selectedAvatar.md_ID = this.currentMedium;
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
                if (this.selectedAvatar) {
                    this.selectedAvatar.md_ID = this.currentMedium;
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
    
    loadAvatar = async (id: string) => {
        let avatar = this.getAvatar(id);
        if (avatar) {
            this.selectedAvatar = avatar;
            return avatar;
        }
        else {
            this.setLoadingInitial(true);
            try {
                avatar = await agent.Avatars.get(id);
                this.setAvatar(avatar)
                runInAction(() => this.selectedAvatar = avatar);
                this.setLoadingInitial(false);
                return avatar;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    


    private setAvatar = (avatar: Avatar) => {
        
        this.avatarRegistry.set(avatar.av_ID, avatar);
    }

    private getAvatar= (id: string) => {
        return this.avatarRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createAvatar = async (avatar: AvatarFormValues) => {
        try {
            avatar.md_ID = this.currentMedium;
            const returnedAvatar = await agent.Avatars.create(avatar);
            avatar.av_ID = returnedAvatar.av_ID;
            avatar.av_CreatedOn = returnedAvatar.av_CreatedOn;
            avatar.av_Creator = returnedAvatar.av_Creator;
            const newAvatar = new Avatar(avatar);
            this.setAvatar(newAvatar);
            runInAction(() => {
                this.selectedAvatar = newAvatar;
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateAvatar = async (avatar: AvatarFormValues) => {
        try {
            
            if(this.deleted == 1 || (this.currentMedium != undefined && this.currentMedium != '' && this.currentMedium != "00000000-0000-0000-0000-000000000000")) {
                avatar.md_ID = this.currentMedium;
            } 
            const returnedAvatar = await agent.Avatars.update(avatar);
            avatar = returnedAvatar;
            runInAction(() => {
                if (avatar.av_ID) {
                    let updatedAvatar = { ...this.getAvatar(avatar.av_ID), ...avatar };
                    this.avatarRegistry.set(avatar.av_ID, updatedAvatar as Avatar);
                    this.selectedAvatar = updatedAvatar as Avatar;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    activateAvatar = async (id: string) => {
        try {
            await agent.Avatars.activate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    deactivateAvatar = async (id: string) => {
        try {
            await agent.Avatars.deactivate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedAvatar= () => {
        this.selectedAvatar = undefined;
    }
}