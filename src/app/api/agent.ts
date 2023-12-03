import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from 'react-toastify';
import { ThematicArea, ThematicAreaFormValues } from "../models/thematicArea"
import { PaginatedResult } from '../models/pagination';
import { store } from '../stores/store';
import { Author, AuthorFormValues } from "../models/author";
import { Genre, GenreFormValues } from "../models/genre";
import { Medium, MediumFormValues } from "../models/medium";
import { Publisher, PublisherFormValues } from "../models/publisher";
import { Book, BookFormValues } from "../models/book";
import { Tag, TagFormValues } from "../models/tag";
import { Category, CategoryFormValues } from "../models/category";
import { BookCollection, BookCollectionFormValues } from "../models/bookCollection";
import { Customer, CustomerFormValues } from "../models/customer";
import { TrialUser, TrialUserFormValues } from "../models/trialUser";
import { AdminUser, AdminUserFormValues } from "../models/adminUser";
import { Subscription, SubscriptionFormValues } from "../models/subscription";
import { PaymentMethod, PaymentMethodFormValues } from "../models/paymentMethod";
import { Payment, PaymentFormValues } from "../models/payment";
import { Group, GroupFormValues } from "../models/group";
import { BannerLocation, BannerLocationFormValues } from "../models/bannerLocation";
import { Avatar, AvatarFormValues } from "../models/avatar";
import { Chart } from "../models/chart";
import { Banner, BannerFormValues } from "../models/banner";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

//axios.defaults.baseURL = "http://localhost:5000/ejaz/v1/";
// axios.defaults.baseURL = "https://ejaz.azurewebsites.net/ejaz/v1/";
 axios.defaults.baseURL = "https://ejazapi.azurewebsites.net/ejaz/v1/";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    //if (process.env.NODE_ENV === 'development') await sleep(1000);
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>
    }
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                //router.navigate('/not-found');
                toast.error('unauthorised')
            }
            if (data.errors) {
                const modalStateErrors :any[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorised')
            break;
        case 403:
            toast.error('forbidden')
            break;
        case 404:
            toast.error('unauthorised')
            //router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            //router.navigate('/server-error');
            toast.error('unauthorised')
            break;
    }
    return Promise.reject(error);
})

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const ThematicAreas = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<ThematicArea[]>>('/ThematicArea/getThematicAreas', { params })
        .then(responseBody),
    get: (id: string) => requests.get<ThematicArea>(`/ThematicArea/getThematicArea/${id}`),
    create: (thematicArea: ThematicAreaFormValues) => requests.post<ThematicAreaFormValues>(`/ThematicArea/createThematicArea`, thematicArea),
    update: (thematicArea: ThematicAreaFormValues) => requests.put<ThematicAreaFormValues>(`/ThematicArea/updateThematicArea/${thematicArea.th_ID}`, thematicArea),
    activate: (id: string) => requests.put(`/ThematicArea/activateThematicArea/${id}`,''),
    deactivate: (id: string) => requests.put(`/ThematicArea/deactivateThematicArea/${id}`,''),
    
}

const Tags = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Tag[]>>('/Tag/getTags', { params })
        .then(responseBody),
    get: (id: string) => requests.get<Tag>(`/Tag/getTag/${id}`),
    create: (tag: TagFormValues) => requests.post<TagFormValues>(`/Tag/createTag`, tag),
    update: (tag: TagFormValues) => requests.put<TagFormValues>(`/Tag/updateTag/${tag.tg_ID}`, tag),
    activate: (id: string) => requests.put(`/Tag/activateTag/${id}`,''),
    deactivate: (id: string) => requests.put(`/Tag/deactivateTag/${id}`,''),
    
}

const BannerLocations = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<BannerLocation[]>>('/BannerLocation/getBannerLocations', { params })
        .then(responseBody),
    get: (id: string) => requests.get<BannerLocation>(`/BannerLocation/getBannerLocation/${id}`),
    create: (bannerLocation: BannerLocationFormValues) => requests.post<BannerLocationFormValues>(`/BannerLocation/createBannerLocation`, bannerLocation),
    update: (bannerLocation: BannerLocationFormValues) => requests.put<BannerLocationFormValues>(`/BannerLocation/updateBannerLocation/${bannerLocation.bl_ID}`, bannerLocation),
    activate: (id: string) => requests.put(`/BannerLocation/activateBannerLocation/${id}`,''),
    deactivate: (id: string) => requests.put(`/BannerLocation/deactivateBannerLocation/${id}`,''),
    
}

const Banners = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Banner[]>>('/Banner/getBanners', { params })
        .then(responseBody),
    get: (id: string) => requests.get<Banner>(`/Banner/getBanner/${id}`),
    getCmd: (id: string) => requests.get<Banner>(`/Banner/getCmdBanner/${id}`),
    create: (banner: BannerFormValues) => requests.post<BannerFormValues>(`/Banner/createBanner`, banner),
    update: (banner: BannerFormValues) => requests.put<BannerFormValues>(`/Banner/updateBanner/${banner.bn_ID}`, banner),
    activate: (id: string) => requests.put(`/Banner/activateBanner/${id}`,''),
    deactivate: (id: string) => requests.put(`/Banner/deactivateBanner/${id}`,''),
    createMedium: (file: any) => {
        let formData = new FormData();
        formData.append('Md_Medium', file);
        formData.append('Md_Title', "Title");
        formData.append('Md_Title_Ar', "Title Ar");
        return axios.post<MediumFormValues>('Medium/createMedium/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    
}

const Genres = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Genre[]>>('/Genre/getGenres', { params })
        .then(responseBody),
    get: (id: string) => requests.get<Genre>(`/Genre/getGenre/${id}`),
    create: (genre: GenreFormValues) => requests.post<GenreFormValues>(`/Genre/createGenre`, genre),
    update: (genre: GenreFormValues) => requests.put<GenreFormValues>(`/Genre/updateGenre/${genre.gn_ID}`, genre),
    activate: (id: string) => requests.put(`/Genre/activateGenre/${id}`,''),
    deactivate: (id: string) => requests.put(`/Genre/deactivateGenre/${id}`,''),
    
}

const Books = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Book[]>>('/Book/getBookList', { params })
        .then(responseBody),
    get: (id: string) => requests.get<Book>(`/Book/getBook/${id}`),
    getCmd: (id: string) => requests.get<Book>(`/Book/getCmdBook/${id}`),
    create: (book: BookFormValues) => requests.post<BookFormValues>(`/Book/createBook`, book),
    update: (book: BookFormValues) => requests.put<BookFormValues>(`/Book/updateBook/${book.bk_ID}`, book),
    activate: (id: string) => requests.put(`/Book/activateBook/${id}`,''),
    deactivate: (id: string) => requests.put(`/Book/deactivateBook/${id}`,''),
    createMedium: (file: any) => {
        let formData = new FormData();
        formData.append('Md_Medium', file);
        formData.append('Md_Title', "Title");
        formData.append('Md_Title_Ar', "Title Ar");
        return axios.post<MediumFormValues>('Medium/createMedium/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    
}

const Categories = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Category[]>>('/Category/getCategories', { params })
        .then(responseBody),
    get: (id: string) => requests.get<Category>(`/Category/getCategory/${id}`),
    getCmd: (id: string) => requests.get<Category>(`/Category/getCmdCategory/${id}`),
    create: (category: CategoryFormValues) => requests.post<CategoryFormValues>(`/Category/createCategory`, category),
    update: (category: CategoryFormValues) => requests.put<CategoryFormValues>(`/Category/updateCategory/${category.ct_ID}`, category),
    activate: (id: string) => requests.put(`/Category/activateCategory/${id}`,''),
    deactivate: (id: string) => requests.put(`/Categeory/deactivateCategory/${id}`,''),
    createMedium: (file: any) => {
        let formData = new FormData();
        formData.append('Md_Medium', file);
        formData.append('Md_Title', "Title");
        formData.append('Md_Title_Ar', "Title Ar");
        return axios.post<MediumFormValues>('Medium/createMedium/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    
}

const Authors = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Author[]>>('/Author/getAuthors', { params })
        .then(responseBody),
    get: (id: string) => requests.get<Author>(`/Author/getAuthor/${id}`),
    getCmd: (id: string) => requests.get<Author>(`/Author/getCmdAuthor/${id}`),
    create: (author: AuthorFormValues) => requests.post<AuthorFormValues>(`/Author/createAuthor`, author),
    update: (author: AuthorFormValues) => requests.put<AuthorFormValues>(`/Author/updateAuthor/${author.at_ID}`, author),
    activate: (id: string) => requests.put(`/Author/activateAuthor/${id}`,''),
    deactivate: (id: string) => requests.put(`/Author/deactivateAuthor/${id}`,''),
    createMedium: (file: any) => {
        let formData = new FormData();
        formData.append('Md_Medium', file);
        formData.append('Md_Title', "Title");
        formData.append('Md_Title_Ar', "Title Ar");
        return axios.post<MediumFormValues>('Medium/createMedium/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    
}

const BookCollections = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<BookCollection[]>>('/BookCollection/getBookCollections', { params })
        .then(responseBody),
    get: (id: string) => requests.get<BookCollection>(`/BookCollection/getBookCollection/${id}`),
    getCmd: (id: string) => requests.get<BookCollection>(`/BookCollection/getCmdBookCollection/${id}`),
    create: (bookCollection: BookCollectionFormValues) => requests.post<BookCollectionFormValues>(`/BookCollection/createBookCollection`, bookCollection),
    update: (bookCollection: BookCollectionFormValues) => requests.put<BookCollectionFormValues>(`/BookCollection/updateBookCollection/${bookCollection.bc_ID}`, bookCollection),
    activate: (id: string) => requests.put(`/BookCollection/activateBookCollection/${id}`,''),
    deactivate: (id: string) => requests.put(`/BookCollection/deactivateBookCollection/${id}`,''),
    createMedium: (file: any) => {
        let formData = new FormData();
        formData.append('Md_Medium', file);
        formData.append('Md_Title', "Title");
        formData.append('Md_Title_Ar', "Title Ar");
        return axios.post<MediumFormValues>('Medium/createMedium/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    
}


const Publishers = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Publisher[]>>('/Publisher/getPublishers', { params })
        .then(responseBody),
    get: (id: string) => requests.get<Publisher>(`/Publisher/getPublisher/${id}`),
    getCmd: (id: string) => requests.get<Publisher>(`/Publisher/getCmdPublisher/${id}`),
    create: (publisher: PublisherFormValues) => requests.post<PublisherFormValues>(`/Publisher/createPublisher`, publisher),
    update: (publisher: PublisherFormValues) => requests.put<PublisherFormValues>(`/Publisher/updatePublisher/${publisher.pb_ID}`, publisher),
    activate: (id: string) => requests.put(`/Publisher/activatePublisher/${id}`,''),
    deactivate: (id: string) => requests.put(`/Publisher/deactivatePublisher/${id}`,''),
    createMedium: (file: any) => {
        let formData = new FormData();
        formData.append('Md_Medium', file);
        formData.append('Md_Title', "Title");
        formData.append('Md_Title_Ar', "Title Ar");
        return axios.post<MediumFormValues>('Medium/createMedium/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    
}

const Avatars = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Avatar[]>>('/Avatar/getAvatars', { params })
        .then(responseBody),
    get: (id: string) => requests.get<Avatar>(`/Avatar/getAvatar/${id}`),
    create: (avatar: AvatarFormValues) => requests.post<AvatarFormValues>(`/Avatar/createAvatar`, avatar),
    update: (avatar: AvatarFormValues) => requests.put<AvatarFormValues>(`/Avatar/updateAvatar/${avatar.av_ID}`, avatar),
    activate: (id: string) => requests.put(`/Avatar/activateAvatar/${id}`,''),
    deactivate: (id: string) => requests.put(`/Avatar/deactivateAvatar/${id}`,''),
    createMedium: (file: any) => {
        let formData = new FormData();
        formData.append('Md_Medium', file);
        formData.append('Md_Title', "Title");
        formData.append('Md_Title_Ar', "Title Ar");
        return axios.post<MediumFormValues>('Medium/createMedium/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    
}

const Groups = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Group[]>>('/Group/getGroups', { params })
        .then(responseBody),
    get: (id: string) => requests.get<Group>(`/Group/getGroup/${id}`),
    create: (group: GroupFormValues) => requests.post<GroupFormValues>(`/Group/createGroup`, group),
    update: (group: GroupFormValues) => requests.put<GroupFormValues>(`/Group/updateGroup/${group.gr_ID}`, group),
    activate: (id: string) => requests.put(`/Group/activateGroup/${id}`,''),
    deactivate: (id: string) => requests.put(`/Group/deactivateGroup/${id}`,'')
    
}

const Subscriptions = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Subscription[]>>('/Subscription/getSubscriptions', { params })
        .then(responseBody),
    get: (id: string) => requests.get<Subscription>(`/Subscription/getSubscription/${id}`),
    create: (subscription: SubscriptionFormValues) => requests.post<SubscriptionFormValues>(`/Subscription/createSubscription`, subscription),
    update: (subscription: SubscriptionFormValues) => requests.put<SubscriptionFormValues>(`/Subscription/updateSubscription/${subscription.sb_ID}`, subscription),
    activate: (id: string) => requests.put(`/Subscription/activateSubscription/${id}`,''),
    deactivate: (id: string) => requests.put(`/Subscription/deactivateSubscription/${id}`,''),
    createMedium: (file: any) => {
        let formData = new FormData();
        formData.append('Md_Medium', file);
        formData.append('Md_Title', "Title");
        formData.append('Md_Title_Ar', "Title Ar");
        return axios.post<MediumFormValues>('Medium/createMedium/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    
}

const Customers = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Customer[]>>('/Profile/getCustomers', { params })
        .then(responseBody),
    get: (id: string) => requests.get<Customer>(`/Profile/getCustomer/${id}`),
    create: (customer: CustomerFormValues) => requests.post<CustomerFormValues>(`/Profile/createProfile`, customer),
    update: (customer: CustomerFormValues) => requests.put<CustomerFormValues>(`/Profile/updateCustomer/${customer.username}`, customer),
    activate: (id: string) => requests.put(`/Profile/activateProfile/${id}`,''),
    deactivate: (id: string) => requests.put(`/Profile/deactivateProfile/${id}`,''),
    delete: (id: string) => requests.put(`/Profile/deleteProfile/${id}`,''),
    createMedium: (file: any) => {
        let formData = new FormData();
        formData.append('Md_Medium', file);
        formData.append('Md_Title', "Title");
        formData.append('Md_Title_Ar', "Title Ar");
        return axios.post<MediumFormValues>('Medium/createMedium/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    
}

const TrialUsers = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<TrialUser[]>>('/Profile/getTrialUsers', { params })
        .then(responseBody),
    get: (id: string) => requests.get<TrialUser>(`/Profile/getTrialUser/${id}`),
    create: (trialUser: TrialUserFormValues) => requests.post<TrialUserFormValues>(`/Profile/registerTrialUser`, trialUser),
    update: (trialUser: TrialUserFormValues) => requests.put<TrialUserFormValues>(`/Profile/updateTrialUser/${trialUser.username}`, trialUser),
    activate: (id: string) => requests.put(`/Profile/activateProfile/${id}`,''),
    deactivate: (id: string) => requests.put(`/Profile/deactivateProfile/${id}`,''),
    delete: (id: string) => requests.put(`/Profile/deleteProfile/${id}`,''),
    createMedium: (file: any) => {
        let formData = new FormData();
        formData.append('Md_Medium', file);
        formData.append('Md_Title', "Title");
        formData.append('Md_Title_Ar', "Title Ar");
        return axios.post<MediumFormValues>('Medium/createMedium/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    
}

const AdminUsers = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<AdminUser[]>>('/Profile/getAdminUsers', { params })
        .then(responseBody),
    get: (id: string) => requests.get<AdminUser>(`/Profile/getAdminUser/${id}`),
    getProfile: () => requests.get<AdminUser>(`/Profile/getProfile`),
    create: (adminUser: AdminUserFormValues) => requests.post<AdminUserFormValues>(`/Profile/registerAdminUser`, adminUser),
    update: (adminUser: AdminUserFormValues) => requests.put<AdminUserFormValues>(`/Profile/updateAdminUser/${adminUser.username}`, adminUser),
    updateProfile: (adminUser: AdminUserFormValues) => requests.put<AdminUserFormValues>(`/Profile/update`, adminUser),
    activate: (id: string) => requests.put(`/Profile/activateProfile/${id}`,''),
    deactivate: (id: string) => requests.put(`/Profile/deactivateProfile/${id}`,''),
    delete: (id: string) => requests.put(`/Profile/deleteProfile/${id}`,''),
    createMedium: (file: any) => {
        let formData = new FormData();
        formData.append('Md_Medium', file);
        formData.append('Md_Title', "Title");
        formData.append('Md_Title_Ar', "Title Ar");
        return axios.post<MediumFormValues>('Medium/createMedium/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    
}

const PaymentMethods = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<PaymentMethod[]>>('/PaymentMethod/getPaymentMethods', { params })
        .then(responseBody),
    get: (id: string) => requests.get<PaymentMethod>(`/PaymentMethod/getPaymentMethod/${id}`),
    create: (paymentMethod: PaymentMethodFormValues) => requests.post<PaymentMethodFormValues>(`/PaymentMethod/createPaymentMethod`, paymentMethod),
    update: (paymentMethod: PaymentMethodFormValues) => requests.put<PaymentMethodFormValues>(`/PaymentMethod/updatePaymentMethod/${paymentMethod.py_ID}`, paymentMethod),
    activate: (id: string) => requests.put(`/PaymentMethod/activatePaymentMethod/${id}`,''),
    deactivate: (id: string) => requests.put(`/PaymentMethod/deactivatePaymentMethod/${id}`,''),
    
}

const Payments = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Payment[]>>('/Payment/getPayments', { params })
        .then(responseBody),
        get: (id: string) => requests.get<Payment>(`/Payment/getPayment/${id}`),
        create: (payment: PaymentFormValues) => requests.post<PaymentFormValues>(`/Payment/doPayment`, payment),
}



const Media = {
    
    get: (id: string) => requests.get<Medium>(`/Medium/getMedium/${id}`),
    create: (file: any) => {
        let formData = new FormData();
        formData.append('Md_Medium', file);
        formData.append('Md_Title', "Title");
        formData.append('Md_Title_Ar', "Title Ar");
        return axios.post<MediumFormValues>('Medium/createMedium/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    
}

const Dashboards = {
    getUserData: () => requests.get<Chart>(`/Dashboard/getUserData/`),
    getBookData: () => requests.get<Chart>(`/Dashboard/getBookData/`),
    getAuthorData: () => requests.get<Chart>(`/Dashboard/getAuthorData/`),
    GetActiveMembersData: () => requests.get<Chart>(`/Dashboard/GetActiveMembersData/`),
    GetNewMembersData: () => requests.get<Chart>(`/Dashboard/GetNewMembersData/`),
    GetExpiredMembersData: () => requests.get<Chart>(`/Dashboard/GetExpiredMembersData/`)
    
}

const agent = {
    Books,
    ThematicAreas,
    Authors,
    Genres,
    Publishers,
    Media,
    Tags,
    Categories,
    BookCollections,
    Customers,
    TrialUsers,
    AdminUsers,
    Subscriptions,
    PaymentMethods,
    Payments, 
    Groups,
    BannerLocations,
    Banners,
    Avatars,
    Dashboards
}

export default agent;