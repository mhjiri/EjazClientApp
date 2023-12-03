export interface Banner {
    bn_ID: string 
    md_ID: string 
    bl_ID: string 
    gr_ID: string 
    bn_Title: string
    bn_Title_Ar: string
    bn_Desc: string | null
    bn_Desc_Ar: string | null
    bn_PublishFrom: string
    bn_PublishTill: string
    bn_GroupTitle: string
    bn_GroupTitle_Ar: string
    bn_BannerLocationTitle: string
    bn_BannerLocationTitle_Ar: string
    bn_Active: boolean
    bn_CreatedOn: string
    bn_Creator: string
    bn_ModifyOn: string
    bn_Modifier: string
  }

  export class BannerFormValues
  {
    bn_ID: string | undefined = undefined;
    md_ID: string = "00000000-0000-0000-0000-000000000000";
    bl_ID: string = "";
    gr_ID: string = "";
    bn_Title: string = "";
    bn_Title_Ar: string = "";
    bn_Desc: string | null = "";
    bn_Desc_Ar: string | null = "";
    bn_PublishFrom: string = "";
    bn_PublishTill: string = "";
    bn_GroupTitle: string = "";
    bn_GroupTitle_Ar: string = "";
    bn_BannerLocationTitle: string = "";
    bn_BannerLocationTitle_Ar: string = "";
    bn_Active: boolean = true;
    bn_CreatedOn: string = "";
    bn_Creator: string = "";
    bn_ModifyOn: string = "";
    bn_Modifier: string = "";

	  constructor(banner?: BannerFormValues) {
      if (banner) {
        this.bn_ID = banner.bn_ID;
        this.md_ID = banner.md_ID;
        this.bl_ID = banner.bl_ID
        this.gr_ID = banner.gr_ID;
        this.bn_Title = banner.bn_Title;
        this.bn_Title_Ar = banner.bn_Title_Ar;
        this.bn_Desc = banner.bn_Desc;
        this.bn_Desc_Ar = banner.bn_Desc_Ar;
        this.bn_PublishFrom = (banner.bn_PublishFrom != undefined || banner.bn_PublishFrom != null) ? banner.bn_PublishFrom.split('T')[0] : "";
        this.bn_PublishTill = (banner.bn_PublishTill != undefined || banner.bn_PublishTill != null) ? banner.bn_PublishTill.split('T')[0] : "";
        this.bn_GroupTitle = banner.bn_GroupTitle;
        this.bn_GroupTitle_Ar= banner.bn_GroupTitle_Ar;
        this.bn_BannerLocationTitle = banner.bn_BannerLocationTitle;
        this.bn_BannerLocationTitle_Ar = banner.bn_BannerLocationTitle_Ar;
        this.bn_Active = banner.bn_Active;
        this.bn_Modifier = banner.bn_Modifier;
        this.bn_CreatedOn = banner.bn_CreatedOn;//(author.at_CreatedOn != undefined || author.at_CreatedOn != null) ? (new Date(author.at_CreatedOn)).toLocaleString() : "";
        this.bn_Creator = banner.bn_Creator;
        this.bn_ModifyOn = banner.bn_ModifyOn;//(author.at_ModifyOn != undefined || author.at_ModifyOn != null) ? (new Date(author.at_ModifyOn)).toLocaleString() : "";
       }
    }

  }

  

  export class Banner implements Banner {
    constructor(init?: BannerFormValues) {
      Object.assign(this, init);
    }
  }