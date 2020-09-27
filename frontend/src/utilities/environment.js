import axios from 'axios';
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

function fetchQuery(operation, variables) {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/graphql`,
    {
      query: operation.text,
      variables,
    },
    { headers: { 'Accept': 'application/json' } },
  ).then(response => {
    return response.data
  });
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
