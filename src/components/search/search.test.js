import React from 'react'
import Search from './search'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()});

describe('<Search />', () => {

    it('before click thare is no <a />', () => {
        const wrapper = shallow(<Search />)
        expect(wrapper.find(FontAwesomeIcon)).toHaveLength(1)
    })

    // it('before click thare is one <Button />', () => {
    //     const wrapper = shallow(<DatePicker />)
    //     expect(wrapper.find(Button)).toHaveLength(1)
    // })

    // it('after click thare is three <Button />', () => {
    //     const wrapper = shallow(<DatePicker />)
    //     wrapper.find(Button).simulate('click')
    //     expect(wrapper.find(Button)).toHaveLength(3)
    // })
})