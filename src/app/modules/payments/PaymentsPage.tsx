import React from 'react'
import { observer } from 'mobx-react-lite';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_ejaz/layout/core'
// import {AddPayment} from './components/AddPayments/AddPayment'
import {PaymentsHeader} from './PaymentsHeader'
// import EditPayment from './components/EditPayments/EditPayment'
import ViewPayment from './components/ViewPayment/ViewPayment'
import ListPayments from './components/ListPayments/ListPayments';
import { AddPayment } from './components/AddPayments/AddPayment';

const paymentBreadCrumbs: Array<PageLink> = [
  {
    title: 'Payments',
    path: '/payments',
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

export default observer(function PaymentPage() {
  return (
    <Routes>
      <Route
        element={
          <>
            <PaymentsHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={paymentBreadCrumbs}>List Payments</PageTitle>
              <ListPayments />
            </>
          }
        />
        <Route
          path='add'
          element={
            <>
              <PageTitle breadcrumbs={paymentBreadCrumbs}>Add Payment</PageTitle>
              <AddPayment />
            </>
          }
        />
        {/* <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={paymentBreadCrumbs}>Edit Payment</PageTitle>
              <EditPayment />
            </>
          }
        /> */}
        <Route
          path='view/:id'
          element={
            <>
              <PageTitle breadcrumbs={paymentBreadCrumbs}>View Payment</PageTitle>
              <ViewPayment />
            </>
          }
        />
        <Route index element={<Navigate to='/payments/list' />} />
      </Route>
      
    </Routes>
  )
})
