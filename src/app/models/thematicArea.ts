export interface ThematicArea {
    th_ID: string
    th_Title: string
    th_Title_Ar: string
    th_Desc: string | null
    th_Desc_Ar: string | null
    th_Summaries: number
    th_Active: boolean
    th_CreatedOn: string |  null
    th_Creator: string
    th_ModifyOn: string | null
    th_Modifier: string | null
  }

  export class ThematicAreaFormValues
  {
    th_ID: string | undefined = undefined;
    th_Title: string = "";
    th_Title_Ar: string = "";
    th_Desc: string | null = "";
    th_Desc_Ar: string | null = "";
    th_Summaries: number = 0;
    th_Active: boolean = true;
    th_CreatedOn: string | null = null;
    th_Creator: string = "";
    th_ModifyOn: string | null = null;
    th_Modifier: string | null = null;

	  constructor(thematicArea?: ThematicAreaFormValues) {
      if (thematicArea) {
        this.th_ID = thematicArea.th_ID;
        this.th_Title = thematicArea.th_Title;
        this.th_Title_Ar = thematicArea.th_Title_Ar;
        this.th_Desc = thematicArea.th_Desc;
        this.th_Desc_Ar = thematicArea.th_Desc_Ar;
        this.th_Summaries = thematicArea.th_Summaries;
        this.th_Active = thematicArea.th_Active;
        this.th_CreatedOn = thematicArea.th_CreatedOn;//(thematicArea.th_CreatedOn != undefined || thematicArea.th_CreatedOn != null) ? (new Date(thematicArea.th_CreatedOn)).toLocaleString() : "";
        this.th_Creator = thematicArea.th_Creator;
        this.th_ModifyOn = thematicArea.th_ModifyOn;//(thematicArea.th_ModifyOn != undefined || thematicArea.th_ModifyOn != null) ? (new Date(thematicArea.th_ModifyOn)).toLocaleString() : "";
        
        this.th_Modifier = thematicArea.th_Modifier;
      }
    }

  }

  

  export class ThematicArea implements ThematicArea {
    constructor(init?: ThematicAreaFormValues) {
      Object.assign(this, init);
    }
  }