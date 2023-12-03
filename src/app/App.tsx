import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_ejaz/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_ejaz/layout/core'
import {MasterInit} from '../_ejaz/layout/MasterInit'
import {AuthInit} from './modules/auth'
import { observer } from 'mobx-react-lite'
import { ToastContainer } from 'react-bootstrap'

export default observer(function App() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>

      
      <I18nProvider>
        <LayoutProvider>
          <AuthInit>
            <Outlet />
            <MasterInit />
          </AuthInit>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
})



