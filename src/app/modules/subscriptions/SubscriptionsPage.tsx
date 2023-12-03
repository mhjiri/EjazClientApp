import React from 'react'
import { observer } from 'mobx-react-lite';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_ejaz/layout/core'
import {AddSubscription} from './components/AddSubscriptions/AddSubscription'
import {SubscriptionsHeader} from './SubscriptionsHeader'
import EditSubscription from './components/EditSubscriptions/EditSubscription'
import ViewSubscription from './components/ViewSubscription/ViewSubscription'
import ListSubscriptions from './components/ListSubscriptions/ListSubscriptions';

const subscriptionBreadCrumbs: Array<PageLink> = [
  {
    title: 'Subscriptions',
    path: '/subscriptions',
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

export default observer(function SubscriptionPage() {
  return (
    <Routes>
      <Route
        element={
          <>
            <SubscriptionsHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={subscriptionBreadCrumbs}>List Subscriptions</PageTitle>
              <ListSubscriptions />
            </>
          }
        />
        <Route
          path='add'
          element={
            <>
              <PageTitle breadcrumbs={subscriptionBreadCrumbs}>Add Subscription</PageTitle>
              <AddSubscription />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={subscriptionBreadCrumbs}>Edit Subscription</PageTitle>
              <EditSubscription />
            </>
          }
        />
        <Route
          path='view/:id'
          element={
            <>
              <PageTitle breadcrumbs={subscriptionBreadCrumbs}>View Subscription</PageTitle>
              <ViewSubscription />
            </>
          }
        />
        <Route index element={<Navigate to='/subscriptions/list' />} />
      </Route>
      
    </Routes>
  )
})
