import {useState, useEffect} from 'react'
import {Formik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { GroupFormValues } from '../../../../../models/group'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import GroupProperties from '../../Common/GroupProperties'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'
import genreStore from '../../../../../stores/genreStore'
import { toAbsoluteUrl } from '../../../../../../_ejaz/helpers'
import { MediumFormValues } from '../../../../../models/medium'

interface Props {
  id: string | undefined
}

export default observer(function GroupDetails({id}: Props) {
  const { groupStore, genreStore, categoryStore, thematicAreaStore, tagStore } = useStore();
  const { loadGroup, selectedGroup, loadingInitial } = groupStore;
  const { loadCategories, returnedCategories } = categoryStore;
  const { loadThematicAreas, returnedThematicAreas } = thematicAreaStore;
  const { loadGenres, returnedGenres } = genreStore;
  const { loadTags, returnedTags } = tagStore;
  const navigate = useNavigate();
  const [group, setGroup] = useState<GroupFormValues>(new GroupFormValues());
  const [medium, setMedium] = useState<MediumFormValues>(new MediumFormValues());
  //const [mediumSrc, setMediumSrc] = useState<string>('');
  const [categories, setCategories] = useState<string>('');
  const [thematicAreas, setThematicAreas] = useState<string>('');
  const [genres, setGenres] = useState<string>('');
  const [tags, setTags] = useState<string>('');

  useEffect(() => {
    
    if (id) 
    { 
      loadGroup(id).then(group => setGroup(new GroupFormValues(group)));
    } 
  }, [id, loadGroup])

  useEffect(() => {
    loadCategories();
    setCategories(selectedGroup!.categories.map(category => category.ct_Title).join(', '));
  }, [selectedGroup])

  useEffect(() => {
    loadThematicAreas();
    setThematicAreas(selectedGroup!.thematicAreas.map(thematicArea => thematicArea.th_Title).join(', '));
  }, [selectedGroup])
  
  useEffect(() => {
    loadGenres();
    setGenres(selectedGroup!.genres.map(genre => genre.gn_Title).join(', '));
  }, [selectedGroup])

  useEffect(() => {
    loadTags();
    setTags(selectedGroup!.tags.map(tag => tag.tg_Title).join(', '));
  }, [selectedGroup])
  

  function handleFormSubmit(group: GroupFormValues) {
  }

      
      

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  
  const mediumSrc = `data:${medium.md_FileType};base64,${medium.md_Medium}`;

  return (
    <Formik
      enableReinitialize
      initialValues={group}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty}) => (
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
                      <EjazTextInput placeholder={'Title'} name={'gr_Title'} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'gr_Title_Ar'}  disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'gr_Desc'} rows={4} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'gr_Desc_Ar'} rows={4} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Age</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Min'} name={'gr_AgeFrom'} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Max'} name={'gr_AgeTill'}  disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Gender</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Gender'} name={'gr_Gender'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Language</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Language'} name={'gr_Language'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Categories</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Categories'} name={'gr_Categories'} value={categories} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Thematic Areas</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Thematic Areas'} name={'gr_ThematicAreas'} value={thematicAreas} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Genres</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Genres'} name={'gr_Genres'} value={genres} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Tags</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Tags'} name={'gr_Tags'} value={tags} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Status'} name={'gr_Active'} value={group.gr_Active ? 'Enabled' : 'Disbaled'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <Link to='/groups/list' className='btn btn-light align-self-center mx-10'>
                List
              </Link>
              <Link to={`/groups/update/${group.gr_ID}`} className='btn btn-primary align-self-center'>
                Edit
              </Link>
            </div>
          </div>
        </div>
        <GroupProperties group={group} />
      </form>
    )} 
    </Formik>
  )
})

