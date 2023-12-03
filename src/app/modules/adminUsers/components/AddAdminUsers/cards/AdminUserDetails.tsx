import React, {useState, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../../../../_ejaz/helpers'
import * as Yup from 'yup'
import {Formik, FormikHelpers, FormikValues, useFormik} from 'formik'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { AdminUser, AdminUserFormValues } from '../../../../../models/adminUser'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'
import AdminUserProperties from '../../Common/AdminUserProperties'
import EjazCheckboxInput from '../../../../../layout/Common/EjazCheckboxInput'
import Multiselect from 'multiselect-react-dropdown'
import { ItemFormValues } from '../../../../../models/item'
import { GenreFormValues } from '../../../../../models/genre'
import PhotoUploadWidget from '../../../../../layout/Common/imageUpload/PhotoUploadWidget'
import { MediumFormValues } from '../../../../../models/medium'
import DatePicker from "react-datepicker";





export default observer(function AdminUserDetails() {
  const { adminUserStore, mediumStore } = useStore();
  const { createAdminUser, loadAdminUser, uploadMedium, deleteMedium, setSrc, loadingInitial, uploading, uploaded, src } = adminUserStore;
  const navigate = useNavigate();
  const { id } = useParams();

  const [adminUser, setAdminUser] = useState<AdminUserFormValues>(new AdminUserFormValues());

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username required!').min(3, 'Minimum 3 characters required!'),
    us_DisplayName: Yup.string().required('Display Name required!').min(3, 'Minimum 3 characters required!'),
    email: Yup.string().required('Email required!').email('Invalid Email!'),
    us_language: Yup.string().required('Language required!'),
    us_Gender: Yup.string().required('Gender required!'),
    us_DOB: Yup.date().required('Date of Birth required!').max(new Date(), "You can't be born in the future!"),
  })

  useEffect(() => {
    if (id) loadAdminUser(id).then(adminUser => setAdminUser(new AdminUserFormValues(adminUser)))
  }, [id, loadAdminUser])

  

  function handleUploadMedium(file: Blob) {
    uploadMedium(file);
  }

  function handleDeleteMedium() {
    deleteMedium();
  }

  function handleFormSubmit(adminUser: AdminUserFormValues) {
    let newAdminUser = {
      ...adminUser
    }
    createAdminUser(newAdminUser).then(() => navigate(`../view/${newAdminUser.username}`))
  }

  function handleLanguageSelect(selectedlist: any, selectedItem: any) {
    
  }

  function handleLanguageUnselect(selectedlist: any, selectedItem: any) {
    
    
  }

  const languageOptions =   [{name: 'All', id: 'All'}, {name: 'Arabic', id: 'Arabic'}, {name: 'English', id: 'English'}]

  

  function handleGenderSelect(selectedlist: any, selectedItem: any) {
    
  }

  function handleGenderUnselect(selectedlist: any, selectedItem: any) {
    
    
  }

  const genderOptions =   [{name: 'Male', id: 'Male'}, {name: 'Female', id: 'Female'}]

  
  

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  return (
    <Formik
      enableReinitialize
      validationSchema = {validationSchema}
      initialValues={adminUser}
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
                data-bs-target='#adminUser_details'
                aria-expanded='true'
                aria-controls='adminUser_details'
              >
                <div className='card-title m-0'>
                  <h3 className='fw-bolder m-0'>Admin User Details</h3>
                </div>
              </div>

              <div id='adminUser_details' className='collapse show'>
                <div className='card-body border-top p-9'>
                  <div className='row mb-6'>
                    <label className='col-lg-2 col-form-label fw-bold fs-6'>Image</label>
                    <div className='col-lg-10'>
                      <PhotoUploadWidget uploadPhoto={handleUploadMedium} deletePhoto={handleDeleteMedium}  loading={uploading} src={src} uploaded={uploaded} height={125} aspectRatio={1} />
                    </div>
                  </div>
                  <div className='row mb-6'>
                    <label className='col-lg-2 col-form-label fw-bold fs-6'>Username</label>
                    <div className='col-lg-10'>
                      <div className='row'>
                        <div className='col-lg-12 fv-row'>
                          <EjazTextInput placeholder={'Username'} name={'username'}/>
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
                            singleSelect />
                          <EjazTextInput type='hidden' placeholder='Language' name={'us_language'} value='All' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row mb-6'>
                    <label className='col-lg-2 col-form-label fw-bold fs-6'>Role</label>
                    <div className='col-lg-10'>
                      <div className='row'>
                        <div className='col-lg-6 fv-row'>
                          <EjazCheckboxInput label={'Super Admin'} name={'us_SuperAdmin'} id={'SuperAdmin'} />
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
          </form>
        )
      }} 
    </Formik>
  )
})
