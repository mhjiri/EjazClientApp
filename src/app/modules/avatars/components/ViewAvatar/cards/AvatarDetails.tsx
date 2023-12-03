import {useState, useEffect} from 'react'
import {Formik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { AvatarFormValues } from '../../../../../models/avatar'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import AvatarProperties from '../../Common/AvatarProperties'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'
import genreStore from '../../../../../stores/genreStore'
import { toAbsoluteUrl } from '../../../../../../_ejaz/helpers'
import { MediumFormValues } from '../../../../../models/medium'

interface Props {
  id: string | undefined
}

export default observer(function AvatarDetails({id}: Props) {
  const { avatarStore, genreStore, mediumStore } = useStore();
  const { loadAvatar, selectedAvatar, loadingInitial } = avatarStore;
  const { loadGenres, setPagingParams, setOrderParams, setFilterParams, pagination, returnedGenres, axiosParams } = genreStore;
  const { loadMedium } = mediumStore;
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<AvatarFormValues>(new AvatarFormValues());
  const [medium, setMedium] = useState<MediumFormValues>(new MediumFormValues());
  //const [mediumSrc, setMediumSrc] = useState<string>('');
  const [genres, setGenre] = useState<string>('');

  useEffect(() => {
    
    if (id) 
    { 
      loadAvatar(id).then(avatar => setAvatar(new AvatarFormValues(avatar)));
    } 
  }, [id, loadAvatar])

  useEffect(() => {
    loadMedium(selectedAvatar!.md_ID).then(medium => setMedium(new MediumFormValues(medium)));
  }, [selectedAvatar])
  

  function handleFormSubmit(avatar: AvatarFormValues) {
  }

      
      

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  
  const mediumSrc = `data:${medium.md_FileType};base64,${medium.md_Medium}`;

  return (
    <Formik
      enableReinitialize
      initialValues={avatar}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty}) => (
      <form onSubmit={handleSubmit} noValidate className='form'>
        <div className='card mb-5 mb-xl-10'>
          <div
            className='card-header border-0 cursor-pointer'
            role='button'
            data-bs-toggle='collapse'
            data-bs-target='#avatar_details'
            aria-expanded='true'
            aria-controls='avatar_details'
          >
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Avatar Details</h3>
            </div>
          </div>

          <div id='avatar_details' className='collapse show'>
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
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Title</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Title'} name={'av_Title'} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'av_Title_Ar'}  disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'av_Desc'} rows={4} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'av_Desc_Ar'} rows={4} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Status'} name={'av_Active'} value={avatar.av_Active ? 'Enabled' : 'Disbaled'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <Link to='/avatars/list' className='btn btn-light align-self-center mx-10'>
                List
              </Link>
              <Link to={`/avatars/update/${avatar.av_ID}`} className='btn btn-primary align-self-center'>
                Edit
              </Link>
            </div>
          </div>
        </div>
        <AvatarProperties avatar={avatar} />
      </form>
    )} 
    </Formik>
  )
})

