import {useState, useEffect} from 'react'
import {Formik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { SubscriptionFormValues } from '../../../../../models/subscription'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import SubscriptionProperties from '../../Common/SubscriptionProperties'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'
import genreStore from '../../../../../stores/genreStore'
import { toAbsoluteUrl } from '../../../../../../_ejaz/helpers'
import { MediumFormValues } from '../../../../../models/medium'

interface Props {
  id: string | undefined
}

export default observer(function SubscriptionDetails({id}: Props) {
  const { subscriptionStore, genreStore, mediumStore } = useStore();
  const { loadSubscription, selectedSubscription, loadingInitial } = subscriptionStore;
  const { loadGenres, setPagingParams, setOrderParams, setFilterParams, pagination, returnedGenres, axiosParams } = genreStore;
  const { loadMedium } = mediumStore;
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<SubscriptionFormValues>(new SubscriptionFormValues());
  const [medium, setMedium] = useState<MediumFormValues>(new MediumFormValues());
  //const [mediumSrc, setMediumSrc] = useState<string>('');
  const [genres, setGenre] = useState<string>('');

  useEffect(() => {
    
    if (id) 
    { 
      loadSubscription(id).then(subscription => setSubscription(new SubscriptionFormValues(subscription)));
    } 
  }, [id, loadSubscription])

  

  useEffect(() => {
    loadMedium(selectedSubscription!.md_ID).then(medium => setMedium(new MediumFormValues(medium)));
  }, [selectedSubscription])
  

  function handleFormSubmit(subscription: SubscriptionFormValues) {
  }

      
      

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  
  const mediumSrc = `data:${medium.md_FileType};base64,${medium.md_Medium}`;

  return (
    <Formik
      enableReinitialize
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
              <label className='col-lg-2 col-form-label fw-bold fs-6'>Avatar</label>
              <div className='col-lg-10'>
                <div
                  className='image-input image-input-outline'
                  data-kt-image-input='true'
                  style={{backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
                >
                  <div
                        className='image-input-wrapper w-125px h-125px'
                        style={{minHeight: 125, overflow: 'hidden', backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
                    >
                        {mediumSrc && mediumSrc.length > 40 &&
                        <img className='image-input-wrapper w-125px h-125px' src={mediumSrc}></img>
                        }
                    </div>
                  
                </div>
              </div>
            </div>
            <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Name</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Name'} name={'sb_Name'} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'اسم'} name={'sb_Name_Ar'}  disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Title</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Title'} name={'sb_Title'} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'sb_Title_Ar'}  disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'sb_Desc'} rows={4} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'sb_Desc_Ar'} rows={4} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Price / Display Price</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Price'} name={'sb_Price'} disabled={true}  />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Display Price'} name={'sb_DisplayPrice'} disabled={true}  />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Discount Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Discount Description'} name={'sb_DiscountDesc'} rows={4} disabled={true}  />
                    </div>
                    <div className='col-lg-6 fv-row'>
                    <EjazTextArea placeholder={'وصف الخصم'} name={'sb_DiscountDesc_Ar'} rows={4} disabled={true}  />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Days</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Days'} name={'sb_Days'} disabled={true}  />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Status'} name={'sb_Active'} value={subscription.sb_Active ? 'Enabled' : 'Disbaled'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <Link to='/subscriptions/list' className='btn btn-light align-self-center mx-10'>
                List
              </Link>
              <Link to={`/subscriptions/update/${subscription.sb_ID}`} className='btn btn-primary align-self-center'>
                Edit
              </Link>
            </div>
          </div>
        </div>
        <SubscriptionProperties subscription={subscription} />
      </form>
    )} 
    </Formik>
  )
})

