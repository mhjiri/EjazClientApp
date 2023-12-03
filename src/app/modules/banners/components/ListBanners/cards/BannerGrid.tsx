import React, { Fragment, useEffect, useRef, useState } from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../../../_ejaz/helpers'
import { HeaderNotificationsMenu, HeaderUserMenu, Search } from '../../../../../../_ejaz/partials'
import { Link, useParams } from 'react-router-dom'
import { ButtonToolbar, DropdownButton } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../../stores/store'
import { PagingParams } from '../../../../../models/pagination'
import InfiniteScroll from 'react-infinite-scroll-component'
import LoadingComponent from '../../../../../layout/Common/LoadingComponent'
import { OrderParams } from '../../../../../models/orderParams'
import { FilterParams } from '../../../../../models/filterParams'   
import { ToastContainer, toast } from 'react-toastify';    
import 'react-toastify/dist/ReactToastify.css';   

type Props = {
  className: string
}

export default observer(function BannerGrid({className} : Props) {
  const { bannerStore } = useStore();
  const { activateBanner, deactivateBanner, loadBanners, setPagingParams, setOrderParams, setFilterParams, pagination, returnedBanners, axiosParams } = bannerStore;
  const [loadingNext, setLoadingNext] = useState(false);
  //const selectRef = useRef(null);
  
  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadBanners().then(() => setLoadingNext(false));
  }

  function handleSortGrid(orderBy: string) {
    setPagingParams(new PagingParams(1));
    setOrderParams(new OrderParams(orderBy, (axiosParams.get('orderBy') == orderBy && axiosParams.get('orderAs')=='asc' ? 'desc':'asc')));
    loadBanners();
  }

  function handleFilterGrid(search: string, status?:string, language?: string) {
    setPagingParams(new PagingParams(1));
    setFilterParams(new FilterParams(search, status, language));
    loadBanners();
  }

  const handleKeyUp = (event: any) => {
    if (event.key === 'Enter') {
      handleFilterGrid(event.target.value)
    }
  };

  const handleChange = (event:any) => {
    event.target.disabled = true;
    if(event.target.value == 'Active') activateBanner(event.target.id);
    else deactivateBanner(event.target.id);
    event.target.disabled = false;
  };

  useEffect(() => {
    loadBanners()
  }, [loadBanners])
  
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <div className='w-40'>
          <div
            data-kt-search-element='form'
            className='w-100 position-relative mb-5 mb-lg-0'
          >
            <KTIcon
            iconName='magnifier'
            className='fs-2 text-lg-3 text-gray-800 position-absolute top-50 translate-middle-y ms-5'
            />
            <input
              type='text'
              className='search-input form-control form-control-solid ps-13'
              name='search'
              placeholder='Search...'
              data-kt-search-element='input'
              onKeyUp={handleKeyUp}
            />
          </div>
        </div>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add customer'
        >
          <Link to='/banners/add' className='btn btn-primary align-self-center'>
            Add Banner
          </Link>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          
              {bannerStore.loadingInitial && !loadingNext ? (
                <>
                  <LoadingComponent />
                </>
              ) : (
                <InfiniteScroll 
                  next={handleGetNext}
                  hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages} 
                  loader={<LoadingComponent />} 
                  dataLength={(pagination != null) ? pagination.totalItems : 0}
                  endMessage={<p></p>}
                  >
                    
                    <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 thead-dark'>
                      {/* begin::Table head */}
                      <thead>
                        <tr className='fw-bold text-muted'>
                          <th className='w-25px'>
                            <div className='form-check form-check-sm form-check-custom form-check-solid'>
                              <input
                                className='form-check-input'
                                type='checkbox'
                                value='1'
                                data-kt-check='true'
                                data-kt-check-target='.widget-9-check'
                              />
                            </div>
                          </th>
                          <th id='title' className={axiosParams.get('orderBy')=='title' && axiosParams.get('orderAs')=='asc' ? 'min-w-200px table-sort-asc' : axiosParams.get('orderBy')=='title' ? 'min-w-200px table-sort-desc' : 'min-w-200px'}>
                            <Link to='#' onClick={() => handleSortGrid('title')}>
                              Title
                            </Link>
                          </th>
                          <th id='title_ar' className={axiosParams.get('orderBy')=='title_ar' && axiosParams.get('orderAs')=='asc' ? 'min-w-200px text-end table-sort-asc' : axiosParams.get('orderBy')=='title_ar' ? 'min-w-200px text-end table-sort-desc' : 'min-w-200px text-end'}>
                            <Link  className='fs-5' to='#' onClick={() => handleSortGrid('title_ar')}>
                              عنوان
                            </Link>
                          </th>
                          <th id='bannerlocation' className={axiosParams.get('orderBy')=='bannerlocation' && axiosParams.get('orderAs')=='asc' ? 'min-w-100px text-center table-sort-asc' : axiosParams.get('orderBy')=='bannerlocation' ? 'min-w-100px text-center table-sort-desc' : 'min-w-100px text-center'}>
                            <Link to='#' onClick={() => handleSortGrid('bannerlocation')}>
                              Banner Location
                            </Link>
                          </th>
                          <th className='min-w-100px text-center'>Status</th>
                          <th className='min-w-100px text-end'>Actions</th>
                        </tr>
                      </thead>
                      {/* end::Table head */}
                      {/* begin::Table body */}
                      <tbody>
                      {(returnedBanners && returnedBanners.map(banner => (
                        <tr key={banner.bn_ID}>
                          
                          <td>
                            <div className='form-check form-check-sm form-check-custom form-check-solid'>
                              <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                            </div>
                          </td>
                          <td className='min-w-200px text-end'>
                            <div className='d-flex align-items-center'>
                              <div className='d-flex justify-content-start flex-column'>
                                <a href={`./view/${banner.bn_ID}`} className='text-dark fw-bold text-hover-primary fs-6'>
                                  {banner.bn_Title}
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className='min-w-100px text-end'>
                            <a href={`./view/${banner.bn_ID}`} className='text-dark fw-bold text-hover-primary fs-6'>
                              {banner.bn_Title_Ar}
                            </a>
                          </td>
                          
                          <td className='min-w-100px text-center'>
                            <span className='text-dark text-center fw-bold text-hover-primary d-block fs-6'>
                              {banner.bn_BannerLocationTitle}
                            </span>
                          </td>
                          
                          <td  className='min-w-100px text-end'>
                            <div className='d-flex lex-shrink-0'>
                              <select id={banner.bn_ID}
                              className='form-select form-select-solid form-select-sm'
                              onChange={handleChange}
                              >
                                <option selected={banner.bn_Active} value='Active'>Active</option>
                                <option selected={!banner.bn_Active} value='Disbale'>Disable</option>
                                
                              </select>
                            </div>
                          </td>
                          <td>
                          <div className='d-flex flex-shrink-0 justify-content-end'>
                              <a
                                href={`./view/${banner.bn_ID}`}
                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                              >
                                <KTIcon iconName='magnifier' className='fs-3' />
                              </a>
                              <a
                                href={`./update/${banner.bn_ID}`}
                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                              >
                                <KTIcon iconName='pencil' className='fs-3' />
                              </a>
                            </div>
                            
                          </td>
                        </tr>
                      )))}
                    </tbody>
                  </table>
                </InfiniteScroll>
              )}
            
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
})

