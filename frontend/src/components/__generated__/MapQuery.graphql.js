/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type MapQueryVariables = {|
  featureCollection: any
|};
export type MapQueryResponse = {|
  +featureCollectionValue: any
|};
export type MapQuery = {|
  variables: MapQueryVariables,
  response: MapQueryResponse,
|};
*/


/*
query MapQuery(
  $featureCollection: JSON!
) {
  featureCollectionValue(featureCollection: $featureCollection)
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "featureCollection"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "featureCollection",
        "variableName": "featureCollection"
      }
    ],
    "kind": "ScalarField",
    "name": "featureCollectionValue",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MapQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MapQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "77e48aa68d800527b894b815b6de71f8",
    "id": null,
    "metadata": {},
    "name": "MapQuery",
    "operationKind": "query",
    "text": "query MapQuery(\n  $featureCollection: JSON!\n) {\n  featureCollectionValue(featureCollection: $featureCollection)\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '367140110c0e18d00c677d773488e8ac';

module.exports = node;
