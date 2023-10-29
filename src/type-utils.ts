import { PositiveInfinity, NegativeInfinity } from 'type-fest/source/numeric';
import { JsonPrimitive, JsonValue } from 'type-fest/source/basic';
import { EmptyObject } from 'type-fest/source/empty-object';
import { TypedArray } from 'type-fest/source/typed-array';
import { JsonifyList } from 'type-fest/source/jsonify';
import { WritableDeep } from 'type-fest/source/writable-deep';

export type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;
export type Get<T, P> = P extends keyof T ? T[P] : never;
export type Get2<T, P, P2> = Get<Get<T, P>, P2>;
export type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2 ? true : false;

type IsNotJsonableError<T> = Invalid<`${Extract<T, string>} is not Json-like`> & {};

type NotJsonable = ((...arguments_: any[]) => any) | undefined | symbol | RegExp | Function;

// tweaked version of Jsonify from type-fest
export type Jsonlike<T, DoNotCastToPrimitive extends boolean = false> = T extends PositiveInfinity | NegativeInfinity
  ? null
  : T extends NotJsonable
  ? IsNotJsonableError<'Passed value'>
  : T extends JsonPrimitive
  ? T
  : // Any object with toJSON is special case
  T extends {
      toJSON(): infer J;
    }
  ? (() => J) extends () => JsonValue // Is J assignable to JsonValue?
    ? DoNotCastToPrimitive extends true
      ? T
      : J // Then T is Jsonable and its Jsonable value is J
    : Jsonlike<J, DoNotCastToPrimitive> // Maybe if we look a level deeper we'll find a JsonValue
  : // Instanced primitives are objects
  T extends Number
  ? number
  : T extends String
  ? string
  : T extends Boolean
  ? boolean
  : T extends Map<any, any> | Set<any>
  ? EmptyObject
  : T extends TypedArray
  ? Record<string, number> // Non-JSONable type union was found not empty
  : T extends []
  ? []
  : T extends unknown[]
  ? JsonifyList<T>
  : T extends readonly unknown[]
  ? JsonifyList<WritableDeep<T>>
  : T extends object
  ? {
      [K in keyof T]: [T[K]] extends [NotJsonable] | [never]
        ? IsNotJsonableError<K>
        : Jsonlike<T[K], DoNotCastToPrimitive>;
    } // JsonifyObject recursive call for its children
  : IsNotJsonableError<'Passed value'>;

export interface Invalid<msg = any> {
  readonly __INVALID__: unique symbol;
}
