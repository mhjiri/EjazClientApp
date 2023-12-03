export interface BannerLocation {
    bl_ID: string
    bl_Title: string
    bl_Title_Ar: string
    bl_Desc: string | null
    bl_Desc_Ar: string | null
    bl_Ratio: number
    bl_Banners: number
    bl_Active: boolean
    bl_CreatedOn: string
    bl_Creator: string
    bl_ModifyOn: string
    bl_Modifier: string
  }

  export class BannerLocationFormValues
  {
    bl_ID: string | undefined = undefined;
    bl_Title: string = "";
    bl_Title_Ar: string = "";
    bl_Desc: string | null = "";
    bl_Desc_Ar: string | null = "";
    bl_Ratio: number = 1;
    bl_Banners: number = 0;
    bl_Active: boolean = true;
    bl_CreatedOn: string = "";
    bl_Creator: string = "";
    bl_ModifyOn: string = "";
    bl_Modifier: string = "";

	  constructor(bannerLocation?: BannerLocationFormValues) {
      if (bannerLocation) {
        this.bl_ID = bannerLocation.bl_ID;
        this.bl_Title = bannerLocation.bl_Title;
        this.bl_Title_Ar = bannerLocation.bl_Title_Ar;
        this.bl_Desc = bannerLocation.bl_Desc;
        this.bl_Desc_Ar = bannerLocation.bl_Desc_Ar;
        this.bl_Ratio = bannerLocation.bl_Ratio;
        this.bl_Banners = bannerLocation.bl_Banners;
        this.bl_Active = bannerLocation.bl_Active;
        this.bl_CreatedOn = bannerLocation.bl_CreatedOn;//(bannerLocation.bl_CreatedOn != undefined || bannerLocation.bl_CreatedOn != null) ? (new Date(bannerLocation.bl_CreatedOn)).toLocaleString() : "";
        this.bl_Creator = bannerLocation.bl_Creator;
        this.bl_ModifyOn = bannerLocation.bl_ModifyOn;//(bannerLocation.bl_ModifyOn != undefined || bannerLocation.bl_ModifyOn != null) ? (new Date(bannerLocation.bl_ModifyOn)).toLocaleString() : "";
        
        this.bl_Modifier = bannerLocation.bl_Modifier;
      }
    }

  }

  

  export class BannerLocation implements BannerLocation {
    constructor(init?: BannerLocationFormValues) {
      Object.assign(this, init);
    }
  }