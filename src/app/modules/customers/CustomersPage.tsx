import React from 'react'
import { observer } from 'mobx-react-lite';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_ejaz/layout/core'
// import AddCustomer from './components/AddCustomers/AddCustomer'
import {CustomersHeader} from './CustomersHeader'
import EditCustomer from './components/EditCustomers/EditCustomer'
import ViewCustomer from './components/ViewCustomers/ViewCustomer'
import ListCustomers from './components/ListCustomers/ListCustomers';

const customerBreadCrumbs: Array<PageLink> = [
  {
    title: 'Customers',
    path: '/customers',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

export default observer(function CustomerPage() {
  return (
    <Routes>
      <Route
        element={
          <>
            <CustomersHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={customerBreadCrumbs}>List Customers</PageTitle>
              <ListCustomers />
            </>
          }
        />
        <Route
          path='add'
          element={
            <>
              <PageTitle breadcrumbs={customerBreadCrumbs}>Add Customer</PageTitle>
              <ViewCustomer />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={customerBreadCrumbs}>Edit Customer</PageTitle>
              <EditCustomer />
            </>
          }
        />
        <Route
          path='view/:id'
          element={
            <>
              <PageTitle breadcrumbs={customerBreadCrumbs}>View Customer</PageTitle>
              <ViewCustomer />
            </>
          }
        />
        <Route index element={<Navigate to='/customers/list' />} />
      </Route>
      
    </Routes>
  )
})
