import {useState, useEffect} from 'react'
import {Formik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { BannerLocationFormValues } from '../../../../../models/bannerLocation'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import BannerLocationProperties from '../../Common/BannerLocationProperties'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'

interface Props {
  id: string | undefined
}

export default observer(function BannerLocationDetails({id}: Props) {
  const { bannerLocationStore } = useStore();
  const { loadBannerLocation, loadingInitial } = bannerLocationStore;
  const navigate = useNavigate();

  const [bannerLocation, setBannerLocation] = useState<BannerLocationFormValues>(new BannerLocationFormValues());

  useEffect(() => {
    if (id) loadBannerLocation(id).then(bannerLocation => setBannerLocation(new BannerLocationFormValues(bannerLocation)))
  }, [id, loadBannerLocation])

  function handleFormSubmit(bannerLocation: BannerLocationFormValues) {
  }

  const routeToUpdate = () =>{ 
    let path = `/bannerLocations/update/${bannerLocation.bl_ID}`;
    navigate(path);
  }

  const routeToList = () =>{ 
    let path = `/bannerLocations/list/`;
    navigate(path);
  }

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  return (
    <Formik
      enableReinitialize
      initialValues={bannerLocation}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty}) => (
      <form onSubmit={handleSubmit} noValidate className='form'>
        <div className='card mb-5 mb-xl-10'>
          <div
            className='card-header border-0 cursor-pointer'
            role='button'
            data-bs-toggle='collapse'
            data-bs-target='#bannerLocation_details'
            aria-expanded='true'
            aria-controls='bannerLocation_details'
          >
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>BannerLocation Details</h3>
            </div>
          </div>

          <div id='bannerLocation_details' className='collapse show'>
            <div className='card-body border-top p-9'>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Title</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Title'} name={'bl_Title'} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'bl_Title_Ar'}  disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'bl_Desc'} rows={4} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'bl_Desc_Ar'} rows={4} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Banner Ration</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Banner Ration'} name={'bl_Ratio'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Status'} name={'bl_Active'} value={bannerLocation.bl_Active ? 'Enabled' : 'Disbaled'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <Link to='/bannerLocations/list' className='btn btn-light align-self-center mx-10'>
                List
              </Link>
              <Link to={`/bannerLocations/update/${bannerLocation.bl_ID}`} className='btn btn-primary align-self-center'>
                Edit
              </Link>
            </div>
          </div>
        </div>
        <BannerLocationProperties bannerLocation={bannerLocation} />
      </form>
    )} 
    </Formik>
  )
})
