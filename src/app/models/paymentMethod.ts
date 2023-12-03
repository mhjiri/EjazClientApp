export interface PaymentMethod {
    py_ID: string
    py_Title: string
    py_Title_Ar: string
    py_Desc: string | null
    py_Desc_Ar: string | null
    py_Summaries: number
    py_Active: boolean
    py_CreatedOn: string | null
    py_Creator: string
    py_ModifyOn: string | null
    py_Modifier: string | null
  }

  export class PaymentMethodFormValues
  {
    py_ID: string | undefined = undefined;
    py_Title: string = "";
    py_Title_Ar: string = "";
    py_Desc: string | null = "";
    py_Desc_Ar: string | null = "";
    py_Summaries: number = 0;
    py_Active: boolean = true;
    py_CreatedOn: string | null = null;
    py_Creator: string = "";
    py_ModifyOn: string | null = null;
    py_Modifier: string | null = null;

	  constructor(paymentMethod?: PaymentMethodFormValues) {
      if (paymentMethod) {
        this.py_ID = paymentMethod.py_ID;
        this.py_Title = paymentMethod.py_Title;
        this.py_Title_Ar = paymentMethod.py_Title_Ar;
        this.py_Desc = paymentMethod.py_Desc;
        this.py_Desc_Ar = paymentMethod.py_Desc_Ar;
        this.py_Summaries = paymentMethod.py_Summaries;
        this.py_Active = paymentMethod.py_Active;
        this.py_CreatedOn = paymentMethod.py_CreatedOn;//(paymentMethod.py_CreatedOn != undefined || paymentMethod.py_CreatedOn != null) ? (new Date(paymentMethod.py_CreatedOn)).toLocaleString() : "";
        this.py_Creator = paymentMethod.py_Creator;
        this.py_ModifyOn = paymentMethod.py_ModifyOn;//(paymentMethod.py_ModifyOn != undefined || paymentMethod.py_ModifyOn != null) ? (new Date(paymentMethod.py_ModifyOn)).toLocaleString() : "";
        this.py_Modifier = paymentMethod.py_Modifier;

        
      }
    }

  }

  

  export class PaymentMethod implements PaymentMethod {
    constructor(init?: PaymentMethodFormValues) {
      Object.assign(this, init);
    }
  }