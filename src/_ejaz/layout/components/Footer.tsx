/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import clsx from 'clsx'
import {useLayout} from '../core'

const Footer: FC = () => {
  const {classes} = useLayout()
  return (
    <div className={'footer py-4 d-flex flex-lg-column'} id='kt_footer'>
      {/*begin::Container*/}
      <div className={clsx(classes.footerContainer, 'd-flex flex-column flex-md-row flex-stack')}>
        
      </div>
      {/*end::Container*/}
    </div>
  )
}

export {Footer}
