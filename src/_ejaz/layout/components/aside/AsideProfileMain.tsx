/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideProfileMain() {
  const intl = useIntl()

  return (
    <>
      

      <AsideMenuItem
        to='/adminUsers/view/'
        icon='bi-app-indicator'
        title='Profile'
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItem
        to='/adminUsers/update/'
        icon='bi-app-indicator'
        title='Update Profile'
        fontIcon='bi-app-indicator'
      />

    </>
  )
}
