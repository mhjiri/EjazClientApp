export interface Payment {
    pm_ID: string
    py_ID: string
    paymentMethod: string
    paymentMethod_Ar: string
    sb_ID: string
    subscription: string
    subscription_Ar: string
    pm_Subscriber: string
    subscriberName: string
    subscriberPhoneNumber: string
    subscriberEmail: string
    pm_RefernceID: string
    pm_DisplayPrice: number
    pm_Days: number
    pm_Price: number
    pm_Active: boolean
    pm_Creator: string
    pm_CreatedOn: string | null
  }

  export class PaymentFormValues
  {
    pm_ID: string | undefined = undefined;
    py_ID: string =  "";
    paymentMethod: string =  "";
    paymentMethod_Ar: string =  "";
    sb_ID: string =  "";
    subscription: string =  "";
    subscription_Ar: string =  "";
    pm_Subscriber: string =  "";
    subscriberName: string =  "";
    subscriberPhoneNumber: string =  "";
    subscriberEmail: string =  "";
    pm_RefernceID: string =  "";
    pm_DisplayPrice: number = 0;
    pm_Days: number = 0;
    pm_Price: number = 0;
    pm_Active: boolean = true;
    pm_Creator: string = "";
    pm_CreatedOn: string | null = null;

	  constructor(payment?: PaymentFormValues) {
      if (payment) {
        this.pm_ID = payment.pm_ID;
        this.py_ID =  payment.py_ID;
        this.paymentMethod =  payment.paymentMethod;
        this.paymentMethod_Ar =  payment.paymentMethod_Ar;
        this.sb_ID =  payment.sb_ID;
        this.subscription =  payment.subscription;
        this.subscription_Ar =  payment.subscription_Ar;
        this.pm_Subscriber =  payment.pm_Subscriber;
        this.subscriberName =  payment.subscriberName;
        this.subscriberPhoneNumber =  payment.subscriberPhoneNumber;
        this.subscriberEmail =  payment.subscriberEmail;
        this.pm_RefernceID =  payment.pm_RefernceID;
        this.pm_DisplayPrice = payment.pm_DisplayPrice;
        this.pm_Days = payment.pm_Days;
        this.pm_Price = payment.pm_Price;
        this.pm_Active = payment.pm_Active;
        this.pm_Creator = payment.pm_Creator;
        this.pm_CreatedOn = payment.pm_CreatedOn;//(payment.pm_CreatedOn != undefined || payment.pm_CreatedOn != null) ? (new Date(payment.pm_CreatedOn)).toLocaleString() : "";
        
      }
    }

  }

  

  export class Payment implements Payment {
    constructor(init?: PaymentFormValues) {
      Object.assign(this, init);
    }
  }