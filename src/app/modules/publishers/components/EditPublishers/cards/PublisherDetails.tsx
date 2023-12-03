import React, {useState, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../../../../_ejaz/helpers'
import * as Yup from 'yup'
import {Formik, FormikHelpers, FormikValues, useFormik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Publisher, PublisherFormValues } from '../../../../../models/publisher'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import EjazTextInput from '../../../../../layout/Common/EjazTextInput'
import EjazTextArea from '../../../../../layout/Common/EjazTextArea'
import PublisherProperties from '../../Common/PublisherProperties'
import EjazCheckboxInput from '../../../../../layout/Common/EjazCheckboxInput'
import Multiselect from 'multiselect-react-dropdown'
import genreStore from '../../../../../stores/genreStore'
import { ItemFormValues } from '../../../../../models/item'
import { PublisherCmdFormValues } from '../../../../../models/publisherCmd'
import { GenreFormValues } from '../../../../../models/genre'
import PhotoUploadWidget from '../../../../../layout/Common/imageUpload/PhotoUploadWidget'
import { MediumFormValues } from '../../../../../models/medium'

interface Props {
  id: string | undefined
}



export default observer(function PublisherDetails({id}: Props) {
  const { publisherStore, genreStore, mediumStore } = useStore();
  const { updatePublisher, selectedPublisher, loadPublisher, uploadMedium, deleteMedium, setSrc, loadingInitial, uploading, uploaded, src } = publisherStore;
  const { loadGenres, setPagingParams, setOrderParams, setFilterParams, pagination, returnedGenres, axiosParams } = genreStore;
  const { loadMedium } = mediumStore;
  const navigate = useNavigate();

  const [publisher, setPublisher] = useState<PublisherFormValues>(new PublisherFormValues());
  const [medium, setMedium] = useState<MediumFormValues>(new MediumFormValues());

  const validationSchema = Yup.object().shape({
    pb_Name: Yup.string().required('Name required!').min(3, 'Minimum 3 characters required!'),
    pb_Name_Ar: Yup.string().required('Arabic Name required!').min(3, 'Minimum 3 characters required!'),
    pb_Title: Yup.string().required('Title required!').min(3, 'Minimum 3 characters required!'),
    pb_Title_Ar: Yup.string().required('Arabic Title required!').min(3, 'Minimum 3 characters required!')
  })

  useEffect(() => {
    if (id) loadPublisher(id).then(publisher => setPublisher(new PublisherFormValues(publisher)))
  }, [id, loadPublisher])

  useEffect(() => {
    loadGenres();
  }, [loadGenres])

  useEffect(() => {
    loadMedium(selectedPublisher!.md_ID).then(medium => setMedium(new MediumFormValues(medium)));
  }, [selectedPublisher])
  

  function handleUploadMedium(file: Blob) {
    uploadMedium(file);
  }

  function handleDeleteMedium() {
    deleteMedium();
  }

  function handleFormSubmit(publisher: PublisherFormValues) {
    updatePublisher(publisher).then(() => navigate(`/publishers/view/${publisher.pb_ID}`))
  }

  function handleSelect(selectedlist: any, selectedItem: any) {
    publisher.genreItems = (publisher.genreItems==null)? []: publisher.genreItems;
    publisher.genreItems.push(new ItemFormValues(selectedItem.id, selectedlist.length-1));

    publisher.genres = (publisher.genres==null)? []: publisher.genres;
    let newGenre = new GenreFormValues();
    newGenre.gn_ID = selectedItem.id;
    newGenre.gn_Title = selectedItem.name;
    publisher.genres.push(new GenreFormValues(newGenre));
  }

  function handleUnselect(selectedlist: any, selectedItem: any) {
    
    publisher.genreItems = (publisher.genreItems==null)? []: publisher.genreItems;
    const indexOfItem = publisher.genreItems.findIndex((item) => {
      return item.it_ID === selectedItem.id;
    });
    if (indexOfItem !== -1) {
      publisher.genreItems.splice(indexOfItem, 1);
    }

    publisher.genres = (publisher.genres==null)? []: publisher.genres;
    const indexOfGenre = publisher.genres.findIndex((item) => {
      return item.gn_ID === selectedItem.id;
    });
    if (indexOfGenre !== -1) {
      publisher.genres.splice(indexOfItem, 1);
    }
  }

  const genreOptions = returnedGenres.map(genre => (
    {name: genre.gn_Title, id: genre.gn_ID}
  ))

  const preselectedGenreOptions = (publisher.genres != null) ? publisher.genres.map(genre => (
    {name: genre.gn_Title, id: genre.gn_ID}
  )): []

  

  if (loadingInitial) return <LoadingComponent content='Loading...' />

  const mediumsrc = (src) ? src : `data:${medium.md_FileType};base64,${medium.md_Medium}`;

  return (
    <Formik
      enableReinitialize
      validationSchema = {validationSchema}
      initialValues={publisher}
      onSubmit={vals => handleFormSubmit(vals)}
    >
    {({ handleSubmit, isValid, isSubmitting, dirty}) => (
      <form onSubmit={handleSubmit} noValidate className='form'>
        <div className='card mb-5 mb-xl-10'>
          <div
            className='card-header border-0 cursor-pointer'
            role='button'
            data-bs-toggle='collapse'
            data-bs-target='#publisher_details'
            aria-expanded='true'
            aria-controls='publisher_details'
          >
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>Publisher Details</h3>
            </div>
          </div>

          <div id='publisher_details' className='collapse show'>
            <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-2 col-form-label fw-bold fs-6'>Image</label>
              <div className='col-lg-10'>
              <PhotoUploadWidget  uploadPhoto={handleUploadMedium} deletePhoto={handleDeleteMedium} loading={uploading} uploaded={uploaded} src={mediumsrc}  height={125} aspectRatio={1} />
              </div>
            </div>
            <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Name</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Name'} name={'pb_Name'} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'اسم'} name={'pb_Name_Ar'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Title</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'Title'} name={'pb_Title'} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextInput placeholder={'عنوان'} name={'pb_Title_Ar'} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-2 col-form-label fw-bold fs-6'>Description</label>
                <div className='col-lg-10'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'Description'} name={'pb_Desc'} rows={4} />
                    </div>
                    <div className='col-lg-6 fv-row'>
                      <EjazTextArea placeholder={'وصف'} name={'pb_Desc_Ar'} rows={4} />
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
                      <EjazCheckboxInput label={'Enable'} name={'pb_Active'} id={'Status'} />
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
        <PublisherProperties publisher={publisher} />
      </form>
    )} 
    </Formik>
  )
})
