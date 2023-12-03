import {useState, useEffect} from 'react'
import * as Yup from 'yup'
import {Formik} from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { PaymentMethodFormValues } from '../../../../../models/paymentMethod'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'
import { v4 as uuid } from 'uuid';
import EjazCheckboxInput from '../../../../../layout/Common/EjazCheckboxInput'


export default observer(function PaymentMethodDetails() {
  const { paymentMethodStore } = useStore();
  const { createPaymentMethod, loadPaymentMethod, loadingInitial } = paymentMethodStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodFormValues>(new PaymentMethodFormValues());

  const validationSchema = Yup.object().shape({
    py_Title: Yup.string().required('Title required!').min(3, 'Minimum 3 characters required!'),
    py_Title_Ar: Yup.string().required('Arabic Title required!').min(3, 'Minimum 3 characters required!')
  })

  useEffect(() => {
    if (id) loadPaymentMethod(id).then(paymentMethod => setPaymentMethod(new PaymentMethodFormValues(paymentMethod)))
  }, [id, loadPaymentMethod])

  function handleFormSubmit(paymentMethod: PaymentMethodFormValues) {
    let newPaymentMethod = {
      ...paymentMethod
    }
    createPaymentMethod(newPaymentMethod).then(() => navigate(`/paymentMethods/view/${newPaymentMethod.py_ID}`))
  }

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  return (
    <Formik
      enableReinitialize
      validationSchema = {validationSchema}
      initialValues={paymentMethod}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty}) => (
      <form onSubmit={handleSubmit} noValidate className='form'>
        <div className='card mb-5 mb-xl-10'>
          <div
            className='card-header border-0 cursor-pointer'
            role='button'
            data-bs-toggle='collapse'
            data-bs-target='#paymentMethod_details'
            aria-expanded='true'
            aria-controls='paymentMethod_details'
          >
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>PaymentMethod Details</h3>
            </div>
          </div>

          <div id='paymentMethod_details' className='collapse show'>
            <div className='card-body border-top p-9'>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Title</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Title'} name={'py_Title'} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'py_Title_Ar'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'py_Desc'} rows={4} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'py_Desc_Ar'} rows={4} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazCheckboxInput label={'Enable'} name={'py_Active'} id={'Status'} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <button onClick={() => navigate(-1)} className='btn btn-light align-self-center mx-10'>
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
