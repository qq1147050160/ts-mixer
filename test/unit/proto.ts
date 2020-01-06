import 'mocha';
import { expect } from 'chai';

import { protoChain, ancestors, nearestCommonAncestor, uniqueAncestors } from '../../src/proto';

describe('protoChain', () => {
	it('should return an empty list for Object.prototype', () => {
		expect(protoChain(Object.prototype)).to.deep.equal([]);
	});

	it('should return [Object.prototype] for direct instances of Object', () => {
		expect(protoChain({})).to.deep.equal([Object.prototype]);
	});

	it('should return the proper chain for a 1-layer deep class', () => {
		class Foo {}

		expect(protoChain(new Foo())).to.deep.equal([Foo.prototype, Object.prototype]);
	});

	it('should return the proper chain for an N-layer deep class', () => {
		class Foo {}
		class Bar extends Foo {}
		class Baz extends Bar {}

		expect(protoChain(new Baz())).to.deep.equal([Baz.prototype, Bar.prototype, Foo.prototype, Object.prototype]);
	});
});

describe('ancestors', () => {
	it('should return the proper ancestors for an N-layer deep class', () => {
		class Foo {}
		class Bar extends Foo {}
		class Baz extends Bar {}

		expect(ancestors(new Baz())).to.deep.equal([Baz, Bar, Foo, Object]);
	});
});

describe('nearestCommonAncestor', () => {
	it('should return undefined when no objects are passed', () => {
		expect(nearestCommonAncestor()).to.equal(undefined);
	});
	
	it('should return undefined when objects share no common lineage (not even Object)', () => {
		const a = Object.create(null);
		const b = {};

		expect(nearestCommonAncestor(a, b)).to.equal(undefined);
	});

	it('should return Object for two instances of unrelated classes', () => {
		class A {}
		class B {}

		expect(nearestCommonAncestor(new A(), new B())).to.equal(Object);
	});

	it('should properly identify the common ancestor 1 layer deep', () => {
		class Common {}
		class A extends Common {}
		class B extends Common {}

		expect(nearestCommonAncestor(new A(), new B())).to.equal(Common);
	});

	it('should properly identify the common ancestor N layers deep', () => {
		class Common {}
		class A extends Common {}
		class AA extends A {}
		class AAA extends AA {}
		class B extends Common {}
		class BB extends B {}
		class BBB extends BB {}

		expect(nearestCommonAncestor(new AAA(), new BBB())).to.equal(Common);
	});

	it('should identify the common ancestor when two objects share a near ancestor, but the third does not', () => {
		class ActualCommon {}
		class A extends ActualCommon {}
		class AlmostCommon extends ActualCommon {}
		class B extends AlmostCommon {}
		class C extends AlmostCommon {}

		expect(nearestCommonAncestor(new A(), new B(), new C())).to.equal(ActualCommon);
	});
});

describe('uniqueAncestors', () => {
	it('should return an empty list when no objects are passed', () => {
		expect(uniqueAncestors()).to.deep.equal([]);
	});

	it('should just return the ancestor chain when one object is passed', () => {
		class Foo {}

		expect(uniqueAncestors(new Foo())).to.deep.equal([[Foo, Object]]);
	});

	it('should return a list of empty lists when to instances of the same class are passed', () => {
		class Foo {}

		expect(uniqueAncestors(new Foo(), new Foo())).to.deep.equal([[], []]);
	});

	it('should properly filter out one shared common ancestor', () => {
		class Common {}
		class A extends Common {}
		class B extends Common {}

		expect(uniqueAncestors(new A(), new B())).to.deep.equal([[A], [B]]);
	});

	it('should properly filter out multiple shared ancestors', () => {
		class Common1 {}
		class Common2 extends Common1 {}
		class A extends Common2 {}
		class AA extends A {}
		class B extends Common2 {}

		expect(uniqueAncestors(new AA(), new B())).to.deep.equal([[AA, A], [B]]);
	});
});