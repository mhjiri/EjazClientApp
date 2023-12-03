import React, {useState, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../../../../_ejaz/helpers'
import * as Yup from 'yup'
import {Formik, FormikHelpers, FormikValues, useFormik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Book, BookFormValues } from '../../../../../models/book'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'
import BookProperties from '../../Common/BookProperties'
import EjazCheckboxInput from '../../../../../layout/Common/EjazCheckboxInput'
import Multiselect from 'multiselect-react-dropdown'
import genreStore from '../../../../../stores/genreStore'
import { ItemFormValues } from '../../../../../models/item'
import { GenreFormValues } from '../../../../../models/genre'
import PhotoUploadWidget from '../../../../../layout/Common/imageUpload/PhotoUploadWidget'
import { MediumFormValues } from '../../../../../models/medium'
import AudioUploadWidget from '../../../../../layout/Common/audioUpload/AudioUploadWidget'

interface Props {
  id: string | undefined
}



export default observer(function BookDetails({id}: Props) {
  const { bookStore, publisherStore, authorStore, categoryStore, genreStore, tagStore, thematicAreaStore, mediumStore } = useStore();
  const { updateBook, selectedBook, loadBook, uploadMedium, deleteMedium, deleteAudioEn, deleteAudioAr, setSrc, uploadAudioEn, setSrcAudioEn, uploadAudioAr, setSrcAudioAr, setDeleted, loadingInitial, uploading, uploaded, src, uploadingAudioEn, uploadedAudioEn, srcAudioEn, uploadingAudioAr, uploadedAudioAr, srcAudioAr, currentAudioEn, currentAudioAr } = bookStore;
  const { loadPublishers, returnedPublishers } = publisherStore;
  const { loadAuthors, returnedAuthors } = authorStore;
  const { loadThematicAreas, returnedThematicAreas } = thematicAreaStore;
  const { loadCategories, returnedCategories} = categoryStore;
  const { loadGenres, returnedGenres } = genreStore;
  const { loadTags, returnedTags } = tagStore;
  const { loadMedium } = mediumStore;
  const navigate = useNavigate();

  const [book, setBook] = useState<BookFormValues>(new BookFormValues());
  const [medium, setMedium] = useState<MediumFormValues>(new MediumFormValues());

  const validationSchema = Yup.object().shape({
    bk_Code: Yup.string().required('Code required!').min(3, 'Minimum 3 characters required!'),
    bk_Name: Yup.string().required('Name required!').min(3, 'Minimum 3 characters required!'),
    bk_Name_Ar: Yup.string().required('Arabic Name required!').min(3, 'Minimum 3 characters required!'),
    bk_Title: Yup.string().required('Title required!').min(3, 'Minimum 3 characters required!'),
    bk_Title_Ar: Yup.string().required('Arabic Title required!').min(3, 'Minimum 3 characters required!')
  })

  useEffect(() => {
    if (id) loadBook(id).then(book => setBook(new BookFormValues(book)))
  }, [id, loadBook])

  useEffect(() => {
    loadAuthors();
  }, [loadAuthors])
  
  useEffect(() => {
    loadPublishers();
  }, [loadPublishers])

  useEffect(() => {
    loadCategories();
  }, [loadCategories])
  
  useEffect(() => {
    loadGenres();
  }, [loadGenres])

  useEffect(() => {
    loadTags();
  }, [loadTags])

  useEffect(() => {
    loadThematicAreas();
  }, [loadThematicAreas])

  useEffect(() => {
    selectedBook?.media.forEach(medium => {
      if(medium.md_ID != undefined) selectedBook.md_ID = medium.md_ID
    })
    loadMedium(selectedBook!.md_ID).then((medium: MediumFormValues | undefined) => setMedium(new MediumFormValues(medium)));
  }, [selectedBook])
  

  function handleUploadMedium(file: Blob) {
    uploadMedium(file);
  }

  function handleDeleteMedium() {
    deleteMedium();
  }

  function handleDeleteAudioEn() {
    deleteAudioEn();
  }

  function handleDeleteAudioAr() {
    deleteAudioAr();
  }

  function handleAudioEnOnCancel() {
    setSrcAudioEn('');
    navigate(-1);
  }

  function handleUploadAudioEn(file: Blob) {
    uploadAudioEn(file);
  }

  

  function handleAudioArOnCancel() {
    setSrcAudioAr('');
    navigate(-1);
  }

  function handleUploadAudioAr(file: Blob) {
    uploadAudioAr(file);
  }

  function handleFormSubmit(book: BookFormValues) {
    updateBook(book).then(() => {
        navigate(`/books/view/${book.bk_ID}`)
    })
  }

  function handleFormCancel(book: BookFormValues) {
    setSrc('')
    setDeleted(0)
    navigate(-1)
  }

  function handleSelect(selectedlist: any, selectedItem: any) {
    book.genreItems = (book.genreItems==null)? []: book.genreItems;
    book.genreItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));
  }

  function handleUnselect(selectedlist: any, selectedItem: any) {
    
    book.genreItems = (book.genreItems==null)? []: book.genreItems;
    const indexOfItem = book.genreItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      book.genreItems.splice(indexOfItem, 1);
    }
  }

  function handlePublisherSelect(selectedlist: any, selectedItem: any) {
    book.publisherItems = (book.publisherItems==null)? []: book.publisherItems;
    book.publisherItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));
  }

  function handlePublisherUnselect(selectedlist: any, selectedItem: any) {
    
    book.publisherItems = (book.publisherItems==null)? []: book.publisherItems;
    const indexOfItem = book.publisherItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      book.publisherItems.splice(indexOfItem, 1);
    }
  }

  function handleAuthorSelect(selectedlist: any, selectedItem: any) {
    book.authorItems = (book.authorItems==null)? []: book.authorItems;
    book.authorItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));
  }

  function handleAuthorUnselect(selectedlist: any, selectedItem: any) {
    
    book.authorItems = (book.authorItems==null)? []: book.authorItems;
    const indexOfItem = book.authorItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      book.authorItems.splice(indexOfItem, 1);
    }
  }

  function handleCategorySelect(selectedlist: any, selectedItem: any) {
    book.categoryItems = (book.categoryItems==null)? []: book.categoryItems;
    book.categoryItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));
  }

  function handleCategoryUnselect(selectedlist: any, selectedItem: any) {
    
    book.categoryItems = (book.categoryItems==null)? []: book.categoryItems;
    const indexOfItem = book.categoryItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      book.categoryItems.splice(indexOfItem, 1);
    }
  }

  function handleTagSelect(selectedlist: any, selectedItem: any) {
    book.tagItems = (book.tagItems==null)? []: book.tagItems;
    book.tagItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));
  }

  function handleTagUnselect(selectedlist: any, selectedItem: any) {
    
    book.tagItems = (book.tagItems==null)? []: book.tagItems;
    const indexOfItem = book.tagItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      book.tagItems.splice(indexOfItem, 1);
    }
  }

  function handleThematicAreaSelect(selectedlist: any, selectedItem: any) {
    book.thematicAreaItems = (book.thematicAreaItems==null)? []: book.thematicAreaItems;
    book.thematicAreaItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));
  }

  function handleThematicAreaUnselect(selectedlist: any, selectedItem: any) {
    
    book.thematicAreaItems = (book.thematicAreaItems==null)? []: book.thematicAreaItems;
    const indexOfItem = book.thematicAreaItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      book.thematicAreaItems.splice(indexOfItem, 1);
    }
  }

  function handleLanguageSelect(selectedlist: any, selectedItem: any) {
    
  }

  function handleLanguageUnselect(selectedlist: any, selectedItem: any) {
    
    
  }

  const publisherOptions = returnedPublishers.map(publisher => (
    {name: ((publisher.pb_Title == "NA" || publisher.pb_Title == "N/A") ? publisher.pb_Title_Ar : publisher.pb_Title), id: publisher.pb_ID}
  ))

  const authorOptions = returnedAuthors.map(author => (
    {name: ((author.at_Title == "NA" || author.at_Title == "N/A") ? author.at_Title_Ar : author.at_Title), id: author.at_ID}
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

  const thematicAreaOptions = returnedThematicAreas.map(thematicArea => (
    {name: thematicArea.th_Title, id: thematicArea.th_ID}
  ))
  
  const languageOptions =   [{name: 'All', id: 'All'}, {name: 'Arabic', id: 'Arabic'}, {name: 'English', id: 'English'}]

  const preselectedLanguageOptions = (book.bk_Language != null) ? 
    [{name: book.bk_Language, id: book.bk_Language}]
  : []
  
  const preselectedPublisherOptions = (book.publishers != null) ? book.publishers.map(publisher => (
    {name: ((publisher.pb_Title == "NA" || publisher.pb_Title == "N/A") ? publisher.pb_Title_Ar : publisher.pb_Title), id: publisher.pb_ID}
  )): []

  const preselectedAuthorOptions = (book.authors != null) ? book.authors.map(author => (
    {name: ((author.at_Title == "NA" || author.at_Title == "N/A") ? author.at_Title_Ar : author.at_Title), id: author.at_ID}
  )): []

  const preselectedCategoryOptions = (book.categories != null) ? book.categories.map(category => (
    {name: category.ct_Title, id: category.ct_ID}
  )): []
  
  const preselectedGenreOptions = (book.genres != null) ? book.genres.map(genre => (
    {name: genre.gn_Title, id: genre.gn_ID}
  )): []

  const preselectedTagOptions = (book.tags != null) ? book.tags.map(tag => (
    {name: tag.tg_Title, id: tag.tg_ID}
  )): []

  const preselectedThematicAreaOptions = (book.thematicAreas != null) ? book.thematicAreas.map(thematicArea => (
    {name: thematicArea.th_Title, id: thematicArea.th_ID}
  )): []



  

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  const mediumsrc = (src) ? src : `data:${medium.md_FileType};base64,${medium.md_Medium}`;

  return (
    <Formik
      enableReinitialize
      validationSchema = {validationSchema}
      initialValues={book}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty, setFieldValue}) => (
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
              <PhotoUploadWidget  uploadPhoto={handleUploadMedium} deletePhoto={handleDeleteMedium} loading={uploading} uploaded={uploaded} src={mediumsrc} height={188} aspectRatio={0.67} />
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-2 col-form-label fw-bold fs-6'>Audio</label>
              <div className='col-lg-10'>
              <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <AudioUploadWidget  uploadAudio={handleUploadAudioEn} deleteAudio={handleDeleteAudioEn} loading={uploadingAudioEn} uploaded={uploadedAudioEn} src={currentAudioEn} initialSrc={book.md_AudioEn_ID} height={125} aspectRatio={0.67} text='Drop english audio here' />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <AudioUploadWidget  uploadAudio={handleUploadAudioAr} deleteAudio={handleDeleteAudioAr} loading={uploadingAudioAr} uploaded={uploadedAudioAr} src={currentAudioAr} initialSrc={book.md_AudioAr_ID} height={125} aspectRatio={0.67} text='Drop arabic audio here'  />
                    </div>
                  </div>
              
              </div>
            </div>
            
            <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Code</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Code'} name={'bk_Code'} />
                    </div>
                  </div>
                </div>
              </div>
            <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Name</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Name'} name={'bk_Name'} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'اسم'} name={'bk_Name_Ar'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Title</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Title'} name={'bk_Title'} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'bk_Title_Ar'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'bk_Desc'} rows={4} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'bk_Desc_Ar'} rows={4} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Introduction</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Introduction'} name={'bk_Introduction'} rows={4} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'مقدمة'} name={'bk_Introduction_Ar'} rows={4} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Summary</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Summary'} name={'bk_Summary'} rows={4} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'ملخص'} name={'bk_Summary_Ar'} rows={4} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Characters</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Characters'} name={'bk_Characters'} rows={4} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'الشخصيات'} name={'bk_Characters_Ar'} rows={4} />
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
                      onSelect={(selectedlist, selectedItem) => setFieldValue("bk_Language", selectedItem.id)}
                      selectedValues={preselectedLanguageOptions}
                      singleSelect
                      />
                      <EjazTextInput type='hidden' placeholder='Language' name={'bk_Language'} value='All' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Publishers</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-10 fv-row'>
                    <Multiselect
                      options={publisherOptions} 
                      displayValue="name" 
                      className='form-select form-select-solid'
                      placeholder='Publishers'
                      onSelect={handlePublisherSelect}
                      onRemove={handlePublisherUnselect}
                      selectedValues={preselectedPublisherOptions}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Authors</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-10 fv-row'>
                    <Multiselect
                      options={authorOptions} 
                      displayValue="name" 
                      className='form-select form-select-solid'
                      placeholder='Authors'
                      onSelect={handleAuthorSelect}
                      onRemove={handleAuthorUnselect}
                      selectedValues={preselectedAuthorOptions}
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
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Trial</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazCheckboxInput label={'Enable'} name={'bk_Trial'} id={'Trial'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazCheckboxInput label={'Enable'} name={'bk_Active'} id={'Status'} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <button onClick={() => { setSrc(''); setDeleted(0); navigate(-1)}} className='btn btn-light align-self-center mx-10'>
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
        <BookProperties book={book} />
      </form>
    )} 
    </Formik>
  )
})

function deleteAudioEn() {
  throw new Error('Function not implemented.')
}

