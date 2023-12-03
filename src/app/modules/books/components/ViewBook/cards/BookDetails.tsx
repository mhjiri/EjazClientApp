import {useState, useEffect} from 'react'
import {Formik} from 'formik'
import { Link } from 'react-router-dom'
import { BookFormValues } from '../../../../../models/book'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import BookProperties from '../../Common/BookProperties'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'
import { toAbsoluteUrl } from '../../../../../../_ejaz/helpers'
import { MediumFormValues } from '../../../../../models/medium'

interface Props {
  id: string | undefined
}

export default observer(function BookDetails({id}: Props) {
  const { bookStore, publisherStore, authorStore, categoryStore, genreStore, tagStore, thematicAreaStore, mediumStore } = useStore();
  const { loadBook, selectedBook, loadingInitial } = bookStore;
  const { loadPublishers } = publisherStore;
  const { loadAuthors } = authorStore;
  const { loadThematicAreas, } = thematicAreaStore;
  const { loadCategories } = categoryStore;
  const { loadGenres } = genreStore;
  const { loadTags } = tagStore;
  const { loadMedium } = mediumStore;
  const [book, setBook] = useState<BookFormValues>(new BookFormValues());
  const [medium, setMedium] = useState<MediumFormValues>(new MediumFormValues());
  //const [mediumSrc, setMediumSrc] = useState<string>('');
  
  const [authors, setAuthors] = useState<string>('');
  const [publishers, setPublishers] = useState<string>('');
  const [categories, setCategories] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [thematicAreas, setThematicAreas] = useState<string>('');
  const [genres, setGenres] = useState<string>('');

  useEffect(() => {
    
    if (id) 
    { 
      loadBook(id).then(book => setBook(new BookFormValues(book)));
    } 
  }, [id, loadBook])

  useEffect(() => {
    loadAuthors();
    setAuthors(selectedBook!.authors.map(author => (author.at_Title == "NA" || author.at_Title == "N/A") ? author.at_Title_Ar : author.at_Title).join(', '));
  }, [loadAuthors, selectedBook])
  
  useEffect(() => {
    loadPublishers();
    setPublishers(selectedBook!.publishers.map(publisher => (publisher.pb_Title == "NA" || publisher.pb_Title == "N/A") ? publisher.pb_Title_Ar : publisher.pb_Title).join(', '));
  }, [loadPublishers, selectedBook])

  useEffect(() => {
    loadCategories();
    setCategories(selectedBook!.categories.map(category => category.ct_Title).join(', '));
  }, [loadCategories, selectedBook])
  
  

  useEffect(() => {
    loadTags();
    setTags(selectedBook!.tags.map(tag => tag.tg_Title).join(', '));
  }, [loadTags, selectedBook])

  useEffect(() => {
    loadThematicAreas();
    setThematicAreas(selectedBook!.thematicAreas.map(thematicArea => thematicArea.th_Title).join(', '));
  }, [loadThematicAreas, selectedBook])
  
  useEffect(() => {
    loadGenres();
    setGenres(selectedBook!.genres.map(genre => genre.gn_Title).join(', '));
  }, [loadGenres, selectedBook])

  useEffect(() => {
    selectedBook?.media.forEach(medium => {
      if(medium.md_ID !== undefined) selectedBook.md_ID = medium.md_ID
    })
    loadMedium(selectedBook!.md_ID).then(medium => setMedium(new MediumFormValues(medium)));
  }, [loadMedium, selectedBook])
  

  function handleFormSubmit(book: BookFormValues) {
  }

      
      

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  
  const mediumSrc = `data:${medium.md_FileType};base64,${medium.md_Medium}`;

  return (
    <Formik
      enableReinitialize
      initialValues={book}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty}) => (
      <form onSubmit={handleSubmit} noValidate className='form'>
        <div className='card mb-5 mb-xl-10'>
          <div
            className='card-header border-0 cursor-pointer'
            role='button'
            data-bs-toggle='collapse'
            data-bs-target='#book_details'
            aria-expanded='true'
            aria-controls='book_details'
          >
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Book Details</h3>
            </div>
          </div>

          <div id='book_details' className='collapse show'>
            <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-2 col-form-label fw-bold fs-6'>Cover</label>
              <div className='col-lg-10'>
                <div
                  className='image-input image-input-outline'
                  data-kt-image-input='true'
                  style={{backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
                >
                  <div
                        className='image-input-wrapper w-125px'
                        style={{minHeight: 188, overflow: 'hidden', backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
                    >
                        {mediumSrc && mediumSrc.length > 40 &&
                        <img className='image-input-wrapper w-125px' alt="" style={{height: 188}} src={mediumSrc}></img>
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
                      <EjazTextInput placeholder={'Name'} name={'bk_Name'} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'اسم'} name={'bk_Name_Ar'}  disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Title</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Title'} name={'bk_Title'} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'bk_Title_Ar'}  disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'bk_Desc'} rows={4} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'bk_Desc_Ar'} rows={4} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Introduction</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Introduction'} name={'bk_Introduction'} rows={4} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'مقدمة'} name={'bk_Introduction_Ar'} rows={4} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Summary</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Summary'} name={'bk_Summary'} rows={4} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'ملخص'} name={'bk_Summary_Ar'} rows={4} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Characters</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Characters'} name={'bk_Characters'} rows={4} disabled={true} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'الشخصيات'} name={'bk_Characters_Ar'} rows={4} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Audio</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                    {book.md_AudioEn_ID !== '' && book.md_AudioEn_ID !== null && book.md_AudioEn_ID !== undefined && book.md_AudioEn_ID !== "00000000-0000-0000-0000-000000000000" && (
                      // <audio className='w-250px' controlsList="nodownload" controls preload="auto" src={`https://ejaz.azurewebsites.net/ejaz/v1/Medium/getAudio/${book.md_AudioEn_ID}`} ></audio>
                      <audio className='w-250px' controlsList="nodownload" controls preload="auto" src={`http://localhost:5000/ejaz/v1/Medium/getAudio/${book.md_AudioEn_ID}`} ></audio>
                    )}
                    </div>
                    <div className='col-lg-6 fv-row'>
                    {book.md_AudioAr_ID !== '' && book.md_AudioAr_ID !== null && book.md_AudioAr_ID !== undefined && book.md_AudioAr_ID !== "00000000-0000-0000-0000-000000000000" && (
                      // <audio className='w-250px' controlsList="nodownload" controls preload="auto" src={`https://ejaz.azurewebsites.net/ejaz/v1/Medium/getAudio/${book.md_AudioAr_ID}`} ></audio>
                      <audio className='w-250px' controlsList="nodownload" controls preload="auto" src={`http://localhost:5000/ejaz/v1/Medium/getAudio/${book.md_AudioAr_ID}`} ></audio>
                    )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Publishers</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Publishers'} name={'bk_Publishers'} value={publishers} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Authors</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Authors'} name={'bk_Authors'} value={authors} disabled={true} />
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
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Trial</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Trial'} name={'bk_Trial'} value={book.bk_Trial ? 'Enabled' : 'Disbaled'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-12 fv-row'>
                      <EjazTextInput placeholder={'Status'} name={'bk_Active'} value={book.bk_Active ? 'Enabled' : 'Disbaled'} disabled={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <Link to='/books/list' className='btn btn-light align-self-center mx-10'>
                List
              </Link>
              <Link to={`/books/update/${book.bk_ID}`} className='btn btn-primary align-self-center'>
                Edit
              </Link>
            </div>
          </div>
        </div>
        <BookProperties book={book} />
      </form>
    )} 
    </Formik>
  )
})

