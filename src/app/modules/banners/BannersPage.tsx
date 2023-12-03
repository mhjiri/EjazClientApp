import React from 'react'
import { observer } from 'mobx-react-lite';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_ejaz/layout/core'
import {AddBanner} from './components/AddBanners/AddBanner'
import {BannersHeader} from './BannersHeader'
import EditBanner from './components/EditBanners/EditBanner'
import ViewBanner from './components/ViewBanner/ViewBanner'
import ListBanners from './components/ListBanners/ListBanners';

const bannerBreadCrumbs: Array<PageLink> = [
  {
    title: 'Banners',
    path: '/banners',
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

export default observer(function BannerPage() {
  return (
    <Routes>
      <Route
        element={
          <>
            <BannersHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={bannerBreadCrumbs}>List Banners</PageTitle>
              <ListBanners />
            </>
          }
        />
        <Route
          path='add'
          element={
            <>
              <PageTitle breadcrumbs={bannerBreadCrumbs}>Add Banner</PageTitle>
              <AddBanner />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={bannerBreadCrumbs}>Edit Banner</PageTitle>
              <EditBanner />
            </>
          }
        />
        <Route
          path='view/:id'
          element={
            <>
              <PageTitle breadcrumbs={bannerBreadCrumbs}>View Banner</PageTitle>
              <ViewBanner />
            </>
          }
        />
        <Route index element={<Navigate to='/banners/list' />} />
      </Route>
      
    </Routes>
  )
})
