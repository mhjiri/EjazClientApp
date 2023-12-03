import React, {useState, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../../../../_ejaz/helpers'
import * as Yup from 'yup'
import {Formik, FormikHelpers, FormikValues, useFormik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Category, CategoryFormValues } from '../../../../../models/category'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'
import CategoryProperties from '../../Common/CategoryProperties'
import EjazCheckboxInput from '../../../../../layout/Common/EjazCheckboxInput'
import Multiselect from 'multiselect-react-dropdown'
import { ItemFormValues } from '../../../../../models/item'
import { TagFormValues } from '../../../../../models/tag'
import PhotoUploadWidget from '../../../../../layout/Common/imageUpload/PhotoUploadWidget'
import { MediumFormValues } from '../../../../../models/medium'
import agent from '../../../../../api/agent'

interface Props {
  id: string | undefined
}



export default observer(function CategoryDetails({id}: Props) {
  const { categoryStore, tagStore, mediumStore } = useStore();
  const { updateCategory, selectedCategory, loadCategory, loadCategories, loadClassifications, uploadMedium, deleteMedium, setSrc, loadingInitial, uploading, uploaded, src, returnedCategories, returnedClassifications } = categoryStore;
  const { loadTags, setPagingParams, setOrderParams, setFilterParams, pagination, returnedTags, axiosParams } = tagStore;
  const { loadMedium } = mediumStore;
  const navigate = useNavigate();

  const [category, setCategory] = useState<CategoryFormValues>(new CategoryFormValues());
  const [medium, setMedium] = useState<MediumFormValues>(new MediumFormValues());
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const validationSchema = Yup.object().shape({
    ct_Name: Yup.string().required('Name required!').min(3, 'Minimum 3 characters required!'),
    ct_Name_Ar: Yup.string().required('Arabic Name required!').min(3, 'Minimum 3 characters required!'),
    ct_Title: Yup.string().required('Title required!').min(3, 'Minimum 3 characters required!'),
    ct_Title_Ar: Yup.string().required('Arabic Title required!').min(3, 'Minimum 3 characters required!')
  })

  useEffect(() => {
    loadClassifications();
  }, [])

  useEffect(() => {
    loadTags();
  }, [loadTags])

  useEffect(() => {
    loadMedium(selectedCategory!.md_ID).then(medium => setMedium(new MediumFormValues(medium)));
  }, [selectedCategory])

  useEffect(() => {
    if (id) loadCategory(id).then(category => setCategory(new CategoryFormValues(category)));
  }, [id, loadCategory])

 

  function handleUploadMedium(file: Blob) {
    uploadMedium(file);
  }

  function handleDeleteMedium() {
    deleteMedium();
  }

  function handleFormSubmit(category: CategoryFormValues) {
    updateCategory(category).then(() => navigate(`/categories/view/${category.ct_ID}`))
  }

  function handleSelect(selectedlist: any, selectedItem: any) {
    category.tagItems = (category.tagItems==null)? []: category.tagItems;
    category.tagItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));

    category.tags = (category.tags==null)? []: category.tags;
    let newTag = new TagFormValues();
    newTag.tg_ID = selectedItem.id;
    newTag.tg_Title = selectedItem.name;
    category.tags.push(new TagFormValues(newTag));
  }

  function handleUnselect(selectedlist: any, selectedItem: any) {
    
    category.tagItems = (category.tagItems==null)? []: category.tagItems;
    const indexOfItem = category.tagItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      category.tagItems.splice(indexOfItem, 1);
    }

    category.tags = (category.tags==null)? []: category.tags;
    const indexOfTag = category.tags.findIndex((item) => {
      return item.tg_ID === selectedItem.id;
    });
    if (indexOfTag !== -1) {
      category.tags.splice(indexOfItem, 1);
    }
  }

  const categoryOptions = returnedClassifications.map(category => (
    {name: category.ct_Title, id: category.ct_ID}
  ))
  
  const preselectedCategoryOptions = (category.classificationID != null && category.classificationID != "00000000-0000-0000-0000-000000000000") ? (
    [{name: category.classification, id: category.ct_ID}]
  ): []

  const tagOptions = returnedTags.map(tag => (
    {name: tag.tg_Title, id: tag.tg_ID}
  ))

  const preselectedTagOptions = (category.tags != null) ? category.tags.map(tag => (
    {name: tag.tg_Title, id: tag.tg_ID}
  )): []
  

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  const mediumsrc = (src) ? src : `data:${medium.md_FileType};base64,${medium.md_Medium}`;

  
  

  return (
    <Formik
      enableReinitialize
      validationSchema = {validationSchema}
      initialValues={category}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty, setFieldValue}) => (
      <form onSubmit={handleSubmit} noValidate className='form'>
        <div className='card mb-5 mb-xl-10'>
          <div
            className='card-header border-0 cursor-pointer'
            role='button'
            data-bs-toggle='collapse'
            data-bs-target='#category_details'
            aria-expanded='true'
            aria-controls='category_details'
          >
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Category Details</h3>
            </div>
          </div>

          <div id='category_details' className='collapse show'>
            <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-2 col-form-label fw-bold fs-6'>Image</label>
              <div className='col-lg-10'>
              <PhotoUploadWidget  uploadPhoto={handleUploadMedium} deletePhoto={handleDeleteMedium} loading={uploading} uploaded={uploaded} src={mediumsrc} height={125} aspectRatio={1} />
              </div>
            </div>
              
            <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Name</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Name'} name={'ct_Name'} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'اسم'} name={'ct_Name_Ar'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Title</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Title'} name={'ct_Title'} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'ct_Title_Ar'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'ct_Desc'} rows={4} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'ct_Desc_Ar'} rows={4} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Classification</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-10 fv-row'>
                    <Multiselect
                      options={categoryOptions} 
                      displayValue="name" 
                      className='form-select form-select-solid'
                      placeholder='Classification'
                      onSelect={(selectedlist, selectedItem) => setFieldValue("classificationID", selectedItem.id)}
                      onRemove={(selectedlist, selectedItem) => setFieldValue("classificationID", "00000000-0000-0000-0000-000000000000")}
                      selectionLimit='1'
                      selectedValues={preselectedCategoryOptions}
                      />
                      
                      <EjazTextInput type='hidden' placeholder='Classification' name={'classificationID'} />
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
                      onSelect={handleSelect}
                      onRemove={handleUnselect}
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
                      <EjazCheckboxInput label={'Enable'} name={'ct_Active'} id={'Status'} />
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
        <CategoryProperties category={category} />
      </form>
    )} 
    </Formik>
  )
})
