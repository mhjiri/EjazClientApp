import {useState, useEffect} from 'react'
import {Formik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { GenreFormValues } from '../../../../../models/genre'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import GenreProperties from '../../Common/GenreProperties'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'

interface Props {
  id: string | undefined
}

export default observer(function GenreDetails({id}: Props) {
  const { genreStore } = useStore();
  const { loadGenre, loadingInitial } = genreStore;
  const navigate = useNavigate();

  const [genre, setGenre] = useState<GenreFormValues>(new GenreFormValues());

  useEffect(() => {
    if (id) loadGenre(id).then(genre => setGenre(new GenreFormValues(genre)))
  }, [id, loadGenre])

  function handleFormSubmit(genre: GenreFormValues) {
  }

  const routeToUpdate = () =>{ 
    let path = `/genres/update/${genre.gn_ID}`;
    navigate(path);
  }

  const routeToList = () =>{ 
    let path = `/genres/list/`;
    navigate(path);
  }

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  return (
    <Formik
      enableReinitialize
      initialValues={genre}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty}) => (
      <form onSubmit={handleSubmit} noValidate className='form'>
        <div className='card mb-5 mb-xl-10'>
          <div
            className='card-header border-0 cursor-pointer'
            role='button'
            data-bs-toggle='collapse'
            data-bs-target='#genre_details'
            aria-expanded='true'
            aria-controls='genre_details'
          >
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Genre Details</h3>
            </div>
          </div>

          <div id='genre_details' className='collapse show'>
            <div className='card-body border-top p-9'>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Title</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Title'} name={'gn_Title'} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'gn_Title_Ar'}  disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'gn_Desc'} rows={4} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'gn_Desc_Ar'} rows={4} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Status'} name={'gn_Active'} value={genre.gn_Active ? 'Enabled' : 'Disbaled'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <Link to='/genres/list' className='btn btn-light align-self-center mx-10'>
                List
              </Link>
              <Link to={`/genres/update/${genre.gn_ID}`} className='btn btn-primary align-self-center'>
                Edit
              </Link>
            </div>
          </div>
        </div>
        <GenreProperties genre={genre} />
      </form>
    )} 
    </Formik>
  )
})
