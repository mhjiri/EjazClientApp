import { BannerLocation, BannerLocationFormValues } from '../../../../models/bannerLocation'
import { observer } from 'mobx-react-lite'
import EjazTextInput from '../../../../layout/Common/EjazTextInput'
import { useStore } from '../../../../stores/store'
import { useEffect, useState } from 'react'

interface Props {
  bannerLocation: BannerLocationFormValues
}

export default observer(function BannerLocationProperties({bannerLocation}: Props) {
  
  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#bannerLocation_properties'
        aria-expanded='true'
        aria-controls='bannerLocation_properties'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Properties</h3>
        </div>
      </div>

      <div id='bannerLocation_properties' className='collapse show'>
        
        <div className='card-body border-top p-9'>
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label fw-bold fs-6'>Banners</label>
            <div className='col-lg-4'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'Banners'} name={'bl_Banners'} disabled={true} />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label fw-bold fs-6'>Created</label>
            <div className='col-lg-10'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'By'} name={'bl_Creator'} disabled={true} />
                </div>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'On'} name={'bl_CreatedOn'} disabled={true} />
                </div>
              </div>
            </div>
          </div>
          {bannerLocation.bl_ModifyOn != null && ( 
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label fw-bold fs-6'>Modified</label>
            <div className='col-lg-10'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'By'} name={'bl_Modifier'} disabled={true} />
                </div>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'On'} name={'bl_ModifyOn'} disabled={true} />
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
            
      </div>
    </div>
  )
})
