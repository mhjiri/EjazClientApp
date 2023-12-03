import { AuthorFormValues } from "./author"
import { CategoryFormValues } from "./category"
import { GenreFormValues } from "./genre"
import { ItemFormValues } from "./item"
import { MediumFormValues } from "./medium"
import { PublisherFormValues } from "./publisher"
import { TagFormValues } from "./tag"
import { ThematicAreaFormValues } from "./thematicArea"

export interface TrialUser {
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
    us_SubscriptionExpiryDate : string | null
    us_Customer: boolean
    us_Admin: boolean
    us_SuperAdmin: boolean
    us_Active: boolean
    us_CreatedOn:  string
    us_Creator: string
    us_ModifyOn: string | null
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

  export class TrialUserFormValues
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
    us_SubscriptionExpiryDate : string | null = "";
    us_Customer: boolean = true
    us_Admin: boolean = false
    us_SuperAdmin: boolean = false
    us_Active: boolean = true
    us_CreatedOn: string | null = "";
    us_Creator: string = "";
    us_ModifyOn: string | null = "";
    us_Modifier: string = "";
    categories : CategoryFormValues[] = []
    categoryItems : ItemFormValues[] = []
    genres : GenreFormValues[] = []
    genreItems : ItemFormValues[] = []
    thematicAreas : ThematicAreaFormValues[] = []
    thematicAreaItems : ItemFormValues[] = []
    tags : TagFormValues[] = []
    tagItems : ItemFormValues[] = []

	  constructor(trialUser?: TrialUserFormValues) {
      if (trialUser) {
        this.id = trialUser.id;
        this.md_ID = trialUser.md_ID;
        this.username = trialUser.username;
        this.email = trialUser.email;
        this.password = "";
        this.phoneNumber = trialUser.phoneNumber;
        this.us_DisplayName = trialUser.us_DisplayName;
        this.us_DOB = (trialUser.us_DOB != undefined || trialUser.us_DOB != null) ? trialUser.us_DOB.split('T')[0] : "";
        this.us_Gender = trialUser.us_Gender;
        this.us_language = trialUser.us_language;
        this.us_Country = trialUser.us_Country;
        this.us_SubscriptionExpiryDate = trialUser.us_SubscriptionExpiryDate;
        this.us_Customer = trialUser.us_Customer;
        this.us_Admin = trialUser.us_Admin;
        this.us_SuperAdmin = trialUser.us_SuperAdmin;
        this.us_Active = trialUser.us_Active;
        this.us_CreatedOn = trialUser.us_CreatedOn;//(trialUser.us_CreatedOn != undefined || trialUser.us_CreatedOn != null) ? (new Date(trialUser.us_CreatedOn)).toLocaleString() : "";
        this.us_Creator = trialUser.us_Creator;
        this.us_ModifyOn = trialUser.us_ModifyOn;//(trialUser.us_ModifyOn != undefined || trialUser.us_ModifyOn != null) ? (new Date(trialUser.us_ModifyOn)).toLocaleString() : "";
        this.us_Modifier = trialUser.us_Modifier;
        this.categories = trialUser.categories;
        this.categoryItems  = trialUser.categoryItems;
        this.genres = trialUser.genres;
        this.genreItems  = trialUser.genreItems;
        this.thematicAreas = trialUser.thematicAreas;
        this.thematicAreaItems  = trialUser.thematicAreaItems;
        this.tags = trialUser.tags;
        this.tagItems  = trialUser.tagItems;
      }
    }

  }

  

  export class TrialUser implements TrialUser {
    constructor(init?: TrialUserFormValues) {
      Object.assign(this, init);
    }
  }