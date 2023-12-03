import {useState, useEffect} from 'react'
import {Formik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { BookCollectionFormValues } from '../../../../../models/bookCollection'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import BookCollectionProperties from '../../Common/BookCollectionProperties'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'
import bookStore from '../../../../../stores/bookStore'
import { toAbsoluteUrl } from '../../../../../../_ejaz/helpers'
import { MediumFormValues } from '../../../../../models/medium'

interface Props {
  id: string | undefined
}

export default observer(function BookCollectionDetails({id}: Props) {
  const { bookCollectionStore, bookStore, mediumStore } = useStore();
  const { loadBookCollection, selectedBookCollection, loadingInitial } = bookCollectionStore;
  const { loadBooks, setPagingParams, setOrderParams, setFilterParams, pagination, returnedBooks, axiosParams } = bookStore;
  const { loadMedium } = mediumStore;
  const navigate = useNavigate();
  const [bookCollection, setBookCollection] = useState<BookCollectionFormValues>(new BookCollectionFormValues());
  const [medium, setMedium] = useState<MediumFormValues>(new MediumFormValues());
  //const [mediumSrc, setMediumSrc] = useState<string>('');
  const [books, setBook] = useState<string>('');

  useEffect(() => {
    
    if (id) 
    { 
      loadBookCollection(id).then(bookCollection => setBookCollection(new BookCollectionFormValues(bookCollection)));
    } 
  }, [id, loadBookCollection])

  useEffect(() => {
    loadBooks();
    setBook(selectedBookCollection!.books.map(book => (book.bk_Title == "NA" || book.bk_Title == "N/A") ? book.bk_Title_Ar : book.bk_Title).join(', '));
  }, [selectedBookCollection])

  useEffect(() => {
    loadMedium(selectedBookCollection!.md_ID).then(medium => setMedium(new MediumFormValues(medium)));
  }, [selectedBookCollection])
  

  function handleFormSubmit(bookCollection: BookCollectionFormValues) {
  }

      
      

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  
  const mediumSrc = `data:${medium.md_FileType};base64,${medium.md_Medium}`;

  return (
    <Formik
      enableReinitialize
      initialValues={bookCollection}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty}) => (
      <form onSubmit={handleSubmit} noValidate className='form'>
        <div className='card mb-5 mb-xl-10'>
          <div
            className='card-header border-0 cursor-pointer'
            role='button'
            data-bs-toggle='collapse'
            data-bs-target='#bookCollection_details'
            aria-expanded='true'
            aria-controls='bookCollection_details'
          >
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Book Collection Details</h3>
            </div>
          </div>

          <div id='bookCollection_details' className='collapse show'>
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
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Title</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Title'} name={'bc_Title'} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'bc_Title_Ar'}  disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'bc_Desc'} rows={4} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'bc_Desc_Ar'} rows={4} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Books</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Books'} name={'bc_Books'} value={books} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Status'} name={'bc_Active'} value={bookCollection.bc_Active ? 'Enabled' : 'Disbaled'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <Link to='/bookCollections/list' className='btn btn-light align-self-center mx-10'>
                List
              </Link>
              <Link to={`/bookCollections/update/${bookCollection.bc_ID}`} className='btn btn-primary align-self-center'>
                Edit
              </Link>
            </div>
          </div>
        </div>
        <BookCollectionProperties bookCollection={bookCollection} />
      </form>
    )} 
    </Formik>
  )
})

