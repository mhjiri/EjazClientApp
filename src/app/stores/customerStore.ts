import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Customer, CustomerFormValues } from "../models/customer";
import agent from "../api/agent";
import { store } from "./store";
//import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";
import { FilterParams } from "../models/filterParams";
import { OrderParams } from "../models/orderParams";
import { MediumFormValues } from "../models/medium";


export default class CustomerStore {
    customerRegistry = new Map<string, Customer>();
    currentMedium = "00000000-0000-0000-0000-000000000000";
    src = '';
    selectedCustomer?: Customer = undefined;
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
                this.customerRegistry.clear();
                this.loadCustomers();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setFilterParams = (filterParams: FilterParams) => {
        this.customerRegistry.clear();
        this.filterParams = filterParams;
    }

    setOrderParams = (orderParams: OrderParams) => {
        this.customerRegistry.clear();
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

    get returnedCustomers() {
        return Array.from(this.customerRegistry.values());
    }

    setSrc = (src : string) => {
        this.src = src;
    }

    setDeleted = (flag : number) => {
        this.deleted = flag;
    }


    loadCustomers = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Customers.list(this.axiosParams);
            result.data.forEach(customer => {
                this.setCustomer(customer);
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
                if (this.selectedCustomer) {
                    this.selectedCustomer.md_ID = this.currentMedium;
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
                if (this.selectedCustomer) {
                    this.selectedCustomer.md_ID = this.currentMedium;
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
    
    loadCustomer = async (id: string) => {
        let customer = this.getCustomer(id);
        if (customer) {
            this.selectedCustomer = customer;
            return customer;
        }
        else {
            this.setLoadingInitial(true);
            try {
                customer = await agent.Customers.get(id);
                this.setCustomer(customer)
                runInAction(() => this.selectedCustomer = customer);
                this.setLoadingInitial(false);
                return customer;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    


    private setCustomer = (customer: Customer) => {
        
        this.customerRegistry.set(customer.username, customer);
    }

    private getCustomer= (id: string) => {
        return this.customerRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createCustomer = async (customer: CustomerFormValues) => {
        try {
            customer.md_ID = this.currentMedium;
            const returnedCustomer = await agent.Customers.create(customer);
            customer.username = returnedCustomer.username;
            customer.us_CreatedOn = returnedCustomer.us_CreatedOn;
            customer.us_Creator = returnedCustomer.us_Creator;
            const newCustomer = new Customer(customer);
            this.setCustomer(newCustomer);
            runInAction(() => {
                this.selectedCustomer = newCustomer;
            });
        } catch (error) {
            console.log(error);
        }
    }

    updateCustomer = async (customer: CustomerFormValues) => {
        try {
            
            if(this.deleted==1 || (this.currentMedium != undefined && this.currentMedium != '' && this.currentMedium != "00000000-0000-0000-0000-000000000000")) {
                customer.md_ID = this.currentMedium;
            } 
            const returnedCustomer = await agent.Customers.update(customer);
            customer = returnedCustomer;
            runInAction(() => {
                if (customer.username) {
                    let updatedCustomer = { ...this.getCustomer(customer.username), ...customer };
                    this.customerRegistry.set(customer.username, updatedCustomer as Customer);
                    this.selectedCustomer = updatedCustomer as Customer;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    activateCustomer = async (id: string) => {
        try {
            await agent.Customers.activate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    deactivateCustomer = async (id: string) => {
        try {
            await agent.Customers.deactivate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    deleteCustomer = async (id: string) => {
        try {
            await agent.Customers.delete(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedCustomer= () => {
        this.selectedCustomer = undefined;
    }
}