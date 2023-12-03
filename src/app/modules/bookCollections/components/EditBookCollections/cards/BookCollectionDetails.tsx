import React, {useState, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../../../../_ejaz/helpers'
import * as Yup from 'yup'
import {Formik, FormikHelpers, FormikValues, useFormik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BookCollection, BookCollectionFormValues } from '../../../../../models/bookCollection'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'
import BookCollectionProperties from '../../Common/BookCollectionProperties'
import EjazCheckboxInput from '../../../../../layout/Common/EjazCheckboxInput'
import Multiselect from 'multiselect-react-dropdown'
import bookStore from '../../../../../stores/bookStore'
import { ItemFormValues } from '../../../../../models/item'
import { BookFormValues } from '../../../../../models/book'
import PhotoUploadWidget from '../../../../../layout/Common/imageUpload/PhotoUploadWidget'
import { MediumFormValues } from '../../../../../models/medium'

interface Props {
  id: string | undefined
}



export default observer(function BookCollectionDetails({id}: Props) {
  const { bookCollectionStore, bookStore, mediumStore } = useStore();
  const { updateBookCollection, selectedBookCollection, loadBookCollection, uploadMedium, deleteMedium, setSrc, loadingInitial, uploading, uploaded, src } = bookCollectionStore;
  const { loadBooks, setPagingParams, setOrderParams, setFilterParams, pagination, returnedBooks, axiosParams } = bookStore;
  const { loadMedium } = mediumStore;
  const navigate = useNavigate();

  const [bookCollection, setBookCollection] = useState<BookCollectionFormValues>(new BookCollectionFormValues());
  const [medium, setMedium] = useState<MediumFormValues>(new MediumFormValues());

  const validationSchema = Yup.object().shape({
    bc_Title: Yup.string().required('Title required!').min(3, 'Minimum 3 characters required!'),
    bc_Title_Ar: Yup.string().required('Arabic Title required!').min(3, 'Minimum 3 characters required!')
  })

  useEffect(() => {
    if (id) loadBookCollection(id).then(bookCollection => setBookCollection(new BookCollectionFormValues(bookCollection)))
  }, [id, loadBookCollection])

  useEffect(() => {
    loadBooks();
  }, [loadBooks])

  useEffect(() => {
    loadMedium(selectedBookCollection!.md_ID).then(medium => setMedium(new MediumFormValues(medium)));
  }, [selectedBookCollection])
  

  function handleUploadMedium(file: Blob) {
    uploadMedium(file);
  }

  function handleDeleteMedium() {
    deleteMedium();
  }

  function handleFormSubmit(bookCollection: BookCollectionFormValues) {
    updateBookCollection(bookCollection).then(() => navigate(`/bookCollections/view/${bookCollection.bc_ID}`))
  }

  function handleSelect(selectedlist: any, selectedItem: any) {
    bookCollection.bookItems = (bookCollection.bookItems==null)? []: bookCollection.bookItems;
    bookCollection.bookItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));

    // bookCollection.books = (bookCollection.books==null)? []: bookCollection.books;
    // let newBook = new BookFormValues();
    // newBook.bk_ID = selectedItem.id;
    // newBook.bk_Title = selectedItem.name;
    // bookCollection.books.push(new BookFormValues(newBook));
  }

  function handleUnselect(selectedlist: any, selectedItem: any) {
    
    bookCollection.bookItems = (bookCollection.bookItems==null)? []: bookCollection.bookItems;
    const indexOfItem = bookCollection.bookItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      bookCollection.bookItems.splice(indexOfItem, 1);
    }

    bookCollection.books = (bookCollection.books==null)? []: bookCollection.books;
    const indexOfBook = bookCollection.books.findIndex((item) => {
      return item.bk_ID === selectedItem.id;
    });
    if (indexOfBook !== -1) {
      bookCollection.books.splice(indexOfItem, 1);
    }
  }

  const bookOptions = returnedBooks.map(book => (
    //{name: ((book.bk_Title=='N/A' || book.bk_Title=='NA' ) ? book.bk_Title_Ar : book.bk_Title), id: book.bk_ID}
    {name: ((book.bk_Title == "NA" || book.bk_Title == "N/A") ? book.bk_Title_Ar : book.bk_Title), id: book.bk_ID}
  ))

  const preselectedBookOptions = (bookCollection.books != null) ? bookCollection.books.map(book => (
    {name: ((book.bk_Title == "NA" || book.bk_Title == "N/A") ? book.bk_Title_Ar : book.bk_Title), id: book.bk_ID}
  )): []

  

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  const mediumsrc = (src) ? src : `data:${medium.md_FileType};base64,${medium.md_Medium}`;

  return (
    <Formik
      enableReinitialize
      validationSchema = {validationSchema}
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
              <label className='col-lg-2 col-form-label fw-bold fs-6'>Image</label>
              <div className='col-lg-10'>
              <PhotoUploadWidget  uploadPhoto={handleUploadMedium} deletePhoto={handleDeleteMedium} loading={uploading} uploaded={uploaded} src={mediumsrc} height={125} aspectRatio={1} />
              </div>
            </div>
            
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Title</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Title'} name={'bc_Title'} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'bc_Title_Ar'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'bc_Desc'} rows={4} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'bc_Desc_Ar'} rows={4} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Books</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-10 fv-row'>
                    <Multiselect
                      options={bookOptions} 
                      displayValue="name" 
                      className='form-select form-select-solid'
                      placeholder='Books'
                      onSelect={handleSelect}
                      onRemove={handleUnselect}
                      selectedValues={preselectedBookOptions}
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
                      <EjazCheckboxInput label={'Enable'} name={'bc_Active'} id={'Status'} />
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
        <BookCollectionProperties bookCollection={bookCollection} />
      </form>
    )} 
    </Formik>
  )
})
