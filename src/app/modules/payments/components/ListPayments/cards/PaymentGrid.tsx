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

export default observer(function PaymentGrid({className} : Props) {
  const { paymentStore } = useStore();
  const { loadPayments, setPagingParams, setOrderParams, setFilterParams, pagination, returnedPayments, axiosParams } = paymentStore;
  const [loadingNext, setLoadingNext] = useState(false);
  //const selectRef = useRef(null);
  
  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadPayments().then(() => setLoadingNext(false));
  }

  function handleSortGrid(orderBy: string) {
    setPagingParams(new PagingParams(1));
    setOrderParams(new OrderParams(orderBy, (axiosParams.get('orderBy') == orderBy && axiosParams.get('orderAs')=='asc' ? 'desc':'asc')));
    loadPayments();
  }

  function handleFilterGrid(search: string, status?:string, language?: string) {
    setPagingParams(new PagingParams(1));
    setFilterParams(new FilterParams(search, status, language));
    loadPayments();
  }

  const handleKeyUp = (event: any) => {
    if (event.key === 'Enter') {
      handleFilterGrid(event.target.value)
    }
  };

  

  useEffect(() => {
    loadPayments()
  }, [loadPayments])
  
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
          <Link to='/payments/add' className='btn btn-primary align-self-center'>
            Add Payment
          </Link>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          
              {paymentStore.loadingInitial && !loadingNext ? (
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
                          <th id='referenceid' className={axiosParams.get('orderBy')=='referenceid' && axiosParams.get('orderAs')=='asc' ? 'min-w-200px table-sort-asc' : axiosParams.get('orderBy')=='referenceid' ? 'min-w-200px table-sort-desc' : 'min-w-200px'}>
                            <Link to='#' onClick={() => handleSortGrid('referenceid')}>
                              Reference ID
                            </Link>
                          </th>
                          <th id='subscribername' className={axiosParams.get('orderBy')=='subscribername' && axiosParams.get('orderAs')=='asc' ? 'min-w-200px table-sort-asc' : axiosParams.get('orderBy')=='subscribername' ? 'min-w-200px table-sort-desc' : 'min-w-200px'}>
                            <Link to='#' onClick={() => handleSortGrid('subscribername')}>
                              Subscriber
                            </Link>
                          </th>
                          <th className='min-w-200px '>Phone Number</th>
                          <th className='min-w-200px'>Email</th>
                          <th id='subscription' className={axiosParams.get('orderBy')=='subscription' && axiosParams.get('orderAs')=='asc' ? 'min-w-200px table-sort-asc' : axiosParams.get('orderBy')=='subscription' ? 'min-w-200px table-sort-desc' : 'min-w-200px'}>
                            <Link to='#' onClick={() => handleSortGrid('subscription')}>
                              Subscription
                            </Link>
                          </th>
                          <th id='subscription_ar' className={axiosParams.get('orderBy')=='subscription_ar' && axiosParams.get('orderAs')=='asc' ? 'min-w-200px text-end table-sort-asc' : axiosParams.get('orderBy')=='subscription_ar' ? 'min-w-200px text-end table-sort-desc' : 'min-w-200px text-end'}>
                            <Link to='#' onClick={() => handleSortGrid('subscription_ar')}>
                              الاشتراك
                            </Link>
                          </th>
                          <th id='days' className={axiosParams.get('orderBy')=='days' && axiosParams.get('orderAs')=='asc' ? 'min-w-100px text-center table-sort-asc' : axiosParams.get('orderBy')=='days' ? 'min-w-100px text-center table-sort-desc' : 'min-w-100px text-center'}>
                            <Link to='#' onClick={() => handleSortGrid('days')}>
                              Days
                            </Link>
                          </th>
                          <th id='price' className={axiosParams.get('orderBy')=='price' && axiosParams.get('orderAs')=='asc' ? 'min-w-100px text-center table-sort-asc' : axiosParams.get('orderBy')=='price' ? 'min-w-100px text-center table-sort-desc' : 'min-w-100px text-center'}>
                            <Link to='#' onClick={() => handleSortGrid('price')}>
                              Price
                            </Link>
                          </th>
                          <th className='min-w-100px text-end'>Actions</th>
                        </tr>
                      </thead>
                      {/* end::Table head */}
                      {/* begin::Table body */}
                      <tbody>
                      {(returnedPayments && returnedPayments.map(payment => (
                        <tr key={payment.pm_ID}>
                          
                          <td>
                            <div className='form-check form-check-sm form-check-custom form-check-solid'>
                              <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                            </div>
                          </td>
                          <td className='min-w-200px'>
                            <div className='d-flex align-items-center'>
                              <div className='d-flex justify-content-start flex-column'>
                                <a href={`./view/${payment.pm_ID}`} className='text-dark fw-bold text-hover-primary fs-6'>
                                  {payment.pm_RefernceID}
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className='min-w-200px'>
                            <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                              {payment.subscriberName}
                            </span>
                          </td>
                          <td className='min-w-200px'>
                            <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                              {payment.subscriberPhoneNumber}
                            </span>
                          </td>

                          <td className='min-w-200px'>
                            <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                              {payment.subscriberEmail}
                            </span>
                          </td>

                          <td className='min-w-200px'>
                            <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                              {payment.subscription}
                            </span>
                          </td>

                          <td className='min-w-200px text-end'>
                            <span className='text-dark  text-end fw-bold text-hover-primary d-block fs-6'>
                              {payment.subscription_Ar}
                            </span>
                          </td>
                          
                          <td className='min-w-100px text-center'>
                            <span className='text-dark text-center fw-bold text-hover-primary d-block fs-6'>
                              {payment.pm_Days}
                            </span>
                          </td>

                          <td className='min-w-100px text-center'>
                            <span className='text-dark text-center fw-bold text-hover-primary d-block fs-6'>
                              {payment.pm_Price}
                            </span>
                          </td>
                          <td>
                          <div className='d-flex flex-shrink-0 justify-content-end'>
                              <a
                                href={`./view/${payment.pm_ID}`}
                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                              >
                                <KTIcon iconName='magnifier' className='fs-3' />
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

