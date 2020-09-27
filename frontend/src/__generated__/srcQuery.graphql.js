/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type srcQueryVariables = {||};
export type srcQueryResponse = {|
  +counties: {|
    +nodes: ?$ReadOnlyArray<?{|
      +id: string,
      +name: ?string,
      +shape: ?any,
    |}>
  |}
|};
export type srcQuery = {|
  variables: srcQueryVariables,
  response: srcQueryResponse,
|};
*/


/*
query srcQuery {
  counties {
    nodes {
      id
      name
      shape
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "CountyConnection",
    "kind": "LinkedField",
    "name": "counties",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "County",
        "kind": "LinkedField",
        "name": "nodes",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "shape",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "srcQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "srcQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "0a3e303e0f7aed4c420376583654d78a",
    "id": null,
    "metadata": {},
    "name": "srcQuery",
    "operationKind": "query",
    "text": "query srcQuery {\n  counties {\n    nodes {\n      id\n      name\n      shape\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'cc64ac8fe5e017dc92ec91b7eea0b809';

module.exports = node;
