import {useEffect} from 'react'
import {useIntl} from 'react-intl'
import {PageLink, PageTitle} from '../../../_ejaz/layout/core'
import {
    UserWidget,
} from './Widgets/UserWidget'
import { ActiveMembersWidget } from './Widgets/ActiveMemberWidget'
import { NewMembersWidget } from './Widgets/NewMemberWidget'
import { ExpiredMembersWidget } from './Widgets/ExpiredMemberWidget'
import { BookWidget } from './Widgets/BookWidget'
import { AuthorWidget } from './Widgets/AuthorWidget'

const dashboardBreadCrumbs: Array<PageLink> = [
  {
    title: 'Home',
    path: '/dashboard',
    isSeparator: false,
    isActive: false,
  },
]

const DashboardPage = () => {
  useEffect(() => {
    // We have to show toolbar only for dashboard page
    document.getElementById('kt_layout_toolbar')?.classList.remove('d-none')
    return () => {
      document.getElementById('kt_layout_toolbar')?.classList.add('d-none')
    }
  }, [])

  return (
    <>
      {/* begin::Row */}
      <div className='row gy-5 g-xl-8'>
        {/* begin::Col */}
        <div className='col-xxl-4'>
          <UserWidget
            className='card-xl-stretch mb-xl-8'
            chartColor='primary'
            chartHeight='250px'
          />
        </div>
        {/* end::Col */}
        {/* begin::Col */}
        <div className='col-xxl-4'>
          <ActiveMembersWidget
            className='card-xl-stretch mb-xl-8'
            chartColor='info'
            chartHeight='250px'
          />
        </div>
        {/* end::Col */}
        {/* begin::Col */}
        <div className='col-xxl-4'>
          <NewMembersWidget
            className='card-xl-stretch mb-xl-8'
            chartColor='warning'
            chartHeight='250px'
          />
        </div>
        {/* end::Col */}

        
      </div>
      {/* end::Row */}
      {/* begin::Row */}
      <div className='row gy-5 g-xl-8'>
        {/* begin::Col */}
        <div className='col-xxl-4'>
          <ExpiredMembersWidget
            className='card-xl-stretch mb-xl-8'
            chartColor='danger'
            chartHeight='250px'
          />
        </div>
        {/* end::Col */}
        {/* begin::Col */}
        <div className='col-xxl-4'>
          <BookWidget
            className='card-xl-stretch mb-xl-8'
            chartColor='primary'
            chartHeight='250px'
          />
        </div>
        {/* end::Col */}
        {/* begin::Col */}
        <div className='col-xxl-4'>
          <AuthorWidget
            className='card-xl-stretch mb-xl-8'
            chartColor='dark'
            chartHeight='250px'
          />
        </div>
        {/* end::Col */}
        

        
      </div>
      {/* end::Row */}

      
    </>
  )
}

const DashboardWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={dashboardBreadCrumbs}>
        {intl.formatMessage({id: 'MENU.DASHBOARD'})}
      </PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
