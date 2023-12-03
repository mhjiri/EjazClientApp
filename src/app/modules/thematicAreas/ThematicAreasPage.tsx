import React from 'react'
import { observer } from 'mobx-react-lite';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_ejaz/layout/core'
import {AddThematicArea} from './components/AddThematicAreas/AddThematicArea'
import {ThematicAreasHeader} from './ThematicAreasHeader'
import EditThematicArea from './components/EditThematicAreas/EditThematicArea'
import ViewThematicArea from './components/ViewThematicArea/ViewThematicArea'
import ListThematicAreas from './components/ListThematicAreas/ListThematicAreas';

const thematicAreaBreadCrumbs: Array<PageLink> = [
  {
    title: 'ThematicAreas',
    path: '/thematicAreas',
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

export default observer(function ThematicAreaPage() {
  return (
    <Routes>
      <Route
        element={
          <>
            <ThematicAreasHeader />
            <Outlet />
          </>
        }
      >
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={thematicAreaBreadCrumbs}>List Thematic Areas</PageTitle>
              <ListThematicAreas />
            </>
          }
        />
        <Route
          path='add'
          element={
            <>
              <PageTitle breadcrumbs={thematicAreaBreadCrumbs}>Add Thematic Area</PageTitle>
              <AddThematicArea />
            </>
          }
        />
        <Route
          path='update/:id'
          element={
            <>
              <PageTitle breadcrumbs={thematicAreaBreadCrumbs}>Edit Thematic Area</PageTitle>
              <EditThematicArea />
            </>
          }
        />
        <Route
          path='view/:id'
          element={
            <>
              <PageTitle breadcrumbs={thematicAreaBreadCrumbs}>View Thematic Area</PageTitle>
              <ViewThematicArea />
            </>
          }
        />
        <Route index element={<Navigate to='/thematicAreas/list' />} />
      </Route>
      
    </Routes>
  )
})

//export default ThematicAreaPage
