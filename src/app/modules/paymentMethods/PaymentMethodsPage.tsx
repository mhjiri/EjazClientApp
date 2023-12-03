import React from 'react'
import { observer } from 'mobx-react-lite';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_ejaz/layout/core'
import {AddPaymentMethod} from './components/AddPaymentMethods/AddPaymentMethod'
import {PaymentMethodsHeader} from './PaymentMethodsHeader'
import EditPaymentMethod from './components/EditPaymentMethods/EditPaymentMethod'
import ViewPaymentMethod from './components/ViewPaymentMethod/ViewPaymentMethod'
import ListPaymentMethods from './components/ListPaymentMethods/ListPaymentMethods';

const paymentMethodBreadCrumbs: Array<PageLink> = [
  {
    title: 'PaymentMethods',
    path: '/paymentMethods',
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

export default observer(function PaymentMethodsPage() {
  return (
    <Routes>
      <Route
        element={
          <>
            <PaymentMethodsHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={paymentMethodBreadCrumbs}>List PaymentMethods</PageTitle>
              <ListPaymentMethods />
            </>
          }
        />
        <Route
          path='add'
          element={
            <>
              <PageTitle breadcrumbs={paymentMethodBreadCrumbs}>Add PaymentMethod</PageTitle>
              <AddPaymentMethod />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={paymentMethodBreadCrumbs}>Edit PaymentMethod</PageTitle>
              <EditPaymentMethod />
            </>
          }
        />
        <Route
          path='view/:id'
          element={
            <>
              <PageTitle breadcrumbs={paymentMethodBreadCrumbs}>View PaymentMethod</PageTitle>
              <ViewPaymentMethod />
            </>
          }
        />
        <Route index element={<Navigate to='/paymentMethods/list' />} />
      </Route>
      
    </Routes>
  )
})

//export default PaymentMethodPage
