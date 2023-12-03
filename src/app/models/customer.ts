import { CategoryFormValues } from "./category"
import { GenreFormValues } from "./genre"
import { ItemFormValues } from "./item"
import { TagFormValues } from "./tag"
import { ThematicAreaFormValues } from "./thematicArea"

export interface Customer {
    id: string 
    md_ID: string 
    username: string
    email: string
    password: string
    phoneNumber: string
    us_DisplayName: string
    us_DOB: string
    us_Gender: string
    us_language: string
    us_Country: string
    us_SubscriptionExpiryDate : string
    us_Customer: boolean
    us_Admin: boolean
    us_SuperAdmin: boolean
    us_Active: boolean
    us_CreatedOn: string
    us_Creator: string
    us_ModifyOn: string
    us_Modifier: string
    categories : CategoryFormValues[]
    categoryItems : ItemFormValues[]
    genres : GenreFormValues[]
    genreItems : ItemFormValues[]
    thematicAreas : ThematicAreaFormValues[]
    thematicAreaItems : ItemFormValues[]
    tags : TagFormValues[]
    tagItems : ItemFormValues[]
  }

  export class CustomerFormValues
  {
    
    id: string  | undefined = undefined;
    md_ID: string = "00000000-0000-0000-0000-000000000000";
    username: string = "";
    email: string = "";
    password: string = "";
    phoneNumber: string = "";
    us_DisplayName: string = "";
    us_DOB: string = "";
    us_Gender: string = "";
    us_language: string = "";
    us_Country: string = "";
    us_SubscriptionExpiryDate : string = "";
    us_Customer: boolean = true
    us_Admin: boolean = false
    us_SuperAdmin: boolean = false
    us_Active: boolean = true
    us_CreatedOn: string = "";
    us_Creator: string = "";
    us_ModifyOn: string = "";
    us_Modifier: string = "";
    categories : CategoryFormValues[] = []
    categoryItems : ItemFormValues[] = []
    genres : GenreFormValues[] = []
    genreItems : ItemFormValues[] = []
    thematicAreas : ThematicAreaFormValues[] = []
    thematicAreaItems : ItemFormValues[] = []
    tags : TagFormValues[] = []
    tagItems : ItemFormValues[] = []

	  constructor(customer?: CustomerFormValues) {
      if (customer) {
        this.id = customer.id;
        this.md_ID = customer.md_ID;
        this.username = customer.username;
        this.email = customer.email;
        this.password = "";
        this.phoneNumber = customer.phoneNumber;
        this.us_DisplayName = customer.us_DisplayName;
        this.us_DOB = (customer.us_DOB != undefined || customer.us_DOB != null) ? customer.us_DOB.split('T')[0] : "";
        this.us_Gender = customer.us_Gender;
        this.us_language = customer.us_language;
        this.us_Country = customer.us_Country;
        this.us_SubscriptionExpiryDate = customer.us_SubscriptionExpiryDate;
        this.us_Customer = customer.us_Customer;
        this.us_Admin = customer.us_Admin;
        this.us_SuperAdmin = customer.us_SuperAdmin;
        this.us_Active = customer.us_Active;
        this.us_CreatedOn = customer.us_CreatedOn;//(customer.us_CreatedOn != undefined || customer.us_CreatedOn != null) ? (new Date(customer.us_CreatedOn)).toLocaleString() : "";
        this.us_Creator = customer.us_Creator;
        this.us_ModifyOn = customer.us_ModifyOn;//(customer.us_ModifyOn != undefined || customer.us_ModifyOn != null) ? (new Date(customer.us_ModifyOn)).toLocaleString() : "";
        this.us_Modifier = customer.us_Modifier;
        this.categories = customer.categories;
        this.categoryItems  = customer.categoryItems;
        this.genres = customer.genres;
        this.genreItems  = customer.genreItems;
        this.thematicAreas = customer.thematicAreas;
        this.thematicAreaItems  = customer.thematicAreaItems;
        this.tags = customer.tags;
        this.tagItems  = customer.tagItems;
      }
    }

  }

  

  export class Customer implements Customer {
    constructor(init?: CustomerFormValues) {
      Object.assign(this, init);
    }
  }