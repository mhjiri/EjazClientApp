export interface Genre {
    gn_ID: string
    gn_Title: string
    gn_Title_Ar: string
    gn_Desc: string | null
    gn_Desc_Ar: string | null
    gn_Summaries: number
    gn_Authors: number
    gn_Publishers: number
    gn_Active: boolean
    gn_CreatedOn: string 
    gn_Creator: string
    gn_ModifyOn: string | null
    gn_Modifier: string | null
  }

  export class GenreFormValues
  {
    gn_ID: string | undefined = undefined;
    gn_Title: string = "";
    gn_Title_Ar: string = "";
    gn_Desc: string | null = "";
    gn_Desc_Ar: string | null = "";
    gn_Summaries: number = 0;
    gn_Authors: number = 0;
    gn_Publishers: number = 0;
    gn_Active: boolean = true;
    gn_CreatedOn: string | null = null;
    gn_Creator: string = "";
    gn_ModifyOn: string | null = null;
    gn_Modifier: string | null = null;

	  constructor(genre?: GenreFormValues) {
      if (genre) {
        this.gn_ID = genre.gn_ID;
        this.gn_Title = genre.gn_Title;
        this.gn_Title_Ar = genre.gn_Title_Ar;
        this.gn_Desc = genre.gn_Desc;
        this.gn_Desc_Ar = genre.gn_Desc_Ar;
        this.gn_Summaries = genre.gn_Summaries;
        this.gn_Authors = genre.gn_Authors;
        this.gn_Publishers = genre.gn_Publishers;
        this.gn_Active = genre.gn_Active;
        this.gn_CreatedOn = genre.gn_CreatedOn;//(genre.gn_CreatedOn != undefined || genre.gn_CreatedOn != null) ? (new Date(genre.gn_CreatedOn)).toLocaleString() : "";
        this.gn_Creator = genre.gn_Creator;
        this.gn_ModifyOn = genre.gn_ModifyOn;//(genre.gn_ModifyOn != undefined || genre.gn_ModifyOn != null) ? (new Date(genre.gn_ModifyOn)).toLocaleString() : "";
        this.gn_Modifier = genre.gn_Modifier;
      }
    }

  }

  

  export class Genre implements Genre {
    constructor(init?: GenreFormValues) {
      Object.assign(this, init);
    }
  }