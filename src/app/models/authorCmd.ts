import { GenreFormValues } from "./genre"
import { ItemFormValues } from "./item"

export interface AuthorCmd {
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
    at_CreatedOn: Date |  null
    at_Creator: string
    at_ModifyOn: Date | null
    at_Modifier: string | null
    genres : GenreFormValues[] | null
    genreItems : ItemFormValues[] | null
  }

  export class AuthorCmdFormValues
  {
    at_ID: string | undefined = undefined;
    md_ID: string | undefined = undefined;
    at_Name: string = "";
    at_Name_Ar: string = "";
    at_Title: string = "";
    at_Title_Ar: string = "";
    at_Desc: string | null = "";
    at_Desc_Ar: string | null = "";
    at_Summaries: number = 0;
    at_Active: boolean = true;
    at_CreatedOn: Date | null = null;
    at_Creator: string = "";
    at_ModifyOn: Date | null = null;
    at_Modifier: string | null = null;
    genres: GenreFormValues[] | null = null;
    genreItems: ItemFormValues[] | null = null

	  constructor(author?: AuthorCmdFormValues) {
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
        this.at_CreatedOn = author.at_CreatedOn;
        this.at_Creator = author.at_Creator;
        this.at_ModifyOn = author.at_ModifyOn;
        this.at_Modifier = author.at_Modifier;
        this.genreItems = author.genreItems;
        this.genres = author.genres;
      }
    }

  }

  

  export class AuthorCmd implements AuthorCmd {
    constructor(init?: AuthorCmdFormValues) {
      Object.assign(this, init);
    }
  }