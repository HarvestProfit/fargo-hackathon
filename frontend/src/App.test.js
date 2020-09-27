import React from 'react';

import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

test('renders an App', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(wrapper.find(App).length).toEqual(1);
});
