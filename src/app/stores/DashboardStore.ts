import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Chart, ChartFormValues } from "../models/chart";
import agent from "../api/agent";
import { store } from "./store";
//import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";
import { FilterParams } from "../models/filterParams";
import { OrderParams } from "../models/orderParams";


export default class DashboardStore {
    DashboardRegistry = new Map<string, Chart>();
    selectedUserData?: Chart = undefined;
    selectedBookData?: Chart = undefined;
    selectedAuthorData?: Chart = undefined;
    selectedActiveMembersData?: Chart = undefined;
    selectedNewMembersData?: Chart = undefined;
    selectedExpiredMembersData?: Chart = undefined;
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

    


    
    
    
    loadUserData= async () => {
        let UserData = this.getDashboard('UserData');
        if (UserData) {
            this.selectedUserData = UserData;
            return UserData;
        }
        else {
            this.setLoadingInitial(true);
            try {
                UserData = await agent.Dashboards.getUserData();
                this.setUserData(UserData)
                runInAction(() => this.selectedUserData= UserData);
                this.setLoadingInitial(false);
                return UserData;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    loadBookData= async () => {
        let BookData = this.getDashboard('BookData');
        if (BookData) {
            this.selectedBookData = BookData;
            return BookData;
        }
        else {
            this.setLoadingInitial(true);
            try {
                BookData = await agent.Dashboards.getBookData();
                this.setBookData(BookData)
                runInAction(() => this.selectedBookData= BookData);
                this.setLoadingInitial(false);
                return BookData;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    loadAuthorData= async () => {
        let AuthorData = this.getDashboard('AuthorData');
        if (AuthorData) {
            this.selectedAuthorData = AuthorData;
            return AuthorData;
        }
        else {
            this.setLoadingInitial(true);
            try {
                AuthorData = await agent.Dashboards.getAuthorData();
                this.setAuthorData(AuthorData)
                runInAction(() => this.selectedAuthorData= AuthorData);
                this.setLoadingInitial(false);
                return AuthorData;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    loadActiveMembersData= async () => {
        let ActiveMembersData = this.getDashboard('ActiveMembersData');
        if (ActiveMembersData) {
            this.selectedActiveMembersData = ActiveMembersData;
            return ActiveMembersData;
        }
        else {
            this.setLoadingInitial(true);
            try {
                ActiveMembersData = await agent.Dashboards.GetActiveMembersData();
                this.setActiveMembersData(ActiveMembersData)
                runInAction(() => this.selectedActiveMembersData= ActiveMembersData);
                this.setLoadingInitial(false);
                return ActiveMembersData;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    loadNewMembersData= async () => {
        let NewMembersData = this.getDashboard('NewMembersData');
        if (NewMembersData) {
            this.selectedNewMembersData = NewMembersData;
            return NewMembersData;
        }
        else {
            this.setLoadingInitial(true);
            try {
                NewMembersData = await agent.Dashboards.GetNewMembersData();
                this.setNewMembersData(NewMembersData)
                runInAction(() => this.selectedNewMembersData= NewMembersData);
                this.setLoadingInitial(false);
                return NewMembersData;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    loadExpiredMembersData = async () => {
        let ExpiredMembersData = this.getDashboard('ExpiredMembersData');
        if (ExpiredMembersData) {
            this.selectedExpiredMembersData = ExpiredMembersData;
            return ExpiredMembersData;
        }
        else {
            this.setLoadingInitial(true);
            try {
                ExpiredMembersData = await agent.Dashboards.GetExpiredMembersData();
                this.setExpiredMembersData(ExpiredMembersData)
                runInAction(() => this.selectedExpiredMembersData= ExpiredMembersData);
                this.setLoadingInitial(false);
                return ExpiredMembersData;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setUserData= (UserData: Chart) => {
        
        this.DashboardRegistry.set('UserData', UserData);
    }

    private setBookData= (BookData: Chart) => {
        
        this.DashboardRegistry.set('BookData', BookData);
    }

    private setAuthorData= (AuthorData: Chart) => {
        
        this.DashboardRegistry.set('AuthorData', AuthorData);
    }

    private setActiveMembersData = (ActiveMembersData: Chart) => {
        
        this.DashboardRegistry.set('ActiveMembersData', ActiveMembersData);
    }

    private setNewMembersData = (NewMembersData: Chart) => {
        
        this.DashboardRegistry.set('NewMembersData', NewMembersData);
    }

    private setExpiredMembersData = (ExpiredMembersData: Chart) => {
        
        this.DashboardRegistry.set('ExpiredMembersData', ExpiredMembersData);
    }

    private getDashboard= (id: string) => {
        return this.DashboardRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    

    

    

    clearSelectedUserData= () => {
        this.selectedUserData= undefined;
    }

    clearSelectedBookData= () => {
        this.selectedBookData= undefined;
    }

    clearSelectedAuthorData= () => {
        this.selectedAuthorData= undefined;
    }

    clearSelectedActiveMembersData= () => {
        this.selectedActiveMembersData= undefined;
    }

    clearSelectedNewMembersData= () => {
        this.selectedNewMembersData= undefined;
    }

    clearSelectedExpiredMembersData= () => {
        this.selectedExpiredMembersData= undefined;
    }
}