import {useState, useEffect} from 'react'
import * as Yup from 'yup'
import {Formik} from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { BookCollectionFormValues } from '../../../../../models/bookCollection'
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
import { BookFormValues } from '../../../../../models/book'
import PhotoUploadWidget from '../../../../../layout/Common/imageUpload/PhotoUploadWidget'



export default observer(function BookCollectionDetails() {
  const { bookCollectionStore, bookStore } = useStore();
  const { createBookCollection, loadBookCollection, uploadMedium, deleteMedium, setSrc, loadingInitial, uploading, uploaded, src } = bookCollectionStore;
  const { loadBooks, setPagingParams, setOrderParams, setFilterParams, pagination, returnedBooks, axiosParams } = bookStore;
  const { id } = useParams();
  const navigate = useNavigate();

  

  const [bookCollection, setBookCollection] = useState<BookCollectionFormValues>(new BookCollectionFormValues());



  const validationSchema = Yup.object().shape({
    bc_Title: Yup.string().required('Title required!').min(3, 'Minimum 3 characters required!'),
    bc_Title_Ar: Yup.string().required('Arabic Title required!').min(3, 'Minimum 3 characters required!')
  })

  function handleOnCancel() {
    setSrc('');
    navigate(-1);
  }

  function handleUploadMedium(file: Blob) {
    uploadMedium(file);
  }

  function handleDeleteMedium() {
    deleteMedium();
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

    // bookCollection.books = (bookCollection.books==null)? []: bookCollection.books;
    // const indexOfBook = bookCollection.books.findIndex((item) => {
    //   return item.bk_ID === selectedItem.id;
    // });
    // if (indexOfBook !== -1) {
    //   bookCollection.books.splice(indexOfItem, 1);
    // }
  }

  useEffect(() => {
    if (id) loadBookCollection(id).then(bookCollection => setBookCollection(new BookCollectionFormValues(bookCollection)))
  }, [id, loadBookCollection])

  useEffect(() => {
    loadBooks();
  }, [loadBooks])

  

  function handleFormSubmit(bookCollection: BookCollectionFormValues) {
    let newBookCollection = {
      ...bookCollection
    }
    createBookCollection(newBookCollection).then(() => navigate(`../view/${newBookCollection.bc_ID}`))
  }

  const bookOptions = returnedBooks.map(book => (
    //{name: ((book.bk_Title=='N/A' || book.bk_Title=='NA' ) ? book.bk_Title_Ar : book.bk_Title), id: book.bk_ID}
    {name: ((book.bk_Title == "NA" || book.bk_Title == "N/A") ? book.bk_Title_Ar : book.bk_Title), id: book.bk_ID}
  ))

  

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  

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
              <PhotoUploadWidget  uploadPhoto={handleUploadMedium} deletePhoto={handleDeleteMedium}  loading={uploading} uploaded={uploaded} src={src} height={125} aspectRatio={1} />
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
