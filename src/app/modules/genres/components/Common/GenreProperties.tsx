import { Genre, GenreFormValues } from '../../../../models/genre'
import { observer } from 'mobx-react-lite'
import EjazTextInput from '../../../../layout/Common/EjazTextInput'
import { useStore } from '../../../../stores/store'
import { useEffect, useState } from 'react'

interface Props {
  genre: GenreFormValues
}

export default observer(function GenreProperties({genre}: Props) {
  
  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#genre_properties'
        aria-expanded='true'
        aria-controls='genre_properties'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Properties</h3>
        </div>
      </div>

      <div id='genre_properties' className='collapse show'>
        
        <div className='card-body border-top p-9'>
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label fw-bold fs-6'>Books</label>
            <div className='col-lg-4'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'Books'} name={'gn_Summaries'} disabled={true} />
                </div>
              </div>
            </div>
          </div>
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label fw-bold fs-6'>Created</label>
            <div className='col-lg-10'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'By'} name={'gn_Creator'} disabled={true} />
                </div>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'On'} name={'gn_CreatedOn'} disabled={true} />
                </div>
              </div>
            </div>
          </div>
          {genre.gn_ModifyOn != null && ( 
          <div className='row mb-6'>
            <label className='col-lg-2 col-form-label fw-bold fs-6'>Modified</label>
            <div className='col-lg-10'>
              <div className='row'>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'By'} name={'gn_Modifier'} disabled={true} />
                </div>
                <div className='col-lg-6 fv-row'>
                  <EjazTextInput placeholder={'On'} name={'gn_ModifyOn'} disabled={true} />
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
