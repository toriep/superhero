import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import App from './App';


describe('App renders without throwing an error', () => {
  
  it('should contain nodes in the wrapper', () => {
    // expect(shallow(<App />).is('.container')).toBe(true);
    expect(shallow(<App />).exists()).toBe(true);
  });

  it('has the class "container"', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.hasClass('container')).toBe(true);
  });

  it('has an h1 as the first child', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.childAt(0).type()).toBe('h1');
    expect(wrapper.childAt(0).text()).toBe('Avengers');
  });

  it('should mount in a full DOM', () => {
    expect(mount(<App />).find('.container').length).toBe(1);
  });

  // it('should render without throwing an error', () => {
  //   expect(shallow(<App />).contains(<div className="container"></div>)).toBe(true);
  // });
});
