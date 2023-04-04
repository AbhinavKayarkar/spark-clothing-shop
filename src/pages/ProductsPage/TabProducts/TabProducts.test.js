import React from 'react';
import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import TabProducts from '../TabProducts/TabProducts';

// Test suite
describe('TabProducts', () => {
  //Test spec
  // testing receiving data from productsCategory
  it('receives data from productsCategory', () => {
    const props = { id: '1', to: '/path', title: 'men' };
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <HashRouter>
        <TabProducts {...props} />
      </HashRouter>
    );
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
