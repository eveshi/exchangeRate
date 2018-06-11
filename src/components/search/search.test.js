import React from 'react'
import Search from './search'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()});

describe('<Search />', () => {
    it('add a value to star array', () => {
        const wrapper = shallow(<Search />)
        wrapper.find('#searchIcon').simulate('click');
        expect(wrapper.find(<input />)).toHaveLength(1);
    })
})