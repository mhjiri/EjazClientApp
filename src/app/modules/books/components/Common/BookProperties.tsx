import { Book, BookFormValues } from '../../../../models/book'
import { observer } from 'mobx-react-lite'
import EjazTextInput from '../../../../layout/Common/EjazTextInput'

interface Props {
  book: BookFormValues
}

export default observer(function BookProperties({book}: Props) {
  
  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#book_properties'
        aria-expanded='true'
        aria-controls='book_properties'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Properties</h3>
        </div>
      </div>

      <div id='book_properties' className='collapse show'>
        
        <div className='card-body border-top p-9'>
          
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label fw-bold fs-6'>Created</label>
            <div className='col-lg-10'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'By'} name={'bk_Creator'} disabled={true} />
                </div>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'On'} name={'bk_CreatedOn'} disabled={true} />
                </div>
              </div>
            </div>
          </div>
          {book.bk_Modifier != null && book.bk_Modifier != ''  && ( 
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label fw-bold fs-6'>Modified</label>
            <div className='col-lg-10'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'By'} name={'bk_Modifier'} disabled={true} />
                </div>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'On'} name={'bk_ModifyOn'} disabled={true} />
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
