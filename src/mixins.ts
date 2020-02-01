import { proxyMix } from './proxy';
import { Class, Longest } from './types'; // TODO: need something more than just Longest: also forces all to be subset of longest
import { settings } from './settings';
import { copyProps, hardMixProtos, softMixProtos } from './util';

function Mixin<
	A extends any[], I1, S1
>(
	c1: Class<A, I1, S1>,
): Class<
	A,
	I1,
	S1
>;

function Mixin<
	A1 extends any[], I1, S1,
	A2 extends any[], I2, S2,
>(
	c1: Class<A1, I1, S1>,
	c2: Class<A2, I2, S2>,
): Class<
	Longest<A1, A2>,
	I1 & I2,
	S1 & S2
>;

function Mixin<
	A1 extends any[], I1, S1,
	A2 extends any[], I2, S2,
	A3 extends any[], I3, S3,
>(
	c1: Class<A1, I1, S1>,
	c2: Class<A2, I2, S2>,
	c3: Class<A3, I3, S3>,
): Class<
	Longest<A1, A2, A3>,
	I1 & I2 & I3,
	S1 & S2 & S3
>;

function Mixin<
	A1 extends any[], I1, S1,
	A2 extends any[], I2, S2,
	A3 extends any[], I3, S3,
	A4 extends any[], I4, S4,
>(
	c1: Class<A1, I1, S1>,
	c2: Class<A2, I2, S2>,
	c3: Class<A3, I3, S3>,
	c4: Class<A4, I4, S4>,
): Class<
	Longest<A1, A2, A3, A4>,
	I1 & I2 & I3 & I4,
	S1 & S2 & S3 & S4
>;

function Mixin<
	A1 extends any[], I1, S1,
	A2 extends any[], I2, S2,
	A3 extends any[], I3, S3,
	A4 extends any[], I4, S4,
	A5 extends any[], I5, S5,
>(
	c1: Class<A1, I1, S1>,
	c2: Class<A2, I2, S2>,
	c3: Class<A3, I3, S3>,
	c4: Class<A4, I4, S4>,
	c5: Class<A5, I5, S5>,
): Class<
	Longest<A1, A2, A3, A4, A5>,
	I1 & I2 & I3 & I4 & I5,
	S1 & S2 & S3 & S4 & S5
>;

function Mixin<
	A1 extends any[], I1, S1,
	A2 extends any[], I2, S2,
	A3 extends any[], I3, S3,
	A4 extends any[], I4, S4,
	A5 extends any[], I5, S5,
	A6 extends any[], I6, S6,
>(
	c1: Class<A1, I1, S1>,
	c2: Class<A2, I2, S2>,
	c3: Class<A3, I3, S3>,
	c4: Class<A4, I4, S4>,
	c5: Class<A5, I5, S5>,
	c6: Class<A6, I6, S6>,
): Class<
	Longest<A1, A2, A3, A4, A5, A6>,
	I1 & I2 & I3 & I4 & I5 & I6,
	S1 & S2 & S3 & S4 & S5 & S6
>;

function Mixin<
	A1 extends any[], I1, S1,
	A2 extends any[], I2, S2,
	A3 extends any[], I3, S3,
	A4 extends any[], I4, S4,
	A5 extends any[], I5, S5,
	A6 extends any[], I6, S6,
	A7 extends any[], I7, S7,
>(
	c1: Class<A1, I1, S1>,
	c2: Class<A2, I2, S2>,
	c3: Class<A3, I3, S3>,
	c4: Class<A4, I4, S4>,
	c5: Class<A5, I5, S5>,
	c6: Class<A6, I6, S6>,
	c7: Class<A7, I7, S7>,
): Class<
	Longest<A1, A2, A3, A4, A5, A6, A7>,
	I1 & I2 & I3 & I4 & I5 & I6 & I7,
	S1 & S2 & S3 & S4 & S5 & S6 & S7
>;

function Mixin<
	A1 extends any[], I1, S1,
	A2 extends any[], I2, S2,
	A3 extends any[], I3, S3,
	A4 extends any[], I4, S4,
	A5 extends any[], I5, S5,
	A6 extends any[], I6, S6,
	A7 extends any[], I7, S7,
	A8 extends any[], I8, S8,
>(
	c1: Class<A1, I1, S1>,
	c2: Class<A2, I2, S2>,
	c3: Class<A3, I3, S3>,
	c4: Class<A4, I4, S4>,
	c5: Class<A5, I5, S5>,
	c6: Class<A6, I6, S6>,
	c7: Class<A7, I7, S7>,
	c8: Class<A8, I8, S8>,
): Class<
	Longest<A1, A2, A3, A4, A5, A6, A7, A8>,
	I1 & I2 & I3 & I4 & I5 & I6 & I7 & I8,
	S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8
>;

function Mixin<
	A1 extends any[], I1, S1,
	A2 extends any[], I2, S2,
	A3 extends any[], I3, S3,
	A4 extends any[], I4, S4,
	A5 extends any[], I5, S5,
	A6 extends any[], I6, S6,
	A7 extends any[], I7, S7,
	A8 extends any[], I8, S8,
	A9 extends any[], I9, S9,
>(
	c1: Class<A1, I1, S1>,
	c2: Class<A2, I2, S2>,
	c3: Class<A3, I3, S3>,
	c4: Class<A4, I4, S4>,
	c5: Class<A5, I5, S5>,
	c6: Class<A6, I6, S6>,
	c7: Class<A7, I7, S7>,
	c8: Class<A8, I8, S8>,
	c9: Class<A9, I9, S9>,
): Class<
	Longest<A1, A2, A3, A4, A5, A6, A7, A8, A9>,
	I1 & I2 & I3 & I4 & I5 & I6 & I7 & I8 & I9,
	S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8 & S9
>;

function Mixin<
	A1 extends any[], I1, S1,
	A2 extends any[], I2, S2,
	A3 extends any[], I3, S3,
	A4 extends any[], I4, S4,
	A5 extends any[], I5, S5,
	A6 extends any[], I6, S6,
	A7 extends any[], I7, S7,
	A8 extends any[], I8, S8,
	A9 extends any[], I9, S9,
	A10 extends any[], I10, S10,
>(
	c1: Class<A1, I1, S1>,
	c2: Class<A2, I2, S2>,
	c3: Class<A3, I3, S3>,
	c4: Class<A4, I4, S4>,
	c5: Class<A5, I5, S5>,
	c6: Class<A6, I6, S6>,
	c7: Class<A7, I7, S7>,
	c8: Class<A8, I8, S8>,
	c9: Class<A9, I9, S9>,
	c10: Class<A10, I10, S10>,
): Class<
	Longest<A1, A2, A3, A4, A5, A6, A7, A8, A9, A10>,
	I1 & I2 & I3 & I4 & I5 & I6 & I7 & I8 & I9 & I10,
	S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8 & S9 & S10
>;

function Mixin(...constructors: Class[]) {
	const prototypes = constructors.map(constructor => constructor.prototype);

	function MixedClass(...args) {
		for (const constructor of constructors)
			copyProps(this, new constructor(...args));
	}

	MixedClass.prototype = settings.prototypeStrategy === 'copy'
		? hardMixProtos(prototypes, MixedClass)
		: softMixProtos(prototypes, MixedClass);

	Object.setPrototypeOf(
		MixedClass,
		settings.staticsStrategy === 'copy'
			? hardMixProtos(constructors, null, ['prototype'])
			: proxyMix(constructors, Function.prototype)
	);

	return MixedClass as any;
}

/**
 * A decorator version of the `Mixin` function.  You'll want to use this instead of `Mixin` for mixing generic classes.
 */
const mix = (...ingredients: Class[]) =>
	// @ts-ignore
	decoratedClass => Mixin(...(ingredients.concat([decoratedClass])));

export { Mixin, mix };
