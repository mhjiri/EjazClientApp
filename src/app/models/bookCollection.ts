import { BookFormValues } from "./book"
import { ItemFormValues } from "./item"

export interface BookCollection {
    bc_ID: string 
    md_ID: string 
    bc_Title: string
    bc_Title_Ar: string
    bc_Desc: string | null
    bc_Desc_Ar: string | null
    bc_Summaries: number
    bc_Active: boolean
    bc_CreatedOn: string
    bc_Creator: string
    bc_ModifyOn: string
    bc_Modifier: string
    books : BookFormValues[]
    bookItems : ItemFormValues[]
  }

  export class BookCollectionFormValues
  {
    bc_ID: string | undefined = undefined;
    md_ID: string = "00000000-0000-0000-0000-000000000000";
    bc_Title: string = "";
    bc_Title_Ar: string = "";
    bc_Desc: string | null = "";
    bc_Desc_Ar: string | null = "";
    bc_Summaries: number = 0;
    bc_Active: boolean = true;
    bc_CreatedOn: string = "";
    bc_Creator: string = "";
    bc_ModifyOn: string = "";
    bc_Modifier: string = "";
    books: BookFormValues[] = []
    bookItems : ItemFormValues[] = []

	  constructor(bookCollection?: BookCollectionFormValues) {
      if (bookCollection) {
        this.bc_ID = bookCollection.bc_ID;
        this.md_ID = bookCollection.md_ID
        this.bc_Title = bookCollection.bc_Title;
        this.bc_Title_Ar = bookCollection.bc_Title_Ar;
        this.bc_Desc = bookCollection.bc_Desc;
        this.bc_Desc_Ar = bookCollection.bc_Desc_Ar;
        this.bc_Summaries = bookCollection.bc_Summaries;
        this.bc_Active = bookCollection.bc_Active;
        this.bc_CreatedOn = bookCollection.bc_CreatedOn;//(bookCollection.bc_CreatedOn != undefined || bookCollection.bc_CreatedOn != null) ? (new Date(bookCollection.bc_CreatedOn)).toLocaleString() : "";
        this.bc_Creator = bookCollection.bc_Creator;
        this.bc_ModifyOn = bookCollection.bc_ModifyOn;//(bookCollection.bc_ModifyOn != undefined || bookCollection.bc_ModifyOn != null) ? (new Date(bookCollection.bc_ModifyOn)).toLocaleString() : "";
        this.bc_Modifier = bookCollection.bc_Modifier;
        this.books = bookCollection.books;
        this.bookItems  = bookCollection.bookItems;
      }
    }

  }

  

  export class BookCollection implements BookCollection {
    constructor(init?: BookCollectionFormValues) {
      Object.assign(this, init);
    }
  }