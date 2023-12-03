/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../../../_ejaz/helpers'
import { HeaderNotificationsMenu, HeaderUserMenu, Search } from '../../../../../../_ejaz/partials'
import { Link } from 'react-router-dom'
import { ButtonToolbar, DropdownButton } from 'react-bootstrap'

type Props = {
  className: string
}

const TablesWidgetCustomers: React.FC<Props> = ({className}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <div className='w-40'>
          <Search />
        </div>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add customer'
        >
          <Link to='/customers/add' className='btn btn-primary align-self-center'>
            Add Customer
          </Link>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
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
                <th className='min-w-50px'>ID</th>
                <th className='min-w-150px'>Full Name</th>
                <th className='min-w-100px'>Phone Number</th>
                <th className='min-w-100px'>Email</th>
                <th className='min-w-100px'>Status</th>
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        319312
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    Bacher Chebaro
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    +97450696765
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    bachebaro@gmail.com
                  </span>
                </td>
                <td>
                <div className='d-flex lex-shrink-0'>
                  <select 
                  className='form-select form-select-solid form-select-sm'
                  >
                    <option selected value='Active'>Active</option>
                    <option value='Disbale'>Disable</option>
                    
                  </select>
                  </div>
                </td>
                <td>
                <div className='d-flex flex-shrink-0 justify-content-end'>
                    <a
                      href='./view'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='magnifier' className='fs-3' />
                    </a>
                    <a
                      href='./update'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </a>
                  </div>
                  
                </td>
              </tr>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        319312
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    Bacher Chebaro
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    +97450696765
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    bachebaro@gmail.com
                  </span>
                </td>
                <td>
                <div className='d-flex lex-shrink-0'>
                  <select 
                  className='form-select form-select-solid form-select-sm'
                  >
                    <option selected value='Active'>Active</option>
                    <option value='Disbale'>Disable</option>
                    
                  </select>
                  </div>
                </td>
                <td>
                <div className='d-flex flex-shrink-0 justify-content-end'>
                    <a
                      href='./view'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='magnifier' className='fs-3' />
                    </a>
                    <a
                      href='./update'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </a>
                  </div>
                  
                </td>
              </tr>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        319312
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    Bacher Chebaro
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    +97450696765
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    bachebaro@gmail.com
                  </span>
                </td>
                <td>
                <div className='d-flex lex-shrink-0'>
                  <select 
                  className='form-select form-select-solid form-select-sm'
                  >
                    <option selected value='Active'>Active</option>
                    <option value='Disbale'>Disable</option>
                    
                  </select>
                  </div>
                </td>
                <td>
                <div className='d-flex flex-shrink-0 justify-content-end'>
                    <a
                      href='./view'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='magnifier' className='fs-3' />
                    </a>
                    <a
                      href='./update'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </a>
                  </div>
                  
                </td>
              </tr>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        319312
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    Bacher Chebaro
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    +97450696765
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    bachebaro@gmail.com
                  </span>
                </td>
                <td>
                <div className='d-flex lex-shrink-0'>
                  <select 
                  className='form-select form-select-solid form-select-sm'
                  >
                    <option selected value='Active'>Active</option>
                    <option value='Disbale'>Disable</option>
                    
                  </select>
                  </div>
                </td>
                <td>
                <div className='d-flex flex-shrink-0 justify-content-end'>
                    <a
                      href='./view'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='magnifier' className='fs-3' />
                    </a>
                    <a
                      href='./update'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </a>
                  </div>
                  
                </td>
              </tr>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        319312
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    Bacher Chebaro
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    +97450696765
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    bachebaro@gmail.com
                  </span>
                </td>
                <td>
                <div className='d-flex lex-shrink-0'>
                  <select 
                  className='form-select form-select-solid form-select-sm'
                  >
                    <option selected value='Active'>Active</option>
                    <option value='Disbale'>Disable</option>
                    
                  </select>
                  </div>
                </td>
                <td>
                <div className='d-flex flex-shrink-0 justify-content-end'>
                    <a
                      href='./view'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='magnifier' className='fs-3' />
                    </a>
                    <a
                      href='./update'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </a>
                  </div>
                  
                </td>
              </tr>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        319312
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    Bacher Chebaro
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    +97450696765
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    bachebaro@gmail.com
                  </span>
                </td>
                <td>
                <div className='d-flex lex-shrink-0'>
                  <select 
                  className='form-select form-select-solid form-select-sm'
                  >
                    <option selected value='Active'>Active</option>
                    <option value='Disbale'>Disable</option>
                    
                  </select>
                  </div>
                </td>
                <td>
                <div className='d-flex flex-shrink-0 justify-content-end'>
                    <a
                      href='./view'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='magnifier' className='fs-3' />
                    </a>
                    <a
                      href='./update'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </a>
                  </div>
                  
                </td>
              </tr>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        319312
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    Bacher Chebaro
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    +97450696765
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    bachebaro@gmail.com
                  </span>
                </td>
                <td>
                <div className='d-flex lex-shrink-0'>
                  <select 
                  className='form-select form-select-solid form-select-sm'
                  >
                    <option selected value='Active'>Active</option>
                    <option value='Disbale'>Disable</option>
                    
                  </select>
                  </div>
                </td>
                <td>
                <div className='d-flex flex-shrink-0 justify-content-end'>
                    <a
                      href='./view'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='magnifier' className='fs-3' />
                    </a>
                    <a
                      href='./update'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </a>
                  </div>
                  
                </td>
              </tr>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        319312
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    Bacher Chebaro
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    +97450696765
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    bachebaro@gmail.com
                  </span>
                </td>
                <td>
                <div className='d-flex lex-shrink-0'>
                  <select 
                  className='form-select form-select-solid form-select-sm'
                  >
                    <option selected value='Active'>Active</option>
                    <option value='Disbale'>Disable</option>
                    
                  </select>
                  </div>
                </td>
                <td>
                <div className='d-flex flex-shrink-0 justify-content-end'>
                    <a
                      href='./view'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='magnifier' className='fs-3' />
                    </a>
                    <a
                      href='./update'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </a>
                  </div>
                  
                </td>
              </tr>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        319312
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    Bacher Chebaro
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    +97450696765
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    bachebaro@gmail.com
                  </span>
                </td>
                <td>
                <div className='d-flex lex-shrink-0'>
                  <select 
                  className='form-select form-select-solid form-select-sm'
                  >
                    <option selected value='Active'>Active</option>
                    <option value='Disbale'>Disable</option>
                    
                  </select>
                  </div>
                </td>
                <td>
                <div className='d-flex flex-shrink-0 justify-content-end'>
                    <a
                      href='./view'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='magnifier' className='fs-3' />
                    </a>
                    <a
                      href='./update'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </a>
                  </div>
                  
                </td>
              </tr>
              <tr>
                <td>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='d-flex justify-content-start flex-column'>
                      <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                        319312
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    Bacher Chebaro
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    +97450696765
                  </span>
                </td>
                <td>
                  <span className='text-dark fw-bold text-hover-primary d-block fs-6'>
                    bachebaro@gmail.com
                  </span>
                </td>
                <td>
                <div className='d-flex lex-shrink-0'>
                  <select 
                  className='form-select form-select-solid form-select-sm'
                  >
                    <option selected value='Active'>Active</option>
                    <option value='Disbale'>Disable</option>
                    
                  </select>
                  </div>
                </td>
                <td>
                <div className='d-flex flex-shrink-0 justify-content-end'>
                    <a
                      href='./view'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='magnifier' className='fs-3' />
                    </a>
                    <a
                      href='./update'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTIcon iconName='pencil' className='fs-3' />
                    </a>
                  </div>
                  
                </td>
              </tr>
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {TablesWidgetCustomers}
