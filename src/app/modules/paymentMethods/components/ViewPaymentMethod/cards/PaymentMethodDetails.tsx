import {useState, useEffect} from 'react'
import {Formik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { PaymentMethodFormValues } from '../../../../../models/paymentMethod'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import PaymentMethodProperties from '../../Common/PaymentMethodProperties'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'

interface Props {
  id: string | undefined
}

export default observer(function PaymentMethodDetails({id}: Props) {
  const { paymentMethodStore } = useStore();
  const { loadPaymentMethod, loadingInitial } = paymentMethodStore;
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodFormValues>(new PaymentMethodFormValues());

  useEffect(() => {
    if (id) loadPaymentMethod(id).then(paymentMethod => setPaymentMethod(new PaymentMethodFormValues(paymentMethod)))
  }, [id, loadPaymentMethod])

  function handleFormSubmit(paymentMethod: PaymentMethodFormValues) {
  }

  const routeToUpdate = () =>{ 
    let path = `/paymentMethods/update/${paymentMethod.py_ID}`;
    navigate(path);
  }

  const routeToList = () =>{ 
    let path = `/paymentMethods/list/`;
    navigate(path);
  }

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  return (
    <Formik
      enableReinitialize
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
                      <EjazTextInput placeholder={'Title'} name={'py_Title'} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'py_Title_Ar'}  disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'py_Desc'} rows={4} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'py_Desc_Ar'} rows={4} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Status'} name={'py_Active'} value={paymentMethod.py_Active ? 'Enabled' : 'Disbaled'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <Link to='/paymentMethods/list' className='btn btn-light align-self-center mx-10'>
                List
              </Link>
              <Link to={`/paymentMethods/update/${paymentMethod.py_ID}`} className='btn btn-primary align-self-center'>
                Edit
              </Link>
            </div>
          </div>
        </div>
        <PaymentMethodProperties paymentMethod={paymentMethod} />
      </form>
    )} 
    </Formik>
  )
})
