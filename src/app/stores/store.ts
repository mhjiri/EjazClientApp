import ThematicAreaStore from "./thematicAreaStore";
import {createContext, useContext} from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import AuthorStore from "./authorStore";
import GenreStore from "./genreStore";
import MediumStore from "./MediumStore"
import PublisherStore from "./publisherStore";
import BookStore from "./bookStore";
import TagStore from "./tagStore ";
import CategoryStore from "./categoryStore";
import BookCollectionStore from "./bookCollectionStore";
import CustomerStore from "./customerStore";
import TrialUserStore from "./trialUserStore";
import AdminUserStore from "./adminUserStore";
import SubscriptionStore from "./subscriptionStore";
import PaymentMethodStore from "./paymentMethodStore";
import PaymentStore from "./paymentStore";
import GroupStore from "./groupStore";
import BannerLocationStore from "./bannerLocationStore";
import AvatarStore from "./avatarStore";
import DashboardStore from "./DashboardStore";
import BannerStore from "./bannerStore";

interface Store {
    thematicAreaStore: ThematicAreaStore;
    tagStore: TagStore;
    publisherStore: PublisherStore;
    authorStore: AuthorStore;
    genreStore: GenreStore;
    mediumStore: MediumStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    bookStore: BookStore;
    categoryStore: CategoryStore;
    bookCollectionStore: BookCollectionStore;
    customerStore: CustomerStore;
    trialUserStore: TrialUserStore;
    adminUserStore: AdminUserStore;
    subscriptionStore: SubscriptionStore;
    paymentMethodStore: PaymentMethodStore;
    paymentStore: PaymentStore;
    groupStore: GroupStore;
    bannerLocationStore: BannerLocationStore;
    bannerStore: BannerStore;
    avatarStore: AvatarStore;
    dashboardStore: DashboardStore;
}

export const store: Store = {
    
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
    thematicAreaStore: new ThematicAreaStore(),
    authorStore: new AuthorStore(),
    publisherStore: new PublisherStore(),
    genreStore: new GenreStore(),
    mediumStore: new MediumStore(),
    bookStore: new BookStore(),
    tagStore: new TagStore(),
    categoryStore: new CategoryStore(),
    bookCollectionStore: new BookCollectionStore(),
    customerStore: new CustomerStore(),
    trialUserStore: new TrialUserStore(),
    adminUserStore: new AdminUserStore(),
    subscriptionStore: new SubscriptionStore(),
    paymentMethodStore: new PaymentMethodStore(),
    paymentStore: new PaymentStore(),
    groupStore: new GroupStore(),
    bannerLocationStore: new BannerLocationStore(),
    bannerStore: new BannerStore(),
    avatarStore: new AvatarStore(),
    dashboardStore: new DashboardStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}