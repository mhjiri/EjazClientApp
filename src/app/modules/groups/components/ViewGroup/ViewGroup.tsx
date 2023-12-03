import React, { useEffect } from 'react'
import GroupDetails from './cards/GroupDetails'
import GroupProperties from '../Common/GroupProperties'
import { useParams } from 'react-router-dom';
import { useStore } from '../../../../stores/store';
import { observer } from 'mobx-react-lite';
import { Group } from '../../../../models/group';
import LoadingComponent from '../../../../layout/Common/LoadingComponent';



export default observer(function ViewGroup() {
  const { groupStore } = useStore();
  const { selectedGroup: group, loadGroup, loadingInitial, clearSelectedGroup } = groupStore;
  const { id } = useParams();

  useEffect(() => {
      if (id) loadGroup(id);
      return () => clearSelectedGroup();
  }, [id, loadGroup, clearSelectedGroup]);

  if (loadingInitial || !group) return (<LoadingComponent />)
  
  
  return (
    <>
      <GroupDetails  id={id} />
    </>
  )
})
