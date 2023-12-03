import {useState, useEffect} from 'react'
import * as Yup from 'yup'
import {Formik} from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { PaymentFormValues } from '../../../../../models/payment'
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



export default observer(function PaymentDetails() {
  const { paymentStore, trialUserStore, subscriptionStore, paymentMethodStore } = useStore();
  const { createPayment, loadPayment, loadingInitial } = paymentStore;
  const { loadTrialUsers, returnedTrialUsers } = trialUserStore;
  const { loadPaymentMethods, returnedPaymentMethods } = paymentMethodStore;
  const { loadSubscriptions, returnedSubscriptions, loadSubscription } = subscriptionStore;
  const { id } = useParams();
  const navigate = useNavigate();

  

  const [payment, setPayment] = useState<PaymentFormValues>(new PaymentFormValues());



  const validationSchema = Yup.object().shape({
    pm_Subscriber: Yup.string().required('Subscriber required!'),
    sb_ID: Yup.string().required('Subscription required!'),
    py_ID: Yup.string().required('Payment Method required!'),
    pm_RefernceID: Yup.string().required('Reference ID required!').min(3, 'Minimum 3 characters required!')
  })

  function handleOnCancel() {
    navigate(-1);
  }
  

  

  useEffect(() => {
    if (id) loadPayment(id).then(payment => setPayment(new PaymentFormValues(payment)))
  }, [id, loadPayment])

  useEffect(() => {
    loadTrialUsers();
  }, [loadTrialUsers])

  useEffect(() => {
    loadSubscriptions();
  }, [loadSubscriptions])

  useEffect(() => {
    loadPaymentMethods();
  }, [loadPaymentMethods])

  

  function handleFormSubmit(payment: PaymentFormValues) {
    let newPayment = {
      ...payment
    }
    createPayment(newPayment).then(() => navigate(`../view/${newPayment.pm_ID}`))
  }

  const subscriberOptions = returnedTrialUsers.map(trialUser => (
    {name: trialUser.us_DisplayName + " | " + ((trialUser.phoneNumber != null) ? trialUser.phoneNumber : "NA") + " | " + trialUser.email, id: trialUser.username}
  ))

  const subscriptionOptions = returnedSubscriptions.map(subscription => (
    {name: subscription.sb_Name + " | " + subscription.sb_Name_Ar, id: subscription.sb_ID}
  ))

  const paymentMethodOptions = returnedPaymentMethods.map(paymentMethod => (
    {name: paymentMethod.py_Title + " | " + paymentMethod.py_Title_Ar, id: paymentMethod.py_ID}
  ))

  

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  

  return (
    
    <Formik
      enableReinitialize
      validationSchema = {validationSchema}
      initialValues={payment}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty, setFieldValue}) => (
      <form onSubmit={handleSubmit} noValidate className='form'>
        <div className='card mb-5 mb-xl-10'>
          <div
            className='card-header border-0 cursor-pointer'
            role='button'
            data-bs-toggle='collapse'
            data-bs-target='#payment_details'
            aria-expanded='true'
            aria-controls='payment_details'
          >
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Payment Details</h3>
            </div>
          </div>
          <div id='payment_details' className='collapse show'>
            <div className='card-body border-top p-9'>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Subscriber</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-10 fv-row'>
                    <Multiselect
                      options={subscriberOptions} 
                      displayValue="name" 
                      className='form-select form-select-solid'
                      placeholder='Subscriber'
                      // onSelect={handleSelect}
                      // onRemove={handleUnselect}
                      onSelect={(selectedlist, selectedItem) => setFieldValue('pm_Subscriber', selectedItem.id)}
                      onRemove={(selectedlist, selectedItem) => setFieldValue('pm_Subscriber', '')}
                      selectionLimit = "1"
                      />
                      <EjazTextInput type='hidden' placeholder='Subscriber' name={'pm_Subscriber'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Subscription</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-10 fv-row'>
                    <Multiselect
                      options={subscriptionOptions} 
                      displayValue="name" 
                      className='form-select form-select-solid'
                      placeholder='Subscription'
                      
                      onSelect={(selectedlist, selectedItem) => { setFieldValue('sb_ID', selectedItem.id); loadSubscription(selectedItem.id).then(subscription => { setFieldValue('Pm_DisplayPrice', subscription?.sb_DisplayPrice); setFieldValue('Pm_Price', subscription?.sb_Price); setFieldValue('Pm_Days', subscription?.sb_Days)});}}
                      onRemove={(selectedlist, selectedItem) => { setFieldValue('sb_ID', null); setFieldValue('Pm_DisplayPrice', null); setFieldValue('Pm_Price', null); setFieldValue('Pm_Days', null);}}
                      selectionLimit = "1"
                      />
                      <EjazTextInput type='hidden' placeholder='Subscription' name={'sb_ID'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Payment Method</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-10 fv-row'>
                    <Multiselect
                      options={paymentMethodOptions} 
                      displayValue="name" 
                      className='form-select form-select-solid'
                      placeholder='Payment Method'
                      onSelect={(selectedlist, selectedItem) => setFieldValue('py_ID', selectedItem.id)}
                      onRemove={(selectedlist, selectedItem) => setFieldValue('py_ID', null)}
                      selectionLimit = "1"
                      />
                      <EjazTextInput type='hidden' placeholder='Payment Method' name={'py_ID'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Reference ID</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Refernce ID'} name={'pm_RefernceID'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Display Price</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Display Price'} name={'Pm_DisplayPrice'}   disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Price</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Price'} name={'Pm_Price'}   disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Days</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Days'} name={'Pm_Days'}   disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <button onClick={handleOnCancel} className='btn btn-light align-self-center mx-10'>
                Cancel
              </button>
              <button type='submit' className='btn btn-primary' disabled={isSubmitting || !dirty  || !isValid}>
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
