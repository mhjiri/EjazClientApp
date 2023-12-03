import { GenreFormValues } from "./genre"
import { ItemFormValues } from "./item"

export interface Subscription {
    sb_ID: string 
    md_ID: string 
    sb_Name: string
    sb_Name_Ar: string
    sb_Title: string
    sb_Title_Ar: string
    sb_Desc: string | null
    sb_Desc_Ar: string | null
    sb_Price: number
    sb_DisplayPrice: number
    sb_DiscountDesc: string
    sb_DiscountDesc_Ar: string
    sb_Days: number
    sb_Active: boolean
    sb_CreatedOn: string
    sb_Creator: string
    sb_ModifyOn: string
    sb_Modifier: string
  }

  export class SubscriptionFormValues
  {
    sb_ID: string | undefined = undefined;
    md_ID: string = "00000000-0000-0000-0000-000000000000";
    sb_Name: string = "";
    sb_Name_Ar: string = "";
    sb_Title: string = "";
    sb_Title_Ar: string = "";
    sb_Desc: string | null = "";
    sb_Desc_Ar: string | null = "";
    sb_Price: number = 0.00;
    sb_DisplayPrice: number = 0.00;
    sb_DiscountDesc: string = "";
    sb_DiscountDesc_Ar: string = "";
    sb_Days: number = 0;
    sb_Active: boolean = true;
    sb_CreatedOn: string = "";
    sb_Creator: string = "";
    sb_ModifyOn: string = "";
    sb_Modifier: string = "";

	  constructor(subscription?: SubscriptionFormValues) {
      if (subscription) {
        this.sb_ID = subscription.sb_ID;
        this.md_ID = subscription.md_ID
        this.sb_Name = subscription.sb_Name;
        this.sb_Name_Ar = subscription.sb_Name_Ar;
        this.sb_Title = subscription.sb_Title;
        this.sb_Title_Ar = subscription.sb_Title_Ar;
        this.sb_Desc = subscription.sb_Desc;
        this.sb_Desc_Ar = subscription.sb_Desc_Ar;
        this.sb_Price = subscription.sb_Price;
        this.sb_DisplayPrice = subscription.sb_DisplayPrice;
        this.sb_DiscountDesc = subscription.sb_DiscountDesc;
        this.sb_DiscountDesc_Ar = subscription.sb_DiscountDesc_Ar;
        this.sb_Days = subscription.sb_Days;
        this.sb_Active = subscription.sb_Active;
        this.sb_CreatedOn = subscription.sb_CreatedOn;//(subscription.sb_CreatedOn != undefined || subscription.sb_CreatedOn != null) ? (new Date(subscription.sb_CreatedOn)).toLocaleString() : "";
        this.sb_Creator = subscription.sb_Creator;
        this.sb_ModifyOn = subscription.sb_ModifyOn;//(subscription.sb_ModifyOn != undefined || subscription.sb_ModifyOn != null) ? (new Date(subscription.sb_ModifyOn)).toLocaleString() : "";
        
        this.sb_Modifier = subscription.sb_Modifier;
      }
    }

  }

  

  export class Subscription implements Subscription {
    constructor(init?: SubscriptionFormValues) {
      Object.assign(this, init);
    }
  }