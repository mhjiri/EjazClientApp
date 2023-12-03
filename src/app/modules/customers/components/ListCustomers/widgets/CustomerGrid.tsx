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

export default observer(function CustomerGrid({className} : Props) {
  const { customerStore } = useStore();
  const { activateCustomer, deactivateCustomer, loadCustomers, setPagingParams, setOrderParams, setFilterParams, pagination, returnedCustomers, axiosParams } = customerStore;
  const [loadingNext, setLoadingNext] = useState(false);
  //const selectRef = useRef(null);
  
  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadCustomers().then(() => setLoadingNext(false));
  }

  function handleSortGrid(orderBy: string) {
    setPagingParams(new PagingParams(1));
    setOrderParams(new OrderParams(orderBy, (axiosParams.get('orderBy') == orderBy && axiosParams.get('orderAs')=='asc' ? 'desc':'asc')));
    loadCustomers();
  }

  function handleFilterGrid(search: string, status?:string, language?: string) {
    setPagingParams(new PagingParams(1));
    setFilterParams(new FilterParams(search, status, language));
    loadCustomers();
  }

  const handleKeyUp = (event: any) => {
    if (event.key === 'Enter') {
      handleFilterGrid(event.target.value)
    }
  };

  const handleChange = (event:any) => {
    event.target.disabled = true;
    if(event.target.value == 'Active') activateCustomer(event.target.id);
    else deactivateCustomer(event.target.id);
    event.target.disabled = false;
  };

  useEffect(() => {
    loadCustomers()
  }, [loadCustomers])
  
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
        
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          
              {customerStore.loadingInitial && !loadingNext ? (
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
                          <th id='name' className={axiosParams.get('orderBy')=='name' && axiosParams.get('orderAs')=='asc' ? 'min-w-200px table-sort-asc' : axiosParams.get('orderBy')=='name' ? 'min-w-200px table-sort-desc' : 'min-w-200px'}>
                            <Link to='#' onClick={() => handleSortGrid('name')}>
                              Name
                            </Link>
                          </th>
                          <th id='username' className={axiosParams.get('orderBy')=='username' && axiosParams.get('orderAs')=='asc' ? 'min-w-100px table-sort-asc' : axiosParams.get('orderBy')=='username' ? 'min-w-100px table-sort-desc' : 'min-w-100px'}>
                            <Link to='#' onClick={() => handleSortGrid('username')}>
                              Username
                            </Link>
                          </th>
                          <th id='phonenumber' className={axiosParams.get('orderBy')=='phonenumber' && axiosParams.get('orderAs')=='asc' ? 'min-w-100px table-sort-asc' : axiosParams.get('orderBy')=='phonenumber' ? 'min-w-100px ttable-sort-desc' : 'min-w-100px'}>
                            <Link to='#' onClick={() => handleSortGrid('phonenumber')}>
                              Phone
                            </Link>
                          </th>
                          <th id='email' className={axiosParams.get('orderBy')=='email' && axiosParams.get('orderAs')=='asc' ? 'min-w-100px table-sort-asc' : axiosParams.get('orderBy')=='email' ? 'min-w-100px table-sort-desc' : 'min-w-100px'}>
                            <Link to='#' onClick={() => handleSortGrid('email')}>
                              Email
                            </Link>
                          </th>
                          <th className='min-w-100px text-center'>Status</th>
                          <th className='min-w-100px text-end'>Actions</th>
                        </tr>
                      </thead>
                      {/* end::Table head */}
                      {/* begin::Table body */}
                      <tbody>
                      {(returnedCustomers && returnedCustomers.map(customer => (
                        <tr key={customer.username}>
                          
                          <td>
                            <div className='form-check form-check-sm form-check-custom form-check-solid'>
                              <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                            </div>
                          </td>
                          <td className='min-w-200px'>
                            <div className='d-flex align-items-center'>
                              <div className='d-flex justify-content-start flex-column'>
                                <a href={`./view/${customer.username}`} className='text-dark fw-bold text-hover-primary fs-6'>
                                  {customer.us_DisplayName}
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className='min-w-100px'>
                            <a href={`./view/${customer.username}`} className='text-dark fw-bold text-hover-primary fs-6'>
                              {customer.username}
                            </a>
                          </td>
                          
                          <td className='min-w-100px'>
                            <span className='text-dark text-center fw-bold text-hover-primary d-block fs-6'>
                              {customer.phoneNumber}
                            </span>
                          </td>

                          <td className='min-w-100px'>
                            <span className='text-dark text-center fw-bold text-hover-primary d-block fs-6'>
                              {customer.email}
                            </span>
                          </td>
                          
                          <td  className='min-w-100px text-end'>
                            <div className='d-flex lex-shrink-0'>
                              <select id={customer.username}
                              className='form-select form-select-solid form-select-sm'
                              onChange={handleChange}
                              >
                                <option selected={customer.us_Active} value='Active'>Active</option>
                                <option selected={!customer.us_Active} value='Disbale'>Disable</option>
                                
                              </select>
                            </div>
                          </td>
                          <td>
                          <div className='d-flex flex-shrink-0 justify-content-end'>
                              <a
                                href={`./view/${customer.username}`}
                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                              >
                                <KTIcon iconName='magnifier' className='fs-3' />
                              </a>
                              <a
                                href={`./update/${customer.username}`}
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

