import { GenreFormValues } from "./genre"
import { ItemFormValues } from "./item"

export interface Author {
    at_ID: string 
    md_ID: string 
    at_Name: string
    at_Name_Ar: string
    at_Title: string
    at_Title_Ar: string
    at_Desc: string | null
    at_Desc_Ar: string | null
    at_Summaries: number
    at_Active: boolean
    at_CreatedOn: string
    at_Creator: string
    at_ModifyOn: string
    at_Modifier: string
    genres : GenreFormValues[]
    genreItems : ItemFormValues[]
  }

  export class AuthorFormValues
  {
    at_ID: string | undefined = undefined;
    md_ID: string = "00000000-0000-0000-0000-000000000000";
    at_Name: string = "";
    at_Name_Ar: string = "";
    at_Title: string = "";
    at_Title_Ar: string = "";
    at_Desc: string | null = "";
    at_Desc_Ar: string | null = "";
    at_Summaries: number = 0;
    at_Active: boolean = true;
    at_CreatedOn: string = "";
    at_Creator: string = "";
    at_ModifyOn: string = "";
    at_Modifier: string = "";
    genres: GenreFormValues[] = []
    genreItems : ItemFormValues[] = []

	  constructor(author?: AuthorFormValues) {
      if (author) {
        this.at_ID = author.at_ID;
        this.md_ID = author.md_ID
        this.at_Name = author.at_Name;
        this.at_Name_Ar = author.at_Name_Ar;
        this.at_Title = author.at_Title;
        this.at_Title_Ar = author.at_Title_Ar;
        this.at_Desc = author.at_Desc;
        this.at_Desc_Ar = author.at_Desc_Ar;
        this.at_Summaries = author.at_Summaries;
        this.at_Active = author.at_Active;
        this.at_Modifier = author.at_Modifier;
        this.at_CreatedOn = author.at_CreatedOn;//(author.at_CreatedOn != undefined || author.at_CreatedOn != null) ? (new Date(author.at_CreatedOn)).toLocaleString() : "";
        this.at_Creator = author.at_Creator;
        this.at_ModifyOn = author.at_ModifyOn;//(author.at_ModifyOn != undefined || author.at_ModifyOn != null) ? (new Date(author.at_ModifyOn)).toLocaleString() : "";
        this.genres = author.genres;
        this.genreItems  = author.genreItems;
      }
    }

  }

  

  export class Author implements Author {
    constructor(init?: AuthorFormValues) {
      Object.assign(this, init);
    }
  }