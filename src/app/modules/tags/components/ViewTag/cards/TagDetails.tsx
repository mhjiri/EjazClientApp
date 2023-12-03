import {useState, useEffect} from 'react'
import {Formik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { TagFormValues } from '../../../../../models/tag'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import TagProperties from '../../Common/TagProperties'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'

interface Props {
  id: string | undefined
}

export default observer(function TagDetails({id}: Props) {
  const { tagStore } = useStore();
  const { loadTag, loadingInitial } = tagStore;
  const navigate = useNavigate();

  const [tag, setTag] = useState<TagFormValues>(new TagFormValues());

  useEffect(() => {
    if (id) loadTag(id).then(tag => setTag(new TagFormValues(tag)))
  }, [id, loadTag])

  function handleFormSubmit(tag: TagFormValues) {
  }

  const routeToUpdate = () =>{ 
    let path = `/tags/update/${tag.tg_ID}`;
    navigate(path);
  }

  const routeToList = () =>{ 
    let path = `/tags/list/`;
    navigate(path);
  }

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  return (
    <Formik
      enableReinitialize
      initialValues={tag}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty}) => (
      <form onSubmit={handleSubmit} noValidate className='form'>
        <div className='card mb-5 mb-xl-10'>
          <div
            className='card-header border-0 cursor-pointer'
            role='button'
            data-bs-toggle='collapse'
            data-bs-target='#tag_details'
            aria-expanded='true'
            aria-controls='tag_details'
          >
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Tag Details</h3>
            </div>
          </div>

          <div id='tag_details' className='collapse show'>
            <div className='card-body border-top p-9'>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Title</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Title'} name={'tg_Title'} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'tg_Title_Ar'}  disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'tg_Desc'} rows={4} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'tg_Desc_Ar'} rows={4} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Status'} name={'tg_Active'} value={tag.tg_Active ? 'Enabled' : 'Disbaled'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <Link to='/tags/list' className='btn btn-light align-self-center mx-10'>
                List
              </Link>
              <Link to={`/tags/update/${tag.tg_ID}`} className='btn btn-primary align-self-center'>
                Edit
              </Link>
            </div>
          </div>
        </div>
        <TagProperties tag={tag} />
      </form>
    )} 
    </Formik>
  )
})
