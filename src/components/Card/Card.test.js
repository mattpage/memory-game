import React from 'react'
import { shallow } from 'enzyme'
import Card from './Card'

describe('Card', () => {
  it('should render', () => {
    const wrapper = shallow(<Card id="42" value="A" />)
    expect(wrapper).toHaveLength(1)
  })

  it('should not render the value because it is not selected', () => {
    const wrapper = shallow(<Card id="42" value="A" />)
    expect(wrapper.find('.value')).toHaveLength(0)
  })

  it('should render the value because when it is face up', () => {
    const wrapper = shallow(<Card id="42" value="A" selected />)
    const val = wrapper.find('.value')
    expect(val).toHaveLength(1)
    expect(val.text()).toEqual('A')
  })
})
