export interface Tag {
    tg_ID: string
    tg_Title: string
    tg_Title_Ar: string
    tg_Desc: string | null
    tg_Desc_Ar: string | null
    tg_Summaries: number
    tg_Active: boolean
    tg_CreatedOn: string | null
    tg_Creator: string
    tg_ModifyOn: string | null
    tg_Modifier: string | null
  }

  export class TagFormValues
  {
    tg_ID: string | undefined = undefined;
    tg_Title: string = "";
    tg_Title_Ar: string = "";
    tg_Desc: string | null = "";
    tg_Desc_Ar: string | null = "";
    tg_Summaries: number = 0;
    tg_Active: boolean = true;
    tg_CreatedOn: string | null = null;
    tg_Creator: string = "";
    tg_ModifyOn: string | null = null;
    tg_Modifier: string | null = null;

	  constructor(tag?: TagFormValues) {
      if (tag) {
        this.tg_ID = tag.tg_ID;
        this.tg_Title = tag.tg_Title;
        this.tg_Title_Ar = tag.tg_Title_Ar;
        this.tg_Desc = tag.tg_Desc;
        this.tg_Desc_Ar = tag.tg_Desc_Ar;
        this.tg_Summaries = tag.tg_Summaries;
        this.tg_Active = tag.tg_Active;
        this.tg_CreatedOn = tag.tg_CreatedOn;//(tag.tg_CreatedOn != undefined || tag.tg_CreatedOn != null) ? (new Date(tag.tg_CreatedOn)).toLocaleString() : "";
        this.tg_Creator = tag.tg_Creator;
        this.tg_ModifyOn = tag.tg_ModifyOn;//(tag.tg_ModifyOn != undefined || tag.tg_ModifyOn != null) ? (new Date(tag.tg_ModifyOn)).toLocaleString() : "";
        
        this.tg_Modifier = tag.tg_Modifier;
      }
    }

  }

  

  export class Tag implements Tag {
    constructor(init?: TagFormValues) {
      Object.assign(this, init);
    }
  }