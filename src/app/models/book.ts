import { AuthorFormValues } from "./author"
import { CategoryFormValues } from "./category"
import { GenreFormValues } from "./genre"
import { ItemFormValues } from "./item"
import { MediumFormValues } from "./medium"
import { PublisherFormValues } from "./publisher"
import { TagFormValues } from "./tag"
import { ThematicAreaFormValues } from "./thematicArea"

export interface Book {
    bk_ID: string 
    bk_Code: string
    md_ID: string 
    md_AudioEn_ID: string
    md_AudioAr_ID: string
    bk_Name: string
    bk_Name_Ar: string
    bk_Title: string
    bk_Title_Ar: string
    bk_Introduction: string
    bk_Introduction_Ar: string
    bk_Summary: string
    bk_Summary_Ar: string
    bk_Characters: string
    bk_Characters_Ar: string
    bk_Desc: string | null
    bk_Desc_Ar: string | null
    bk_Language: string
    bk_Active: boolean
    bk_Trial: boolean
    bk_CreatedOn: string
    bk_Creator: string
    bk_ModifyOn: string
    bk_Modifier: string
    categories : CategoryFormValues[]
    categoryItems : ItemFormValues[]
    genres : GenreFormValues[]
    genreItems : ItemFormValues[]
    publishers : PublisherFormValues[]
    publisherItems : ItemFormValues[]
    authors : AuthorFormValues[]
    authorItems : ItemFormValues[]
    thematicAreas : ThematicAreaFormValues[]
    thematicAreaItems : ItemFormValues[]
    tags : TagFormValues[]
    tagItems : ItemFormValues[]
    media : MediumFormValues[]
    mediumItems : ItemFormValues[]
  }

  export class BookFormValues
  {
    bk_ID: string | undefined = undefined;
    bk_Code : string = '';
    md_ID: string = "00000000-0000-0000-0000-000000000000";
    md_AudioEn_ID: string = "00000000-0000-0000-0000-000000000000";
    md_AudioAr_ID: string = "00000000-0000-0000-0000-000000000000";
    bk_Name: string = "";
    bk_Name_Ar: string = "";
    bk_Title: string = "";
    bk_Title_Ar: string = "";
    bk_Desc: string | null = "";
    bk_Desc_Ar: string | null = "";
    bk_Language: string = "";
    bk_Introduction: string = "";
    bk_Introduction_Ar: string = "";
    bk_Summary: string = "";
    bk_Summary_Ar: string = "";
    bk_Characters: string = "";
    bk_Characters_Ar: string = "";
    bk_Trial: boolean = false;
    bk_Active: boolean = true;
    bk_CreatedOn: string = "";
    bk_Creator: string = "";
    bk_ModifyOn: string = "";
    bk_Modifier: string = "";
    categories : CategoryFormValues[] = []
    categoryItems : ItemFormValues[] = []
    genres : GenreFormValues[] = []
    genreItems : ItemFormValues[] = []
    publishers : PublisherFormValues[] = []
    publisherItems : ItemFormValues[] = []
    authors : AuthorFormValues[] = []
    authorItems : ItemFormValues[] = []
    thematicAreas : ThematicAreaFormValues[] = []
    thematicAreaItems : ItemFormValues[] = []
    tags : TagFormValues[] = []
    tagItems : ItemFormValues[] = []
    media : MediumFormValues[] = []
    mediumItems : ItemFormValues[] = []

	  constructor(book?: BookFormValues) {
      if (book) {
        this.bk_ID = book.bk_ID;
        this.md_ID = book.md_ID;
        this.md_AudioEn_ID = book.md_AudioEn_ID;
        this.md_AudioAr_ID = book.md_AudioAr_ID;
        this.bk_Code = book.bk_Code;
        this.bk_Name = book.bk_Name;
        this.bk_Name_Ar = book.bk_Name_Ar;
        this.bk_Title = book.bk_Title;
        this.bk_Title_Ar = book.bk_Title_Ar;
        this.bk_Desc = book.bk_Desc;
        this.bk_Desc_Ar = book.bk_Desc_Ar;
        this.bk_Language = book.bk_Language;
        this.bk_Introduction = book.bk_Introduction;
        this.bk_Introduction_Ar = book.bk_Introduction_Ar;
        this.bk_Summary = book.bk_Summary;
        this.bk_Summary_Ar = book.bk_Summary_Ar;
        this.bk_Characters = book.bk_Characters;
        this.bk_Characters_Ar = book.bk_Characters_Ar;
        this.bk_Trial = book.bk_Trial;
        this.bk_Active = book.bk_Active;
        this.bk_CreatedOn = book.bk_CreatedOn;//(book.bk_CreatedOn != undefined || book.bk_CreatedOn != null) ? (new Date(book.bk_CreatedOn)).toLocaleString() : "";
        this.bk_Creator = book.bk_Creator;
        this.bk_ModifyOn = book.bk_ModifyOn;//(book.bk_ModifyOn != undefined || book.bk_ModifyOn != null) ? (new Date(book.bk_ModifyOn)).toLocaleString() : "";
        this.bk_Modifier = book.bk_Modifier;
        this.categories = book.categories;
        this.categoryItems  = book.categoryItems;
        this.genres = book.genres;
        this.genreItems  = book.genreItems;
        this.publishers = book.publishers;
        this.publisherItems  = book.publisherItems;
        this.authors = book.authors;
        this.authorItems  = book.authorItems;
        this.thematicAreas = book.thematicAreas;
        this.thematicAreaItems  = book.thematicAreaItems;
        this.tags = book.tags;
        this.tagItems  = book.tagItems;
        this.media = book.media;
        this.mediumItems  = book.mediumItems;
      }
    }

  }

  

  export class Book implements Book {
    constructor(init?: BookFormValues) {
      Object.assign(this, init);
    }
  }