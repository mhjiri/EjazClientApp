export interface Item {
    it_ID: string
    it_Ordinal: number
  }

  export class ItemFormValues
  {
    it_ID: string | undefined = undefined;
    it_Ordinal: number = 0;

	  

    constructor(it_ID:string, it_Ordinal:number) {
            this.it_ID = it_ID;
            this.it_Ordinal = it_Ordinal;
    }

  }

  

  export class Item implements Item {
    constructor(init?: ItemFormValues) {
      Object.assign(this, init);
    }
  }