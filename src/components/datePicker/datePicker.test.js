import React from 'react'
import DatePicker from './datePicker'
import Button from '../button/button'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()});

describe('<DatePicker />', () => {

    it('before click thare is no <a />', () => {
        const wrapper = shallow(<DatePicker />)
        expect(wrapper.find(<a />)).toHaveLength(0)
    })

    it('before click thare is one <Button />', () => {
        const wrapper = shallow(<DatePicker />)
        expect(wrapper.find(Button)).toHaveLength(1)
    })

    it('after click thare is three <Button />', () => {
        const wrapper = shallow(<DatePicker />)
        wrapper.find(Button).simulate('click')
        expect(wrapper.find(Button)).toHaveLength(3)
    })
})