import React from 'react'
import { mount, shallow } from 'enzyme'
import { App } from './App'
import Menu from '../../components/Menu'
import Game from '../Game'

const defaultProps = {
  fetchGameData: jest.fn(),
  newGame: jest.fn(),
}

describe('App', () => {
  it('renders without crashing', () => {
    shallow(<App {...defaultProps} />)
  })

  it('renders the loading message', () => {
    const wrapper = shallow(<App {...defaultProps} />)
    expect(wrapper.text()).toEqual('Loading...')
  })

  it('renders the app container', () => {
    const wrapper = shallow(<App {...defaultProps} gameDataStatus={'LOADED'} />)
    expect(wrapper.find('.app')).toHaveLength(1)
  })

  it('renders the app header', () => {
    const wrapper = shallow(<App {...defaultProps} gameDataStatus={'LOADED'} />)
    const appHeader = wrapper.find('header')
    expect(appHeader).toHaveLength(1)
  })

  it('renders the app menu', () => {
    const wrapper = shallow(<App {...defaultProps} gameDataStatus={'LOADED'} />)
    const menu = wrapper.find(Menu)
    expect(menu).toHaveLength(1)
  })

  it('renders the game', () => {
    const wrapper = shallow(<App {...defaultProps} gameDataStatus={'LOADED'} hasGame />)
    const menu = wrapper.find(Menu)
    expect(menu).toHaveLength(0)
    const game = wrapper.find(Game)
    expect(game).toHaveLength(1)
  })

  it('should create a new game when the user selects a menu item', () => {
    const gameData = {
      levels: [
        {
          difficulty: 'easy',
          cards: ['A', 'B', 'C'],
        },
      ],
    }
    const wrapper = mount(<App {...defaultProps} gameDataStatus={'LOADED'} gameData={gameData} />)
    const menu = wrapper.find(Menu)
    const menuItem = menu.find('.menu-item').first()
    menuItem.simulate('click', {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    })
    expect(defaultProps.newGame).toHaveBeenCalled()
  })
})
