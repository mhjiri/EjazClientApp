import { makeAutoObservable, reaction, runInAction } from "mobx";
import { PaymentMethod, PaymentMethodFormValues } from "../models/paymentMethod";
import agent from "../api/agent";
import { store } from "./store";
//import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";
import { FilterParams } from "../models/filterParams";
import { OrderParams } from "../models/orderParams";


export default class PaymentMethodStore {
    paymentMethodRegistry = new Map<string, PaymentMethod>();
    selectedPaymentMethod?: PaymentMethod = undefined;
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
                this.paymentMethodRegistry.clear();
                this.loadPaymentMethods();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setFilterParams = (filterParams: FilterParams) => {
        this.paymentMethodRegistry.clear();
        this.filterParams = filterParams;
    }

    setOrderParams = (orderParams: OrderParams) => {
        this.paymentMethodRegistry.clear();
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

    

    get returnedPaymentMethods() {
        return Array.from(this.paymentMethodRegistry.values());
    }


    loadPaymentMethods = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.PaymentMethods.list(this.axiosParams);
            result.data.forEach(paymentMethod => {
                this.setPaymentMethod(paymentMethod);
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
    
    loadPaymentMethod = async (id: string) => {
        let paymentMethod = this.getPaymentMethod(id);
        if (paymentMethod) {
            this.selectedPaymentMethod = paymentMethod;
            return paymentMethod;
        }
        else {
            this.setLoadingInitial(true);
            try {
                paymentMethod = await agent.PaymentMethods.get(id);
                this.setPaymentMethod(paymentMethod)
                runInAction(() => this.selectedPaymentMethod = paymentMethod);
                this.setLoadingInitial(false);
                return paymentMethod;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setPaymentMethod = (paymentMethod: PaymentMethod) => {
        
        this.paymentMethodRegistry.set(paymentMethod.py_ID, paymentMethod);
    }

    private getPaymentMethod= (id: string) => {
        return this.paymentMethodRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createPaymentMethod = async (paymentMethod: PaymentMethodFormValues) => {
        //const user = store.userStore!.user;
        //const profile = new Profile(user!);
        try {
            const returnedPaymentMethod = await agent.PaymentMethods.create(paymentMethod);
            paymentMethod.py_ID = returnedPaymentMethod.py_ID;
            paymentMethod.py_CreatedOn = returnedPaymentMethod.py_CreatedOn;
            paymentMethod.py_Creator = returnedPaymentMethod.py_Creator;
            const newPaymentMethod = new PaymentMethod(returnedPaymentMethod);
            this.setPaymentMethod(newPaymentMethod);
            runInAction(() => {
                this.selectedPaymentMethod = newPaymentMethod;
            });
        } catch (error) {
            console.log(error);
        }
    }

    updatePaymentMethod = async (paymentMethod: PaymentMethodFormValues) => {
        try {
            const returnedPaymentMethod = await agent.PaymentMethods.update(paymentMethod);
            paymentMethod = returnedPaymentMethod;
            runInAction(() => {
                if (paymentMethod.py_ID) {
                    let updatedPaymentMethod = { ...this.getPaymentMethod(paymentMethod.py_ID), ...paymentMethod };
                    this.paymentMethodRegistry.set(paymentMethod.py_ID, updatedPaymentMethod as PaymentMethod);
                    this.selectedPaymentMethod = updatedPaymentMethod as PaymentMethod;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    activatePaymentMethod = async (id: string) => {
        try {
            await agent.PaymentMethods.activate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    deactivatePaymentMethod = async (id: string) => {
        try {
            await agent.PaymentMethods.deactivate(id);
            runInAction(() => {
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    clearSelectedPaymentMethod= () => {
        this.selectedPaymentMethod = undefined;
    }
}