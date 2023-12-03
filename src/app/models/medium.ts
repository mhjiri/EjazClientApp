export interface Medium {
  md_ID: string
  md_Medium: string
  md_FileType: string
  md_Extension: string
  md_Title: string
  md_Title_Ar: string
  md_Desc: string
  md_Desc_Ar: string
  md_Ordinal: number
  md_Active: boolean
  md_CreatedOn: string
  md_Creator: string
  md_ModifyOn: string
  md_Modifier: string
  }

  export class MediumFormValues
  {
    md_ID: string | undefined = undefined
    md_Medium: string = ""
    md_FileType: string = ""
    md_Extension: string = ""
    md_Title: string = ""
    md_Title_Ar: string = ""
    md_Desc: string = ""
    md_Desc_Ar: string = ""
    md_Ordinal: number = 0
    md_Active: boolean = true
    md_CreatedOn: string = ""
    md_Creator: string = ""
    md_ModifyOn: string = ""
    md_Modifier: string = ""

    constructor(medium?: MediumFormValues) {
      if (medium) {
        this.md_ID = medium.md_ID
        this.md_Medium = medium.md_Medium
        this.md_FileType = medium.md_FileType
        this.md_Extension = medium.md_Extension
        this.md_Title = medium.md_Title
        this.md_Title_Ar = medium.md_Title_Ar
        this.md_Desc = medium.md_Desc
        this.md_Desc_Ar = medium.md_Desc_Ar
        this.md_Ordinal = medium.md_Ordinal
        this.md_Active = medium.md_Active
        this.md_CreatedOn = medium.md_CreatedOn
        this.md_Creator = medium.md_Creator
        this.md_ModifyOn = medium.md_ModifyOn
        this.md_Modifier = medium.md_Modifier
      }
    }



  }

  

  export class Medium implements Medium {
    constructor(init?: MediumFormValues) {
      Object.assign(this, init);
    }
  }