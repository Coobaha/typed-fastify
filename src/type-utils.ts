import type {
  PositiveInfinity,
  NegativeInfinity,
  JsonPrimitive,
  JsonValue,
  EmptyObject,
  TypedArray,
  WritableDeep,
  IsNever,
  IsUnknown,
} from 'type-fest';
export type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;
export type Get<T, P> = P extends keyof T ? T[P] : never;
export type Get2<T, P, P2> = Get<Get<T, P>, P2>;
export type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2 ? true : false;

type IsNotJsonableError<T> = Invalid<`${Extract<T, string>} is not Json-like`> & {};

type NotJsonable = ((...arguments_: any[]) => any) | undefined | symbol | RegExp | Function;

type NeverToNull<T> = IsNever<T> extends true ? null : T;

type JsonCastBehavior = 'cast' | 'combine';

// Handles tuples and arrays
type JsonlikeList<T extends unknown[], DoNotCastToPrimitive extends JsonCastBehavior> = T extends []
  ? []
  : T extends [infer F, ...infer R]
  ? [NeverToNull<Jsonlike<F, DoNotCastToPrimitive>>, ...JsonlikeList<R, DoNotCastToPrimitive>]
  : IsUnknown<T[number]> extends true
  ? []
  : Array<T[number] extends NotJsonable ? null : Jsonlike<T[number], DoNotCastToPrimitive>>;

// tweaked version of Jsonify from type-fest
export type Jsonlike<T, CastBehavior extends JsonCastBehavior> = T extends PositiveInfinity | NegativeInfinity
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
    ? CastBehavior extends 'combine'
      ? T | J
      : J // Then T is Jsonable and its Jsonable value is J
    : Jsonlike<J, CastBehavior> // Maybe if we look a level deeper we'll find a JsonValue
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
  ? JsonlikeList<T, CastBehavior>
  : T extends readonly unknown[]
  ? JsonlikeList<WritableDeep<T>, CastBehavior>
  : T extends object
  ? {
      [K in keyof T]: [T[K]] extends [NotJsonable] | [never] ? IsNotJsonableError<K> : Jsonlike<T[K], CastBehavior>;
    } // JsonifyObject recursive call for its children
  : IsNotJsonableError<'Passed value'>;

export interface Invalid<msg = any> {
  readonly __INVALID__: unique symbol;
}
