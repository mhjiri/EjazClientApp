import {useState, useEffect} from 'react'
import * as Yup from 'yup'
import {Formik} from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { AvatarFormValues } from '../../../../../models/avatar'
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



export default observer(function AvatarDetails() {
  const { avatarStore, genreStore } = useStore();
  const { createAvatar, loadAvatar, uploadMedium, deleteMedium, setSrc, loadingInitial, uploading, uploaded, src } = avatarStore;
  const { loadGenres, setPagingParams, setOrderParams, setFilterParams, pagination, returnedGenres, axiosParams } = genreStore;
  const { id } = useParams();
  const navigate = useNavigate();

  

  const [avatar, setAvatar] = useState<AvatarFormValues>(new AvatarFormValues());



  const validationSchema = Yup.object().shape({
    av_Title: Yup.string().required('Title required!').min(3, 'Minimum 3 characters required!'),
    av_Title_Ar: Yup.string().required('Arabic Title required!').min(3, 'Minimum 3 characters required!')
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
    if (id) loadAvatar(id).then(avatar => setAvatar(new AvatarFormValues(avatar)))
  }, [id, loadAvatar])

  useEffect(() => {
    loadGenres();
  }, [loadGenres])

  

  function handleFormSubmit(avatar: AvatarFormValues) {
    let newAvatar = {
      ...avatar
    }
    createAvatar(newAvatar).then(() => navigate(`../view/${newAvatar.av_ID}`))
  }

  

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  

  return (
    
    <Formik
      enableReinitialize
      validationSchema = {validationSchema}
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
              <label className='col-lg-2 col-form-label fw-bold fs-6'>Image</label>
              <div className='col-lg-10'>
              <PhotoUploadWidget  uploadPhoto={handleUploadMedium} deletePhoto={handleDeleteMedium} loading={uploading} uploaded={uploaded} src={src} height={125} aspectRatio={1}/>
              </div>
            </div>
            
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Title</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Title'} name={'av_Title'} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'av_Title_Ar'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'av_Desc'} rows={4} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'av_Desc_Ar'} rows={4} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazCheckboxInput label={'Enable'} name={'av_Active'} id={'Status'} />
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
