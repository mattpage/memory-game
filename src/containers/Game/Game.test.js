import React from 'react'
import { shallow } from 'enzyme'
import { Game } from './Game'
import Card from '../../components/Card'

describe('Game', () => {
  const cards = [
    { id: '42', value: 'A', selected: false },
    { id: '43', value: 'B', selected: false },
    { id: '44', value: 'C', selected: false },
  ]

  it('should render', () => {
    const wrapper = shallow(<Game attempts={0} cards={cards} difficulty="easy" />)
    expect(wrapper).toHaveLength(1)
  })

  it('should render the cards container', () => {
    const wrapper = shallow(<Game attempts={0} cards={cards} difficulty="easy" />)
    expect(wrapper.find('.cards')).toHaveLength(1)
  })

  it('should render some cards', () => {
    const wrapper = shallow(<Game attempts={0} cards={cards} difficulty="easy" />)
    expect(wrapper.find(Card)).toHaveLength(3)
  })
})
