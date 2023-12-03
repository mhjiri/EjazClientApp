
export interface AdminUser {
    id: string 
    md_ID: string 
    username: string
    email: string
    password: string
    confirmPassword: string
    phoneNumber: string
    us_DisplayName: string
    us_DOB: string
    us_Gender: string
    us_language: string
    us_Country: string
    us_SubscriptionExpiryDate : string | null
    us_Customer: boolean
    us_Admin: boolean
    us_SuperAdmin: boolean
    us_Active: boolean
    us_CreatedOn:  string
    us_Creator: string
    us_ModifyOn: string | null
    us_Modifier: string
  }

  export class AdminUserFormValues
  {
    
    id: string  | undefined = undefined;
    md_ID: string = "00000000-0000-0000-0000-000000000000";
    username: string = "";
    email: string = "";
    password: string = "";
    confirmPassword: string = "";
    phoneNumber: string = "";
    us_DisplayName: string = "";
    us_DOB: string = "";
    us_Gender: string = "";
    us_language: string = "";
    us_Country: string = "";
    us_SubscriptionExpiryDate : string | null = "";
    us_Customer: boolean = true
    us_Admin: boolean = false
    us_SuperAdmin: boolean = false
    us_Active: boolean = true
    us_CreatedOn: string | null = "";
    us_Creator: string = "";
    us_ModifyOn: string | null = "";
    us_Modifier: string = "";

	  constructor(adminUser?: AdminUserFormValues) {
      if (adminUser) {
        this.id = adminUser.id;
        this.md_ID = adminUser.md_ID;
        this.username = adminUser.username;
        this.email = adminUser.email;
        this.password = "";
        this.confirmPassword= "";
        this.phoneNumber = adminUser.phoneNumber;
        this.us_DisplayName = adminUser.us_DisplayName;
        this.us_DOB = (adminUser.us_DOB != undefined || adminUser.us_DOB != null) ? adminUser.us_DOB.split('T')[0] : "";
        this.us_Gender = adminUser.us_Gender;
        this.us_language = adminUser.us_language;
        this.us_Country = adminUser.us_Country;
        this.us_SubscriptionExpiryDate = adminUser.us_SubscriptionExpiryDate;
        this.us_Customer = adminUser.us_Customer;
        this.us_Admin = adminUser.us_Admin;
        this.us_SuperAdmin = adminUser.us_SuperAdmin;
        this.us_Active = adminUser.us_Active;
        this.us_CreatedOn = adminUser.us_CreatedOn; //(adminUser.us_CreatedOn != undefined || adminUser.us_CreatedOn != null) ? (new Date(adminUser.us_CreatedOn)).toLocaleString() : "";
        this.us_Creator = adminUser.us_Creator;
        this.us_ModifyOn = adminUser.us_ModifyOn; //(adminUser.us_ModifyOn != undefined || adminUser.us_ModifyOn != null) ? (new Date(adminUser.us_ModifyOn)).toLocaleString() : "";
        this.us_Modifier = adminUser.us_Modifier;
      }
    }

  }

  

  export class AdminUser implements AdminUser {
    constructor(init?: AdminUserFormValues) {
      Object.assign(this, init);
    }
  }