import React, {useState, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../../../../_ejaz/helpers'
import * as Yup from 'yup'
import {Formik, FormikHelpers, FormikValues, useFormik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { TrialUser, TrialUserFormValues } from '../../../../../models/trialUser'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'
import TrialUserProperties from '../../Common/TrialUserProperties'
import EjazCheckboxInput from '../../../../../layout/Common/EjazCheckboxInput'
import Multiselect from 'multiselect-react-dropdown'
import { ItemFormValues } from '../../../../../models/item'
import { GenreFormValues } from '../../../../../models/genre'
import PhotoUploadWidget from '../../../../../layout/Common/imageUpload/PhotoUploadWidget'
import { MediumFormValues } from '../../../../../models/medium'
import DatePicker from "react-datepicker";

interface Props {
  id: string | undefined
}



export default observer(function TrialUserDetails({id}: Props) {
  const { trialUserStore, categoryStore, genreStore, tagStore, thematicAreaStore, mediumStore } = useStore();
  const { updateTrialUser, selectedTrialUser, loadTrialUser, uploadMedium, deleteMedium, setSrc, loadingInitial, uploading, uploaded, src } = trialUserStore;
  const { loadThematicAreas, returnedThematicAreas } = thematicAreaStore;
  const { loadCategories, returnedCategories} = categoryStore;
  const { loadGenres, returnedGenres } = genreStore;
  const { loadTags, returnedTags } = tagStore;
  const { loadMedium } = mediumStore;
  const navigate = useNavigate();

  const [trialUser, setTrialUser] = useState<TrialUserFormValues>(new TrialUserFormValues());
  const [medium, setMedium] = useState<MediumFormValues>(new MediumFormValues());

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username required!').min(3, 'Minimum 3 characters required!'),
    us_DisplayName: Yup.string().required('Display Name required!').min(3, 'Minimum 3 characters required!'),
    email: Yup.string().required('Email required!').email('Invalid Email!'),
    us_language: Yup.string().required('Language required!'),
    us_Gender: Yup.string().required('Gender required!'),
    us_DOB: Yup.date().required('Date of Birth required!').max(new Date(), "You can't be born in the future!"),
  })

  useEffect(() => {
    if (id) loadTrialUser(id).then(trialUser => setTrialUser(new TrialUserFormValues(trialUser)))
  }, [id, loadTrialUser])

  useEffect(() => {
    loadCategories();
  }, [loadCategories])
  
  useEffect(() => {
    loadGenres();
  }, [loadGenres])

  useEffect(() => {
    loadTags();
  }, [loadTags])

  useEffect(() => {
    loadThematicAreas();
  }, [loadThematicAreas])

  

  useEffect(() => {
    loadMedium(selectedTrialUser!.md_ID).then(medium => setMedium(new MediumFormValues(medium)));
  }, [selectedTrialUser])
  

  function handleUploadMedium(file: Blob) {
    uploadMedium(file);
  }

  function handleDeleteMedium() {
    deleteMedium();
  }

  function handleFormSubmit(trialUser: TrialUserFormValues) {
    updateTrialUser(trialUser).then(() => navigate(`/trialUsers/view/${trialUser.username}`))
  }

  function handleSelect(selectedlist: any, selectedItem: any) {
    trialUser.genreItems = (trialUser.genreItems==null)? []: trialUser.genreItems;
    trialUser.genreItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));
  }

  function handleUnselect(selectedlist: any, selectedItem: any) {
    
    trialUser.genreItems = (trialUser.genreItems==null)? []: trialUser.genreItems;
    const indexOfItem = trialUser.genreItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      trialUser.genreItems.splice(indexOfItem, 1);
    }
  }

  

  function handleCategorySelect(selectedlist: any, selectedItem: any) {
    trialUser.categoryItems = (trialUser.categoryItems==null)? []: trialUser.categoryItems;
    trialUser.categoryItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));
  }

  function handleCategoryUnselect(selectedlist: any, selectedItem: any) {
    
    trialUser.categoryItems = (trialUser.categoryItems==null)? []: trialUser.categoryItems;
    const indexOfItem = trialUser.categoryItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      trialUser.categoryItems.splice(indexOfItem, 1);
    }
  }

  function handleTagSelect(selectedlist: any, selectedItem: any) {
    trialUser.tagItems = (trialUser.tagItems==null)? []: trialUser.tagItems;
    trialUser.tagItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));
  }

  function handleTagUnselect(selectedlist: any, selectedItem: any) {
    
    trialUser.tagItems = (trialUser.tagItems==null)? []: trialUser.tagItems;
    const indexOfItem = trialUser.tagItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      trialUser.tagItems.splice(indexOfItem, 1);
    }
  }

  function handleThematicAreaSelect(selectedlist: any, selectedItem: any) {
    trialUser.thematicAreaItems = (trialUser.thematicAreaItems==null)? []: trialUser.thematicAreaItems;
    trialUser.thematicAreaItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));
  }

  function handleThematicAreaUnselect(selectedlist: any, selectedItem: any) {
    
    trialUser.thematicAreaItems = (trialUser.thematicAreaItems==null)? []: trialUser.thematicAreaItems;
    const indexOfItem = trialUser.thematicAreaItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      trialUser.thematicAreaItems.splice(indexOfItem, 1);
    }
  }

  const categoryOptions = returnedCategories.map(category => (
    {name: category.ct_Title, id: category.ct_ID}
  ))

  const genreOptions = returnedGenres.map(genre => (
    {name: genre.gn_Title, id: genre.gn_ID}
  ))

  const tagOptions = returnedTags.map(tag => (
    {name: tag.tg_Title, id: tag.tg_ID}
  ))

  const thematicAreaOptions = returnedThematicAreas.map(thematicArea => (
    {name: thematicArea.th_Title, id: thematicArea.th_ID}
  ))

  function handleLanguageSelect(selectedlist: any, selectedItem: any) {
    
  }

  function handleLanguageUnselect(selectedlist: any, selectedItem: any) {
    
    
  }

  function handleGenderSelect(selectedlist: any, selectedItem: any) {
    
  }

  function handleGenderUnselect(selectedlist: any, selectedItem: any) {
    
    
  }

  const languageOptions =   [{name: 'All', id: 'All'}, {name: 'Arabic', id: 'Arabic'}, {name: 'English', id: 'English'}]

  const preselectedLanguageOptions = (trialUser.us_language != null) ? 
    [{name: trialUser.us_language, id: trialUser.us_language}]
  : []

  const genderOptions =   [{name: 'Male', id: 'Male'}, {name: 'Female', id: 'Female'}]

  const preselectedGenderOptions = (trialUser.us_Gender != null) ? 
    [{name: trialUser.us_Gender, id: trialUser.us_Gender}]
  : []

  const preselectedCategoryOptions = (trialUser.categories != null) ? trialUser.categories.map(category => (
    {name: category.ct_Title, id: category.ct_ID}
  )): []
  
  const preselectedGenreOptions = (trialUser.genres != null) ? trialUser.genres.map(genre => (
    {name: genre.gn_Title, id: genre.gn_ID}
  )): []

  const preselectedTagOptions = (trialUser.tags != null) ? trialUser.tags.map(tag => (
    {name: tag.tg_Title, id: tag.tg_ID}
  )): []

  const preselectedThematicAreaOptions = (trialUser.thematicAreas != null) ? trialUser.thematicAreas.map(thematicArea => (
    {name: thematicArea.th_Title, id: thematicArea.th_ID}
  )): []
  

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  const mediumsrc = (src) ? src : `data:${medium.md_FileType};base64,${medium.md_Medium}`;

  return (
    <Formik
      enableReinitialize
      validationSchema = {validationSchema}
      initialValues={trialUser}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty, setFieldValue}) => {
        return (
          <form onSubmit={handleSubmit} noValidate className='form'>
            <div className='card mb-5 mb-xl-10'>
              <div
                className='card-header border-0 cursor-pointer'
                role='button'
                data-bs-toggle='collapse'
                data-bs-target='#trialUser_details'
                aria-expanded='true'
                aria-controls='trialUser_details'
              >
                <div className='card-title m-0'>
                  <h3 className='fw-bolder m-0'>Trial User Details</h3>
                </div>
              </div>

              <div id='trialUser_details' className='collapse show'>
                <div className='card-body border-top p-9'>
                  <div className='row mb-6'>
                    <label className='col-lg-2 col-form-label fw-bold fs-6'>Image</label>
                    <div className='col-lg-10'>
                      <PhotoUploadWidget uploadPhoto={handleUploadMedium} deletePhoto={handleDeleteMedium} loading={uploading} uploaded={uploaded} src={mediumsrc} height={125} aspectRatio={1} />
                    </div>
                  </div>
                  <div className='row mb-6'>
                    <label className='col-lg-2 col-form-label fw-bold fs-6'>Username</label>
                    <div className='col-lg-10'>
                      <div className='row'>
                        <div className='col-lg-12 fv-row'>
                          <EjazTextInput placeholder={'Username'} name={'username'} disabled={true} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row mb-6'>
                    <label className='col-lg-2 col-form-label fw-bold fs-6'>Email</label>
                    <div className='col-lg-10'>
                      <div className='row'>
                        <div className='col-lg-12 fv-row'>
                          <EjazTextInput placeholder={'Email'} name={'email'} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row mb-6'>
                    <label className='col-lg-2 col-form-label fw-bold fs-6'>Phone Number</label>
                    <div className='col-lg-10'>
                      <div className='row'>
                        <div className='col-lg-12 fv-row'>
                          <EjazTextInput placeholder={'Phone Number'} name={'phoneNumber'} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row mb-6'>
                    <label className='col-lg-2 col-form-label fw-bold fs-6'>Display Name</label>
                    <div className='col-lg-10'>
                      <div className='row'>
                        <div className='col-lg-12 fv-row'>
                          <EjazTextInput placeholder={'Display Name'} name={'us_DisplayName'} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row mb-6'>
                    <label className='col-lg-2 col-form-label fw-bold fs-6'>Password</label>
                    <div className='col-lg-10'>
                      <div className='row'>
                        <div className='col-lg-12 fv-row'>
                          <EjazTextInput placeholder={'Password'} name={'password'} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row mb-6'>
                    <label className='col-lg-2 col-form-label fw-bold fs-6'>Date of Birth</label>
                    <div className='col-lg-10'>
                      <div className='row'>
                        <div className='col-lg-12 fv-row'>
                          <EjazTextInput placeholder={'Date of Birth'} name={'us_DOB'} type='date' /> 
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row mb-6'>
                    <label className='col-lg-2 col-form-label fw-bold fs-6'>Gender</label>
                    <div className='col-lg-10'>
                      <div className='row'>
                        <div className='col-lg-6 fv-row'>
                          <Multiselect
                            options={genderOptions}
                            displayValue="name"
                            className='form-select form-select-solid'
                            placeholder='Gender'
                            onSelect={(selectedlist, selectedItem) => setFieldValue("us_Gender", selectedItem.id)}
                            selectedValues={preselectedGenderOptions}
                            singleSelect />
                          <EjazTextInput type='hidden' placeholder='Gender' name={'us_Gender'} value='All' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row mb-6'>
                    <label className='col-lg-2 col-form-label fw-bold fs-6'>Language</label>
                    <div className='col-lg-10'>
                      <div className='row'>
                        <div className='col-lg-6 fv-row'>
                          <Multiselect
                            options={languageOptions}
                            displayValue="name"
                            className='form-select form-select-solid'
                            placeholder='Language'
                            onSelect={(selectedlist, selectedItem) => setFieldValue("us_language", selectedItem.id)}
                            selectedValues={preselectedLanguageOptions}
                            singleSelect />
                          <EjazTextInput type='hidden' placeholder='Language' name={'us_language'} value='All' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Thematic Areas</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-10 fv-row'>
                    <Multiselect
                      options={thematicAreaOptions} 
                      displayValue="name" 
                      className='form-select form-select-solid'
                      placeholder='Thematic Areas'
                      onSelect={handleThematicAreaSelect}
                      onRemove={handleThematicAreaUnselect}
                      selectedValues={preselectedThematicAreaOptions}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Categories</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-10 fv-row'>
                    <Multiselect
                      options={categoryOptions} 
                      displayValue="name" 
                      className='form-select form-select-solid'
                      placeholder='Categories'
                      onSelect={handleCategorySelect}
                      onRemove={handleCategoryUnselect}
                      selectedValues={preselectedCategoryOptions}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Genres</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-10 fv-row'>
                    <Multiselect
                      options={genreOptions} 
                      displayValue="name" 
                      className='form-select form-select-solid'
                      placeholder='Genres'
                      onSelect={handleSelect}
                      onRemove={handleUnselect}
                      selectedValues={preselectedGenreOptions}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Tags</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-10 fv-row'>
                    <Multiselect
                      options={tagOptions} 
                      displayValue="name" 
                      className='form-select form-select-solid'
                      placeholder='Tags'
                      onSelect={handleTagSelect}
                      onRemove={handleTagUnselect}
                      selectedValues={preselectedTagOptions}
                      />
                    </div>
                  </div>
                </div>
              </div>
                  <div className='row mb-6'>
                    <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
                    <div className='col-lg-10'>
                      <div className='row'>
                        <div className='col-lg-6 fv-row'>
                          <EjazCheckboxInput label={'Enable'} name={'us_Active'} id={'Status'} />
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
                      <span className='indicator-progress' style={{ display: 'block' }}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <TrialUserProperties trialUser={trialUser} />
          </form>
        )
      }} 
    </Formik>
  )
})
