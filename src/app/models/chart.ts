export interface Chart {
    value1: string 
    value2: string 
    value3: string
    value4: string
    maxValue: number
    minValue: number
    data: number[]
    categories: string[]
  }

  export class ChartFormValues
  {
    value1: string = "";
    value2: string = "";
    value3: string = "";
    value4: string = "";
    maxValue: number = 0;
    minValue: number = 0;
    data: number[] = []
    categories: string[] = []

	  constructor(chart?: ChartFormValues) {
      if (chart) {
        this.value1 = chart.value1;
        this.value2 = chart.value2;
        this.value3 = chart.value3;
        this.value4 = chart.value4;
        this.maxValue = chart.maxValue;
        this.minValue = chart.minValue;
        this.data = chart.data;
        this.categories = chart.categories;
      }
    }

  }

  

  export class Chart implements Chart {
    constructor(init?: ChartFormValues) {
      Object.assign(this, init);
    }
  }