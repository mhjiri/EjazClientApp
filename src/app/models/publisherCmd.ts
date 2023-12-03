import { GenreFormValues } from "./genre"
import { ItemFormValues } from "./item"

export interface PublisherCmd {
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
    pb_CreatedOn: Date |  null
    pb_Creator: string
    pb_ModifyOn: Date | null
    pb_Modifier: string | null
    genres : GenreFormValues[] | null
    genreItems : ItemFormValues[] | null
  }

  export class PublisherCmdFormValues
  {
    pb_ID: string | undefined = undefined;
    md_ID: string | undefined = undefined;
    pb_Name: string = "";
    pb_Name_Ar: string = "";
    pb_Title: string = "";
    pb_Title_Ar: string = "";
    pb_Desc: string | null = "";
    pb_Desc_Ar: string | null = "";
    pb_Summaries: number = 0;
    pb_Active: boolean = true;
    pb_CreatedOn: Date | null = null;
    pb_Creator: string = "";
    pb_ModifyOn: Date | null = null;
    pb_Modifier: string | null = null;
    genres: GenreFormValues[] | null = null;
    genreItems: ItemFormValues[] | null = null

	  constructor(publisher?: PublisherCmdFormValues) {
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
        this.pb_CreatedOn = publisher.pb_CreatedOn;
        this.pb_Creator = publisher.pb_Creator;
        this.pb_ModifyOn = publisher.pb_ModifyOn;
        this.pb_Modifier = publisher.pb_Modifier;
        this.genreItems = publisher.genreItems;
        this.genres = publisher.genres;
      }
    }

  }

  

  export class PublisherCmd implements PublisherCmd {
    constructor(init?: PublisherCmdFormValues) {
      Object.assign(this, init);
    }
  }