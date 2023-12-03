import { Payment, PaymentFormValues } from '../../../../models/payment'
import { observer } from 'mobx-react-lite'
import EjazTextInput from '../../../../layout/Common/EjazTextInput'

interface Props {
  payment: PaymentFormValues
}

export default observer(function PaymentProperties({payment}: Props) {
  
  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#payment_properties'
        aria-expanded='true'
        aria-controls='payment_properties'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Properties</h3>
        </div>
      </div>

      <div id='payment_properties' className='collapse show'>
        
        <div className='card-body border-top p-9'>
          
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label fw-bold fs-6'>Created</label>
            <div className='col-lg-10'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'By'} name={'pm_Creator'} disabled={true} />
                </div>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'On'} name={'pm_CreatedOn'} disabled={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
            
      </div>
    </div>
  )
})
