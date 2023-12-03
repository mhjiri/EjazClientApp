import {useState, useEffect} from 'react'
import {Formik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { ThematicAreaFormValues } from '../../../../../models/thematicArea'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import ThematicAreaProperties from '../../Common/ThematicAreaProperties'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'

interface Props {
  id: string | undefined
}

export default observer(function ThematicAreaDetails({id}: Props) {
  const { thematicAreaStore } = useStore();
  const { loadThematicArea, loadingInitial } = thematicAreaStore;
  const navigate = useNavigate();

  const [thematicArea, setThematicArea] = useState<ThematicAreaFormValues>(new ThematicAreaFormValues());

  useEffect(() => {
    if (id) loadThematicArea(id).then(thematicArea => setThematicArea(new ThematicAreaFormValues(thematicArea)))
  }, [id, loadThematicArea])

  function handleFormSubmit(thematicArea: ThematicAreaFormValues) {
  }

  const routeToUpdate = () =>{ 
    let path = `/thematicAreas/update/${thematicArea.th_ID}`;
    navigate(path);
  }

  const routeToList = () =>{ 
    let path = `/thematicAreas/list/`;
    navigate(path);
  }

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  return (
    <Formik
      enableReinitialize
      initialValues={thematicArea}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty}) => (
      <form onSubmit={handleSubmit} noValidate className='form'>
        <div className='card mb-5 mb-xl-10'>
          <div
            className='card-header border-0 cursor-pointer'
            role='button'
            data-bs-toggle='collapse'
            data-bs-target='#thematicArea_details'
            aria-expanded='true'
            aria-controls='thematicArea_details'
          >
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Thematic Area Details</h3>
            </div>
          </div>

          <div id='thematicArea_details' className='collapse show'>
            <div className='card-body border-top p-9'>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Title</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Title'} name={'th_Title'} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'th_Title_Ar'}  disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'th_Desc'} rows={4} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'th_Desc_Ar'} rows={4} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Status'} name={'th_Active'} value={thematicArea.th_Active ? 'Enabled' : 'Disbaled'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <Link to='/thematicAreas/list' className='btn btn-light align-self-center mx-10'>
                List
              </Link>
              <Link to={`/thematicAreas/update/${thematicArea.th_ID}`} className='btn btn-primary align-self-center'>
                Edit
              </Link>
            </div>
          </div>
        </div>
        <ThematicAreaProperties thematicArea={thematicArea} />
      </form>
    )} 
    </Formik>
  )
})
