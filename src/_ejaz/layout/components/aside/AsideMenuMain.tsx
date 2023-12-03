/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='color-swatch'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />

      {/* <AsideMenuItem
        to='/orders'
        icon='basket'
        title='Orders'
        fontIcon='bi-app-indicator'
      /> */}

      <AsideMenuItem
        to='/payments'
        icon='basket'
        title='Payments'
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItemWithSub
        to='#'
        title='Users'
        fontIcon='bi-app-indicator'
        icon='profile-user'
      >
        <AsideMenuItem to='/customers' title='Customers' hasBullet={false} />
        <AsideMenuItem to='/trialUsers' title='Trial Based Users' hasBullet={false} />
        <AsideMenuItem to='/adminUsers' title='Admin Users' hasBullet={false} />
      </AsideMenuItemWithSub>

      <AsideMenuItem
        to='/categories'
        icon='category'
        title='Categories'
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItem
        to='/books'
        icon='book'
        title='Books'
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItem
        to='/publishers'
        icon='document'
        title='Publishers'
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItem
        to='/authors'
        icon='document'
        title='Authors'
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItem
        to='/subscriptions'
        icon='document'
        title='Subscriptions'
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItemWithSub
        to='/marketing/pages'
        title='Marketing'
        icon='share'
        fontIcon='bi-person'
      >
        {/* <AsideMenuItem to='/marketing/pages/promotions' title='Promotions' hasBullet={false} /> */}
        <AsideMenuItem to='/banners' title='Banners' hasBullet={false} />
        <AsideMenuItem to='/bannerLocations' title='Banner Locations' hasBullet={false} />
      </AsideMenuItemWithSub>
      
      

      <AsideMenuItem
        to='/groups'
        icon='badge'
        title='Groups'
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItem
        to='/thematicAreas'
        icon='category'
        title='ThematicArea'
        fontIcon='bi-app-indicator'
      />

      

      <AsideMenuItem
        to='/tags'
        icon='tag'
        title='Tags'
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItem
        to='/genres'
        icon='category'
        title='Genres'
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItem
        to='/bookCollections'
        icon='category'
        title='Book Collections'
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItem
        to='/paymentMethods'
        icon='category'
        title='Payment Methods'
        fontIcon='bi-app-indicator'
      />

    </>
  )
}
