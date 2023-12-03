import { CategoryFormValues } from "./category"
import { GenreFormValues } from "./genre"
import { ItemFormValues } from "./item"
import { TagFormValues } from "./tag"
import { ThematicAreaFormValues } from "./thematicArea"

export interface Group {
    gr_ID: string 
    gr_Title: string
    gr_Title_Ar: string
    gr_Desc: string | null
    gr_Desc_Ar: string | null
    gr_AgeFrom: number
    gr_AgeTill: number
    gr_Language: string
    gr_Gender: string
    gr_Active: boolean
    gr_CreatedOn: string
    gr_Creator: string
    gr_ModifyOn: string
    gr_Modifier: string

    categories : CategoryFormValues[]
    categoryItems : ItemFormValues[]
    thematicAreas : ThematicAreaFormValues[]
    thematicAreaItems : ItemFormValues[]
    genres : GenreFormValues[]
    genreItems : ItemFormValues[]
    tags : TagFormValues[]
    tagItems : ItemFormValues[]
  }

  export class GroupFormValues
  {
    gr_ID: string | undefined = undefined;
    gr_Title: string = "";
    gr_Title_Ar: string = "";
    gr_Desc: string | null = "";
    gr_Desc_Ar: string | null = "";
    gr_AgeFrom: number = 0;
    gr_AgeTill: number = 0;
    gr_Language: string = "";
    gr_Gender: string = "";
    gr_Active: boolean = true;
    gr_CreatedOn: string = "";
    gr_Creator: string = "";
    gr_ModifyOn: string = "";
    gr_Modifier: string = "";
    categories: CategoryFormValues[] = []
    categoryItems : ItemFormValues[] = []
    thematicAreas: ThematicAreaFormValues[] = []
    thematicAreaItems : ItemFormValues[] = []
    genres: GenreFormValues[] = []
    genreItems : ItemFormValues[] = []
    tags: TagFormValues[] = []
    tagItems : ItemFormValues[] = []

	  constructor(group?: GroupFormValues) {
      if (group) {
        this.gr_ID = group.gr_ID;
        this.gr_Title = group.gr_Title;
        this.gr_Title_Ar = group.gr_Title_Ar;
        this.gr_Desc = group.gr_Desc;
        this.gr_Desc_Ar = group.gr_Desc_Ar;
        this.gr_AgeFrom = group.gr_AgeFrom;
        this.gr_AgeTill = group.gr_AgeTill;
        this.gr_Language = group.gr_Language;
        this.gr_Gender = group.gr_Gender;
        this.gr_Active = group.gr_Active;
        this.gr_CreatedOn = group.gr_CreatedOn;//(group.gr_CreatedOn != undefined || group.gr_CreatedOn != null) ? (new Date(group.gr_CreatedOn)).toLocaleString() : "";
        this.gr_Creator = group.gr_Creator;
        this.gr_ModifyOn = group.gr_ModifyOn ;//(group.gr_ModifyOn != undefined || group.gr_ModifyOn != null) ? (new Date(group.gr_ModifyOn)).toLocaleString() : "";
        
        this.gr_Modifier = group.gr_Modifier;
        this.categories = group.categories;
        this.categoryItems  = group.categoryItems;
        this.thematicAreas = group.thematicAreas;
        this.thematicAreaItems  = group.thematicAreaItems;
        this.genres = group.genres;
        this.genreItems  = group.genreItems;
        this.tags = group.tags;
        this.tagItems  = group.tagItems;
      }
    }

  }

  export class Group implements Group {
    constructor(init?: GroupFormValues) {
      Object.assign(this, init);
    }
  }