import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Payment, PaymentFormValues } from "../models/payment";
import agent from "../api/agent";
import { store } from "./store";
//import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";
import { FilterParams } from "../models/filterParams";
import { OrderParams } from "../models/orderParams";
import { MediumFormValues } from "../models/medium";


export default class PaymentStore {
    paymentRegistry = new Map<string, Payment>();
    src = '';
    selectedPayment?: Payment = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    uploading = false;
    uploaded = 0;
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
                this.paymentRegistry.clear();
                this.loadPayments();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setFilterParams = (filterParams: FilterParams) => {
        this.paymentRegistry.clear();
        this.filterParams = filterParams;
    }

    setOrderParams = (orderParams: OrderParams) => {
        this.paymentRegistry.clear();
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

    get returnedPayments() {
        return Array.from(this.paymentRegistry.values());
    }

    setSrc = (src : string) => {
        this.src = src;
    }


    loadPayments = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Payments.list(this.axiosParams);
            result.data.forEach(payment => {
                this.setPayment(payment);
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
    
    loadPayment = async (id: string) => {
        let payment = this.getPayment(id);
        if (payment) {
            this.selectedPayment = payment;
            return payment;
        }
        else {
            this.setLoadingInitial(true);
            try {
                payment = await agent.Payments.get(id);
                this.setPayment(payment)
                runInAction(() => this.selectedPayment = payment);
                this.setLoadingInitial(false);
                return payment;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    


    private setPayment = (payment: Payment) => {
        
        this.paymentRegistry.set(payment.pm_ID, payment);
    }

    private getPayment= (id: string) => {
        return this.paymentRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createPayment = async (payment: PaymentFormValues) => {
        try {
            const returnedPayment = await agent.Payments.create(payment);
            payment.pm_ID = returnedPayment.pm_ID;
            payment.pm_CreatedOn = returnedPayment.pm_CreatedOn;
            payment.pm_Creator = returnedPayment.pm_Creator;
            const newPayment = new Payment(returnedPayment);
            this.setPayment(newPayment);
            runInAction(() => {
                this.selectedPayment = newPayment;
            });
        } catch (error) {
            console.log(error);
        }
    }

    // updatePayment = async (payment: PaymentFormValues) => {
    //     try {
            
    //         if(this.currentMedium != undefined && this.currentMedium != '' && this.currentMedium != "00000000-0000-0000-0000-000000000000") {
    //             payment.md_ID = this.currentMedium;
    //         } 
    //         const returnedPayment = await agent.Payments.update(payment);
    //         payment = returnedPayment;
    //         runInAction(() => {
    //             if (payment.pm_ID) {
    //                 let updatedPayment = { ...this.getPayment(payment.pm_ID), ...payment };
    //                 this.paymentRegistry.set(payment.pm_ID, updatedPayment as Payment);
    //                 this.selectedPayment = updatedPayment as Payment;
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // activatePayment = async (id: string) => {
    //     try {
    //         await agent.Payments.activate(id);
    //         runInAction(() => {
                
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // deactivatePayment = async (id: string) => {
    //     try {
    //         await agent.Payments.deactivate(id);
    //         runInAction(() => {
                
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    clearSelectedPayment= () => {
        this.selectedPayment = undefined;
    }
}