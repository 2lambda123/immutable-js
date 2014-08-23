///<reference path='../resources/jest.d.ts'/>
///<reference path='../dist/Immutable.d.ts'/>

jest.autoMockOff();

import Immutable = require('immutable');

jasmine.getEnv().addEqualityTester((a, b) =>
  a instanceof Immutable.Sequence && b instanceof Immutable.Sequence ?
    Immutable.is(a, b) :
    jasmine.undefined
);

describe('Cursor', () => {

  var json = { a: { b: { c: 1 } } };

  it('gets from its path', () => {
    var data = Immutable.fromJS(json);
    var cursor = data.cursor();

    expect(cursor.deref()).toBe(data);

    var deepCursor = cursor.cursor(['a', 'b']);
    expect(deepCursor.deref().toJS()).toEqual(json.a.b);
    expect(deepCursor.deref()).toBe(data.getIn(['a', 'b']));
    expect(deepCursor.get('c')).toBe(1);

    var leafCursor = deepCursor.cursor('c');
    expect(leafCursor.deref()).toBe(1);

    var missCursor = leafCursor.cursor('d');
    expect(missCursor.deref()).toBe(undefined);
  });

  it('gets return new cursors', () => {
    var data = Immutable.fromJS(json);
    var cursor = data.cursor();
    var deepCursor = cursor.getIn(['a', 'b']);
    expect(deepCursor.deref()).toBe(data.getIn(['a', 'b']));
  });

  it('can be treated as a value', () => {
    var data = Immutable.fromJS(json);
    var cursor = data.cursor(['a', 'b']);
    expect(cursor.toJS()).toEqual(json.a.b);
    expect(cursor).toEqual(data.getIn(['a', 'b']));
    expect(cursor.length).toBe(1);
    expect(cursor.get('c')).toBe(1);
  });

  it('can be value compared to a primitive', () => {
    var data = Immutable.Map({ a: 'A' });
    var aCursor = data.cursor('a');
    expect(aCursor.length).toBe(null);
    expect(aCursor.deref()).toBe('A');
    expect(Immutable.is(aCursor, 'A')).toBe(true);
  });

  it('updates at its path', () => {
    var onChange = jest.genMockFunction();

    var data = Immutable.fromJS(json);
    var aCursor = data.cursor('a', onChange);

    var deepCursor = aCursor.cursor(['b', 'c']);
    expect(deepCursor.deref()).toBe(1);

    // cursor edits return new cursors:
    var newDeepCursor = deepCursor.update(x => x + 1);
    expect(newDeepCursor.deref()).toBe(2);
    expect(onChange).lastCalledWith(
      Immutable.fromJS({a:{b:{c:2}}}),
      data,
      ['a', 'b', 'c']
    );

    var newestDeepCursor = newDeepCursor.update(x => x + 1);
    expect(newestDeepCursor.deref()).toBe(3);
    expect(onChange).lastCalledWith(
      Immutable.fromJS({a:{b:{c:3}}}),
      Immutable.fromJS({a:{b:{c:2}}}),
      ['a', 'b', 'c']
    );

    // meanwhile, data is still immutable:
    expect(data.toJS()).toEqual(json);

    // as is the original cursor.
    expect(deepCursor.deref()).toBe(1);
    var otherNewDeepCursor = deepCursor.update(x => x + 10);
    expect(otherNewDeepCursor.deref()).toBe(11);
    expect(onChange).lastCalledWith(
      Immutable.fromJS({a:{b:{c:11}}}),
      data,
      ['a', 'b', 'c']
    );

    // and update has been called exactly thrice.
    expect(onChange.mock.calls.length).toBe(3);
  });

  it('has map API for update shorthand', () => {
    var onChange = jest.genMockFunction();

    var data = Immutable.fromJS(json);
    var aCursor = data.cursor('a', onChange);
    var bCursor = aCursor.cursor('b');
    var cCursor = bCursor.cursor('c');

    expect(bCursor.set('c', 10).deref()).toEqual(
      Immutable.fromJS({ c: 10 })
    );
    expect(onChange).lastCalledWith(
      Immutable.fromJS({ a: { b: { c: 10 } } }),
      data,
      ['a', 'b', 'c']
    );
  });

  it('creates maps as necessary', () => {
    var data = Immutable.Map();
    var cursor = data.cursor(['a', 'b', 'c']);
    expect(cursor.deref()).toBe(undefined);
    cursor = cursor.set('d', 3);
    expect(cursor.deref()).toEqual(Immutable.Map({d: 3}));
  });

  it('has the sequence API', () => {
    var data = Immutable.Map({a: 1, b: 2, c: 3});
    var cursor = data.cursor();
    expect(cursor.map(x => x * x)).toEqual(Immutable.Map({a: 1, b: 4, c: 9}));
  })

});