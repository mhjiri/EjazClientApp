import React from 'react'
import { observer } from 'mobx-react-lite';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_ejaz/layout/core'
import {AddBannerLocation} from './components/AddBannerLocations/AddBannerLocation'
import {BannerLocationsHeader} from './BannerLocationsHeader'
import EditBannerLocation from './components/EditBannerLocations/EditBannerLocation'
import ViewBannerLocation from './components/ViewBannerLocation/ViewBannerLocation'
import ListBannerLocations from './components/ListBannerLocations/ListBannerLocations';

const bannerLocationBreadCrumbs: Array<PageLink> = [
  {
    title: 'BannerLocations',
    path: '/bannerLocations',
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

export default observer(function BannerLocationsPage() {
  return (
    <Routes>
      <Route
        element={
          <>
            <BannerLocationsHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={bannerLocationBreadCrumbs}>List BannerLocations</PageTitle>
              <ListBannerLocations />
            </>
          }
        />
        <Route
          path='add'
          element={
            <>
              <PageTitle breadcrumbs={bannerLocationBreadCrumbs}>Add BannerLocation</PageTitle>
              <AddBannerLocation />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={bannerLocationBreadCrumbs}>Edit BannerLocation</PageTitle>
              <EditBannerLocation />
            </>
          }
        />
        <Route
          path='view/:id'
          element={
            <>
              <PageTitle breadcrumbs={bannerLocationBreadCrumbs}>View BannerLocation</PageTitle>
              <ViewBannerLocation />
            </>
          }
        />
        <Route index element={<Navigate to='/bannerLocations/list' />} />
      </Route>
      
    </Routes>
  )
})

//export default BannerLocationPage
