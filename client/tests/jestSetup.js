import jest from 'jest';
import $ from 'jquery';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.jest = jest;
global.Materialize = { toast: () => {} };
global.$ = $;
$.prototype.dropdown = () => {};
$.prototype.material_select = () => {};
