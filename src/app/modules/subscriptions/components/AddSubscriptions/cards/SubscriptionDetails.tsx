import {useState, useEffect} from 'react'
import * as Yup from 'yup'
import {Formik} from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { SubscriptionFormValues } from '../../../../../models/subscription'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'
import EjazCheckboxInput from '../../../../../layout/Common/EjazCheckboxInput'
import EjazSelectInput from '../../../../../layout/Common/EjazMultiSelectInput'
import EjazMultiSelectInput from '../../../../../layout/Common/EjazMultiSelectInput'
import { Dropdown, Item } from 'semantic-ui-react'
import Multiselect from 'multiselect-react-dropdown';
import { PagingParams } from '../../../../../models/pagination'
import { OrderParams } from '../../../../../models/orderParams'
import { FilterParams } from '../../../../../models/filterParams'
import { ItemFormValues } from '../../../../../models/item'
import { toAbsoluteUrl } from '../../../../../../_ejaz/helpers'
import PhotoUploadWidgetDropzone from '../../../../../layout/Common/imageUpload/PhotoWidgetDropzone'
import { GenreFormValues } from '../../../../../models/genre'
import PhotoUploadWidget from '../../../../../layout/Common/imageUpload/PhotoUploadWidget'



export default observer(function SubscriptionDetails() {
  const { subscriptionStore } = useStore();
  const { createSubscription, loadSubscription, uploadMedium, deleteMedium, setSrc, loadingInitial, uploading, uploaded, src } = subscriptionStore;
  const { id } = useParams();
  const navigate = useNavigate();

  

  const [subscription, setSubscription] = useState<SubscriptionFormValues>(new SubscriptionFormValues());



  const validationSchema = Yup.object().shape({
    sb_Name: Yup.string().required('Name required!').min(3, 'Minimum 3 characters required!'),
    sb_Name_Ar: Yup.string().required('Arabic Name required!').min(3, 'Minimum 3 characters required!'),
    sb_Title: Yup.string().required('Title required!').min(3, 'Minimum 3 characters required!'),
    sb_Title_Ar: Yup.string().required('Arabic Title required!').min(3, 'Minimum 3 characters required!')
  })

  function handleOnCancel() {
    setSrc('');
    navigate(-1);
  }

  function handleUploadMedium(file: Blob) {
    uploadMedium(file);
  }

  function handleDeleteMedium() {
    deleteMedium();
  }

  

  useEffect(() => {
    if (id) loadSubscription(id).then(subscription => setSubscription(new SubscriptionFormValues(subscription)))
  }, [id, loadSubscription])

  

  function handleFormSubmit(subscription: SubscriptionFormValues) {
    let newSubscription = {
      ...subscription
    }
    createSubscription(newSubscription).then(() => navigate(`../view/${newSubscription.sb_ID}`))
  }

  

  

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  

  return (
    
    <Formik
      enableReinitialize
      validationSchema = {validationSchema}
      initialValues={subscription}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty}) => (
      <form onSubmit={handleSubmit} noValidate className='form'>
        <div className='card mb-5 mb-xl-10'>
          <div
            className='card-header border-0 cursor-pointer'
            role='button'
            data-bs-toggle='collapse'
            data-bs-target='#subscription_details'
            aria-expanded='true'
            aria-controls='subscription_details'
          >
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Subscription Details</h3>
            </div>
          </div>
          <div id='subscription_details' className='collapse show'>
            <div className='card-body border-top p-9'>
            
            <div className='row mb-6'>
              <label className='col-lg-2 col-form-label fw-bold fs-6'>Image</label>
              <div className='col-lg-10'>
              <PhotoUploadWidget  uploadPhoto={handleUploadMedium} deletePhoto={handleDeleteMedium} loading={uploading} uploaded={uploaded} src={src} height={125} aspectRatio={1}/>
              </div>
            </div>
            <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Name</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Name'} name={'sb_Name'} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'اسم'} name={'sb_Name_Ar'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Title</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Title'} name={'sb_Title'} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'sb_Title_Ar'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'sb_Desc'} rows={4} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'sb_Desc_Ar'} rows={4} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Price / Display Price</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Price'} name={'sb_Price'} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Display Price'} name={'sb_DisplayPrice'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Discount Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Discount Description'} name={'sb_DiscountDesc'} rows={4} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                    <EjazTextArea placeholder={'وصف الخصم'} name={'sb_DiscountDesc_Ar'} rows={4} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Days</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Days'} name={'sb_Days'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazCheckboxInput label={'Enable'} name={'sb_Active'} id={'Status'} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <button onClick={handleOnCancel} className='btn btn-light align-self-center mx-10'>
                Cancel
              </button>
              <button type='submit' className='btn btn-primary' disabled={isSubmitting || !dirty || !isValid}>
                {!isSubmitting && 'Save Changes'}
                {isSubmitting && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    )} 
    </Formik>
  )
})
