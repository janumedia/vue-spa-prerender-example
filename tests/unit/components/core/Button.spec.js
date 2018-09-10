import { shallowMount } from '@vue/test-utils'
import Button from '@/components/core/Button'

describe('Button.vue', () => {
    let wrapper, BUTTON_LABEL = 'button label';
    beforeEach(() => {
        Button.components = Button.components || {}
    });
    it('should render button with router', () => {
        wrapper = shallowMount(Button, {
            propsData: {
                url: 'router/link',
                label: BUTTON_LABEL
            },
            stubs: ['router-link']
        })
        expect(wrapper.html()).toMatchSnapshot();
    });
    it('should render button with a href', () => {
        wrapper = shallowMount(Button, {
            propsData: {
                url: 'http://domain.com',
                label: BUTTON_LABEL
            }
        })
        expect(wrapper.html()).toMatchSnapshot();
    });
    it('should render button with primary theme', () => {
        wrapper = shallowMount(Button, {
            propsData: {
                url: 'http://domain.com',
                label: BUTTON_LABEL,
                primary: true
            }
        })
        expect(wrapper.html()).toMatchSnapshot();
    })
    it('should render button type submit', () => {
        wrapper = shallowMount(Button, {
            propsData: {
                label: BUTTON_LABEL,
                submit: true
            }
        })
        expect(wrapper.html()).toMatchSnapshot();
    })
})