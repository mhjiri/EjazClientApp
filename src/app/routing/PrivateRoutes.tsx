import {FC, lazy, Suspense} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {MasterLayout} from '../../_ejaz/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {getCSSVariableValue} from '../../_ejaz/assets/ts/_utils'
import {WithChildren} from '../../_ejaz/helpers'
import CustomersPage from '../modules/customers/CustomersPage'
import ThematicAreasPage from '../modules/thematicAreas/ThematicAreasPage'
import AuthorsPage from '../modules/authors/AuthorsPage'
import PublishersPage from '../modules/publishers/PublishersPage'
import BooksPage from '../modules/books/BooksPage'
import TagsPage from '../modules/tags/TagsPage'
import GenresPage from '../modules/genres/GenresPage'
import CategoriesPage from '../modules/categories/CategoriesPage'
import BookCollectionsPage from '../modules/bookCollections/BookCollectionsPage'
import TrialUsersPage from '../modules/trialUsers/TrialUsersPage'
import AdminUsersPage from '../modules/adminUsers/AdminUsersPage'
import SubscriptionsPage from '../modules/subscriptions/SubscriptionsPage'
import PaymentMethodsPage from '../modules/paymentMethods/PaymentMethodsPage'
import PaymentsPage from '../modules/payments/PaymentsPage'
import BannerLocationsPage from '../modules/bannerLocation/BannerLocationsPage'
import GroupsPage from '../modules/groups/GroupsPage'
import BannersPage from '../modules/banners/BannersPage'

const PrivateRoutes = () => {

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        {/* Lazy Modules */}
        {/* <Route
          path='orders/*'
          element={
            <SuspensedView>
              <OrdersPage />
            </SuspensedView>
          }
        /> */}
        <Route
          path='payments/*'
          element={
            <SuspensedView>
              <PaymentsPage />
            </SuspensedView>
          }
        />
        <Route
          path='paymentMethods/*'
          element={
            <SuspensedView>
              <PaymentMethodsPage />
            </SuspensedView>
          }
        />
        <Route
          path='customers/*'
          element={
            <SuspensedView>
              <CustomersPage />
            </SuspensedView>
          }
        />
        <Route
          path='trialUsers/*'
          element={
            <SuspensedView>
              <TrialUsersPage />
            </SuspensedView>
          }
        />
        <Route
          path='adminUsers/*'
          element={
            <SuspensedView>
              <AdminUsersPage />
            </SuspensedView>
          }
        />
        <Route
          path='books/*'
          element={
            <SuspensedView>
              <BooksPage />
            </SuspensedView>
          }
        />
        <Route
          path='categories/*'
          element={
            <SuspensedView>
              <CategoriesPage />
            </SuspensedView>
          }
        />
        <Route
          path='authors/*'
          element={
            <SuspensedView>
              <AuthorsPage />
            </SuspensedView>
          }
        />
        <Route
          path='publishers/*'
          element={
            <SuspensedView>
              <PublishersPage />
            </SuspensedView>
          }
        /> <Route
        path='subscriptions/*'
        element={
          <SuspensedView>
            <SubscriptionsPage />
          </SuspensedView>
        }
      />
        <Route
          path='thematicAreas/*'
          element={
            <SuspensedView>
              <ThematicAreasPage />
            </SuspensedView>
          }
        />
        <Route
          path='tags/*'
          element={
            <SuspensedView>
              <TagsPage />
            </SuspensedView>
          }
        />
        <Route
          path='genres/*'
          element={
            <SuspensedView>
              <GenresPage />
            </SuspensedView>
          }
        />
        <Route
          path='bookCollections/*'
          element={
            <SuspensedView>
              <BookCollectionsPage />
            </SuspensedView>
          }
        />
        <Route
          path='bannerLocations/*'
          element={
            <SuspensedView>
              <BannerLocationsPage />
            </SuspensedView>
          }
        />
        <Route
          path='banners/*'
          element={
            <SuspensedView>
              <BannersPage />
            </SuspensedView>
          }
        />
        <Route
          path='groups/*'
          element={
            <SuspensedView>
              <GroupsPage />
            </SuspensedView>
          }
        />
        
        
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
