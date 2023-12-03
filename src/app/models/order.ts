import { GenreFormValues } from "./genre"
import { ItemFormValues } from "./item"

export interface Publisher {
    pb_ID: string 
    md_ID: string 
    pb_Name: string
    pb_Name_Ar: string
    pb_Title: string
    pb_Title_Ar: string
    pb_Desc: string | null
    pb_Desc_Ar: string | null
    pb_Summaries: number
    pb_Active: boolean
    pb_CreatedOn: string
    pb_Creator: string
    pb_ModifyOn: string
    pb_Modifier: string
    genres : GenreFormValues[]
    genreItems : ItemFormValues[]
  }

  export class PublisherFormValues
  {
    pb_ID: string | undefined = undefined;
    md_ID: string = "00000000-0000-0000-0000-000000000000";
    pb_Name: string = "";
    pb_Name_Ar: string = "";
    pb_Title: string = "";
    pb_Title_Ar: string = "";
    pb_Desc: string | null = "";
    pb_Desc_Ar: string | null = "";
    pb_Summaries: number = 0;
    pb_Active: boolean = true;
    pb_CreatedOn: string = "";
    pb_Creator: string = "";
    pb_ModifyOn: string = "";
    pb_Modifier: string = "";
    genres: GenreFormValues[] = []
    genreItems : ItemFormValues[] = []

	  constructor(publisher?: PublisherFormValues) {
      if (publisher) {
        this.pb_ID = publisher.pb_ID;
        this.md_ID = publisher.md_ID
        this.pb_Name = publisher.pb_Name;
        this.pb_Name_Ar = publisher.pb_Name_Ar;
        this.pb_Title = publisher.pb_Title;
        this.pb_Title_Ar = publisher.pb_Title_Ar;
        this.pb_Desc = publisher.pb_Desc;
        this.pb_Desc_Ar = publisher.pb_Desc_Ar;
        this.pb_Summaries = publisher.pb_Summaries;
        this.pb_Active = publisher.pb_Active;
        this.pb_CreatedOn = publisher.pb_CreatedOn;//(publisher.pb_CreatedOn != undefined || publisher.pb_CreatedOn != null) ? (new Date(publisher.pb_CreatedOn)).toLocaleString() : "";
        this.pb_Creator = publisher.pb_Creator;
        this.pb_ModifyOn = publisher.pb_ModifyOn;//(publisher.pb_ModifyOn != undefined || publisher.pb_ModifyOn != null) ? (new Date(publisher.pb_ModifyOn)).toLocaleString() : "";
        this.pb_Modifier = publisher.pb_Modifier;
        this.genres = publisher.genres;
        this.genreItems  = publisher.genreItems;
      }
    }

  }

  

  export class Publisher implements Publisher {
    constructor(init?: PublisherFormValues) {
      Object.assign(this, init);
    }
  }