export interface Avatar {
    av_ID: string 
    md_ID: string 
    av_Title: string
    av_Title_Ar: string
    av_Desc: string | null
    av_Desc_Ar: string | null
    av_Active: boolean
    av_CreatedOn: string
    av_Creator: string
    av_ModifyOn: string
    av_Modifier: string
  }

  export class AvatarFormValues
  {
    av_ID: string | undefined = undefined;
    md_ID: string = "00000000-0000-0000-0000-000000000000";
    av_Title: string = "";
    av_Title_Ar: string = "";
    av_Desc: string | null = "";
    av_Desc_Ar: string | null = "";
    av_Active: boolean = true;
    av_CreatedOn: string = "";
    av_Creator: string = "";
    av_ModifyOn: string = "";
    av_Modifier: string = "";

	  constructor(avatar?: AvatarFormValues) {
      if (avatar) {
        this.av_ID = avatar.av_ID;
        this.md_ID = avatar.md_ID
        this.av_Title = avatar.av_Title;
        this.av_Title_Ar = avatar.av_Title_Ar;
        this.av_Desc = avatar.av_Desc;
        this.av_Desc_Ar = avatar.av_Desc_Ar;
        this.av_Active = avatar.av_Active;
        this.av_CreatedOn = avatar.av_CreatedOn;//(avatar.av_CreatedOn != undefined || avatar.av_CreatedOn != null) ? (new Date(avatar.av_CreatedOn)).toLocaleString() : "";
        this.av_Creator = avatar.av_Creator;
        this.av_ModifyOn = avatar.av_ModifyOn ;//(avatar.av_ModifyOn != undefined || avatar.av_ModifyOn != null) ? (new Date(avatar.av_ModifyOn)).toLocaleString() : "";
        
        this.av_Modifier = avatar.av_Modifier;
      }
    }

  }

  

  export class Avatar implements Avatar {
    constructor(init?: AvatarFormValues) {
      Object.assign(this, init);
    }
  }