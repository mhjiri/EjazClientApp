export interface OrderParams {
    orderBy: string;
    orderAs: string;
}

export class OrderParams {
    orderBy = '';
    orderAs = '';

    constructor(orderBy='', orderAs = '') {
        this.orderBy = orderBy;
        this.orderAs = orderAs;
    }
}