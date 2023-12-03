import React, {useState, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../../../../_ejaz/helpers'
import * as Yup from 'yup'
import {Formik, FormikHelpers, FormikValues, useFormik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Banner, BannerFormValues } from '../../../../../models/banner'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'
import BannerProperties from '../../Common/BannerProperties'
import EjazCheckboxInput from '../../../../../layout/Common/EjazCheckboxInput'
import Multiselect from 'multiselect-react-dropdown'
import genreStore from '../../../../../stores/genreStore'
import { ItemFormValues } from '../../../../../models/item'
import { GenreFormValues } from '../../../../../models/genre'
import PhotoUploadWidget from '../../../../../layout/Common/imageUpload/PhotoUploadWidget'
import { MediumFormValues } from '../../../../../models/medium'

interface Props {
  id: string | undefined
}



export default observer(function BannerDetails({id}: Props) {
  const { bannerStore, groupStore, bannerLocationStore, mediumStore } = useStore();
  const { updateBanner, selectedBanner, loadBanner, uploadMedium, deleteMedium, setSrc, loadingInitial, uploading, uploaded, src } = bannerStore;
  const { loadGroups, returnedGroups} = groupStore;
  const { loadBannerLocations, returnedBannerLocations } = bannerLocationStore;
  const { loadMedium } = mediumStore;
  const navigate = useNavigate();

  const [banner, setBanner] = useState<BannerFormValues>(new BannerFormValues());
  const [medium, setMedium] = useState<MediumFormValues>(new MediumFormValues());

  const validationSchema = Yup.object().shape({
    bn_Title: Yup.string().required('Title required!').min(3, 'Minimum 3 characters required!'),
    bn_Title_Ar: Yup.string().required('Arabic Title required!').min(3, 'Minimum 3 characters required!'),
    gr_ID: Yup.string().required('Group required!').notOneOf(['00000000-0000-0000-0000-000000000000'],'Group required!'),
    bl_ID: Yup.string().required('Banner Location required!').notOneOf(['00000000-0000-0000-0000-000000000000'],'Banner Location required!')
  })

  useEffect(() => {
    if (id) loadBanner(id).then(banner => setBanner(new BannerFormValues(banner)))
  }, [id, loadBanner])

  useEffect(() => {
    loadMedium(selectedBanner!.md_ID).then(medium => setMedium(new MediumFormValues(medium)));
  }, [selectedBanner])
  
  useEffect(() => {
    loadGroups();
  }, [loadGroups])

  useEffect(() => {
    loadBannerLocations();
  }, [loadBannerLocations])

  function handleUploadMedium(file: Blob) {
    uploadMedium(file);
  }

  function handleDeleteMedium() {
    deleteMedium();
  }

  function handleFormSubmit(banner: BannerFormValues) {
    updateBanner(banner).then(() => navigate(`/banners/view/${banner.bn_ID}`))
  }

  

  const groupOptions = returnedGroups.map(group => (
    {name: group.gr_Title, id: group.gr_ID}
  ))

  const preselectedGroupOptions = (banner.gr_ID != null && banner.gr_ID != "00000000-0000-0000-0000-000000000000") ? (
    [{name: banner.bn_GroupTitle, id: banner.gr_ID}]
  ): []

  const bannerLocationOptions = returnedBannerLocations.map(bannerLocation => (
    {name: bannerLocation.bl_Title, id: bannerLocation.bl_ID}
  ))

  const preselectedBannerLocationOptions = (banner.bl_ID != null && banner.bl_ID != "00000000-0000-0000-0000-000000000000") ? (
    [{name: banner.bn_BannerLocationTitle, id: banner.bl_ID}]
  ): []

  

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  const mediumsrc = (src) ? src : `data:${medium.md_FileType};base64,${medium.md_Medium}`;

  return (
    <Formik
      enableReinitialize
      validationSchema = {validationSchema}
      initialValues={banner}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty, setFieldValue}) => (
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
              <label className='col-lg-2 col-form-label fw-bold fs-6'>Image</label>
              <div className='col-lg-10'>
              <PhotoUploadWidget  uploadPhoto={handleUploadMedium} deletePhoto={handleDeleteMedium} loading={uploading} uploaded={uploaded} src={mediumsrc}  height={188} aspectRatio={0.67} />
              </div>
            </div>
            
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Title</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Title'} name={'bn_Title'} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'bn_Title_Ar'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'bn_Desc'} rows={4} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'bn_Desc_Ar'} rows={4} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Banner Location</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-10 fv-row'>
                    <Multiselect
                      options={bannerLocationOptions} 
                      displayValue="name" 
                      className='form-select form-select-solid'
                      placeholder='Banner Location'
                      onSelect={(selectedlist, selectedItem) => setFieldValue("bl_ID", selectedItem.id)}
                      onRemove={(selectedlist, selectedItem) => setFieldValue("bl_ID", "00000000-0000-0000-0000-000000000000")}
                      selectionLimit='1'
                      selectedValues={preselectedBannerLocationOptions}
                      />
                      
                      <EjazTextInput type='hidden' placeholder='Banner Location' name={'bl_ID'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Group</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-10 fv-row'>
                    <Multiselect
                      options={groupOptions} 
                      displayValue="name" 
                      className='form-select form-select-solid'
                      placeholder='Group'
                      onSelect={(selectedlist, selectedItem) => setFieldValue("gr_ID", selectedItem.id)}
                      onRemove={(selectedlist, selectedItem) => setFieldValue("gr_ID", "00000000-0000-0000-0000-000000000000")}
                      selectionLimit='1'
                      selectedValues={preselectedGroupOptions}
                      />
                      
                      <EjazTextInput type='hidden' placeholder='Group' name={'gr_ID'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Publish Date</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'From'} name={'bn_PublishFrom'} type='date' /> 
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Till'} name={'bn_PublishTill'} type='date' /> 
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazCheckboxInput label={'Enable'} name={'bn_Active'} id={'Status'} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <button onClick={() => navigate(-1)} className='btn btn-light align-self-center mx-10'>
                Cancel
              </button>
              <button type='submit' className='btn btn-primary' disabled={isSubmitting || !isValid}>
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
        <BannerProperties banner={banner} />
      </form>
    )} 
    </Formik>
  )
})
