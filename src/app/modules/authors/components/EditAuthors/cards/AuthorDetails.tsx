import React, {useState, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../../../../_ejaz/helpers'
import * as Yup from 'yup'
import {Formik, FormikHelpers, FormikValues, useFormik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Author, AuthorFormValues } from '../../../../../models/author'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'
import AuthorProperties from '../../Common/AuthorProperties'
import EjazCheckboxInput from '../../../../../layout/Common/EjazCheckboxInput'
import Multiselect from 'multiselect-react-dropdown'
import genreStore from '../../../../../stores/genreStore'
import { ItemFormValues } from '../../../../../models/item'
import { AuthorCmdFormValues } from '../../../../../models/authorCmd'
import { GenreFormValues } from '../../../../../models/genre'
import PhotoUploadWidget from '../../../../../layout/Common/imageUpload/PhotoUploadWidget'
import { MediumFormValues } from '../../../../../models/medium'

interface Props {
  id: string | undefined
}



export default observer(function AuthorDetails({id}: Props) {
  const { authorStore, genreStore, mediumStore } = useStore();
  const { updateAuthor, selectedAuthor, loadAuthor, uploadMedium, deleteMedium, setSrc, loadingInitial, uploading, uploaded, src } = authorStore;
  const { loadGenres, setPagingParams, setOrderParams, setFilterParams, pagination, returnedGenres, axiosParams } = genreStore;
  const { loadMedium } = mediumStore;
  const navigate = useNavigate();

  const [author, setAuthor] = useState<AuthorFormValues>(new AuthorFormValues());
  const [medium, setMedium] = useState<MediumFormValues>(new MediumFormValues());

  const validationSchema = Yup.object().shape({
    at_Name: Yup.string().required('Name required!').min(3, 'Minimum 3 characters required!'),
    at_Name_Ar: Yup.string().required('Arabic Name required!').min(3, 'Minimum 3 characters required!'),
    at_Title: Yup.string().required('Title required!').min(3, 'Minimum 3 characters required!'),
    at_Title_Ar: Yup.string().required('Arabic Title required!').min(3, 'Minimum 3 characters required!')
  })

  useEffect(() => {
    if (id) loadAuthor(id).then(author => setAuthor(new AuthorFormValues(author)))
  }, [id, loadAuthor])

  useEffect(() => {
    loadGenres();
  }, [loadGenres])

  useEffect(() => {
    loadMedium(selectedAuthor!.md_ID).then(medium => setMedium(new MediumFormValues(medium)));
  }, [selectedAuthor])
  

  function handleUploadMedium(file: Blob) {
    uploadMedium(file);
  }

  function handleDeleteMedium() {
    deleteMedium();
  }

  function handleFormSubmit(author: AuthorFormValues) {
    updateAuthor(author).then(() => navigate(`/authors/view/${author.at_ID}`))
  }

  function handleSelect(selectedlist: any, selectedItem: any) {
    author.genreItems = (author.genreItems==null)? []: author.genreItems;
    author.genreItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));

    author.genres = (author.genres==null)? []: author.genres;
    let newGenre = new GenreFormValues();
    newGenre.gn_ID = selectedItem.id;
    newGenre.gn_Title = selectedItem.name;
    author.genres.push(new GenreFormValues(newGenre));
  }

  function handleUnselect(selectedlist: any, selectedItem: any) {
    
    author.genreItems = (author.genreItems==null)? []: author.genreItems;
    const indexOfItem = author.genreItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      author.genreItems.splice(indexOfItem, 1);
    }

    author.genres = (author.genres==null)? []: author.genres;
    const indexOfGenre = author.genres.findIndex((item) => {
      return item.gn_ID === selectedItem.id;
    });
    if (indexOfGenre !== -1) {
      author.genres.splice(indexOfItem, 1);
    }
  }

  const genreOptions = returnedGenres.map(genre => (
    {name: genre.gn_Title, id: genre.gn_ID}
  ))

  const preselectedGenreOptions = (author.genres != null) ? author.genres.map(genre => (
    {name: genre.gn_Title, id: genre.gn_ID}
  )): []

  

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  const mediumsrc = (src) ? src : `data:${medium.md_FileType};base64,${medium.md_Medium}`;

  return (
    <Formik
      enableReinitialize
      validationSchema = {validationSchema}
      initialValues={author}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty}) => (
      <form onSubmit={handleSubmit} noValidate className='form'>
        <div className='card mb-5 mb-xl-10'>
          <div
            className='card-header border-0 cursor-pointer'
            role='button'
            data-bs-toggle='collapse'
            data-bs-target='#author_details'
            aria-expanded='true'
            aria-controls='author_details'
          >
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Author Details</h3>
            </div>
          </div>

          <div id='author_details' className='collapse show'>
            <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-2 col-form-label fw-bold fs-6'>Image</label>
              <div className='col-lg-10'>
              <PhotoUploadWidget  uploadPhoto={handleUploadMedium} deletePhoto={handleDeleteMedium} loading={uploading} uploaded={uploaded} src={mediumsrc} height={125} aspectRatio={1} />
              </div>
            </div>
            <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Name</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Name'} name={'at_Name'} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'اسم'} name={'at_Name_Ar'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Title</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Title'} name={'at_Title'} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'at_Title_Ar'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'at_Desc'} rows={4} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'at_Desc_Ar'} rows={4} />
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
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Status</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazCheckboxInput label={'Enable'} name={'at_Active'} id={'Status'} />
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
        <AuthorProperties author={author} />
      </form>
    )} 
    </Formik>
  )
})
