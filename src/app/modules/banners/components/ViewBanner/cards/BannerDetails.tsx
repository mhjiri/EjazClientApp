import {useState, useEffect} from 'react'
import {Formik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { BannerFormValues } from '../../../../../models/banner'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import BannerProperties from '../../Common/BannerProperties'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'
import genreStore from '../../../../../stores/genreStore'
import { toAbsoluteUrl } from '../../../../../../_ejaz/helpers'
import { MediumFormValues } from '../../../../../models/medium'

interface Props {
  id: string | undefined
}

export default observer(function BannerDetails({id}: Props) {
  const { bannerStore, mediumStore } = useStore();
  const { loadBanner, selectedBanner, loadingInitial } = bannerStore;
  const { loadMedium } = mediumStore;
  const navigate = useNavigate();
  const [banner, setBanner] = useState<BannerFormValues>(new BannerFormValues());
  const [medium, setMedium] = useState<MediumFormValues>(new MediumFormValues());
  //const [mediumSrc, setMediumSrc] = useState<string>('');

  useEffect(() => {
    
    if (id) 
    { 
      loadBanner(id).then(banner => setBanner(new BannerFormValues(banner)));
    } 
  }, [id, loadBanner])

  useEffect(() => {
    loadMedium(selectedBanner!.md_ID).then(medium => setMedium(new MediumFormValues(medium)));
  }, [selectedBanner])
  

  function handleFormSubmit(banner: BannerFormValues) {
  }

      
      

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  
  const mediumSrc = `data:${medium.md_FileType};base64,${medium.md_Medium}`;

  return (
    <Formik
      enableReinitialize
      initialValues={banner}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty}) => (
      <form onSubmit={handleSubmit} noValidate className='form'>
        <div className='card mb-5 mb-xl-10'>
          <div
            className='card-header border-0 cursor-pointer'
            role='button'
            data-bs-toggle='collapse'
            data-bs-target='#banner_details'
            aria-expanded='true'
            aria-controls='banner_details'
          >
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Banner Details</h3>
            </div>
          </div>

          <div id='banner_details' className='collapse show'>
            <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-2 col-form-label fw-bold fs-6'>Banner</label>
              <div className='col-lg-10'>
                <div
                  className='image-input image-input-outline'
                  data-kt-image-input='true'
                  style={{backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
                >
                  <div
                        className='image-input-wrapper w-125px'
                        style={{minHeight: 188, overflow: 'hidden', backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
                    >
                        {mediumSrc && mediumSrc.length > 40 &&
                        <img className='image-input-wrapper w-125px' style={{height: 188}} src={mediumSrc}></img>
                        }
                    </div>
                  
                </div>
              </div>
            </div>
            
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Title</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Title'} name={'bn_Title'} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'bn_Title_Ar'}  disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'bn_Desc'} rows={4} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'bn_Desc_Ar'} rows={4} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Banner Location</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Banner Location'} name={'bn_BannerLocationTitle'} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'موقع البانر'} name={'bn_BannerLocationTitle_Ar'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Group</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Group'} name={'bn_GroupTitle'} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'مجموعة'} name={'bn_GroupTitle_Ar'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Publish Date</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'From'} name={'bn_PublishFrom'} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Till'} name={'bn_PublishTill'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Status'} name={'bn_Active'} value={banner.bn_Active ? 'Enabled' : 'Disbaled'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <Link to='/banners/list' className='btn btn-light align-self-center mx-10'>
                List
              </Link>
              <Link to={`/banners/update/${banner.bn_ID}`} className='btn btn-primary align-self-center'>
                Edit
              </Link>
            </div>
          </div>
        </div>
        <BannerProperties banner={banner} />
      </form>
    )} 
    </Formik>
  )
})

