import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const genreOptions = [
    {text: 'Drinks', value: 'drinks'},
    {text: 'Culture', value: 'culture'},
    {text: 'Film', value: 'film'},
    {text: 'Food', value: 'food'},
    {text: 'Music', value: 'music'},
    {text: 'Travel', value: 'travel'},
]

const EjazDropDown = () => (
  <Dropdown
    placeholder='State'
    fluid
    multiple
    search
    selection
    options={genreOptions}
  />
)

export default EjazDropDown