import { Category, CategoryFormValues } from '../../../../models/category'
import { observer } from 'mobx-react-lite'
import EjazTextInput from '../../../../layout/Common/EjazTextInput'

interface Props {
  category: CategoryFormValues
}

export default observer(function CategoryProperties({category}: Props) {
  
  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#category_properties'
        aria-expanded='true'
        aria-controls='category_properties'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Properties</h3>
        </div>
      </div>

      <div id='category_properties' className='collapse show'>
        
        <div className='card-body border-top p-9'>
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label fw-bold fs-6'>Books</label>
            <div className='col-lg-4'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'Books'} name={'ct_Summaries'} disabled={true} />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label fw-bold fs-6'>Created</label>
            <div className='col-lg-10'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'By'} name={'ct_Creator'} disabled={true} />
                </div>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'On'} name={'ct_CreatedOn'} disabled={true} />
                </div>
              </div>
            </div>
          </div>
          {category.ct_Modifier != null && category.ct_Modifier != ''  && ( 
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label fw-bold fs-6'>Modified</label>
            <div className='col-lg-10'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'By'} name={'ct_Modifier'} disabled={true} />
                </div>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'On'} name={'ct_ModifyOn'} disabled={true} />
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
