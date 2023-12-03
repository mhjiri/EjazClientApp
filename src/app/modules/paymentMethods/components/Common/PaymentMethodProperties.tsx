import { PaymentMethod, PaymentMethodFormValues } from '../../../../models/paymentMethod'
import { observer } from 'mobx-react-lite'
import EjazTextInput from '../../../../layout/Common/EjazTextInput'
import { useStore } from '../../../../stores/store'
import { useEffect, useState } from 'react'

interface Props {
  paymentMethod: PaymentMethodFormValues
}

export default observer(function PaymentMethodProperties({paymentMethod}: Props) {
  
  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#paymentMethod_properties'
        aria-expanded='true'
        aria-controls='paymentMethod_properties'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Properties</h3>
        </div>
      </div>

      <div id='paymentMethod_properties' className='collapse show'>
        
        <div className='card-body border-top p-9'>
          
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label fw-bold fs-6'>Created</label>
            <div className='col-lg-10'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'By'} name={'py_Creator'} disabled={true} />
                </div>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'On'} name={'py_CreatedOn'} disabled={true} />
                </div>
              </div>
            </div>
          </div>
          {paymentMethod.py_ModifyOn != null && ( 
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label fw-bold fs-6'>Modified</label>
            <div className='col-lg-10'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'By'} name={'py_Modifier'} disabled={true} />
                </div>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'On'} name={'py_ModifyOn'} disabled={true} />
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
