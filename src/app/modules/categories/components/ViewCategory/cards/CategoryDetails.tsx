import {useState, useEffect} from 'react'
import {Formik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { CategoryFormValues } from '../../../../../models/category'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import CategoryProperties from '../../Common/CategoryProperties'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'
import { toAbsoluteUrl } from '../../../../../../_ejaz/helpers'
import { MediumFormValues } from '../../../../../models/medium'

interface Props {
  id: string | undefined
}

export default observer(function CategoryDetails({id}: Props) {
  const { categoryStore, tagStore, mediumStore } = useStore();
  const { loadCategory, loadCategories, selectedCategory, loadingInitial } = categoryStore;
  const { loadTags, setPagingParams, setOrderParams, setFilterParams, pagination, returnedTags, axiosParams } = tagStore;
  const { loadMedium } = mediumStore;
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryFormValues>(new CategoryFormValues());
  const [medium, setMedium] = useState<MediumFormValues>(new MediumFormValues());
  //const [mediumSrc, setMediumSrc] = useState<string>('');
  const [tags, setTag] = useState<string>('');
  const [classification, setClassification] = useState<string>('');
  const [classification_Ar, setClassification_Ar] = useState<string>('');

  useEffect(() => {
    
    if (id) 
    { 
      loadCategory(id).then(category => setCategory(new CategoryFormValues(category)));
    } 
  }, [id, loadCategory])

  useEffect(() => {
    loadTags();
    setTag(selectedCategory!.tags.map(tag => tag.tg_Title).join(', '));
  }, [selectedCategory])

  useEffect(() => {
    //loadCategories();
    setClassification(selectedCategory!.classification);
    setClassification_Ar(selectedCategory!.classification_Ar);
  }, [selectedCategory])

  useEffect(() => {
    loadMedium(selectedCategory!.md_ID).then(medium => setMedium(new MediumFormValues(medium)));
  }, [selectedCategory])
  

  function handleFormSubmit(category: CategoryFormValues) {
  }

      
      

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  
  const mediumSrc = `data:${medium.md_FileType};base64,${medium.md_Medium}`;

  return (
    <Formik
      enableReinitialize
      initialValues={category}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty}) => (
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
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Name</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Name'} name={'ct_Name'} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'اسم'} name={'ct_Name_Ar'}  disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
            
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Title</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Title'} name={'ct_Title'} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'ct_Title_Ar'}  disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Classification</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Classification'} name={'ct_Classification'} value={classification} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'تصنيف'} name={'ct_Classification_Ar'} value={classification_Ar}  disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'ct_Desc'} rows={4} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'ct_Desc_Ar'} rows={4} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Tags</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Tags'} name={'ct_Tags'} value={tags} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Status'} name={'ct_Active'} value={category.ct_Active ? 'Enabled' : 'Disbaled'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <Link to='/categories/list' className='btn btn-light align-self-center mx-10'>
                List
              </Link>
              <Link to={`/categories/update/${category.ct_ID}`} className='btn btn-primary align-self-center'>
                Edit
              </Link>
            </div>
          </div>
        </div>
        <CategoryProperties category={category} />
      </form>
    )} 
    </Formik>
  )
})

