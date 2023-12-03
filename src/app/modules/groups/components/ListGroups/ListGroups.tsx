
import GroupGrid from './cards/GroupGrid'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../../stores/store'
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PagingParams } from '../../../../models/pagination';
import { useParams } from 'react-router-dom';

export default function ListGroups() {

  return (
    
    
       <div className='card mb-5 mb-xl-10' id='kt_orders_list'>
        <GroupGrid className='card-xxl-stretch mb-5 mb-xl-8' />
      </div>
    
  )
}
