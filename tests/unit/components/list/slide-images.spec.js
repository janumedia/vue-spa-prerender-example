import { shallowMount } from '@vue/test-utils'
import SlideImages from '@/components/list/slide-images'
import data from '../../fakeData/list-box-data'

SlideImages.components = SlideImages.components || {};

const createWrapper = (propsData, mountType=shallowMount) => {
    return mountType(SlideImages, {
        attachToDocument: true,
        propsData
    })
}

describe("slide-images.vue", () => {
    let wrapper, 
        list = data.listBox.find(item => item.slides).slides;
    beforeEach(() => {
        
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('should render slide-images', () => {
        wrapper = createWrapper({
            list
        });
        expect(wrapper.html()).toMatchSnapshot();
    });
})