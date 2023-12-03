import {useState, useEffect} from 'react'
import * as Yup from 'yup'
import {Formik} from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { GroupFormValues } from '../../../../../models/group'
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
import categoryStore from '../../../../../stores/categoryStore'
import thematicAreaStore from '../../../../../stores/thematicAreaStore'



export default observer(function GroupDetails() {
  const { groupStore, genreStore, categoryStore, thematicAreaStore, tagStore } = useStore();
  const { createGroup, loadGroup, setSrc, loadingInitial, uploading, uploaded, src } = groupStore;
  const { loadCategories, returnedCategories} = categoryStore;
  const { loadThematicAreas, returnedThematicAreas} = thematicAreaStore;
  const { loadGenres, returnedGenres} = genreStore;
  const { loadTags, returnedTags } = tagStore;
  const { id } = useParams();
  const navigate = useNavigate();

  

  const [group, setGroup] = useState<GroupFormValues>(new GroupFormValues());



  const validationSchema = Yup.object().shape({
    gr_Title: Yup.string().required('Title required!').min(3, 'Minimum 3 characters required!'),
    gr_Title_Ar: Yup.string().required('Arabic Title required!').min(3, 'Minimum 3 characters required!')
  })

  function handleOnCancel() {
    setSrc('');
    navigate(-1);
  }

  function handleSelect(selectedlist: any, selectedItem: any) {
    group.genreItems = (group.genreItems==null)? []: group.genreItems;
    group.genreItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));

    // group.genres = (group.genres==null)? []: group.genres;
    // let newGenre = new GenreFormValues();
    // newGenre.gn_ID = selectedItem.id;
    // newGenre.gn_Title = selectedItem.name;
    // group.genres.push(new GenreFormValues(newGenre));
  }

  function handleUnselect(selectedlist: any, selectedItem: any) {
    
    group.genreItems = (group.genreItems==null)? []: group.genreItems;
    const indexOfItem = group.genreItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      group.genreItems.splice(indexOfItem, 1);
    }

    // group.genres = (group.genres==null)? []: group.genres;
    // const indexOfGenre = group.genres.findIndex((item) => {
    //   return item.gn_ID === selectedItem.id;
    // });
    // if (indexOfGenre !== -1) {
    //   group.genres.splice(indexOfItem, 1);
    // }
  }

  function handleCategorySelect(selectedlist: any, selectedItem: any) {
    group.categoryItems = (group.categoryItems==null)? []: group.categoryItems;
    group.categoryItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));
  }

  function handleCategoryUnselect(selectedlist: any, selectedItem: any) {
    
    group.categoryItems = (group.categoryItems==null)? []: group.categoryItems;
    const indexOfItem = group.categoryItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      group.categoryItems.splice(indexOfItem, 1);
    }
  }

  function handleTagSelect(selectedlist: any, selectedItem: any) {
    group.tagItems = (group.tagItems==null)? []: group.tagItems;
    group.tagItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));
  }

  function handleTagUnselect(selectedlist: any, selectedItem: any) {
    
    group.tagItems = (group.tagItems==null)? []: group.tagItems;
    const indexOfItem = group.tagItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      group.tagItems.splice(indexOfItem, 1);
    }
  }

  function handleThematicAreaSelect(selectedlist: any, selectedItem: any) {
    group.thematicAreaItems = (group.thematicAreaItems==null)? []: group.thematicAreaItems;
    group.thematicAreaItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));
  }

  function handleThematicAreaUnselect(selectedlist: any, selectedItem: any) {
    
    group.thematicAreaItems = (group.thematicAreaItems==null)? []: group.thematicAreaItems;
    const indexOfItem = group.thematicAreaItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      group.thematicAreaItems.splice(indexOfItem, 1);
    }
  }

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
    let newGroup = {
      ...group
    }
    createGroup(newGroup).then(() => navigate(`../view/${newGroup.gr_ID}`))
  }

  const thematicAreaOptions = returnedThematicAreas.map(thematicArea => (
    {name: thematicArea.th_Title, id: thematicArea.th_ID}
  ))

  const categoryOptions = returnedCategories.map(category => (
    {name: category.ct_Title, id: category.ct_ID}
  ))
  
  const genreOptions = returnedGenres.map(genre => (
    {name: genre.gn_Title, id: genre.gn_ID}
  ))

  const tagOptions = returnedTags.map(tag => (
    {name: tag.tg_Title, id: tag.tg_ID}
  ))

  const languageOptions =   [{name: 'No Preference', id: 'No Preference'}, {name: 'All', id: 'All'}, {name: 'Arabic', id: 'Arabic'}, {name: 'English', id: 'English'}]

  const genderOptions =   [{name: 'No Preference', id: 'No Preference'}, {name: 'All', id: 'All'}, {name: 'Male', id: 'Male'}, {name: 'Female', id: 'Female'}]

  

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
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Category</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-10 fv-row'>
                    <Multiselect
                      options={categoryOptions} 
                      displayValue="name" 
                      className='form-select form-select-solid'
                      placeholder='Categories'
                      onSelect={handleSelect}
                      onRemove={handleUnselect}
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
                      onSelect={handleSelect}
                      onRemove={handleUnselect}
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
                      onSelect={handleSelect}
                      onRemove={handleUnselect}
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
