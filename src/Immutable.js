import { version } from '../package.json';

import { Collection } from './CollectionImpl';
import { fromJS } from './fromJS';
// Functional read/write API
import { get } from './functional/get';
import { getIn } from './functional/getIn';
import { has } from './functional/has';
import { hasIn } from './functional/hasIn';
import { merge, mergeDeep, mergeDeepWith, mergeWith } from './functional/merge';
import { remove } from './functional/remove';
import { removeIn } from './functional/removeIn';
import { set } from './functional/set';
import { setIn } from './functional/setIn';
import { update } from './functional/update';
import { updateIn } from './functional/updateIn';
import { hash } from './Hash';
import { is } from './is';
import { List } from './List';
import { Map } from './Map';
import { OrderedMap } from './OrderedMap';
import { OrderedSet } from './OrderedSet';
import { PairSorting } from './PairSorting';
import { isAssociative } from './predicates/isAssociative';
import { isCollection } from './predicates/isCollection';
// Functional predicates
import { isImmutable } from './predicates/isImmutable';
import { isIndexed } from './predicates/isIndexed';
import { isKeyed } from './predicates/isKeyed';
import { isList } from './predicates/isList';
import { isMap } from './predicates/isMap';
import { isOrdered } from './predicates/isOrdered';
import { isOrderedMap } from './predicates/isOrderedMap';
import { isOrderedSet } from './predicates/isOrderedSet';
import { isRecord } from './predicates/isRecord';
import { isSeq } from './predicates/isSeq';
import { isSet } from './predicates/isSet';
import { isStack } from './predicates/isStack';
import { isValueObject } from './predicates/isValueObject';
import { Range } from './Range';
import { Record } from './Record';
import { Repeat } from './Repeat';
import { Seq } from './Seq';
import { Set } from './Set';
import { Stack } from './Stack';
import isPlainObject from './utils/isPlainObj';

// Note: Iterable is deprecated
const Iterable = Collection;

export {
  version,
  Collection,
  Iterable,
  Seq,
  Map,
  OrderedMap,
  List,
  Stack,
  Set,
  OrderedSet,
  PairSorting,
  Record,
  Range,
  Repeat,
  is,
  fromJS,
  hash,
  isImmutable,
  isCollection,
  isKeyed,
  isIndexed,
  isAssociative,
  isOrdered,
  isPlainObject,
  isValueObject,
  isSeq,
  isList,
  isMap,
  isOrderedMap,
  isStack,
  isSet,
  isOrderedSet,
  isRecord,
  get,
  getIn,
  has,
  hasIn,
  merge,
  mergeDeep,
  mergeWith,
  mergeDeepWith,
  remove,
  removeIn,
  set,
  setIn,
  update,
  updateIn,
};
