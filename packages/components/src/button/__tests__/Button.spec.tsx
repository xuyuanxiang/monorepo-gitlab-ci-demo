import React from 'react';
import 'jest-styled-components';
import { mount, render } from 'enzyme';
import { Button } from '../Button';

describe('<Button/>', () => {
  it('should be clicked', () => {
    const handleClick = jest.fn();
    const ele = mount(<Button onClick={handleClick}>Click me!</Button>);
    ele.simulate('click');
    expect(handleClick).toBeCalledTimes(1);
    expect(ele.text()).toBe('Click me!');
  });
  it('should render default props', () => {
    const ele = render(<Button />);
    expect(ele).toMatchSnapshot();
  });
});
