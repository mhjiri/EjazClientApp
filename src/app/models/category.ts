import { ItemFormValues } from "./item"
import { TagFormValues } from "./tag"

export interface Category {
    ct_ID: string 
    md_ID: string 
    classificationID : string
    classification : string
    classification_Ar : string
    ct_Name: string
    ct_Name_Ar: string
    ct_Title: string
    ct_Title_Ar: string
    ct_Desc: string | null
    ct_Desc_Ar: string | null
    ct_Summaries: number
    ct_Active: boolean
    ct_CreatedOn: string |  null
    ct_Creator: string
    ct_ModifyOn: string | null
    ct_Modifier: string | null
    tags : TagFormValues[]
    tagItems : ItemFormValues[]
  }

  export class CategoryFormValues
  {
    ct_ID: string | undefined = undefined; 
    md_ID: string = "00000000-0000-0000-0000-000000000000";
    classificationID : string = "00000000-0000-0000-0000-000000000000";
    classification : string | null = "";
    classification_Ar: string | null = "";
    ct_Name: string = "";
    ct_Name_Ar: string = "";
    ct_Title: string = "";
    ct_Title_Ar: string = "";
    ct_Desc: string | null = "";
    ct_Desc_Ar: string | null = "";
    ct_Summaries: number = 0;
    ct_Active: boolean = true;
    ct_CreatedOn: string | null = null;
    ct_Creator: string = "";
    ct_ModifyOn: string | null = null;
    ct_Modifier: string | null = null;
    tags: TagFormValues[] = [];
    tagItems : ItemFormValues[] = [];
    

	  constructor(category?: CategoryFormValues) {
      if (category) {
        this.ct_ID = category.ct_ID;
        this.md_ID = category.md_ID;
        this.classificationID = category.classificationID;
        this.classification = category.classification;
        this.classification_Ar = category.classification_Ar;
        this.ct_Name = category.ct_Name;
        this.ct_Name_Ar = category.ct_Name_Ar;
        this.ct_Title = category.ct_Title;
        this.ct_Title_Ar = category.ct_Title_Ar;
        this.ct_Desc = category.ct_Desc;
        this.ct_Desc_Ar = category.ct_Desc_Ar;
        this.ct_Summaries = category.ct_Summaries;
        this.ct_Active = category.ct_Active;
        this.ct_CreatedOn = category.ct_CreatedOn;//(category.ct_CreatedOn != undefined || category.ct_CreatedOn != null) ? (new Date(category.ct_CreatedOn)).toLocaleString() : "";
        this.ct_Creator = category.ct_Creator;
        this.ct_ModifyOn = category.ct_ModifyOn;//(category.ct_ModifyOn != undefined || category.ct_ModifyOn != null) ? (new Date(category.ct_ModifyOn)).toLocaleString() : "";
        this.ct_Modifier = category.ct_Modifier;
        this.tags = category.tags;
        this.tagItems  = category.tagItems;
      }
    }

  }

  

  export class Category implements Category {
    constructor(init?: CategoryFormValues) {
      Object.assign(this, init);
    }
  }