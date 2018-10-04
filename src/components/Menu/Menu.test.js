import React from 'react'
import { shallow } from 'enzyme'
import Menu from './Menu'

describe('Menu', () => {
  const menuItems = [{ key: '42', label: 'Apple' }, { key: '43', label: 'Bear' }]

  it('should render', () => {
    const wrapper = shallow(<Menu items={menuItems} />)
    expect(wrapper).toHaveLength(1)
  })

  it('should not render the items', () => {
    const wrapper = shallow(<Menu items={menuItems} />)
    expect(wrapper.find('.menu-item')).toHaveLength(2)
  })

  it('should call onItemSelected when a menu item is clicked', () => {
    const callback = jest.fn()
    const wrapper = shallow(<Menu items={menuItems} onItemSelected={callback} />)
    const menuItem = wrapper.find('.menu-item').first()
    const mockEvent = { target: {} }
    menuItem.simulate('click', mockEvent)
    expect(callback).toHaveBeenCalled()
  })
})
