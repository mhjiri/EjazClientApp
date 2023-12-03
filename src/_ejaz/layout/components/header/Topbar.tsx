/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {KTIcon} from '../../../helpers'
import { ThemeModeSwitcher } from '../../../partials/layout/theme-mode/ThemeModeSwitcher'
import { useAuth } from '../../../../app/modules/auth';

const Topbar: FC = () => {
  const {currentUser, logout} = useAuth()
  return (
    <div className='d-flex flex-shrink-0'>
    

    {/* begin::Theme mode */}
    <div className='d-flex align-items-center  ms-3'>
      <ThemeModeSwitcher toggleBtnClass=' flex-center bg-body btn-color-gray-600 btn-active-color-primary h-40px' />
    </div>
    {/* end::Theme mode */}

    <div className='d-flex align-items-center  ms-3'>
        
        <a
        onClick={logout} 
        className='btn btn-icon flex-center bg-body btn-color-gray-600 btn-active-color-primary h-40px'
      >
        
          <KTIcon iconName='lock' className='theme-light-hide' />
      </a>
    </div>
  </div>
  )
}

export {Topbar}
