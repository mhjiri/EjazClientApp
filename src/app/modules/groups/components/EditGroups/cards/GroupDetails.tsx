import React, {useState, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../../../../_ejaz/helpers'
import * as Yup from 'yup'
import {Formik, FormikHelpers, FormikValues, useFormik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Group, GroupFormValues } from '../../../../../models/group'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'
import GroupProperties from '../../Common/GroupProperties'
import EjazCheckboxInput from '../../../../../layout/Common/EjazCheckboxInput'
import Multiselect from 'multiselect-react-dropdown'
import genreStore from '../../../../../stores/genreStore'
import { ItemFormValues } from '../../../../../models/item'
import { GenreFormValues } from '../../../../../models/genre'
import PhotoUploadWidget from '../../../../../layout/Common/imageUpload/PhotoUploadWidget'
import { MediumFormValues } from '../../../../../models/medium'
import { CategoryFormValues } from '../../../../../models/category'
import { ThematicAreaFormValues } from '../../../../../models/thematicArea'
import { TagFormValues } from '../../../../../models/tag'

interface Props {
  id: string | undefined
}



export default observer(function GroupDetails({id}: Props) {
  const { groupStore, genreStore, categoryStore, thematicAreaStore, tagStore} = useStore();
  const { updateGroup, selectedGroup, loadGroup, loadingInitial, uploading, uploaded, src } = groupStore;
  const { loadCategories, returnedCategories } = categoryStore;
  const { loadThematicAreas, returnedThematicAreas } = thematicAreaStore;
  const { loadGenres, returnedGenres } = genreStore;
  const { loadTags, returnedTags } = tagStore;
  const navigate = useNavigate();

  const [group, setGroup] = useState<GroupFormValues>(new GroupFormValues());

  const validationSchema = Yup.object().shape({
    gr_Title: Yup.string().required('Title required!').min(3, 'Minimum 3 characters required!'),
    gr_Title_Ar: Yup.string().required('Arabic Title required!').min(3, 'Minimum 3 characters required!')
  })

  useEffect(() => {
    if (id) loadGroup(id).then(group => setGroup(new GroupFormValues(group)))
  }, [id, loadGroup])

  useEffect(() => {
    loadGenres();
  }, [loadGenres])

  useEffect(() => {
    loadCategories();
  }, [loadCategories])

  useEffect(() => {
    loadThematicAreas();
  }, [loadThematicAreas])

  useEffect(() => {
    loadTags();
  }, [loadTags])


  function handleFormSubmit(group: GroupFormValues) {
    updateGroup(group).then(() => navigate(`/groups/view/${group.gr_ID}`))
  }

  function handleCategorySelect(selectedlist: any, selectedItem: any) {
    group.categoryItems = (group.categoryItems==null)? []: group.categoryItems;
    group.categoryItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));

    group.categories = (group.categories==null)? []: group.categories;
    let newCategory = new CategoryFormValues();
    newCategory.ct_ID = selectedItem.id;
    newCategory.ct_Title = selectedItem.name;
    group.categories.push(new CategoryFormValues(newCategory));
  }

  function handleCategoryUnselect(selectedlist: any, selectedItem: any) {
    
    group.categoryItems = (group.categoryItems==null)? []: group.categoryItems;
    const indexOfItem = group.categoryItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      group.categoryItems.splice(indexOfItem, 1);
    }

    group.categories = (group.categories==null)? []: group.categories;
    const indexOfCategory = group.categories.findIndex((item) => {
      return item.ct_ID === selectedItem.id;
    });
    if (indexOfCategory !== -1) {
      group.categories.splice(indexOfItem, 1);
    }
  }

  function handleThematicAreaSelect(selectedlist: any, selectedItem: any) {
    group.thematicAreaItems = (group.thematicAreaItems==null)? []: group.thematicAreaItems;
    group.thematicAreaItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));

    group.thematicAreas = (group.thematicAreas==null)? []: group.thematicAreas;
    let newThematicArea = new ThematicAreaFormValues();
    newThematicArea.th_ID = selectedItem.id;
    newThematicArea.th_Title = selectedItem.name;
    group.thematicAreas.push(new ThematicAreaFormValues(newThematicArea));
  }

  function handleThematicAreaUnselect(selectedlist: any, selectedItem: any) {
    
    group.thematicAreaItems = (group.thematicAreaItems==null)? []: group.thematicAreaItems;
    const indexOfItem = group.thematicAreaItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      group.thematicAreaItems.splice(indexOfItem, 1);
    }

    group.thematicAreas = (group.thematicAreas==null)? []: group.thematicAreas;
    const indexOfThematicArea = group.thematicAreas.findIndex((item) => {
      return item.th_ID === selectedItem.id;
    });
    if (indexOfThematicArea !== -1) {
      group.thematicAreas.splice(indexOfItem, 1);
    }
  }

  function handleSelect(selectedlist: any, selectedItem: any) {
    group.genreItems = (group.genreItems==null)? []: group.genreItems;
    group.genreItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));

    group.genres = (group.genres==null)? []: group.genres;
    let newGenre = new GenreFormValues();
    newGenre.gn_ID = selectedItem.id;
    newGenre.gn_Title = selectedItem.name;
    group.genres.push(new GenreFormValues(newGenre));
  }

  function handleUnselect(selectedlist: any, selectedItem: any) {
    
    group.genreItems = (group.genreItems==null)? []: group.genreItems;
    const indexOfItem = group.genreItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      group.genreItems.splice(indexOfItem, 1);
    }

    group.genres = (group.genres==null)? []: group.genres;
    const indexOfGenre = group.genres.findIndex((item) => {
      return item.gn_ID === selectedItem.id;
    });
    if (indexOfGenre !== -1) {
      group.genres.splice(indexOfItem, 1);
    }
  }

  function handleTagSelect(selectedlist: any, selectedItem: any) {
    group.tagItems = (group.tagItems==null)? []: group.tagItems;
    group.tagItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));

    group.tags = (group.tags==null)? []: group.tags;
    let newTag = new TagFormValues();
    newTag.tg_ID = selectedItem.id;
    newTag.tg_Title = selectedItem.name;
    group.tags.push(new TagFormValues(newTag));
  }

  function handleTagUnselect(selectedlist: any, selectedItem: any) {
    
    group.tagItems = (group.tagItems==null)? []: group.tagItems;
    const indexOfItem = group.tagItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      group.tagItems.splice(indexOfItem, 1);
    }

    group.tags = (group.tags==null)? []: group.tags;
    const indexOfTag = group.tags.findIndex((item) => {
      return item.tg_ID === selectedItem.id;
    });
    if (indexOfTag !== -1) {
      group.tags.splice(indexOfItem, 1);
    }
  }

  const genreOptions = returnedGenres.map(genre => (
    {name: genre.gn_Title, id: genre.gn_ID}
  ))

  const preselectedGenreOptions = (group.genres != null) ? group.genres.map(genre => (
    {name: genre.gn_Title, id: genre.gn_ID}
  )): []

  const categoryOptions = returnedCategories.map(category => (
    {name: category.ct_Title, id: category.ct_ID}
  ))

  const preselectedCategoryOptions = (group.categories != null) ? group.categories.map(category => (
    {name: category.ct_Title, id: category.ct_ID}
  )): []

  const thematicAreaOptions = returnedThematicAreas.map(thematicArea => (
    {name: thematicArea.th_Title, id: thematicArea.th_ID}
  ))

  const preselectedThematicAreaOptions = (group.thematicAreas != null) ? group.thematicAreas.map(thematicArea => (
    {name: thematicArea.th_Title, id: thematicArea.th_ID}
  )): []

  const tagOptions = returnedTags.map(tag => (
    {name: tag.tg_Title, id: tag.tg_ID}
  ))

  const preselectedTagOptions = (group.tags != null) ? group.tags.map(tag => (
    {name: tag.tg_Title, id: tag.tg_ID}
  )): []

  

  const languageOptions =   [{name: 'No Preference', id: 'No Preference'}, {name: 'All', id: 'All'}, {name: 'Arabic', id: 'Arabic'}, {name: 'English', id: 'English'}]

  const preselectedLanguageOptions = (group.gr_Language != null) ? 
    [{name: group.gr_Language, id: group.gr_Language}]
  : []
  
  const genderOptions =   [{name: 'No Preference', id: 'No Preference'}, {name: 'All', id: 'All'}, {name: 'Male', id: 'Male'}, {name: 'Female', id: 'Female'}]

  const preselectedGenderOptions = (group.gr_Gender != null) ? 
    [{name: group.gr_Gender, id: group.gr_Gender}]
  : []


  

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  return (
    <Formik
      enableReinitialize
      validationSchema = {validationSchema}
      initialValues={group}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty, setFieldValue}) => (
      <form onSubmit={handleSubmit} noValidate className='form'>
        <div className='card mb-5 mb-xl-10'>
          <div
            className='card-header border-0 cursor-pointer'
            role='button'
            data-bs-toggle='collapse'
            data-bs-target='#group_details'
            aria-expanded='true'
            aria-controls='group_details'
          >
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Group Details</h3>
            </div>
          </div>

          <div id='group_details' className='collapse show'>
            <div className='card-body border-top p-9'>
            
            
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Title</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Title'} name={'gr_Title'} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'gr_Title_Ar'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'gr_Desc'} rows={4} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'gr_Desc_Ar'} rows={4} />
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
                      onSelect={(selectedlist, selectedItem) => setFieldValue("gr_Language", selectedItem.id)}
                      selectedValues={preselectedLanguageOptions}
                      singleSelect
                      />
                      <EjazTextInput type='hidden' placeholder='Language' name={'gr_Language'} value='All' />
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
                      onSelect={(selectedlist, selectedItem) => setFieldValue("gr_Gender", selectedItem.id)}
                      selectedValues={preselectedGenderOptions}
                      singleSelect
                      />
                      <EjazTextInput type='hidden' placeholder='Gender' name={'gr_Gender'} value='All' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Age</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Min'} name={'gr_AgeFrom'} type="number" />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Max'} name={'gr_AgeTill'} type="number" />
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
                      <EjazCheckboxInput label={'Enable'} name={'gr_Active'} id={'Status'} />
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
        <GroupProperties group={group} />
      </form>
    )} 
    </Formik>
  )
})
