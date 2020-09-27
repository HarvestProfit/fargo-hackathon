import graphql from 'babel-plugin-relay/macro';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { QueryRenderer } from 'react-relay';

import environment from './utilities/environment';

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      env: environment,
      query: graphql`
        query srcQuery {
          counties {
            nodes {
              id
              name
              shape
            }
          }
        }
      `
    }
  }

  render() {
    const { env, query } = this.state;

    return (
      <QueryRenderer
        environment={env}
        query={query}
        variables={{}}
        render={({ props }) => {
          if (!props) {
            return null;
          }
          console.log(props);
          return (
            <App
              data={props}
            />
          );
        }}
      />
    );
  }

}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Application />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
