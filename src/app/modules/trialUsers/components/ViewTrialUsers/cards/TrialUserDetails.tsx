import {useState, useEffect} from 'react'
import {Formik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { TrialUserFormValues } from '../../../../../models/trialUser'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import TrialUserProperties from '../../Common/TrialUserProperties'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'
import genreStore from '../../../../../stores/genreStore'
import { toAbsoluteUrl } from '../../../../../../_ejaz/helpers'
import { MediumFormValues } from '../../../../../models/medium'

interface Props {
  id: string | undefined
}

export default observer(function TrialUserDetails({id}: Props) {
  const { trialUserStore, categoryStore, genreStore, tagStore, thematicAreaStore, mediumStore } = useStore();
  const { loadTrialUser, deleteTrialUser, selectedTrialUser, loadingInitial } = trialUserStore;
  const { loadThematicAreas, } = thematicAreaStore;
  const { loadCategories } = categoryStore;
  const { loadGenres } = genreStore;
  const { loadTags } = tagStore;
  const { loadMedium } = mediumStore;
  const navigate = useNavigate();
  const [trialUser, setTrialUser] = useState<TrialUserFormValues>(new TrialUserFormValues());
  const [medium, setMedium] = useState<MediumFormValues>(new MediumFormValues());
  const [categories, setCategories] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [thematicAreas, setThematicAreas] = useState<string>('');
  const [genres, setGenres] = useState<string>('');
  const [confirm, setConfirm] = useState<number>(0);

  useEffect(() => {
    
    if (id) 
    { 
      loadTrialUser(id).then((trialUser: TrialUserFormValues | undefined) => setTrialUser(new TrialUserFormValues(trialUser)));
    } 
  }, [id, loadTrialUser])

  useEffect(() => {
    loadMedium(selectedTrialUser!.md_ID).then(medium => setMedium(new MediumFormValues(medium)));
  }, [selectedTrialUser])

  useEffect(() => {
    loadCategories();
    setCategories(selectedTrialUser!.categories.map(category => category.ct_Title).join(', '));
  }, [loadCategories, selectedTrialUser])
  
  

  useEffect(() => {
    loadTags();
    setTags(selectedTrialUser!.tags.map(tag => tag.tg_Title).join(', '));
  }, [loadTags, selectedTrialUser])

  useEffect(() => {
    loadThematicAreas();
    setThematicAreas(selectedTrialUser!.thematicAreas.map(thematicArea => thematicArea.th_Title).join(', '));
  }, [loadThematicAreas, selectedTrialUser])
  
  useEffect(() => {
    loadGenres();
    setGenres(selectedTrialUser!.genres.map(genre => genre.gn_Title).join(', '));
  }, [loadGenres, selectedTrialUser])
  

  function handleFormSubmit(trialUser: TrialUserFormValues) {
  }

  function handleDelete() {
    setConfirm(0)
    if(id) deleteTrialUser(id).then(() => navigate(`/trialUsers/list/`))
  }

      
      

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  
  const mediumSrc = `data:${medium.md_FileType};base64,${medium.md_Medium}`;

  return (
    <Formik
      enableReinitialize
      initialValues={trialUser}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty}) => (
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
                      <EjazTextInput placeholder={'Email'} name={'email'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Phone Number</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Phone Number'} name={'phoneNumber'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Display Name</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Display Name'} name={'us_DisplayName'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Date of Birth</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Date of Birth'} name={'us_DOB'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Gender</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Gender'} name={'us_Gender'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Language</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Language'} name={'us_language'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Categories</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Categories'} name={'bk_Categories'} value={categories} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Thematic Areas</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Thematic Areas'} name={'bk_ThematicAreas'} value={thematicAreas} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Genres</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Genres'} name={'bk_Genres'} value={genres} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Tags</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Tags'} name={'bk_Tags'} value={tags} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Status'} name={'us_Active'} value={trialUser.us_Active ? 'Enabled' : 'Disbaled'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              {(confirm == 1) ? (
              <button onClick={() => handleDelete()} className='btn btn-danger align-self-center mx-10'>
                Confirm to Delete User
              </button>
              ) : 
              (
              <button onClick={() => setConfirm(1)} className='btn btn-danger align-self-center mx-10'>
                Delete User
              </button>
              )}
              <Link to='/trialUsers/list' className='btn btn-light align-self-center mx-10'>
                List
              </Link>
              <Link to={`/trialUsers/update/${trialUser.username}`} className='btn btn-primary align-self-center'>
                Edit
              </Link>
            </div>
          </div>
        </div>
        <TrialUserProperties trialUser={trialUser} />
      </form>
    )} 
    </Formik>
  )
})

