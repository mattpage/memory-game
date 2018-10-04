import React from 'react'
import { mount, shallow } from 'enzyme'
import Timer, { formatTime } from './Timer'

describe('Timer', () => {
  it('should render', () => {
    const wrapper = shallow(<Timer />)
    try {
      expect(wrapper).toHaveLength(1)
    } finally {
      wrapper.unmount()
    }
  })

  it('should render the elapsed time', () => {
    const wrapper = mount(<Timer />)
    try {
      const elapsed = wrapper.find('span')
      expect(elapsed).toHaveLength(1)
      const timeString = expect.stringMatching(/\d:\d\d/)
      expect(elapsed.text()).toEqual(timeString)
    } finally {
      wrapper.unmount()
    }
  })

  it('should not render the elapsed time if it is not enabled', () => {
    const wrapper = mount(<Timer enabled={false} />)
    try {
      jest.useFakeTimers()
      const elapsed = wrapper.find('span')
      expect(elapsed).toHaveLength(1)
      expect(elapsed.text()).toEqual('0:00')
      setTimeout(() => {
        expect(elapsed.text()).toEqual('0:00')
      }, 1000)
      jest.runAllTimers()
    } finally {
      wrapper.unmount()
    }
  })
})

describe('formatTime', () => {
  test('Test invalid time ', () => {
    expect(formatTime(-1)).toBe('--:--')
  })

  test('Test t=0', () => {
    expect(formatTime(0)).toBe('0:00')
  })

  test('Test t < 1min', () => {
    expect(formatTime(55)).toBe('0:55')
  })

  test('Test 1min < t < 1hr', () => {
    expect(formatTime(65)).toBe('1:05')
  })

  test('Test t > 1hr', () => {
    expect(formatTime(3601)).toBe('1:00:01')
  })
})
