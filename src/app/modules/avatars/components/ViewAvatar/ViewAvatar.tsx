import React, { useEffect } from 'react'
import AvatarDetails from './cards/AvatarDetails'
import AvatarProperties from '../Common/AvatarProperties'
import { useParams } from 'react-router-dom';
import { useStore } from '../../../../stores/store';
import { observer } from 'mobx-react-lite';
import { Avatar } from '../../../../models/avatar';
import LoadingComponent from '../../../../layout/Common/LoadingComponent';



export default observer(function ViewAvatar() {
  const { avatarStore } = useStore();
  const { selectedAvatar: avatar, loadAvatar, loadingInitial, clearSelectedAvatar } = avatarStore;
  const { id } = useParams();

  useEffect(() => {
      if (id) loadAvatar(id);
      return () => clearSelectedAvatar();
  }, [id, loadAvatar, clearSelectedAvatar]);

  if (loadingInitial || !avatar) return (<LoadingComponent />)
  
  
  return (
    <>
      <AvatarDetails  id={id} />
    </>
  )
})
