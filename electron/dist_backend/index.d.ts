
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Timesheet
 * 
 */
export type Timesheet = {
  id: string
  date: string
  time: string
  isEnter: boolean
  createdAt: Date
  updatedAt: Date
  employeeId: string
}

/**
 * Model Employee
 * 
 */
export type Employee = {
  id: string
  cardId: string
  name: string
  createdAt: Date
  updatedAt: Date
  groupId: string
  hasIrregularShifts: boolean
}

/**
 * Model Group
 * 
 */
export type Group = {
  id: string
  name: string
  startTime: string
  endTime: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Break
 * 
 */
export type Break = {
  id: string
  startTime: string
  endTime: string
  createdAt: Date
  updatedAt: Date
  groupId: string
}

/**
 * Model WorkShift
 * 
 */
export type WorkShift = {
  id: string
  date: string
  createdAt: Date
  updatedAt: Date
  groupId: string
  employeeId: string
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Timesheets
 * const timesheets = await prisma.timesheet.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Timesheets
   * const timesheets = await prisma.timesheet.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.timesheet`: Exposes CRUD operations for the **Timesheet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Timesheets
    * const timesheets = await prisma.timesheet.findMany()
    * ```
    */
  get timesheet(): Prisma.TimesheetDelegate<GlobalReject>;

  /**
   * `prisma.employee`: Exposes CRUD operations for the **Employee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employee.findMany()
    * ```
    */
  get employee(): Prisma.EmployeeDelegate<GlobalReject>;

  /**
   * `prisma.group`: Exposes CRUD operations for the **Group** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Groups
    * const groups = await prisma.group.findMany()
    * ```
    */
  get group(): Prisma.GroupDelegate<GlobalReject>;

  /**
   * `prisma.break`: Exposes CRUD operations for the **Break** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Breaks
    * const breaks = await prisma.break.findMany()
    * ```
    */
  get break(): Prisma.BreakDelegate<GlobalReject>;

  /**
   * `prisma.workShift`: Exposes CRUD operations for the **WorkShift** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkShifts
    * const workShifts = await prisma.workShift.findMany()
    * ```
    */
  get workShift(): Prisma.WorkShiftDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export import Metrics = runtime.Metrics
  export import Metric = runtime.Metric
  export import MetricHistogram = runtime.MetricHistogram
  export import MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
   * Extensions
   */
  export type Extension = runtime.Extension 

  /**
   * Prisma Client JS version: 4.5.0
   * Query Engine version: 0362da9eebca54d94c8ef5edd3b2e90af99ba452
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export import FieldRef = runtime.FieldRef

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    Timesheet: 'Timesheet',
    Employee: 'Employee',
    Group: 'Group',
    Break: 'Break',
    WorkShift: 'WorkShift'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type EmployeeCountOutputType
   */


  export type EmployeeCountOutputType = {
    Timesheet: number
    WorkShift: number
  }

  export type EmployeeCountOutputTypeSelect = {
    Timesheet?: boolean
    WorkShift?: boolean
  }

  export type EmployeeCountOutputTypeGetPayload<
    S extends boolean | null | undefined | EmployeeCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? EmployeeCountOutputType
    : S extends undefined
    ? never
    : S extends EmployeeCountOutputTypeArgs
    ?'include' extends U
    ? EmployeeCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof EmployeeCountOutputType ? EmployeeCountOutputType[P] : never
  } 
    : EmployeeCountOutputType
  : EmployeeCountOutputType




  // Custom InputTypes

  /**
   * EmployeeCountOutputType without action
   */
  export type EmployeeCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the EmployeeCountOutputType
     * 
    **/
    select?: EmployeeCountOutputTypeSelect | null
  }



  /**
   * Count Type GroupCountOutputType
   */


  export type GroupCountOutputType = {
    Employee: number
    Break: number
    WorkShift: number
  }

  export type GroupCountOutputTypeSelect = {
    Employee?: boolean
    Break?: boolean
    WorkShift?: boolean
  }

  export type GroupCountOutputTypeGetPayload<
    S extends boolean | null | undefined | GroupCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? GroupCountOutputType
    : S extends undefined
    ? never
    : S extends GroupCountOutputTypeArgs
    ?'include' extends U
    ? GroupCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof GroupCountOutputType ? GroupCountOutputType[P] : never
  } 
    : GroupCountOutputType
  : GroupCountOutputType




  // Custom InputTypes

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the GroupCountOutputType
     * 
    **/
    select?: GroupCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Timesheet
   */


  export type AggregateTimesheet = {
    _count: TimesheetCountAggregateOutputType | null
    _min: TimesheetMinAggregateOutputType | null
    _max: TimesheetMaxAggregateOutputType | null
  }

  export type TimesheetMinAggregateOutputType = {
    id: string | null
    date: string | null
    time: string | null
    isEnter: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    employeeId: string | null
  }

  export type TimesheetMaxAggregateOutputType = {
    id: string | null
    date: string | null
    time: string | null
    isEnter: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    employeeId: string | null
  }

  export type TimesheetCountAggregateOutputType = {
    id: number
    date: number
    time: number
    isEnter: number
    createdAt: number
    updatedAt: number
    employeeId: number
    _all: number
  }


  export type TimesheetMinAggregateInputType = {
    id?: true
    date?: true
    time?: true
    isEnter?: true
    createdAt?: true
    updatedAt?: true
    employeeId?: true
  }

  export type TimesheetMaxAggregateInputType = {
    id?: true
    date?: true
    time?: true
    isEnter?: true
    createdAt?: true
    updatedAt?: true
    employeeId?: true
  }

  export type TimesheetCountAggregateInputType = {
    id?: true
    date?: true
    time?: true
    isEnter?: true
    createdAt?: true
    updatedAt?: true
    employeeId?: true
    _all?: true
  }

  export type TimesheetAggregateArgs = {
    /**
     * Filter which Timesheet to aggregate.
     * 
    **/
    where?: TimesheetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Timesheets to fetch.
     * 
    **/
    orderBy?: Enumerable<TimesheetOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TimesheetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Timesheets from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Timesheets.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Timesheets
    **/
    _count?: true | TimesheetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimesheetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimesheetMaxAggregateInputType
  }

  export type GetTimesheetAggregateType<T extends TimesheetAggregateArgs> = {
        [P in keyof T & keyof AggregateTimesheet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimesheet[P]>
      : GetScalarType<T[P], AggregateTimesheet[P]>
  }




  export type TimesheetGroupByArgs = {
    where?: TimesheetWhereInput
    orderBy?: Enumerable<TimesheetOrderByWithAggregationInput>
    by: Array<TimesheetScalarFieldEnum>
    having?: TimesheetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimesheetCountAggregateInputType | true
    _min?: TimesheetMinAggregateInputType
    _max?: TimesheetMaxAggregateInputType
  }


  export type TimesheetGroupByOutputType = {
    id: string
    date: string
    time: string
    isEnter: boolean
    createdAt: Date
    updatedAt: Date
    employeeId: string
    _count: TimesheetCountAggregateOutputType | null
    _min: TimesheetMinAggregateOutputType | null
    _max: TimesheetMaxAggregateOutputType | null
  }

  type GetTimesheetGroupByPayload<T extends TimesheetGroupByArgs> = PrismaPromise<
    Array<
      PickArray<TimesheetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimesheetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimesheetGroupByOutputType[P]>
            : GetScalarType<T[P], TimesheetGroupByOutputType[P]>
        }
      >
    >


  export type TimesheetSelect = {
    id?: boolean
    employee?: boolean | EmployeeArgs
    date?: boolean
    time?: boolean
    isEnter?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    employeeId?: boolean
  }

  export type TimesheetInclude = {
    employee?: boolean | EmployeeArgs
  }

  export type TimesheetGetPayload<
    S extends boolean | null | undefined | TimesheetArgs,
    U = keyof S
      > = S extends true
        ? Timesheet
    : S extends undefined
    ? never
    : S extends TimesheetArgs | TimesheetFindManyArgs
    ?'include' extends U
    ? Timesheet  & {
    [P in TrueKeys<S['include']>]:
        P extends 'employee' ? EmployeeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'employee' ? EmployeeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Timesheet ? Timesheet[P] : never
  } 
    : Timesheet
  : Timesheet


  type TimesheetCountArgs = Merge<
    Omit<TimesheetFindManyArgs, 'select' | 'include'> & {
      select?: TimesheetCountAggregateInputType | true
    }
  >

  export interface TimesheetDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Timesheet that matches the filter.
     * @param {TimesheetFindUniqueArgs} args - Arguments to find a Timesheet
     * @example
     * // Get one Timesheet
     * const timesheet = await prisma.timesheet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TimesheetFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TimesheetFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Timesheet'> extends True ? CheckSelect<T, Prisma__TimesheetClient<Timesheet>, Prisma__TimesheetClient<TimesheetGetPayload<T>>> : CheckSelect<T, Prisma__TimesheetClient<Timesheet | null, null>, Prisma__TimesheetClient<TimesheetGetPayload<T> | null, null>>

    /**
     * Find the first Timesheet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetFindFirstArgs} args - Arguments to find a Timesheet
     * @example
     * // Get one Timesheet
     * const timesheet = await prisma.timesheet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TimesheetFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TimesheetFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Timesheet'> extends True ? CheckSelect<T, Prisma__TimesheetClient<Timesheet>, Prisma__TimesheetClient<TimesheetGetPayload<T>>> : CheckSelect<T, Prisma__TimesheetClient<Timesheet | null, null>, Prisma__TimesheetClient<TimesheetGetPayload<T> | null, null>>

    /**
     * Find zero or more Timesheets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Timesheets
     * const timesheets = await prisma.timesheet.findMany()
     * 
     * // Get first 10 Timesheets
     * const timesheets = await prisma.timesheet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timesheetWithIdOnly = await prisma.timesheet.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TimesheetFindManyArgs>(
      args?: SelectSubset<T, TimesheetFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Timesheet>>, PrismaPromise<Array<TimesheetGetPayload<T>>>>

    /**
     * Create a Timesheet.
     * @param {TimesheetCreateArgs} args - Arguments to create a Timesheet.
     * @example
     * // Create one Timesheet
     * const Timesheet = await prisma.timesheet.create({
     *   data: {
     *     // ... data to create a Timesheet
     *   }
     * })
     * 
    **/
    create<T extends TimesheetCreateArgs>(
      args: SelectSubset<T, TimesheetCreateArgs>
    ): CheckSelect<T, Prisma__TimesheetClient<Timesheet>, Prisma__TimesheetClient<TimesheetGetPayload<T>>>

    /**
     * Create many Timesheets.
     *     @param {TimesheetCreateManyArgs} args - Arguments to create many Timesheets.
     *     @example
     *     // Create many Timesheets
     *     const timesheet = await prisma.timesheet.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TimesheetCreateManyArgs>(
      args?: SelectSubset<T, TimesheetCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Timesheet.
     * @param {TimesheetDeleteArgs} args - Arguments to delete one Timesheet.
     * @example
     * // Delete one Timesheet
     * const Timesheet = await prisma.timesheet.delete({
     *   where: {
     *     // ... filter to delete one Timesheet
     *   }
     * })
     * 
    **/
    delete<T extends TimesheetDeleteArgs>(
      args: SelectSubset<T, TimesheetDeleteArgs>
    ): CheckSelect<T, Prisma__TimesheetClient<Timesheet>, Prisma__TimesheetClient<TimesheetGetPayload<T>>>

    /**
     * Update one Timesheet.
     * @param {TimesheetUpdateArgs} args - Arguments to update one Timesheet.
     * @example
     * // Update one Timesheet
     * const timesheet = await prisma.timesheet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TimesheetUpdateArgs>(
      args: SelectSubset<T, TimesheetUpdateArgs>
    ): CheckSelect<T, Prisma__TimesheetClient<Timesheet>, Prisma__TimesheetClient<TimesheetGetPayload<T>>>

    /**
     * Delete zero or more Timesheets.
     * @param {TimesheetDeleteManyArgs} args - Arguments to filter Timesheets to delete.
     * @example
     * // Delete a few Timesheets
     * const { count } = await prisma.timesheet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TimesheetDeleteManyArgs>(
      args?: SelectSubset<T, TimesheetDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Timesheets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Timesheets
     * const timesheet = await prisma.timesheet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TimesheetUpdateManyArgs>(
      args: SelectSubset<T, TimesheetUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Timesheet.
     * @param {TimesheetUpsertArgs} args - Arguments to update or create a Timesheet.
     * @example
     * // Update or create a Timesheet
     * const timesheet = await prisma.timesheet.upsert({
     *   create: {
     *     // ... data to create a Timesheet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Timesheet we want to update
     *   }
     * })
    **/
    upsert<T extends TimesheetUpsertArgs>(
      args: SelectSubset<T, TimesheetUpsertArgs>
    ): CheckSelect<T, Prisma__TimesheetClient<Timesheet>, Prisma__TimesheetClient<TimesheetGetPayload<T>>>

    /**
     * Find one Timesheet that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {TimesheetFindUniqueOrThrowArgs} args - Arguments to find a Timesheet
     * @example
     * // Get one Timesheet
     * const timesheet = await prisma.timesheet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TimesheetFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TimesheetFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__TimesheetClient<Timesheet>, Prisma__TimesheetClient<TimesheetGetPayload<T>>>

    /**
     * Find the first Timesheet that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetFindFirstOrThrowArgs} args - Arguments to find a Timesheet
     * @example
     * // Get one Timesheet
     * const timesheet = await prisma.timesheet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TimesheetFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TimesheetFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__TimesheetClient<Timesheet>, Prisma__TimesheetClient<TimesheetGetPayload<T>>>

    /**
     * Count the number of Timesheets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetCountArgs} args - Arguments to filter Timesheets to count.
     * @example
     * // Count the number of Timesheets
     * const count = await prisma.timesheet.count({
     *   where: {
     *     // ... the filter for the Timesheets we want to count
     *   }
     * })
    **/
    count<T extends TimesheetCountArgs>(
      args?: Subset<T, TimesheetCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimesheetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Timesheet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TimesheetAggregateArgs>(args: Subset<T, TimesheetAggregateArgs>): PrismaPromise<GetTimesheetAggregateType<T>>

    /**
     * Group by Timesheet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimesheetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TimesheetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimesheetGroupByArgs['orderBy'] }
        : { orderBy?: TimesheetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TimesheetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimesheetGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Timesheet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TimesheetClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    employee<T extends EmployeeArgs = {}>(args?: Subset<T, EmployeeArgs>): CheckSelect<T, Prisma__EmployeeClient<Employee | Null>, Prisma__EmployeeClient<EmployeeGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Timesheet base type for findUnique actions
   */
  export type TimesheetFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Timesheet
     * 
    **/
    select?: TimesheetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TimesheetInclude | null
    /**
     * Filter, which Timesheet to fetch.
     * 
    **/
    where: TimesheetWhereUniqueInput
  }

  /**
   * Timesheet: findUnique
   */
  export interface TimesheetFindUniqueArgs extends TimesheetFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Timesheet base type for findFirst actions
   */
  export type TimesheetFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Timesheet
     * 
    **/
    select?: TimesheetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TimesheetInclude | null
    /**
     * Filter, which Timesheet to fetch.
     * 
    **/
    where?: TimesheetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Timesheets to fetch.
     * 
    **/
    orderBy?: Enumerable<TimesheetOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Timesheets.
     * 
    **/
    cursor?: TimesheetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Timesheets from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Timesheets.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Timesheets.
     * 
    **/
    distinct?: Enumerable<TimesheetScalarFieldEnum>
  }

  /**
   * Timesheet: findFirst
   */
  export interface TimesheetFindFirstArgs extends TimesheetFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Timesheet findMany
   */
  export type TimesheetFindManyArgs = {
    /**
     * Select specific fields to fetch from the Timesheet
     * 
    **/
    select?: TimesheetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TimesheetInclude | null
    /**
     * Filter, which Timesheets to fetch.
     * 
    **/
    where?: TimesheetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Timesheets to fetch.
     * 
    **/
    orderBy?: Enumerable<TimesheetOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Timesheets.
     * 
    **/
    cursor?: TimesheetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Timesheets from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Timesheets.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TimesheetScalarFieldEnum>
  }


  /**
   * Timesheet create
   */
  export type TimesheetCreateArgs = {
    /**
     * Select specific fields to fetch from the Timesheet
     * 
    **/
    select?: TimesheetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TimesheetInclude | null
    /**
     * The data needed to create a Timesheet.
     * 
    **/
    data: XOR<TimesheetCreateInput, TimesheetUncheckedCreateInput>
  }


  /**
   * Timesheet createMany
   */
  export type TimesheetCreateManyArgs = {
    /**
     * The data used to create many Timesheets.
     * 
    **/
    data: Enumerable<TimesheetCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Timesheet update
   */
  export type TimesheetUpdateArgs = {
    /**
     * Select specific fields to fetch from the Timesheet
     * 
    **/
    select?: TimesheetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TimesheetInclude | null
    /**
     * The data needed to update a Timesheet.
     * 
    **/
    data: XOR<TimesheetUpdateInput, TimesheetUncheckedUpdateInput>
    /**
     * Choose, which Timesheet to update.
     * 
    **/
    where: TimesheetWhereUniqueInput
  }


  /**
   * Timesheet updateMany
   */
  export type TimesheetUpdateManyArgs = {
    /**
     * The data used to update Timesheets.
     * 
    **/
    data: XOR<TimesheetUpdateManyMutationInput, TimesheetUncheckedUpdateManyInput>
    /**
     * Filter which Timesheets to update
     * 
    **/
    where?: TimesheetWhereInput
  }


  /**
   * Timesheet upsert
   */
  export type TimesheetUpsertArgs = {
    /**
     * Select specific fields to fetch from the Timesheet
     * 
    **/
    select?: TimesheetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TimesheetInclude | null
    /**
     * The filter to search for the Timesheet to update in case it exists.
     * 
    **/
    where: TimesheetWhereUniqueInput
    /**
     * In case the Timesheet found by the `where` argument doesn't exist, create a new Timesheet with this data.
     * 
    **/
    create: XOR<TimesheetCreateInput, TimesheetUncheckedCreateInput>
    /**
     * In case the Timesheet was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TimesheetUpdateInput, TimesheetUncheckedUpdateInput>
  }


  /**
   * Timesheet delete
   */
  export type TimesheetDeleteArgs = {
    /**
     * Select specific fields to fetch from the Timesheet
     * 
    **/
    select?: TimesheetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TimesheetInclude | null
    /**
     * Filter which Timesheet to delete.
     * 
    **/
    where: TimesheetWhereUniqueInput
  }


  /**
   * Timesheet deleteMany
   */
  export type TimesheetDeleteManyArgs = {
    /**
     * Filter which Timesheets to delete
     * 
    **/
    where?: TimesheetWhereInput
  }


  /**
   * Timesheet: findUniqueOrThrow
   */
  export type TimesheetFindUniqueOrThrowArgs = TimesheetFindUniqueArgsBase
      

  /**
   * Timesheet: findFirstOrThrow
   */
  export type TimesheetFindFirstOrThrowArgs = TimesheetFindFirstArgsBase
      

  /**
   * Timesheet without action
   */
  export type TimesheetArgs = {
    /**
     * Select specific fields to fetch from the Timesheet
     * 
    **/
    select?: TimesheetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TimesheetInclude | null
  }



  /**
   * Model Employee
   */


  export type AggregateEmployee = {
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  export type EmployeeMinAggregateOutputType = {
    id: string | null
    cardId: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    groupId: string | null
    hasIrregularShifts: boolean | null
  }

  export type EmployeeMaxAggregateOutputType = {
    id: string | null
    cardId: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    groupId: string | null
    hasIrregularShifts: boolean | null
  }

  export type EmployeeCountAggregateOutputType = {
    id: number
    cardId: number
    name: number
    createdAt: number
    updatedAt: number
    groupId: number
    hasIrregularShifts: number
    _all: number
  }


  export type EmployeeMinAggregateInputType = {
    id?: true
    cardId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    groupId?: true
    hasIrregularShifts?: true
  }

  export type EmployeeMaxAggregateInputType = {
    id?: true
    cardId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    groupId?: true
    hasIrregularShifts?: true
  }

  export type EmployeeCountAggregateInputType = {
    id?: true
    cardId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    groupId?: true
    hasIrregularShifts?: true
    _all?: true
  }

  export type EmployeeAggregateArgs = {
    /**
     * Filter which Employee to aggregate.
     * 
    **/
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     * 
    **/
    orderBy?: Enumerable<EmployeeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employees
    **/
    _count?: true | EmployeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeMaxAggregateInputType
  }

  export type GetEmployeeAggregateType<T extends EmployeeAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployee[P]>
      : GetScalarType<T[P], AggregateEmployee[P]>
  }




  export type EmployeeGroupByArgs = {
    where?: EmployeeWhereInput
    orderBy?: Enumerable<EmployeeOrderByWithAggregationInput>
    by: Array<EmployeeScalarFieldEnum>
    having?: EmployeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeCountAggregateInputType | true
    _min?: EmployeeMinAggregateInputType
    _max?: EmployeeMaxAggregateInputType
  }


  export type EmployeeGroupByOutputType = {
    id: string
    cardId: string
    name: string
    createdAt: Date
    updatedAt: Date
    groupId: string
    hasIrregularShifts: boolean
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  type GetEmployeeGroupByPayload<T extends EmployeeGroupByArgs> = PrismaPromise<
    Array<
      PickArray<EmployeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeSelect = {
    id?: boolean
    cardId?: boolean
    name?: boolean
    group?: boolean | GroupArgs
    createdAt?: boolean
    updatedAt?: boolean
    Timesheet?: boolean | TimesheetFindManyArgs
    groupId?: boolean
    hasIrregularShifts?: boolean
    WorkShift?: boolean | WorkShiftFindManyArgs
    _count?: boolean | EmployeeCountOutputTypeArgs
  }

  export type EmployeeInclude = {
    group?: boolean | GroupArgs
    Timesheet?: boolean | TimesheetFindManyArgs
    WorkShift?: boolean | WorkShiftFindManyArgs
    _count?: boolean | EmployeeCountOutputTypeArgs
  }

  export type EmployeeGetPayload<
    S extends boolean | null | undefined | EmployeeArgs,
    U = keyof S
      > = S extends true
        ? Employee
    : S extends undefined
    ? never
    : S extends EmployeeArgs | EmployeeFindManyArgs
    ?'include' extends U
    ? Employee  & {
    [P in TrueKeys<S['include']>]:
        P extends 'group' ? GroupGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'Timesheet' ? Array < TimesheetGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'WorkShift' ? Array < WorkShiftGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? EmployeeCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'group' ? GroupGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'Timesheet' ? Array < TimesheetGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'WorkShift' ? Array < WorkShiftGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? EmployeeCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Employee ? Employee[P] : never
  } 
    : Employee
  : Employee


  type EmployeeCountArgs = Merge<
    Omit<EmployeeFindManyArgs, 'select' | 'include'> & {
      select?: EmployeeCountAggregateInputType | true
    }
  >

  export interface EmployeeDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Employee that matches the filter.
     * @param {EmployeeFindUniqueArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EmployeeFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, EmployeeFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Employee'> extends True ? CheckSelect<T, Prisma__EmployeeClient<Employee>, Prisma__EmployeeClient<EmployeeGetPayload<T>>> : CheckSelect<T, Prisma__EmployeeClient<Employee | null, null>, Prisma__EmployeeClient<EmployeeGetPayload<T> | null, null>>

    /**
     * Find the first Employee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EmployeeFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, EmployeeFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Employee'> extends True ? CheckSelect<T, Prisma__EmployeeClient<Employee>, Prisma__EmployeeClient<EmployeeGetPayload<T>>> : CheckSelect<T, Prisma__EmployeeClient<Employee | null, null>, Prisma__EmployeeClient<EmployeeGetPayload<T> | null, null>>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employee.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeWithIdOnly = await prisma.employee.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends EmployeeFindManyArgs>(
      args?: SelectSubset<T, EmployeeFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Employee>>, PrismaPromise<Array<EmployeeGetPayload<T>>>>

    /**
     * Create a Employee.
     * @param {EmployeeCreateArgs} args - Arguments to create a Employee.
     * @example
     * // Create one Employee
     * const Employee = await prisma.employee.create({
     *   data: {
     *     // ... data to create a Employee
     *   }
     * })
     * 
    **/
    create<T extends EmployeeCreateArgs>(
      args: SelectSubset<T, EmployeeCreateArgs>
    ): CheckSelect<T, Prisma__EmployeeClient<Employee>, Prisma__EmployeeClient<EmployeeGetPayload<T>>>

    /**
     * Create many Employees.
     *     @param {EmployeeCreateManyArgs} args - Arguments to create many Employees.
     *     @example
     *     // Create many Employees
     *     const employee = await prisma.employee.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EmployeeCreateManyArgs>(
      args?: SelectSubset<T, EmployeeCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Employee.
     * @param {EmployeeDeleteArgs} args - Arguments to delete one Employee.
     * @example
     * // Delete one Employee
     * const Employee = await prisma.employee.delete({
     *   where: {
     *     // ... filter to delete one Employee
     *   }
     * })
     * 
    **/
    delete<T extends EmployeeDeleteArgs>(
      args: SelectSubset<T, EmployeeDeleteArgs>
    ): CheckSelect<T, Prisma__EmployeeClient<Employee>, Prisma__EmployeeClient<EmployeeGetPayload<T>>>

    /**
     * Update one Employee.
     * @param {EmployeeUpdateArgs} args - Arguments to update one Employee.
     * @example
     * // Update one Employee
     * const employee = await prisma.employee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EmployeeUpdateArgs>(
      args: SelectSubset<T, EmployeeUpdateArgs>
    ): CheckSelect<T, Prisma__EmployeeClient<Employee>, Prisma__EmployeeClient<EmployeeGetPayload<T>>>

    /**
     * Delete zero or more Employees.
     * @param {EmployeeDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EmployeeDeleteManyArgs>(
      args?: SelectSubset<T, EmployeeDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EmployeeUpdateManyArgs>(
      args: SelectSubset<T, EmployeeUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Employee.
     * @param {EmployeeUpsertArgs} args - Arguments to update or create a Employee.
     * @example
     * // Update or create a Employee
     * const employee = await prisma.employee.upsert({
     *   create: {
     *     // ... data to create a Employee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employee we want to update
     *   }
     * })
    **/
    upsert<T extends EmployeeUpsertArgs>(
      args: SelectSubset<T, EmployeeUpsertArgs>
    ): CheckSelect<T, Prisma__EmployeeClient<Employee>, Prisma__EmployeeClient<EmployeeGetPayload<T>>>

    /**
     * Find one Employee that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {EmployeeFindUniqueOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends EmployeeFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, EmployeeFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__EmployeeClient<Employee>, Prisma__EmployeeClient<EmployeeGetPayload<T>>>

    /**
     * Find the first Employee that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends EmployeeFindFirstOrThrowArgs>(
      args?: SelectSubset<T, EmployeeFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__EmployeeClient<Employee>, Prisma__EmployeeClient<EmployeeGetPayload<T>>>

    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employee.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends EmployeeCountArgs>(
      args?: Subset<T, EmployeeCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployeeAggregateArgs>(args: Subset<T, EmployeeAggregateArgs>): PrismaPromise<GetEmployeeAggregateType<T>>

    /**
     * Group by Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Employee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EmployeeClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    group<T extends GroupArgs = {}>(args?: Subset<T, GroupArgs>): CheckSelect<T, Prisma__GroupClient<Group | Null>, Prisma__GroupClient<GroupGetPayload<T> | Null>>;

    Timesheet<T extends TimesheetFindManyArgs = {}>(args?: Subset<T, TimesheetFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Timesheet>| Null>, PrismaPromise<Array<TimesheetGetPayload<T>>| Null>>;

    WorkShift<T extends WorkShiftFindManyArgs = {}>(args?: Subset<T, WorkShiftFindManyArgs>): CheckSelect<T, PrismaPromise<Array<WorkShift>| Null>, PrismaPromise<Array<WorkShiftGetPayload<T>>| Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Employee base type for findUnique actions
   */
  export type EmployeeFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Employee
     * 
    **/
    select?: EmployeeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmployeeInclude | null
    /**
     * Filter, which Employee to fetch.
     * 
    **/
    where: EmployeeWhereUniqueInput
  }

  /**
   * Employee: findUnique
   */
  export interface EmployeeFindUniqueArgs extends EmployeeFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Employee base type for findFirst actions
   */
  export type EmployeeFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Employee
     * 
    **/
    select?: EmployeeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmployeeInclude | null
    /**
     * Filter, which Employee to fetch.
     * 
    **/
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     * 
    **/
    orderBy?: Enumerable<EmployeeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     * 
    **/
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     * 
    **/
    distinct?: Enumerable<EmployeeScalarFieldEnum>
  }

  /**
   * Employee: findFirst
   */
  export interface EmployeeFindFirstArgs extends EmployeeFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Employee findMany
   */
  export type EmployeeFindManyArgs = {
    /**
     * Select specific fields to fetch from the Employee
     * 
    **/
    select?: EmployeeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmployeeInclude | null
    /**
     * Filter, which Employees to fetch.
     * 
    **/
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     * 
    **/
    orderBy?: Enumerable<EmployeeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employees.
     * 
    **/
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     * 
    **/
    skip?: number
    distinct?: Enumerable<EmployeeScalarFieldEnum>
  }


  /**
   * Employee create
   */
  export type EmployeeCreateArgs = {
    /**
     * Select specific fields to fetch from the Employee
     * 
    **/
    select?: EmployeeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmployeeInclude | null
    /**
     * The data needed to create a Employee.
     * 
    **/
    data: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
  }


  /**
   * Employee createMany
   */
  export type EmployeeCreateManyArgs = {
    /**
     * The data used to create many Employees.
     * 
    **/
    data: Enumerable<EmployeeCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Employee update
   */
  export type EmployeeUpdateArgs = {
    /**
     * Select specific fields to fetch from the Employee
     * 
    **/
    select?: EmployeeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmployeeInclude | null
    /**
     * The data needed to update a Employee.
     * 
    **/
    data: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
    /**
     * Choose, which Employee to update.
     * 
    **/
    where: EmployeeWhereUniqueInput
  }


  /**
   * Employee updateMany
   */
  export type EmployeeUpdateManyArgs = {
    /**
     * The data used to update Employees.
     * 
    **/
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     * 
    **/
    where?: EmployeeWhereInput
  }


  /**
   * Employee upsert
   */
  export type EmployeeUpsertArgs = {
    /**
     * Select specific fields to fetch from the Employee
     * 
    **/
    select?: EmployeeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmployeeInclude | null
    /**
     * The filter to search for the Employee to update in case it exists.
     * 
    **/
    where: EmployeeWhereUniqueInput
    /**
     * In case the Employee found by the `where` argument doesn't exist, create a new Employee with this data.
     * 
    **/
    create: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
    /**
     * In case the Employee was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
  }


  /**
   * Employee delete
   */
  export type EmployeeDeleteArgs = {
    /**
     * Select specific fields to fetch from the Employee
     * 
    **/
    select?: EmployeeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmployeeInclude | null
    /**
     * Filter which Employee to delete.
     * 
    **/
    where: EmployeeWhereUniqueInput
  }


  /**
   * Employee deleteMany
   */
  export type EmployeeDeleteManyArgs = {
    /**
     * Filter which Employees to delete
     * 
    **/
    where?: EmployeeWhereInput
  }


  /**
   * Employee: findUniqueOrThrow
   */
  export type EmployeeFindUniqueOrThrowArgs = EmployeeFindUniqueArgsBase
      

  /**
   * Employee: findFirstOrThrow
   */
  export type EmployeeFindFirstOrThrowArgs = EmployeeFindFirstArgsBase
      

  /**
   * Employee without action
   */
  export type EmployeeArgs = {
    /**
     * Select specific fields to fetch from the Employee
     * 
    **/
    select?: EmployeeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmployeeInclude | null
  }



  /**
   * Model Group
   */


  export type AggregateGroup = {
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  export type GroupMinAggregateOutputType = {
    id: string | null
    name: string | null
    startTime: string | null
    endTime: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupMaxAggregateOutputType = {
    id: string | null
    name: string | null
    startTime: string | null
    endTime: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupCountAggregateOutputType = {
    id: number
    name: number
    startTime: number
    endTime: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GroupMinAggregateInputType = {
    id?: true
    name?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupMaxAggregateInputType = {
    id?: true
    name?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupCountAggregateInputType = {
    id?: true
    name?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GroupAggregateArgs = {
    /**
     * Filter which Group to aggregate.
     * 
    **/
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     * 
    **/
    orderBy?: Enumerable<GroupOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Groups
    **/
    _count?: true | GroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMaxAggregateInputType
  }

  export type GetGroupAggregateType<T extends GroupAggregateArgs> = {
        [P in keyof T & keyof AggregateGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroup[P]>
      : GetScalarType<T[P], AggregateGroup[P]>
  }




  export type GroupGroupByArgs = {
    where?: GroupWhereInput
    orderBy?: Enumerable<GroupOrderByWithAggregationInput>
    by: Array<GroupScalarFieldEnum>
    having?: GroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupCountAggregateInputType | true
    _min?: GroupMinAggregateInputType
    _max?: GroupMaxAggregateInputType
  }


  export type GroupGroupByOutputType = {
    id: string
    name: string
    startTime: string
    endTime: string
    createdAt: Date
    updatedAt: Date
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  type GetGroupGroupByPayload<T extends GroupGroupByArgs> = PrismaPromise<
    Array<
      PickArray<GroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupGroupByOutputType[P]>
            : GetScalarType<T[P], GroupGroupByOutputType[P]>
        }
      >
    >


  export type GroupSelect = {
    id?: boolean
    name?: boolean
    startTime?: boolean
    endTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Employee?: boolean | EmployeeFindManyArgs
    Break?: boolean | BreakFindManyArgs
    WorkShift?: boolean | WorkShiftFindManyArgs
    _count?: boolean | GroupCountOutputTypeArgs
  }

  export type GroupInclude = {
    Employee?: boolean | EmployeeFindManyArgs
    Break?: boolean | BreakFindManyArgs
    WorkShift?: boolean | WorkShiftFindManyArgs
    _count?: boolean | GroupCountOutputTypeArgs
  }

  export type GroupGetPayload<
    S extends boolean | null | undefined | GroupArgs,
    U = keyof S
      > = S extends true
        ? Group
    : S extends undefined
    ? never
    : S extends GroupArgs | GroupFindManyArgs
    ?'include' extends U
    ? Group  & {
    [P in TrueKeys<S['include']>]:
        P extends 'Employee' ? Array < EmployeeGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'Break' ? Array < BreakGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'WorkShift' ? Array < WorkShiftGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? GroupCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'Employee' ? Array < EmployeeGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'Break' ? Array < BreakGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'WorkShift' ? Array < WorkShiftGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? GroupCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Group ? Group[P] : never
  } 
    : Group
  : Group


  type GroupCountArgs = Merge<
    Omit<GroupFindManyArgs, 'select' | 'include'> & {
      select?: GroupCountAggregateInputType | true
    }
  >

  export interface GroupDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Group that matches the filter.
     * @param {GroupFindUniqueArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends GroupFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, GroupFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Group'> extends True ? CheckSelect<T, Prisma__GroupClient<Group>, Prisma__GroupClient<GroupGetPayload<T>>> : CheckSelect<T, Prisma__GroupClient<Group | null, null>, Prisma__GroupClient<GroupGetPayload<T> | null, null>>

    /**
     * Find the first Group that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends GroupFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, GroupFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Group'> extends True ? CheckSelect<T, Prisma__GroupClient<Group>, Prisma__GroupClient<GroupGetPayload<T>>> : CheckSelect<T, Prisma__GroupClient<Group | null, null>, Prisma__GroupClient<GroupGetPayload<T> | null, null>>

    /**
     * Find zero or more Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Groups
     * const groups = await prisma.group.findMany()
     * 
     * // Get first 10 Groups
     * const groups = await prisma.group.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupWithIdOnly = await prisma.group.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends GroupFindManyArgs>(
      args?: SelectSubset<T, GroupFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Group>>, PrismaPromise<Array<GroupGetPayload<T>>>>

    /**
     * Create a Group.
     * @param {GroupCreateArgs} args - Arguments to create a Group.
     * @example
     * // Create one Group
     * const Group = await prisma.group.create({
     *   data: {
     *     // ... data to create a Group
     *   }
     * })
     * 
    **/
    create<T extends GroupCreateArgs>(
      args: SelectSubset<T, GroupCreateArgs>
    ): CheckSelect<T, Prisma__GroupClient<Group>, Prisma__GroupClient<GroupGetPayload<T>>>

    /**
     * Create many Groups.
     *     @param {GroupCreateManyArgs} args - Arguments to create many Groups.
     *     @example
     *     // Create many Groups
     *     const group = await prisma.group.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends GroupCreateManyArgs>(
      args?: SelectSubset<T, GroupCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Group.
     * @param {GroupDeleteArgs} args - Arguments to delete one Group.
     * @example
     * // Delete one Group
     * const Group = await prisma.group.delete({
     *   where: {
     *     // ... filter to delete one Group
     *   }
     * })
     * 
    **/
    delete<T extends GroupDeleteArgs>(
      args: SelectSubset<T, GroupDeleteArgs>
    ): CheckSelect<T, Prisma__GroupClient<Group>, Prisma__GroupClient<GroupGetPayload<T>>>

    /**
     * Update one Group.
     * @param {GroupUpdateArgs} args - Arguments to update one Group.
     * @example
     * // Update one Group
     * const group = await prisma.group.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends GroupUpdateArgs>(
      args: SelectSubset<T, GroupUpdateArgs>
    ): CheckSelect<T, Prisma__GroupClient<Group>, Prisma__GroupClient<GroupGetPayload<T>>>

    /**
     * Delete zero or more Groups.
     * @param {GroupDeleteManyArgs} args - Arguments to filter Groups to delete.
     * @example
     * // Delete a few Groups
     * const { count } = await prisma.group.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends GroupDeleteManyArgs>(
      args?: SelectSubset<T, GroupDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends GroupUpdateManyArgs>(
      args: SelectSubset<T, GroupUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Group.
     * @param {GroupUpsertArgs} args - Arguments to update or create a Group.
     * @example
     * // Update or create a Group
     * const group = await prisma.group.upsert({
     *   create: {
     *     // ... data to create a Group
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Group we want to update
     *   }
     * })
    **/
    upsert<T extends GroupUpsertArgs>(
      args: SelectSubset<T, GroupUpsertArgs>
    ): CheckSelect<T, Prisma__GroupClient<Group>, Prisma__GroupClient<GroupGetPayload<T>>>

    /**
     * Find one Group that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {GroupFindUniqueOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends GroupFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, GroupFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__GroupClient<Group>, Prisma__GroupClient<GroupGetPayload<T>>>

    /**
     * Find the first Group that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends GroupFindFirstOrThrowArgs>(
      args?: SelectSubset<T, GroupFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__GroupClient<Group>, Prisma__GroupClient<GroupGetPayload<T>>>

    /**
     * Count the number of Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupCountArgs} args - Arguments to filter Groups to count.
     * @example
     * // Count the number of Groups
     * const count = await prisma.group.count({
     *   where: {
     *     // ... the filter for the Groups we want to count
     *   }
     * })
    **/
    count<T extends GroupCountArgs>(
      args?: Subset<T, GroupCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GroupAggregateArgs>(args: Subset<T, GroupAggregateArgs>): PrismaPromise<GetGroupAggregateType<T>>

    /**
     * Group by Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupGroupByArgs['orderBy'] }
        : { orderBy?: GroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Group.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__GroupClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Employee<T extends EmployeeFindManyArgs = {}>(args?: Subset<T, EmployeeFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Employee>| Null>, PrismaPromise<Array<EmployeeGetPayload<T>>| Null>>;

    Break<T extends BreakFindManyArgs = {}>(args?: Subset<T, BreakFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Break>| Null>, PrismaPromise<Array<BreakGetPayload<T>>| Null>>;

    WorkShift<T extends WorkShiftFindManyArgs = {}>(args?: Subset<T, WorkShiftFindManyArgs>): CheckSelect<T, PrismaPromise<Array<WorkShift>| Null>, PrismaPromise<Array<WorkShiftGetPayload<T>>| Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Group base type for findUnique actions
   */
  export type GroupFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Group
     * 
    **/
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GroupInclude | null
    /**
     * Filter, which Group to fetch.
     * 
    **/
    where: GroupWhereUniqueInput
  }

  /**
   * Group: findUnique
   */
  export interface GroupFindUniqueArgs extends GroupFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Group base type for findFirst actions
   */
  export type GroupFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Group
     * 
    **/
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GroupInclude | null
    /**
     * Filter, which Group to fetch.
     * 
    **/
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     * 
    **/
    orderBy?: Enumerable<GroupOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     * 
    **/
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     * 
    **/
    distinct?: Enumerable<GroupScalarFieldEnum>
  }

  /**
   * Group: findFirst
   */
  export interface GroupFindFirstArgs extends GroupFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Group findMany
   */
  export type GroupFindManyArgs = {
    /**
     * Select specific fields to fetch from the Group
     * 
    **/
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GroupInclude | null
    /**
     * Filter, which Groups to fetch.
     * 
    **/
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     * 
    **/
    orderBy?: Enumerable<GroupOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Groups.
     * 
    **/
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     * 
    **/
    skip?: number
    distinct?: Enumerable<GroupScalarFieldEnum>
  }


  /**
   * Group create
   */
  export type GroupCreateArgs = {
    /**
     * Select specific fields to fetch from the Group
     * 
    **/
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GroupInclude | null
    /**
     * The data needed to create a Group.
     * 
    **/
    data: XOR<GroupCreateInput, GroupUncheckedCreateInput>
  }


  /**
   * Group createMany
   */
  export type GroupCreateManyArgs = {
    /**
     * The data used to create many Groups.
     * 
    **/
    data: Enumerable<GroupCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Group update
   */
  export type GroupUpdateArgs = {
    /**
     * Select specific fields to fetch from the Group
     * 
    **/
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GroupInclude | null
    /**
     * The data needed to update a Group.
     * 
    **/
    data: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
    /**
     * Choose, which Group to update.
     * 
    **/
    where: GroupWhereUniqueInput
  }


  /**
   * Group updateMany
   */
  export type GroupUpdateManyArgs = {
    /**
     * The data used to update Groups.
     * 
    **/
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     * 
    **/
    where?: GroupWhereInput
  }


  /**
   * Group upsert
   */
  export type GroupUpsertArgs = {
    /**
     * Select specific fields to fetch from the Group
     * 
    **/
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GroupInclude | null
    /**
     * The filter to search for the Group to update in case it exists.
     * 
    **/
    where: GroupWhereUniqueInput
    /**
     * In case the Group found by the `where` argument doesn't exist, create a new Group with this data.
     * 
    **/
    create: XOR<GroupCreateInput, GroupUncheckedCreateInput>
    /**
     * In case the Group was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
  }


  /**
   * Group delete
   */
  export type GroupDeleteArgs = {
    /**
     * Select specific fields to fetch from the Group
     * 
    **/
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GroupInclude | null
    /**
     * Filter which Group to delete.
     * 
    **/
    where: GroupWhereUniqueInput
  }


  /**
   * Group deleteMany
   */
  export type GroupDeleteManyArgs = {
    /**
     * Filter which Groups to delete
     * 
    **/
    where?: GroupWhereInput
  }


  /**
   * Group: findUniqueOrThrow
   */
  export type GroupFindUniqueOrThrowArgs = GroupFindUniqueArgsBase
      

  /**
   * Group: findFirstOrThrow
   */
  export type GroupFindFirstOrThrowArgs = GroupFindFirstArgsBase
      

  /**
   * Group without action
   */
  export type GroupArgs = {
    /**
     * Select specific fields to fetch from the Group
     * 
    **/
    select?: GroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GroupInclude | null
  }



  /**
   * Model Break
   */


  export type AggregateBreak = {
    _count: BreakCountAggregateOutputType | null
    _min: BreakMinAggregateOutputType | null
    _max: BreakMaxAggregateOutputType | null
  }

  export type BreakMinAggregateOutputType = {
    id: string | null
    startTime: string | null
    endTime: string | null
    createdAt: Date | null
    updatedAt: Date | null
    groupId: string | null
  }

  export type BreakMaxAggregateOutputType = {
    id: string | null
    startTime: string | null
    endTime: string | null
    createdAt: Date | null
    updatedAt: Date | null
    groupId: string | null
  }

  export type BreakCountAggregateOutputType = {
    id: number
    startTime: number
    endTime: number
    createdAt: number
    updatedAt: number
    groupId: number
    _all: number
  }


  export type BreakMinAggregateInputType = {
    id?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
    groupId?: true
  }

  export type BreakMaxAggregateInputType = {
    id?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
    groupId?: true
  }

  export type BreakCountAggregateInputType = {
    id?: true
    startTime?: true
    endTime?: true
    createdAt?: true
    updatedAt?: true
    groupId?: true
    _all?: true
  }

  export type BreakAggregateArgs = {
    /**
     * Filter which Break to aggregate.
     * 
    **/
    where?: BreakWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Breaks to fetch.
     * 
    **/
    orderBy?: Enumerable<BreakOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: BreakWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Breaks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Breaks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Breaks
    **/
    _count?: true | BreakCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BreakMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BreakMaxAggregateInputType
  }

  export type GetBreakAggregateType<T extends BreakAggregateArgs> = {
        [P in keyof T & keyof AggregateBreak]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBreak[P]>
      : GetScalarType<T[P], AggregateBreak[P]>
  }




  export type BreakGroupByArgs = {
    where?: BreakWhereInput
    orderBy?: Enumerable<BreakOrderByWithAggregationInput>
    by: Array<BreakScalarFieldEnum>
    having?: BreakScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BreakCountAggregateInputType | true
    _min?: BreakMinAggregateInputType
    _max?: BreakMaxAggregateInputType
  }


  export type BreakGroupByOutputType = {
    id: string
    startTime: string
    endTime: string
    createdAt: Date
    updatedAt: Date
    groupId: string
    _count: BreakCountAggregateOutputType | null
    _min: BreakMinAggregateOutputType | null
    _max: BreakMaxAggregateOutputType | null
  }

  type GetBreakGroupByPayload<T extends BreakGroupByArgs> = PrismaPromise<
    Array<
      PickArray<BreakGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BreakGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BreakGroupByOutputType[P]>
            : GetScalarType<T[P], BreakGroupByOutputType[P]>
        }
      >
    >


  export type BreakSelect = {
    id?: boolean
    startTime?: boolean
    endTime?: boolean
    group?: boolean | GroupArgs
    createdAt?: boolean
    updatedAt?: boolean
    groupId?: boolean
  }

  export type BreakInclude = {
    group?: boolean | GroupArgs
  }

  export type BreakGetPayload<
    S extends boolean | null | undefined | BreakArgs,
    U = keyof S
      > = S extends true
        ? Break
    : S extends undefined
    ? never
    : S extends BreakArgs | BreakFindManyArgs
    ?'include' extends U
    ? Break  & {
    [P in TrueKeys<S['include']>]:
        P extends 'group' ? GroupGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'group' ? GroupGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Break ? Break[P] : never
  } 
    : Break
  : Break


  type BreakCountArgs = Merge<
    Omit<BreakFindManyArgs, 'select' | 'include'> & {
      select?: BreakCountAggregateInputType | true
    }
  >

  export interface BreakDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Break that matches the filter.
     * @param {BreakFindUniqueArgs} args - Arguments to find a Break
     * @example
     * // Get one Break
     * const break = await prisma.break.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends BreakFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, BreakFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Break'> extends True ? CheckSelect<T, Prisma__BreakClient<Break>, Prisma__BreakClient<BreakGetPayload<T>>> : CheckSelect<T, Prisma__BreakClient<Break | null, null>, Prisma__BreakClient<BreakGetPayload<T> | null, null>>

    /**
     * Find the first Break that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakFindFirstArgs} args - Arguments to find a Break
     * @example
     * // Get one Break
     * const break = await prisma.break.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends BreakFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, BreakFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Break'> extends True ? CheckSelect<T, Prisma__BreakClient<Break>, Prisma__BreakClient<BreakGetPayload<T>>> : CheckSelect<T, Prisma__BreakClient<Break | null, null>, Prisma__BreakClient<BreakGetPayload<T> | null, null>>

    /**
     * Find zero or more Breaks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Breaks
     * const breaks = await prisma.break.findMany()
     * 
     * // Get first 10 Breaks
     * const breaks = await prisma.break.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const breakWithIdOnly = await prisma.break.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends BreakFindManyArgs>(
      args?: SelectSubset<T, BreakFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Break>>, PrismaPromise<Array<BreakGetPayload<T>>>>

    /**
     * Create a Break.
     * @param {BreakCreateArgs} args - Arguments to create a Break.
     * @example
     * // Create one Break
     * const Break = await prisma.break.create({
     *   data: {
     *     // ... data to create a Break
     *   }
     * })
     * 
    **/
    create<T extends BreakCreateArgs>(
      args: SelectSubset<T, BreakCreateArgs>
    ): CheckSelect<T, Prisma__BreakClient<Break>, Prisma__BreakClient<BreakGetPayload<T>>>

    /**
     * Create many Breaks.
     *     @param {BreakCreateManyArgs} args - Arguments to create many Breaks.
     *     @example
     *     // Create many Breaks
     *     const break = await prisma.break.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends BreakCreateManyArgs>(
      args?: SelectSubset<T, BreakCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Break.
     * @param {BreakDeleteArgs} args - Arguments to delete one Break.
     * @example
     * // Delete one Break
     * const Break = await prisma.break.delete({
     *   where: {
     *     // ... filter to delete one Break
     *   }
     * })
     * 
    **/
    delete<T extends BreakDeleteArgs>(
      args: SelectSubset<T, BreakDeleteArgs>
    ): CheckSelect<T, Prisma__BreakClient<Break>, Prisma__BreakClient<BreakGetPayload<T>>>

    /**
     * Update one Break.
     * @param {BreakUpdateArgs} args - Arguments to update one Break.
     * @example
     * // Update one Break
     * const break = await prisma.break.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends BreakUpdateArgs>(
      args: SelectSubset<T, BreakUpdateArgs>
    ): CheckSelect<T, Prisma__BreakClient<Break>, Prisma__BreakClient<BreakGetPayload<T>>>

    /**
     * Delete zero or more Breaks.
     * @param {BreakDeleteManyArgs} args - Arguments to filter Breaks to delete.
     * @example
     * // Delete a few Breaks
     * const { count } = await prisma.break.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends BreakDeleteManyArgs>(
      args?: SelectSubset<T, BreakDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Breaks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Breaks
     * const break = await prisma.break.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends BreakUpdateManyArgs>(
      args: SelectSubset<T, BreakUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Break.
     * @param {BreakUpsertArgs} args - Arguments to update or create a Break.
     * @example
     * // Update or create a Break
     * const break = await prisma.break.upsert({
     *   create: {
     *     // ... data to create a Break
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Break we want to update
     *   }
     * })
    **/
    upsert<T extends BreakUpsertArgs>(
      args: SelectSubset<T, BreakUpsertArgs>
    ): CheckSelect<T, Prisma__BreakClient<Break>, Prisma__BreakClient<BreakGetPayload<T>>>

    /**
     * Find one Break that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {BreakFindUniqueOrThrowArgs} args - Arguments to find a Break
     * @example
     * // Get one Break
     * const break = await prisma.break.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends BreakFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, BreakFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__BreakClient<Break>, Prisma__BreakClient<BreakGetPayload<T>>>

    /**
     * Find the first Break that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakFindFirstOrThrowArgs} args - Arguments to find a Break
     * @example
     * // Get one Break
     * const break = await prisma.break.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends BreakFindFirstOrThrowArgs>(
      args?: SelectSubset<T, BreakFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__BreakClient<Break>, Prisma__BreakClient<BreakGetPayload<T>>>

    /**
     * Count the number of Breaks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakCountArgs} args - Arguments to filter Breaks to count.
     * @example
     * // Count the number of Breaks
     * const count = await prisma.break.count({
     *   where: {
     *     // ... the filter for the Breaks we want to count
     *   }
     * })
    **/
    count<T extends BreakCountArgs>(
      args?: Subset<T, BreakCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BreakCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Break.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BreakAggregateArgs>(args: Subset<T, BreakAggregateArgs>): PrismaPromise<GetBreakAggregateType<T>>

    /**
     * Group by Break.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreakGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BreakGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BreakGroupByArgs['orderBy'] }
        : { orderBy?: BreakGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BreakGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBreakGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Break.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__BreakClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    group<T extends GroupArgs = {}>(args?: Subset<T, GroupArgs>): CheckSelect<T, Prisma__GroupClient<Group | Null>, Prisma__GroupClient<GroupGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Break base type for findUnique actions
   */
  export type BreakFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Break
     * 
    **/
    select?: BreakSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BreakInclude | null
    /**
     * Filter, which Break to fetch.
     * 
    **/
    where: BreakWhereUniqueInput
  }

  /**
   * Break: findUnique
   */
  export interface BreakFindUniqueArgs extends BreakFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Break base type for findFirst actions
   */
  export type BreakFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Break
     * 
    **/
    select?: BreakSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BreakInclude | null
    /**
     * Filter, which Break to fetch.
     * 
    **/
    where?: BreakWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Breaks to fetch.
     * 
    **/
    orderBy?: Enumerable<BreakOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Breaks.
     * 
    **/
    cursor?: BreakWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Breaks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Breaks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Breaks.
     * 
    **/
    distinct?: Enumerable<BreakScalarFieldEnum>
  }

  /**
   * Break: findFirst
   */
  export interface BreakFindFirstArgs extends BreakFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Break findMany
   */
  export type BreakFindManyArgs = {
    /**
     * Select specific fields to fetch from the Break
     * 
    **/
    select?: BreakSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BreakInclude | null
    /**
     * Filter, which Breaks to fetch.
     * 
    **/
    where?: BreakWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Breaks to fetch.
     * 
    **/
    orderBy?: Enumerable<BreakOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Breaks.
     * 
    **/
    cursor?: BreakWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Breaks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Breaks.
     * 
    **/
    skip?: number
    distinct?: Enumerable<BreakScalarFieldEnum>
  }


  /**
   * Break create
   */
  export type BreakCreateArgs = {
    /**
     * Select specific fields to fetch from the Break
     * 
    **/
    select?: BreakSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BreakInclude | null
    /**
     * The data needed to create a Break.
     * 
    **/
    data: XOR<BreakCreateInput, BreakUncheckedCreateInput>
  }


  /**
   * Break createMany
   */
  export type BreakCreateManyArgs = {
    /**
     * The data used to create many Breaks.
     * 
    **/
    data: Enumerable<BreakCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Break update
   */
  export type BreakUpdateArgs = {
    /**
     * Select specific fields to fetch from the Break
     * 
    **/
    select?: BreakSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BreakInclude | null
    /**
     * The data needed to update a Break.
     * 
    **/
    data: XOR<BreakUpdateInput, BreakUncheckedUpdateInput>
    /**
     * Choose, which Break to update.
     * 
    **/
    where: BreakWhereUniqueInput
  }


  /**
   * Break updateMany
   */
  export type BreakUpdateManyArgs = {
    /**
     * The data used to update Breaks.
     * 
    **/
    data: XOR<BreakUpdateManyMutationInput, BreakUncheckedUpdateManyInput>
    /**
     * Filter which Breaks to update
     * 
    **/
    where?: BreakWhereInput
  }


  /**
   * Break upsert
   */
  export type BreakUpsertArgs = {
    /**
     * Select specific fields to fetch from the Break
     * 
    **/
    select?: BreakSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BreakInclude | null
    /**
     * The filter to search for the Break to update in case it exists.
     * 
    **/
    where: BreakWhereUniqueInput
    /**
     * In case the Break found by the `where` argument doesn't exist, create a new Break with this data.
     * 
    **/
    create: XOR<BreakCreateInput, BreakUncheckedCreateInput>
    /**
     * In case the Break was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<BreakUpdateInput, BreakUncheckedUpdateInput>
  }


  /**
   * Break delete
   */
  export type BreakDeleteArgs = {
    /**
     * Select specific fields to fetch from the Break
     * 
    **/
    select?: BreakSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BreakInclude | null
    /**
     * Filter which Break to delete.
     * 
    **/
    where: BreakWhereUniqueInput
  }


  /**
   * Break deleteMany
   */
  export type BreakDeleteManyArgs = {
    /**
     * Filter which Breaks to delete
     * 
    **/
    where?: BreakWhereInput
  }


  /**
   * Break: findUniqueOrThrow
   */
  export type BreakFindUniqueOrThrowArgs = BreakFindUniqueArgsBase
      

  /**
   * Break: findFirstOrThrow
   */
  export type BreakFindFirstOrThrowArgs = BreakFindFirstArgsBase
      

  /**
   * Break without action
   */
  export type BreakArgs = {
    /**
     * Select specific fields to fetch from the Break
     * 
    **/
    select?: BreakSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BreakInclude | null
  }



  /**
   * Model WorkShift
   */


  export type AggregateWorkShift = {
    _count: WorkShiftCountAggregateOutputType | null
    _min: WorkShiftMinAggregateOutputType | null
    _max: WorkShiftMaxAggregateOutputType | null
  }

  export type WorkShiftMinAggregateOutputType = {
    id: string | null
    date: string | null
    createdAt: Date | null
    updatedAt: Date | null
    groupId: string | null
    employeeId: string | null
  }

  export type WorkShiftMaxAggregateOutputType = {
    id: string | null
    date: string | null
    createdAt: Date | null
    updatedAt: Date | null
    groupId: string | null
    employeeId: string | null
  }

  export type WorkShiftCountAggregateOutputType = {
    id: number
    date: number
    createdAt: number
    updatedAt: number
    groupId: number
    employeeId: number
    _all: number
  }


  export type WorkShiftMinAggregateInputType = {
    id?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    groupId?: true
    employeeId?: true
  }

  export type WorkShiftMaxAggregateInputType = {
    id?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    groupId?: true
    employeeId?: true
  }

  export type WorkShiftCountAggregateInputType = {
    id?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    groupId?: true
    employeeId?: true
    _all?: true
  }

  export type WorkShiftAggregateArgs = {
    /**
     * Filter which WorkShift to aggregate.
     * 
    **/
    where?: WorkShiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkShifts to fetch.
     * 
    **/
    orderBy?: Enumerable<WorkShiftOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: WorkShiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkShifts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkShifts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkShifts
    **/
    _count?: true | WorkShiftCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkShiftMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkShiftMaxAggregateInputType
  }

  export type GetWorkShiftAggregateType<T extends WorkShiftAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkShift]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkShift[P]>
      : GetScalarType<T[P], AggregateWorkShift[P]>
  }




  export type WorkShiftGroupByArgs = {
    where?: WorkShiftWhereInput
    orderBy?: Enumerable<WorkShiftOrderByWithAggregationInput>
    by: Array<WorkShiftScalarFieldEnum>
    having?: WorkShiftScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkShiftCountAggregateInputType | true
    _min?: WorkShiftMinAggregateInputType
    _max?: WorkShiftMaxAggregateInputType
  }


  export type WorkShiftGroupByOutputType = {
    id: string
    date: string
    createdAt: Date
    updatedAt: Date
    groupId: string
    employeeId: string
    _count: WorkShiftCountAggregateOutputType | null
    _min: WorkShiftMinAggregateOutputType | null
    _max: WorkShiftMaxAggregateOutputType | null
  }

  type GetWorkShiftGroupByPayload<T extends WorkShiftGroupByArgs> = PrismaPromise<
    Array<
      PickArray<WorkShiftGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkShiftGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkShiftGroupByOutputType[P]>
            : GetScalarType<T[P], WorkShiftGroupByOutputType[P]>
        }
      >
    >


  export type WorkShiftSelect = {
    id?: boolean
    date?: boolean
    group?: boolean | GroupArgs
    employee?: boolean | EmployeeArgs
    createdAt?: boolean
    updatedAt?: boolean
    groupId?: boolean
    employeeId?: boolean
  }

  export type WorkShiftInclude = {
    group?: boolean | GroupArgs
    employee?: boolean | EmployeeArgs
  }

  export type WorkShiftGetPayload<
    S extends boolean | null | undefined | WorkShiftArgs,
    U = keyof S
      > = S extends true
        ? WorkShift
    : S extends undefined
    ? never
    : S extends WorkShiftArgs | WorkShiftFindManyArgs
    ?'include' extends U
    ? WorkShift  & {
    [P in TrueKeys<S['include']>]:
        P extends 'group' ? GroupGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'employee' ? EmployeeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'group' ? GroupGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'employee' ? EmployeeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof WorkShift ? WorkShift[P] : never
  } 
    : WorkShift
  : WorkShift


  type WorkShiftCountArgs = Merge<
    Omit<WorkShiftFindManyArgs, 'select' | 'include'> & {
      select?: WorkShiftCountAggregateInputType | true
    }
  >

  export interface WorkShiftDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one WorkShift that matches the filter.
     * @param {WorkShiftFindUniqueArgs} args - Arguments to find a WorkShift
     * @example
     * // Get one WorkShift
     * const workShift = await prisma.workShift.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WorkShiftFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, WorkShiftFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'WorkShift'> extends True ? CheckSelect<T, Prisma__WorkShiftClient<WorkShift>, Prisma__WorkShiftClient<WorkShiftGetPayload<T>>> : CheckSelect<T, Prisma__WorkShiftClient<WorkShift | null, null>, Prisma__WorkShiftClient<WorkShiftGetPayload<T> | null, null>>

    /**
     * Find the first WorkShift that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkShiftFindFirstArgs} args - Arguments to find a WorkShift
     * @example
     * // Get one WorkShift
     * const workShift = await prisma.workShift.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WorkShiftFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, WorkShiftFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'WorkShift'> extends True ? CheckSelect<T, Prisma__WorkShiftClient<WorkShift>, Prisma__WorkShiftClient<WorkShiftGetPayload<T>>> : CheckSelect<T, Prisma__WorkShiftClient<WorkShift | null, null>, Prisma__WorkShiftClient<WorkShiftGetPayload<T> | null, null>>

    /**
     * Find zero or more WorkShifts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkShiftFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkShifts
     * const workShifts = await prisma.workShift.findMany()
     * 
     * // Get first 10 WorkShifts
     * const workShifts = await prisma.workShift.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workShiftWithIdOnly = await prisma.workShift.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends WorkShiftFindManyArgs>(
      args?: SelectSubset<T, WorkShiftFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<WorkShift>>, PrismaPromise<Array<WorkShiftGetPayload<T>>>>

    /**
     * Create a WorkShift.
     * @param {WorkShiftCreateArgs} args - Arguments to create a WorkShift.
     * @example
     * // Create one WorkShift
     * const WorkShift = await prisma.workShift.create({
     *   data: {
     *     // ... data to create a WorkShift
     *   }
     * })
     * 
    **/
    create<T extends WorkShiftCreateArgs>(
      args: SelectSubset<T, WorkShiftCreateArgs>
    ): CheckSelect<T, Prisma__WorkShiftClient<WorkShift>, Prisma__WorkShiftClient<WorkShiftGetPayload<T>>>

    /**
     * Create many WorkShifts.
     *     @param {WorkShiftCreateManyArgs} args - Arguments to create many WorkShifts.
     *     @example
     *     // Create many WorkShifts
     *     const workShift = await prisma.workShift.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends WorkShiftCreateManyArgs>(
      args?: SelectSubset<T, WorkShiftCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a WorkShift.
     * @param {WorkShiftDeleteArgs} args - Arguments to delete one WorkShift.
     * @example
     * // Delete one WorkShift
     * const WorkShift = await prisma.workShift.delete({
     *   where: {
     *     // ... filter to delete one WorkShift
     *   }
     * })
     * 
    **/
    delete<T extends WorkShiftDeleteArgs>(
      args: SelectSubset<T, WorkShiftDeleteArgs>
    ): CheckSelect<T, Prisma__WorkShiftClient<WorkShift>, Prisma__WorkShiftClient<WorkShiftGetPayload<T>>>

    /**
     * Update one WorkShift.
     * @param {WorkShiftUpdateArgs} args - Arguments to update one WorkShift.
     * @example
     * // Update one WorkShift
     * const workShift = await prisma.workShift.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WorkShiftUpdateArgs>(
      args: SelectSubset<T, WorkShiftUpdateArgs>
    ): CheckSelect<T, Prisma__WorkShiftClient<WorkShift>, Prisma__WorkShiftClient<WorkShiftGetPayload<T>>>

    /**
     * Delete zero or more WorkShifts.
     * @param {WorkShiftDeleteManyArgs} args - Arguments to filter WorkShifts to delete.
     * @example
     * // Delete a few WorkShifts
     * const { count } = await prisma.workShift.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WorkShiftDeleteManyArgs>(
      args?: SelectSubset<T, WorkShiftDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkShifts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkShiftUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkShifts
     * const workShift = await prisma.workShift.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WorkShiftUpdateManyArgs>(
      args: SelectSubset<T, WorkShiftUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one WorkShift.
     * @param {WorkShiftUpsertArgs} args - Arguments to update or create a WorkShift.
     * @example
     * // Update or create a WorkShift
     * const workShift = await prisma.workShift.upsert({
     *   create: {
     *     // ... data to create a WorkShift
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkShift we want to update
     *   }
     * })
    **/
    upsert<T extends WorkShiftUpsertArgs>(
      args: SelectSubset<T, WorkShiftUpsertArgs>
    ): CheckSelect<T, Prisma__WorkShiftClient<WorkShift>, Prisma__WorkShiftClient<WorkShiftGetPayload<T>>>

    /**
     * Find one WorkShift that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {WorkShiftFindUniqueOrThrowArgs} args - Arguments to find a WorkShift
     * @example
     * // Get one WorkShift
     * const workShift = await prisma.workShift.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WorkShiftFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, WorkShiftFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__WorkShiftClient<WorkShift>, Prisma__WorkShiftClient<WorkShiftGetPayload<T>>>

    /**
     * Find the first WorkShift that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkShiftFindFirstOrThrowArgs} args - Arguments to find a WorkShift
     * @example
     * // Get one WorkShift
     * const workShift = await prisma.workShift.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WorkShiftFindFirstOrThrowArgs>(
      args?: SelectSubset<T, WorkShiftFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__WorkShiftClient<WorkShift>, Prisma__WorkShiftClient<WorkShiftGetPayload<T>>>

    /**
     * Count the number of WorkShifts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkShiftCountArgs} args - Arguments to filter WorkShifts to count.
     * @example
     * // Count the number of WorkShifts
     * const count = await prisma.workShift.count({
     *   where: {
     *     // ... the filter for the WorkShifts we want to count
     *   }
     * })
    **/
    count<T extends WorkShiftCountArgs>(
      args?: Subset<T, WorkShiftCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkShiftCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkShift.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkShiftAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkShiftAggregateArgs>(args: Subset<T, WorkShiftAggregateArgs>): PrismaPromise<GetWorkShiftAggregateType<T>>

    /**
     * Group by WorkShift.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkShiftGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkShiftGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkShiftGroupByArgs['orderBy'] }
        : { orderBy?: WorkShiftGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkShiftGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkShiftGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkShift.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__WorkShiftClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    group<T extends GroupArgs = {}>(args?: Subset<T, GroupArgs>): CheckSelect<T, Prisma__GroupClient<Group | Null>, Prisma__GroupClient<GroupGetPayload<T> | Null>>;

    employee<T extends EmployeeArgs = {}>(args?: Subset<T, EmployeeArgs>): CheckSelect<T, Prisma__EmployeeClient<Employee | Null>, Prisma__EmployeeClient<EmployeeGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * WorkShift base type for findUnique actions
   */
  export type WorkShiftFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the WorkShift
     * 
    **/
    select?: WorkShiftSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WorkShiftInclude | null
    /**
     * Filter, which WorkShift to fetch.
     * 
    **/
    where: WorkShiftWhereUniqueInput
  }

  /**
   * WorkShift: findUnique
   */
  export interface WorkShiftFindUniqueArgs extends WorkShiftFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * WorkShift base type for findFirst actions
   */
  export type WorkShiftFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the WorkShift
     * 
    **/
    select?: WorkShiftSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WorkShiftInclude | null
    /**
     * Filter, which WorkShift to fetch.
     * 
    **/
    where?: WorkShiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkShifts to fetch.
     * 
    **/
    orderBy?: Enumerable<WorkShiftOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkShifts.
     * 
    **/
    cursor?: WorkShiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkShifts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkShifts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkShifts.
     * 
    **/
    distinct?: Enumerable<WorkShiftScalarFieldEnum>
  }

  /**
   * WorkShift: findFirst
   */
  export interface WorkShiftFindFirstArgs extends WorkShiftFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * WorkShift findMany
   */
  export type WorkShiftFindManyArgs = {
    /**
     * Select specific fields to fetch from the WorkShift
     * 
    **/
    select?: WorkShiftSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WorkShiftInclude | null
    /**
     * Filter, which WorkShifts to fetch.
     * 
    **/
    where?: WorkShiftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkShifts to fetch.
     * 
    **/
    orderBy?: Enumerable<WorkShiftOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkShifts.
     * 
    **/
    cursor?: WorkShiftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkShifts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkShifts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<WorkShiftScalarFieldEnum>
  }


  /**
   * WorkShift create
   */
  export type WorkShiftCreateArgs = {
    /**
     * Select specific fields to fetch from the WorkShift
     * 
    **/
    select?: WorkShiftSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WorkShiftInclude | null
    /**
     * The data needed to create a WorkShift.
     * 
    **/
    data: XOR<WorkShiftCreateInput, WorkShiftUncheckedCreateInput>
  }


  /**
   * WorkShift createMany
   */
  export type WorkShiftCreateManyArgs = {
    /**
     * The data used to create many WorkShifts.
     * 
    **/
    data: Enumerable<WorkShiftCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * WorkShift update
   */
  export type WorkShiftUpdateArgs = {
    /**
     * Select specific fields to fetch from the WorkShift
     * 
    **/
    select?: WorkShiftSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WorkShiftInclude | null
    /**
     * The data needed to update a WorkShift.
     * 
    **/
    data: XOR<WorkShiftUpdateInput, WorkShiftUncheckedUpdateInput>
    /**
     * Choose, which WorkShift to update.
     * 
    **/
    where: WorkShiftWhereUniqueInput
  }


  /**
   * WorkShift updateMany
   */
  export type WorkShiftUpdateManyArgs = {
    /**
     * The data used to update WorkShifts.
     * 
    **/
    data: XOR<WorkShiftUpdateManyMutationInput, WorkShiftUncheckedUpdateManyInput>
    /**
     * Filter which WorkShifts to update
     * 
    **/
    where?: WorkShiftWhereInput
  }


  /**
   * WorkShift upsert
   */
  export type WorkShiftUpsertArgs = {
    /**
     * Select specific fields to fetch from the WorkShift
     * 
    **/
    select?: WorkShiftSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WorkShiftInclude | null
    /**
     * The filter to search for the WorkShift to update in case it exists.
     * 
    **/
    where: WorkShiftWhereUniqueInput
    /**
     * In case the WorkShift found by the `where` argument doesn't exist, create a new WorkShift with this data.
     * 
    **/
    create: XOR<WorkShiftCreateInput, WorkShiftUncheckedCreateInput>
    /**
     * In case the WorkShift was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<WorkShiftUpdateInput, WorkShiftUncheckedUpdateInput>
  }


  /**
   * WorkShift delete
   */
  export type WorkShiftDeleteArgs = {
    /**
     * Select specific fields to fetch from the WorkShift
     * 
    **/
    select?: WorkShiftSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WorkShiftInclude | null
    /**
     * Filter which WorkShift to delete.
     * 
    **/
    where: WorkShiftWhereUniqueInput
  }


  /**
   * WorkShift deleteMany
   */
  export type WorkShiftDeleteManyArgs = {
    /**
     * Filter which WorkShifts to delete
     * 
    **/
    where?: WorkShiftWhereInput
  }


  /**
   * WorkShift: findUniqueOrThrow
   */
  export type WorkShiftFindUniqueOrThrowArgs = WorkShiftFindUniqueArgsBase
      

  /**
   * WorkShift: findFirstOrThrow
   */
  export type WorkShiftFindFirstOrThrowArgs = WorkShiftFindFirstArgsBase
      

  /**
   * WorkShift without action
   */
  export type WorkShiftArgs = {
    /**
     * Select specific fields to fetch from the WorkShift
     * 
    **/
    select?: WorkShiftSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WorkShiftInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const BreakScalarFieldEnum: {
    id: 'id',
    startTime: 'startTime',
    endTime: 'endTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    groupId: 'groupId'
  };

  export type BreakScalarFieldEnum = (typeof BreakScalarFieldEnum)[keyof typeof BreakScalarFieldEnum]


  export const EmployeeScalarFieldEnum: {
    id: 'id',
    cardId: 'cardId',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    groupId: 'groupId',
    hasIrregularShifts: 'hasIrregularShifts'
  };

  export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum]


  export const GroupScalarFieldEnum: {
    id: 'id',
    name: 'name',
    startTime: 'startTime',
    endTime: 'endTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GroupScalarFieldEnum = (typeof GroupScalarFieldEnum)[keyof typeof GroupScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TimesheetScalarFieldEnum: {
    id: 'id',
    date: 'date',
    time: 'time',
    isEnter: 'isEnter',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    employeeId: 'employeeId'
  };

  export type TimesheetScalarFieldEnum = (typeof TimesheetScalarFieldEnum)[keyof typeof TimesheetScalarFieldEnum]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const WorkShiftScalarFieldEnum: {
    id: 'id',
    date: 'date',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    groupId: 'groupId',
    employeeId: 'employeeId'
  };

  export type WorkShiftScalarFieldEnum = (typeof WorkShiftScalarFieldEnum)[keyof typeof WorkShiftScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type TimesheetWhereInput = {
    AND?: Enumerable<TimesheetWhereInput>
    OR?: Enumerable<TimesheetWhereInput>
    NOT?: Enumerable<TimesheetWhereInput>
    id?: StringFilter | string
    employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    date?: StringFilter | string
    time?: StringFilter | string
    isEnter?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    employeeId?: StringFilter | string
  }

  export type TimesheetOrderByWithRelationInput = {
    id?: SortOrder
    employee?: EmployeeOrderByWithRelationInput
    date?: SortOrder
    time?: SortOrder
    isEnter?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    employeeId?: SortOrder
  }

  export type TimesheetWhereUniqueInput = {
    id?: string
  }

  export type TimesheetOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    time?: SortOrder
    isEnter?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    employeeId?: SortOrder
    _count?: TimesheetCountOrderByAggregateInput
    _max?: TimesheetMaxOrderByAggregateInput
    _min?: TimesheetMinOrderByAggregateInput
  }

  export type TimesheetScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TimesheetScalarWhereWithAggregatesInput>
    OR?: Enumerable<TimesheetScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TimesheetScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    date?: StringWithAggregatesFilter | string
    time?: StringWithAggregatesFilter | string
    isEnter?: BoolWithAggregatesFilter | boolean
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    employeeId?: StringWithAggregatesFilter | string
  }

  export type EmployeeWhereInput = {
    AND?: Enumerable<EmployeeWhereInput>
    OR?: Enumerable<EmployeeWhereInput>
    NOT?: Enumerable<EmployeeWhereInput>
    id?: StringFilter | string
    cardId?: StringFilter | string
    name?: StringFilter | string
    group?: XOR<GroupRelationFilter, GroupWhereInput>
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    Timesheet?: TimesheetListRelationFilter
    groupId?: StringFilter | string
    hasIrregularShifts?: BoolFilter | boolean
    WorkShift?: WorkShiftListRelationFilter
  }

  export type EmployeeOrderByWithRelationInput = {
    id?: SortOrder
    cardId?: SortOrder
    name?: SortOrder
    group?: GroupOrderByWithRelationInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Timesheet?: TimesheetOrderByRelationAggregateInput
    groupId?: SortOrder
    hasIrregularShifts?: SortOrder
    WorkShift?: WorkShiftOrderByRelationAggregateInput
  }

  export type EmployeeWhereUniqueInput = {
    id?: string
  }

  export type EmployeeOrderByWithAggregationInput = {
    id?: SortOrder
    cardId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupId?: SortOrder
    hasIrregularShifts?: SortOrder
    _count?: EmployeeCountOrderByAggregateInput
    _max?: EmployeeMaxOrderByAggregateInput
    _min?: EmployeeMinOrderByAggregateInput
  }

  export type EmployeeScalarWhereWithAggregatesInput = {
    AND?: Enumerable<EmployeeScalarWhereWithAggregatesInput>
    OR?: Enumerable<EmployeeScalarWhereWithAggregatesInput>
    NOT?: Enumerable<EmployeeScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    cardId?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    groupId?: StringWithAggregatesFilter | string
    hasIrregularShifts?: BoolWithAggregatesFilter | boolean
  }

  export type GroupWhereInput = {
    AND?: Enumerable<GroupWhereInput>
    OR?: Enumerable<GroupWhereInput>
    NOT?: Enumerable<GroupWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    startTime?: StringFilter | string
    endTime?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    Employee?: EmployeeListRelationFilter
    Break?: BreakListRelationFilter
    WorkShift?: WorkShiftListRelationFilter
  }

  export type GroupOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Employee?: EmployeeOrderByRelationAggregateInput
    Break?: BreakOrderByRelationAggregateInput
    WorkShift?: WorkShiftOrderByRelationAggregateInput
  }

  export type GroupWhereUniqueInput = {
    id?: string
  }

  export type GroupOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GroupCountOrderByAggregateInput
    _max?: GroupMaxOrderByAggregateInput
    _min?: GroupMinOrderByAggregateInput
  }

  export type GroupScalarWhereWithAggregatesInput = {
    AND?: Enumerable<GroupScalarWhereWithAggregatesInput>
    OR?: Enumerable<GroupScalarWhereWithAggregatesInput>
    NOT?: Enumerable<GroupScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    startTime?: StringWithAggregatesFilter | string
    endTime?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type BreakWhereInput = {
    AND?: Enumerable<BreakWhereInput>
    OR?: Enumerable<BreakWhereInput>
    NOT?: Enumerable<BreakWhereInput>
    id?: StringFilter | string
    startTime?: StringFilter | string
    endTime?: StringFilter | string
    group?: XOR<GroupRelationFilter, GroupWhereInput>
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    groupId?: StringFilter | string
  }

  export type BreakOrderByWithRelationInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    group?: GroupOrderByWithRelationInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupId?: SortOrder
  }

  export type BreakWhereUniqueInput = {
    id?: string
  }

  export type BreakOrderByWithAggregationInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupId?: SortOrder
    _count?: BreakCountOrderByAggregateInput
    _max?: BreakMaxOrderByAggregateInput
    _min?: BreakMinOrderByAggregateInput
  }

  export type BreakScalarWhereWithAggregatesInput = {
    AND?: Enumerable<BreakScalarWhereWithAggregatesInput>
    OR?: Enumerable<BreakScalarWhereWithAggregatesInput>
    NOT?: Enumerable<BreakScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    startTime?: StringWithAggregatesFilter | string
    endTime?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    groupId?: StringWithAggregatesFilter | string
  }

  export type WorkShiftWhereInput = {
    AND?: Enumerable<WorkShiftWhereInput>
    OR?: Enumerable<WorkShiftWhereInput>
    NOT?: Enumerable<WorkShiftWhereInput>
    id?: StringFilter | string
    date?: StringFilter | string
    group?: XOR<GroupRelationFilter, GroupWhereInput>
    employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    groupId?: StringFilter | string
    employeeId?: StringFilter | string
  }

  export type WorkShiftOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    group?: GroupOrderByWithRelationInput
    employee?: EmployeeOrderByWithRelationInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupId?: SortOrder
    employeeId?: SortOrder
  }

  export type WorkShiftWhereUniqueInput = {
    id?: string
  }

  export type WorkShiftOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupId?: SortOrder
    employeeId?: SortOrder
    _count?: WorkShiftCountOrderByAggregateInput
    _max?: WorkShiftMaxOrderByAggregateInput
    _min?: WorkShiftMinOrderByAggregateInput
  }

  export type WorkShiftScalarWhereWithAggregatesInput = {
    AND?: Enumerable<WorkShiftScalarWhereWithAggregatesInput>
    OR?: Enumerable<WorkShiftScalarWhereWithAggregatesInput>
    NOT?: Enumerable<WorkShiftScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    date?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    groupId?: StringWithAggregatesFilter | string
    employeeId?: StringWithAggregatesFilter | string
  }

  export type TimesheetCreateInput = {
    id?: string
    employee: EmployeeCreateNestedOneWithoutTimesheetInput
    date: string
    time: string
    isEnter: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimesheetUncheckedCreateInput = {
    id?: string
    date: string
    time: string
    isEnter: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeId: string
  }

  export type TimesheetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee?: EmployeeUpdateOneRequiredWithoutTimesheetNestedInput
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    isEnter?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimesheetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    isEnter?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeId?: StringFieldUpdateOperationsInput | string
  }

  export type TimesheetCreateManyInput = {
    id?: string
    date: string
    time: string
    isEnter: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeId: string
  }

  export type TimesheetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    isEnter?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimesheetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    isEnter?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeId?: StringFieldUpdateOperationsInput | string
  }

  export type EmployeeCreateInput = {
    id?: string
    cardId: string
    name: string
    group: GroupCreateNestedOneWithoutEmployeeInput
    createdAt?: Date | string
    updatedAt?: Date | string
    Timesheet?: TimesheetCreateNestedManyWithoutEmployeeInput
    hasIrregularShifts?: boolean
    WorkShift?: WorkShiftCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateInput = {
    id?: string
    cardId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Timesheet?: TimesheetUncheckedCreateNestedManyWithoutEmployeeInput
    groupId: string
    hasIrregularShifts?: boolean
    WorkShift?: WorkShiftUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    group?: GroupUpdateOneRequiredWithoutEmployeeNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Timesheet?: TimesheetUpdateManyWithoutEmployeeNestedInput
    hasIrregularShifts?: BoolFieldUpdateOperationsInput | boolean
    WorkShift?: WorkShiftUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Timesheet?: TimesheetUncheckedUpdateManyWithoutEmployeeNestedInput
    groupId?: StringFieldUpdateOperationsInput | string
    hasIrregularShifts?: BoolFieldUpdateOperationsInput | boolean
    WorkShift?: WorkShiftUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeCreateManyInput = {
    id?: string
    cardId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupId: string
    hasIrregularShifts?: boolean
  }

  export type EmployeeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hasIrregularShifts?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmployeeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: StringFieldUpdateOperationsInput | string
    hasIrregularShifts?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GroupCreateInput = {
    id?: string
    name: string
    startTime: string
    endTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Employee?: EmployeeCreateNestedManyWithoutGroupInput
    Break?: BreakCreateNestedManyWithoutGroupInput
    WorkShift?: WorkShiftCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateInput = {
    id?: string
    name: string
    startTime: string
    endTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Employee?: EmployeeUncheckedCreateNestedManyWithoutGroupInput
    Break?: BreakUncheckedCreateNestedManyWithoutGroupInput
    WorkShift?: WorkShiftUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Employee?: EmployeeUpdateManyWithoutGroupNestedInput
    Break?: BreakUpdateManyWithoutGroupNestedInput
    WorkShift?: WorkShiftUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Employee?: EmployeeUncheckedUpdateManyWithoutGroupNestedInput
    Break?: BreakUncheckedUpdateManyWithoutGroupNestedInput
    WorkShift?: WorkShiftUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupCreateManyInput = {
    id?: string
    name: string
    startTime: string
    endTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BreakCreateInput = {
    id?: string
    startTime: string
    endTime: string
    group: GroupCreateNestedOneWithoutBreakInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BreakUncheckedCreateInput = {
    id?: string
    startTime: string
    endTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupId: string
  }

  export type BreakUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    group?: GroupUpdateOneRequiredWithoutBreakNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BreakUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: StringFieldUpdateOperationsInput | string
  }

  export type BreakCreateManyInput = {
    id?: string
    startTime: string
    endTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupId: string
  }

  export type BreakUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BreakUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: StringFieldUpdateOperationsInput | string
  }

  export type WorkShiftCreateInput = {
    id?: string
    date: string
    group: GroupCreateNestedOneWithoutWorkShiftInput
    employee: EmployeeCreateNestedOneWithoutWorkShiftInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkShiftUncheckedCreateInput = {
    id?: string
    date: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupId: string
    employeeId: string
  }

  export type WorkShiftUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    group?: GroupUpdateOneRequiredWithoutWorkShiftNestedInput
    employee?: EmployeeUpdateOneRequiredWithoutWorkShiftNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkShiftUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
  }

  export type WorkShiftCreateManyInput = {
    id?: string
    date: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupId: string
    employeeId: string
  }

  export type WorkShiftUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkShiftUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type EmployeeRelationFilter = {
    is?: EmployeeWhereInput
    isNot?: EmployeeWhereInput
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type TimesheetCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    time?: SortOrder
    isEnter?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    employeeId?: SortOrder
  }

  export type TimesheetMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    time?: SortOrder
    isEnter?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    employeeId?: SortOrder
  }

  export type TimesheetMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    time?: SortOrder
    isEnter?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    employeeId?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type GroupRelationFilter = {
    is?: GroupWhereInput
    isNot?: GroupWhereInput
  }

  export type TimesheetListRelationFilter = {
    every?: TimesheetWhereInput
    some?: TimesheetWhereInput
    none?: TimesheetWhereInput
  }

  export type WorkShiftListRelationFilter = {
    every?: WorkShiftWhereInput
    some?: WorkShiftWhereInput
    none?: WorkShiftWhereInput
  }

  export type TimesheetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkShiftOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployeeCountOrderByAggregateInput = {
    id?: SortOrder
    cardId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupId?: SortOrder
    hasIrregularShifts?: SortOrder
  }

  export type EmployeeMaxOrderByAggregateInput = {
    id?: SortOrder
    cardId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupId?: SortOrder
    hasIrregularShifts?: SortOrder
  }

  export type EmployeeMinOrderByAggregateInput = {
    id?: SortOrder
    cardId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupId?: SortOrder
    hasIrregularShifts?: SortOrder
  }

  export type EmployeeListRelationFilter = {
    every?: EmployeeWhereInput
    some?: EmployeeWhereInput
    none?: EmployeeWhereInput
  }

  export type BreakListRelationFilter = {
    every?: BreakWhereInput
    some?: BreakWhereInput
    none?: BreakWhereInput
  }

  export type EmployeeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BreakOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BreakCountOrderByAggregateInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupId?: SortOrder
  }

  export type BreakMaxOrderByAggregateInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupId?: SortOrder
  }

  export type BreakMinOrderByAggregateInput = {
    id?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupId?: SortOrder
  }

  export type WorkShiftCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupId?: SortOrder
    employeeId?: SortOrder
  }

  export type WorkShiftMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupId?: SortOrder
    employeeId?: SortOrder
  }

  export type WorkShiftMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupId?: SortOrder
    employeeId?: SortOrder
  }

  export type EmployeeCreateNestedOneWithoutTimesheetInput = {
    create?: XOR<EmployeeCreateWithoutTimesheetInput, EmployeeUncheckedCreateWithoutTimesheetInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutTimesheetInput
    connect?: EmployeeWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EmployeeUpdateOneRequiredWithoutTimesheetNestedInput = {
    create?: XOR<EmployeeCreateWithoutTimesheetInput, EmployeeUncheckedCreateWithoutTimesheetInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutTimesheetInput
    upsert?: EmployeeUpsertWithoutTimesheetInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<EmployeeUpdateWithoutTimesheetInput, EmployeeUncheckedUpdateWithoutTimesheetInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GroupCreateNestedOneWithoutEmployeeInput = {
    create?: XOR<GroupCreateWithoutEmployeeInput, GroupUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: GroupCreateOrConnectWithoutEmployeeInput
    connect?: GroupWhereUniqueInput
  }

  export type TimesheetCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<Enumerable<TimesheetCreateWithoutEmployeeInput>, Enumerable<TimesheetUncheckedCreateWithoutEmployeeInput>>
    connectOrCreate?: Enumerable<TimesheetCreateOrConnectWithoutEmployeeInput>
    createMany?: TimesheetCreateManyEmployeeInputEnvelope
    connect?: Enumerable<TimesheetWhereUniqueInput>
  }

  export type WorkShiftCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<Enumerable<WorkShiftCreateWithoutEmployeeInput>, Enumerable<WorkShiftUncheckedCreateWithoutEmployeeInput>>
    connectOrCreate?: Enumerable<WorkShiftCreateOrConnectWithoutEmployeeInput>
    createMany?: WorkShiftCreateManyEmployeeInputEnvelope
    connect?: Enumerable<WorkShiftWhereUniqueInput>
  }

  export type TimesheetUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<Enumerable<TimesheetCreateWithoutEmployeeInput>, Enumerable<TimesheetUncheckedCreateWithoutEmployeeInput>>
    connectOrCreate?: Enumerable<TimesheetCreateOrConnectWithoutEmployeeInput>
    createMany?: TimesheetCreateManyEmployeeInputEnvelope
    connect?: Enumerable<TimesheetWhereUniqueInput>
  }

  export type WorkShiftUncheckedCreateNestedManyWithoutEmployeeInput = {
    create?: XOR<Enumerable<WorkShiftCreateWithoutEmployeeInput>, Enumerable<WorkShiftUncheckedCreateWithoutEmployeeInput>>
    connectOrCreate?: Enumerable<WorkShiftCreateOrConnectWithoutEmployeeInput>
    createMany?: WorkShiftCreateManyEmployeeInputEnvelope
    connect?: Enumerable<WorkShiftWhereUniqueInput>
  }

  export type GroupUpdateOneRequiredWithoutEmployeeNestedInput = {
    create?: XOR<GroupCreateWithoutEmployeeInput, GroupUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: GroupCreateOrConnectWithoutEmployeeInput
    upsert?: GroupUpsertWithoutEmployeeInput
    connect?: GroupWhereUniqueInput
    update?: XOR<GroupUpdateWithoutEmployeeInput, GroupUncheckedUpdateWithoutEmployeeInput>
  }

  export type TimesheetUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<Enumerable<TimesheetCreateWithoutEmployeeInput>, Enumerable<TimesheetUncheckedCreateWithoutEmployeeInput>>
    connectOrCreate?: Enumerable<TimesheetCreateOrConnectWithoutEmployeeInput>
    upsert?: Enumerable<TimesheetUpsertWithWhereUniqueWithoutEmployeeInput>
    createMany?: TimesheetCreateManyEmployeeInputEnvelope
    set?: Enumerable<TimesheetWhereUniqueInput>
    disconnect?: Enumerable<TimesheetWhereUniqueInput>
    delete?: Enumerable<TimesheetWhereUniqueInput>
    connect?: Enumerable<TimesheetWhereUniqueInput>
    update?: Enumerable<TimesheetUpdateWithWhereUniqueWithoutEmployeeInput>
    updateMany?: Enumerable<TimesheetUpdateManyWithWhereWithoutEmployeeInput>
    deleteMany?: Enumerable<TimesheetScalarWhereInput>
  }

  export type WorkShiftUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<Enumerable<WorkShiftCreateWithoutEmployeeInput>, Enumerable<WorkShiftUncheckedCreateWithoutEmployeeInput>>
    connectOrCreate?: Enumerable<WorkShiftCreateOrConnectWithoutEmployeeInput>
    upsert?: Enumerable<WorkShiftUpsertWithWhereUniqueWithoutEmployeeInput>
    createMany?: WorkShiftCreateManyEmployeeInputEnvelope
    set?: Enumerable<WorkShiftWhereUniqueInput>
    disconnect?: Enumerable<WorkShiftWhereUniqueInput>
    delete?: Enumerable<WorkShiftWhereUniqueInput>
    connect?: Enumerable<WorkShiftWhereUniqueInput>
    update?: Enumerable<WorkShiftUpdateWithWhereUniqueWithoutEmployeeInput>
    updateMany?: Enumerable<WorkShiftUpdateManyWithWhereWithoutEmployeeInput>
    deleteMany?: Enumerable<WorkShiftScalarWhereInput>
  }

  export type TimesheetUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<Enumerable<TimesheetCreateWithoutEmployeeInput>, Enumerable<TimesheetUncheckedCreateWithoutEmployeeInput>>
    connectOrCreate?: Enumerable<TimesheetCreateOrConnectWithoutEmployeeInput>
    upsert?: Enumerable<TimesheetUpsertWithWhereUniqueWithoutEmployeeInput>
    createMany?: TimesheetCreateManyEmployeeInputEnvelope
    set?: Enumerable<TimesheetWhereUniqueInput>
    disconnect?: Enumerable<TimesheetWhereUniqueInput>
    delete?: Enumerable<TimesheetWhereUniqueInput>
    connect?: Enumerable<TimesheetWhereUniqueInput>
    update?: Enumerable<TimesheetUpdateWithWhereUniqueWithoutEmployeeInput>
    updateMany?: Enumerable<TimesheetUpdateManyWithWhereWithoutEmployeeInput>
    deleteMany?: Enumerable<TimesheetScalarWhereInput>
  }

  export type WorkShiftUncheckedUpdateManyWithoutEmployeeNestedInput = {
    create?: XOR<Enumerable<WorkShiftCreateWithoutEmployeeInput>, Enumerable<WorkShiftUncheckedCreateWithoutEmployeeInput>>
    connectOrCreate?: Enumerable<WorkShiftCreateOrConnectWithoutEmployeeInput>
    upsert?: Enumerable<WorkShiftUpsertWithWhereUniqueWithoutEmployeeInput>
    createMany?: WorkShiftCreateManyEmployeeInputEnvelope
    set?: Enumerable<WorkShiftWhereUniqueInput>
    disconnect?: Enumerable<WorkShiftWhereUniqueInput>
    delete?: Enumerable<WorkShiftWhereUniqueInput>
    connect?: Enumerable<WorkShiftWhereUniqueInput>
    update?: Enumerable<WorkShiftUpdateWithWhereUniqueWithoutEmployeeInput>
    updateMany?: Enumerable<WorkShiftUpdateManyWithWhereWithoutEmployeeInput>
    deleteMany?: Enumerable<WorkShiftScalarWhereInput>
  }

  export type EmployeeCreateNestedManyWithoutGroupInput = {
    create?: XOR<Enumerable<EmployeeCreateWithoutGroupInput>, Enumerable<EmployeeUncheckedCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<EmployeeCreateOrConnectWithoutGroupInput>
    createMany?: EmployeeCreateManyGroupInputEnvelope
    connect?: Enumerable<EmployeeWhereUniqueInput>
  }

  export type BreakCreateNestedManyWithoutGroupInput = {
    create?: XOR<Enumerable<BreakCreateWithoutGroupInput>, Enumerable<BreakUncheckedCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<BreakCreateOrConnectWithoutGroupInput>
    createMany?: BreakCreateManyGroupInputEnvelope
    connect?: Enumerable<BreakWhereUniqueInput>
  }

  export type WorkShiftCreateNestedManyWithoutGroupInput = {
    create?: XOR<Enumerable<WorkShiftCreateWithoutGroupInput>, Enumerable<WorkShiftUncheckedCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<WorkShiftCreateOrConnectWithoutGroupInput>
    createMany?: WorkShiftCreateManyGroupInputEnvelope
    connect?: Enumerable<WorkShiftWhereUniqueInput>
  }

  export type EmployeeUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<Enumerable<EmployeeCreateWithoutGroupInput>, Enumerable<EmployeeUncheckedCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<EmployeeCreateOrConnectWithoutGroupInput>
    createMany?: EmployeeCreateManyGroupInputEnvelope
    connect?: Enumerable<EmployeeWhereUniqueInput>
  }

  export type BreakUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<Enumerable<BreakCreateWithoutGroupInput>, Enumerable<BreakUncheckedCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<BreakCreateOrConnectWithoutGroupInput>
    createMany?: BreakCreateManyGroupInputEnvelope
    connect?: Enumerable<BreakWhereUniqueInput>
  }

  export type WorkShiftUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<Enumerable<WorkShiftCreateWithoutGroupInput>, Enumerable<WorkShiftUncheckedCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<WorkShiftCreateOrConnectWithoutGroupInput>
    createMany?: WorkShiftCreateManyGroupInputEnvelope
    connect?: Enumerable<WorkShiftWhereUniqueInput>
  }

  export type EmployeeUpdateManyWithoutGroupNestedInput = {
    create?: XOR<Enumerable<EmployeeCreateWithoutGroupInput>, Enumerable<EmployeeUncheckedCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<EmployeeCreateOrConnectWithoutGroupInput>
    upsert?: Enumerable<EmployeeUpsertWithWhereUniqueWithoutGroupInput>
    createMany?: EmployeeCreateManyGroupInputEnvelope
    set?: Enumerable<EmployeeWhereUniqueInput>
    disconnect?: Enumerable<EmployeeWhereUniqueInput>
    delete?: Enumerable<EmployeeWhereUniqueInput>
    connect?: Enumerable<EmployeeWhereUniqueInput>
    update?: Enumerable<EmployeeUpdateWithWhereUniqueWithoutGroupInput>
    updateMany?: Enumerable<EmployeeUpdateManyWithWhereWithoutGroupInput>
    deleteMany?: Enumerable<EmployeeScalarWhereInput>
  }

  export type BreakUpdateManyWithoutGroupNestedInput = {
    create?: XOR<Enumerable<BreakCreateWithoutGroupInput>, Enumerable<BreakUncheckedCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<BreakCreateOrConnectWithoutGroupInput>
    upsert?: Enumerable<BreakUpsertWithWhereUniqueWithoutGroupInput>
    createMany?: BreakCreateManyGroupInputEnvelope
    set?: Enumerable<BreakWhereUniqueInput>
    disconnect?: Enumerable<BreakWhereUniqueInput>
    delete?: Enumerable<BreakWhereUniqueInput>
    connect?: Enumerable<BreakWhereUniqueInput>
    update?: Enumerable<BreakUpdateWithWhereUniqueWithoutGroupInput>
    updateMany?: Enumerable<BreakUpdateManyWithWhereWithoutGroupInput>
    deleteMany?: Enumerable<BreakScalarWhereInput>
  }

  export type WorkShiftUpdateManyWithoutGroupNestedInput = {
    create?: XOR<Enumerable<WorkShiftCreateWithoutGroupInput>, Enumerable<WorkShiftUncheckedCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<WorkShiftCreateOrConnectWithoutGroupInput>
    upsert?: Enumerable<WorkShiftUpsertWithWhereUniqueWithoutGroupInput>
    createMany?: WorkShiftCreateManyGroupInputEnvelope
    set?: Enumerable<WorkShiftWhereUniqueInput>
    disconnect?: Enumerable<WorkShiftWhereUniqueInput>
    delete?: Enumerable<WorkShiftWhereUniqueInput>
    connect?: Enumerable<WorkShiftWhereUniqueInput>
    update?: Enumerable<WorkShiftUpdateWithWhereUniqueWithoutGroupInput>
    updateMany?: Enumerable<WorkShiftUpdateManyWithWhereWithoutGroupInput>
    deleteMany?: Enumerable<WorkShiftScalarWhereInput>
  }

  export type EmployeeUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<Enumerable<EmployeeCreateWithoutGroupInput>, Enumerable<EmployeeUncheckedCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<EmployeeCreateOrConnectWithoutGroupInput>
    upsert?: Enumerable<EmployeeUpsertWithWhereUniqueWithoutGroupInput>
    createMany?: EmployeeCreateManyGroupInputEnvelope
    set?: Enumerable<EmployeeWhereUniqueInput>
    disconnect?: Enumerable<EmployeeWhereUniqueInput>
    delete?: Enumerable<EmployeeWhereUniqueInput>
    connect?: Enumerable<EmployeeWhereUniqueInput>
    update?: Enumerable<EmployeeUpdateWithWhereUniqueWithoutGroupInput>
    updateMany?: Enumerable<EmployeeUpdateManyWithWhereWithoutGroupInput>
    deleteMany?: Enumerable<EmployeeScalarWhereInput>
  }

  export type BreakUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<Enumerable<BreakCreateWithoutGroupInput>, Enumerable<BreakUncheckedCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<BreakCreateOrConnectWithoutGroupInput>
    upsert?: Enumerable<BreakUpsertWithWhereUniqueWithoutGroupInput>
    createMany?: BreakCreateManyGroupInputEnvelope
    set?: Enumerable<BreakWhereUniqueInput>
    disconnect?: Enumerable<BreakWhereUniqueInput>
    delete?: Enumerable<BreakWhereUniqueInput>
    connect?: Enumerable<BreakWhereUniqueInput>
    update?: Enumerable<BreakUpdateWithWhereUniqueWithoutGroupInput>
    updateMany?: Enumerable<BreakUpdateManyWithWhereWithoutGroupInput>
    deleteMany?: Enumerable<BreakScalarWhereInput>
  }

  export type WorkShiftUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<Enumerable<WorkShiftCreateWithoutGroupInput>, Enumerable<WorkShiftUncheckedCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<WorkShiftCreateOrConnectWithoutGroupInput>
    upsert?: Enumerable<WorkShiftUpsertWithWhereUniqueWithoutGroupInput>
    createMany?: WorkShiftCreateManyGroupInputEnvelope
    set?: Enumerable<WorkShiftWhereUniqueInput>
    disconnect?: Enumerable<WorkShiftWhereUniqueInput>
    delete?: Enumerable<WorkShiftWhereUniqueInput>
    connect?: Enumerable<WorkShiftWhereUniqueInput>
    update?: Enumerable<WorkShiftUpdateWithWhereUniqueWithoutGroupInput>
    updateMany?: Enumerable<WorkShiftUpdateManyWithWhereWithoutGroupInput>
    deleteMany?: Enumerable<WorkShiftScalarWhereInput>
  }

  export type GroupCreateNestedOneWithoutBreakInput = {
    create?: XOR<GroupCreateWithoutBreakInput, GroupUncheckedCreateWithoutBreakInput>
    connectOrCreate?: GroupCreateOrConnectWithoutBreakInput
    connect?: GroupWhereUniqueInput
  }

  export type GroupUpdateOneRequiredWithoutBreakNestedInput = {
    create?: XOR<GroupCreateWithoutBreakInput, GroupUncheckedCreateWithoutBreakInput>
    connectOrCreate?: GroupCreateOrConnectWithoutBreakInput
    upsert?: GroupUpsertWithoutBreakInput
    connect?: GroupWhereUniqueInput
    update?: XOR<GroupUpdateWithoutBreakInput, GroupUncheckedUpdateWithoutBreakInput>
  }

  export type GroupCreateNestedOneWithoutWorkShiftInput = {
    create?: XOR<GroupCreateWithoutWorkShiftInput, GroupUncheckedCreateWithoutWorkShiftInput>
    connectOrCreate?: GroupCreateOrConnectWithoutWorkShiftInput
    connect?: GroupWhereUniqueInput
  }

  export type EmployeeCreateNestedOneWithoutWorkShiftInput = {
    create?: XOR<EmployeeCreateWithoutWorkShiftInput, EmployeeUncheckedCreateWithoutWorkShiftInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutWorkShiftInput
    connect?: EmployeeWhereUniqueInput
  }

  export type GroupUpdateOneRequiredWithoutWorkShiftNestedInput = {
    create?: XOR<GroupCreateWithoutWorkShiftInput, GroupUncheckedCreateWithoutWorkShiftInput>
    connectOrCreate?: GroupCreateOrConnectWithoutWorkShiftInput
    upsert?: GroupUpsertWithoutWorkShiftInput
    connect?: GroupWhereUniqueInput
    update?: XOR<GroupUpdateWithoutWorkShiftInput, GroupUncheckedUpdateWithoutWorkShiftInput>
  }

  export type EmployeeUpdateOneRequiredWithoutWorkShiftNestedInput = {
    create?: XOR<EmployeeCreateWithoutWorkShiftInput, EmployeeUncheckedCreateWithoutWorkShiftInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutWorkShiftInput
    upsert?: EmployeeUpsertWithoutWorkShiftInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<EmployeeUpdateWithoutWorkShiftInput, EmployeeUncheckedUpdateWithoutWorkShiftInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type EmployeeCreateWithoutTimesheetInput = {
    id?: string
    cardId: string
    name: string
    group: GroupCreateNestedOneWithoutEmployeeInput
    createdAt?: Date | string
    updatedAt?: Date | string
    hasIrregularShifts?: boolean
    WorkShift?: WorkShiftCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutTimesheetInput = {
    id?: string
    cardId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupId: string
    hasIrregularShifts?: boolean
    WorkShift?: WorkShiftUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutTimesheetInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutTimesheetInput, EmployeeUncheckedCreateWithoutTimesheetInput>
  }

  export type EmployeeUpsertWithoutTimesheetInput = {
    update: XOR<EmployeeUpdateWithoutTimesheetInput, EmployeeUncheckedUpdateWithoutTimesheetInput>
    create: XOR<EmployeeCreateWithoutTimesheetInput, EmployeeUncheckedCreateWithoutTimesheetInput>
  }

  export type EmployeeUpdateWithoutTimesheetInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    group?: GroupUpdateOneRequiredWithoutEmployeeNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hasIrregularShifts?: BoolFieldUpdateOperationsInput | boolean
    WorkShift?: WorkShiftUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutTimesheetInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: StringFieldUpdateOperationsInput | string
    hasIrregularShifts?: BoolFieldUpdateOperationsInput | boolean
    WorkShift?: WorkShiftUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type GroupCreateWithoutEmployeeInput = {
    id?: string
    name: string
    startTime: string
    endTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Break?: BreakCreateNestedManyWithoutGroupInput
    WorkShift?: WorkShiftCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutEmployeeInput = {
    id?: string
    name: string
    startTime: string
    endTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Break?: BreakUncheckedCreateNestedManyWithoutGroupInput
    WorkShift?: WorkShiftUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutEmployeeInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutEmployeeInput, GroupUncheckedCreateWithoutEmployeeInput>
  }

  export type TimesheetCreateWithoutEmployeeInput = {
    id?: string
    date: string
    time: string
    isEnter: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimesheetUncheckedCreateWithoutEmployeeInput = {
    id?: string
    date: string
    time: string
    isEnter: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TimesheetCreateOrConnectWithoutEmployeeInput = {
    where: TimesheetWhereUniqueInput
    create: XOR<TimesheetCreateWithoutEmployeeInput, TimesheetUncheckedCreateWithoutEmployeeInput>
  }

  export type TimesheetCreateManyEmployeeInputEnvelope = {
    data: Enumerable<TimesheetCreateManyEmployeeInput>
    skipDuplicates?: boolean
  }

  export type WorkShiftCreateWithoutEmployeeInput = {
    id?: string
    date: string
    group: GroupCreateNestedOneWithoutWorkShiftInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkShiftUncheckedCreateWithoutEmployeeInput = {
    id?: string
    date: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupId: string
  }

  export type WorkShiftCreateOrConnectWithoutEmployeeInput = {
    where: WorkShiftWhereUniqueInput
    create: XOR<WorkShiftCreateWithoutEmployeeInput, WorkShiftUncheckedCreateWithoutEmployeeInput>
  }

  export type WorkShiftCreateManyEmployeeInputEnvelope = {
    data: Enumerable<WorkShiftCreateManyEmployeeInput>
    skipDuplicates?: boolean
  }

  export type GroupUpsertWithoutEmployeeInput = {
    update: XOR<GroupUpdateWithoutEmployeeInput, GroupUncheckedUpdateWithoutEmployeeInput>
    create: XOR<GroupCreateWithoutEmployeeInput, GroupUncheckedCreateWithoutEmployeeInput>
  }

  export type GroupUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Break?: BreakUpdateManyWithoutGroupNestedInput
    WorkShift?: WorkShiftUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Break?: BreakUncheckedUpdateManyWithoutGroupNestedInput
    WorkShift?: WorkShiftUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type TimesheetUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: TimesheetWhereUniqueInput
    update: XOR<TimesheetUpdateWithoutEmployeeInput, TimesheetUncheckedUpdateWithoutEmployeeInput>
    create: XOR<TimesheetCreateWithoutEmployeeInput, TimesheetUncheckedCreateWithoutEmployeeInput>
  }

  export type TimesheetUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: TimesheetWhereUniqueInput
    data: XOR<TimesheetUpdateWithoutEmployeeInput, TimesheetUncheckedUpdateWithoutEmployeeInput>
  }

  export type TimesheetUpdateManyWithWhereWithoutEmployeeInput = {
    where: TimesheetScalarWhereInput
    data: XOR<TimesheetUpdateManyMutationInput, TimesheetUncheckedUpdateManyWithoutTimesheetInput>
  }

  export type TimesheetScalarWhereInput = {
    AND?: Enumerable<TimesheetScalarWhereInput>
    OR?: Enumerable<TimesheetScalarWhereInput>
    NOT?: Enumerable<TimesheetScalarWhereInput>
    id?: StringFilter | string
    date?: StringFilter | string
    time?: StringFilter | string
    isEnter?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    employeeId?: StringFilter | string
  }

  export type WorkShiftUpsertWithWhereUniqueWithoutEmployeeInput = {
    where: WorkShiftWhereUniqueInput
    update: XOR<WorkShiftUpdateWithoutEmployeeInput, WorkShiftUncheckedUpdateWithoutEmployeeInput>
    create: XOR<WorkShiftCreateWithoutEmployeeInput, WorkShiftUncheckedCreateWithoutEmployeeInput>
  }

  export type WorkShiftUpdateWithWhereUniqueWithoutEmployeeInput = {
    where: WorkShiftWhereUniqueInput
    data: XOR<WorkShiftUpdateWithoutEmployeeInput, WorkShiftUncheckedUpdateWithoutEmployeeInput>
  }

  export type WorkShiftUpdateManyWithWhereWithoutEmployeeInput = {
    where: WorkShiftScalarWhereInput
    data: XOR<WorkShiftUpdateManyMutationInput, WorkShiftUncheckedUpdateManyWithoutWorkShiftInput>
  }

  export type WorkShiftScalarWhereInput = {
    AND?: Enumerable<WorkShiftScalarWhereInput>
    OR?: Enumerable<WorkShiftScalarWhereInput>
    NOT?: Enumerable<WorkShiftScalarWhereInput>
    id?: StringFilter | string
    date?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    groupId?: StringFilter | string
    employeeId?: StringFilter | string
  }

  export type EmployeeCreateWithoutGroupInput = {
    id?: string
    cardId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Timesheet?: TimesheetCreateNestedManyWithoutEmployeeInput
    hasIrregularShifts?: boolean
    WorkShift?: WorkShiftCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutGroupInput = {
    id?: string
    cardId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Timesheet?: TimesheetUncheckedCreateNestedManyWithoutEmployeeInput
    hasIrregularShifts?: boolean
    WorkShift?: WorkShiftUncheckedCreateNestedManyWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutGroupInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutGroupInput, EmployeeUncheckedCreateWithoutGroupInput>
  }

  export type EmployeeCreateManyGroupInputEnvelope = {
    data: Enumerable<EmployeeCreateManyGroupInput>
    skipDuplicates?: boolean
  }

  export type BreakCreateWithoutGroupInput = {
    id?: string
    startTime: string
    endTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BreakUncheckedCreateWithoutGroupInput = {
    id?: string
    startTime: string
    endTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BreakCreateOrConnectWithoutGroupInput = {
    where: BreakWhereUniqueInput
    create: XOR<BreakCreateWithoutGroupInput, BreakUncheckedCreateWithoutGroupInput>
  }

  export type BreakCreateManyGroupInputEnvelope = {
    data: Enumerable<BreakCreateManyGroupInput>
    skipDuplicates?: boolean
  }

  export type WorkShiftCreateWithoutGroupInput = {
    id?: string
    date: string
    employee: EmployeeCreateNestedOneWithoutWorkShiftInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkShiftUncheckedCreateWithoutGroupInput = {
    id?: string
    date: string
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeId: string
  }

  export type WorkShiftCreateOrConnectWithoutGroupInput = {
    where: WorkShiftWhereUniqueInput
    create: XOR<WorkShiftCreateWithoutGroupInput, WorkShiftUncheckedCreateWithoutGroupInput>
  }

  export type WorkShiftCreateManyGroupInputEnvelope = {
    data: Enumerable<WorkShiftCreateManyGroupInput>
    skipDuplicates?: boolean
  }

  export type EmployeeUpsertWithWhereUniqueWithoutGroupInput = {
    where: EmployeeWhereUniqueInput
    update: XOR<EmployeeUpdateWithoutGroupInput, EmployeeUncheckedUpdateWithoutGroupInput>
    create: XOR<EmployeeCreateWithoutGroupInput, EmployeeUncheckedCreateWithoutGroupInput>
  }

  export type EmployeeUpdateWithWhereUniqueWithoutGroupInput = {
    where: EmployeeWhereUniqueInput
    data: XOR<EmployeeUpdateWithoutGroupInput, EmployeeUncheckedUpdateWithoutGroupInput>
  }

  export type EmployeeUpdateManyWithWhereWithoutGroupInput = {
    where: EmployeeScalarWhereInput
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyWithoutEmployeeInput>
  }

  export type EmployeeScalarWhereInput = {
    AND?: Enumerable<EmployeeScalarWhereInput>
    OR?: Enumerable<EmployeeScalarWhereInput>
    NOT?: Enumerable<EmployeeScalarWhereInput>
    id?: StringFilter | string
    cardId?: StringFilter | string
    name?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    groupId?: StringFilter | string
    hasIrregularShifts?: BoolFilter | boolean
  }

  export type BreakUpsertWithWhereUniqueWithoutGroupInput = {
    where: BreakWhereUniqueInput
    update: XOR<BreakUpdateWithoutGroupInput, BreakUncheckedUpdateWithoutGroupInput>
    create: XOR<BreakCreateWithoutGroupInput, BreakUncheckedCreateWithoutGroupInput>
  }

  export type BreakUpdateWithWhereUniqueWithoutGroupInput = {
    where: BreakWhereUniqueInput
    data: XOR<BreakUpdateWithoutGroupInput, BreakUncheckedUpdateWithoutGroupInput>
  }

  export type BreakUpdateManyWithWhereWithoutGroupInput = {
    where: BreakScalarWhereInput
    data: XOR<BreakUpdateManyMutationInput, BreakUncheckedUpdateManyWithoutBreakInput>
  }

  export type BreakScalarWhereInput = {
    AND?: Enumerable<BreakScalarWhereInput>
    OR?: Enumerable<BreakScalarWhereInput>
    NOT?: Enumerable<BreakScalarWhereInput>
    id?: StringFilter | string
    startTime?: StringFilter | string
    endTime?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    groupId?: StringFilter | string
  }

  export type WorkShiftUpsertWithWhereUniqueWithoutGroupInput = {
    where: WorkShiftWhereUniqueInput
    update: XOR<WorkShiftUpdateWithoutGroupInput, WorkShiftUncheckedUpdateWithoutGroupInput>
    create: XOR<WorkShiftCreateWithoutGroupInput, WorkShiftUncheckedCreateWithoutGroupInput>
  }

  export type WorkShiftUpdateWithWhereUniqueWithoutGroupInput = {
    where: WorkShiftWhereUniqueInput
    data: XOR<WorkShiftUpdateWithoutGroupInput, WorkShiftUncheckedUpdateWithoutGroupInput>
  }

  export type WorkShiftUpdateManyWithWhereWithoutGroupInput = {
    where: WorkShiftScalarWhereInput
    data: XOR<WorkShiftUpdateManyMutationInput, WorkShiftUncheckedUpdateManyWithoutWorkShiftInput>
  }

  export type GroupCreateWithoutBreakInput = {
    id?: string
    name: string
    startTime: string
    endTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Employee?: EmployeeCreateNestedManyWithoutGroupInput
    WorkShift?: WorkShiftCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutBreakInput = {
    id?: string
    name: string
    startTime: string
    endTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Employee?: EmployeeUncheckedCreateNestedManyWithoutGroupInput
    WorkShift?: WorkShiftUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutBreakInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutBreakInput, GroupUncheckedCreateWithoutBreakInput>
  }

  export type GroupUpsertWithoutBreakInput = {
    update: XOR<GroupUpdateWithoutBreakInput, GroupUncheckedUpdateWithoutBreakInput>
    create: XOR<GroupCreateWithoutBreakInput, GroupUncheckedCreateWithoutBreakInput>
  }

  export type GroupUpdateWithoutBreakInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Employee?: EmployeeUpdateManyWithoutGroupNestedInput
    WorkShift?: WorkShiftUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutBreakInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Employee?: EmployeeUncheckedUpdateManyWithoutGroupNestedInput
    WorkShift?: WorkShiftUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupCreateWithoutWorkShiftInput = {
    id?: string
    name: string
    startTime: string
    endTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Employee?: EmployeeCreateNestedManyWithoutGroupInput
    Break?: BreakCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutWorkShiftInput = {
    id?: string
    name: string
    startTime: string
    endTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Employee?: EmployeeUncheckedCreateNestedManyWithoutGroupInput
    Break?: BreakUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutWorkShiftInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutWorkShiftInput, GroupUncheckedCreateWithoutWorkShiftInput>
  }

  export type EmployeeCreateWithoutWorkShiftInput = {
    id?: string
    cardId: string
    name: string
    group: GroupCreateNestedOneWithoutEmployeeInput
    createdAt?: Date | string
    updatedAt?: Date | string
    Timesheet?: TimesheetCreateNestedManyWithoutEmployeeInput
    hasIrregularShifts?: boolean
  }

  export type EmployeeUncheckedCreateWithoutWorkShiftInput = {
    id?: string
    cardId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    Timesheet?: TimesheetUncheckedCreateNestedManyWithoutEmployeeInput
    groupId: string
    hasIrregularShifts?: boolean
  }

  export type EmployeeCreateOrConnectWithoutWorkShiftInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutWorkShiftInput, EmployeeUncheckedCreateWithoutWorkShiftInput>
  }

  export type GroupUpsertWithoutWorkShiftInput = {
    update: XOR<GroupUpdateWithoutWorkShiftInput, GroupUncheckedUpdateWithoutWorkShiftInput>
    create: XOR<GroupCreateWithoutWorkShiftInput, GroupUncheckedCreateWithoutWorkShiftInput>
  }

  export type GroupUpdateWithoutWorkShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Employee?: EmployeeUpdateManyWithoutGroupNestedInput
    Break?: BreakUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutWorkShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Employee?: EmployeeUncheckedUpdateManyWithoutGroupNestedInput
    Break?: BreakUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type EmployeeUpsertWithoutWorkShiftInput = {
    update: XOR<EmployeeUpdateWithoutWorkShiftInput, EmployeeUncheckedUpdateWithoutWorkShiftInput>
    create: XOR<EmployeeCreateWithoutWorkShiftInput, EmployeeUncheckedCreateWithoutWorkShiftInput>
  }

  export type EmployeeUpdateWithoutWorkShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    group?: GroupUpdateOneRequiredWithoutEmployeeNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Timesheet?: TimesheetUpdateManyWithoutEmployeeNestedInput
    hasIrregularShifts?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmployeeUncheckedUpdateWithoutWorkShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Timesheet?: TimesheetUncheckedUpdateManyWithoutEmployeeNestedInput
    groupId?: StringFieldUpdateOperationsInput | string
    hasIrregularShifts?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TimesheetCreateManyEmployeeInput = {
    id?: string
    date: string
    time: string
    isEnter: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkShiftCreateManyEmployeeInput = {
    id?: string
    date: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupId: string
  }

  export type TimesheetUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    isEnter?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimesheetUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    isEnter?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TimesheetUncheckedUpdateManyWithoutTimesheetInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    time?: StringFieldUpdateOperationsInput | string
    isEnter?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkShiftUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    group?: GroupUpdateOneRequiredWithoutWorkShiftNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkShiftUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: StringFieldUpdateOperationsInput | string
  }

  export type WorkShiftUncheckedUpdateManyWithoutWorkShiftInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: StringFieldUpdateOperationsInput | string
  }

  export type EmployeeCreateManyGroupInput = {
    id?: string
    cardId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hasIrregularShifts?: boolean
  }

  export type BreakCreateManyGroupInput = {
    id?: string
    startTime: string
    endTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkShiftCreateManyGroupInput = {
    id?: string
    date: string
    createdAt?: Date | string
    updatedAt?: Date | string
    employeeId: string
  }

  export type EmployeeUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Timesheet?: TimesheetUpdateManyWithoutEmployeeNestedInput
    hasIrregularShifts?: BoolFieldUpdateOperationsInput | boolean
    WorkShift?: WorkShiftUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Timesheet?: TimesheetUncheckedUpdateManyWithoutEmployeeNestedInput
    hasIrregularShifts?: BoolFieldUpdateOperationsInput | boolean
    WorkShift?: WorkShiftUncheckedUpdateManyWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateManyWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hasIrregularShifts?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BreakUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BreakUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BreakUncheckedUpdateManyWithoutBreakInput = {
    id?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkShiftUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    employee?: EmployeeUpdateOneRequiredWithoutWorkShiftNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkShiftUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}