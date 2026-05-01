
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model YtCredential
 * 
 */
export type YtCredential = $Result.DefaultSelection<Prisma.$YtCredentialPayload>
/**
 * Model CommentLike
 * 
 */
export type CommentLike = $Result.DefaultSelection<Prisma.$CommentLikePayload>
/**
 * Model UserAction
 * 
 */
export type UserAction = $Result.DefaultSelection<Prisma.$UserActionPayload>
/**
 * Model CommentCache
 * 
 */
export type CommentCache = $Result.DefaultSelection<Prisma.$CommentCachePayload>
/**
 * Model Bookmark
 * 
 */
export type Bookmark = $Result.DefaultSelection<Prisma.$BookmarkPayload>
/**
 * Model List
 * 
 */
export type List = $Result.DefaultSelection<Prisma.$ListPayload>
/**
 * Model ListItem
 * 
 */
export type ListItem = $Result.DefaultSelection<Prisma.$ListItemPayload>
/**
 * Model ListFollow
 * 
 */
export type ListFollow = $Result.DefaultSelection<Prisma.$ListFollowPayload>
/**
 * Model BookmarkFolder
 * 
 */
export type BookmarkFolder = $Result.DefaultSelection<Prisma.$BookmarkFolderPayload>
/**
 * Model BlockedUser
 * 
 */
export type BlockedUser = $Result.DefaultSelection<Prisma.$BlockedUserPayload>
/**
 * Model MutedUser
 * 
 */
export type MutedUser = $Result.DefaultSelection<Prisma.$MutedUserPayload>
/**
 * Model ScheduledPost
 * 
 */
export type ScheduledPost = $Result.DefaultSelection<Prisma.$ScheduledPostPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ytCredential`: Exposes CRUD operations for the **YtCredential** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more YtCredentials
    * const ytCredentials = await prisma.ytCredential.findMany()
    * ```
    */
  get ytCredential(): Prisma.YtCredentialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.commentLike`: Exposes CRUD operations for the **CommentLike** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CommentLikes
    * const commentLikes = await prisma.commentLike.findMany()
    * ```
    */
  get commentLike(): Prisma.CommentLikeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userAction`: Exposes CRUD operations for the **UserAction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserActions
    * const userActions = await prisma.userAction.findMany()
    * ```
    */
  get userAction(): Prisma.UserActionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.commentCache`: Exposes CRUD operations for the **CommentCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CommentCaches
    * const commentCaches = await prisma.commentCache.findMany()
    * ```
    */
  get commentCache(): Prisma.CommentCacheDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bookmark`: Exposes CRUD operations for the **Bookmark** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookmarks
    * const bookmarks = await prisma.bookmark.findMany()
    * ```
    */
  get bookmark(): Prisma.BookmarkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.list`: Exposes CRUD operations for the **List** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lists
    * const lists = await prisma.list.findMany()
    * ```
    */
  get list(): Prisma.ListDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.listItem`: Exposes CRUD operations for the **ListItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ListItems
    * const listItems = await prisma.listItem.findMany()
    * ```
    */
  get listItem(): Prisma.ListItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.listFollow`: Exposes CRUD operations for the **ListFollow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ListFollows
    * const listFollows = await prisma.listFollow.findMany()
    * ```
    */
  get listFollow(): Prisma.ListFollowDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bookmarkFolder`: Exposes CRUD operations for the **BookmarkFolder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BookmarkFolders
    * const bookmarkFolders = await prisma.bookmarkFolder.findMany()
    * ```
    */
  get bookmarkFolder(): Prisma.BookmarkFolderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.blockedUser`: Exposes CRUD operations for the **BlockedUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BlockedUsers
    * const blockedUsers = await prisma.blockedUser.findMany()
    * ```
    */
  get blockedUser(): Prisma.BlockedUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mutedUser`: Exposes CRUD operations for the **MutedUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MutedUsers
    * const mutedUsers = await prisma.mutedUser.findMany()
    * ```
    */
  get mutedUser(): Prisma.MutedUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scheduledPost`: Exposes CRUD operations for the **ScheduledPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScheduledPosts
    * const scheduledPosts = await prisma.scheduledPost.findMany()
    * ```
    */
  get scheduledPost(): Prisma.ScheduledPostDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

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
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    YtCredential: 'YtCredential',
    CommentLike: 'CommentLike',
    UserAction: 'UserAction',
    CommentCache: 'CommentCache',
    Bookmark: 'Bookmark',
    List: 'List',
    ListItem: 'ListItem',
    ListFollow: 'ListFollow',
    BookmarkFolder: 'BookmarkFolder',
    BlockedUser: 'BlockedUser',
    MutedUser: 'MutedUser',
    ScheduledPost: 'ScheduledPost'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "ytCredential" | "commentLike" | "userAction" | "commentCache" | "bookmark" | "list" | "listItem" | "listFollow" | "bookmarkFolder" | "blockedUser" | "mutedUser" | "scheduledPost"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      YtCredential: {
        payload: Prisma.$YtCredentialPayload<ExtArgs>
        fields: Prisma.YtCredentialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.YtCredentialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YtCredentialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.YtCredentialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YtCredentialPayload>
          }
          findFirst: {
            args: Prisma.YtCredentialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YtCredentialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.YtCredentialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YtCredentialPayload>
          }
          findMany: {
            args: Prisma.YtCredentialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YtCredentialPayload>[]
          }
          create: {
            args: Prisma.YtCredentialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YtCredentialPayload>
          }
          createMany: {
            args: Prisma.YtCredentialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.YtCredentialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YtCredentialPayload>[]
          }
          delete: {
            args: Prisma.YtCredentialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YtCredentialPayload>
          }
          update: {
            args: Prisma.YtCredentialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YtCredentialPayload>
          }
          deleteMany: {
            args: Prisma.YtCredentialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.YtCredentialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.YtCredentialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YtCredentialPayload>[]
          }
          upsert: {
            args: Prisma.YtCredentialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$YtCredentialPayload>
          }
          aggregate: {
            args: Prisma.YtCredentialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateYtCredential>
          }
          groupBy: {
            args: Prisma.YtCredentialGroupByArgs<ExtArgs>
            result: $Utils.Optional<YtCredentialGroupByOutputType>[]
          }
          count: {
            args: Prisma.YtCredentialCountArgs<ExtArgs>
            result: $Utils.Optional<YtCredentialCountAggregateOutputType> | number
          }
        }
      }
      CommentLike: {
        payload: Prisma.$CommentLikePayload<ExtArgs>
        fields: Prisma.CommentLikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentLikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentLikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>
          }
          findFirst: {
            args: Prisma.CommentLikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentLikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>
          }
          findMany: {
            args: Prisma.CommentLikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>[]
          }
          create: {
            args: Prisma.CommentLikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>
          }
          createMany: {
            args: Prisma.CommentLikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentLikeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>[]
          }
          delete: {
            args: Prisma.CommentLikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>
          }
          update: {
            args: Prisma.CommentLikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>
          }
          deleteMany: {
            args: Prisma.CommentLikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentLikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentLikeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>[]
          }
          upsert: {
            args: Prisma.CommentLikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>
          }
          aggregate: {
            args: Prisma.CommentLikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommentLike>
          }
          groupBy: {
            args: Prisma.CommentLikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentLikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentLikeCountArgs<ExtArgs>
            result: $Utils.Optional<CommentLikeCountAggregateOutputType> | number
          }
        }
      }
      UserAction: {
        payload: Prisma.$UserActionPayload<ExtArgs>
        fields: Prisma.UserActionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserActionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserActionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserActionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserActionPayload>
          }
          findFirst: {
            args: Prisma.UserActionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserActionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserActionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserActionPayload>
          }
          findMany: {
            args: Prisma.UserActionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserActionPayload>[]
          }
          create: {
            args: Prisma.UserActionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserActionPayload>
          }
          createMany: {
            args: Prisma.UserActionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserActionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserActionPayload>[]
          }
          delete: {
            args: Prisma.UserActionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserActionPayload>
          }
          update: {
            args: Prisma.UserActionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserActionPayload>
          }
          deleteMany: {
            args: Prisma.UserActionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserActionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserActionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserActionPayload>[]
          }
          upsert: {
            args: Prisma.UserActionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserActionPayload>
          }
          aggregate: {
            args: Prisma.UserActionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserAction>
          }
          groupBy: {
            args: Prisma.UserActionGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserActionGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserActionCountArgs<ExtArgs>
            result: $Utils.Optional<UserActionCountAggregateOutputType> | number
          }
        }
      }
      CommentCache: {
        payload: Prisma.$CommentCachePayload<ExtArgs>
        fields: Prisma.CommentCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentCachePayload>
          }
          findFirst: {
            args: Prisma.CommentCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentCachePayload>
          }
          findMany: {
            args: Prisma.CommentCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentCachePayload>[]
          }
          create: {
            args: Prisma.CommentCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentCachePayload>
          }
          createMany: {
            args: Prisma.CommentCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentCachePayload>[]
          }
          delete: {
            args: Prisma.CommentCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentCachePayload>
          }
          update: {
            args: Prisma.CommentCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentCachePayload>
          }
          deleteMany: {
            args: Prisma.CommentCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentCacheUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentCachePayload>[]
          }
          upsert: {
            args: Prisma.CommentCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentCachePayload>
          }
          aggregate: {
            args: Prisma.CommentCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommentCache>
          }
          groupBy: {
            args: Prisma.CommentCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentCacheCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCacheCountAggregateOutputType> | number
          }
        }
      }
      Bookmark: {
        payload: Prisma.$BookmarkPayload<ExtArgs>
        fields: Prisma.BookmarkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookmarkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookmarkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          findFirst: {
            args: Prisma.BookmarkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookmarkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          findMany: {
            args: Prisma.BookmarkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>[]
          }
          create: {
            args: Prisma.BookmarkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          createMany: {
            args: Prisma.BookmarkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookmarkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>[]
          }
          delete: {
            args: Prisma.BookmarkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          update: {
            args: Prisma.BookmarkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          deleteMany: {
            args: Prisma.BookmarkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookmarkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookmarkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>[]
          }
          upsert: {
            args: Prisma.BookmarkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          aggregate: {
            args: Prisma.BookmarkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookmark>
          }
          groupBy: {
            args: Prisma.BookmarkGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookmarkGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookmarkCountArgs<ExtArgs>
            result: $Utils.Optional<BookmarkCountAggregateOutputType> | number
          }
        }
      }
      List: {
        payload: Prisma.$ListPayload<ExtArgs>
        fields: Prisma.ListFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          findFirst: {
            args: Prisma.ListFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          findMany: {
            args: Prisma.ListFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>[]
          }
          create: {
            args: Prisma.ListCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          createMany: {
            args: Prisma.ListCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ListCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>[]
          }
          delete: {
            args: Prisma.ListDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          update: {
            args: Prisma.ListUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          deleteMany: {
            args: Prisma.ListDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ListUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>[]
          }
          upsert: {
            args: Prisma.ListUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          aggregate: {
            args: Prisma.ListAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateList>
          }
          groupBy: {
            args: Prisma.ListGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListCountArgs<ExtArgs>
            result: $Utils.Optional<ListCountAggregateOutputType> | number
          }
        }
      }
      ListItem: {
        payload: Prisma.$ListItemPayload<ExtArgs>
        fields: Prisma.ListItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload>
          }
          findFirst: {
            args: Prisma.ListItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload>
          }
          findMany: {
            args: Prisma.ListItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload>[]
          }
          create: {
            args: Prisma.ListItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload>
          }
          createMany: {
            args: Prisma.ListItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ListItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload>[]
          }
          delete: {
            args: Prisma.ListItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload>
          }
          update: {
            args: Prisma.ListItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload>
          }
          deleteMany: {
            args: Prisma.ListItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ListItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload>[]
          }
          upsert: {
            args: Prisma.ListItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload>
          }
          aggregate: {
            args: Prisma.ListItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateListItem>
          }
          groupBy: {
            args: Prisma.ListItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListItemCountArgs<ExtArgs>
            result: $Utils.Optional<ListItemCountAggregateOutputType> | number
          }
        }
      }
      ListFollow: {
        payload: Prisma.$ListFollowPayload<ExtArgs>
        fields: Prisma.ListFollowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListFollowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListFollowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListFollowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListFollowPayload>
          }
          findFirst: {
            args: Prisma.ListFollowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListFollowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListFollowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListFollowPayload>
          }
          findMany: {
            args: Prisma.ListFollowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListFollowPayload>[]
          }
          create: {
            args: Prisma.ListFollowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListFollowPayload>
          }
          createMany: {
            args: Prisma.ListFollowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ListFollowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListFollowPayload>[]
          }
          delete: {
            args: Prisma.ListFollowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListFollowPayload>
          }
          update: {
            args: Prisma.ListFollowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListFollowPayload>
          }
          deleteMany: {
            args: Prisma.ListFollowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListFollowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ListFollowUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListFollowPayload>[]
          }
          upsert: {
            args: Prisma.ListFollowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListFollowPayload>
          }
          aggregate: {
            args: Prisma.ListFollowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateListFollow>
          }
          groupBy: {
            args: Prisma.ListFollowGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListFollowGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListFollowCountArgs<ExtArgs>
            result: $Utils.Optional<ListFollowCountAggregateOutputType> | number
          }
        }
      }
      BookmarkFolder: {
        payload: Prisma.$BookmarkFolderPayload<ExtArgs>
        fields: Prisma.BookmarkFolderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookmarkFolderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkFolderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookmarkFolderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkFolderPayload>
          }
          findFirst: {
            args: Prisma.BookmarkFolderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkFolderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookmarkFolderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkFolderPayload>
          }
          findMany: {
            args: Prisma.BookmarkFolderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkFolderPayload>[]
          }
          create: {
            args: Prisma.BookmarkFolderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkFolderPayload>
          }
          createMany: {
            args: Prisma.BookmarkFolderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookmarkFolderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkFolderPayload>[]
          }
          delete: {
            args: Prisma.BookmarkFolderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkFolderPayload>
          }
          update: {
            args: Prisma.BookmarkFolderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkFolderPayload>
          }
          deleteMany: {
            args: Prisma.BookmarkFolderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookmarkFolderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookmarkFolderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkFolderPayload>[]
          }
          upsert: {
            args: Prisma.BookmarkFolderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkFolderPayload>
          }
          aggregate: {
            args: Prisma.BookmarkFolderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookmarkFolder>
          }
          groupBy: {
            args: Prisma.BookmarkFolderGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookmarkFolderGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookmarkFolderCountArgs<ExtArgs>
            result: $Utils.Optional<BookmarkFolderCountAggregateOutputType> | number
          }
        }
      }
      BlockedUser: {
        payload: Prisma.$BlockedUserPayload<ExtArgs>
        fields: Prisma.BlockedUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlockedUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockedUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlockedUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockedUserPayload>
          }
          findFirst: {
            args: Prisma.BlockedUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockedUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlockedUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockedUserPayload>
          }
          findMany: {
            args: Prisma.BlockedUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockedUserPayload>[]
          }
          create: {
            args: Prisma.BlockedUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockedUserPayload>
          }
          createMany: {
            args: Prisma.BlockedUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BlockedUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockedUserPayload>[]
          }
          delete: {
            args: Prisma.BlockedUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockedUserPayload>
          }
          update: {
            args: Prisma.BlockedUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockedUserPayload>
          }
          deleteMany: {
            args: Prisma.BlockedUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlockedUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BlockedUserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockedUserPayload>[]
          }
          upsert: {
            args: Prisma.BlockedUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockedUserPayload>
          }
          aggregate: {
            args: Prisma.BlockedUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlockedUser>
          }
          groupBy: {
            args: Prisma.BlockedUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlockedUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlockedUserCountArgs<ExtArgs>
            result: $Utils.Optional<BlockedUserCountAggregateOutputType> | number
          }
        }
      }
      MutedUser: {
        payload: Prisma.$MutedUserPayload<ExtArgs>
        fields: Prisma.MutedUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MutedUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MutedUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MutedUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MutedUserPayload>
          }
          findFirst: {
            args: Prisma.MutedUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MutedUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MutedUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MutedUserPayload>
          }
          findMany: {
            args: Prisma.MutedUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MutedUserPayload>[]
          }
          create: {
            args: Prisma.MutedUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MutedUserPayload>
          }
          createMany: {
            args: Prisma.MutedUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MutedUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MutedUserPayload>[]
          }
          delete: {
            args: Prisma.MutedUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MutedUserPayload>
          }
          update: {
            args: Prisma.MutedUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MutedUserPayload>
          }
          deleteMany: {
            args: Prisma.MutedUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MutedUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MutedUserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MutedUserPayload>[]
          }
          upsert: {
            args: Prisma.MutedUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MutedUserPayload>
          }
          aggregate: {
            args: Prisma.MutedUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMutedUser>
          }
          groupBy: {
            args: Prisma.MutedUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<MutedUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.MutedUserCountArgs<ExtArgs>
            result: $Utils.Optional<MutedUserCountAggregateOutputType> | number
          }
        }
      }
      ScheduledPost: {
        payload: Prisma.$ScheduledPostPayload<ExtArgs>
        fields: Prisma.ScheduledPostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScheduledPostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledPostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScheduledPostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledPostPayload>
          }
          findFirst: {
            args: Prisma.ScheduledPostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledPostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScheduledPostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledPostPayload>
          }
          findMany: {
            args: Prisma.ScheduledPostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledPostPayload>[]
          }
          create: {
            args: Prisma.ScheduledPostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledPostPayload>
          }
          createMany: {
            args: Prisma.ScheduledPostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScheduledPostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledPostPayload>[]
          }
          delete: {
            args: Prisma.ScheduledPostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledPostPayload>
          }
          update: {
            args: Prisma.ScheduledPostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledPostPayload>
          }
          deleteMany: {
            args: Prisma.ScheduledPostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScheduledPostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScheduledPostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledPostPayload>[]
          }
          upsert: {
            args: Prisma.ScheduledPostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduledPostPayload>
          }
          aggregate: {
            args: Prisma.ScheduledPostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScheduledPost>
          }
          groupBy: {
            args: Prisma.ScheduledPostGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScheduledPostGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScheduledPostCountArgs<ExtArgs>
            result: $Utils.Optional<ScheduledPostCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    ytCredential?: YtCredentialOmit
    commentLike?: CommentLikeOmit
    userAction?: UserActionOmit
    commentCache?: CommentCacheOmit
    bookmark?: BookmarkOmit
    list?: ListOmit
    listItem?: ListItemOmit
    listFollow?: ListFollowOmit
    bookmarkFolder?: BookmarkFolderOmit
    blockedUser?: BlockedUserOmit
    mutedUser?: MutedUserOmit
    scheduledPost?: ScheduledPostOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    commentLikes: number
    actions: number
    lists: number
    listFollows: number
    bookmarkFolders: number
    blockedUsers: number
    mutedUsers: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    commentLikes?: boolean | UserCountOutputTypeCountCommentLikesArgs
    actions?: boolean | UserCountOutputTypeCountActionsArgs
    lists?: boolean | UserCountOutputTypeCountListsArgs
    listFollows?: boolean | UserCountOutputTypeCountListFollowsArgs
    bookmarkFolders?: boolean | UserCountOutputTypeCountBookmarkFoldersArgs
    blockedUsers?: boolean | UserCountOutputTypeCountBlockedUsersArgs
    mutedUsers?: boolean | UserCountOutputTypeCountMutedUsersArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommentLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentLikeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserActionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountListsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountListFollowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListFollowWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBookmarkFoldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookmarkFolderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBlockedUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlockedUserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMutedUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MutedUserWhereInput
  }


  /**
   * Count Type ListCountOutputType
   */

  export type ListCountOutputType = {
    items: number
    followers: number
  }

  export type ListCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | ListCountOutputTypeCountItemsArgs
    followers?: boolean | ListCountOutputTypeCountFollowersArgs
  }

  // Custom InputTypes
  /**
   * ListCountOutputType without action
   */
  export type ListCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListCountOutputType
     */
    select?: ListCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ListCountOutputType without action
   */
  export type ListCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListItemWhereInput
  }

  /**
   * ListCountOutputType without action
   */
  export type ListCountOutputTypeCountFollowersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListFollowWhereInput
  }


  /**
   * Count Type BookmarkFolderCountOutputType
   */

  export type BookmarkFolderCountOutputType = {
    bookmarks: number
  }

  export type BookmarkFolderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookmarks?: boolean | BookmarkFolderCountOutputTypeCountBookmarksArgs
  }

  // Custom InputTypes
  /**
   * BookmarkFolderCountOutputType without action
   */
  export type BookmarkFolderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookmarkFolderCountOutputType
     */
    select?: BookmarkFolderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BookmarkFolderCountOutputType without action
   */
  export type BookmarkFolderCountOutputTypeCountBookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookmarkWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    image: string | null
    channelId: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    image: string | null
    channelId: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    image: number
    channelId: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    image?: true
    channelId?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    image?: true
    channelId?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    image?: true
    channelId?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    image: string | null
    channelId: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    image?: boolean
    channelId?: boolean
    ytCredential?: boolean | User$ytCredentialArgs<ExtArgs>
    commentLikes?: boolean | User$commentLikesArgs<ExtArgs>
    actions?: boolean | User$actionsArgs<ExtArgs>
    lists?: boolean | User$listsArgs<ExtArgs>
    listFollows?: boolean | User$listFollowsArgs<ExtArgs>
    bookmarkFolders?: boolean | User$bookmarkFoldersArgs<ExtArgs>
    blockedUsers?: boolean | User$blockedUsersArgs<ExtArgs>
    mutedUsers?: boolean | User$mutedUsersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    image?: boolean
    channelId?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    image?: boolean
    channelId?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    image?: boolean
    channelId?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "image" | "channelId", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ytCredential?: boolean | User$ytCredentialArgs<ExtArgs>
    commentLikes?: boolean | User$commentLikesArgs<ExtArgs>
    actions?: boolean | User$actionsArgs<ExtArgs>
    lists?: boolean | User$listsArgs<ExtArgs>
    listFollows?: boolean | User$listFollowsArgs<ExtArgs>
    bookmarkFolders?: boolean | User$bookmarkFoldersArgs<ExtArgs>
    blockedUsers?: boolean | User$blockedUsersArgs<ExtArgs>
    mutedUsers?: boolean | User$mutedUsersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      ytCredential: Prisma.$YtCredentialPayload<ExtArgs> | null
      commentLikes: Prisma.$CommentLikePayload<ExtArgs>[]
      actions: Prisma.$UserActionPayload<ExtArgs>[]
      lists: Prisma.$ListPayload<ExtArgs>[]
      listFollows: Prisma.$ListFollowPayload<ExtArgs>[]
      bookmarkFolders: Prisma.$BookmarkFolderPayload<ExtArgs>[]
      blockedUsers: Prisma.$BlockedUserPayload<ExtArgs>[]
      mutedUsers: Prisma.$MutedUserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      image: string | null
      channelId: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ytCredential<T extends User$ytCredentialArgs<ExtArgs> = {}>(args?: Subset<T, User$ytCredentialArgs<ExtArgs>>): Prisma__YtCredentialClient<$Result.GetResult<Prisma.$YtCredentialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    commentLikes<T extends User$commentLikesArgs<ExtArgs> = {}>(args?: Subset<T, User$commentLikesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    actions<T extends User$actionsArgs<ExtArgs> = {}>(args?: Subset<T, User$actionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lists<T extends User$listsArgs<ExtArgs> = {}>(args?: Subset<T, User$listsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    listFollows<T extends User$listFollowsArgs<ExtArgs> = {}>(args?: Subset<T, User$listFollowsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListFollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookmarkFolders<T extends User$bookmarkFoldersArgs<ExtArgs> = {}>(args?: Subset<T, User$bookmarkFoldersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkFolderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    blockedUsers<T extends User$blockedUsersArgs<ExtArgs> = {}>(args?: Subset<T, User$blockedUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockedUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    mutedUsers<T extends User$mutedUsersArgs<ExtArgs> = {}>(args?: Subset<T, User$mutedUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MutedUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly channelId: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data?: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.ytCredential
   */
  export type User$ytCredentialArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YtCredential
     */
    select?: YtCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YtCredential
     */
    omit?: YtCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YtCredentialInclude<ExtArgs> | null
    where?: YtCredentialWhereInput
  }

  /**
   * User.commentLikes
   */
  export type User$commentLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    where?: CommentLikeWhereInput
    orderBy?: CommentLikeOrderByWithRelationInput | CommentLikeOrderByWithRelationInput[]
    cursor?: CommentLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentLikeScalarFieldEnum | CommentLikeScalarFieldEnum[]
  }

  /**
   * User.actions
   */
  export type User$actionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAction
     */
    select?: UserActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAction
     */
    omit?: UserActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserActionInclude<ExtArgs> | null
    where?: UserActionWhereInput
    orderBy?: UserActionOrderByWithRelationInput | UserActionOrderByWithRelationInput[]
    cursor?: UserActionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserActionScalarFieldEnum | UserActionScalarFieldEnum[]
  }

  /**
   * User.lists
   */
  export type User$listsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    where?: ListWhereInput
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    cursor?: ListWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListScalarFieldEnum | ListScalarFieldEnum[]
  }

  /**
   * User.listFollows
   */
  export type User$listFollowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListFollow
     */
    select?: ListFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListFollow
     */
    omit?: ListFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListFollowInclude<ExtArgs> | null
    where?: ListFollowWhereInput
    orderBy?: ListFollowOrderByWithRelationInput | ListFollowOrderByWithRelationInput[]
    cursor?: ListFollowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListFollowScalarFieldEnum | ListFollowScalarFieldEnum[]
  }

  /**
   * User.bookmarkFolders
   */
  export type User$bookmarkFoldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookmarkFolder
     */
    select?: BookmarkFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookmarkFolder
     */
    omit?: BookmarkFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkFolderInclude<ExtArgs> | null
    where?: BookmarkFolderWhereInput
    orderBy?: BookmarkFolderOrderByWithRelationInput | BookmarkFolderOrderByWithRelationInput[]
    cursor?: BookmarkFolderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookmarkFolderScalarFieldEnum | BookmarkFolderScalarFieldEnum[]
  }

  /**
   * User.blockedUsers
   */
  export type User$blockedUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockedUser
     */
    select?: BlockedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockedUser
     */
    omit?: BlockedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockedUserInclude<ExtArgs> | null
    where?: BlockedUserWhereInput
    orderBy?: BlockedUserOrderByWithRelationInput | BlockedUserOrderByWithRelationInput[]
    cursor?: BlockedUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BlockedUserScalarFieldEnum | BlockedUserScalarFieldEnum[]
  }

  /**
   * User.mutedUsers
   */
  export type User$mutedUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MutedUser
     */
    select?: MutedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MutedUser
     */
    omit?: MutedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MutedUserInclude<ExtArgs> | null
    where?: MutedUserWhereInput
    orderBy?: MutedUserOrderByWithRelationInput | MutedUserOrderByWithRelationInput[]
    cursor?: MutedUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MutedUserScalarFieldEnum | MutedUserScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model YtCredential
   */

  export type AggregateYtCredential = {
    _count: YtCredentialCountAggregateOutputType | null
    _min: YtCredentialMinAggregateOutputType | null
    _max: YtCredentialMaxAggregateOutputType | null
  }

  export type YtCredentialMinAggregateOutputType = {
    id: string | null
    userId: string | null
    credential: string | null
    type: string | null
    updatedAt: Date | null
  }

  export type YtCredentialMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    credential: string | null
    type: string | null
    updatedAt: Date | null
  }

  export type YtCredentialCountAggregateOutputType = {
    id: number
    userId: number
    credential: number
    type: number
    updatedAt: number
    _all: number
  }


  export type YtCredentialMinAggregateInputType = {
    id?: true
    userId?: true
    credential?: true
    type?: true
    updatedAt?: true
  }

  export type YtCredentialMaxAggregateInputType = {
    id?: true
    userId?: true
    credential?: true
    type?: true
    updatedAt?: true
  }

  export type YtCredentialCountAggregateInputType = {
    id?: true
    userId?: true
    credential?: true
    type?: true
    updatedAt?: true
    _all?: true
  }

  export type YtCredentialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which YtCredential to aggregate.
     */
    where?: YtCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YtCredentials to fetch.
     */
    orderBy?: YtCredentialOrderByWithRelationInput | YtCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: YtCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YtCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YtCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned YtCredentials
    **/
    _count?: true | YtCredentialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: YtCredentialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: YtCredentialMaxAggregateInputType
  }

  export type GetYtCredentialAggregateType<T extends YtCredentialAggregateArgs> = {
        [P in keyof T & keyof AggregateYtCredential]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateYtCredential[P]>
      : GetScalarType<T[P], AggregateYtCredential[P]>
  }




  export type YtCredentialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: YtCredentialWhereInput
    orderBy?: YtCredentialOrderByWithAggregationInput | YtCredentialOrderByWithAggregationInput[]
    by: YtCredentialScalarFieldEnum[] | YtCredentialScalarFieldEnum
    having?: YtCredentialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: YtCredentialCountAggregateInputType | true
    _min?: YtCredentialMinAggregateInputType
    _max?: YtCredentialMaxAggregateInputType
  }

  export type YtCredentialGroupByOutputType = {
    id: string
    userId: string
    credential: string
    type: string
    updatedAt: Date
    _count: YtCredentialCountAggregateOutputType | null
    _min: YtCredentialMinAggregateOutputType | null
    _max: YtCredentialMaxAggregateOutputType | null
  }

  type GetYtCredentialGroupByPayload<T extends YtCredentialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<YtCredentialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof YtCredentialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], YtCredentialGroupByOutputType[P]>
            : GetScalarType<T[P], YtCredentialGroupByOutputType[P]>
        }
      >
    >


  export type YtCredentialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    credential?: boolean
    type?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ytCredential"]>

  export type YtCredentialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    credential?: boolean
    type?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ytCredential"]>

  export type YtCredentialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    credential?: boolean
    type?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ytCredential"]>

  export type YtCredentialSelectScalar = {
    id?: boolean
    userId?: boolean
    credential?: boolean
    type?: boolean
    updatedAt?: boolean
  }

  export type YtCredentialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "credential" | "type" | "updatedAt", ExtArgs["result"]["ytCredential"]>
  export type YtCredentialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type YtCredentialIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type YtCredentialIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $YtCredentialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "YtCredential"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      credential: string
      type: string
      updatedAt: Date
    }, ExtArgs["result"]["ytCredential"]>
    composites: {}
  }

  type YtCredentialGetPayload<S extends boolean | null | undefined | YtCredentialDefaultArgs> = $Result.GetResult<Prisma.$YtCredentialPayload, S>

  type YtCredentialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<YtCredentialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: YtCredentialCountAggregateInputType | true
    }

  export interface YtCredentialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['YtCredential'], meta: { name: 'YtCredential' } }
    /**
     * Find zero or one YtCredential that matches the filter.
     * @param {YtCredentialFindUniqueArgs} args - Arguments to find a YtCredential
     * @example
     * // Get one YtCredential
     * const ytCredential = await prisma.ytCredential.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends YtCredentialFindUniqueArgs>(args: SelectSubset<T, YtCredentialFindUniqueArgs<ExtArgs>>): Prisma__YtCredentialClient<$Result.GetResult<Prisma.$YtCredentialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one YtCredential that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {YtCredentialFindUniqueOrThrowArgs} args - Arguments to find a YtCredential
     * @example
     * // Get one YtCredential
     * const ytCredential = await prisma.ytCredential.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends YtCredentialFindUniqueOrThrowArgs>(args: SelectSubset<T, YtCredentialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__YtCredentialClient<$Result.GetResult<Prisma.$YtCredentialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first YtCredential that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YtCredentialFindFirstArgs} args - Arguments to find a YtCredential
     * @example
     * // Get one YtCredential
     * const ytCredential = await prisma.ytCredential.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends YtCredentialFindFirstArgs>(args?: SelectSubset<T, YtCredentialFindFirstArgs<ExtArgs>>): Prisma__YtCredentialClient<$Result.GetResult<Prisma.$YtCredentialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first YtCredential that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YtCredentialFindFirstOrThrowArgs} args - Arguments to find a YtCredential
     * @example
     * // Get one YtCredential
     * const ytCredential = await prisma.ytCredential.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends YtCredentialFindFirstOrThrowArgs>(args?: SelectSubset<T, YtCredentialFindFirstOrThrowArgs<ExtArgs>>): Prisma__YtCredentialClient<$Result.GetResult<Prisma.$YtCredentialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more YtCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YtCredentialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all YtCredentials
     * const ytCredentials = await prisma.ytCredential.findMany()
     * 
     * // Get first 10 YtCredentials
     * const ytCredentials = await prisma.ytCredential.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ytCredentialWithIdOnly = await prisma.ytCredential.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends YtCredentialFindManyArgs>(args?: SelectSubset<T, YtCredentialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$YtCredentialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a YtCredential.
     * @param {YtCredentialCreateArgs} args - Arguments to create a YtCredential.
     * @example
     * // Create one YtCredential
     * const YtCredential = await prisma.ytCredential.create({
     *   data: {
     *     // ... data to create a YtCredential
     *   }
     * })
     * 
     */
    create<T extends YtCredentialCreateArgs>(args: SelectSubset<T, YtCredentialCreateArgs<ExtArgs>>): Prisma__YtCredentialClient<$Result.GetResult<Prisma.$YtCredentialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many YtCredentials.
     * @param {YtCredentialCreateManyArgs} args - Arguments to create many YtCredentials.
     * @example
     * // Create many YtCredentials
     * const ytCredential = await prisma.ytCredential.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends YtCredentialCreateManyArgs>(args?: SelectSubset<T, YtCredentialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many YtCredentials and returns the data saved in the database.
     * @param {YtCredentialCreateManyAndReturnArgs} args - Arguments to create many YtCredentials.
     * @example
     * // Create many YtCredentials
     * const ytCredential = await prisma.ytCredential.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many YtCredentials and only return the `id`
     * const ytCredentialWithIdOnly = await prisma.ytCredential.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends YtCredentialCreateManyAndReturnArgs>(args?: SelectSubset<T, YtCredentialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$YtCredentialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a YtCredential.
     * @param {YtCredentialDeleteArgs} args - Arguments to delete one YtCredential.
     * @example
     * // Delete one YtCredential
     * const YtCredential = await prisma.ytCredential.delete({
     *   where: {
     *     // ... filter to delete one YtCredential
     *   }
     * })
     * 
     */
    delete<T extends YtCredentialDeleteArgs>(args: SelectSubset<T, YtCredentialDeleteArgs<ExtArgs>>): Prisma__YtCredentialClient<$Result.GetResult<Prisma.$YtCredentialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one YtCredential.
     * @param {YtCredentialUpdateArgs} args - Arguments to update one YtCredential.
     * @example
     * // Update one YtCredential
     * const ytCredential = await prisma.ytCredential.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends YtCredentialUpdateArgs>(args: SelectSubset<T, YtCredentialUpdateArgs<ExtArgs>>): Prisma__YtCredentialClient<$Result.GetResult<Prisma.$YtCredentialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more YtCredentials.
     * @param {YtCredentialDeleteManyArgs} args - Arguments to filter YtCredentials to delete.
     * @example
     * // Delete a few YtCredentials
     * const { count } = await prisma.ytCredential.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends YtCredentialDeleteManyArgs>(args?: SelectSubset<T, YtCredentialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more YtCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YtCredentialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many YtCredentials
     * const ytCredential = await prisma.ytCredential.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends YtCredentialUpdateManyArgs>(args: SelectSubset<T, YtCredentialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more YtCredentials and returns the data updated in the database.
     * @param {YtCredentialUpdateManyAndReturnArgs} args - Arguments to update many YtCredentials.
     * @example
     * // Update many YtCredentials
     * const ytCredential = await prisma.ytCredential.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more YtCredentials and only return the `id`
     * const ytCredentialWithIdOnly = await prisma.ytCredential.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends YtCredentialUpdateManyAndReturnArgs>(args: SelectSubset<T, YtCredentialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$YtCredentialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one YtCredential.
     * @param {YtCredentialUpsertArgs} args - Arguments to update or create a YtCredential.
     * @example
     * // Update or create a YtCredential
     * const ytCredential = await prisma.ytCredential.upsert({
     *   create: {
     *     // ... data to create a YtCredential
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the YtCredential we want to update
     *   }
     * })
     */
    upsert<T extends YtCredentialUpsertArgs>(args: SelectSubset<T, YtCredentialUpsertArgs<ExtArgs>>): Prisma__YtCredentialClient<$Result.GetResult<Prisma.$YtCredentialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of YtCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YtCredentialCountArgs} args - Arguments to filter YtCredentials to count.
     * @example
     * // Count the number of YtCredentials
     * const count = await prisma.ytCredential.count({
     *   where: {
     *     // ... the filter for the YtCredentials we want to count
     *   }
     * })
    **/
    count<T extends YtCredentialCountArgs>(
      args?: Subset<T, YtCredentialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], YtCredentialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a YtCredential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YtCredentialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends YtCredentialAggregateArgs>(args: Subset<T, YtCredentialAggregateArgs>): Prisma.PrismaPromise<GetYtCredentialAggregateType<T>>

    /**
     * Group by YtCredential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YtCredentialGroupByArgs} args - Group by arguments.
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
      T extends YtCredentialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: YtCredentialGroupByArgs['orderBy'] }
        : { orderBy?: YtCredentialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, YtCredentialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetYtCredentialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the YtCredential model
   */
  readonly fields: YtCredentialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for YtCredential.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__YtCredentialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the YtCredential model
   */
  interface YtCredentialFieldRefs {
    readonly id: FieldRef<"YtCredential", 'String'>
    readonly userId: FieldRef<"YtCredential", 'String'>
    readonly credential: FieldRef<"YtCredential", 'String'>
    readonly type: FieldRef<"YtCredential", 'String'>
    readonly updatedAt: FieldRef<"YtCredential", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * YtCredential findUnique
   */
  export type YtCredentialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YtCredential
     */
    select?: YtCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YtCredential
     */
    omit?: YtCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YtCredentialInclude<ExtArgs> | null
    /**
     * Filter, which YtCredential to fetch.
     */
    where: YtCredentialWhereUniqueInput
  }

  /**
   * YtCredential findUniqueOrThrow
   */
  export type YtCredentialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YtCredential
     */
    select?: YtCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YtCredential
     */
    omit?: YtCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YtCredentialInclude<ExtArgs> | null
    /**
     * Filter, which YtCredential to fetch.
     */
    where: YtCredentialWhereUniqueInput
  }

  /**
   * YtCredential findFirst
   */
  export type YtCredentialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YtCredential
     */
    select?: YtCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YtCredential
     */
    omit?: YtCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YtCredentialInclude<ExtArgs> | null
    /**
     * Filter, which YtCredential to fetch.
     */
    where?: YtCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YtCredentials to fetch.
     */
    orderBy?: YtCredentialOrderByWithRelationInput | YtCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for YtCredentials.
     */
    cursor?: YtCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YtCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YtCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of YtCredentials.
     */
    distinct?: YtCredentialScalarFieldEnum | YtCredentialScalarFieldEnum[]
  }

  /**
   * YtCredential findFirstOrThrow
   */
  export type YtCredentialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YtCredential
     */
    select?: YtCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YtCredential
     */
    omit?: YtCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YtCredentialInclude<ExtArgs> | null
    /**
     * Filter, which YtCredential to fetch.
     */
    where?: YtCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YtCredentials to fetch.
     */
    orderBy?: YtCredentialOrderByWithRelationInput | YtCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for YtCredentials.
     */
    cursor?: YtCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YtCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YtCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of YtCredentials.
     */
    distinct?: YtCredentialScalarFieldEnum | YtCredentialScalarFieldEnum[]
  }

  /**
   * YtCredential findMany
   */
  export type YtCredentialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YtCredential
     */
    select?: YtCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YtCredential
     */
    omit?: YtCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YtCredentialInclude<ExtArgs> | null
    /**
     * Filter, which YtCredentials to fetch.
     */
    where?: YtCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YtCredentials to fetch.
     */
    orderBy?: YtCredentialOrderByWithRelationInput | YtCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing YtCredentials.
     */
    cursor?: YtCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YtCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YtCredentials.
     */
    skip?: number
    distinct?: YtCredentialScalarFieldEnum | YtCredentialScalarFieldEnum[]
  }

  /**
   * YtCredential create
   */
  export type YtCredentialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YtCredential
     */
    select?: YtCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YtCredential
     */
    omit?: YtCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YtCredentialInclude<ExtArgs> | null
    /**
     * The data needed to create a YtCredential.
     */
    data: XOR<YtCredentialCreateInput, YtCredentialUncheckedCreateInput>
  }

  /**
   * YtCredential createMany
   */
  export type YtCredentialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many YtCredentials.
     */
    data: YtCredentialCreateManyInput | YtCredentialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * YtCredential createManyAndReturn
   */
  export type YtCredentialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YtCredential
     */
    select?: YtCredentialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the YtCredential
     */
    omit?: YtCredentialOmit<ExtArgs> | null
    /**
     * The data used to create many YtCredentials.
     */
    data: YtCredentialCreateManyInput | YtCredentialCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YtCredentialIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * YtCredential update
   */
  export type YtCredentialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YtCredential
     */
    select?: YtCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YtCredential
     */
    omit?: YtCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YtCredentialInclude<ExtArgs> | null
    /**
     * The data needed to update a YtCredential.
     */
    data: XOR<YtCredentialUpdateInput, YtCredentialUncheckedUpdateInput>
    /**
     * Choose, which YtCredential to update.
     */
    where: YtCredentialWhereUniqueInput
  }

  /**
   * YtCredential updateMany
   */
  export type YtCredentialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update YtCredentials.
     */
    data: XOR<YtCredentialUpdateManyMutationInput, YtCredentialUncheckedUpdateManyInput>
    /**
     * Filter which YtCredentials to update
     */
    where?: YtCredentialWhereInput
    /**
     * Limit how many YtCredentials to update.
     */
    limit?: number
  }

  /**
   * YtCredential updateManyAndReturn
   */
  export type YtCredentialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YtCredential
     */
    select?: YtCredentialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the YtCredential
     */
    omit?: YtCredentialOmit<ExtArgs> | null
    /**
     * The data used to update YtCredentials.
     */
    data: XOR<YtCredentialUpdateManyMutationInput, YtCredentialUncheckedUpdateManyInput>
    /**
     * Filter which YtCredentials to update
     */
    where?: YtCredentialWhereInput
    /**
     * Limit how many YtCredentials to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YtCredentialIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * YtCredential upsert
   */
  export type YtCredentialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YtCredential
     */
    select?: YtCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YtCredential
     */
    omit?: YtCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YtCredentialInclude<ExtArgs> | null
    /**
     * The filter to search for the YtCredential to update in case it exists.
     */
    where: YtCredentialWhereUniqueInput
    /**
     * In case the YtCredential found by the `where` argument doesn't exist, create a new YtCredential with this data.
     */
    create: XOR<YtCredentialCreateInput, YtCredentialUncheckedCreateInput>
    /**
     * In case the YtCredential was found with the provided `where` argument, update it with this data.
     */
    update: XOR<YtCredentialUpdateInput, YtCredentialUncheckedUpdateInput>
  }

  /**
   * YtCredential delete
   */
  export type YtCredentialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YtCredential
     */
    select?: YtCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YtCredential
     */
    omit?: YtCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YtCredentialInclude<ExtArgs> | null
    /**
     * Filter which YtCredential to delete.
     */
    where: YtCredentialWhereUniqueInput
  }

  /**
   * YtCredential deleteMany
   */
  export type YtCredentialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which YtCredentials to delete
     */
    where?: YtCredentialWhereInput
    /**
     * Limit how many YtCredentials to delete.
     */
    limit?: number
  }

  /**
   * YtCredential without action
   */
  export type YtCredentialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the YtCredential
     */
    select?: YtCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the YtCredential
     */
    omit?: YtCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: YtCredentialInclude<ExtArgs> | null
  }


  /**
   * Model CommentLike
   */

  export type AggregateCommentLike = {
    _count: CommentLikeCountAggregateOutputType | null
    _min: CommentLikeMinAggregateOutputType | null
    _max: CommentLikeMaxAggregateOutputType | null
  }

  export type CommentLikeMinAggregateOutputType = {
    id: string | null
    commentId: string | null
    videoId: string | null
    userId: string | null
    type: string | null
    createdAt: Date | null
  }

  export type CommentLikeMaxAggregateOutputType = {
    id: string | null
    commentId: string | null
    videoId: string | null
    userId: string | null
    type: string | null
    createdAt: Date | null
  }

  export type CommentLikeCountAggregateOutputType = {
    id: number
    commentId: number
    videoId: number
    userId: number
    type: number
    createdAt: number
    _all: number
  }


  export type CommentLikeMinAggregateInputType = {
    id?: true
    commentId?: true
    videoId?: true
    userId?: true
    type?: true
    createdAt?: true
  }

  export type CommentLikeMaxAggregateInputType = {
    id?: true
    commentId?: true
    videoId?: true
    userId?: true
    type?: true
    createdAt?: true
  }

  export type CommentLikeCountAggregateInputType = {
    id?: true
    commentId?: true
    videoId?: true
    userId?: true
    type?: true
    createdAt?: true
    _all?: true
  }

  export type CommentLikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommentLike to aggregate.
     */
    where?: CommentLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentLikes to fetch.
     */
    orderBy?: CommentLikeOrderByWithRelationInput | CommentLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CommentLikes
    **/
    _count?: true | CommentLikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentLikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentLikeMaxAggregateInputType
  }

  export type GetCommentLikeAggregateType<T extends CommentLikeAggregateArgs> = {
        [P in keyof T & keyof AggregateCommentLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommentLike[P]>
      : GetScalarType<T[P], AggregateCommentLike[P]>
  }




  export type CommentLikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentLikeWhereInput
    orderBy?: CommentLikeOrderByWithAggregationInput | CommentLikeOrderByWithAggregationInput[]
    by: CommentLikeScalarFieldEnum[] | CommentLikeScalarFieldEnum
    having?: CommentLikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentLikeCountAggregateInputType | true
    _min?: CommentLikeMinAggregateInputType
    _max?: CommentLikeMaxAggregateInputType
  }

  export type CommentLikeGroupByOutputType = {
    id: string
    commentId: string
    videoId: string
    userId: string
    type: string
    createdAt: Date
    _count: CommentLikeCountAggregateOutputType | null
    _min: CommentLikeMinAggregateOutputType | null
    _max: CommentLikeMaxAggregateOutputType | null
  }

  type GetCommentLikeGroupByPayload<T extends CommentLikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentLikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentLikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentLikeGroupByOutputType[P]>
            : GetScalarType<T[P], CommentLikeGroupByOutputType[P]>
        }
      >
    >


  export type CommentLikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commentId?: boolean
    videoId?: boolean
    userId?: boolean
    type?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commentLike"]>

  export type CommentLikeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commentId?: boolean
    videoId?: boolean
    userId?: boolean
    type?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commentLike"]>

  export type CommentLikeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commentId?: boolean
    videoId?: boolean
    userId?: boolean
    type?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commentLike"]>

  export type CommentLikeSelectScalar = {
    id?: boolean
    commentId?: boolean
    videoId?: boolean
    userId?: boolean
    type?: boolean
    createdAt?: boolean
  }

  export type CommentLikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "commentId" | "videoId" | "userId" | "type" | "createdAt", ExtArgs["result"]["commentLike"]>
  export type CommentLikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CommentLikeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CommentLikeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CommentLikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CommentLike"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      commentId: string
      videoId: string
      userId: string
      type: string
      createdAt: Date
    }, ExtArgs["result"]["commentLike"]>
    composites: {}
  }

  type CommentLikeGetPayload<S extends boolean | null | undefined | CommentLikeDefaultArgs> = $Result.GetResult<Prisma.$CommentLikePayload, S>

  type CommentLikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentLikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentLikeCountAggregateInputType | true
    }

  export interface CommentLikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CommentLike'], meta: { name: 'CommentLike' } }
    /**
     * Find zero or one CommentLike that matches the filter.
     * @param {CommentLikeFindUniqueArgs} args - Arguments to find a CommentLike
     * @example
     * // Get one CommentLike
     * const commentLike = await prisma.commentLike.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentLikeFindUniqueArgs>(args: SelectSubset<T, CommentLikeFindUniqueArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CommentLike that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentLikeFindUniqueOrThrowArgs} args - Arguments to find a CommentLike
     * @example
     * // Get one CommentLike
     * const commentLike = await prisma.commentLike.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentLikeFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentLikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CommentLike that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeFindFirstArgs} args - Arguments to find a CommentLike
     * @example
     * // Get one CommentLike
     * const commentLike = await prisma.commentLike.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentLikeFindFirstArgs>(args?: SelectSubset<T, CommentLikeFindFirstArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CommentLike that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeFindFirstOrThrowArgs} args - Arguments to find a CommentLike
     * @example
     * // Get one CommentLike
     * const commentLike = await prisma.commentLike.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentLikeFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentLikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CommentLikes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CommentLikes
     * const commentLikes = await prisma.commentLike.findMany()
     * 
     * // Get first 10 CommentLikes
     * const commentLikes = await prisma.commentLike.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentLikeWithIdOnly = await prisma.commentLike.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentLikeFindManyArgs>(args?: SelectSubset<T, CommentLikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CommentLike.
     * @param {CommentLikeCreateArgs} args - Arguments to create a CommentLike.
     * @example
     * // Create one CommentLike
     * const CommentLike = await prisma.commentLike.create({
     *   data: {
     *     // ... data to create a CommentLike
     *   }
     * })
     * 
     */
    create<T extends CommentLikeCreateArgs>(args: SelectSubset<T, CommentLikeCreateArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CommentLikes.
     * @param {CommentLikeCreateManyArgs} args - Arguments to create many CommentLikes.
     * @example
     * // Create many CommentLikes
     * const commentLike = await prisma.commentLike.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentLikeCreateManyArgs>(args?: SelectSubset<T, CommentLikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CommentLikes and returns the data saved in the database.
     * @param {CommentLikeCreateManyAndReturnArgs} args - Arguments to create many CommentLikes.
     * @example
     * // Create many CommentLikes
     * const commentLike = await prisma.commentLike.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CommentLikes and only return the `id`
     * const commentLikeWithIdOnly = await prisma.commentLike.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentLikeCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentLikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CommentLike.
     * @param {CommentLikeDeleteArgs} args - Arguments to delete one CommentLike.
     * @example
     * // Delete one CommentLike
     * const CommentLike = await prisma.commentLike.delete({
     *   where: {
     *     // ... filter to delete one CommentLike
     *   }
     * })
     * 
     */
    delete<T extends CommentLikeDeleteArgs>(args: SelectSubset<T, CommentLikeDeleteArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CommentLike.
     * @param {CommentLikeUpdateArgs} args - Arguments to update one CommentLike.
     * @example
     * // Update one CommentLike
     * const commentLike = await prisma.commentLike.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentLikeUpdateArgs>(args: SelectSubset<T, CommentLikeUpdateArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CommentLikes.
     * @param {CommentLikeDeleteManyArgs} args - Arguments to filter CommentLikes to delete.
     * @example
     * // Delete a few CommentLikes
     * const { count } = await prisma.commentLike.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentLikeDeleteManyArgs>(args?: SelectSubset<T, CommentLikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommentLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CommentLikes
     * const commentLike = await prisma.commentLike.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentLikeUpdateManyArgs>(args: SelectSubset<T, CommentLikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommentLikes and returns the data updated in the database.
     * @param {CommentLikeUpdateManyAndReturnArgs} args - Arguments to update many CommentLikes.
     * @example
     * // Update many CommentLikes
     * const commentLike = await prisma.commentLike.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CommentLikes and only return the `id`
     * const commentLikeWithIdOnly = await prisma.commentLike.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommentLikeUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentLikeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CommentLike.
     * @param {CommentLikeUpsertArgs} args - Arguments to update or create a CommentLike.
     * @example
     * // Update or create a CommentLike
     * const commentLike = await prisma.commentLike.upsert({
     *   create: {
     *     // ... data to create a CommentLike
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CommentLike we want to update
     *   }
     * })
     */
    upsert<T extends CommentLikeUpsertArgs>(args: SelectSubset<T, CommentLikeUpsertArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CommentLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeCountArgs} args - Arguments to filter CommentLikes to count.
     * @example
     * // Count the number of CommentLikes
     * const count = await prisma.commentLike.count({
     *   where: {
     *     // ... the filter for the CommentLikes we want to count
     *   }
     * })
    **/
    count<T extends CommentLikeCountArgs>(
      args?: Subset<T, CommentLikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentLikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CommentLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CommentLikeAggregateArgs>(args: Subset<T, CommentLikeAggregateArgs>): Prisma.PrismaPromise<GetCommentLikeAggregateType<T>>

    /**
     * Group by CommentLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeGroupByArgs} args - Group by arguments.
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
      T extends CommentLikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentLikeGroupByArgs['orderBy'] }
        : { orderBy?: CommentLikeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, CommentLikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CommentLike model
   */
  readonly fields: CommentLikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CommentLike.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentLikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CommentLike model
   */
  interface CommentLikeFieldRefs {
    readonly id: FieldRef<"CommentLike", 'String'>
    readonly commentId: FieldRef<"CommentLike", 'String'>
    readonly videoId: FieldRef<"CommentLike", 'String'>
    readonly userId: FieldRef<"CommentLike", 'String'>
    readonly type: FieldRef<"CommentLike", 'String'>
    readonly createdAt: FieldRef<"CommentLike", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CommentLike findUnique
   */
  export type CommentLikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * Filter, which CommentLike to fetch.
     */
    where: CommentLikeWhereUniqueInput
  }

  /**
   * CommentLike findUniqueOrThrow
   */
  export type CommentLikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * Filter, which CommentLike to fetch.
     */
    where: CommentLikeWhereUniqueInput
  }

  /**
   * CommentLike findFirst
   */
  export type CommentLikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * Filter, which CommentLike to fetch.
     */
    where?: CommentLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentLikes to fetch.
     */
    orderBy?: CommentLikeOrderByWithRelationInput | CommentLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommentLikes.
     */
    cursor?: CommentLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommentLikes.
     */
    distinct?: CommentLikeScalarFieldEnum | CommentLikeScalarFieldEnum[]
  }

  /**
   * CommentLike findFirstOrThrow
   */
  export type CommentLikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * Filter, which CommentLike to fetch.
     */
    where?: CommentLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentLikes to fetch.
     */
    orderBy?: CommentLikeOrderByWithRelationInput | CommentLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommentLikes.
     */
    cursor?: CommentLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommentLikes.
     */
    distinct?: CommentLikeScalarFieldEnum | CommentLikeScalarFieldEnum[]
  }

  /**
   * CommentLike findMany
   */
  export type CommentLikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * Filter, which CommentLikes to fetch.
     */
    where?: CommentLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentLikes to fetch.
     */
    orderBy?: CommentLikeOrderByWithRelationInput | CommentLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CommentLikes.
     */
    cursor?: CommentLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentLikes.
     */
    skip?: number
    distinct?: CommentLikeScalarFieldEnum | CommentLikeScalarFieldEnum[]
  }

  /**
   * CommentLike create
   */
  export type CommentLikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * The data needed to create a CommentLike.
     */
    data: XOR<CommentLikeCreateInput, CommentLikeUncheckedCreateInput>
  }

  /**
   * CommentLike createMany
   */
  export type CommentLikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CommentLikes.
     */
    data: CommentLikeCreateManyInput | CommentLikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CommentLike createManyAndReturn
   */
  export type CommentLikeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * The data used to create many CommentLikes.
     */
    data: CommentLikeCreateManyInput | CommentLikeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CommentLike update
   */
  export type CommentLikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * The data needed to update a CommentLike.
     */
    data: XOR<CommentLikeUpdateInput, CommentLikeUncheckedUpdateInput>
    /**
     * Choose, which CommentLike to update.
     */
    where: CommentLikeWhereUniqueInput
  }

  /**
   * CommentLike updateMany
   */
  export type CommentLikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CommentLikes.
     */
    data: XOR<CommentLikeUpdateManyMutationInput, CommentLikeUncheckedUpdateManyInput>
    /**
     * Filter which CommentLikes to update
     */
    where?: CommentLikeWhereInput
    /**
     * Limit how many CommentLikes to update.
     */
    limit?: number
  }

  /**
   * CommentLike updateManyAndReturn
   */
  export type CommentLikeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * The data used to update CommentLikes.
     */
    data: XOR<CommentLikeUpdateManyMutationInput, CommentLikeUncheckedUpdateManyInput>
    /**
     * Filter which CommentLikes to update
     */
    where?: CommentLikeWhereInput
    /**
     * Limit how many CommentLikes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CommentLike upsert
   */
  export type CommentLikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * The filter to search for the CommentLike to update in case it exists.
     */
    where: CommentLikeWhereUniqueInput
    /**
     * In case the CommentLike found by the `where` argument doesn't exist, create a new CommentLike with this data.
     */
    create: XOR<CommentLikeCreateInput, CommentLikeUncheckedCreateInput>
    /**
     * In case the CommentLike was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentLikeUpdateInput, CommentLikeUncheckedUpdateInput>
  }

  /**
   * CommentLike delete
   */
  export type CommentLikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * Filter which CommentLike to delete.
     */
    where: CommentLikeWhereUniqueInput
  }

  /**
   * CommentLike deleteMany
   */
  export type CommentLikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommentLikes to delete
     */
    where?: CommentLikeWhereInput
    /**
     * Limit how many CommentLikes to delete.
     */
    limit?: number
  }

  /**
   * CommentLike without action
   */
  export type CommentLikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentLike
     */
    omit?: CommentLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
  }


  /**
   * Model UserAction
   */

  export type AggregateUserAction = {
    _count: UserActionCountAggregateOutputType | null
    _min: UserActionMinAggregateOutputType | null
    _max: UserActionMaxAggregateOutputType | null
  }

  export type UserActionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    videoId: string | null
    commentId: string | null
    actionType: string | null
    content: string | null
    createdAt: Date | null
  }

  export type UserActionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    videoId: string | null
    commentId: string | null
    actionType: string | null
    content: string | null
    createdAt: Date | null
  }

  export type UserActionCountAggregateOutputType = {
    id: number
    userId: number
    videoId: number
    commentId: number
    actionType: number
    content: number
    createdAt: number
    _all: number
  }


  export type UserActionMinAggregateInputType = {
    id?: true
    userId?: true
    videoId?: true
    commentId?: true
    actionType?: true
    content?: true
    createdAt?: true
  }

  export type UserActionMaxAggregateInputType = {
    id?: true
    userId?: true
    videoId?: true
    commentId?: true
    actionType?: true
    content?: true
    createdAt?: true
  }

  export type UserActionCountAggregateInputType = {
    id?: true
    userId?: true
    videoId?: true
    commentId?: true
    actionType?: true
    content?: true
    createdAt?: true
    _all?: true
  }

  export type UserActionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAction to aggregate.
     */
    where?: UserActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserActions to fetch.
     */
    orderBy?: UserActionOrderByWithRelationInput | UserActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserActions
    **/
    _count?: true | UserActionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserActionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserActionMaxAggregateInputType
  }

  export type GetUserActionAggregateType<T extends UserActionAggregateArgs> = {
        [P in keyof T & keyof AggregateUserAction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserAction[P]>
      : GetScalarType<T[P], AggregateUserAction[P]>
  }




  export type UserActionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserActionWhereInput
    orderBy?: UserActionOrderByWithAggregationInput | UserActionOrderByWithAggregationInput[]
    by: UserActionScalarFieldEnum[] | UserActionScalarFieldEnum
    having?: UserActionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserActionCountAggregateInputType | true
    _min?: UserActionMinAggregateInputType
    _max?: UserActionMaxAggregateInputType
  }

  export type UserActionGroupByOutputType = {
    id: string
    userId: string
    videoId: string
    commentId: string
    actionType: string
    content: string | null
    createdAt: Date
    _count: UserActionCountAggregateOutputType | null
    _min: UserActionMinAggregateOutputType | null
    _max: UserActionMaxAggregateOutputType | null
  }

  type GetUserActionGroupByPayload<T extends UserActionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserActionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserActionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserActionGroupByOutputType[P]>
            : GetScalarType<T[P], UserActionGroupByOutputType[P]>
        }
      >
    >


  export type UserActionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    videoId?: boolean
    commentId?: boolean
    actionType?: boolean
    content?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAction"]>

  export type UserActionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    videoId?: boolean
    commentId?: boolean
    actionType?: boolean
    content?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAction"]>

  export type UserActionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    videoId?: boolean
    commentId?: boolean
    actionType?: boolean
    content?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAction"]>

  export type UserActionSelectScalar = {
    id?: boolean
    userId?: boolean
    videoId?: boolean
    commentId?: boolean
    actionType?: boolean
    content?: boolean
    createdAt?: boolean
  }

  export type UserActionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "videoId" | "commentId" | "actionType" | "content" | "createdAt", ExtArgs["result"]["userAction"]>
  export type UserActionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserActionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserActionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserActionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserAction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      videoId: string
      commentId: string
      actionType: string
      content: string | null
      createdAt: Date
    }, ExtArgs["result"]["userAction"]>
    composites: {}
  }

  type UserActionGetPayload<S extends boolean | null | undefined | UserActionDefaultArgs> = $Result.GetResult<Prisma.$UserActionPayload, S>

  type UserActionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserActionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserActionCountAggregateInputType | true
    }

  export interface UserActionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserAction'], meta: { name: 'UserAction' } }
    /**
     * Find zero or one UserAction that matches the filter.
     * @param {UserActionFindUniqueArgs} args - Arguments to find a UserAction
     * @example
     * // Get one UserAction
     * const userAction = await prisma.userAction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserActionFindUniqueArgs>(args: SelectSubset<T, UserActionFindUniqueArgs<ExtArgs>>): Prisma__UserActionClient<$Result.GetResult<Prisma.$UserActionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserAction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserActionFindUniqueOrThrowArgs} args - Arguments to find a UserAction
     * @example
     * // Get one UserAction
     * const userAction = await prisma.userAction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserActionFindUniqueOrThrowArgs>(args: SelectSubset<T, UserActionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserActionClient<$Result.GetResult<Prisma.$UserActionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserAction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserActionFindFirstArgs} args - Arguments to find a UserAction
     * @example
     * // Get one UserAction
     * const userAction = await prisma.userAction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserActionFindFirstArgs>(args?: SelectSubset<T, UserActionFindFirstArgs<ExtArgs>>): Prisma__UserActionClient<$Result.GetResult<Prisma.$UserActionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserAction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserActionFindFirstOrThrowArgs} args - Arguments to find a UserAction
     * @example
     * // Get one UserAction
     * const userAction = await prisma.userAction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserActionFindFirstOrThrowArgs>(args?: SelectSubset<T, UserActionFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserActionClient<$Result.GetResult<Prisma.$UserActionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserActions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserActionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserActions
     * const userActions = await prisma.userAction.findMany()
     * 
     * // Get first 10 UserActions
     * const userActions = await prisma.userAction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userActionWithIdOnly = await prisma.userAction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserActionFindManyArgs>(args?: SelectSubset<T, UserActionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserAction.
     * @param {UserActionCreateArgs} args - Arguments to create a UserAction.
     * @example
     * // Create one UserAction
     * const UserAction = await prisma.userAction.create({
     *   data: {
     *     // ... data to create a UserAction
     *   }
     * })
     * 
     */
    create<T extends UserActionCreateArgs>(args: SelectSubset<T, UserActionCreateArgs<ExtArgs>>): Prisma__UserActionClient<$Result.GetResult<Prisma.$UserActionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserActions.
     * @param {UserActionCreateManyArgs} args - Arguments to create many UserActions.
     * @example
     * // Create many UserActions
     * const userAction = await prisma.userAction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserActionCreateManyArgs>(args?: SelectSubset<T, UserActionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserActions and returns the data saved in the database.
     * @param {UserActionCreateManyAndReturnArgs} args - Arguments to create many UserActions.
     * @example
     * // Create many UserActions
     * const userAction = await prisma.userAction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserActions and only return the `id`
     * const userActionWithIdOnly = await prisma.userAction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserActionCreateManyAndReturnArgs>(args?: SelectSubset<T, UserActionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserActionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserAction.
     * @param {UserActionDeleteArgs} args - Arguments to delete one UserAction.
     * @example
     * // Delete one UserAction
     * const UserAction = await prisma.userAction.delete({
     *   where: {
     *     // ... filter to delete one UserAction
     *   }
     * })
     * 
     */
    delete<T extends UserActionDeleteArgs>(args: SelectSubset<T, UserActionDeleteArgs<ExtArgs>>): Prisma__UserActionClient<$Result.GetResult<Prisma.$UserActionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserAction.
     * @param {UserActionUpdateArgs} args - Arguments to update one UserAction.
     * @example
     * // Update one UserAction
     * const userAction = await prisma.userAction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserActionUpdateArgs>(args: SelectSubset<T, UserActionUpdateArgs<ExtArgs>>): Prisma__UserActionClient<$Result.GetResult<Prisma.$UserActionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserActions.
     * @param {UserActionDeleteManyArgs} args - Arguments to filter UserActions to delete.
     * @example
     * // Delete a few UserActions
     * const { count } = await prisma.userAction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserActionDeleteManyArgs>(args?: SelectSubset<T, UserActionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserActionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserActions
     * const userAction = await prisma.userAction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserActionUpdateManyArgs>(args: SelectSubset<T, UserActionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserActions and returns the data updated in the database.
     * @param {UserActionUpdateManyAndReturnArgs} args - Arguments to update many UserActions.
     * @example
     * // Update many UserActions
     * const userAction = await prisma.userAction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserActions and only return the `id`
     * const userActionWithIdOnly = await prisma.userAction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserActionUpdateManyAndReturnArgs>(args: SelectSubset<T, UserActionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserActionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserAction.
     * @param {UserActionUpsertArgs} args - Arguments to update or create a UserAction.
     * @example
     * // Update or create a UserAction
     * const userAction = await prisma.userAction.upsert({
     *   create: {
     *     // ... data to create a UserAction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserAction we want to update
     *   }
     * })
     */
    upsert<T extends UserActionUpsertArgs>(args: SelectSubset<T, UserActionUpsertArgs<ExtArgs>>): Prisma__UserActionClient<$Result.GetResult<Prisma.$UserActionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserActionCountArgs} args - Arguments to filter UserActions to count.
     * @example
     * // Count the number of UserActions
     * const count = await prisma.userAction.count({
     *   where: {
     *     // ... the filter for the UserActions we want to count
     *   }
     * })
    **/
    count<T extends UserActionCountArgs>(
      args?: Subset<T, UserActionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserActionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserActionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserActionAggregateArgs>(args: Subset<T, UserActionAggregateArgs>): Prisma.PrismaPromise<GetUserActionAggregateType<T>>

    /**
     * Group by UserAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserActionGroupByArgs} args - Group by arguments.
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
      T extends UserActionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserActionGroupByArgs['orderBy'] }
        : { orderBy?: UserActionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, UserActionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserActionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserAction model
   */
  readonly fields: UserActionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserAction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserActionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserAction model
   */
  interface UserActionFieldRefs {
    readonly id: FieldRef<"UserAction", 'String'>
    readonly userId: FieldRef<"UserAction", 'String'>
    readonly videoId: FieldRef<"UserAction", 'String'>
    readonly commentId: FieldRef<"UserAction", 'String'>
    readonly actionType: FieldRef<"UserAction", 'String'>
    readonly content: FieldRef<"UserAction", 'String'>
    readonly createdAt: FieldRef<"UserAction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserAction findUnique
   */
  export type UserActionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAction
     */
    select?: UserActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAction
     */
    omit?: UserActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserActionInclude<ExtArgs> | null
    /**
     * Filter, which UserAction to fetch.
     */
    where: UserActionWhereUniqueInput
  }

  /**
   * UserAction findUniqueOrThrow
   */
  export type UserActionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAction
     */
    select?: UserActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAction
     */
    omit?: UserActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserActionInclude<ExtArgs> | null
    /**
     * Filter, which UserAction to fetch.
     */
    where: UserActionWhereUniqueInput
  }

  /**
   * UserAction findFirst
   */
  export type UserActionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAction
     */
    select?: UserActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAction
     */
    omit?: UserActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserActionInclude<ExtArgs> | null
    /**
     * Filter, which UserAction to fetch.
     */
    where?: UserActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserActions to fetch.
     */
    orderBy?: UserActionOrderByWithRelationInput | UserActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserActions.
     */
    cursor?: UserActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserActions.
     */
    distinct?: UserActionScalarFieldEnum | UserActionScalarFieldEnum[]
  }

  /**
   * UserAction findFirstOrThrow
   */
  export type UserActionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAction
     */
    select?: UserActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAction
     */
    omit?: UserActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserActionInclude<ExtArgs> | null
    /**
     * Filter, which UserAction to fetch.
     */
    where?: UserActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserActions to fetch.
     */
    orderBy?: UserActionOrderByWithRelationInput | UserActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserActions.
     */
    cursor?: UserActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserActions.
     */
    distinct?: UserActionScalarFieldEnum | UserActionScalarFieldEnum[]
  }

  /**
   * UserAction findMany
   */
  export type UserActionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAction
     */
    select?: UserActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAction
     */
    omit?: UserActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserActionInclude<ExtArgs> | null
    /**
     * Filter, which UserActions to fetch.
     */
    where?: UserActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserActions to fetch.
     */
    orderBy?: UserActionOrderByWithRelationInput | UserActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserActions.
     */
    cursor?: UserActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserActions.
     */
    skip?: number
    distinct?: UserActionScalarFieldEnum | UserActionScalarFieldEnum[]
  }

  /**
   * UserAction create
   */
  export type UserActionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAction
     */
    select?: UserActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAction
     */
    omit?: UserActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserActionInclude<ExtArgs> | null
    /**
     * The data needed to create a UserAction.
     */
    data: XOR<UserActionCreateInput, UserActionUncheckedCreateInput>
  }

  /**
   * UserAction createMany
   */
  export type UserActionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserActions.
     */
    data: UserActionCreateManyInput | UserActionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserAction createManyAndReturn
   */
  export type UserActionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAction
     */
    select?: UserActionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserAction
     */
    omit?: UserActionOmit<ExtArgs> | null
    /**
     * The data used to create many UserActions.
     */
    data: UserActionCreateManyInput | UserActionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserActionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserAction update
   */
  export type UserActionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAction
     */
    select?: UserActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAction
     */
    omit?: UserActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserActionInclude<ExtArgs> | null
    /**
     * The data needed to update a UserAction.
     */
    data: XOR<UserActionUpdateInput, UserActionUncheckedUpdateInput>
    /**
     * Choose, which UserAction to update.
     */
    where: UserActionWhereUniqueInput
  }

  /**
   * UserAction updateMany
   */
  export type UserActionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserActions.
     */
    data: XOR<UserActionUpdateManyMutationInput, UserActionUncheckedUpdateManyInput>
    /**
     * Filter which UserActions to update
     */
    where?: UserActionWhereInput
    /**
     * Limit how many UserActions to update.
     */
    limit?: number
  }

  /**
   * UserAction updateManyAndReturn
   */
  export type UserActionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAction
     */
    select?: UserActionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserAction
     */
    omit?: UserActionOmit<ExtArgs> | null
    /**
     * The data used to update UserActions.
     */
    data: XOR<UserActionUpdateManyMutationInput, UserActionUncheckedUpdateManyInput>
    /**
     * Filter which UserActions to update
     */
    where?: UserActionWhereInput
    /**
     * Limit how many UserActions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserActionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserAction upsert
   */
  export type UserActionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAction
     */
    select?: UserActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAction
     */
    omit?: UserActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserActionInclude<ExtArgs> | null
    /**
     * The filter to search for the UserAction to update in case it exists.
     */
    where: UserActionWhereUniqueInput
    /**
     * In case the UserAction found by the `where` argument doesn't exist, create a new UserAction with this data.
     */
    create: XOR<UserActionCreateInput, UserActionUncheckedCreateInput>
    /**
     * In case the UserAction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserActionUpdateInput, UserActionUncheckedUpdateInput>
  }

  /**
   * UserAction delete
   */
  export type UserActionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAction
     */
    select?: UserActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAction
     */
    omit?: UserActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserActionInclude<ExtArgs> | null
    /**
     * Filter which UserAction to delete.
     */
    where: UserActionWhereUniqueInput
  }

  /**
   * UserAction deleteMany
   */
  export type UserActionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserActions to delete
     */
    where?: UserActionWhereInput
    /**
     * Limit how many UserActions to delete.
     */
    limit?: number
  }

  /**
   * UserAction without action
   */
  export type UserActionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAction
     */
    select?: UserActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAction
     */
    omit?: UserActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserActionInclude<ExtArgs> | null
  }


  /**
   * Model CommentCache
   */

  export type AggregateCommentCache = {
    _count: CommentCacheCountAggregateOutputType | null
    _avg: CommentCacheAvgAggregateOutputType | null
    _sum: CommentCacheSumAggregateOutputType | null
    _min: CommentCacheMinAggregateOutputType | null
    _max: CommentCacheMaxAggregateOutputType | null
  }

  export type CommentCacheAvgAggregateOutputType = {
    likeCount: number | null
    replyCount: number | null
  }

  export type CommentCacheSumAggregateOutputType = {
    likeCount: number | null
    replyCount: number | null
  }

  export type CommentCacheMinAggregateOutputType = {
    id: string | null
    commentId: string | null
    videoId: string | null
    authorName: string | null
    authorChannelId: string | null
    authorThumb: string | null
    content: string | null
    likeCount: number | null
    replyCount: number | null
    parentCommentId: string | null
    publishedAt: Date | null
    updatedAt: Date | null
  }

  export type CommentCacheMaxAggregateOutputType = {
    id: string | null
    commentId: string | null
    videoId: string | null
    authorName: string | null
    authorChannelId: string | null
    authorThumb: string | null
    content: string | null
    likeCount: number | null
    replyCount: number | null
    parentCommentId: string | null
    publishedAt: Date | null
    updatedAt: Date | null
  }

  export type CommentCacheCountAggregateOutputType = {
    id: number
    commentId: number
    videoId: number
    authorName: number
    authorChannelId: number
    authorThumb: number
    content: number
    likeCount: number
    replyCount: number
    parentCommentId: number
    publishedAt: number
    updatedAt: number
    _all: number
  }


  export type CommentCacheAvgAggregateInputType = {
    likeCount?: true
    replyCount?: true
  }

  export type CommentCacheSumAggregateInputType = {
    likeCount?: true
    replyCount?: true
  }

  export type CommentCacheMinAggregateInputType = {
    id?: true
    commentId?: true
    videoId?: true
    authorName?: true
    authorChannelId?: true
    authorThumb?: true
    content?: true
    likeCount?: true
    replyCount?: true
    parentCommentId?: true
    publishedAt?: true
    updatedAt?: true
  }

  export type CommentCacheMaxAggregateInputType = {
    id?: true
    commentId?: true
    videoId?: true
    authorName?: true
    authorChannelId?: true
    authorThumb?: true
    content?: true
    likeCount?: true
    replyCount?: true
    parentCommentId?: true
    publishedAt?: true
    updatedAt?: true
  }

  export type CommentCacheCountAggregateInputType = {
    id?: true
    commentId?: true
    videoId?: true
    authorName?: true
    authorChannelId?: true
    authorThumb?: true
    content?: true
    likeCount?: true
    replyCount?: true
    parentCommentId?: true
    publishedAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CommentCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommentCache to aggregate.
     */
    where?: CommentCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentCaches to fetch.
     */
    orderBy?: CommentCacheOrderByWithRelationInput | CommentCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CommentCaches
    **/
    _count?: true | CommentCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentCacheAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentCacheSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentCacheMaxAggregateInputType
  }

  export type GetCommentCacheAggregateType<T extends CommentCacheAggregateArgs> = {
        [P in keyof T & keyof AggregateCommentCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommentCache[P]>
      : GetScalarType<T[P], AggregateCommentCache[P]>
  }




  export type CommentCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentCacheWhereInput
    orderBy?: CommentCacheOrderByWithAggregationInput | CommentCacheOrderByWithAggregationInput[]
    by: CommentCacheScalarFieldEnum[] | CommentCacheScalarFieldEnum
    having?: CommentCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCacheCountAggregateInputType | true
    _avg?: CommentCacheAvgAggregateInputType
    _sum?: CommentCacheSumAggregateInputType
    _min?: CommentCacheMinAggregateInputType
    _max?: CommentCacheMaxAggregateInputType
  }

  export type CommentCacheGroupByOutputType = {
    id: string
    commentId: string
    videoId: string
    authorName: string
    authorChannelId: string | null
    authorThumb: string | null
    content: string
    likeCount: number
    replyCount: number
    parentCommentId: string | null
    publishedAt: Date
    updatedAt: Date
    _count: CommentCacheCountAggregateOutputType | null
    _avg: CommentCacheAvgAggregateOutputType | null
    _sum: CommentCacheSumAggregateOutputType | null
    _min: CommentCacheMinAggregateOutputType | null
    _max: CommentCacheMaxAggregateOutputType | null
  }

  type GetCommentCacheGroupByPayload<T extends CommentCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentCacheGroupByOutputType[P]>
            : GetScalarType<T[P], CommentCacheGroupByOutputType[P]>
        }
      >
    >


  export type CommentCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commentId?: boolean
    videoId?: boolean
    authorName?: boolean
    authorChannelId?: boolean
    authorThumb?: boolean
    content?: boolean
    likeCount?: boolean
    replyCount?: boolean
    parentCommentId?: boolean
    publishedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["commentCache"]>

  export type CommentCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commentId?: boolean
    videoId?: boolean
    authorName?: boolean
    authorChannelId?: boolean
    authorThumb?: boolean
    content?: boolean
    likeCount?: boolean
    replyCount?: boolean
    parentCommentId?: boolean
    publishedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["commentCache"]>

  export type CommentCacheSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    commentId?: boolean
    videoId?: boolean
    authorName?: boolean
    authorChannelId?: boolean
    authorThumb?: boolean
    content?: boolean
    likeCount?: boolean
    replyCount?: boolean
    parentCommentId?: boolean
    publishedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["commentCache"]>

  export type CommentCacheSelectScalar = {
    id?: boolean
    commentId?: boolean
    videoId?: boolean
    authorName?: boolean
    authorChannelId?: boolean
    authorThumb?: boolean
    content?: boolean
    likeCount?: boolean
    replyCount?: boolean
    parentCommentId?: boolean
    publishedAt?: boolean
    updatedAt?: boolean
  }

  export type CommentCacheOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "commentId" | "videoId" | "authorName" | "authorChannelId" | "authorThumb" | "content" | "likeCount" | "replyCount" | "parentCommentId" | "publishedAt" | "updatedAt", ExtArgs["result"]["commentCache"]>

  export type $CommentCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CommentCache"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      commentId: string
      videoId: string
      authorName: string
      authorChannelId: string | null
      authorThumb: string | null
      content: string
      likeCount: number
      replyCount: number
      parentCommentId: string | null
      publishedAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["commentCache"]>
    composites: {}
  }

  type CommentCacheGetPayload<S extends boolean | null | undefined | CommentCacheDefaultArgs> = $Result.GetResult<Prisma.$CommentCachePayload, S>

  type CommentCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentCacheFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentCacheCountAggregateInputType | true
    }

  export interface CommentCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CommentCache'], meta: { name: 'CommentCache' } }
    /**
     * Find zero or one CommentCache that matches the filter.
     * @param {CommentCacheFindUniqueArgs} args - Arguments to find a CommentCache
     * @example
     * // Get one CommentCache
     * const commentCache = await prisma.commentCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentCacheFindUniqueArgs>(args: SelectSubset<T, CommentCacheFindUniqueArgs<ExtArgs>>): Prisma__CommentCacheClient<$Result.GetResult<Prisma.$CommentCachePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CommentCache that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentCacheFindUniqueOrThrowArgs} args - Arguments to find a CommentCache
     * @example
     * // Get one CommentCache
     * const commentCache = await prisma.commentCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentCacheClient<$Result.GetResult<Prisma.$CommentCachePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CommentCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCacheFindFirstArgs} args - Arguments to find a CommentCache
     * @example
     * // Get one CommentCache
     * const commentCache = await prisma.commentCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentCacheFindFirstArgs>(args?: SelectSubset<T, CommentCacheFindFirstArgs<ExtArgs>>): Prisma__CommentCacheClient<$Result.GetResult<Prisma.$CommentCachePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CommentCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCacheFindFirstOrThrowArgs} args - Arguments to find a CommentCache
     * @example
     * // Get one CommentCache
     * const commentCache = await prisma.commentCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentCacheClient<$Result.GetResult<Prisma.$CommentCachePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CommentCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CommentCaches
     * const commentCaches = await prisma.commentCache.findMany()
     * 
     * // Get first 10 CommentCaches
     * const commentCaches = await prisma.commentCache.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentCacheWithIdOnly = await prisma.commentCache.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentCacheFindManyArgs>(args?: SelectSubset<T, CommentCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CommentCache.
     * @param {CommentCacheCreateArgs} args - Arguments to create a CommentCache.
     * @example
     * // Create one CommentCache
     * const CommentCache = await prisma.commentCache.create({
     *   data: {
     *     // ... data to create a CommentCache
     *   }
     * })
     * 
     */
    create<T extends CommentCacheCreateArgs>(args: SelectSubset<T, CommentCacheCreateArgs<ExtArgs>>): Prisma__CommentCacheClient<$Result.GetResult<Prisma.$CommentCachePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CommentCaches.
     * @param {CommentCacheCreateManyArgs} args - Arguments to create many CommentCaches.
     * @example
     * // Create many CommentCaches
     * const commentCache = await prisma.commentCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCacheCreateManyArgs>(args?: SelectSubset<T, CommentCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CommentCaches and returns the data saved in the database.
     * @param {CommentCacheCreateManyAndReturnArgs} args - Arguments to create many CommentCaches.
     * @example
     * // Create many CommentCaches
     * const commentCache = await prisma.commentCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CommentCaches and only return the `id`
     * const commentCacheWithIdOnly = await prisma.commentCache.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentCachePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CommentCache.
     * @param {CommentCacheDeleteArgs} args - Arguments to delete one CommentCache.
     * @example
     * // Delete one CommentCache
     * const CommentCache = await prisma.commentCache.delete({
     *   where: {
     *     // ... filter to delete one CommentCache
     *   }
     * })
     * 
     */
    delete<T extends CommentCacheDeleteArgs>(args: SelectSubset<T, CommentCacheDeleteArgs<ExtArgs>>): Prisma__CommentCacheClient<$Result.GetResult<Prisma.$CommentCachePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CommentCache.
     * @param {CommentCacheUpdateArgs} args - Arguments to update one CommentCache.
     * @example
     * // Update one CommentCache
     * const commentCache = await prisma.commentCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentCacheUpdateArgs>(args: SelectSubset<T, CommentCacheUpdateArgs<ExtArgs>>): Prisma__CommentCacheClient<$Result.GetResult<Prisma.$CommentCachePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CommentCaches.
     * @param {CommentCacheDeleteManyArgs} args - Arguments to filter CommentCaches to delete.
     * @example
     * // Delete a few CommentCaches
     * const { count } = await prisma.commentCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentCacheDeleteManyArgs>(args?: SelectSubset<T, CommentCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommentCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CommentCaches
     * const commentCache = await prisma.commentCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentCacheUpdateManyArgs>(args: SelectSubset<T, CommentCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommentCaches and returns the data updated in the database.
     * @param {CommentCacheUpdateManyAndReturnArgs} args - Arguments to update many CommentCaches.
     * @example
     * // Update many CommentCaches
     * const commentCache = await prisma.commentCache.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CommentCaches and only return the `id`
     * const commentCacheWithIdOnly = await prisma.commentCache.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommentCacheUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentCacheUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentCachePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CommentCache.
     * @param {CommentCacheUpsertArgs} args - Arguments to update or create a CommentCache.
     * @example
     * // Update or create a CommentCache
     * const commentCache = await prisma.commentCache.upsert({
     *   create: {
     *     // ... data to create a CommentCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CommentCache we want to update
     *   }
     * })
     */
    upsert<T extends CommentCacheUpsertArgs>(args: SelectSubset<T, CommentCacheUpsertArgs<ExtArgs>>): Prisma__CommentCacheClient<$Result.GetResult<Prisma.$CommentCachePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CommentCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCacheCountArgs} args - Arguments to filter CommentCaches to count.
     * @example
     * // Count the number of CommentCaches
     * const count = await prisma.commentCache.count({
     *   where: {
     *     // ... the filter for the CommentCaches we want to count
     *   }
     * })
    **/
    count<T extends CommentCacheCountArgs>(
      args?: Subset<T, CommentCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CommentCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CommentCacheAggregateArgs>(args: Subset<T, CommentCacheAggregateArgs>): Prisma.PrismaPromise<GetCommentCacheAggregateType<T>>

    /**
     * Group by CommentCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCacheGroupByArgs} args - Group by arguments.
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
      T extends CommentCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentCacheGroupByArgs['orderBy'] }
        : { orderBy?: CommentCacheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, CommentCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CommentCache model
   */
  readonly fields: CommentCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CommentCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CommentCache model
   */
  interface CommentCacheFieldRefs {
    readonly id: FieldRef<"CommentCache", 'String'>
    readonly commentId: FieldRef<"CommentCache", 'String'>
    readonly videoId: FieldRef<"CommentCache", 'String'>
    readonly authorName: FieldRef<"CommentCache", 'String'>
    readonly authorChannelId: FieldRef<"CommentCache", 'String'>
    readonly authorThumb: FieldRef<"CommentCache", 'String'>
    readonly content: FieldRef<"CommentCache", 'String'>
    readonly likeCount: FieldRef<"CommentCache", 'Int'>
    readonly replyCount: FieldRef<"CommentCache", 'Int'>
    readonly parentCommentId: FieldRef<"CommentCache", 'String'>
    readonly publishedAt: FieldRef<"CommentCache", 'DateTime'>
    readonly updatedAt: FieldRef<"CommentCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CommentCache findUnique
   */
  export type CommentCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentCache
     */
    select?: CommentCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentCache
     */
    omit?: CommentCacheOmit<ExtArgs> | null
    /**
     * Filter, which CommentCache to fetch.
     */
    where: CommentCacheWhereUniqueInput
  }

  /**
   * CommentCache findUniqueOrThrow
   */
  export type CommentCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentCache
     */
    select?: CommentCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentCache
     */
    omit?: CommentCacheOmit<ExtArgs> | null
    /**
     * Filter, which CommentCache to fetch.
     */
    where: CommentCacheWhereUniqueInput
  }

  /**
   * CommentCache findFirst
   */
  export type CommentCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentCache
     */
    select?: CommentCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentCache
     */
    omit?: CommentCacheOmit<ExtArgs> | null
    /**
     * Filter, which CommentCache to fetch.
     */
    where?: CommentCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentCaches to fetch.
     */
    orderBy?: CommentCacheOrderByWithRelationInput | CommentCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommentCaches.
     */
    cursor?: CommentCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommentCaches.
     */
    distinct?: CommentCacheScalarFieldEnum | CommentCacheScalarFieldEnum[]
  }

  /**
   * CommentCache findFirstOrThrow
   */
  export type CommentCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentCache
     */
    select?: CommentCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentCache
     */
    omit?: CommentCacheOmit<ExtArgs> | null
    /**
     * Filter, which CommentCache to fetch.
     */
    where?: CommentCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentCaches to fetch.
     */
    orderBy?: CommentCacheOrderByWithRelationInput | CommentCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommentCaches.
     */
    cursor?: CommentCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommentCaches.
     */
    distinct?: CommentCacheScalarFieldEnum | CommentCacheScalarFieldEnum[]
  }

  /**
   * CommentCache findMany
   */
  export type CommentCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentCache
     */
    select?: CommentCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentCache
     */
    omit?: CommentCacheOmit<ExtArgs> | null
    /**
     * Filter, which CommentCaches to fetch.
     */
    where?: CommentCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentCaches to fetch.
     */
    orderBy?: CommentCacheOrderByWithRelationInput | CommentCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CommentCaches.
     */
    cursor?: CommentCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentCaches.
     */
    skip?: number
    distinct?: CommentCacheScalarFieldEnum | CommentCacheScalarFieldEnum[]
  }

  /**
   * CommentCache create
   */
  export type CommentCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentCache
     */
    select?: CommentCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentCache
     */
    omit?: CommentCacheOmit<ExtArgs> | null
    /**
     * The data needed to create a CommentCache.
     */
    data: XOR<CommentCacheCreateInput, CommentCacheUncheckedCreateInput>
  }

  /**
   * CommentCache createMany
   */
  export type CommentCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CommentCaches.
     */
    data: CommentCacheCreateManyInput | CommentCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CommentCache createManyAndReturn
   */
  export type CommentCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentCache
     */
    select?: CommentCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CommentCache
     */
    omit?: CommentCacheOmit<ExtArgs> | null
    /**
     * The data used to create many CommentCaches.
     */
    data: CommentCacheCreateManyInput | CommentCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CommentCache update
   */
  export type CommentCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentCache
     */
    select?: CommentCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentCache
     */
    omit?: CommentCacheOmit<ExtArgs> | null
    /**
     * The data needed to update a CommentCache.
     */
    data: XOR<CommentCacheUpdateInput, CommentCacheUncheckedUpdateInput>
    /**
     * Choose, which CommentCache to update.
     */
    where: CommentCacheWhereUniqueInput
  }

  /**
   * CommentCache updateMany
   */
  export type CommentCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CommentCaches.
     */
    data: XOR<CommentCacheUpdateManyMutationInput, CommentCacheUncheckedUpdateManyInput>
    /**
     * Filter which CommentCaches to update
     */
    where?: CommentCacheWhereInput
    /**
     * Limit how many CommentCaches to update.
     */
    limit?: number
  }

  /**
   * CommentCache updateManyAndReturn
   */
  export type CommentCacheUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentCache
     */
    select?: CommentCacheSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CommentCache
     */
    omit?: CommentCacheOmit<ExtArgs> | null
    /**
     * The data used to update CommentCaches.
     */
    data: XOR<CommentCacheUpdateManyMutationInput, CommentCacheUncheckedUpdateManyInput>
    /**
     * Filter which CommentCaches to update
     */
    where?: CommentCacheWhereInput
    /**
     * Limit how many CommentCaches to update.
     */
    limit?: number
  }

  /**
   * CommentCache upsert
   */
  export type CommentCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentCache
     */
    select?: CommentCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentCache
     */
    omit?: CommentCacheOmit<ExtArgs> | null
    /**
     * The filter to search for the CommentCache to update in case it exists.
     */
    where: CommentCacheWhereUniqueInput
    /**
     * In case the CommentCache found by the `where` argument doesn't exist, create a new CommentCache with this data.
     */
    create: XOR<CommentCacheCreateInput, CommentCacheUncheckedCreateInput>
    /**
     * In case the CommentCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentCacheUpdateInput, CommentCacheUncheckedUpdateInput>
  }

  /**
   * CommentCache delete
   */
  export type CommentCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentCache
     */
    select?: CommentCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentCache
     */
    omit?: CommentCacheOmit<ExtArgs> | null
    /**
     * Filter which CommentCache to delete.
     */
    where: CommentCacheWhereUniqueInput
  }

  /**
   * CommentCache deleteMany
   */
  export type CommentCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommentCaches to delete
     */
    where?: CommentCacheWhereInput
    /**
     * Limit how many CommentCaches to delete.
     */
    limit?: number
  }

  /**
   * CommentCache without action
   */
  export type CommentCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentCache
     */
    select?: CommentCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentCache
     */
    omit?: CommentCacheOmit<ExtArgs> | null
  }


  /**
   * Model Bookmark
   */

  export type AggregateBookmark = {
    _count: BookmarkCountAggregateOutputType | null
    _min: BookmarkMinAggregateOutputType | null
    _max: BookmarkMaxAggregateOutputType | null
  }

  export type BookmarkMinAggregateOutputType = {
    id: string | null
    userId: string | null
    folderId: string | null
    commentId: string | null
    videoId: string | null
    authorName: string | null
    authorThumb: string | null
    content: string | null
    likeCount: string | null
    replyCount: string | null
    publishedTime: string | null
    createdAt: Date | null
  }

  export type BookmarkMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    folderId: string | null
    commentId: string | null
    videoId: string | null
    authorName: string | null
    authorThumb: string | null
    content: string | null
    likeCount: string | null
    replyCount: string | null
    publishedTime: string | null
    createdAt: Date | null
  }

  export type BookmarkCountAggregateOutputType = {
    id: number
    userId: number
    folderId: number
    commentId: number
    videoId: number
    authorName: number
    authorThumb: number
    content: number
    likeCount: number
    replyCount: number
    publishedTime: number
    createdAt: number
    _all: number
  }


  export type BookmarkMinAggregateInputType = {
    id?: true
    userId?: true
    folderId?: true
    commentId?: true
    videoId?: true
    authorName?: true
    authorThumb?: true
    content?: true
    likeCount?: true
    replyCount?: true
    publishedTime?: true
    createdAt?: true
  }

  export type BookmarkMaxAggregateInputType = {
    id?: true
    userId?: true
    folderId?: true
    commentId?: true
    videoId?: true
    authorName?: true
    authorThumb?: true
    content?: true
    likeCount?: true
    replyCount?: true
    publishedTime?: true
    createdAt?: true
  }

  export type BookmarkCountAggregateInputType = {
    id?: true
    userId?: true
    folderId?: true
    commentId?: true
    videoId?: true
    authorName?: true
    authorThumb?: true
    content?: true
    likeCount?: true
    replyCount?: true
    publishedTime?: true
    createdAt?: true
    _all?: true
  }

  export type BookmarkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookmark to aggregate.
     */
    where?: BookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookmarks to fetch.
     */
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookmarks
    **/
    _count?: true | BookmarkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookmarkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookmarkMaxAggregateInputType
  }

  export type GetBookmarkAggregateType<T extends BookmarkAggregateArgs> = {
        [P in keyof T & keyof AggregateBookmark]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookmark[P]>
      : GetScalarType<T[P], AggregateBookmark[P]>
  }




  export type BookmarkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookmarkWhereInput
    orderBy?: BookmarkOrderByWithAggregationInput | BookmarkOrderByWithAggregationInput[]
    by: BookmarkScalarFieldEnum[] | BookmarkScalarFieldEnum
    having?: BookmarkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookmarkCountAggregateInputType | true
    _min?: BookmarkMinAggregateInputType
    _max?: BookmarkMaxAggregateInputType
  }

  export type BookmarkGroupByOutputType = {
    id: string
    userId: string
    folderId: string | null
    commentId: string
    videoId: string
    authorName: string
    authorThumb: string | null
    content: string
    likeCount: string
    replyCount: string
    publishedTime: string
    createdAt: Date
    _count: BookmarkCountAggregateOutputType | null
    _min: BookmarkMinAggregateOutputType | null
    _max: BookmarkMaxAggregateOutputType | null
  }

  type GetBookmarkGroupByPayload<T extends BookmarkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookmarkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookmarkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookmarkGroupByOutputType[P]>
            : GetScalarType<T[P], BookmarkGroupByOutputType[P]>
        }
      >
    >


  export type BookmarkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    folderId?: boolean
    commentId?: boolean
    videoId?: boolean
    authorName?: boolean
    authorThumb?: boolean
    content?: boolean
    likeCount?: boolean
    replyCount?: boolean
    publishedTime?: boolean
    createdAt?: boolean
    folder?: boolean | Bookmark$folderArgs<ExtArgs>
  }, ExtArgs["result"]["bookmark"]>

  export type BookmarkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    folderId?: boolean
    commentId?: boolean
    videoId?: boolean
    authorName?: boolean
    authorThumb?: boolean
    content?: boolean
    likeCount?: boolean
    replyCount?: boolean
    publishedTime?: boolean
    createdAt?: boolean
    folder?: boolean | Bookmark$folderArgs<ExtArgs>
  }, ExtArgs["result"]["bookmark"]>

  export type BookmarkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    folderId?: boolean
    commentId?: boolean
    videoId?: boolean
    authorName?: boolean
    authorThumb?: boolean
    content?: boolean
    likeCount?: boolean
    replyCount?: boolean
    publishedTime?: boolean
    createdAt?: boolean
    folder?: boolean | Bookmark$folderArgs<ExtArgs>
  }, ExtArgs["result"]["bookmark"]>

  export type BookmarkSelectScalar = {
    id?: boolean
    userId?: boolean
    folderId?: boolean
    commentId?: boolean
    videoId?: boolean
    authorName?: boolean
    authorThumb?: boolean
    content?: boolean
    likeCount?: boolean
    replyCount?: boolean
    publishedTime?: boolean
    createdAt?: boolean
  }

  export type BookmarkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "folderId" | "commentId" | "videoId" | "authorName" | "authorThumb" | "content" | "likeCount" | "replyCount" | "publishedTime" | "createdAt", ExtArgs["result"]["bookmark"]>
  export type BookmarkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    folder?: boolean | Bookmark$folderArgs<ExtArgs>
  }
  export type BookmarkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    folder?: boolean | Bookmark$folderArgs<ExtArgs>
  }
  export type BookmarkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    folder?: boolean | Bookmark$folderArgs<ExtArgs>
  }

  export type $BookmarkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bookmark"
    objects: {
      folder: Prisma.$BookmarkFolderPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      folderId: string | null
      commentId: string
      videoId: string
      authorName: string
      authorThumb: string | null
      content: string
      likeCount: string
      replyCount: string
      publishedTime: string
      createdAt: Date
    }, ExtArgs["result"]["bookmark"]>
    composites: {}
  }

  type BookmarkGetPayload<S extends boolean | null | undefined | BookmarkDefaultArgs> = $Result.GetResult<Prisma.$BookmarkPayload, S>

  type BookmarkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookmarkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookmarkCountAggregateInputType | true
    }

  export interface BookmarkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bookmark'], meta: { name: 'Bookmark' } }
    /**
     * Find zero or one Bookmark that matches the filter.
     * @param {BookmarkFindUniqueArgs} args - Arguments to find a Bookmark
     * @example
     * // Get one Bookmark
     * const bookmark = await prisma.bookmark.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookmarkFindUniqueArgs>(args: SelectSubset<T, BookmarkFindUniqueArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bookmark that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookmarkFindUniqueOrThrowArgs} args - Arguments to find a Bookmark
     * @example
     * // Get one Bookmark
     * const bookmark = await prisma.bookmark.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookmarkFindUniqueOrThrowArgs>(args: SelectSubset<T, BookmarkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookmark that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFindFirstArgs} args - Arguments to find a Bookmark
     * @example
     * // Get one Bookmark
     * const bookmark = await prisma.bookmark.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookmarkFindFirstArgs>(args?: SelectSubset<T, BookmarkFindFirstArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookmark that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFindFirstOrThrowArgs} args - Arguments to find a Bookmark
     * @example
     * // Get one Bookmark
     * const bookmark = await prisma.bookmark.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookmarkFindFirstOrThrowArgs>(args?: SelectSubset<T, BookmarkFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookmarks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookmarks
     * const bookmarks = await prisma.bookmark.findMany()
     * 
     * // Get first 10 Bookmarks
     * const bookmarks = await prisma.bookmark.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookmarkWithIdOnly = await prisma.bookmark.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookmarkFindManyArgs>(args?: SelectSubset<T, BookmarkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bookmark.
     * @param {BookmarkCreateArgs} args - Arguments to create a Bookmark.
     * @example
     * // Create one Bookmark
     * const Bookmark = await prisma.bookmark.create({
     *   data: {
     *     // ... data to create a Bookmark
     *   }
     * })
     * 
     */
    create<T extends BookmarkCreateArgs>(args: SelectSubset<T, BookmarkCreateArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookmarks.
     * @param {BookmarkCreateManyArgs} args - Arguments to create many Bookmarks.
     * @example
     * // Create many Bookmarks
     * const bookmark = await prisma.bookmark.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookmarkCreateManyArgs>(args?: SelectSubset<T, BookmarkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookmarks and returns the data saved in the database.
     * @param {BookmarkCreateManyAndReturnArgs} args - Arguments to create many Bookmarks.
     * @example
     * // Create many Bookmarks
     * const bookmark = await prisma.bookmark.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookmarks and only return the `id`
     * const bookmarkWithIdOnly = await prisma.bookmark.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookmarkCreateManyAndReturnArgs>(args?: SelectSubset<T, BookmarkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bookmark.
     * @param {BookmarkDeleteArgs} args - Arguments to delete one Bookmark.
     * @example
     * // Delete one Bookmark
     * const Bookmark = await prisma.bookmark.delete({
     *   where: {
     *     // ... filter to delete one Bookmark
     *   }
     * })
     * 
     */
    delete<T extends BookmarkDeleteArgs>(args: SelectSubset<T, BookmarkDeleteArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bookmark.
     * @param {BookmarkUpdateArgs} args - Arguments to update one Bookmark.
     * @example
     * // Update one Bookmark
     * const bookmark = await prisma.bookmark.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookmarkUpdateArgs>(args: SelectSubset<T, BookmarkUpdateArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookmarks.
     * @param {BookmarkDeleteManyArgs} args - Arguments to filter Bookmarks to delete.
     * @example
     * // Delete a few Bookmarks
     * const { count } = await prisma.bookmark.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookmarkDeleteManyArgs>(args?: SelectSubset<T, BookmarkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookmarks
     * const bookmark = await prisma.bookmark.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookmarkUpdateManyArgs>(args: SelectSubset<T, BookmarkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookmarks and returns the data updated in the database.
     * @param {BookmarkUpdateManyAndReturnArgs} args - Arguments to update many Bookmarks.
     * @example
     * // Update many Bookmarks
     * const bookmark = await prisma.bookmark.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookmarks and only return the `id`
     * const bookmarkWithIdOnly = await prisma.bookmark.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookmarkUpdateManyAndReturnArgs>(args: SelectSubset<T, BookmarkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bookmark.
     * @param {BookmarkUpsertArgs} args - Arguments to update or create a Bookmark.
     * @example
     * // Update or create a Bookmark
     * const bookmark = await prisma.bookmark.upsert({
     *   create: {
     *     // ... data to create a Bookmark
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bookmark we want to update
     *   }
     * })
     */
    upsert<T extends BookmarkUpsertArgs>(args: SelectSubset<T, BookmarkUpsertArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkCountArgs} args - Arguments to filter Bookmarks to count.
     * @example
     * // Count the number of Bookmarks
     * const count = await prisma.bookmark.count({
     *   where: {
     *     // ... the filter for the Bookmarks we want to count
     *   }
     * })
    **/
    count<T extends BookmarkCountArgs>(
      args?: Subset<T, BookmarkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookmarkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bookmark.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BookmarkAggregateArgs>(args: Subset<T, BookmarkAggregateArgs>): Prisma.PrismaPromise<GetBookmarkAggregateType<T>>

    /**
     * Group by Bookmark.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkGroupByArgs} args - Group by arguments.
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
      T extends BookmarkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookmarkGroupByArgs['orderBy'] }
        : { orderBy?: BookmarkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, BookmarkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookmarkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bookmark model
   */
  readonly fields: BookmarkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bookmark.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookmarkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    folder<T extends Bookmark$folderArgs<ExtArgs> = {}>(args?: Subset<T, Bookmark$folderArgs<ExtArgs>>): Prisma__BookmarkFolderClient<$Result.GetResult<Prisma.$BookmarkFolderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Bookmark model
   */
  interface BookmarkFieldRefs {
    readonly id: FieldRef<"Bookmark", 'String'>
    readonly userId: FieldRef<"Bookmark", 'String'>
    readonly folderId: FieldRef<"Bookmark", 'String'>
    readonly commentId: FieldRef<"Bookmark", 'String'>
    readonly videoId: FieldRef<"Bookmark", 'String'>
    readonly authorName: FieldRef<"Bookmark", 'String'>
    readonly authorThumb: FieldRef<"Bookmark", 'String'>
    readonly content: FieldRef<"Bookmark", 'String'>
    readonly likeCount: FieldRef<"Bookmark", 'String'>
    readonly replyCount: FieldRef<"Bookmark", 'String'>
    readonly publishedTime: FieldRef<"Bookmark", 'String'>
    readonly createdAt: FieldRef<"Bookmark", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Bookmark findUnique
   */
  export type BookmarkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmark to fetch.
     */
    where: BookmarkWhereUniqueInput
  }

  /**
   * Bookmark findUniqueOrThrow
   */
  export type BookmarkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmark to fetch.
     */
    where: BookmarkWhereUniqueInput
  }

  /**
   * Bookmark findFirst
   */
  export type BookmarkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmark to fetch.
     */
    where?: BookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookmarks to fetch.
     */
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookmarks.
     */
    cursor?: BookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookmarks.
     */
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Bookmark findFirstOrThrow
   */
  export type BookmarkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmark to fetch.
     */
    where?: BookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookmarks to fetch.
     */
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookmarks.
     */
    cursor?: BookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookmarks.
     */
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Bookmark findMany
   */
  export type BookmarkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmarks to fetch.
     */
    where?: BookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookmarks to fetch.
     */
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookmarks.
     */
    cursor?: BookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookmarks.
     */
    skip?: number
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Bookmark create
   */
  export type BookmarkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * The data needed to create a Bookmark.
     */
    data: XOR<BookmarkCreateInput, BookmarkUncheckedCreateInput>
  }

  /**
   * Bookmark createMany
   */
  export type BookmarkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookmarks.
     */
    data: BookmarkCreateManyInput | BookmarkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bookmark createManyAndReturn
   */
  export type BookmarkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * The data used to create many Bookmarks.
     */
    data: BookmarkCreateManyInput | BookmarkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bookmark update
   */
  export type BookmarkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * The data needed to update a Bookmark.
     */
    data: XOR<BookmarkUpdateInput, BookmarkUncheckedUpdateInput>
    /**
     * Choose, which Bookmark to update.
     */
    where: BookmarkWhereUniqueInput
  }

  /**
   * Bookmark updateMany
   */
  export type BookmarkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookmarks.
     */
    data: XOR<BookmarkUpdateManyMutationInput, BookmarkUncheckedUpdateManyInput>
    /**
     * Filter which Bookmarks to update
     */
    where?: BookmarkWhereInput
    /**
     * Limit how many Bookmarks to update.
     */
    limit?: number
  }

  /**
   * Bookmark updateManyAndReturn
   */
  export type BookmarkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * The data used to update Bookmarks.
     */
    data: XOR<BookmarkUpdateManyMutationInput, BookmarkUncheckedUpdateManyInput>
    /**
     * Filter which Bookmarks to update
     */
    where?: BookmarkWhereInput
    /**
     * Limit how many Bookmarks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bookmark upsert
   */
  export type BookmarkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * The filter to search for the Bookmark to update in case it exists.
     */
    where: BookmarkWhereUniqueInput
    /**
     * In case the Bookmark found by the `where` argument doesn't exist, create a new Bookmark with this data.
     */
    create: XOR<BookmarkCreateInput, BookmarkUncheckedCreateInput>
    /**
     * In case the Bookmark was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookmarkUpdateInput, BookmarkUncheckedUpdateInput>
  }

  /**
   * Bookmark delete
   */
  export type BookmarkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter which Bookmark to delete.
     */
    where: BookmarkWhereUniqueInput
  }

  /**
   * Bookmark deleteMany
   */
  export type BookmarkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookmarks to delete
     */
    where?: BookmarkWhereInput
    /**
     * Limit how many Bookmarks to delete.
     */
    limit?: number
  }

  /**
   * Bookmark.folder
   */
  export type Bookmark$folderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookmarkFolder
     */
    select?: BookmarkFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookmarkFolder
     */
    omit?: BookmarkFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkFolderInclude<ExtArgs> | null
    where?: BookmarkFolderWhereInput
  }

  /**
   * Bookmark without action
   */
  export type BookmarkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
  }


  /**
   * Model List
   */

  export type AggregateList = {
    _count: ListCountAggregateOutputType | null
    _min: ListMinAggregateOutputType | null
    _max: ListMaxAggregateOutputType | null
  }

  export type ListMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    isPublic: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ListMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    description: string | null
    isPublic: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ListCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    description: number
    isPublic: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ListMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ListMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ListCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    description?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ListAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which List to aggregate.
     */
    where?: ListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lists to fetch.
     */
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Lists
    **/
    _count?: true | ListCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListMaxAggregateInputType
  }

  export type GetListAggregateType<T extends ListAggregateArgs> = {
        [P in keyof T & keyof AggregateList]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateList[P]>
      : GetScalarType<T[P], AggregateList[P]>
  }




  export type ListGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListWhereInput
    orderBy?: ListOrderByWithAggregationInput | ListOrderByWithAggregationInput[]
    by: ListScalarFieldEnum[] | ListScalarFieldEnum
    having?: ListScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListCountAggregateInputType | true
    _min?: ListMinAggregateInputType
    _max?: ListMaxAggregateInputType
  }

  export type ListGroupByOutputType = {
    id: string
    userId: string
    name: string
    description: string | null
    isPublic: boolean
    createdAt: Date
    updatedAt: Date
    _count: ListCountAggregateOutputType | null
    _min: ListMinAggregateOutputType | null
    _max: ListMaxAggregateOutputType | null
  }

  type GetListGroupByPayload<T extends ListGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListGroupByOutputType[P]>
            : GetScalarType<T[P], ListGroupByOutputType[P]>
        }
      >
    >


  export type ListSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | List$itemsArgs<ExtArgs>
    followers?: boolean | List$followersArgs<ExtArgs>
    _count?: boolean | ListCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["list"]>

  export type ListSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["list"]>

  export type ListSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["list"]>

  export type ListSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    description?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ListOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "description" | "isPublic" | "createdAt" | "updatedAt", ExtArgs["result"]["list"]>
  export type ListInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | List$itemsArgs<ExtArgs>
    followers?: boolean | List$followersArgs<ExtArgs>
    _count?: boolean | ListCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ListIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ListIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ListPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "List"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      items: Prisma.$ListItemPayload<ExtArgs>[]
      followers: Prisma.$ListFollowPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      description: string | null
      isPublic: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["list"]>
    composites: {}
  }

  type ListGetPayload<S extends boolean | null | undefined | ListDefaultArgs> = $Result.GetResult<Prisma.$ListPayload, S>

  type ListCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ListFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ListCountAggregateInputType | true
    }

  export interface ListDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['List'], meta: { name: 'List' } }
    /**
     * Find zero or one List that matches the filter.
     * @param {ListFindUniqueArgs} args - Arguments to find a List
     * @example
     * // Get one List
     * const list = await prisma.list.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListFindUniqueArgs>(args: SelectSubset<T, ListFindUniqueArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one List that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ListFindUniqueOrThrowArgs} args - Arguments to find a List
     * @example
     * // Get one List
     * const list = await prisma.list.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListFindUniqueOrThrowArgs>(args: SelectSubset<T, ListFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first List that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFindFirstArgs} args - Arguments to find a List
     * @example
     * // Get one List
     * const list = await prisma.list.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListFindFirstArgs>(args?: SelectSubset<T, ListFindFirstArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first List that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFindFirstOrThrowArgs} args - Arguments to find a List
     * @example
     * // Get one List
     * const list = await prisma.list.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListFindFirstOrThrowArgs>(args?: SelectSubset<T, ListFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Lists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lists
     * const lists = await prisma.list.findMany()
     * 
     * // Get first 10 Lists
     * const lists = await prisma.list.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const listWithIdOnly = await prisma.list.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ListFindManyArgs>(args?: SelectSubset<T, ListFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a List.
     * @param {ListCreateArgs} args - Arguments to create a List.
     * @example
     * // Create one List
     * const List = await prisma.list.create({
     *   data: {
     *     // ... data to create a List
     *   }
     * })
     * 
     */
    create<T extends ListCreateArgs>(args: SelectSubset<T, ListCreateArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Lists.
     * @param {ListCreateManyArgs} args - Arguments to create many Lists.
     * @example
     * // Create many Lists
     * const list = await prisma.list.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListCreateManyArgs>(args?: SelectSubset<T, ListCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Lists and returns the data saved in the database.
     * @param {ListCreateManyAndReturnArgs} args - Arguments to create many Lists.
     * @example
     * // Create many Lists
     * const list = await prisma.list.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Lists and only return the `id`
     * const listWithIdOnly = await prisma.list.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ListCreateManyAndReturnArgs>(args?: SelectSubset<T, ListCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a List.
     * @param {ListDeleteArgs} args - Arguments to delete one List.
     * @example
     * // Delete one List
     * const List = await prisma.list.delete({
     *   where: {
     *     // ... filter to delete one List
     *   }
     * })
     * 
     */
    delete<T extends ListDeleteArgs>(args: SelectSubset<T, ListDeleteArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one List.
     * @param {ListUpdateArgs} args - Arguments to update one List.
     * @example
     * // Update one List
     * const list = await prisma.list.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListUpdateArgs>(args: SelectSubset<T, ListUpdateArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Lists.
     * @param {ListDeleteManyArgs} args - Arguments to filter Lists to delete.
     * @example
     * // Delete a few Lists
     * const { count } = await prisma.list.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListDeleteManyArgs>(args?: SelectSubset<T, ListDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lists
     * const list = await prisma.list.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListUpdateManyArgs>(args: SelectSubset<T, ListUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lists and returns the data updated in the database.
     * @param {ListUpdateManyAndReturnArgs} args - Arguments to update many Lists.
     * @example
     * // Update many Lists
     * const list = await prisma.list.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Lists and only return the `id`
     * const listWithIdOnly = await prisma.list.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ListUpdateManyAndReturnArgs>(args: SelectSubset<T, ListUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one List.
     * @param {ListUpsertArgs} args - Arguments to update or create a List.
     * @example
     * // Update or create a List
     * const list = await prisma.list.upsert({
     *   create: {
     *     // ... data to create a List
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the List we want to update
     *   }
     * })
     */
    upsert<T extends ListUpsertArgs>(args: SelectSubset<T, ListUpsertArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Lists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListCountArgs} args - Arguments to filter Lists to count.
     * @example
     * // Count the number of Lists
     * const count = await prisma.list.count({
     *   where: {
     *     // ... the filter for the Lists we want to count
     *   }
     * })
    **/
    count<T extends ListCountArgs>(
      args?: Subset<T, ListCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a List.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ListAggregateArgs>(args: Subset<T, ListAggregateArgs>): Prisma.PrismaPromise<GetListAggregateType<T>>

    /**
     * Group by List.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListGroupByArgs} args - Group by arguments.
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
      T extends ListGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListGroupByArgs['orderBy'] }
        : { orderBy?: ListGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ListGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the List model
   */
  readonly fields: ListFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for List.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends List$itemsArgs<ExtArgs> = {}>(args?: Subset<T, List$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    followers<T extends List$followersArgs<ExtArgs> = {}>(args?: Subset<T, List$followersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListFollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the List model
   */
  interface ListFieldRefs {
    readonly id: FieldRef<"List", 'String'>
    readonly userId: FieldRef<"List", 'String'>
    readonly name: FieldRef<"List", 'String'>
    readonly description: FieldRef<"List", 'String'>
    readonly isPublic: FieldRef<"List", 'Boolean'>
    readonly createdAt: FieldRef<"List", 'DateTime'>
    readonly updatedAt: FieldRef<"List", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * List findUnique
   */
  export type ListFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter, which List to fetch.
     */
    where: ListWhereUniqueInput
  }

  /**
   * List findUniqueOrThrow
   */
  export type ListFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter, which List to fetch.
     */
    where: ListWhereUniqueInput
  }

  /**
   * List findFirst
   */
  export type ListFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter, which List to fetch.
     */
    where?: ListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lists to fetch.
     */
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lists.
     */
    cursor?: ListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lists.
     */
    distinct?: ListScalarFieldEnum | ListScalarFieldEnum[]
  }

  /**
   * List findFirstOrThrow
   */
  export type ListFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter, which List to fetch.
     */
    where?: ListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lists to fetch.
     */
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lists.
     */
    cursor?: ListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lists.
     */
    distinct?: ListScalarFieldEnum | ListScalarFieldEnum[]
  }

  /**
   * List findMany
   */
  export type ListFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter, which Lists to fetch.
     */
    where?: ListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lists to fetch.
     */
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Lists.
     */
    cursor?: ListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lists.
     */
    skip?: number
    distinct?: ListScalarFieldEnum | ListScalarFieldEnum[]
  }

  /**
   * List create
   */
  export type ListCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * The data needed to create a List.
     */
    data: XOR<ListCreateInput, ListUncheckedCreateInput>
  }

  /**
   * List createMany
   */
  export type ListCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Lists.
     */
    data: ListCreateManyInput | ListCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * List createManyAndReturn
   */
  export type ListCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * The data used to create many Lists.
     */
    data: ListCreateManyInput | ListCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * List update
   */
  export type ListUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * The data needed to update a List.
     */
    data: XOR<ListUpdateInput, ListUncheckedUpdateInput>
    /**
     * Choose, which List to update.
     */
    where: ListWhereUniqueInput
  }

  /**
   * List updateMany
   */
  export type ListUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Lists.
     */
    data: XOR<ListUpdateManyMutationInput, ListUncheckedUpdateManyInput>
    /**
     * Filter which Lists to update
     */
    where?: ListWhereInput
    /**
     * Limit how many Lists to update.
     */
    limit?: number
  }

  /**
   * List updateManyAndReturn
   */
  export type ListUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * The data used to update Lists.
     */
    data: XOR<ListUpdateManyMutationInput, ListUncheckedUpdateManyInput>
    /**
     * Filter which Lists to update
     */
    where?: ListWhereInput
    /**
     * Limit how many Lists to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * List upsert
   */
  export type ListUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * The filter to search for the List to update in case it exists.
     */
    where: ListWhereUniqueInput
    /**
     * In case the List found by the `where` argument doesn't exist, create a new List with this data.
     */
    create: XOR<ListCreateInput, ListUncheckedCreateInput>
    /**
     * In case the List was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListUpdateInput, ListUncheckedUpdateInput>
  }

  /**
   * List delete
   */
  export type ListDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter which List to delete.
     */
    where: ListWhereUniqueInput
  }

  /**
   * List deleteMany
   */
  export type ListDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lists to delete
     */
    where?: ListWhereInput
    /**
     * Limit how many Lists to delete.
     */
    limit?: number
  }

  /**
   * List.items
   */
  export type List$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
    where?: ListItemWhereInput
    orderBy?: ListItemOrderByWithRelationInput | ListItemOrderByWithRelationInput[]
    cursor?: ListItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListItemScalarFieldEnum | ListItemScalarFieldEnum[]
  }

  /**
   * List.followers
   */
  export type List$followersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListFollow
     */
    select?: ListFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListFollow
     */
    omit?: ListFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListFollowInclude<ExtArgs> | null
    where?: ListFollowWhereInput
    orderBy?: ListFollowOrderByWithRelationInput | ListFollowOrderByWithRelationInput[]
    cursor?: ListFollowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListFollowScalarFieldEnum | ListFollowScalarFieldEnum[]
  }

  /**
   * List without action
   */
  export type ListDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
  }


  /**
   * Model ListItem
   */

  export type AggregateListItem = {
    _count: ListItemCountAggregateOutputType | null
    _min: ListItemMinAggregateOutputType | null
    _max: ListItemMaxAggregateOutputType | null
  }

  export type ListItemMinAggregateOutputType = {
    id: string | null
    listId: string | null
    commentId: string | null
    videoId: string | null
    authorName: string | null
    authorThumb: string | null
    content: string | null
    likeCount: string | null
    replyCount: string | null
    publishedTime: string | null
    createdAt: Date | null
  }

  export type ListItemMaxAggregateOutputType = {
    id: string | null
    listId: string | null
    commentId: string | null
    videoId: string | null
    authorName: string | null
    authorThumb: string | null
    content: string | null
    likeCount: string | null
    replyCount: string | null
    publishedTime: string | null
    createdAt: Date | null
  }

  export type ListItemCountAggregateOutputType = {
    id: number
    listId: number
    commentId: number
    videoId: number
    authorName: number
    authorThumb: number
    content: number
    likeCount: number
    replyCount: number
    publishedTime: number
    createdAt: number
    _all: number
  }


  export type ListItemMinAggregateInputType = {
    id?: true
    listId?: true
    commentId?: true
    videoId?: true
    authorName?: true
    authorThumb?: true
    content?: true
    likeCount?: true
    replyCount?: true
    publishedTime?: true
    createdAt?: true
  }

  export type ListItemMaxAggregateInputType = {
    id?: true
    listId?: true
    commentId?: true
    videoId?: true
    authorName?: true
    authorThumb?: true
    content?: true
    likeCount?: true
    replyCount?: true
    publishedTime?: true
    createdAt?: true
  }

  export type ListItemCountAggregateInputType = {
    id?: true
    listId?: true
    commentId?: true
    videoId?: true
    authorName?: true
    authorThumb?: true
    content?: true
    likeCount?: true
    replyCount?: true
    publishedTime?: true
    createdAt?: true
    _all?: true
  }

  export type ListItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ListItem to aggregate.
     */
    where?: ListItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListItems to fetch.
     */
    orderBy?: ListItemOrderByWithRelationInput | ListItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ListItems
    **/
    _count?: true | ListItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListItemMaxAggregateInputType
  }

  export type GetListItemAggregateType<T extends ListItemAggregateArgs> = {
        [P in keyof T & keyof AggregateListItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateListItem[P]>
      : GetScalarType<T[P], AggregateListItem[P]>
  }




  export type ListItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListItemWhereInput
    orderBy?: ListItemOrderByWithAggregationInput | ListItemOrderByWithAggregationInput[]
    by: ListItemScalarFieldEnum[] | ListItemScalarFieldEnum
    having?: ListItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListItemCountAggregateInputType | true
    _min?: ListItemMinAggregateInputType
    _max?: ListItemMaxAggregateInputType
  }

  export type ListItemGroupByOutputType = {
    id: string
    listId: string
    commentId: string
    videoId: string
    authorName: string
    authorThumb: string | null
    content: string
    likeCount: string
    replyCount: string
    publishedTime: string
    createdAt: Date
    _count: ListItemCountAggregateOutputType | null
    _min: ListItemMinAggregateOutputType | null
    _max: ListItemMaxAggregateOutputType | null
  }

  type GetListItemGroupByPayload<T extends ListItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListItemGroupByOutputType[P]>
            : GetScalarType<T[P], ListItemGroupByOutputType[P]>
        }
      >
    >


  export type ListItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listId?: boolean
    commentId?: boolean
    videoId?: boolean
    authorName?: boolean
    authorThumb?: boolean
    content?: boolean
    likeCount?: boolean
    replyCount?: boolean
    publishedTime?: boolean
    createdAt?: boolean
    list?: boolean | ListDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listItem"]>

  export type ListItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listId?: boolean
    commentId?: boolean
    videoId?: boolean
    authorName?: boolean
    authorThumb?: boolean
    content?: boolean
    likeCount?: boolean
    replyCount?: boolean
    publishedTime?: boolean
    createdAt?: boolean
    list?: boolean | ListDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listItem"]>

  export type ListItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listId?: boolean
    commentId?: boolean
    videoId?: boolean
    authorName?: boolean
    authorThumb?: boolean
    content?: boolean
    likeCount?: boolean
    replyCount?: boolean
    publishedTime?: boolean
    createdAt?: boolean
    list?: boolean | ListDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listItem"]>

  export type ListItemSelectScalar = {
    id?: boolean
    listId?: boolean
    commentId?: boolean
    videoId?: boolean
    authorName?: boolean
    authorThumb?: boolean
    content?: boolean
    likeCount?: boolean
    replyCount?: boolean
    publishedTime?: boolean
    createdAt?: boolean
  }

  export type ListItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "listId" | "commentId" | "videoId" | "authorName" | "authorThumb" | "content" | "likeCount" | "replyCount" | "publishedTime" | "createdAt", ExtArgs["result"]["listItem"]>
  export type ListItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    list?: boolean | ListDefaultArgs<ExtArgs>
  }
  export type ListItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    list?: boolean | ListDefaultArgs<ExtArgs>
  }
  export type ListItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    list?: boolean | ListDefaultArgs<ExtArgs>
  }

  export type $ListItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ListItem"
    objects: {
      list: Prisma.$ListPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      listId: string
      commentId: string
      videoId: string
      authorName: string
      authorThumb: string | null
      content: string
      likeCount: string
      replyCount: string
      publishedTime: string
      createdAt: Date
    }, ExtArgs["result"]["listItem"]>
    composites: {}
  }

  type ListItemGetPayload<S extends boolean | null | undefined | ListItemDefaultArgs> = $Result.GetResult<Prisma.$ListItemPayload, S>

  type ListItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ListItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ListItemCountAggregateInputType | true
    }

  export interface ListItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ListItem'], meta: { name: 'ListItem' } }
    /**
     * Find zero or one ListItem that matches the filter.
     * @param {ListItemFindUniqueArgs} args - Arguments to find a ListItem
     * @example
     * // Get one ListItem
     * const listItem = await prisma.listItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListItemFindUniqueArgs>(args: SelectSubset<T, ListItemFindUniqueArgs<ExtArgs>>): Prisma__ListItemClient<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ListItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ListItemFindUniqueOrThrowArgs} args - Arguments to find a ListItem
     * @example
     * // Get one ListItem
     * const listItem = await prisma.listItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ListItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListItemClient<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ListItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListItemFindFirstArgs} args - Arguments to find a ListItem
     * @example
     * // Get one ListItem
     * const listItem = await prisma.listItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListItemFindFirstArgs>(args?: SelectSubset<T, ListItemFindFirstArgs<ExtArgs>>): Prisma__ListItemClient<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ListItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListItemFindFirstOrThrowArgs} args - Arguments to find a ListItem
     * @example
     * // Get one ListItem
     * const listItem = await prisma.listItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ListItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListItemClient<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ListItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ListItems
     * const listItems = await prisma.listItem.findMany()
     * 
     * // Get first 10 ListItems
     * const listItems = await prisma.listItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const listItemWithIdOnly = await prisma.listItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ListItemFindManyArgs>(args?: SelectSubset<T, ListItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ListItem.
     * @param {ListItemCreateArgs} args - Arguments to create a ListItem.
     * @example
     * // Create one ListItem
     * const ListItem = await prisma.listItem.create({
     *   data: {
     *     // ... data to create a ListItem
     *   }
     * })
     * 
     */
    create<T extends ListItemCreateArgs>(args: SelectSubset<T, ListItemCreateArgs<ExtArgs>>): Prisma__ListItemClient<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ListItems.
     * @param {ListItemCreateManyArgs} args - Arguments to create many ListItems.
     * @example
     * // Create many ListItems
     * const listItem = await prisma.listItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListItemCreateManyArgs>(args?: SelectSubset<T, ListItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ListItems and returns the data saved in the database.
     * @param {ListItemCreateManyAndReturnArgs} args - Arguments to create many ListItems.
     * @example
     * // Create many ListItems
     * const listItem = await prisma.listItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ListItems and only return the `id`
     * const listItemWithIdOnly = await prisma.listItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ListItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ListItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ListItem.
     * @param {ListItemDeleteArgs} args - Arguments to delete one ListItem.
     * @example
     * // Delete one ListItem
     * const ListItem = await prisma.listItem.delete({
     *   where: {
     *     // ... filter to delete one ListItem
     *   }
     * })
     * 
     */
    delete<T extends ListItemDeleteArgs>(args: SelectSubset<T, ListItemDeleteArgs<ExtArgs>>): Prisma__ListItemClient<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ListItem.
     * @param {ListItemUpdateArgs} args - Arguments to update one ListItem.
     * @example
     * // Update one ListItem
     * const listItem = await prisma.listItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListItemUpdateArgs>(args: SelectSubset<T, ListItemUpdateArgs<ExtArgs>>): Prisma__ListItemClient<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ListItems.
     * @param {ListItemDeleteManyArgs} args - Arguments to filter ListItems to delete.
     * @example
     * // Delete a few ListItems
     * const { count } = await prisma.listItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListItemDeleteManyArgs>(args?: SelectSubset<T, ListItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ListItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ListItems
     * const listItem = await prisma.listItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListItemUpdateManyArgs>(args: SelectSubset<T, ListItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ListItems and returns the data updated in the database.
     * @param {ListItemUpdateManyAndReturnArgs} args - Arguments to update many ListItems.
     * @example
     * // Update many ListItems
     * const listItem = await prisma.listItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ListItems and only return the `id`
     * const listItemWithIdOnly = await prisma.listItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ListItemUpdateManyAndReturnArgs>(args: SelectSubset<T, ListItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ListItem.
     * @param {ListItemUpsertArgs} args - Arguments to update or create a ListItem.
     * @example
     * // Update or create a ListItem
     * const listItem = await prisma.listItem.upsert({
     *   create: {
     *     // ... data to create a ListItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ListItem we want to update
     *   }
     * })
     */
    upsert<T extends ListItemUpsertArgs>(args: SelectSubset<T, ListItemUpsertArgs<ExtArgs>>): Prisma__ListItemClient<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ListItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListItemCountArgs} args - Arguments to filter ListItems to count.
     * @example
     * // Count the number of ListItems
     * const count = await prisma.listItem.count({
     *   where: {
     *     // ... the filter for the ListItems we want to count
     *   }
     * })
    **/
    count<T extends ListItemCountArgs>(
      args?: Subset<T, ListItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ListItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ListItemAggregateArgs>(args: Subset<T, ListItemAggregateArgs>): Prisma.PrismaPromise<GetListItemAggregateType<T>>

    /**
     * Group by ListItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListItemGroupByArgs} args - Group by arguments.
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
      T extends ListItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListItemGroupByArgs['orderBy'] }
        : { orderBy?: ListItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ListItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ListItem model
   */
  readonly fields: ListItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ListItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    list<T extends ListDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListDefaultArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ListItem model
   */
  interface ListItemFieldRefs {
    readonly id: FieldRef<"ListItem", 'String'>
    readonly listId: FieldRef<"ListItem", 'String'>
    readonly commentId: FieldRef<"ListItem", 'String'>
    readonly videoId: FieldRef<"ListItem", 'String'>
    readonly authorName: FieldRef<"ListItem", 'String'>
    readonly authorThumb: FieldRef<"ListItem", 'String'>
    readonly content: FieldRef<"ListItem", 'String'>
    readonly likeCount: FieldRef<"ListItem", 'String'>
    readonly replyCount: FieldRef<"ListItem", 'String'>
    readonly publishedTime: FieldRef<"ListItem", 'String'>
    readonly createdAt: FieldRef<"ListItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ListItem findUnique
   */
  export type ListItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
    /**
     * Filter, which ListItem to fetch.
     */
    where: ListItemWhereUniqueInput
  }

  /**
   * ListItem findUniqueOrThrow
   */
  export type ListItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
    /**
     * Filter, which ListItem to fetch.
     */
    where: ListItemWhereUniqueInput
  }

  /**
   * ListItem findFirst
   */
  export type ListItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
    /**
     * Filter, which ListItem to fetch.
     */
    where?: ListItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListItems to fetch.
     */
    orderBy?: ListItemOrderByWithRelationInput | ListItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ListItems.
     */
    cursor?: ListItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ListItems.
     */
    distinct?: ListItemScalarFieldEnum | ListItemScalarFieldEnum[]
  }

  /**
   * ListItem findFirstOrThrow
   */
  export type ListItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
    /**
     * Filter, which ListItem to fetch.
     */
    where?: ListItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListItems to fetch.
     */
    orderBy?: ListItemOrderByWithRelationInput | ListItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ListItems.
     */
    cursor?: ListItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ListItems.
     */
    distinct?: ListItemScalarFieldEnum | ListItemScalarFieldEnum[]
  }

  /**
   * ListItem findMany
   */
  export type ListItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
    /**
     * Filter, which ListItems to fetch.
     */
    where?: ListItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListItems to fetch.
     */
    orderBy?: ListItemOrderByWithRelationInput | ListItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ListItems.
     */
    cursor?: ListItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListItems.
     */
    skip?: number
    distinct?: ListItemScalarFieldEnum | ListItemScalarFieldEnum[]
  }

  /**
   * ListItem create
   */
  export type ListItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
    /**
     * The data needed to create a ListItem.
     */
    data: XOR<ListItemCreateInput, ListItemUncheckedCreateInput>
  }

  /**
   * ListItem createMany
   */
  export type ListItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ListItems.
     */
    data: ListItemCreateManyInput | ListItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ListItem createManyAndReturn
   */
  export type ListItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * The data used to create many ListItems.
     */
    data: ListItemCreateManyInput | ListItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ListItem update
   */
  export type ListItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
    /**
     * The data needed to update a ListItem.
     */
    data: XOR<ListItemUpdateInput, ListItemUncheckedUpdateInput>
    /**
     * Choose, which ListItem to update.
     */
    where: ListItemWhereUniqueInput
  }

  /**
   * ListItem updateMany
   */
  export type ListItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ListItems.
     */
    data: XOR<ListItemUpdateManyMutationInput, ListItemUncheckedUpdateManyInput>
    /**
     * Filter which ListItems to update
     */
    where?: ListItemWhereInput
    /**
     * Limit how many ListItems to update.
     */
    limit?: number
  }

  /**
   * ListItem updateManyAndReturn
   */
  export type ListItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * The data used to update ListItems.
     */
    data: XOR<ListItemUpdateManyMutationInput, ListItemUncheckedUpdateManyInput>
    /**
     * Filter which ListItems to update
     */
    where?: ListItemWhereInput
    /**
     * Limit how many ListItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ListItem upsert
   */
  export type ListItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
    /**
     * The filter to search for the ListItem to update in case it exists.
     */
    where: ListItemWhereUniqueInput
    /**
     * In case the ListItem found by the `where` argument doesn't exist, create a new ListItem with this data.
     */
    create: XOR<ListItemCreateInput, ListItemUncheckedCreateInput>
    /**
     * In case the ListItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListItemUpdateInput, ListItemUncheckedUpdateInput>
  }

  /**
   * ListItem delete
   */
  export type ListItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
    /**
     * Filter which ListItem to delete.
     */
    where: ListItemWhereUniqueInput
  }

  /**
   * ListItem deleteMany
   */
  export type ListItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ListItems to delete
     */
    where?: ListItemWhereInput
    /**
     * Limit how many ListItems to delete.
     */
    limit?: number
  }

  /**
   * ListItem without action
   */
  export type ListItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
  }


  /**
   * Model ListFollow
   */

  export type AggregateListFollow = {
    _count: ListFollowCountAggregateOutputType | null
    _min: ListFollowMinAggregateOutputType | null
    _max: ListFollowMaxAggregateOutputType | null
  }

  export type ListFollowMinAggregateOutputType = {
    id: string | null
    userId: string | null
    listId: string | null
    createdAt: Date | null
  }

  export type ListFollowMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    listId: string | null
    createdAt: Date | null
  }

  export type ListFollowCountAggregateOutputType = {
    id: number
    userId: number
    listId: number
    createdAt: number
    _all: number
  }


  export type ListFollowMinAggregateInputType = {
    id?: true
    userId?: true
    listId?: true
    createdAt?: true
  }

  export type ListFollowMaxAggregateInputType = {
    id?: true
    userId?: true
    listId?: true
    createdAt?: true
  }

  export type ListFollowCountAggregateInputType = {
    id?: true
    userId?: true
    listId?: true
    createdAt?: true
    _all?: true
  }

  export type ListFollowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ListFollow to aggregate.
     */
    where?: ListFollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListFollows to fetch.
     */
    orderBy?: ListFollowOrderByWithRelationInput | ListFollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListFollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListFollows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListFollows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ListFollows
    **/
    _count?: true | ListFollowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListFollowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListFollowMaxAggregateInputType
  }

  export type GetListFollowAggregateType<T extends ListFollowAggregateArgs> = {
        [P in keyof T & keyof AggregateListFollow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateListFollow[P]>
      : GetScalarType<T[P], AggregateListFollow[P]>
  }




  export type ListFollowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListFollowWhereInput
    orderBy?: ListFollowOrderByWithAggregationInput | ListFollowOrderByWithAggregationInput[]
    by: ListFollowScalarFieldEnum[] | ListFollowScalarFieldEnum
    having?: ListFollowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListFollowCountAggregateInputType | true
    _min?: ListFollowMinAggregateInputType
    _max?: ListFollowMaxAggregateInputType
  }

  export type ListFollowGroupByOutputType = {
    id: string
    userId: string
    listId: string
    createdAt: Date
    _count: ListFollowCountAggregateOutputType | null
    _min: ListFollowMinAggregateOutputType | null
    _max: ListFollowMaxAggregateOutputType | null
  }

  type GetListFollowGroupByPayload<T extends ListFollowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListFollowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListFollowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListFollowGroupByOutputType[P]>
            : GetScalarType<T[P], ListFollowGroupByOutputType[P]>
        }
      >
    >


  export type ListFollowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    listId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    list?: boolean | ListDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listFollow"]>

  export type ListFollowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    listId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    list?: boolean | ListDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listFollow"]>

  export type ListFollowSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    listId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    list?: boolean | ListDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listFollow"]>

  export type ListFollowSelectScalar = {
    id?: boolean
    userId?: boolean
    listId?: boolean
    createdAt?: boolean
  }

  export type ListFollowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "listId" | "createdAt", ExtArgs["result"]["listFollow"]>
  export type ListFollowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    list?: boolean | ListDefaultArgs<ExtArgs>
  }
  export type ListFollowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    list?: boolean | ListDefaultArgs<ExtArgs>
  }
  export type ListFollowIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    list?: boolean | ListDefaultArgs<ExtArgs>
  }

  export type $ListFollowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ListFollow"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      list: Prisma.$ListPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      listId: string
      createdAt: Date
    }, ExtArgs["result"]["listFollow"]>
    composites: {}
  }

  type ListFollowGetPayload<S extends boolean | null | undefined | ListFollowDefaultArgs> = $Result.GetResult<Prisma.$ListFollowPayload, S>

  type ListFollowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ListFollowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ListFollowCountAggregateInputType | true
    }

  export interface ListFollowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ListFollow'], meta: { name: 'ListFollow' } }
    /**
     * Find zero or one ListFollow that matches the filter.
     * @param {ListFollowFindUniqueArgs} args - Arguments to find a ListFollow
     * @example
     * // Get one ListFollow
     * const listFollow = await prisma.listFollow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListFollowFindUniqueArgs>(args: SelectSubset<T, ListFollowFindUniqueArgs<ExtArgs>>): Prisma__ListFollowClient<$Result.GetResult<Prisma.$ListFollowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ListFollow that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ListFollowFindUniqueOrThrowArgs} args - Arguments to find a ListFollow
     * @example
     * // Get one ListFollow
     * const listFollow = await prisma.listFollow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListFollowFindUniqueOrThrowArgs>(args: SelectSubset<T, ListFollowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListFollowClient<$Result.GetResult<Prisma.$ListFollowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ListFollow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFollowFindFirstArgs} args - Arguments to find a ListFollow
     * @example
     * // Get one ListFollow
     * const listFollow = await prisma.listFollow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListFollowFindFirstArgs>(args?: SelectSubset<T, ListFollowFindFirstArgs<ExtArgs>>): Prisma__ListFollowClient<$Result.GetResult<Prisma.$ListFollowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ListFollow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFollowFindFirstOrThrowArgs} args - Arguments to find a ListFollow
     * @example
     * // Get one ListFollow
     * const listFollow = await prisma.listFollow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListFollowFindFirstOrThrowArgs>(args?: SelectSubset<T, ListFollowFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListFollowClient<$Result.GetResult<Prisma.$ListFollowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ListFollows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFollowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ListFollows
     * const listFollows = await prisma.listFollow.findMany()
     * 
     * // Get first 10 ListFollows
     * const listFollows = await prisma.listFollow.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const listFollowWithIdOnly = await prisma.listFollow.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ListFollowFindManyArgs>(args?: SelectSubset<T, ListFollowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListFollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ListFollow.
     * @param {ListFollowCreateArgs} args - Arguments to create a ListFollow.
     * @example
     * // Create one ListFollow
     * const ListFollow = await prisma.listFollow.create({
     *   data: {
     *     // ... data to create a ListFollow
     *   }
     * })
     * 
     */
    create<T extends ListFollowCreateArgs>(args: SelectSubset<T, ListFollowCreateArgs<ExtArgs>>): Prisma__ListFollowClient<$Result.GetResult<Prisma.$ListFollowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ListFollows.
     * @param {ListFollowCreateManyArgs} args - Arguments to create many ListFollows.
     * @example
     * // Create many ListFollows
     * const listFollow = await prisma.listFollow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListFollowCreateManyArgs>(args?: SelectSubset<T, ListFollowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ListFollows and returns the data saved in the database.
     * @param {ListFollowCreateManyAndReturnArgs} args - Arguments to create many ListFollows.
     * @example
     * // Create many ListFollows
     * const listFollow = await prisma.listFollow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ListFollows and only return the `id`
     * const listFollowWithIdOnly = await prisma.listFollow.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ListFollowCreateManyAndReturnArgs>(args?: SelectSubset<T, ListFollowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListFollowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ListFollow.
     * @param {ListFollowDeleteArgs} args - Arguments to delete one ListFollow.
     * @example
     * // Delete one ListFollow
     * const ListFollow = await prisma.listFollow.delete({
     *   where: {
     *     // ... filter to delete one ListFollow
     *   }
     * })
     * 
     */
    delete<T extends ListFollowDeleteArgs>(args: SelectSubset<T, ListFollowDeleteArgs<ExtArgs>>): Prisma__ListFollowClient<$Result.GetResult<Prisma.$ListFollowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ListFollow.
     * @param {ListFollowUpdateArgs} args - Arguments to update one ListFollow.
     * @example
     * // Update one ListFollow
     * const listFollow = await prisma.listFollow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListFollowUpdateArgs>(args: SelectSubset<T, ListFollowUpdateArgs<ExtArgs>>): Prisma__ListFollowClient<$Result.GetResult<Prisma.$ListFollowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ListFollows.
     * @param {ListFollowDeleteManyArgs} args - Arguments to filter ListFollows to delete.
     * @example
     * // Delete a few ListFollows
     * const { count } = await prisma.listFollow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListFollowDeleteManyArgs>(args?: SelectSubset<T, ListFollowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ListFollows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFollowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ListFollows
     * const listFollow = await prisma.listFollow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListFollowUpdateManyArgs>(args: SelectSubset<T, ListFollowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ListFollows and returns the data updated in the database.
     * @param {ListFollowUpdateManyAndReturnArgs} args - Arguments to update many ListFollows.
     * @example
     * // Update many ListFollows
     * const listFollow = await prisma.listFollow.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ListFollows and only return the `id`
     * const listFollowWithIdOnly = await prisma.listFollow.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ListFollowUpdateManyAndReturnArgs>(args: SelectSubset<T, ListFollowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListFollowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ListFollow.
     * @param {ListFollowUpsertArgs} args - Arguments to update or create a ListFollow.
     * @example
     * // Update or create a ListFollow
     * const listFollow = await prisma.listFollow.upsert({
     *   create: {
     *     // ... data to create a ListFollow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ListFollow we want to update
     *   }
     * })
     */
    upsert<T extends ListFollowUpsertArgs>(args: SelectSubset<T, ListFollowUpsertArgs<ExtArgs>>): Prisma__ListFollowClient<$Result.GetResult<Prisma.$ListFollowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ListFollows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFollowCountArgs} args - Arguments to filter ListFollows to count.
     * @example
     * // Count the number of ListFollows
     * const count = await prisma.listFollow.count({
     *   where: {
     *     // ... the filter for the ListFollows we want to count
     *   }
     * })
    **/
    count<T extends ListFollowCountArgs>(
      args?: Subset<T, ListFollowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListFollowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ListFollow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFollowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ListFollowAggregateArgs>(args: Subset<T, ListFollowAggregateArgs>): Prisma.PrismaPromise<GetListFollowAggregateType<T>>

    /**
     * Group by ListFollow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFollowGroupByArgs} args - Group by arguments.
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
      T extends ListFollowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListFollowGroupByArgs['orderBy'] }
        : { orderBy?: ListFollowGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ListFollowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListFollowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ListFollow model
   */
  readonly fields: ListFollowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ListFollow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListFollowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    list<T extends ListDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListDefaultArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ListFollow model
   */
  interface ListFollowFieldRefs {
    readonly id: FieldRef<"ListFollow", 'String'>
    readonly userId: FieldRef<"ListFollow", 'String'>
    readonly listId: FieldRef<"ListFollow", 'String'>
    readonly createdAt: FieldRef<"ListFollow", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ListFollow findUnique
   */
  export type ListFollowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListFollow
     */
    select?: ListFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListFollow
     */
    omit?: ListFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListFollowInclude<ExtArgs> | null
    /**
     * Filter, which ListFollow to fetch.
     */
    where: ListFollowWhereUniqueInput
  }

  /**
   * ListFollow findUniqueOrThrow
   */
  export type ListFollowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListFollow
     */
    select?: ListFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListFollow
     */
    omit?: ListFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListFollowInclude<ExtArgs> | null
    /**
     * Filter, which ListFollow to fetch.
     */
    where: ListFollowWhereUniqueInput
  }

  /**
   * ListFollow findFirst
   */
  export type ListFollowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListFollow
     */
    select?: ListFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListFollow
     */
    omit?: ListFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListFollowInclude<ExtArgs> | null
    /**
     * Filter, which ListFollow to fetch.
     */
    where?: ListFollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListFollows to fetch.
     */
    orderBy?: ListFollowOrderByWithRelationInput | ListFollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ListFollows.
     */
    cursor?: ListFollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListFollows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListFollows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ListFollows.
     */
    distinct?: ListFollowScalarFieldEnum | ListFollowScalarFieldEnum[]
  }

  /**
   * ListFollow findFirstOrThrow
   */
  export type ListFollowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListFollow
     */
    select?: ListFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListFollow
     */
    omit?: ListFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListFollowInclude<ExtArgs> | null
    /**
     * Filter, which ListFollow to fetch.
     */
    where?: ListFollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListFollows to fetch.
     */
    orderBy?: ListFollowOrderByWithRelationInput | ListFollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ListFollows.
     */
    cursor?: ListFollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListFollows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListFollows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ListFollows.
     */
    distinct?: ListFollowScalarFieldEnum | ListFollowScalarFieldEnum[]
  }

  /**
   * ListFollow findMany
   */
  export type ListFollowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListFollow
     */
    select?: ListFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListFollow
     */
    omit?: ListFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListFollowInclude<ExtArgs> | null
    /**
     * Filter, which ListFollows to fetch.
     */
    where?: ListFollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListFollows to fetch.
     */
    orderBy?: ListFollowOrderByWithRelationInput | ListFollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ListFollows.
     */
    cursor?: ListFollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListFollows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListFollows.
     */
    skip?: number
    distinct?: ListFollowScalarFieldEnum | ListFollowScalarFieldEnum[]
  }

  /**
   * ListFollow create
   */
  export type ListFollowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListFollow
     */
    select?: ListFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListFollow
     */
    omit?: ListFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListFollowInclude<ExtArgs> | null
    /**
     * The data needed to create a ListFollow.
     */
    data: XOR<ListFollowCreateInput, ListFollowUncheckedCreateInput>
  }

  /**
   * ListFollow createMany
   */
  export type ListFollowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ListFollows.
     */
    data: ListFollowCreateManyInput | ListFollowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ListFollow createManyAndReturn
   */
  export type ListFollowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListFollow
     */
    select?: ListFollowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ListFollow
     */
    omit?: ListFollowOmit<ExtArgs> | null
    /**
     * The data used to create many ListFollows.
     */
    data: ListFollowCreateManyInput | ListFollowCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListFollowIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ListFollow update
   */
  export type ListFollowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListFollow
     */
    select?: ListFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListFollow
     */
    omit?: ListFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListFollowInclude<ExtArgs> | null
    /**
     * The data needed to update a ListFollow.
     */
    data: XOR<ListFollowUpdateInput, ListFollowUncheckedUpdateInput>
    /**
     * Choose, which ListFollow to update.
     */
    where: ListFollowWhereUniqueInput
  }

  /**
   * ListFollow updateMany
   */
  export type ListFollowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ListFollows.
     */
    data: XOR<ListFollowUpdateManyMutationInput, ListFollowUncheckedUpdateManyInput>
    /**
     * Filter which ListFollows to update
     */
    where?: ListFollowWhereInput
    /**
     * Limit how many ListFollows to update.
     */
    limit?: number
  }

  /**
   * ListFollow updateManyAndReturn
   */
  export type ListFollowUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListFollow
     */
    select?: ListFollowSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ListFollow
     */
    omit?: ListFollowOmit<ExtArgs> | null
    /**
     * The data used to update ListFollows.
     */
    data: XOR<ListFollowUpdateManyMutationInput, ListFollowUncheckedUpdateManyInput>
    /**
     * Filter which ListFollows to update
     */
    where?: ListFollowWhereInput
    /**
     * Limit how many ListFollows to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListFollowIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ListFollow upsert
   */
  export type ListFollowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListFollow
     */
    select?: ListFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListFollow
     */
    omit?: ListFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListFollowInclude<ExtArgs> | null
    /**
     * The filter to search for the ListFollow to update in case it exists.
     */
    where: ListFollowWhereUniqueInput
    /**
     * In case the ListFollow found by the `where` argument doesn't exist, create a new ListFollow with this data.
     */
    create: XOR<ListFollowCreateInput, ListFollowUncheckedCreateInput>
    /**
     * In case the ListFollow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListFollowUpdateInput, ListFollowUncheckedUpdateInput>
  }

  /**
   * ListFollow delete
   */
  export type ListFollowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListFollow
     */
    select?: ListFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListFollow
     */
    omit?: ListFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListFollowInclude<ExtArgs> | null
    /**
     * Filter which ListFollow to delete.
     */
    where: ListFollowWhereUniqueInput
  }

  /**
   * ListFollow deleteMany
   */
  export type ListFollowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ListFollows to delete
     */
    where?: ListFollowWhereInput
    /**
     * Limit how many ListFollows to delete.
     */
    limit?: number
  }

  /**
   * ListFollow without action
   */
  export type ListFollowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListFollow
     */
    select?: ListFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListFollow
     */
    omit?: ListFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListFollowInclude<ExtArgs> | null
  }


  /**
   * Model BookmarkFolder
   */

  export type AggregateBookmarkFolder = {
    _count: BookmarkFolderCountAggregateOutputType | null
    _min: BookmarkFolderMinAggregateOutputType | null
    _max: BookmarkFolderMaxAggregateOutputType | null
  }

  export type BookmarkFolderMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type BookmarkFolderMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type BookmarkFolderCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    createdAt: number
    _all: number
  }


  export type BookmarkFolderMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    createdAt?: true
  }

  export type BookmarkFolderMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    createdAt?: true
  }

  export type BookmarkFolderCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type BookmarkFolderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookmarkFolder to aggregate.
     */
    where?: BookmarkFolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookmarkFolders to fetch.
     */
    orderBy?: BookmarkFolderOrderByWithRelationInput | BookmarkFolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookmarkFolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookmarkFolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookmarkFolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BookmarkFolders
    **/
    _count?: true | BookmarkFolderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookmarkFolderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookmarkFolderMaxAggregateInputType
  }

  export type GetBookmarkFolderAggregateType<T extends BookmarkFolderAggregateArgs> = {
        [P in keyof T & keyof AggregateBookmarkFolder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookmarkFolder[P]>
      : GetScalarType<T[P], AggregateBookmarkFolder[P]>
  }




  export type BookmarkFolderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookmarkFolderWhereInput
    orderBy?: BookmarkFolderOrderByWithAggregationInput | BookmarkFolderOrderByWithAggregationInput[]
    by: BookmarkFolderScalarFieldEnum[] | BookmarkFolderScalarFieldEnum
    having?: BookmarkFolderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookmarkFolderCountAggregateInputType | true
    _min?: BookmarkFolderMinAggregateInputType
    _max?: BookmarkFolderMaxAggregateInputType
  }

  export type BookmarkFolderGroupByOutputType = {
    id: string
    userId: string
    name: string
    createdAt: Date
    _count: BookmarkFolderCountAggregateOutputType | null
    _min: BookmarkFolderMinAggregateOutputType | null
    _max: BookmarkFolderMaxAggregateOutputType | null
  }

  type GetBookmarkFolderGroupByPayload<T extends BookmarkFolderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookmarkFolderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookmarkFolderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookmarkFolderGroupByOutputType[P]>
            : GetScalarType<T[P], BookmarkFolderGroupByOutputType[P]>
        }
      >
    >


  export type BookmarkFolderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    bookmarks?: boolean | BookmarkFolder$bookmarksArgs<ExtArgs>
    _count?: boolean | BookmarkFolderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookmarkFolder"]>

  export type BookmarkFolderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookmarkFolder"]>

  export type BookmarkFolderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookmarkFolder"]>

  export type BookmarkFolderSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type BookmarkFolderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "createdAt", ExtArgs["result"]["bookmarkFolder"]>
  export type BookmarkFolderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    bookmarks?: boolean | BookmarkFolder$bookmarksArgs<ExtArgs>
    _count?: boolean | BookmarkFolderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BookmarkFolderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BookmarkFolderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BookmarkFolderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BookmarkFolder"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      bookmarks: Prisma.$BookmarkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["bookmarkFolder"]>
    composites: {}
  }

  type BookmarkFolderGetPayload<S extends boolean | null | undefined | BookmarkFolderDefaultArgs> = $Result.GetResult<Prisma.$BookmarkFolderPayload, S>

  type BookmarkFolderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookmarkFolderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookmarkFolderCountAggregateInputType | true
    }

  export interface BookmarkFolderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BookmarkFolder'], meta: { name: 'BookmarkFolder' } }
    /**
     * Find zero or one BookmarkFolder that matches the filter.
     * @param {BookmarkFolderFindUniqueArgs} args - Arguments to find a BookmarkFolder
     * @example
     * // Get one BookmarkFolder
     * const bookmarkFolder = await prisma.bookmarkFolder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookmarkFolderFindUniqueArgs>(args: SelectSubset<T, BookmarkFolderFindUniqueArgs<ExtArgs>>): Prisma__BookmarkFolderClient<$Result.GetResult<Prisma.$BookmarkFolderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BookmarkFolder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookmarkFolderFindUniqueOrThrowArgs} args - Arguments to find a BookmarkFolder
     * @example
     * // Get one BookmarkFolder
     * const bookmarkFolder = await prisma.bookmarkFolder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookmarkFolderFindUniqueOrThrowArgs>(args: SelectSubset<T, BookmarkFolderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookmarkFolderClient<$Result.GetResult<Prisma.$BookmarkFolderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookmarkFolder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFolderFindFirstArgs} args - Arguments to find a BookmarkFolder
     * @example
     * // Get one BookmarkFolder
     * const bookmarkFolder = await prisma.bookmarkFolder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookmarkFolderFindFirstArgs>(args?: SelectSubset<T, BookmarkFolderFindFirstArgs<ExtArgs>>): Prisma__BookmarkFolderClient<$Result.GetResult<Prisma.$BookmarkFolderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BookmarkFolder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFolderFindFirstOrThrowArgs} args - Arguments to find a BookmarkFolder
     * @example
     * // Get one BookmarkFolder
     * const bookmarkFolder = await prisma.bookmarkFolder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookmarkFolderFindFirstOrThrowArgs>(args?: SelectSubset<T, BookmarkFolderFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookmarkFolderClient<$Result.GetResult<Prisma.$BookmarkFolderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BookmarkFolders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFolderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BookmarkFolders
     * const bookmarkFolders = await prisma.bookmarkFolder.findMany()
     * 
     * // Get first 10 BookmarkFolders
     * const bookmarkFolders = await prisma.bookmarkFolder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookmarkFolderWithIdOnly = await prisma.bookmarkFolder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookmarkFolderFindManyArgs>(args?: SelectSubset<T, BookmarkFolderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkFolderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BookmarkFolder.
     * @param {BookmarkFolderCreateArgs} args - Arguments to create a BookmarkFolder.
     * @example
     * // Create one BookmarkFolder
     * const BookmarkFolder = await prisma.bookmarkFolder.create({
     *   data: {
     *     // ... data to create a BookmarkFolder
     *   }
     * })
     * 
     */
    create<T extends BookmarkFolderCreateArgs>(args: SelectSubset<T, BookmarkFolderCreateArgs<ExtArgs>>): Prisma__BookmarkFolderClient<$Result.GetResult<Prisma.$BookmarkFolderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BookmarkFolders.
     * @param {BookmarkFolderCreateManyArgs} args - Arguments to create many BookmarkFolders.
     * @example
     * // Create many BookmarkFolders
     * const bookmarkFolder = await prisma.bookmarkFolder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookmarkFolderCreateManyArgs>(args?: SelectSubset<T, BookmarkFolderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BookmarkFolders and returns the data saved in the database.
     * @param {BookmarkFolderCreateManyAndReturnArgs} args - Arguments to create many BookmarkFolders.
     * @example
     * // Create many BookmarkFolders
     * const bookmarkFolder = await prisma.bookmarkFolder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BookmarkFolders and only return the `id`
     * const bookmarkFolderWithIdOnly = await prisma.bookmarkFolder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookmarkFolderCreateManyAndReturnArgs>(args?: SelectSubset<T, BookmarkFolderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkFolderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BookmarkFolder.
     * @param {BookmarkFolderDeleteArgs} args - Arguments to delete one BookmarkFolder.
     * @example
     * // Delete one BookmarkFolder
     * const BookmarkFolder = await prisma.bookmarkFolder.delete({
     *   where: {
     *     // ... filter to delete one BookmarkFolder
     *   }
     * })
     * 
     */
    delete<T extends BookmarkFolderDeleteArgs>(args: SelectSubset<T, BookmarkFolderDeleteArgs<ExtArgs>>): Prisma__BookmarkFolderClient<$Result.GetResult<Prisma.$BookmarkFolderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BookmarkFolder.
     * @param {BookmarkFolderUpdateArgs} args - Arguments to update one BookmarkFolder.
     * @example
     * // Update one BookmarkFolder
     * const bookmarkFolder = await prisma.bookmarkFolder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookmarkFolderUpdateArgs>(args: SelectSubset<T, BookmarkFolderUpdateArgs<ExtArgs>>): Prisma__BookmarkFolderClient<$Result.GetResult<Prisma.$BookmarkFolderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BookmarkFolders.
     * @param {BookmarkFolderDeleteManyArgs} args - Arguments to filter BookmarkFolders to delete.
     * @example
     * // Delete a few BookmarkFolders
     * const { count } = await prisma.bookmarkFolder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookmarkFolderDeleteManyArgs>(args?: SelectSubset<T, BookmarkFolderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookmarkFolders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFolderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BookmarkFolders
     * const bookmarkFolder = await prisma.bookmarkFolder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookmarkFolderUpdateManyArgs>(args: SelectSubset<T, BookmarkFolderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookmarkFolders and returns the data updated in the database.
     * @param {BookmarkFolderUpdateManyAndReturnArgs} args - Arguments to update many BookmarkFolders.
     * @example
     * // Update many BookmarkFolders
     * const bookmarkFolder = await prisma.bookmarkFolder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BookmarkFolders and only return the `id`
     * const bookmarkFolderWithIdOnly = await prisma.bookmarkFolder.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookmarkFolderUpdateManyAndReturnArgs>(args: SelectSubset<T, BookmarkFolderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkFolderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BookmarkFolder.
     * @param {BookmarkFolderUpsertArgs} args - Arguments to update or create a BookmarkFolder.
     * @example
     * // Update or create a BookmarkFolder
     * const bookmarkFolder = await prisma.bookmarkFolder.upsert({
     *   create: {
     *     // ... data to create a BookmarkFolder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BookmarkFolder we want to update
     *   }
     * })
     */
    upsert<T extends BookmarkFolderUpsertArgs>(args: SelectSubset<T, BookmarkFolderUpsertArgs<ExtArgs>>): Prisma__BookmarkFolderClient<$Result.GetResult<Prisma.$BookmarkFolderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BookmarkFolders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFolderCountArgs} args - Arguments to filter BookmarkFolders to count.
     * @example
     * // Count the number of BookmarkFolders
     * const count = await prisma.bookmarkFolder.count({
     *   where: {
     *     // ... the filter for the BookmarkFolders we want to count
     *   }
     * })
    **/
    count<T extends BookmarkFolderCountArgs>(
      args?: Subset<T, BookmarkFolderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookmarkFolderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BookmarkFolder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFolderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BookmarkFolderAggregateArgs>(args: Subset<T, BookmarkFolderAggregateArgs>): Prisma.PrismaPromise<GetBookmarkFolderAggregateType<T>>

    /**
     * Group by BookmarkFolder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFolderGroupByArgs} args - Group by arguments.
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
      T extends BookmarkFolderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookmarkFolderGroupByArgs['orderBy'] }
        : { orderBy?: BookmarkFolderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, BookmarkFolderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookmarkFolderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BookmarkFolder model
   */
  readonly fields: BookmarkFolderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BookmarkFolder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookmarkFolderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    bookmarks<T extends BookmarkFolder$bookmarksArgs<ExtArgs> = {}>(args?: Subset<T, BookmarkFolder$bookmarksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BookmarkFolder model
   */
  interface BookmarkFolderFieldRefs {
    readonly id: FieldRef<"BookmarkFolder", 'String'>
    readonly userId: FieldRef<"BookmarkFolder", 'String'>
    readonly name: FieldRef<"BookmarkFolder", 'String'>
    readonly createdAt: FieldRef<"BookmarkFolder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BookmarkFolder findUnique
   */
  export type BookmarkFolderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookmarkFolder
     */
    select?: BookmarkFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookmarkFolder
     */
    omit?: BookmarkFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkFolderInclude<ExtArgs> | null
    /**
     * Filter, which BookmarkFolder to fetch.
     */
    where: BookmarkFolderWhereUniqueInput
  }

  /**
   * BookmarkFolder findUniqueOrThrow
   */
  export type BookmarkFolderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookmarkFolder
     */
    select?: BookmarkFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookmarkFolder
     */
    omit?: BookmarkFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkFolderInclude<ExtArgs> | null
    /**
     * Filter, which BookmarkFolder to fetch.
     */
    where: BookmarkFolderWhereUniqueInput
  }

  /**
   * BookmarkFolder findFirst
   */
  export type BookmarkFolderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookmarkFolder
     */
    select?: BookmarkFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookmarkFolder
     */
    omit?: BookmarkFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkFolderInclude<ExtArgs> | null
    /**
     * Filter, which BookmarkFolder to fetch.
     */
    where?: BookmarkFolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookmarkFolders to fetch.
     */
    orderBy?: BookmarkFolderOrderByWithRelationInput | BookmarkFolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookmarkFolders.
     */
    cursor?: BookmarkFolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookmarkFolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookmarkFolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookmarkFolders.
     */
    distinct?: BookmarkFolderScalarFieldEnum | BookmarkFolderScalarFieldEnum[]
  }

  /**
   * BookmarkFolder findFirstOrThrow
   */
  export type BookmarkFolderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookmarkFolder
     */
    select?: BookmarkFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookmarkFolder
     */
    omit?: BookmarkFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkFolderInclude<ExtArgs> | null
    /**
     * Filter, which BookmarkFolder to fetch.
     */
    where?: BookmarkFolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookmarkFolders to fetch.
     */
    orderBy?: BookmarkFolderOrderByWithRelationInput | BookmarkFolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookmarkFolders.
     */
    cursor?: BookmarkFolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookmarkFolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookmarkFolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookmarkFolders.
     */
    distinct?: BookmarkFolderScalarFieldEnum | BookmarkFolderScalarFieldEnum[]
  }

  /**
   * BookmarkFolder findMany
   */
  export type BookmarkFolderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookmarkFolder
     */
    select?: BookmarkFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookmarkFolder
     */
    omit?: BookmarkFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkFolderInclude<ExtArgs> | null
    /**
     * Filter, which BookmarkFolders to fetch.
     */
    where?: BookmarkFolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookmarkFolders to fetch.
     */
    orderBy?: BookmarkFolderOrderByWithRelationInput | BookmarkFolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BookmarkFolders.
     */
    cursor?: BookmarkFolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookmarkFolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookmarkFolders.
     */
    skip?: number
    distinct?: BookmarkFolderScalarFieldEnum | BookmarkFolderScalarFieldEnum[]
  }

  /**
   * BookmarkFolder create
   */
  export type BookmarkFolderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookmarkFolder
     */
    select?: BookmarkFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookmarkFolder
     */
    omit?: BookmarkFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkFolderInclude<ExtArgs> | null
    /**
     * The data needed to create a BookmarkFolder.
     */
    data: XOR<BookmarkFolderCreateInput, BookmarkFolderUncheckedCreateInput>
  }

  /**
   * BookmarkFolder createMany
   */
  export type BookmarkFolderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BookmarkFolders.
     */
    data: BookmarkFolderCreateManyInput | BookmarkFolderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BookmarkFolder createManyAndReturn
   */
  export type BookmarkFolderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookmarkFolder
     */
    select?: BookmarkFolderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookmarkFolder
     */
    omit?: BookmarkFolderOmit<ExtArgs> | null
    /**
     * The data used to create many BookmarkFolders.
     */
    data: BookmarkFolderCreateManyInput | BookmarkFolderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkFolderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookmarkFolder update
   */
  export type BookmarkFolderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookmarkFolder
     */
    select?: BookmarkFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookmarkFolder
     */
    omit?: BookmarkFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkFolderInclude<ExtArgs> | null
    /**
     * The data needed to update a BookmarkFolder.
     */
    data: XOR<BookmarkFolderUpdateInput, BookmarkFolderUncheckedUpdateInput>
    /**
     * Choose, which BookmarkFolder to update.
     */
    where: BookmarkFolderWhereUniqueInput
  }

  /**
   * BookmarkFolder updateMany
   */
  export type BookmarkFolderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BookmarkFolders.
     */
    data: XOR<BookmarkFolderUpdateManyMutationInput, BookmarkFolderUncheckedUpdateManyInput>
    /**
     * Filter which BookmarkFolders to update
     */
    where?: BookmarkFolderWhereInput
    /**
     * Limit how many BookmarkFolders to update.
     */
    limit?: number
  }

  /**
   * BookmarkFolder updateManyAndReturn
   */
  export type BookmarkFolderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookmarkFolder
     */
    select?: BookmarkFolderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BookmarkFolder
     */
    omit?: BookmarkFolderOmit<ExtArgs> | null
    /**
     * The data used to update BookmarkFolders.
     */
    data: XOR<BookmarkFolderUpdateManyMutationInput, BookmarkFolderUncheckedUpdateManyInput>
    /**
     * Filter which BookmarkFolders to update
     */
    where?: BookmarkFolderWhereInput
    /**
     * Limit how many BookmarkFolders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkFolderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookmarkFolder upsert
   */
  export type BookmarkFolderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookmarkFolder
     */
    select?: BookmarkFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookmarkFolder
     */
    omit?: BookmarkFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkFolderInclude<ExtArgs> | null
    /**
     * The filter to search for the BookmarkFolder to update in case it exists.
     */
    where: BookmarkFolderWhereUniqueInput
    /**
     * In case the BookmarkFolder found by the `where` argument doesn't exist, create a new BookmarkFolder with this data.
     */
    create: XOR<BookmarkFolderCreateInput, BookmarkFolderUncheckedCreateInput>
    /**
     * In case the BookmarkFolder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookmarkFolderUpdateInput, BookmarkFolderUncheckedUpdateInput>
  }

  /**
   * BookmarkFolder delete
   */
  export type BookmarkFolderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookmarkFolder
     */
    select?: BookmarkFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookmarkFolder
     */
    omit?: BookmarkFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkFolderInclude<ExtArgs> | null
    /**
     * Filter which BookmarkFolder to delete.
     */
    where: BookmarkFolderWhereUniqueInput
  }

  /**
   * BookmarkFolder deleteMany
   */
  export type BookmarkFolderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookmarkFolders to delete
     */
    where?: BookmarkFolderWhereInput
    /**
     * Limit how many BookmarkFolders to delete.
     */
    limit?: number
  }

  /**
   * BookmarkFolder.bookmarks
   */
  export type BookmarkFolder$bookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    where?: BookmarkWhereInput
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    cursor?: BookmarkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * BookmarkFolder without action
   */
  export type BookmarkFolderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookmarkFolder
     */
    select?: BookmarkFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BookmarkFolder
     */
    omit?: BookmarkFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkFolderInclude<ExtArgs> | null
  }


  /**
   * Model BlockedUser
   */

  export type AggregateBlockedUser = {
    _count: BlockedUserCountAggregateOutputType | null
    _min: BlockedUserMinAggregateOutputType | null
    _max: BlockedUserMaxAggregateOutputType | null
  }

  export type BlockedUserMinAggregateOutputType = {
    id: string | null
    userId: string | null
    channelId: string | null
    channelName: string | null
    createdAt: Date | null
  }

  export type BlockedUserMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    channelId: string | null
    channelName: string | null
    createdAt: Date | null
  }

  export type BlockedUserCountAggregateOutputType = {
    id: number
    userId: number
    channelId: number
    channelName: number
    createdAt: number
    _all: number
  }


  export type BlockedUserMinAggregateInputType = {
    id?: true
    userId?: true
    channelId?: true
    channelName?: true
    createdAt?: true
  }

  export type BlockedUserMaxAggregateInputType = {
    id?: true
    userId?: true
    channelId?: true
    channelName?: true
    createdAt?: true
  }

  export type BlockedUserCountAggregateInputType = {
    id?: true
    userId?: true
    channelId?: true
    channelName?: true
    createdAt?: true
    _all?: true
  }

  export type BlockedUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlockedUser to aggregate.
     */
    where?: BlockedUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlockedUsers to fetch.
     */
    orderBy?: BlockedUserOrderByWithRelationInput | BlockedUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlockedUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlockedUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlockedUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BlockedUsers
    **/
    _count?: true | BlockedUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlockedUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlockedUserMaxAggregateInputType
  }

  export type GetBlockedUserAggregateType<T extends BlockedUserAggregateArgs> = {
        [P in keyof T & keyof AggregateBlockedUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlockedUser[P]>
      : GetScalarType<T[P], AggregateBlockedUser[P]>
  }




  export type BlockedUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlockedUserWhereInput
    orderBy?: BlockedUserOrderByWithAggregationInput | BlockedUserOrderByWithAggregationInput[]
    by: BlockedUserScalarFieldEnum[] | BlockedUserScalarFieldEnum
    having?: BlockedUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlockedUserCountAggregateInputType | true
    _min?: BlockedUserMinAggregateInputType
    _max?: BlockedUserMaxAggregateInputType
  }

  export type BlockedUserGroupByOutputType = {
    id: string
    userId: string
    channelId: string
    channelName: string | null
    createdAt: Date
    _count: BlockedUserCountAggregateOutputType | null
    _min: BlockedUserMinAggregateOutputType | null
    _max: BlockedUserMaxAggregateOutputType | null
  }

  type GetBlockedUserGroupByPayload<T extends BlockedUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlockedUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlockedUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlockedUserGroupByOutputType[P]>
            : GetScalarType<T[P], BlockedUserGroupByOutputType[P]>
        }
      >
    >


  export type BlockedUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    channelId?: boolean
    channelName?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blockedUser"]>

  export type BlockedUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    channelId?: boolean
    channelName?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blockedUser"]>

  export type BlockedUserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    channelId?: boolean
    channelName?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blockedUser"]>

  export type BlockedUserSelectScalar = {
    id?: boolean
    userId?: boolean
    channelId?: boolean
    channelName?: boolean
    createdAt?: boolean
  }

  export type BlockedUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "channelId" | "channelName" | "createdAt", ExtArgs["result"]["blockedUser"]>
  export type BlockedUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BlockedUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BlockedUserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BlockedUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BlockedUser"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      channelId: string
      channelName: string | null
      createdAt: Date
    }, ExtArgs["result"]["blockedUser"]>
    composites: {}
  }

  type BlockedUserGetPayload<S extends boolean | null | undefined | BlockedUserDefaultArgs> = $Result.GetResult<Prisma.$BlockedUserPayload, S>

  type BlockedUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlockedUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlockedUserCountAggregateInputType | true
    }

  export interface BlockedUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BlockedUser'], meta: { name: 'BlockedUser' } }
    /**
     * Find zero or one BlockedUser that matches the filter.
     * @param {BlockedUserFindUniqueArgs} args - Arguments to find a BlockedUser
     * @example
     * // Get one BlockedUser
     * const blockedUser = await prisma.blockedUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlockedUserFindUniqueArgs>(args: SelectSubset<T, BlockedUserFindUniqueArgs<ExtArgs>>): Prisma__BlockedUserClient<$Result.GetResult<Prisma.$BlockedUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BlockedUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlockedUserFindUniqueOrThrowArgs} args - Arguments to find a BlockedUser
     * @example
     * // Get one BlockedUser
     * const blockedUser = await prisma.blockedUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlockedUserFindUniqueOrThrowArgs>(args: SelectSubset<T, BlockedUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlockedUserClient<$Result.GetResult<Prisma.$BlockedUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlockedUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockedUserFindFirstArgs} args - Arguments to find a BlockedUser
     * @example
     * // Get one BlockedUser
     * const blockedUser = await prisma.blockedUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlockedUserFindFirstArgs>(args?: SelectSubset<T, BlockedUserFindFirstArgs<ExtArgs>>): Prisma__BlockedUserClient<$Result.GetResult<Prisma.$BlockedUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlockedUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockedUserFindFirstOrThrowArgs} args - Arguments to find a BlockedUser
     * @example
     * // Get one BlockedUser
     * const blockedUser = await prisma.blockedUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlockedUserFindFirstOrThrowArgs>(args?: SelectSubset<T, BlockedUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlockedUserClient<$Result.GetResult<Prisma.$BlockedUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BlockedUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockedUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BlockedUsers
     * const blockedUsers = await prisma.blockedUser.findMany()
     * 
     * // Get first 10 BlockedUsers
     * const blockedUsers = await prisma.blockedUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blockedUserWithIdOnly = await prisma.blockedUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlockedUserFindManyArgs>(args?: SelectSubset<T, BlockedUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockedUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BlockedUser.
     * @param {BlockedUserCreateArgs} args - Arguments to create a BlockedUser.
     * @example
     * // Create one BlockedUser
     * const BlockedUser = await prisma.blockedUser.create({
     *   data: {
     *     // ... data to create a BlockedUser
     *   }
     * })
     * 
     */
    create<T extends BlockedUserCreateArgs>(args: SelectSubset<T, BlockedUserCreateArgs<ExtArgs>>): Prisma__BlockedUserClient<$Result.GetResult<Prisma.$BlockedUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BlockedUsers.
     * @param {BlockedUserCreateManyArgs} args - Arguments to create many BlockedUsers.
     * @example
     * // Create many BlockedUsers
     * const blockedUser = await prisma.blockedUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlockedUserCreateManyArgs>(args?: SelectSubset<T, BlockedUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BlockedUsers and returns the data saved in the database.
     * @param {BlockedUserCreateManyAndReturnArgs} args - Arguments to create many BlockedUsers.
     * @example
     * // Create many BlockedUsers
     * const blockedUser = await prisma.blockedUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BlockedUsers and only return the `id`
     * const blockedUserWithIdOnly = await prisma.blockedUser.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BlockedUserCreateManyAndReturnArgs>(args?: SelectSubset<T, BlockedUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockedUserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BlockedUser.
     * @param {BlockedUserDeleteArgs} args - Arguments to delete one BlockedUser.
     * @example
     * // Delete one BlockedUser
     * const BlockedUser = await prisma.blockedUser.delete({
     *   where: {
     *     // ... filter to delete one BlockedUser
     *   }
     * })
     * 
     */
    delete<T extends BlockedUserDeleteArgs>(args: SelectSubset<T, BlockedUserDeleteArgs<ExtArgs>>): Prisma__BlockedUserClient<$Result.GetResult<Prisma.$BlockedUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BlockedUser.
     * @param {BlockedUserUpdateArgs} args - Arguments to update one BlockedUser.
     * @example
     * // Update one BlockedUser
     * const blockedUser = await prisma.blockedUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlockedUserUpdateArgs>(args: SelectSubset<T, BlockedUserUpdateArgs<ExtArgs>>): Prisma__BlockedUserClient<$Result.GetResult<Prisma.$BlockedUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BlockedUsers.
     * @param {BlockedUserDeleteManyArgs} args - Arguments to filter BlockedUsers to delete.
     * @example
     * // Delete a few BlockedUsers
     * const { count } = await prisma.blockedUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlockedUserDeleteManyArgs>(args?: SelectSubset<T, BlockedUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlockedUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockedUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BlockedUsers
     * const blockedUser = await prisma.blockedUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlockedUserUpdateManyArgs>(args: SelectSubset<T, BlockedUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlockedUsers and returns the data updated in the database.
     * @param {BlockedUserUpdateManyAndReturnArgs} args - Arguments to update many BlockedUsers.
     * @example
     * // Update many BlockedUsers
     * const blockedUser = await prisma.blockedUser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BlockedUsers and only return the `id`
     * const blockedUserWithIdOnly = await prisma.blockedUser.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BlockedUserUpdateManyAndReturnArgs>(args: SelectSubset<T, BlockedUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockedUserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BlockedUser.
     * @param {BlockedUserUpsertArgs} args - Arguments to update or create a BlockedUser.
     * @example
     * // Update or create a BlockedUser
     * const blockedUser = await prisma.blockedUser.upsert({
     *   create: {
     *     // ... data to create a BlockedUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BlockedUser we want to update
     *   }
     * })
     */
    upsert<T extends BlockedUserUpsertArgs>(args: SelectSubset<T, BlockedUserUpsertArgs<ExtArgs>>): Prisma__BlockedUserClient<$Result.GetResult<Prisma.$BlockedUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BlockedUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockedUserCountArgs} args - Arguments to filter BlockedUsers to count.
     * @example
     * // Count the number of BlockedUsers
     * const count = await prisma.blockedUser.count({
     *   where: {
     *     // ... the filter for the BlockedUsers we want to count
     *   }
     * })
    **/
    count<T extends BlockedUserCountArgs>(
      args?: Subset<T, BlockedUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlockedUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BlockedUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockedUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BlockedUserAggregateArgs>(args: Subset<T, BlockedUserAggregateArgs>): Prisma.PrismaPromise<GetBlockedUserAggregateType<T>>

    /**
     * Group by BlockedUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockedUserGroupByArgs} args - Group by arguments.
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
      T extends BlockedUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlockedUserGroupByArgs['orderBy'] }
        : { orderBy?: BlockedUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, BlockedUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlockedUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BlockedUser model
   */
  readonly fields: BlockedUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BlockedUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlockedUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BlockedUser model
   */
  interface BlockedUserFieldRefs {
    readonly id: FieldRef<"BlockedUser", 'String'>
    readonly userId: FieldRef<"BlockedUser", 'String'>
    readonly channelId: FieldRef<"BlockedUser", 'String'>
    readonly channelName: FieldRef<"BlockedUser", 'String'>
    readonly createdAt: FieldRef<"BlockedUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BlockedUser findUnique
   */
  export type BlockedUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockedUser
     */
    select?: BlockedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockedUser
     */
    omit?: BlockedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockedUserInclude<ExtArgs> | null
    /**
     * Filter, which BlockedUser to fetch.
     */
    where: BlockedUserWhereUniqueInput
  }

  /**
   * BlockedUser findUniqueOrThrow
   */
  export type BlockedUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockedUser
     */
    select?: BlockedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockedUser
     */
    omit?: BlockedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockedUserInclude<ExtArgs> | null
    /**
     * Filter, which BlockedUser to fetch.
     */
    where: BlockedUserWhereUniqueInput
  }

  /**
   * BlockedUser findFirst
   */
  export type BlockedUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockedUser
     */
    select?: BlockedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockedUser
     */
    omit?: BlockedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockedUserInclude<ExtArgs> | null
    /**
     * Filter, which BlockedUser to fetch.
     */
    where?: BlockedUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlockedUsers to fetch.
     */
    orderBy?: BlockedUserOrderByWithRelationInput | BlockedUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlockedUsers.
     */
    cursor?: BlockedUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlockedUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlockedUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlockedUsers.
     */
    distinct?: BlockedUserScalarFieldEnum | BlockedUserScalarFieldEnum[]
  }

  /**
   * BlockedUser findFirstOrThrow
   */
  export type BlockedUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockedUser
     */
    select?: BlockedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockedUser
     */
    omit?: BlockedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockedUserInclude<ExtArgs> | null
    /**
     * Filter, which BlockedUser to fetch.
     */
    where?: BlockedUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlockedUsers to fetch.
     */
    orderBy?: BlockedUserOrderByWithRelationInput | BlockedUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlockedUsers.
     */
    cursor?: BlockedUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlockedUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlockedUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlockedUsers.
     */
    distinct?: BlockedUserScalarFieldEnum | BlockedUserScalarFieldEnum[]
  }

  /**
   * BlockedUser findMany
   */
  export type BlockedUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockedUser
     */
    select?: BlockedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockedUser
     */
    omit?: BlockedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockedUserInclude<ExtArgs> | null
    /**
     * Filter, which BlockedUsers to fetch.
     */
    where?: BlockedUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlockedUsers to fetch.
     */
    orderBy?: BlockedUserOrderByWithRelationInput | BlockedUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BlockedUsers.
     */
    cursor?: BlockedUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlockedUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlockedUsers.
     */
    skip?: number
    distinct?: BlockedUserScalarFieldEnum | BlockedUserScalarFieldEnum[]
  }

  /**
   * BlockedUser create
   */
  export type BlockedUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockedUser
     */
    select?: BlockedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockedUser
     */
    omit?: BlockedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockedUserInclude<ExtArgs> | null
    /**
     * The data needed to create a BlockedUser.
     */
    data: XOR<BlockedUserCreateInput, BlockedUserUncheckedCreateInput>
  }

  /**
   * BlockedUser createMany
   */
  export type BlockedUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BlockedUsers.
     */
    data: BlockedUserCreateManyInput | BlockedUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlockedUser createManyAndReturn
   */
  export type BlockedUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockedUser
     */
    select?: BlockedUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BlockedUser
     */
    omit?: BlockedUserOmit<ExtArgs> | null
    /**
     * The data used to create many BlockedUsers.
     */
    data: BlockedUserCreateManyInput | BlockedUserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockedUserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BlockedUser update
   */
  export type BlockedUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockedUser
     */
    select?: BlockedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockedUser
     */
    omit?: BlockedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockedUserInclude<ExtArgs> | null
    /**
     * The data needed to update a BlockedUser.
     */
    data: XOR<BlockedUserUpdateInput, BlockedUserUncheckedUpdateInput>
    /**
     * Choose, which BlockedUser to update.
     */
    where: BlockedUserWhereUniqueInput
  }

  /**
   * BlockedUser updateMany
   */
  export type BlockedUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BlockedUsers.
     */
    data: XOR<BlockedUserUpdateManyMutationInput, BlockedUserUncheckedUpdateManyInput>
    /**
     * Filter which BlockedUsers to update
     */
    where?: BlockedUserWhereInput
    /**
     * Limit how many BlockedUsers to update.
     */
    limit?: number
  }

  /**
   * BlockedUser updateManyAndReturn
   */
  export type BlockedUserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockedUser
     */
    select?: BlockedUserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BlockedUser
     */
    omit?: BlockedUserOmit<ExtArgs> | null
    /**
     * The data used to update BlockedUsers.
     */
    data: XOR<BlockedUserUpdateManyMutationInput, BlockedUserUncheckedUpdateManyInput>
    /**
     * Filter which BlockedUsers to update
     */
    where?: BlockedUserWhereInput
    /**
     * Limit how many BlockedUsers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockedUserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BlockedUser upsert
   */
  export type BlockedUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockedUser
     */
    select?: BlockedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockedUser
     */
    omit?: BlockedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockedUserInclude<ExtArgs> | null
    /**
     * The filter to search for the BlockedUser to update in case it exists.
     */
    where: BlockedUserWhereUniqueInput
    /**
     * In case the BlockedUser found by the `where` argument doesn't exist, create a new BlockedUser with this data.
     */
    create: XOR<BlockedUserCreateInput, BlockedUserUncheckedCreateInput>
    /**
     * In case the BlockedUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlockedUserUpdateInput, BlockedUserUncheckedUpdateInput>
  }

  /**
   * BlockedUser delete
   */
  export type BlockedUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockedUser
     */
    select?: BlockedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockedUser
     */
    omit?: BlockedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockedUserInclude<ExtArgs> | null
    /**
     * Filter which BlockedUser to delete.
     */
    where: BlockedUserWhereUniqueInput
  }

  /**
   * BlockedUser deleteMany
   */
  export type BlockedUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlockedUsers to delete
     */
    where?: BlockedUserWhereInput
    /**
     * Limit how many BlockedUsers to delete.
     */
    limit?: number
  }

  /**
   * BlockedUser without action
   */
  export type BlockedUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockedUser
     */
    select?: BlockedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlockedUser
     */
    omit?: BlockedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockedUserInclude<ExtArgs> | null
  }


  /**
   * Model MutedUser
   */

  export type AggregateMutedUser = {
    _count: MutedUserCountAggregateOutputType | null
    _min: MutedUserMinAggregateOutputType | null
    _max: MutedUserMaxAggregateOutputType | null
  }

  export type MutedUserMinAggregateOutputType = {
    id: string | null
    userId: string | null
    channelId: string | null
    channelName: string | null
    createdAt: Date | null
  }

  export type MutedUserMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    channelId: string | null
    channelName: string | null
    createdAt: Date | null
  }

  export type MutedUserCountAggregateOutputType = {
    id: number
    userId: number
    channelId: number
    channelName: number
    createdAt: number
    _all: number
  }


  export type MutedUserMinAggregateInputType = {
    id?: true
    userId?: true
    channelId?: true
    channelName?: true
    createdAt?: true
  }

  export type MutedUserMaxAggregateInputType = {
    id?: true
    userId?: true
    channelId?: true
    channelName?: true
    createdAt?: true
  }

  export type MutedUserCountAggregateInputType = {
    id?: true
    userId?: true
    channelId?: true
    channelName?: true
    createdAt?: true
    _all?: true
  }

  export type MutedUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MutedUser to aggregate.
     */
    where?: MutedUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MutedUsers to fetch.
     */
    orderBy?: MutedUserOrderByWithRelationInput | MutedUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MutedUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MutedUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MutedUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MutedUsers
    **/
    _count?: true | MutedUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MutedUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MutedUserMaxAggregateInputType
  }

  export type GetMutedUserAggregateType<T extends MutedUserAggregateArgs> = {
        [P in keyof T & keyof AggregateMutedUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMutedUser[P]>
      : GetScalarType<T[P], AggregateMutedUser[P]>
  }




  export type MutedUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MutedUserWhereInput
    orderBy?: MutedUserOrderByWithAggregationInput | MutedUserOrderByWithAggregationInput[]
    by: MutedUserScalarFieldEnum[] | MutedUserScalarFieldEnum
    having?: MutedUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MutedUserCountAggregateInputType | true
    _min?: MutedUserMinAggregateInputType
    _max?: MutedUserMaxAggregateInputType
  }

  export type MutedUserGroupByOutputType = {
    id: string
    userId: string
    channelId: string
    channelName: string | null
    createdAt: Date
    _count: MutedUserCountAggregateOutputType | null
    _min: MutedUserMinAggregateOutputType | null
    _max: MutedUserMaxAggregateOutputType | null
  }

  type GetMutedUserGroupByPayload<T extends MutedUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MutedUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MutedUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MutedUserGroupByOutputType[P]>
            : GetScalarType<T[P], MutedUserGroupByOutputType[P]>
        }
      >
    >


  export type MutedUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    channelId?: boolean
    channelName?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mutedUser"]>

  export type MutedUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    channelId?: boolean
    channelName?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mutedUser"]>

  export type MutedUserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    channelId?: boolean
    channelName?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mutedUser"]>

  export type MutedUserSelectScalar = {
    id?: boolean
    userId?: boolean
    channelId?: boolean
    channelName?: boolean
    createdAt?: boolean
  }

  export type MutedUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "channelId" | "channelName" | "createdAt", ExtArgs["result"]["mutedUser"]>
  export type MutedUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MutedUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MutedUserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MutedUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MutedUser"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      channelId: string
      channelName: string | null
      createdAt: Date
    }, ExtArgs["result"]["mutedUser"]>
    composites: {}
  }

  type MutedUserGetPayload<S extends boolean | null | undefined | MutedUserDefaultArgs> = $Result.GetResult<Prisma.$MutedUserPayload, S>

  type MutedUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MutedUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MutedUserCountAggregateInputType | true
    }

  export interface MutedUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MutedUser'], meta: { name: 'MutedUser' } }
    /**
     * Find zero or one MutedUser that matches the filter.
     * @param {MutedUserFindUniqueArgs} args - Arguments to find a MutedUser
     * @example
     * // Get one MutedUser
     * const mutedUser = await prisma.mutedUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MutedUserFindUniqueArgs>(args: SelectSubset<T, MutedUserFindUniqueArgs<ExtArgs>>): Prisma__MutedUserClient<$Result.GetResult<Prisma.$MutedUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MutedUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MutedUserFindUniqueOrThrowArgs} args - Arguments to find a MutedUser
     * @example
     * // Get one MutedUser
     * const mutedUser = await prisma.mutedUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MutedUserFindUniqueOrThrowArgs>(args: SelectSubset<T, MutedUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MutedUserClient<$Result.GetResult<Prisma.$MutedUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MutedUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MutedUserFindFirstArgs} args - Arguments to find a MutedUser
     * @example
     * // Get one MutedUser
     * const mutedUser = await prisma.mutedUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MutedUserFindFirstArgs>(args?: SelectSubset<T, MutedUserFindFirstArgs<ExtArgs>>): Prisma__MutedUserClient<$Result.GetResult<Prisma.$MutedUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MutedUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MutedUserFindFirstOrThrowArgs} args - Arguments to find a MutedUser
     * @example
     * // Get one MutedUser
     * const mutedUser = await prisma.mutedUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MutedUserFindFirstOrThrowArgs>(args?: SelectSubset<T, MutedUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__MutedUserClient<$Result.GetResult<Prisma.$MutedUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MutedUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MutedUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MutedUsers
     * const mutedUsers = await prisma.mutedUser.findMany()
     * 
     * // Get first 10 MutedUsers
     * const mutedUsers = await prisma.mutedUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mutedUserWithIdOnly = await prisma.mutedUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MutedUserFindManyArgs>(args?: SelectSubset<T, MutedUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MutedUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MutedUser.
     * @param {MutedUserCreateArgs} args - Arguments to create a MutedUser.
     * @example
     * // Create one MutedUser
     * const MutedUser = await prisma.mutedUser.create({
     *   data: {
     *     // ... data to create a MutedUser
     *   }
     * })
     * 
     */
    create<T extends MutedUserCreateArgs>(args: SelectSubset<T, MutedUserCreateArgs<ExtArgs>>): Prisma__MutedUserClient<$Result.GetResult<Prisma.$MutedUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MutedUsers.
     * @param {MutedUserCreateManyArgs} args - Arguments to create many MutedUsers.
     * @example
     * // Create many MutedUsers
     * const mutedUser = await prisma.mutedUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MutedUserCreateManyArgs>(args?: SelectSubset<T, MutedUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MutedUsers and returns the data saved in the database.
     * @param {MutedUserCreateManyAndReturnArgs} args - Arguments to create many MutedUsers.
     * @example
     * // Create many MutedUsers
     * const mutedUser = await prisma.mutedUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MutedUsers and only return the `id`
     * const mutedUserWithIdOnly = await prisma.mutedUser.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MutedUserCreateManyAndReturnArgs>(args?: SelectSubset<T, MutedUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MutedUserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MutedUser.
     * @param {MutedUserDeleteArgs} args - Arguments to delete one MutedUser.
     * @example
     * // Delete one MutedUser
     * const MutedUser = await prisma.mutedUser.delete({
     *   where: {
     *     // ... filter to delete one MutedUser
     *   }
     * })
     * 
     */
    delete<T extends MutedUserDeleteArgs>(args: SelectSubset<T, MutedUserDeleteArgs<ExtArgs>>): Prisma__MutedUserClient<$Result.GetResult<Prisma.$MutedUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MutedUser.
     * @param {MutedUserUpdateArgs} args - Arguments to update one MutedUser.
     * @example
     * // Update one MutedUser
     * const mutedUser = await prisma.mutedUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MutedUserUpdateArgs>(args: SelectSubset<T, MutedUserUpdateArgs<ExtArgs>>): Prisma__MutedUserClient<$Result.GetResult<Prisma.$MutedUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MutedUsers.
     * @param {MutedUserDeleteManyArgs} args - Arguments to filter MutedUsers to delete.
     * @example
     * // Delete a few MutedUsers
     * const { count } = await prisma.mutedUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MutedUserDeleteManyArgs>(args?: SelectSubset<T, MutedUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MutedUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MutedUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MutedUsers
     * const mutedUser = await prisma.mutedUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MutedUserUpdateManyArgs>(args: SelectSubset<T, MutedUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MutedUsers and returns the data updated in the database.
     * @param {MutedUserUpdateManyAndReturnArgs} args - Arguments to update many MutedUsers.
     * @example
     * // Update many MutedUsers
     * const mutedUser = await prisma.mutedUser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MutedUsers and only return the `id`
     * const mutedUserWithIdOnly = await prisma.mutedUser.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MutedUserUpdateManyAndReturnArgs>(args: SelectSubset<T, MutedUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MutedUserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MutedUser.
     * @param {MutedUserUpsertArgs} args - Arguments to update or create a MutedUser.
     * @example
     * // Update or create a MutedUser
     * const mutedUser = await prisma.mutedUser.upsert({
     *   create: {
     *     // ... data to create a MutedUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MutedUser we want to update
     *   }
     * })
     */
    upsert<T extends MutedUserUpsertArgs>(args: SelectSubset<T, MutedUserUpsertArgs<ExtArgs>>): Prisma__MutedUserClient<$Result.GetResult<Prisma.$MutedUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MutedUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MutedUserCountArgs} args - Arguments to filter MutedUsers to count.
     * @example
     * // Count the number of MutedUsers
     * const count = await prisma.mutedUser.count({
     *   where: {
     *     // ... the filter for the MutedUsers we want to count
     *   }
     * })
    **/
    count<T extends MutedUserCountArgs>(
      args?: Subset<T, MutedUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MutedUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MutedUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MutedUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MutedUserAggregateArgs>(args: Subset<T, MutedUserAggregateArgs>): Prisma.PrismaPromise<GetMutedUserAggregateType<T>>

    /**
     * Group by MutedUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MutedUserGroupByArgs} args - Group by arguments.
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
      T extends MutedUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MutedUserGroupByArgs['orderBy'] }
        : { orderBy?: MutedUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, MutedUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMutedUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MutedUser model
   */
  readonly fields: MutedUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MutedUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MutedUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MutedUser model
   */
  interface MutedUserFieldRefs {
    readonly id: FieldRef<"MutedUser", 'String'>
    readonly userId: FieldRef<"MutedUser", 'String'>
    readonly channelId: FieldRef<"MutedUser", 'String'>
    readonly channelName: FieldRef<"MutedUser", 'String'>
    readonly createdAt: FieldRef<"MutedUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MutedUser findUnique
   */
  export type MutedUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MutedUser
     */
    select?: MutedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MutedUser
     */
    omit?: MutedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MutedUserInclude<ExtArgs> | null
    /**
     * Filter, which MutedUser to fetch.
     */
    where: MutedUserWhereUniqueInput
  }

  /**
   * MutedUser findUniqueOrThrow
   */
  export type MutedUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MutedUser
     */
    select?: MutedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MutedUser
     */
    omit?: MutedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MutedUserInclude<ExtArgs> | null
    /**
     * Filter, which MutedUser to fetch.
     */
    where: MutedUserWhereUniqueInput
  }

  /**
   * MutedUser findFirst
   */
  export type MutedUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MutedUser
     */
    select?: MutedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MutedUser
     */
    omit?: MutedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MutedUserInclude<ExtArgs> | null
    /**
     * Filter, which MutedUser to fetch.
     */
    where?: MutedUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MutedUsers to fetch.
     */
    orderBy?: MutedUserOrderByWithRelationInput | MutedUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MutedUsers.
     */
    cursor?: MutedUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MutedUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MutedUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MutedUsers.
     */
    distinct?: MutedUserScalarFieldEnum | MutedUserScalarFieldEnum[]
  }

  /**
   * MutedUser findFirstOrThrow
   */
  export type MutedUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MutedUser
     */
    select?: MutedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MutedUser
     */
    omit?: MutedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MutedUserInclude<ExtArgs> | null
    /**
     * Filter, which MutedUser to fetch.
     */
    where?: MutedUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MutedUsers to fetch.
     */
    orderBy?: MutedUserOrderByWithRelationInput | MutedUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MutedUsers.
     */
    cursor?: MutedUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MutedUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MutedUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MutedUsers.
     */
    distinct?: MutedUserScalarFieldEnum | MutedUserScalarFieldEnum[]
  }

  /**
   * MutedUser findMany
   */
  export type MutedUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MutedUser
     */
    select?: MutedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MutedUser
     */
    omit?: MutedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MutedUserInclude<ExtArgs> | null
    /**
     * Filter, which MutedUsers to fetch.
     */
    where?: MutedUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MutedUsers to fetch.
     */
    orderBy?: MutedUserOrderByWithRelationInput | MutedUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MutedUsers.
     */
    cursor?: MutedUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MutedUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MutedUsers.
     */
    skip?: number
    distinct?: MutedUserScalarFieldEnum | MutedUserScalarFieldEnum[]
  }

  /**
   * MutedUser create
   */
  export type MutedUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MutedUser
     */
    select?: MutedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MutedUser
     */
    omit?: MutedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MutedUserInclude<ExtArgs> | null
    /**
     * The data needed to create a MutedUser.
     */
    data: XOR<MutedUserCreateInput, MutedUserUncheckedCreateInput>
  }

  /**
   * MutedUser createMany
   */
  export type MutedUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MutedUsers.
     */
    data: MutedUserCreateManyInput | MutedUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MutedUser createManyAndReturn
   */
  export type MutedUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MutedUser
     */
    select?: MutedUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MutedUser
     */
    omit?: MutedUserOmit<ExtArgs> | null
    /**
     * The data used to create many MutedUsers.
     */
    data: MutedUserCreateManyInput | MutedUserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MutedUserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MutedUser update
   */
  export type MutedUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MutedUser
     */
    select?: MutedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MutedUser
     */
    omit?: MutedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MutedUserInclude<ExtArgs> | null
    /**
     * The data needed to update a MutedUser.
     */
    data: XOR<MutedUserUpdateInput, MutedUserUncheckedUpdateInput>
    /**
     * Choose, which MutedUser to update.
     */
    where: MutedUserWhereUniqueInput
  }

  /**
   * MutedUser updateMany
   */
  export type MutedUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MutedUsers.
     */
    data: XOR<MutedUserUpdateManyMutationInput, MutedUserUncheckedUpdateManyInput>
    /**
     * Filter which MutedUsers to update
     */
    where?: MutedUserWhereInput
    /**
     * Limit how many MutedUsers to update.
     */
    limit?: number
  }

  /**
   * MutedUser updateManyAndReturn
   */
  export type MutedUserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MutedUser
     */
    select?: MutedUserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MutedUser
     */
    omit?: MutedUserOmit<ExtArgs> | null
    /**
     * The data used to update MutedUsers.
     */
    data: XOR<MutedUserUpdateManyMutationInput, MutedUserUncheckedUpdateManyInput>
    /**
     * Filter which MutedUsers to update
     */
    where?: MutedUserWhereInput
    /**
     * Limit how many MutedUsers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MutedUserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MutedUser upsert
   */
  export type MutedUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MutedUser
     */
    select?: MutedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MutedUser
     */
    omit?: MutedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MutedUserInclude<ExtArgs> | null
    /**
     * The filter to search for the MutedUser to update in case it exists.
     */
    where: MutedUserWhereUniqueInput
    /**
     * In case the MutedUser found by the `where` argument doesn't exist, create a new MutedUser with this data.
     */
    create: XOR<MutedUserCreateInput, MutedUserUncheckedCreateInput>
    /**
     * In case the MutedUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MutedUserUpdateInput, MutedUserUncheckedUpdateInput>
  }

  /**
   * MutedUser delete
   */
  export type MutedUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MutedUser
     */
    select?: MutedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MutedUser
     */
    omit?: MutedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MutedUserInclude<ExtArgs> | null
    /**
     * Filter which MutedUser to delete.
     */
    where: MutedUserWhereUniqueInput
  }

  /**
   * MutedUser deleteMany
   */
  export type MutedUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MutedUsers to delete
     */
    where?: MutedUserWhereInput
    /**
     * Limit how many MutedUsers to delete.
     */
    limit?: number
  }

  /**
   * MutedUser without action
   */
  export type MutedUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MutedUser
     */
    select?: MutedUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MutedUser
     */
    omit?: MutedUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MutedUserInclude<ExtArgs> | null
  }


  /**
   * Model ScheduledPost
   */

  export type AggregateScheduledPost = {
    _count: ScheduledPostCountAggregateOutputType | null
    _min: ScheduledPostMinAggregateOutputType | null
    _max: ScheduledPostMaxAggregateOutputType | null
  }

  export type ScheduledPostMinAggregateOutputType = {
    id: string | null
    userId: string | null
    videoId: string | null
    text: string | null
    scheduledAt: Date | null
    posted: boolean | null
    createdAt: Date | null
  }

  export type ScheduledPostMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    videoId: string | null
    text: string | null
    scheduledAt: Date | null
    posted: boolean | null
    createdAt: Date | null
  }

  export type ScheduledPostCountAggregateOutputType = {
    id: number
    userId: number
    videoId: number
    text: number
    scheduledAt: number
    posted: number
    createdAt: number
    _all: number
  }


  export type ScheduledPostMinAggregateInputType = {
    id?: true
    userId?: true
    videoId?: true
    text?: true
    scheduledAt?: true
    posted?: true
    createdAt?: true
  }

  export type ScheduledPostMaxAggregateInputType = {
    id?: true
    userId?: true
    videoId?: true
    text?: true
    scheduledAt?: true
    posted?: true
    createdAt?: true
  }

  export type ScheduledPostCountAggregateInputType = {
    id?: true
    userId?: true
    videoId?: true
    text?: true
    scheduledAt?: true
    posted?: true
    createdAt?: true
    _all?: true
  }

  export type ScheduledPostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScheduledPost to aggregate.
     */
    where?: ScheduledPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduledPosts to fetch.
     */
    orderBy?: ScheduledPostOrderByWithRelationInput | ScheduledPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScheduledPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduledPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduledPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScheduledPosts
    **/
    _count?: true | ScheduledPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScheduledPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScheduledPostMaxAggregateInputType
  }

  export type GetScheduledPostAggregateType<T extends ScheduledPostAggregateArgs> = {
        [P in keyof T & keyof AggregateScheduledPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScheduledPost[P]>
      : GetScalarType<T[P], AggregateScheduledPost[P]>
  }




  export type ScheduledPostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduledPostWhereInput
    orderBy?: ScheduledPostOrderByWithAggregationInput | ScheduledPostOrderByWithAggregationInput[]
    by: ScheduledPostScalarFieldEnum[] | ScheduledPostScalarFieldEnum
    having?: ScheduledPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScheduledPostCountAggregateInputType | true
    _min?: ScheduledPostMinAggregateInputType
    _max?: ScheduledPostMaxAggregateInputType
  }

  export type ScheduledPostGroupByOutputType = {
    id: string
    userId: string
    videoId: string
    text: string
    scheduledAt: Date
    posted: boolean
    createdAt: Date
    _count: ScheduledPostCountAggregateOutputType | null
    _min: ScheduledPostMinAggregateOutputType | null
    _max: ScheduledPostMaxAggregateOutputType | null
  }

  type GetScheduledPostGroupByPayload<T extends ScheduledPostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScheduledPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScheduledPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScheduledPostGroupByOutputType[P]>
            : GetScalarType<T[P], ScheduledPostGroupByOutputType[P]>
        }
      >
    >


  export type ScheduledPostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    videoId?: boolean
    text?: boolean
    scheduledAt?: boolean
    posted?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["scheduledPost"]>

  export type ScheduledPostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    videoId?: boolean
    text?: boolean
    scheduledAt?: boolean
    posted?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["scheduledPost"]>

  export type ScheduledPostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    videoId?: boolean
    text?: boolean
    scheduledAt?: boolean
    posted?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["scheduledPost"]>

  export type ScheduledPostSelectScalar = {
    id?: boolean
    userId?: boolean
    videoId?: boolean
    text?: boolean
    scheduledAt?: boolean
    posted?: boolean
    createdAt?: boolean
  }

  export type ScheduledPostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "videoId" | "text" | "scheduledAt" | "posted" | "createdAt", ExtArgs["result"]["scheduledPost"]>

  export type $ScheduledPostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScheduledPost"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      videoId: string
      text: string
      scheduledAt: Date
      posted: boolean
      createdAt: Date
    }, ExtArgs["result"]["scheduledPost"]>
    composites: {}
  }

  type ScheduledPostGetPayload<S extends boolean | null | undefined | ScheduledPostDefaultArgs> = $Result.GetResult<Prisma.$ScheduledPostPayload, S>

  type ScheduledPostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScheduledPostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScheduledPostCountAggregateInputType | true
    }

  export interface ScheduledPostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScheduledPost'], meta: { name: 'ScheduledPost' } }
    /**
     * Find zero or one ScheduledPost that matches the filter.
     * @param {ScheduledPostFindUniqueArgs} args - Arguments to find a ScheduledPost
     * @example
     * // Get one ScheduledPost
     * const scheduledPost = await prisma.scheduledPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScheduledPostFindUniqueArgs>(args: SelectSubset<T, ScheduledPostFindUniqueArgs<ExtArgs>>): Prisma__ScheduledPostClient<$Result.GetResult<Prisma.$ScheduledPostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ScheduledPost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScheduledPostFindUniqueOrThrowArgs} args - Arguments to find a ScheduledPost
     * @example
     * // Get one ScheduledPost
     * const scheduledPost = await prisma.scheduledPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScheduledPostFindUniqueOrThrowArgs>(args: SelectSubset<T, ScheduledPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScheduledPostClient<$Result.GetResult<Prisma.$ScheduledPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScheduledPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledPostFindFirstArgs} args - Arguments to find a ScheduledPost
     * @example
     * // Get one ScheduledPost
     * const scheduledPost = await prisma.scheduledPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScheduledPostFindFirstArgs>(args?: SelectSubset<T, ScheduledPostFindFirstArgs<ExtArgs>>): Prisma__ScheduledPostClient<$Result.GetResult<Prisma.$ScheduledPostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScheduledPost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledPostFindFirstOrThrowArgs} args - Arguments to find a ScheduledPost
     * @example
     * // Get one ScheduledPost
     * const scheduledPost = await prisma.scheduledPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScheduledPostFindFirstOrThrowArgs>(args?: SelectSubset<T, ScheduledPostFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScheduledPostClient<$Result.GetResult<Prisma.$ScheduledPostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ScheduledPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledPostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScheduledPosts
     * const scheduledPosts = await prisma.scheduledPost.findMany()
     * 
     * // Get first 10 ScheduledPosts
     * const scheduledPosts = await prisma.scheduledPost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scheduledPostWithIdOnly = await prisma.scheduledPost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScheduledPostFindManyArgs>(args?: SelectSubset<T, ScheduledPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduledPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ScheduledPost.
     * @param {ScheduledPostCreateArgs} args - Arguments to create a ScheduledPost.
     * @example
     * // Create one ScheduledPost
     * const ScheduledPost = await prisma.scheduledPost.create({
     *   data: {
     *     // ... data to create a ScheduledPost
     *   }
     * })
     * 
     */
    create<T extends ScheduledPostCreateArgs>(args: SelectSubset<T, ScheduledPostCreateArgs<ExtArgs>>): Prisma__ScheduledPostClient<$Result.GetResult<Prisma.$ScheduledPostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ScheduledPosts.
     * @param {ScheduledPostCreateManyArgs} args - Arguments to create many ScheduledPosts.
     * @example
     * // Create many ScheduledPosts
     * const scheduledPost = await prisma.scheduledPost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScheduledPostCreateManyArgs>(args?: SelectSubset<T, ScheduledPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ScheduledPosts and returns the data saved in the database.
     * @param {ScheduledPostCreateManyAndReturnArgs} args - Arguments to create many ScheduledPosts.
     * @example
     * // Create many ScheduledPosts
     * const scheduledPost = await prisma.scheduledPost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ScheduledPosts and only return the `id`
     * const scheduledPostWithIdOnly = await prisma.scheduledPost.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScheduledPostCreateManyAndReturnArgs>(args?: SelectSubset<T, ScheduledPostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduledPostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ScheduledPost.
     * @param {ScheduledPostDeleteArgs} args - Arguments to delete one ScheduledPost.
     * @example
     * // Delete one ScheduledPost
     * const ScheduledPost = await prisma.scheduledPost.delete({
     *   where: {
     *     // ... filter to delete one ScheduledPost
     *   }
     * })
     * 
     */
    delete<T extends ScheduledPostDeleteArgs>(args: SelectSubset<T, ScheduledPostDeleteArgs<ExtArgs>>): Prisma__ScheduledPostClient<$Result.GetResult<Prisma.$ScheduledPostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ScheduledPost.
     * @param {ScheduledPostUpdateArgs} args - Arguments to update one ScheduledPost.
     * @example
     * // Update one ScheduledPost
     * const scheduledPost = await prisma.scheduledPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScheduledPostUpdateArgs>(args: SelectSubset<T, ScheduledPostUpdateArgs<ExtArgs>>): Prisma__ScheduledPostClient<$Result.GetResult<Prisma.$ScheduledPostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ScheduledPosts.
     * @param {ScheduledPostDeleteManyArgs} args - Arguments to filter ScheduledPosts to delete.
     * @example
     * // Delete a few ScheduledPosts
     * const { count } = await prisma.scheduledPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScheduledPostDeleteManyArgs>(args?: SelectSubset<T, ScheduledPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScheduledPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScheduledPosts
     * const scheduledPost = await prisma.scheduledPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScheduledPostUpdateManyArgs>(args: SelectSubset<T, ScheduledPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScheduledPosts and returns the data updated in the database.
     * @param {ScheduledPostUpdateManyAndReturnArgs} args - Arguments to update many ScheduledPosts.
     * @example
     * // Update many ScheduledPosts
     * const scheduledPost = await prisma.scheduledPost.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ScheduledPosts and only return the `id`
     * const scheduledPostWithIdOnly = await prisma.scheduledPost.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScheduledPostUpdateManyAndReturnArgs>(args: SelectSubset<T, ScheduledPostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduledPostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ScheduledPost.
     * @param {ScheduledPostUpsertArgs} args - Arguments to update or create a ScheduledPost.
     * @example
     * // Update or create a ScheduledPost
     * const scheduledPost = await prisma.scheduledPost.upsert({
     *   create: {
     *     // ... data to create a ScheduledPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScheduledPost we want to update
     *   }
     * })
     */
    upsert<T extends ScheduledPostUpsertArgs>(args: SelectSubset<T, ScheduledPostUpsertArgs<ExtArgs>>): Prisma__ScheduledPostClient<$Result.GetResult<Prisma.$ScheduledPostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ScheduledPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledPostCountArgs} args - Arguments to filter ScheduledPosts to count.
     * @example
     * // Count the number of ScheduledPosts
     * const count = await prisma.scheduledPost.count({
     *   where: {
     *     // ... the filter for the ScheduledPosts we want to count
     *   }
     * })
    **/
    count<T extends ScheduledPostCountArgs>(
      args?: Subset<T, ScheduledPostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScheduledPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScheduledPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ScheduledPostAggregateArgs>(args: Subset<T, ScheduledPostAggregateArgs>): Prisma.PrismaPromise<GetScheduledPostAggregateType<T>>

    /**
     * Group by ScheduledPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduledPostGroupByArgs} args - Group by arguments.
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
      T extends ScheduledPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScheduledPostGroupByArgs['orderBy'] }
        : { orderBy?: ScheduledPostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ScheduledPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScheduledPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScheduledPost model
   */
  readonly fields: ScheduledPostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScheduledPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScheduledPostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ScheduledPost model
   */
  interface ScheduledPostFieldRefs {
    readonly id: FieldRef<"ScheduledPost", 'String'>
    readonly userId: FieldRef<"ScheduledPost", 'String'>
    readonly videoId: FieldRef<"ScheduledPost", 'String'>
    readonly text: FieldRef<"ScheduledPost", 'String'>
    readonly scheduledAt: FieldRef<"ScheduledPost", 'DateTime'>
    readonly posted: FieldRef<"ScheduledPost", 'Boolean'>
    readonly createdAt: FieldRef<"ScheduledPost", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ScheduledPost findUnique
   */
  export type ScheduledPostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledPost
     */
    select?: ScheduledPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledPost
     */
    omit?: ScheduledPostOmit<ExtArgs> | null
    /**
     * Filter, which ScheduledPost to fetch.
     */
    where: ScheduledPostWhereUniqueInput
  }

  /**
   * ScheduledPost findUniqueOrThrow
   */
  export type ScheduledPostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledPost
     */
    select?: ScheduledPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledPost
     */
    omit?: ScheduledPostOmit<ExtArgs> | null
    /**
     * Filter, which ScheduledPost to fetch.
     */
    where: ScheduledPostWhereUniqueInput
  }

  /**
   * ScheduledPost findFirst
   */
  export type ScheduledPostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledPost
     */
    select?: ScheduledPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledPost
     */
    omit?: ScheduledPostOmit<ExtArgs> | null
    /**
     * Filter, which ScheduledPost to fetch.
     */
    where?: ScheduledPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduledPosts to fetch.
     */
    orderBy?: ScheduledPostOrderByWithRelationInput | ScheduledPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScheduledPosts.
     */
    cursor?: ScheduledPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduledPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduledPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScheduledPosts.
     */
    distinct?: ScheduledPostScalarFieldEnum | ScheduledPostScalarFieldEnum[]
  }

  /**
   * ScheduledPost findFirstOrThrow
   */
  export type ScheduledPostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledPost
     */
    select?: ScheduledPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledPost
     */
    omit?: ScheduledPostOmit<ExtArgs> | null
    /**
     * Filter, which ScheduledPost to fetch.
     */
    where?: ScheduledPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduledPosts to fetch.
     */
    orderBy?: ScheduledPostOrderByWithRelationInput | ScheduledPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScheduledPosts.
     */
    cursor?: ScheduledPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduledPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduledPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScheduledPosts.
     */
    distinct?: ScheduledPostScalarFieldEnum | ScheduledPostScalarFieldEnum[]
  }

  /**
   * ScheduledPost findMany
   */
  export type ScheduledPostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledPost
     */
    select?: ScheduledPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledPost
     */
    omit?: ScheduledPostOmit<ExtArgs> | null
    /**
     * Filter, which ScheduledPosts to fetch.
     */
    where?: ScheduledPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduledPosts to fetch.
     */
    orderBy?: ScheduledPostOrderByWithRelationInput | ScheduledPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScheduledPosts.
     */
    cursor?: ScheduledPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduledPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduledPosts.
     */
    skip?: number
    distinct?: ScheduledPostScalarFieldEnum | ScheduledPostScalarFieldEnum[]
  }

  /**
   * ScheduledPost create
   */
  export type ScheduledPostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledPost
     */
    select?: ScheduledPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledPost
     */
    omit?: ScheduledPostOmit<ExtArgs> | null
    /**
     * The data needed to create a ScheduledPost.
     */
    data: XOR<ScheduledPostCreateInput, ScheduledPostUncheckedCreateInput>
  }

  /**
   * ScheduledPost createMany
   */
  export type ScheduledPostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScheduledPosts.
     */
    data: ScheduledPostCreateManyInput | ScheduledPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScheduledPost createManyAndReturn
   */
  export type ScheduledPostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledPost
     */
    select?: ScheduledPostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledPost
     */
    omit?: ScheduledPostOmit<ExtArgs> | null
    /**
     * The data used to create many ScheduledPosts.
     */
    data: ScheduledPostCreateManyInput | ScheduledPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScheduledPost update
   */
  export type ScheduledPostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledPost
     */
    select?: ScheduledPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledPost
     */
    omit?: ScheduledPostOmit<ExtArgs> | null
    /**
     * The data needed to update a ScheduledPost.
     */
    data: XOR<ScheduledPostUpdateInput, ScheduledPostUncheckedUpdateInput>
    /**
     * Choose, which ScheduledPost to update.
     */
    where: ScheduledPostWhereUniqueInput
  }

  /**
   * ScheduledPost updateMany
   */
  export type ScheduledPostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScheduledPosts.
     */
    data: XOR<ScheduledPostUpdateManyMutationInput, ScheduledPostUncheckedUpdateManyInput>
    /**
     * Filter which ScheduledPosts to update
     */
    where?: ScheduledPostWhereInput
    /**
     * Limit how many ScheduledPosts to update.
     */
    limit?: number
  }

  /**
   * ScheduledPost updateManyAndReturn
   */
  export type ScheduledPostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledPost
     */
    select?: ScheduledPostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledPost
     */
    omit?: ScheduledPostOmit<ExtArgs> | null
    /**
     * The data used to update ScheduledPosts.
     */
    data: XOR<ScheduledPostUpdateManyMutationInput, ScheduledPostUncheckedUpdateManyInput>
    /**
     * Filter which ScheduledPosts to update
     */
    where?: ScheduledPostWhereInput
    /**
     * Limit how many ScheduledPosts to update.
     */
    limit?: number
  }

  /**
   * ScheduledPost upsert
   */
  export type ScheduledPostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledPost
     */
    select?: ScheduledPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledPost
     */
    omit?: ScheduledPostOmit<ExtArgs> | null
    /**
     * The filter to search for the ScheduledPost to update in case it exists.
     */
    where: ScheduledPostWhereUniqueInput
    /**
     * In case the ScheduledPost found by the `where` argument doesn't exist, create a new ScheduledPost with this data.
     */
    create: XOR<ScheduledPostCreateInput, ScheduledPostUncheckedCreateInput>
    /**
     * In case the ScheduledPost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScheduledPostUpdateInput, ScheduledPostUncheckedUpdateInput>
  }

  /**
   * ScheduledPost delete
   */
  export type ScheduledPostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledPost
     */
    select?: ScheduledPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledPost
     */
    omit?: ScheduledPostOmit<ExtArgs> | null
    /**
     * Filter which ScheduledPost to delete.
     */
    where: ScheduledPostWhereUniqueInput
  }

  /**
   * ScheduledPost deleteMany
   */
  export type ScheduledPostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScheduledPosts to delete
     */
    where?: ScheduledPostWhereInput
    /**
     * Limit how many ScheduledPosts to delete.
     */
    limit?: number
  }

  /**
   * ScheduledPost without action
   */
  export type ScheduledPostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduledPost
     */
    select?: ScheduledPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduledPost
     */
    omit?: ScheduledPostOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    image: 'image',
    channelId: 'channelId'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const YtCredentialScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    credential: 'credential',
    type: 'type',
    updatedAt: 'updatedAt'
  };

  export type YtCredentialScalarFieldEnum = (typeof YtCredentialScalarFieldEnum)[keyof typeof YtCredentialScalarFieldEnum]


  export const CommentLikeScalarFieldEnum: {
    id: 'id',
    commentId: 'commentId',
    videoId: 'videoId',
    userId: 'userId',
    type: 'type',
    createdAt: 'createdAt'
  };

  export type CommentLikeScalarFieldEnum = (typeof CommentLikeScalarFieldEnum)[keyof typeof CommentLikeScalarFieldEnum]


  export const UserActionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    videoId: 'videoId',
    commentId: 'commentId',
    actionType: 'actionType',
    content: 'content',
    createdAt: 'createdAt'
  };

  export type UserActionScalarFieldEnum = (typeof UserActionScalarFieldEnum)[keyof typeof UserActionScalarFieldEnum]


  export const CommentCacheScalarFieldEnum: {
    id: 'id',
    commentId: 'commentId',
    videoId: 'videoId',
    authorName: 'authorName',
    authorChannelId: 'authorChannelId',
    authorThumb: 'authorThumb',
    content: 'content',
    likeCount: 'likeCount',
    replyCount: 'replyCount',
    parentCommentId: 'parentCommentId',
    publishedAt: 'publishedAt',
    updatedAt: 'updatedAt'
  };

  export type CommentCacheScalarFieldEnum = (typeof CommentCacheScalarFieldEnum)[keyof typeof CommentCacheScalarFieldEnum]


  export const BookmarkScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    folderId: 'folderId',
    commentId: 'commentId',
    videoId: 'videoId',
    authorName: 'authorName',
    authorThumb: 'authorThumb',
    content: 'content',
    likeCount: 'likeCount',
    replyCount: 'replyCount',
    publishedTime: 'publishedTime',
    createdAt: 'createdAt'
  };

  export type BookmarkScalarFieldEnum = (typeof BookmarkScalarFieldEnum)[keyof typeof BookmarkScalarFieldEnum]


  export const ListScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    description: 'description',
    isPublic: 'isPublic',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ListScalarFieldEnum = (typeof ListScalarFieldEnum)[keyof typeof ListScalarFieldEnum]


  export const ListItemScalarFieldEnum: {
    id: 'id',
    listId: 'listId',
    commentId: 'commentId',
    videoId: 'videoId',
    authorName: 'authorName',
    authorThumb: 'authorThumb',
    content: 'content',
    likeCount: 'likeCount',
    replyCount: 'replyCount',
    publishedTime: 'publishedTime',
    createdAt: 'createdAt'
  };

  export type ListItemScalarFieldEnum = (typeof ListItemScalarFieldEnum)[keyof typeof ListItemScalarFieldEnum]


  export const ListFollowScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    listId: 'listId',
    createdAt: 'createdAt'
  };

  export type ListFollowScalarFieldEnum = (typeof ListFollowScalarFieldEnum)[keyof typeof ListFollowScalarFieldEnum]


  export const BookmarkFolderScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type BookmarkFolderScalarFieldEnum = (typeof BookmarkFolderScalarFieldEnum)[keyof typeof BookmarkFolderScalarFieldEnum]


  export const BlockedUserScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    channelId: 'channelId',
    channelName: 'channelName',
    createdAt: 'createdAt'
  };

  export type BlockedUserScalarFieldEnum = (typeof BlockedUserScalarFieldEnum)[keyof typeof BlockedUserScalarFieldEnum]


  export const MutedUserScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    channelId: 'channelId',
    channelName: 'channelName',
    createdAt: 'createdAt'
  };

  export type MutedUserScalarFieldEnum = (typeof MutedUserScalarFieldEnum)[keyof typeof MutedUserScalarFieldEnum]


  export const ScheduledPostScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    videoId: 'videoId',
    text: 'text',
    scheduledAt: 'scheduledAt',
    posted: 'posted',
    createdAt: 'createdAt'
  };

  export type ScheduledPostScalarFieldEnum = (typeof ScheduledPostScalarFieldEnum)[keyof typeof ScheduledPostScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    channelId?: StringNullableFilter<"User"> | string | null
    ytCredential?: XOR<YtCredentialNullableScalarRelationFilter, YtCredentialWhereInput> | null
    commentLikes?: CommentLikeListRelationFilter
    actions?: UserActionListRelationFilter
    lists?: ListListRelationFilter
    listFollows?: ListFollowListRelationFilter
    bookmarkFolders?: BookmarkFolderListRelationFilter
    blockedUsers?: BlockedUserListRelationFilter
    mutedUsers?: MutedUserListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    channelId?: SortOrderInput | SortOrder
    ytCredential?: YtCredentialOrderByWithRelationInput
    commentLikes?: CommentLikeOrderByRelationAggregateInput
    actions?: UserActionOrderByRelationAggregateInput
    lists?: ListOrderByRelationAggregateInput
    listFollows?: ListFollowOrderByRelationAggregateInput
    bookmarkFolders?: BookmarkFolderOrderByRelationAggregateInput
    blockedUsers?: BlockedUserOrderByRelationAggregateInput
    mutedUsers?: MutedUserOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    channelId?: StringNullableFilter<"User"> | string | null
    ytCredential?: XOR<YtCredentialNullableScalarRelationFilter, YtCredentialWhereInput> | null
    commentLikes?: CommentLikeListRelationFilter
    actions?: UserActionListRelationFilter
    lists?: ListListRelationFilter
    listFollows?: ListFollowListRelationFilter
    bookmarkFolders?: BookmarkFolderListRelationFilter
    blockedUsers?: BlockedUserListRelationFilter
    mutedUsers?: MutedUserListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    channelId?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    channelId?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type YtCredentialWhereInput = {
    AND?: YtCredentialWhereInput | YtCredentialWhereInput[]
    OR?: YtCredentialWhereInput[]
    NOT?: YtCredentialWhereInput | YtCredentialWhereInput[]
    id?: StringFilter<"YtCredential"> | string
    userId?: StringFilter<"YtCredential"> | string
    credential?: StringFilter<"YtCredential"> | string
    type?: StringFilter<"YtCredential"> | string
    updatedAt?: DateTimeFilter<"YtCredential"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type YtCredentialOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    credential?: SortOrder
    type?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type YtCredentialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: YtCredentialWhereInput | YtCredentialWhereInput[]
    OR?: YtCredentialWhereInput[]
    NOT?: YtCredentialWhereInput | YtCredentialWhereInput[]
    credential?: StringFilter<"YtCredential"> | string
    type?: StringFilter<"YtCredential"> | string
    updatedAt?: DateTimeFilter<"YtCredential"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type YtCredentialOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    credential?: SortOrder
    type?: SortOrder
    updatedAt?: SortOrder
    _count?: YtCredentialCountOrderByAggregateInput
    _max?: YtCredentialMaxOrderByAggregateInput
    _min?: YtCredentialMinOrderByAggregateInput
  }

  export type YtCredentialScalarWhereWithAggregatesInput = {
    AND?: YtCredentialScalarWhereWithAggregatesInput | YtCredentialScalarWhereWithAggregatesInput[]
    OR?: YtCredentialScalarWhereWithAggregatesInput[]
    NOT?: YtCredentialScalarWhereWithAggregatesInput | YtCredentialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"YtCredential"> | string
    userId?: StringWithAggregatesFilter<"YtCredential"> | string
    credential?: StringWithAggregatesFilter<"YtCredential"> | string
    type?: StringWithAggregatesFilter<"YtCredential"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"YtCredential"> | Date | string
  }

  export type CommentLikeWhereInput = {
    AND?: CommentLikeWhereInput | CommentLikeWhereInput[]
    OR?: CommentLikeWhereInput[]
    NOT?: CommentLikeWhereInput | CommentLikeWhereInput[]
    id?: StringFilter<"CommentLike"> | string
    commentId?: StringFilter<"CommentLike"> | string
    videoId?: StringFilter<"CommentLike"> | string
    userId?: StringFilter<"CommentLike"> | string
    type?: StringFilter<"CommentLike"> | string
    createdAt?: DateTimeFilter<"CommentLike"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CommentLikeOrderByWithRelationInput = {
    id?: SortOrder
    commentId?: SortOrder
    videoId?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type CommentLikeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    commentId_userId?: CommentLikeCommentIdUserIdCompoundUniqueInput
    AND?: CommentLikeWhereInput | CommentLikeWhereInput[]
    OR?: CommentLikeWhereInput[]
    NOT?: CommentLikeWhereInput | CommentLikeWhereInput[]
    commentId?: StringFilter<"CommentLike"> | string
    videoId?: StringFilter<"CommentLike"> | string
    userId?: StringFilter<"CommentLike"> | string
    type?: StringFilter<"CommentLike"> | string
    createdAt?: DateTimeFilter<"CommentLike"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "commentId_userId">

  export type CommentLikeOrderByWithAggregationInput = {
    id?: SortOrder
    commentId?: SortOrder
    videoId?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    _count?: CommentLikeCountOrderByAggregateInput
    _max?: CommentLikeMaxOrderByAggregateInput
    _min?: CommentLikeMinOrderByAggregateInput
  }

  export type CommentLikeScalarWhereWithAggregatesInput = {
    AND?: CommentLikeScalarWhereWithAggregatesInput | CommentLikeScalarWhereWithAggregatesInput[]
    OR?: CommentLikeScalarWhereWithAggregatesInput[]
    NOT?: CommentLikeScalarWhereWithAggregatesInput | CommentLikeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CommentLike"> | string
    commentId?: StringWithAggregatesFilter<"CommentLike"> | string
    videoId?: StringWithAggregatesFilter<"CommentLike"> | string
    userId?: StringWithAggregatesFilter<"CommentLike"> | string
    type?: StringWithAggregatesFilter<"CommentLike"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CommentLike"> | Date | string
  }

  export type UserActionWhereInput = {
    AND?: UserActionWhereInput | UserActionWhereInput[]
    OR?: UserActionWhereInput[]
    NOT?: UserActionWhereInput | UserActionWhereInput[]
    id?: StringFilter<"UserAction"> | string
    userId?: StringFilter<"UserAction"> | string
    videoId?: StringFilter<"UserAction"> | string
    commentId?: StringFilter<"UserAction"> | string
    actionType?: StringFilter<"UserAction"> | string
    content?: StringNullableFilter<"UserAction"> | string | null
    createdAt?: DateTimeFilter<"UserAction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserActionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    commentId?: SortOrder
    actionType?: SortOrder
    content?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserActionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserActionWhereInput | UserActionWhereInput[]
    OR?: UserActionWhereInput[]
    NOT?: UserActionWhereInput | UserActionWhereInput[]
    userId?: StringFilter<"UserAction"> | string
    videoId?: StringFilter<"UserAction"> | string
    commentId?: StringFilter<"UserAction"> | string
    actionType?: StringFilter<"UserAction"> | string
    content?: StringNullableFilter<"UserAction"> | string | null
    createdAt?: DateTimeFilter<"UserAction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UserActionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    commentId?: SortOrder
    actionType?: SortOrder
    content?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserActionCountOrderByAggregateInput
    _max?: UserActionMaxOrderByAggregateInput
    _min?: UserActionMinOrderByAggregateInput
  }

  export type UserActionScalarWhereWithAggregatesInput = {
    AND?: UserActionScalarWhereWithAggregatesInput | UserActionScalarWhereWithAggregatesInput[]
    OR?: UserActionScalarWhereWithAggregatesInput[]
    NOT?: UserActionScalarWhereWithAggregatesInput | UserActionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserAction"> | string
    userId?: StringWithAggregatesFilter<"UserAction"> | string
    videoId?: StringWithAggregatesFilter<"UserAction"> | string
    commentId?: StringWithAggregatesFilter<"UserAction"> | string
    actionType?: StringWithAggregatesFilter<"UserAction"> | string
    content?: StringNullableWithAggregatesFilter<"UserAction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UserAction"> | Date | string
  }

  export type CommentCacheWhereInput = {
    AND?: CommentCacheWhereInput | CommentCacheWhereInput[]
    OR?: CommentCacheWhereInput[]
    NOT?: CommentCacheWhereInput | CommentCacheWhereInput[]
    id?: StringFilter<"CommentCache"> | string
    commentId?: StringFilter<"CommentCache"> | string
    videoId?: StringFilter<"CommentCache"> | string
    authorName?: StringFilter<"CommentCache"> | string
    authorChannelId?: StringNullableFilter<"CommentCache"> | string | null
    authorThumb?: StringNullableFilter<"CommentCache"> | string | null
    content?: StringFilter<"CommentCache"> | string
    likeCount?: IntFilter<"CommentCache"> | number
    replyCount?: IntFilter<"CommentCache"> | number
    parentCommentId?: StringNullableFilter<"CommentCache"> | string | null
    publishedAt?: DateTimeFilter<"CommentCache"> | Date | string
    updatedAt?: DateTimeFilter<"CommentCache"> | Date | string
  }

  export type CommentCacheOrderByWithRelationInput = {
    id?: SortOrder
    commentId?: SortOrder
    videoId?: SortOrder
    authorName?: SortOrder
    authorChannelId?: SortOrderInput | SortOrder
    authorThumb?: SortOrderInput | SortOrder
    content?: SortOrder
    likeCount?: SortOrder
    replyCount?: SortOrder
    parentCommentId?: SortOrderInput | SortOrder
    publishedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    commentId?: string
    AND?: CommentCacheWhereInput | CommentCacheWhereInput[]
    OR?: CommentCacheWhereInput[]
    NOT?: CommentCacheWhereInput | CommentCacheWhereInput[]
    videoId?: StringFilter<"CommentCache"> | string
    authorName?: StringFilter<"CommentCache"> | string
    authorChannelId?: StringNullableFilter<"CommentCache"> | string | null
    authorThumb?: StringNullableFilter<"CommentCache"> | string | null
    content?: StringFilter<"CommentCache"> | string
    likeCount?: IntFilter<"CommentCache"> | number
    replyCount?: IntFilter<"CommentCache"> | number
    parentCommentId?: StringNullableFilter<"CommentCache"> | string | null
    publishedAt?: DateTimeFilter<"CommentCache"> | Date | string
    updatedAt?: DateTimeFilter<"CommentCache"> | Date | string
  }, "id" | "commentId">

  export type CommentCacheOrderByWithAggregationInput = {
    id?: SortOrder
    commentId?: SortOrder
    videoId?: SortOrder
    authorName?: SortOrder
    authorChannelId?: SortOrderInput | SortOrder
    authorThumb?: SortOrderInput | SortOrder
    content?: SortOrder
    likeCount?: SortOrder
    replyCount?: SortOrder
    parentCommentId?: SortOrderInput | SortOrder
    publishedAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CommentCacheCountOrderByAggregateInput
    _avg?: CommentCacheAvgOrderByAggregateInput
    _max?: CommentCacheMaxOrderByAggregateInput
    _min?: CommentCacheMinOrderByAggregateInput
    _sum?: CommentCacheSumOrderByAggregateInput
  }

  export type CommentCacheScalarWhereWithAggregatesInput = {
    AND?: CommentCacheScalarWhereWithAggregatesInput | CommentCacheScalarWhereWithAggregatesInput[]
    OR?: CommentCacheScalarWhereWithAggregatesInput[]
    NOT?: CommentCacheScalarWhereWithAggregatesInput | CommentCacheScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CommentCache"> | string
    commentId?: StringWithAggregatesFilter<"CommentCache"> | string
    videoId?: StringWithAggregatesFilter<"CommentCache"> | string
    authorName?: StringWithAggregatesFilter<"CommentCache"> | string
    authorChannelId?: StringNullableWithAggregatesFilter<"CommentCache"> | string | null
    authorThumb?: StringNullableWithAggregatesFilter<"CommentCache"> | string | null
    content?: StringWithAggregatesFilter<"CommentCache"> | string
    likeCount?: IntWithAggregatesFilter<"CommentCache"> | number
    replyCount?: IntWithAggregatesFilter<"CommentCache"> | number
    parentCommentId?: StringNullableWithAggregatesFilter<"CommentCache"> | string | null
    publishedAt?: DateTimeWithAggregatesFilter<"CommentCache"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CommentCache"> | Date | string
  }

  export type BookmarkWhereInput = {
    AND?: BookmarkWhereInput | BookmarkWhereInput[]
    OR?: BookmarkWhereInput[]
    NOT?: BookmarkWhereInput | BookmarkWhereInput[]
    id?: StringFilter<"Bookmark"> | string
    userId?: StringFilter<"Bookmark"> | string
    folderId?: StringNullableFilter<"Bookmark"> | string | null
    commentId?: StringFilter<"Bookmark"> | string
    videoId?: StringFilter<"Bookmark"> | string
    authorName?: StringFilter<"Bookmark"> | string
    authorThumb?: StringNullableFilter<"Bookmark"> | string | null
    content?: StringFilter<"Bookmark"> | string
    likeCount?: StringFilter<"Bookmark"> | string
    replyCount?: StringFilter<"Bookmark"> | string
    publishedTime?: StringFilter<"Bookmark"> | string
    createdAt?: DateTimeFilter<"Bookmark"> | Date | string
    folder?: XOR<BookmarkFolderNullableScalarRelationFilter, BookmarkFolderWhereInput> | null
  }

  export type BookmarkOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    folderId?: SortOrderInput | SortOrder
    commentId?: SortOrder
    videoId?: SortOrder
    authorName?: SortOrder
    authorThumb?: SortOrderInput | SortOrder
    content?: SortOrder
    likeCount?: SortOrder
    replyCount?: SortOrder
    publishedTime?: SortOrder
    createdAt?: SortOrder
    folder?: BookmarkFolderOrderByWithRelationInput
  }

  export type BookmarkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_commentId?: BookmarkUserIdCommentIdCompoundUniqueInput
    AND?: BookmarkWhereInput | BookmarkWhereInput[]
    OR?: BookmarkWhereInput[]
    NOT?: BookmarkWhereInput | BookmarkWhereInput[]
    userId?: StringFilter<"Bookmark"> | string
    folderId?: StringNullableFilter<"Bookmark"> | string | null
    commentId?: StringFilter<"Bookmark"> | string
    videoId?: StringFilter<"Bookmark"> | string
    authorName?: StringFilter<"Bookmark"> | string
    authorThumb?: StringNullableFilter<"Bookmark"> | string | null
    content?: StringFilter<"Bookmark"> | string
    likeCount?: StringFilter<"Bookmark"> | string
    replyCount?: StringFilter<"Bookmark"> | string
    publishedTime?: StringFilter<"Bookmark"> | string
    createdAt?: DateTimeFilter<"Bookmark"> | Date | string
    folder?: XOR<BookmarkFolderNullableScalarRelationFilter, BookmarkFolderWhereInput> | null
  }, "id" | "userId_commentId">

  export type BookmarkOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    folderId?: SortOrderInput | SortOrder
    commentId?: SortOrder
    videoId?: SortOrder
    authorName?: SortOrder
    authorThumb?: SortOrderInput | SortOrder
    content?: SortOrder
    likeCount?: SortOrder
    replyCount?: SortOrder
    publishedTime?: SortOrder
    createdAt?: SortOrder
    _count?: BookmarkCountOrderByAggregateInput
    _max?: BookmarkMaxOrderByAggregateInput
    _min?: BookmarkMinOrderByAggregateInput
  }

  export type BookmarkScalarWhereWithAggregatesInput = {
    AND?: BookmarkScalarWhereWithAggregatesInput | BookmarkScalarWhereWithAggregatesInput[]
    OR?: BookmarkScalarWhereWithAggregatesInput[]
    NOT?: BookmarkScalarWhereWithAggregatesInput | BookmarkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Bookmark"> | string
    userId?: StringWithAggregatesFilter<"Bookmark"> | string
    folderId?: StringNullableWithAggregatesFilter<"Bookmark"> | string | null
    commentId?: StringWithAggregatesFilter<"Bookmark"> | string
    videoId?: StringWithAggregatesFilter<"Bookmark"> | string
    authorName?: StringWithAggregatesFilter<"Bookmark"> | string
    authorThumb?: StringNullableWithAggregatesFilter<"Bookmark"> | string | null
    content?: StringWithAggregatesFilter<"Bookmark"> | string
    likeCount?: StringWithAggregatesFilter<"Bookmark"> | string
    replyCount?: StringWithAggregatesFilter<"Bookmark"> | string
    publishedTime?: StringWithAggregatesFilter<"Bookmark"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Bookmark"> | Date | string
  }

  export type ListWhereInput = {
    AND?: ListWhereInput | ListWhereInput[]
    OR?: ListWhereInput[]
    NOT?: ListWhereInput | ListWhereInput[]
    id?: StringFilter<"List"> | string
    userId?: StringFilter<"List"> | string
    name?: StringFilter<"List"> | string
    description?: StringNullableFilter<"List"> | string | null
    isPublic?: BoolFilter<"List"> | boolean
    createdAt?: DateTimeFilter<"List"> | Date | string
    updatedAt?: DateTimeFilter<"List"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    items?: ListItemListRelationFilter
    followers?: ListFollowListRelationFilter
  }

  export type ListOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    items?: ListItemOrderByRelationAggregateInput
    followers?: ListFollowOrderByRelationAggregateInput
  }

  export type ListWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ListWhereInput | ListWhereInput[]
    OR?: ListWhereInput[]
    NOT?: ListWhereInput | ListWhereInput[]
    userId?: StringFilter<"List"> | string
    name?: StringFilter<"List"> | string
    description?: StringNullableFilter<"List"> | string | null
    isPublic?: BoolFilter<"List"> | boolean
    createdAt?: DateTimeFilter<"List"> | Date | string
    updatedAt?: DateTimeFilter<"List"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    items?: ListItemListRelationFilter
    followers?: ListFollowListRelationFilter
  }, "id">

  export type ListOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ListCountOrderByAggregateInput
    _max?: ListMaxOrderByAggregateInput
    _min?: ListMinOrderByAggregateInput
  }

  export type ListScalarWhereWithAggregatesInput = {
    AND?: ListScalarWhereWithAggregatesInput | ListScalarWhereWithAggregatesInput[]
    OR?: ListScalarWhereWithAggregatesInput[]
    NOT?: ListScalarWhereWithAggregatesInput | ListScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"List"> | string
    userId?: StringWithAggregatesFilter<"List"> | string
    name?: StringWithAggregatesFilter<"List"> | string
    description?: StringNullableWithAggregatesFilter<"List"> | string | null
    isPublic?: BoolWithAggregatesFilter<"List"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"List"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"List"> | Date | string
  }

  export type ListItemWhereInput = {
    AND?: ListItemWhereInput | ListItemWhereInput[]
    OR?: ListItemWhereInput[]
    NOT?: ListItemWhereInput | ListItemWhereInput[]
    id?: StringFilter<"ListItem"> | string
    listId?: StringFilter<"ListItem"> | string
    commentId?: StringFilter<"ListItem"> | string
    videoId?: StringFilter<"ListItem"> | string
    authorName?: StringFilter<"ListItem"> | string
    authorThumb?: StringNullableFilter<"ListItem"> | string | null
    content?: StringFilter<"ListItem"> | string
    likeCount?: StringFilter<"ListItem"> | string
    replyCount?: StringFilter<"ListItem"> | string
    publishedTime?: StringFilter<"ListItem"> | string
    createdAt?: DateTimeFilter<"ListItem"> | Date | string
    list?: XOR<ListScalarRelationFilter, ListWhereInput>
  }

  export type ListItemOrderByWithRelationInput = {
    id?: SortOrder
    listId?: SortOrder
    commentId?: SortOrder
    videoId?: SortOrder
    authorName?: SortOrder
    authorThumb?: SortOrderInput | SortOrder
    content?: SortOrder
    likeCount?: SortOrder
    replyCount?: SortOrder
    publishedTime?: SortOrder
    createdAt?: SortOrder
    list?: ListOrderByWithRelationInput
  }

  export type ListItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    listId_commentId?: ListItemListIdCommentIdCompoundUniqueInput
    AND?: ListItemWhereInput | ListItemWhereInput[]
    OR?: ListItemWhereInput[]
    NOT?: ListItemWhereInput | ListItemWhereInput[]
    listId?: StringFilter<"ListItem"> | string
    commentId?: StringFilter<"ListItem"> | string
    videoId?: StringFilter<"ListItem"> | string
    authorName?: StringFilter<"ListItem"> | string
    authorThumb?: StringNullableFilter<"ListItem"> | string | null
    content?: StringFilter<"ListItem"> | string
    likeCount?: StringFilter<"ListItem"> | string
    replyCount?: StringFilter<"ListItem"> | string
    publishedTime?: StringFilter<"ListItem"> | string
    createdAt?: DateTimeFilter<"ListItem"> | Date | string
    list?: XOR<ListScalarRelationFilter, ListWhereInput>
  }, "id" | "listId_commentId">

  export type ListItemOrderByWithAggregationInput = {
    id?: SortOrder
    listId?: SortOrder
    commentId?: SortOrder
    videoId?: SortOrder
    authorName?: SortOrder
    authorThumb?: SortOrderInput | SortOrder
    content?: SortOrder
    likeCount?: SortOrder
    replyCount?: SortOrder
    publishedTime?: SortOrder
    createdAt?: SortOrder
    _count?: ListItemCountOrderByAggregateInput
    _max?: ListItemMaxOrderByAggregateInput
    _min?: ListItemMinOrderByAggregateInput
  }

  export type ListItemScalarWhereWithAggregatesInput = {
    AND?: ListItemScalarWhereWithAggregatesInput | ListItemScalarWhereWithAggregatesInput[]
    OR?: ListItemScalarWhereWithAggregatesInput[]
    NOT?: ListItemScalarWhereWithAggregatesInput | ListItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ListItem"> | string
    listId?: StringWithAggregatesFilter<"ListItem"> | string
    commentId?: StringWithAggregatesFilter<"ListItem"> | string
    videoId?: StringWithAggregatesFilter<"ListItem"> | string
    authorName?: StringWithAggregatesFilter<"ListItem"> | string
    authorThumb?: StringNullableWithAggregatesFilter<"ListItem"> | string | null
    content?: StringWithAggregatesFilter<"ListItem"> | string
    likeCount?: StringWithAggregatesFilter<"ListItem"> | string
    replyCount?: StringWithAggregatesFilter<"ListItem"> | string
    publishedTime?: StringWithAggregatesFilter<"ListItem"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ListItem"> | Date | string
  }

  export type ListFollowWhereInput = {
    AND?: ListFollowWhereInput | ListFollowWhereInput[]
    OR?: ListFollowWhereInput[]
    NOT?: ListFollowWhereInput | ListFollowWhereInput[]
    id?: StringFilter<"ListFollow"> | string
    userId?: StringFilter<"ListFollow"> | string
    listId?: StringFilter<"ListFollow"> | string
    createdAt?: DateTimeFilter<"ListFollow"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    list?: XOR<ListScalarRelationFilter, ListWhereInput>
  }

  export type ListFollowOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    listId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    list?: ListOrderByWithRelationInput
  }

  export type ListFollowWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_listId?: ListFollowUserIdListIdCompoundUniqueInput
    AND?: ListFollowWhereInput | ListFollowWhereInput[]
    OR?: ListFollowWhereInput[]
    NOT?: ListFollowWhereInput | ListFollowWhereInput[]
    userId?: StringFilter<"ListFollow"> | string
    listId?: StringFilter<"ListFollow"> | string
    createdAt?: DateTimeFilter<"ListFollow"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    list?: XOR<ListScalarRelationFilter, ListWhereInput>
  }, "id" | "userId_listId">

  export type ListFollowOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    listId?: SortOrder
    createdAt?: SortOrder
    _count?: ListFollowCountOrderByAggregateInput
    _max?: ListFollowMaxOrderByAggregateInput
    _min?: ListFollowMinOrderByAggregateInput
  }

  export type ListFollowScalarWhereWithAggregatesInput = {
    AND?: ListFollowScalarWhereWithAggregatesInput | ListFollowScalarWhereWithAggregatesInput[]
    OR?: ListFollowScalarWhereWithAggregatesInput[]
    NOT?: ListFollowScalarWhereWithAggregatesInput | ListFollowScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ListFollow"> | string
    userId?: StringWithAggregatesFilter<"ListFollow"> | string
    listId?: StringWithAggregatesFilter<"ListFollow"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ListFollow"> | Date | string
  }

  export type BookmarkFolderWhereInput = {
    AND?: BookmarkFolderWhereInput | BookmarkFolderWhereInput[]
    OR?: BookmarkFolderWhereInput[]
    NOT?: BookmarkFolderWhereInput | BookmarkFolderWhereInput[]
    id?: StringFilter<"BookmarkFolder"> | string
    userId?: StringFilter<"BookmarkFolder"> | string
    name?: StringFilter<"BookmarkFolder"> | string
    createdAt?: DateTimeFilter<"BookmarkFolder"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    bookmarks?: BookmarkListRelationFilter
  }

  export type BookmarkFolderOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    bookmarks?: BookmarkOrderByRelationAggregateInput
  }

  export type BookmarkFolderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BookmarkFolderWhereInput | BookmarkFolderWhereInput[]
    OR?: BookmarkFolderWhereInput[]
    NOT?: BookmarkFolderWhereInput | BookmarkFolderWhereInput[]
    userId?: StringFilter<"BookmarkFolder"> | string
    name?: StringFilter<"BookmarkFolder"> | string
    createdAt?: DateTimeFilter<"BookmarkFolder"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    bookmarks?: BookmarkListRelationFilter
  }, "id">

  export type BookmarkFolderOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: BookmarkFolderCountOrderByAggregateInput
    _max?: BookmarkFolderMaxOrderByAggregateInput
    _min?: BookmarkFolderMinOrderByAggregateInput
  }

  export type BookmarkFolderScalarWhereWithAggregatesInput = {
    AND?: BookmarkFolderScalarWhereWithAggregatesInput | BookmarkFolderScalarWhereWithAggregatesInput[]
    OR?: BookmarkFolderScalarWhereWithAggregatesInput[]
    NOT?: BookmarkFolderScalarWhereWithAggregatesInput | BookmarkFolderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BookmarkFolder"> | string
    userId?: StringWithAggregatesFilter<"BookmarkFolder"> | string
    name?: StringWithAggregatesFilter<"BookmarkFolder"> | string
    createdAt?: DateTimeWithAggregatesFilter<"BookmarkFolder"> | Date | string
  }

  export type BlockedUserWhereInput = {
    AND?: BlockedUserWhereInput | BlockedUserWhereInput[]
    OR?: BlockedUserWhereInput[]
    NOT?: BlockedUserWhereInput | BlockedUserWhereInput[]
    id?: StringFilter<"BlockedUser"> | string
    userId?: StringFilter<"BlockedUser"> | string
    channelId?: StringFilter<"BlockedUser"> | string
    channelName?: StringNullableFilter<"BlockedUser"> | string | null
    createdAt?: DateTimeFilter<"BlockedUser"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type BlockedUserOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type BlockedUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_channelId?: BlockedUserUserIdChannelIdCompoundUniqueInput
    AND?: BlockedUserWhereInput | BlockedUserWhereInput[]
    OR?: BlockedUserWhereInput[]
    NOT?: BlockedUserWhereInput | BlockedUserWhereInput[]
    userId?: StringFilter<"BlockedUser"> | string
    channelId?: StringFilter<"BlockedUser"> | string
    channelName?: StringNullableFilter<"BlockedUser"> | string | null
    createdAt?: DateTimeFilter<"BlockedUser"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_channelId">

  export type BlockedUserOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: BlockedUserCountOrderByAggregateInput
    _max?: BlockedUserMaxOrderByAggregateInput
    _min?: BlockedUserMinOrderByAggregateInput
  }

  export type BlockedUserScalarWhereWithAggregatesInput = {
    AND?: BlockedUserScalarWhereWithAggregatesInput | BlockedUserScalarWhereWithAggregatesInput[]
    OR?: BlockedUserScalarWhereWithAggregatesInput[]
    NOT?: BlockedUserScalarWhereWithAggregatesInput | BlockedUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BlockedUser"> | string
    userId?: StringWithAggregatesFilter<"BlockedUser"> | string
    channelId?: StringWithAggregatesFilter<"BlockedUser"> | string
    channelName?: StringNullableWithAggregatesFilter<"BlockedUser"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BlockedUser"> | Date | string
  }

  export type MutedUserWhereInput = {
    AND?: MutedUserWhereInput | MutedUserWhereInput[]
    OR?: MutedUserWhereInput[]
    NOT?: MutedUserWhereInput | MutedUserWhereInput[]
    id?: StringFilter<"MutedUser"> | string
    userId?: StringFilter<"MutedUser"> | string
    channelId?: StringFilter<"MutedUser"> | string
    channelName?: StringNullableFilter<"MutedUser"> | string | null
    createdAt?: DateTimeFilter<"MutedUser"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MutedUserOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type MutedUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_channelId?: MutedUserUserIdChannelIdCompoundUniqueInput
    AND?: MutedUserWhereInput | MutedUserWhereInput[]
    OR?: MutedUserWhereInput[]
    NOT?: MutedUserWhereInput | MutedUserWhereInput[]
    userId?: StringFilter<"MutedUser"> | string
    channelId?: StringFilter<"MutedUser"> | string
    channelName?: StringNullableFilter<"MutedUser"> | string | null
    createdAt?: DateTimeFilter<"MutedUser"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_channelId">

  export type MutedUserOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MutedUserCountOrderByAggregateInput
    _max?: MutedUserMaxOrderByAggregateInput
    _min?: MutedUserMinOrderByAggregateInput
  }

  export type MutedUserScalarWhereWithAggregatesInput = {
    AND?: MutedUserScalarWhereWithAggregatesInput | MutedUserScalarWhereWithAggregatesInput[]
    OR?: MutedUserScalarWhereWithAggregatesInput[]
    NOT?: MutedUserScalarWhereWithAggregatesInput | MutedUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MutedUser"> | string
    userId?: StringWithAggregatesFilter<"MutedUser"> | string
    channelId?: StringWithAggregatesFilter<"MutedUser"> | string
    channelName?: StringNullableWithAggregatesFilter<"MutedUser"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MutedUser"> | Date | string
  }

  export type ScheduledPostWhereInput = {
    AND?: ScheduledPostWhereInput | ScheduledPostWhereInput[]
    OR?: ScheduledPostWhereInput[]
    NOT?: ScheduledPostWhereInput | ScheduledPostWhereInput[]
    id?: StringFilter<"ScheduledPost"> | string
    userId?: StringFilter<"ScheduledPost"> | string
    videoId?: StringFilter<"ScheduledPost"> | string
    text?: StringFilter<"ScheduledPost"> | string
    scheduledAt?: DateTimeFilter<"ScheduledPost"> | Date | string
    posted?: BoolFilter<"ScheduledPost"> | boolean
    createdAt?: DateTimeFilter<"ScheduledPost"> | Date | string
  }

  export type ScheduledPostOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    text?: SortOrder
    scheduledAt?: SortOrder
    posted?: SortOrder
    createdAt?: SortOrder
  }

  export type ScheduledPostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScheduledPostWhereInput | ScheduledPostWhereInput[]
    OR?: ScheduledPostWhereInput[]
    NOT?: ScheduledPostWhereInput | ScheduledPostWhereInput[]
    userId?: StringFilter<"ScheduledPost"> | string
    videoId?: StringFilter<"ScheduledPost"> | string
    text?: StringFilter<"ScheduledPost"> | string
    scheduledAt?: DateTimeFilter<"ScheduledPost"> | Date | string
    posted?: BoolFilter<"ScheduledPost"> | boolean
    createdAt?: DateTimeFilter<"ScheduledPost"> | Date | string
  }, "id">

  export type ScheduledPostOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    text?: SortOrder
    scheduledAt?: SortOrder
    posted?: SortOrder
    createdAt?: SortOrder
    _count?: ScheduledPostCountOrderByAggregateInput
    _max?: ScheduledPostMaxOrderByAggregateInput
    _min?: ScheduledPostMinOrderByAggregateInput
  }

  export type ScheduledPostScalarWhereWithAggregatesInput = {
    AND?: ScheduledPostScalarWhereWithAggregatesInput | ScheduledPostScalarWhereWithAggregatesInput[]
    OR?: ScheduledPostScalarWhereWithAggregatesInput[]
    NOT?: ScheduledPostScalarWhereWithAggregatesInput | ScheduledPostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ScheduledPost"> | string
    userId?: StringWithAggregatesFilter<"ScheduledPost"> | string
    videoId?: StringWithAggregatesFilter<"ScheduledPost"> | string
    text?: StringWithAggregatesFilter<"ScheduledPost"> | string
    scheduledAt?: DateTimeWithAggregatesFilter<"ScheduledPost"> | Date | string
    posted?: BoolWithAggregatesFilter<"ScheduledPost"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ScheduledPost"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    channelId?: string | null
    ytCredential?: YtCredentialCreateNestedOneWithoutUserInput
    commentLikes?: CommentLikeCreateNestedManyWithoutUserInput
    actions?: UserActionCreateNestedManyWithoutUserInput
    lists?: ListCreateNestedManyWithoutUserInput
    listFollows?: ListFollowCreateNestedManyWithoutUserInput
    bookmarkFolders?: BookmarkFolderCreateNestedManyWithoutUserInput
    blockedUsers?: BlockedUserCreateNestedManyWithoutUserInput
    mutedUsers?: MutedUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    channelId?: string | null
    ytCredential?: YtCredentialUncheckedCreateNestedOneWithoutUserInput
    commentLikes?: CommentLikeUncheckedCreateNestedManyWithoutUserInput
    actions?: UserActionUncheckedCreateNestedManyWithoutUserInput
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
    listFollows?: ListFollowUncheckedCreateNestedManyWithoutUserInput
    bookmarkFolders?: BookmarkFolderUncheckedCreateNestedManyWithoutUserInput
    blockedUsers?: BlockedUserUncheckedCreateNestedManyWithoutUserInput
    mutedUsers?: MutedUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    ytCredential?: YtCredentialUpdateOneWithoutUserNestedInput
    commentLikes?: CommentLikeUpdateManyWithoutUserNestedInput
    actions?: UserActionUpdateManyWithoutUserNestedInput
    lists?: ListUpdateManyWithoutUserNestedInput
    listFollows?: ListFollowUpdateManyWithoutUserNestedInput
    bookmarkFolders?: BookmarkFolderUpdateManyWithoutUserNestedInput
    blockedUsers?: BlockedUserUpdateManyWithoutUserNestedInput
    mutedUsers?: MutedUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    ytCredential?: YtCredentialUncheckedUpdateOneWithoutUserNestedInput
    commentLikes?: CommentLikeUncheckedUpdateManyWithoutUserNestedInput
    actions?: UserActionUncheckedUpdateManyWithoutUserNestedInput
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
    listFollows?: ListFollowUncheckedUpdateManyWithoutUserNestedInput
    bookmarkFolders?: BookmarkFolderUncheckedUpdateManyWithoutUserNestedInput
    blockedUsers?: BlockedUserUncheckedUpdateManyWithoutUserNestedInput
    mutedUsers?: MutedUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    channelId?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type YtCredentialCreateInput = {
    id?: string
    credential: string
    type: string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutYtCredentialInput
  }

  export type YtCredentialUncheckedCreateInput = {
    id?: string
    userId: string
    credential: string
    type: string
    updatedAt?: Date | string
  }

  export type YtCredentialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    credential?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutYtCredentialNestedInput
  }

  export type YtCredentialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    credential?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YtCredentialCreateManyInput = {
    id?: string
    userId: string
    credential: string
    type: string
    updatedAt?: Date | string
  }

  export type YtCredentialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    credential?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YtCredentialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    credential?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentLikeCreateInput = {
    id?: string
    commentId: string
    videoId: string
    type: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutCommentLikesInput
  }

  export type CommentLikeUncheckedCreateInput = {
    id?: string
    commentId: string
    videoId: string
    userId: string
    type: string
    createdAt?: Date | string
  }

  export type CommentLikeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCommentLikesNestedInput
  }

  export type CommentLikeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentLikeCreateManyInput = {
    id?: string
    commentId: string
    videoId: string
    userId: string
    type: string
    createdAt?: Date | string
  }

  export type CommentLikeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentLikeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserActionCreateInput = {
    id?: string
    videoId: string
    commentId: string
    actionType: string
    content?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutActionsInput
  }

  export type UserActionUncheckedCreateInput = {
    id?: string
    userId: string
    videoId: string
    commentId: string
    actionType: string
    content?: string | null
    createdAt?: Date | string
  }

  export type UserActionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutActionsNestedInput
  }

  export type UserActionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserActionCreateManyInput = {
    id?: string
    userId: string
    videoId: string
    commentId: string
    actionType: string
    content?: string | null
    createdAt?: Date | string
  }

  export type UserActionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserActionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCacheCreateInput = {
    id?: string
    commentId: string
    videoId: string
    authorName: string
    authorChannelId?: string | null
    authorThumb?: string | null
    content: string
    likeCount?: number
    replyCount?: number
    parentCommentId?: string | null
    publishedAt: Date | string
    updatedAt?: Date | string
  }

  export type CommentCacheUncheckedCreateInput = {
    id?: string
    commentId: string
    videoId: string
    authorName: string
    authorChannelId?: string | null
    authorThumb?: string | null
    content: string
    likeCount?: number
    replyCount?: number
    parentCommentId?: string | null
    publishedAt: Date | string
    updatedAt?: Date | string
  }

  export type CommentCacheUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    authorThumb?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    likeCount?: IntFieldUpdateOperationsInput | number
    replyCount?: IntFieldUpdateOperationsInput | number
    parentCommentId?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCacheUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    authorThumb?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    likeCount?: IntFieldUpdateOperationsInput | number
    replyCount?: IntFieldUpdateOperationsInput | number
    parentCommentId?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCacheCreateManyInput = {
    id?: string
    commentId: string
    videoId: string
    authorName: string
    authorChannelId?: string | null
    authorThumb?: string | null
    content: string
    likeCount?: number
    replyCount?: number
    parentCommentId?: string | null
    publishedAt: Date | string
    updatedAt?: Date | string
  }

  export type CommentCacheUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    authorThumb?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    likeCount?: IntFieldUpdateOperationsInput | number
    replyCount?: IntFieldUpdateOperationsInput | number
    parentCommentId?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCacheUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorChannelId?: NullableStringFieldUpdateOperationsInput | string | null
    authorThumb?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    likeCount?: IntFieldUpdateOperationsInput | number
    replyCount?: IntFieldUpdateOperationsInput | number
    parentCommentId?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkCreateInput = {
    id?: string
    userId: string
    commentId: string
    videoId: string
    authorName: string
    authorThumb?: string | null
    content: string
    likeCount: string
    replyCount: string
    publishedTime: string
    createdAt?: Date | string
    folder?: BookmarkFolderCreateNestedOneWithoutBookmarksInput
  }

  export type BookmarkUncheckedCreateInput = {
    id?: string
    userId: string
    folderId?: string | null
    commentId: string
    videoId: string
    authorName: string
    authorThumb?: string | null
    content: string
    likeCount: string
    replyCount: string
    publishedTime: string
    createdAt?: Date | string
  }

  export type BookmarkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorThumb?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    likeCount?: StringFieldUpdateOperationsInput | string
    replyCount?: StringFieldUpdateOperationsInput | string
    publishedTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    folder?: BookmarkFolderUpdateOneWithoutBookmarksNestedInput
  }

  export type BookmarkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorThumb?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    likeCount?: StringFieldUpdateOperationsInput | string
    replyCount?: StringFieldUpdateOperationsInput | string
    publishedTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkCreateManyInput = {
    id?: string
    userId: string
    folderId?: string | null
    commentId: string
    videoId: string
    authorName: string
    authorThumb?: string | null
    content: string
    likeCount: string
    replyCount: string
    publishedTime: string
    createdAt?: Date | string
  }

  export type BookmarkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorThumb?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    likeCount?: StringFieldUpdateOperationsInput | string
    replyCount?: StringFieldUpdateOperationsInput | string
    publishedTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorThumb?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    likeCount?: StringFieldUpdateOperationsInput | string
    replyCount?: StringFieldUpdateOperationsInput | string
    publishedTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListCreateInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutListsInput
    items?: ListItemCreateNestedManyWithoutListInput
    followers?: ListFollowCreateNestedManyWithoutListInput
  }

  export type ListUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ListItemUncheckedCreateNestedManyWithoutListInput
    followers?: ListFollowUncheckedCreateNestedManyWithoutListInput
  }

  export type ListUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutListsNestedInput
    items?: ListItemUpdateManyWithoutListNestedInput
    followers?: ListFollowUpdateManyWithoutListNestedInput
  }

  export type ListUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ListItemUncheckedUpdateManyWithoutListNestedInput
    followers?: ListFollowUncheckedUpdateManyWithoutListNestedInput
  }

  export type ListCreateManyInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ListUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListItemCreateInput = {
    id?: string
    commentId: string
    videoId: string
    authorName: string
    authorThumb?: string | null
    content: string
    likeCount: string
    replyCount: string
    publishedTime: string
    createdAt?: Date | string
    list: ListCreateNestedOneWithoutItemsInput
  }

  export type ListItemUncheckedCreateInput = {
    id?: string
    listId: string
    commentId: string
    videoId: string
    authorName: string
    authorThumb?: string | null
    content: string
    likeCount: string
    replyCount: string
    publishedTime: string
    createdAt?: Date | string
  }

  export type ListItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorThumb?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    likeCount?: StringFieldUpdateOperationsInput | string
    replyCount?: StringFieldUpdateOperationsInput | string
    publishedTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    list?: ListUpdateOneRequiredWithoutItemsNestedInput
  }

  export type ListItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    listId?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorThumb?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    likeCount?: StringFieldUpdateOperationsInput | string
    replyCount?: StringFieldUpdateOperationsInput | string
    publishedTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListItemCreateManyInput = {
    id?: string
    listId: string
    commentId: string
    videoId: string
    authorName: string
    authorThumb?: string | null
    content: string
    likeCount: string
    replyCount: string
    publishedTime: string
    createdAt?: Date | string
  }

  export type ListItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorThumb?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    likeCount?: StringFieldUpdateOperationsInput | string
    replyCount?: StringFieldUpdateOperationsInput | string
    publishedTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    listId?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorThumb?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    likeCount?: StringFieldUpdateOperationsInput | string
    replyCount?: StringFieldUpdateOperationsInput | string
    publishedTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListFollowCreateInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutListFollowsInput
    list: ListCreateNestedOneWithoutFollowersInput
  }

  export type ListFollowUncheckedCreateInput = {
    id?: string
    userId: string
    listId: string
    createdAt?: Date | string
  }

  export type ListFollowUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutListFollowsNestedInput
    list?: ListUpdateOneRequiredWithoutFollowersNestedInput
  }

  export type ListFollowUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    listId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListFollowCreateManyInput = {
    id?: string
    userId: string
    listId: string
    createdAt?: Date | string
  }

  export type ListFollowUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListFollowUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    listId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkFolderCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBookmarkFoldersInput
    bookmarks?: BookmarkCreateNestedManyWithoutFolderInput
  }

  export type BookmarkFolderUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    createdAt?: Date | string
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutFolderInput
  }

  export type BookmarkFolderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookmarkFoldersNestedInput
    bookmarks?: BookmarkUpdateManyWithoutFolderNestedInput
  }

  export type BookmarkFolderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookmarks?: BookmarkUncheckedUpdateManyWithoutFolderNestedInput
  }

  export type BookmarkFolderCreateManyInput = {
    id?: string
    userId: string
    name: string
    createdAt?: Date | string
  }

  export type BookmarkFolderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkFolderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockedUserCreateInput = {
    id?: string
    channelId: string
    channelName?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBlockedUsersInput
  }

  export type BlockedUserUncheckedCreateInput = {
    id?: string
    userId: string
    channelId: string
    channelName?: string | null
    createdAt?: Date | string
  }

  export type BlockedUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBlockedUsersNestedInput
  }

  export type BlockedUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockedUserCreateManyInput = {
    id?: string
    userId: string
    channelId: string
    channelName?: string | null
    createdAt?: Date | string
  }

  export type BlockedUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockedUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MutedUserCreateInput = {
    id?: string
    channelId: string
    channelName?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMutedUsersInput
  }

  export type MutedUserUncheckedCreateInput = {
    id?: string
    userId: string
    channelId: string
    channelName?: string | null
    createdAt?: Date | string
  }

  export type MutedUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMutedUsersNestedInput
  }

  export type MutedUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MutedUserCreateManyInput = {
    id?: string
    userId: string
    channelId: string
    channelName?: string | null
    createdAt?: Date | string
  }

  export type MutedUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MutedUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduledPostCreateInput = {
    id?: string
    userId: string
    videoId: string
    text: string
    scheduledAt: Date | string
    posted?: boolean
    createdAt?: Date | string
  }

  export type ScheduledPostUncheckedCreateInput = {
    id?: string
    userId: string
    videoId: string
    text: string
    scheduledAt: Date | string
    posted?: boolean
    createdAt?: Date | string
  }

  export type ScheduledPostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduledPostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduledPostCreateManyInput = {
    id?: string
    userId: string
    videoId: string
    text: string
    scheduledAt: Date | string
    posted?: boolean
    createdAt?: Date | string
  }

  export type ScheduledPostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduledPostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type YtCredentialNullableScalarRelationFilter = {
    is?: YtCredentialWhereInput | null
    isNot?: YtCredentialWhereInput | null
  }

  export type CommentLikeListRelationFilter = {
    every?: CommentLikeWhereInput
    some?: CommentLikeWhereInput
    none?: CommentLikeWhereInput
  }

  export type UserActionListRelationFilter = {
    every?: UserActionWhereInput
    some?: UserActionWhereInput
    none?: UserActionWhereInput
  }

  export type ListListRelationFilter = {
    every?: ListWhereInput
    some?: ListWhereInput
    none?: ListWhereInput
  }

  export type ListFollowListRelationFilter = {
    every?: ListFollowWhereInput
    some?: ListFollowWhereInput
    none?: ListFollowWhereInput
  }

  export type BookmarkFolderListRelationFilter = {
    every?: BookmarkFolderWhereInput
    some?: BookmarkFolderWhereInput
    none?: BookmarkFolderWhereInput
  }

  export type BlockedUserListRelationFilter = {
    every?: BlockedUserWhereInput
    some?: BlockedUserWhereInput
    none?: BlockedUserWhereInput
  }

  export type MutedUserListRelationFilter = {
    every?: MutedUserWhereInput
    some?: MutedUserWhereInput
    none?: MutedUserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CommentLikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserActionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ListOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ListFollowOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookmarkFolderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BlockedUserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MutedUserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    image?: SortOrder
    channelId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    image?: SortOrder
    channelId?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    image?: SortOrder
    channelId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type YtCredentialCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    credential?: SortOrder
    type?: SortOrder
    updatedAt?: SortOrder
  }

  export type YtCredentialMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    credential?: SortOrder
    type?: SortOrder
    updatedAt?: SortOrder
  }

  export type YtCredentialMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    credential?: SortOrder
    type?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type CommentLikeCommentIdUserIdCompoundUniqueInput = {
    commentId: string
    userId: string
  }

  export type CommentLikeCountOrderByAggregateInput = {
    id?: SortOrder
    commentId?: SortOrder
    videoId?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentLikeMaxOrderByAggregateInput = {
    id?: SortOrder
    commentId?: SortOrder
    videoId?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentLikeMinOrderByAggregateInput = {
    id?: SortOrder
    commentId?: SortOrder
    videoId?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type UserActionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    commentId?: SortOrder
    actionType?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type UserActionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    commentId?: SortOrder
    actionType?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type UserActionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    commentId?: SortOrder
    actionType?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CommentCacheCountOrderByAggregateInput = {
    id?: SortOrder
    commentId?: SortOrder
    videoId?: SortOrder
    authorName?: SortOrder
    authorChannelId?: SortOrder
    authorThumb?: SortOrder
    content?: SortOrder
    likeCount?: SortOrder
    replyCount?: SortOrder
    parentCommentId?: SortOrder
    publishedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentCacheAvgOrderByAggregateInput = {
    likeCount?: SortOrder
    replyCount?: SortOrder
  }

  export type CommentCacheMaxOrderByAggregateInput = {
    id?: SortOrder
    commentId?: SortOrder
    videoId?: SortOrder
    authorName?: SortOrder
    authorChannelId?: SortOrder
    authorThumb?: SortOrder
    content?: SortOrder
    likeCount?: SortOrder
    replyCount?: SortOrder
    parentCommentId?: SortOrder
    publishedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentCacheMinOrderByAggregateInput = {
    id?: SortOrder
    commentId?: SortOrder
    videoId?: SortOrder
    authorName?: SortOrder
    authorChannelId?: SortOrder
    authorThumb?: SortOrder
    content?: SortOrder
    likeCount?: SortOrder
    replyCount?: SortOrder
    parentCommentId?: SortOrder
    publishedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentCacheSumOrderByAggregateInput = {
    likeCount?: SortOrder
    replyCount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BookmarkFolderNullableScalarRelationFilter = {
    is?: BookmarkFolderWhereInput | null
    isNot?: BookmarkFolderWhereInput | null
  }

  export type BookmarkUserIdCommentIdCompoundUniqueInput = {
    userId: string
    commentId: string
  }

  export type BookmarkCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    folderId?: SortOrder
    commentId?: SortOrder
    videoId?: SortOrder
    authorName?: SortOrder
    authorThumb?: SortOrder
    content?: SortOrder
    likeCount?: SortOrder
    replyCount?: SortOrder
    publishedTime?: SortOrder
    createdAt?: SortOrder
  }

  export type BookmarkMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    folderId?: SortOrder
    commentId?: SortOrder
    videoId?: SortOrder
    authorName?: SortOrder
    authorThumb?: SortOrder
    content?: SortOrder
    likeCount?: SortOrder
    replyCount?: SortOrder
    publishedTime?: SortOrder
    createdAt?: SortOrder
  }

  export type BookmarkMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    folderId?: SortOrder
    commentId?: SortOrder
    videoId?: SortOrder
    authorName?: SortOrder
    authorThumb?: SortOrder
    content?: SortOrder
    likeCount?: SortOrder
    replyCount?: SortOrder
    publishedTime?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ListItemListRelationFilter = {
    every?: ListItemWhereInput
    some?: ListItemWhereInput
    none?: ListItemWhereInput
  }

  export type ListItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ListCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ListMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ListMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ListScalarRelationFilter = {
    is?: ListWhereInput
    isNot?: ListWhereInput
  }

  export type ListItemListIdCommentIdCompoundUniqueInput = {
    listId: string
    commentId: string
  }

  export type ListItemCountOrderByAggregateInput = {
    id?: SortOrder
    listId?: SortOrder
    commentId?: SortOrder
    videoId?: SortOrder
    authorName?: SortOrder
    authorThumb?: SortOrder
    content?: SortOrder
    likeCount?: SortOrder
    replyCount?: SortOrder
    publishedTime?: SortOrder
    createdAt?: SortOrder
  }

  export type ListItemMaxOrderByAggregateInput = {
    id?: SortOrder
    listId?: SortOrder
    commentId?: SortOrder
    videoId?: SortOrder
    authorName?: SortOrder
    authorThumb?: SortOrder
    content?: SortOrder
    likeCount?: SortOrder
    replyCount?: SortOrder
    publishedTime?: SortOrder
    createdAt?: SortOrder
  }

  export type ListItemMinOrderByAggregateInput = {
    id?: SortOrder
    listId?: SortOrder
    commentId?: SortOrder
    videoId?: SortOrder
    authorName?: SortOrder
    authorThumb?: SortOrder
    content?: SortOrder
    likeCount?: SortOrder
    replyCount?: SortOrder
    publishedTime?: SortOrder
    createdAt?: SortOrder
  }

  export type ListFollowUserIdListIdCompoundUniqueInput = {
    userId: string
    listId: string
  }

  export type ListFollowCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    listId?: SortOrder
    createdAt?: SortOrder
  }

  export type ListFollowMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    listId?: SortOrder
    createdAt?: SortOrder
  }

  export type ListFollowMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    listId?: SortOrder
    createdAt?: SortOrder
  }

  export type BookmarkListRelationFilter = {
    every?: BookmarkWhereInput
    some?: BookmarkWhereInput
    none?: BookmarkWhereInput
  }

  export type BookmarkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookmarkFolderCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type BookmarkFolderMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type BookmarkFolderMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type BlockedUserUserIdChannelIdCompoundUniqueInput = {
    userId: string
    channelId: string
  }

  export type BlockedUserCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrder
    createdAt?: SortOrder
  }

  export type BlockedUserMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrder
    createdAt?: SortOrder
  }

  export type BlockedUserMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrder
    createdAt?: SortOrder
  }

  export type MutedUserUserIdChannelIdCompoundUniqueInput = {
    userId: string
    channelId: string
  }

  export type MutedUserCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrder
    createdAt?: SortOrder
  }

  export type MutedUserMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrder
    createdAt?: SortOrder
  }

  export type MutedUserMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrder
    createdAt?: SortOrder
  }

  export type ScheduledPostCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    text?: SortOrder
    scheduledAt?: SortOrder
    posted?: SortOrder
    createdAt?: SortOrder
  }

  export type ScheduledPostMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    text?: SortOrder
    scheduledAt?: SortOrder
    posted?: SortOrder
    createdAt?: SortOrder
  }

  export type ScheduledPostMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    videoId?: SortOrder
    text?: SortOrder
    scheduledAt?: SortOrder
    posted?: SortOrder
    createdAt?: SortOrder
  }

  export type YtCredentialCreateNestedOneWithoutUserInput = {
    create?: XOR<YtCredentialCreateWithoutUserInput, YtCredentialUncheckedCreateWithoutUserInput>
    connectOrCreate?: YtCredentialCreateOrConnectWithoutUserInput
    connect?: YtCredentialWhereUniqueInput
  }

  export type CommentLikeCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentLikeCreateWithoutUserInput, CommentLikeUncheckedCreateWithoutUserInput> | CommentLikeCreateWithoutUserInput[] | CommentLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentLikeCreateOrConnectWithoutUserInput | CommentLikeCreateOrConnectWithoutUserInput[]
    createMany?: CommentLikeCreateManyUserInputEnvelope
    connect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
  }

  export type UserActionCreateNestedManyWithoutUserInput = {
    create?: XOR<UserActionCreateWithoutUserInput, UserActionUncheckedCreateWithoutUserInput> | UserActionCreateWithoutUserInput[] | UserActionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserActionCreateOrConnectWithoutUserInput | UserActionCreateOrConnectWithoutUserInput[]
    createMany?: UserActionCreateManyUserInputEnvelope
    connect?: UserActionWhereUniqueInput | UserActionWhereUniqueInput[]
  }

  export type ListCreateNestedManyWithoutUserInput = {
    create?: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput> | ListCreateWithoutUserInput[] | ListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListCreateOrConnectWithoutUserInput | ListCreateOrConnectWithoutUserInput[]
    createMany?: ListCreateManyUserInputEnvelope
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
  }

  export type ListFollowCreateNestedManyWithoutUserInput = {
    create?: XOR<ListFollowCreateWithoutUserInput, ListFollowUncheckedCreateWithoutUserInput> | ListFollowCreateWithoutUserInput[] | ListFollowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListFollowCreateOrConnectWithoutUserInput | ListFollowCreateOrConnectWithoutUserInput[]
    createMany?: ListFollowCreateManyUserInputEnvelope
    connect?: ListFollowWhereUniqueInput | ListFollowWhereUniqueInput[]
  }

  export type BookmarkFolderCreateNestedManyWithoutUserInput = {
    create?: XOR<BookmarkFolderCreateWithoutUserInput, BookmarkFolderUncheckedCreateWithoutUserInput> | BookmarkFolderCreateWithoutUserInput[] | BookmarkFolderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookmarkFolderCreateOrConnectWithoutUserInput | BookmarkFolderCreateOrConnectWithoutUserInput[]
    createMany?: BookmarkFolderCreateManyUserInputEnvelope
    connect?: BookmarkFolderWhereUniqueInput | BookmarkFolderWhereUniqueInput[]
  }

  export type BlockedUserCreateNestedManyWithoutUserInput = {
    create?: XOR<BlockedUserCreateWithoutUserInput, BlockedUserUncheckedCreateWithoutUserInput> | BlockedUserCreateWithoutUserInput[] | BlockedUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BlockedUserCreateOrConnectWithoutUserInput | BlockedUserCreateOrConnectWithoutUserInput[]
    createMany?: BlockedUserCreateManyUserInputEnvelope
    connect?: BlockedUserWhereUniqueInput | BlockedUserWhereUniqueInput[]
  }

  export type MutedUserCreateNestedManyWithoutUserInput = {
    create?: XOR<MutedUserCreateWithoutUserInput, MutedUserUncheckedCreateWithoutUserInput> | MutedUserCreateWithoutUserInput[] | MutedUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MutedUserCreateOrConnectWithoutUserInput | MutedUserCreateOrConnectWithoutUserInput[]
    createMany?: MutedUserCreateManyUserInputEnvelope
    connect?: MutedUserWhereUniqueInput | MutedUserWhereUniqueInput[]
  }

  export type YtCredentialUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<YtCredentialCreateWithoutUserInput, YtCredentialUncheckedCreateWithoutUserInput>
    connectOrCreate?: YtCredentialCreateOrConnectWithoutUserInput
    connect?: YtCredentialWhereUniqueInput
  }

  export type CommentLikeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentLikeCreateWithoutUserInput, CommentLikeUncheckedCreateWithoutUserInput> | CommentLikeCreateWithoutUserInput[] | CommentLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentLikeCreateOrConnectWithoutUserInput | CommentLikeCreateOrConnectWithoutUserInput[]
    createMany?: CommentLikeCreateManyUserInputEnvelope
    connect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
  }

  export type UserActionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserActionCreateWithoutUserInput, UserActionUncheckedCreateWithoutUserInput> | UserActionCreateWithoutUserInput[] | UserActionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserActionCreateOrConnectWithoutUserInput | UserActionCreateOrConnectWithoutUserInput[]
    createMany?: UserActionCreateManyUserInputEnvelope
    connect?: UserActionWhereUniqueInput | UserActionWhereUniqueInput[]
  }

  export type ListUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput> | ListCreateWithoutUserInput[] | ListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListCreateOrConnectWithoutUserInput | ListCreateOrConnectWithoutUserInput[]
    createMany?: ListCreateManyUserInputEnvelope
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
  }

  export type ListFollowUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ListFollowCreateWithoutUserInput, ListFollowUncheckedCreateWithoutUserInput> | ListFollowCreateWithoutUserInput[] | ListFollowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListFollowCreateOrConnectWithoutUserInput | ListFollowCreateOrConnectWithoutUserInput[]
    createMany?: ListFollowCreateManyUserInputEnvelope
    connect?: ListFollowWhereUniqueInput | ListFollowWhereUniqueInput[]
  }

  export type BookmarkFolderUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BookmarkFolderCreateWithoutUserInput, BookmarkFolderUncheckedCreateWithoutUserInput> | BookmarkFolderCreateWithoutUserInput[] | BookmarkFolderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookmarkFolderCreateOrConnectWithoutUserInput | BookmarkFolderCreateOrConnectWithoutUserInput[]
    createMany?: BookmarkFolderCreateManyUserInputEnvelope
    connect?: BookmarkFolderWhereUniqueInput | BookmarkFolderWhereUniqueInput[]
  }

  export type BlockedUserUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BlockedUserCreateWithoutUserInput, BlockedUserUncheckedCreateWithoutUserInput> | BlockedUserCreateWithoutUserInput[] | BlockedUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BlockedUserCreateOrConnectWithoutUserInput | BlockedUserCreateOrConnectWithoutUserInput[]
    createMany?: BlockedUserCreateManyUserInputEnvelope
    connect?: BlockedUserWhereUniqueInput | BlockedUserWhereUniqueInput[]
  }

  export type MutedUserUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MutedUserCreateWithoutUserInput, MutedUserUncheckedCreateWithoutUserInput> | MutedUserCreateWithoutUserInput[] | MutedUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MutedUserCreateOrConnectWithoutUserInput | MutedUserCreateOrConnectWithoutUserInput[]
    createMany?: MutedUserCreateManyUserInputEnvelope
    connect?: MutedUserWhereUniqueInput | MutedUserWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type YtCredentialUpdateOneWithoutUserNestedInput = {
    create?: XOR<YtCredentialCreateWithoutUserInput, YtCredentialUncheckedCreateWithoutUserInput>
    connectOrCreate?: YtCredentialCreateOrConnectWithoutUserInput
    upsert?: YtCredentialUpsertWithoutUserInput
    disconnect?: YtCredentialWhereInput | boolean
    delete?: YtCredentialWhereInput | boolean
    connect?: YtCredentialWhereUniqueInput
    update?: XOR<XOR<YtCredentialUpdateToOneWithWhereWithoutUserInput, YtCredentialUpdateWithoutUserInput>, YtCredentialUncheckedUpdateWithoutUserInput>
  }

  export type CommentLikeUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentLikeCreateWithoutUserInput, CommentLikeUncheckedCreateWithoutUserInput> | CommentLikeCreateWithoutUserInput[] | CommentLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentLikeCreateOrConnectWithoutUserInput | CommentLikeCreateOrConnectWithoutUserInput[]
    upsert?: CommentLikeUpsertWithWhereUniqueWithoutUserInput | CommentLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentLikeCreateManyUserInputEnvelope
    set?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    disconnect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    delete?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    connect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    update?: CommentLikeUpdateWithWhereUniqueWithoutUserInput | CommentLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentLikeUpdateManyWithWhereWithoutUserInput | CommentLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentLikeScalarWhereInput | CommentLikeScalarWhereInput[]
  }

  export type UserActionUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserActionCreateWithoutUserInput, UserActionUncheckedCreateWithoutUserInput> | UserActionCreateWithoutUserInput[] | UserActionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserActionCreateOrConnectWithoutUserInput | UserActionCreateOrConnectWithoutUserInput[]
    upsert?: UserActionUpsertWithWhereUniqueWithoutUserInput | UserActionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserActionCreateManyUserInputEnvelope
    set?: UserActionWhereUniqueInput | UserActionWhereUniqueInput[]
    disconnect?: UserActionWhereUniqueInput | UserActionWhereUniqueInput[]
    delete?: UserActionWhereUniqueInput | UserActionWhereUniqueInput[]
    connect?: UserActionWhereUniqueInput | UserActionWhereUniqueInput[]
    update?: UserActionUpdateWithWhereUniqueWithoutUserInput | UserActionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserActionUpdateManyWithWhereWithoutUserInput | UserActionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserActionScalarWhereInput | UserActionScalarWhereInput[]
  }

  export type ListUpdateManyWithoutUserNestedInput = {
    create?: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput> | ListCreateWithoutUserInput[] | ListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListCreateOrConnectWithoutUserInput | ListCreateOrConnectWithoutUserInput[]
    upsert?: ListUpsertWithWhereUniqueWithoutUserInput | ListUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ListCreateManyUserInputEnvelope
    set?: ListWhereUniqueInput | ListWhereUniqueInput[]
    disconnect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    delete?: ListWhereUniqueInput | ListWhereUniqueInput[]
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    update?: ListUpdateWithWhereUniqueWithoutUserInput | ListUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ListUpdateManyWithWhereWithoutUserInput | ListUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ListScalarWhereInput | ListScalarWhereInput[]
  }

  export type ListFollowUpdateManyWithoutUserNestedInput = {
    create?: XOR<ListFollowCreateWithoutUserInput, ListFollowUncheckedCreateWithoutUserInput> | ListFollowCreateWithoutUserInput[] | ListFollowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListFollowCreateOrConnectWithoutUserInput | ListFollowCreateOrConnectWithoutUserInput[]
    upsert?: ListFollowUpsertWithWhereUniqueWithoutUserInput | ListFollowUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ListFollowCreateManyUserInputEnvelope
    set?: ListFollowWhereUniqueInput | ListFollowWhereUniqueInput[]
    disconnect?: ListFollowWhereUniqueInput | ListFollowWhereUniqueInput[]
    delete?: ListFollowWhereUniqueInput | ListFollowWhereUniqueInput[]
    connect?: ListFollowWhereUniqueInput | ListFollowWhereUniqueInput[]
    update?: ListFollowUpdateWithWhereUniqueWithoutUserInput | ListFollowUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ListFollowUpdateManyWithWhereWithoutUserInput | ListFollowUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ListFollowScalarWhereInput | ListFollowScalarWhereInput[]
  }

  export type BookmarkFolderUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookmarkFolderCreateWithoutUserInput, BookmarkFolderUncheckedCreateWithoutUserInput> | BookmarkFolderCreateWithoutUserInput[] | BookmarkFolderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookmarkFolderCreateOrConnectWithoutUserInput | BookmarkFolderCreateOrConnectWithoutUserInput[]
    upsert?: BookmarkFolderUpsertWithWhereUniqueWithoutUserInput | BookmarkFolderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookmarkFolderCreateManyUserInputEnvelope
    set?: BookmarkFolderWhereUniqueInput | BookmarkFolderWhereUniqueInput[]
    disconnect?: BookmarkFolderWhereUniqueInput | BookmarkFolderWhereUniqueInput[]
    delete?: BookmarkFolderWhereUniqueInput | BookmarkFolderWhereUniqueInput[]
    connect?: BookmarkFolderWhereUniqueInput | BookmarkFolderWhereUniqueInput[]
    update?: BookmarkFolderUpdateWithWhereUniqueWithoutUserInput | BookmarkFolderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookmarkFolderUpdateManyWithWhereWithoutUserInput | BookmarkFolderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookmarkFolderScalarWhereInput | BookmarkFolderScalarWhereInput[]
  }

  export type BlockedUserUpdateManyWithoutUserNestedInput = {
    create?: XOR<BlockedUserCreateWithoutUserInput, BlockedUserUncheckedCreateWithoutUserInput> | BlockedUserCreateWithoutUserInput[] | BlockedUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BlockedUserCreateOrConnectWithoutUserInput | BlockedUserCreateOrConnectWithoutUserInput[]
    upsert?: BlockedUserUpsertWithWhereUniqueWithoutUserInput | BlockedUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BlockedUserCreateManyUserInputEnvelope
    set?: BlockedUserWhereUniqueInput | BlockedUserWhereUniqueInput[]
    disconnect?: BlockedUserWhereUniqueInput | BlockedUserWhereUniqueInput[]
    delete?: BlockedUserWhereUniqueInput | BlockedUserWhereUniqueInput[]
    connect?: BlockedUserWhereUniqueInput | BlockedUserWhereUniqueInput[]
    update?: BlockedUserUpdateWithWhereUniqueWithoutUserInput | BlockedUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BlockedUserUpdateManyWithWhereWithoutUserInput | BlockedUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BlockedUserScalarWhereInput | BlockedUserScalarWhereInput[]
  }

  export type MutedUserUpdateManyWithoutUserNestedInput = {
    create?: XOR<MutedUserCreateWithoutUserInput, MutedUserUncheckedCreateWithoutUserInput> | MutedUserCreateWithoutUserInput[] | MutedUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MutedUserCreateOrConnectWithoutUserInput | MutedUserCreateOrConnectWithoutUserInput[]
    upsert?: MutedUserUpsertWithWhereUniqueWithoutUserInput | MutedUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MutedUserCreateManyUserInputEnvelope
    set?: MutedUserWhereUniqueInput | MutedUserWhereUniqueInput[]
    disconnect?: MutedUserWhereUniqueInput | MutedUserWhereUniqueInput[]
    delete?: MutedUserWhereUniqueInput | MutedUserWhereUniqueInput[]
    connect?: MutedUserWhereUniqueInput | MutedUserWhereUniqueInput[]
    update?: MutedUserUpdateWithWhereUniqueWithoutUserInput | MutedUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MutedUserUpdateManyWithWhereWithoutUserInput | MutedUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MutedUserScalarWhereInput | MutedUserScalarWhereInput[]
  }

  export type YtCredentialUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<YtCredentialCreateWithoutUserInput, YtCredentialUncheckedCreateWithoutUserInput>
    connectOrCreate?: YtCredentialCreateOrConnectWithoutUserInput
    upsert?: YtCredentialUpsertWithoutUserInput
    disconnect?: YtCredentialWhereInput | boolean
    delete?: YtCredentialWhereInput | boolean
    connect?: YtCredentialWhereUniqueInput
    update?: XOR<XOR<YtCredentialUpdateToOneWithWhereWithoutUserInput, YtCredentialUpdateWithoutUserInput>, YtCredentialUncheckedUpdateWithoutUserInput>
  }

  export type CommentLikeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentLikeCreateWithoutUserInput, CommentLikeUncheckedCreateWithoutUserInput> | CommentLikeCreateWithoutUserInput[] | CommentLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentLikeCreateOrConnectWithoutUserInput | CommentLikeCreateOrConnectWithoutUserInput[]
    upsert?: CommentLikeUpsertWithWhereUniqueWithoutUserInput | CommentLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentLikeCreateManyUserInputEnvelope
    set?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    disconnect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    delete?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    connect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    update?: CommentLikeUpdateWithWhereUniqueWithoutUserInput | CommentLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentLikeUpdateManyWithWhereWithoutUserInput | CommentLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentLikeScalarWhereInput | CommentLikeScalarWhereInput[]
  }

  export type UserActionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserActionCreateWithoutUserInput, UserActionUncheckedCreateWithoutUserInput> | UserActionCreateWithoutUserInput[] | UserActionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserActionCreateOrConnectWithoutUserInput | UserActionCreateOrConnectWithoutUserInput[]
    upsert?: UserActionUpsertWithWhereUniqueWithoutUserInput | UserActionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserActionCreateManyUserInputEnvelope
    set?: UserActionWhereUniqueInput | UserActionWhereUniqueInput[]
    disconnect?: UserActionWhereUniqueInput | UserActionWhereUniqueInput[]
    delete?: UserActionWhereUniqueInput | UserActionWhereUniqueInput[]
    connect?: UserActionWhereUniqueInput | UserActionWhereUniqueInput[]
    update?: UserActionUpdateWithWhereUniqueWithoutUserInput | UserActionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserActionUpdateManyWithWhereWithoutUserInput | UserActionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserActionScalarWhereInput | UserActionScalarWhereInput[]
  }

  export type ListUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput> | ListCreateWithoutUserInput[] | ListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListCreateOrConnectWithoutUserInput | ListCreateOrConnectWithoutUserInput[]
    upsert?: ListUpsertWithWhereUniqueWithoutUserInput | ListUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ListCreateManyUserInputEnvelope
    set?: ListWhereUniqueInput | ListWhereUniqueInput[]
    disconnect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    delete?: ListWhereUniqueInput | ListWhereUniqueInput[]
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    update?: ListUpdateWithWhereUniqueWithoutUserInput | ListUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ListUpdateManyWithWhereWithoutUserInput | ListUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ListScalarWhereInput | ListScalarWhereInput[]
  }

  export type ListFollowUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ListFollowCreateWithoutUserInput, ListFollowUncheckedCreateWithoutUserInput> | ListFollowCreateWithoutUserInput[] | ListFollowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListFollowCreateOrConnectWithoutUserInput | ListFollowCreateOrConnectWithoutUserInput[]
    upsert?: ListFollowUpsertWithWhereUniqueWithoutUserInput | ListFollowUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ListFollowCreateManyUserInputEnvelope
    set?: ListFollowWhereUniqueInput | ListFollowWhereUniqueInput[]
    disconnect?: ListFollowWhereUniqueInput | ListFollowWhereUniqueInput[]
    delete?: ListFollowWhereUniqueInput | ListFollowWhereUniqueInput[]
    connect?: ListFollowWhereUniqueInput | ListFollowWhereUniqueInput[]
    update?: ListFollowUpdateWithWhereUniqueWithoutUserInput | ListFollowUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ListFollowUpdateManyWithWhereWithoutUserInput | ListFollowUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ListFollowScalarWhereInput | ListFollowScalarWhereInput[]
  }

  export type BookmarkFolderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookmarkFolderCreateWithoutUserInput, BookmarkFolderUncheckedCreateWithoutUserInput> | BookmarkFolderCreateWithoutUserInput[] | BookmarkFolderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookmarkFolderCreateOrConnectWithoutUserInput | BookmarkFolderCreateOrConnectWithoutUserInput[]
    upsert?: BookmarkFolderUpsertWithWhereUniqueWithoutUserInput | BookmarkFolderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookmarkFolderCreateManyUserInputEnvelope
    set?: BookmarkFolderWhereUniqueInput | BookmarkFolderWhereUniqueInput[]
    disconnect?: BookmarkFolderWhereUniqueInput | BookmarkFolderWhereUniqueInput[]
    delete?: BookmarkFolderWhereUniqueInput | BookmarkFolderWhereUniqueInput[]
    connect?: BookmarkFolderWhereUniqueInput | BookmarkFolderWhereUniqueInput[]
    update?: BookmarkFolderUpdateWithWhereUniqueWithoutUserInput | BookmarkFolderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookmarkFolderUpdateManyWithWhereWithoutUserInput | BookmarkFolderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookmarkFolderScalarWhereInput | BookmarkFolderScalarWhereInput[]
  }

  export type BlockedUserUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BlockedUserCreateWithoutUserInput, BlockedUserUncheckedCreateWithoutUserInput> | BlockedUserCreateWithoutUserInput[] | BlockedUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BlockedUserCreateOrConnectWithoutUserInput | BlockedUserCreateOrConnectWithoutUserInput[]
    upsert?: BlockedUserUpsertWithWhereUniqueWithoutUserInput | BlockedUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BlockedUserCreateManyUserInputEnvelope
    set?: BlockedUserWhereUniqueInput | BlockedUserWhereUniqueInput[]
    disconnect?: BlockedUserWhereUniqueInput | BlockedUserWhereUniqueInput[]
    delete?: BlockedUserWhereUniqueInput | BlockedUserWhereUniqueInput[]
    connect?: BlockedUserWhereUniqueInput | BlockedUserWhereUniqueInput[]
    update?: BlockedUserUpdateWithWhereUniqueWithoutUserInput | BlockedUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BlockedUserUpdateManyWithWhereWithoutUserInput | BlockedUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BlockedUserScalarWhereInput | BlockedUserScalarWhereInput[]
  }

  export type MutedUserUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MutedUserCreateWithoutUserInput, MutedUserUncheckedCreateWithoutUserInput> | MutedUserCreateWithoutUserInput[] | MutedUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MutedUserCreateOrConnectWithoutUserInput | MutedUserCreateOrConnectWithoutUserInput[]
    upsert?: MutedUserUpsertWithWhereUniqueWithoutUserInput | MutedUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MutedUserCreateManyUserInputEnvelope
    set?: MutedUserWhereUniqueInput | MutedUserWhereUniqueInput[]
    disconnect?: MutedUserWhereUniqueInput | MutedUserWhereUniqueInput[]
    delete?: MutedUserWhereUniqueInput | MutedUserWhereUniqueInput[]
    connect?: MutedUserWhereUniqueInput | MutedUserWhereUniqueInput[]
    update?: MutedUserUpdateWithWhereUniqueWithoutUserInput | MutedUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MutedUserUpdateManyWithWhereWithoutUserInput | MutedUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MutedUserScalarWhereInput | MutedUserScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutYtCredentialInput = {
    create?: XOR<UserCreateWithoutYtCredentialInput, UserUncheckedCreateWithoutYtCredentialInput>
    connectOrCreate?: UserCreateOrConnectWithoutYtCredentialInput
    connect?: UserWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutYtCredentialNestedInput = {
    create?: XOR<UserCreateWithoutYtCredentialInput, UserUncheckedCreateWithoutYtCredentialInput>
    connectOrCreate?: UserCreateOrConnectWithoutYtCredentialInput
    upsert?: UserUpsertWithoutYtCredentialInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutYtCredentialInput, UserUpdateWithoutYtCredentialInput>, UserUncheckedUpdateWithoutYtCredentialInput>
  }

  export type UserCreateNestedOneWithoutCommentLikesInput = {
    create?: XOR<UserCreateWithoutCommentLikesInput, UserUncheckedCreateWithoutCommentLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentLikesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCommentLikesNestedInput = {
    create?: XOR<UserCreateWithoutCommentLikesInput, UserUncheckedCreateWithoutCommentLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentLikesInput
    upsert?: UserUpsertWithoutCommentLikesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommentLikesInput, UserUpdateWithoutCommentLikesInput>, UserUncheckedUpdateWithoutCommentLikesInput>
  }

  export type UserCreateNestedOneWithoutActionsInput = {
    create?: XOR<UserCreateWithoutActionsInput, UserUncheckedCreateWithoutActionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutActionsNestedInput = {
    create?: XOR<UserCreateWithoutActionsInput, UserUncheckedCreateWithoutActionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActionsInput
    upsert?: UserUpsertWithoutActionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActionsInput, UserUpdateWithoutActionsInput>, UserUncheckedUpdateWithoutActionsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BookmarkFolderCreateNestedOneWithoutBookmarksInput = {
    create?: XOR<BookmarkFolderCreateWithoutBookmarksInput, BookmarkFolderUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: BookmarkFolderCreateOrConnectWithoutBookmarksInput
    connect?: BookmarkFolderWhereUniqueInput
  }

  export type BookmarkFolderUpdateOneWithoutBookmarksNestedInput = {
    create?: XOR<BookmarkFolderCreateWithoutBookmarksInput, BookmarkFolderUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: BookmarkFolderCreateOrConnectWithoutBookmarksInput
    upsert?: BookmarkFolderUpsertWithoutBookmarksInput
    disconnect?: BookmarkFolderWhereInput | boolean
    delete?: BookmarkFolderWhereInput | boolean
    connect?: BookmarkFolderWhereUniqueInput
    update?: XOR<XOR<BookmarkFolderUpdateToOneWithWhereWithoutBookmarksInput, BookmarkFolderUpdateWithoutBookmarksInput>, BookmarkFolderUncheckedUpdateWithoutBookmarksInput>
  }

  export type UserCreateNestedOneWithoutListsInput = {
    create?: XOR<UserCreateWithoutListsInput, UserUncheckedCreateWithoutListsInput>
    connectOrCreate?: UserCreateOrConnectWithoutListsInput
    connect?: UserWhereUniqueInput
  }

  export type ListItemCreateNestedManyWithoutListInput = {
    create?: XOR<ListItemCreateWithoutListInput, ListItemUncheckedCreateWithoutListInput> | ListItemCreateWithoutListInput[] | ListItemUncheckedCreateWithoutListInput[]
    connectOrCreate?: ListItemCreateOrConnectWithoutListInput | ListItemCreateOrConnectWithoutListInput[]
    createMany?: ListItemCreateManyListInputEnvelope
    connect?: ListItemWhereUniqueInput | ListItemWhereUniqueInput[]
  }

  export type ListFollowCreateNestedManyWithoutListInput = {
    create?: XOR<ListFollowCreateWithoutListInput, ListFollowUncheckedCreateWithoutListInput> | ListFollowCreateWithoutListInput[] | ListFollowUncheckedCreateWithoutListInput[]
    connectOrCreate?: ListFollowCreateOrConnectWithoutListInput | ListFollowCreateOrConnectWithoutListInput[]
    createMany?: ListFollowCreateManyListInputEnvelope
    connect?: ListFollowWhereUniqueInput | ListFollowWhereUniqueInput[]
  }

  export type ListItemUncheckedCreateNestedManyWithoutListInput = {
    create?: XOR<ListItemCreateWithoutListInput, ListItemUncheckedCreateWithoutListInput> | ListItemCreateWithoutListInput[] | ListItemUncheckedCreateWithoutListInput[]
    connectOrCreate?: ListItemCreateOrConnectWithoutListInput | ListItemCreateOrConnectWithoutListInput[]
    createMany?: ListItemCreateManyListInputEnvelope
    connect?: ListItemWhereUniqueInput | ListItemWhereUniqueInput[]
  }

  export type ListFollowUncheckedCreateNestedManyWithoutListInput = {
    create?: XOR<ListFollowCreateWithoutListInput, ListFollowUncheckedCreateWithoutListInput> | ListFollowCreateWithoutListInput[] | ListFollowUncheckedCreateWithoutListInput[]
    connectOrCreate?: ListFollowCreateOrConnectWithoutListInput | ListFollowCreateOrConnectWithoutListInput[]
    createMany?: ListFollowCreateManyListInputEnvelope
    connect?: ListFollowWhereUniqueInput | ListFollowWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutListsNestedInput = {
    create?: XOR<UserCreateWithoutListsInput, UserUncheckedCreateWithoutListsInput>
    connectOrCreate?: UserCreateOrConnectWithoutListsInput
    upsert?: UserUpsertWithoutListsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutListsInput, UserUpdateWithoutListsInput>, UserUncheckedUpdateWithoutListsInput>
  }

  export type ListItemUpdateManyWithoutListNestedInput = {
    create?: XOR<ListItemCreateWithoutListInput, ListItemUncheckedCreateWithoutListInput> | ListItemCreateWithoutListInput[] | ListItemUncheckedCreateWithoutListInput[]
    connectOrCreate?: ListItemCreateOrConnectWithoutListInput | ListItemCreateOrConnectWithoutListInput[]
    upsert?: ListItemUpsertWithWhereUniqueWithoutListInput | ListItemUpsertWithWhereUniqueWithoutListInput[]
    createMany?: ListItemCreateManyListInputEnvelope
    set?: ListItemWhereUniqueInput | ListItemWhereUniqueInput[]
    disconnect?: ListItemWhereUniqueInput | ListItemWhereUniqueInput[]
    delete?: ListItemWhereUniqueInput | ListItemWhereUniqueInput[]
    connect?: ListItemWhereUniqueInput | ListItemWhereUniqueInput[]
    update?: ListItemUpdateWithWhereUniqueWithoutListInput | ListItemUpdateWithWhereUniqueWithoutListInput[]
    updateMany?: ListItemUpdateManyWithWhereWithoutListInput | ListItemUpdateManyWithWhereWithoutListInput[]
    deleteMany?: ListItemScalarWhereInput | ListItemScalarWhereInput[]
  }

  export type ListFollowUpdateManyWithoutListNestedInput = {
    create?: XOR<ListFollowCreateWithoutListInput, ListFollowUncheckedCreateWithoutListInput> | ListFollowCreateWithoutListInput[] | ListFollowUncheckedCreateWithoutListInput[]
    connectOrCreate?: ListFollowCreateOrConnectWithoutListInput | ListFollowCreateOrConnectWithoutListInput[]
    upsert?: ListFollowUpsertWithWhereUniqueWithoutListInput | ListFollowUpsertWithWhereUniqueWithoutListInput[]
    createMany?: ListFollowCreateManyListInputEnvelope
    set?: ListFollowWhereUniqueInput | ListFollowWhereUniqueInput[]
    disconnect?: ListFollowWhereUniqueInput | ListFollowWhereUniqueInput[]
    delete?: ListFollowWhereUniqueInput | ListFollowWhereUniqueInput[]
    connect?: ListFollowWhereUniqueInput | ListFollowWhereUniqueInput[]
    update?: ListFollowUpdateWithWhereUniqueWithoutListInput | ListFollowUpdateWithWhereUniqueWithoutListInput[]
    updateMany?: ListFollowUpdateManyWithWhereWithoutListInput | ListFollowUpdateManyWithWhereWithoutListInput[]
    deleteMany?: ListFollowScalarWhereInput | ListFollowScalarWhereInput[]
  }

  export type ListItemUncheckedUpdateManyWithoutListNestedInput = {
    create?: XOR<ListItemCreateWithoutListInput, ListItemUncheckedCreateWithoutListInput> | ListItemCreateWithoutListInput[] | ListItemUncheckedCreateWithoutListInput[]
    connectOrCreate?: ListItemCreateOrConnectWithoutListInput | ListItemCreateOrConnectWithoutListInput[]
    upsert?: ListItemUpsertWithWhereUniqueWithoutListInput | ListItemUpsertWithWhereUniqueWithoutListInput[]
    createMany?: ListItemCreateManyListInputEnvelope
    set?: ListItemWhereUniqueInput | ListItemWhereUniqueInput[]
    disconnect?: ListItemWhereUniqueInput | ListItemWhereUniqueInput[]
    delete?: ListItemWhereUniqueInput | ListItemWhereUniqueInput[]
    connect?: ListItemWhereUniqueInput | ListItemWhereUniqueInput[]
    update?: ListItemUpdateWithWhereUniqueWithoutListInput | ListItemUpdateWithWhereUniqueWithoutListInput[]
    updateMany?: ListItemUpdateManyWithWhereWithoutListInput | ListItemUpdateManyWithWhereWithoutListInput[]
    deleteMany?: ListItemScalarWhereInput | ListItemScalarWhereInput[]
  }

  export type ListFollowUncheckedUpdateManyWithoutListNestedInput = {
    create?: XOR<ListFollowCreateWithoutListInput, ListFollowUncheckedCreateWithoutListInput> | ListFollowCreateWithoutListInput[] | ListFollowUncheckedCreateWithoutListInput[]
    connectOrCreate?: ListFollowCreateOrConnectWithoutListInput | ListFollowCreateOrConnectWithoutListInput[]
    upsert?: ListFollowUpsertWithWhereUniqueWithoutListInput | ListFollowUpsertWithWhereUniqueWithoutListInput[]
    createMany?: ListFollowCreateManyListInputEnvelope
    set?: ListFollowWhereUniqueInput | ListFollowWhereUniqueInput[]
    disconnect?: ListFollowWhereUniqueInput | ListFollowWhereUniqueInput[]
    delete?: ListFollowWhereUniqueInput | ListFollowWhereUniqueInput[]
    connect?: ListFollowWhereUniqueInput | ListFollowWhereUniqueInput[]
    update?: ListFollowUpdateWithWhereUniqueWithoutListInput | ListFollowUpdateWithWhereUniqueWithoutListInput[]
    updateMany?: ListFollowUpdateManyWithWhereWithoutListInput | ListFollowUpdateManyWithWhereWithoutListInput[]
    deleteMany?: ListFollowScalarWhereInput | ListFollowScalarWhereInput[]
  }

  export type ListCreateNestedOneWithoutItemsInput = {
    create?: XOR<ListCreateWithoutItemsInput, ListUncheckedCreateWithoutItemsInput>
    connectOrCreate?: ListCreateOrConnectWithoutItemsInput
    connect?: ListWhereUniqueInput
  }

  export type ListUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<ListCreateWithoutItemsInput, ListUncheckedCreateWithoutItemsInput>
    connectOrCreate?: ListCreateOrConnectWithoutItemsInput
    upsert?: ListUpsertWithoutItemsInput
    connect?: ListWhereUniqueInput
    update?: XOR<XOR<ListUpdateToOneWithWhereWithoutItemsInput, ListUpdateWithoutItemsInput>, ListUncheckedUpdateWithoutItemsInput>
  }

  export type UserCreateNestedOneWithoutListFollowsInput = {
    create?: XOR<UserCreateWithoutListFollowsInput, UserUncheckedCreateWithoutListFollowsInput>
    connectOrCreate?: UserCreateOrConnectWithoutListFollowsInput
    connect?: UserWhereUniqueInput
  }

  export type ListCreateNestedOneWithoutFollowersInput = {
    create?: XOR<ListCreateWithoutFollowersInput, ListUncheckedCreateWithoutFollowersInput>
    connectOrCreate?: ListCreateOrConnectWithoutFollowersInput
    connect?: ListWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutListFollowsNestedInput = {
    create?: XOR<UserCreateWithoutListFollowsInput, UserUncheckedCreateWithoutListFollowsInput>
    connectOrCreate?: UserCreateOrConnectWithoutListFollowsInput
    upsert?: UserUpsertWithoutListFollowsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutListFollowsInput, UserUpdateWithoutListFollowsInput>, UserUncheckedUpdateWithoutListFollowsInput>
  }

  export type ListUpdateOneRequiredWithoutFollowersNestedInput = {
    create?: XOR<ListCreateWithoutFollowersInput, ListUncheckedCreateWithoutFollowersInput>
    connectOrCreate?: ListCreateOrConnectWithoutFollowersInput
    upsert?: ListUpsertWithoutFollowersInput
    connect?: ListWhereUniqueInput
    update?: XOR<XOR<ListUpdateToOneWithWhereWithoutFollowersInput, ListUpdateWithoutFollowersInput>, ListUncheckedUpdateWithoutFollowersInput>
  }

  export type UserCreateNestedOneWithoutBookmarkFoldersInput = {
    create?: XOR<UserCreateWithoutBookmarkFoldersInput, UserUncheckedCreateWithoutBookmarkFoldersInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookmarkFoldersInput
    connect?: UserWhereUniqueInput
  }

  export type BookmarkCreateNestedManyWithoutFolderInput = {
    create?: XOR<BookmarkCreateWithoutFolderInput, BookmarkUncheckedCreateWithoutFolderInput> | BookmarkCreateWithoutFolderInput[] | BookmarkUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutFolderInput | BookmarkCreateOrConnectWithoutFolderInput[]
    createMany?: BookmarkCreateManyFolderInputEnvelope
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
  }

  export type BookmarkUncheckedCreateNestedManyWithoutFolderInput = {
    create?: XOR<BookmarkCreateWithoutFolderInput, BookmarkUncheckedCreateWithoutFolderInput> | BookmarkCreateWithoutFolderInput[] | BookmarkUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutFolderInput | BookmarkCreateOrConnectWithoutFolderInput[]
    createMany?: BookmarkCreateManyFolderInputEnvelope
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutBookmarkFoldersNestedInput = {
    create?: XOR<UserCreateWithoutBookmarkFoldersInput, UserUncheckedCreateWithoutBookmarkFoldersInput>
    connectOrCreate?: UserCreateOrConnectWithoutBookmarkFoldersInput
    upsert?: UserUpsertWithoutBookmarkFoldersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBookmarkFoldersInput, UserUpdateWithoutBookmarkFoldersInput>, UserUncheckedUpdateWithoutBookmarkFoldersInput>
  }

  export type BookmarkUpdateManyWithoutFolderNestedInput = {
    create?: XOR<BookmarkCreateWithoutFolderInput, BookmarkUncheckedCreateWithoutFolderInput> | BookmarkCreateWithoutFolderInput[] | BookmarkUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutFolderInput | BookmarkCreateOrConnectWithoutFolderInput[]
    upsert?: BookmarkUpsertWithWhereUniqueWithoutFolderInput | BookmarkUpsertWithWhereUniqueWithoutFolderInput[]
    createMany?: BookmarkCreateManyFolderInputEnvelope
    set?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    disconnect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    delete?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    update?: BookmarkUpdateWithWhereUniqueWithoutFolderInput | BookmarkUpdateWithWhereUniqueWithoutFolderInput[]
    updateMany?: BookmarkUpdateManyWithWhereWithoutFolderInput | BookmarkUpdateManyWithWhereWithoutFolderInput[]
    deleteMany?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
  }

  export type BookmarkUncheckedUpdateManyWithoutFolderNestedInput = {
    create?: XOR<BookmarkCreateWithoutFolderInput, BookmarkUncheckedCreateWithoutFolderInput> | BookmarkCreateWithoutFolderInput[] | BookmarkUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutFolderInput | BookmarkCreateOrConnectWithoutFolderInput[]
    upsert?: BookmarkUpsertWithWhereUniqueWithoutFolderInput | BookmarkUpsertWithWhereUniqueWithoutFolderInput[]
    createMany?: BookmarkCreateManyFolderInputEnvelope
    set?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    disconnect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    delete?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    update?: BookmarkUpdateWithWhereUniqueWithoutFolderInput | BookmarkUpdateWithWhereUniqueWithoutFolderInput[]
    updateMany?: BookmarkUpdateManyWithWhereWithoutFolderInput | BookmarkUpdateManyWithWhereWithoutFolderInput[]
    deleteMany?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutBlockedUsersInput = {
    create?: XOR<UserCreateWithoutBlockedUsersInput, UserUncheckedCreateWithoutBlockedUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutBlockedUsersInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutBlockedUsersNestedInput = {
    create?: XOR<UserCreateWithoutBlockedUsersInput, UserUncheckedCreateWithoutBlockedUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutBlockedUsersInput
    upsert?: UserUpsertWithoutBlockedUsersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBlockedUsersInput, UserUpdateWithoutBlockedUsersInput>, UserUncheckedUpdateWithoutBlockedUsersInput>
  }

  export type UserCreateNestedOneWithoutMutedUsersInput = {
    create?: XOR<UserCreateWithoutMutedUsersInput, UserUncheckedCreateWithoutMutedUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutMutedUsersInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutMutedUsersNestedInput = {
    create?: XOR<UserCreateWithoutMutedUsersInput, UserUncheckedCreateWithoutMutedUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutMutedUsersInput
    upsert?: UserUpsertWithoutMutedUsersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMutedUsersInput, UserUpdateWithoutMutedUsersInput>, UserUncheckedUpdateWithoutMutedUsersInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type YtCredentialCreateWithoutUserInput = {
    id?: string
    credential: string
    type: string
    updatedAt?: Date | string
  }

  export type YtCredentialUncheckedCreateWithoutUserInput = {
    id?: string
    credential: string
    type: string
    updatedAt?: Date | string
  }

  export type YtCredentialCreateOrConnectWithoutUserInput = {
    where: YtCredentialWhereUniqueInput
    create: XOR<YtCredentialCreateWithoutUserInput, YtCredentialUncheckedCreateWithoutUserInput>
  }

  export type CommentLikeCreateWithoutUserInput = {
    id?: string
    commentId: string
    videoId: string
    type: string
    createdAt?: Date | string
  }

  export type CommentLikeUncheckedCreateWithoutUserInput = {
    id?: string
    commentId: string
    videoId: string
    type: string
    createdAt?: Date | string
  }

  export type CommentLikeCreateOrConnectWithoutUserInput = {
    where: CommentLikeWhereUniqueInput
    create: XOR<CommentLikeCreateWithoutUserInput, CommentLikeUncheckedCreateWithoutUserInput>
  }

  export type CommentLikeCreateManyUserInputEnvelope = {
    data: CommentLikeCreateManyUserInput | CommentLikeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserActionCreateWithoutUserInput = {
    id?: string
    videoId: string
    commentId: string
    actionType: string
    content?: string | null
    createdAt?: Date | string
  }

  export type UserActionUncheckedCreateWithoutUserInput = {
    id?: string
    videoId: string
    commentId: string
    actionType: string
    content?: string | null
    createdAt?: Date | string
  }

  export type UserActionCreateOrConnectWithoutUserInput = {
    where: UserActionWhereUniqueInput
    create: XOR<UserActionCreateWithoutUserInput, UserActionUncheckedCreateWithoutUserInput>
  }

  export type UserActionCreateManyUserInputEnvelope = {
    data: UserActionCreateManyUserInput | UserActionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ListCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ListItemCreateNestedManyWithoutListInput
    followers?: ListFollowCreateNestedManyWithoutListInput
  }

  export type ListUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ListItemUncheckedCreateNestedManyWithoutListInput
    followers?: ListFollowUncheckedCreateNestedManyWithoutListInput
  }

  export type ListCreateOrConnectWithoutUserInput = {
    where: ListWhereUniqueInput
    create: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput>
  }

  export type ListCreateManyUserInputEnvelope = {
    data: ListCreateManyUserInput | ListCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ListFollowCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    list: ListCreateNestedOneWithoutFollowersInput
  }

  export type ListFollowUncheckedCreateWithoutUserInput = {
    id?: string
    listId: string
    createdAt?: Date | string
  }

  export type ListFollowCreateOrConnectWithoutUserInput = {
    where: ListFollowWhereUniqueInput
    create: XOR<ListFollowCreateWithoutUserInput, ListFollowUncheckedCreateWithoutUserInput>
  }

  export type ListFollowCreateManyUserInputEnvelope = {
    data: ListFollowCreateManyUserInput | ListFollowCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BookmarkFolderCreateWithoutUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    bookmarks?: BookmarkCreateNestedManyWithoutFolderInput
  }

  export type BookmarkFolderUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutFolderInput
  }

  export type BookmarkFolderCreateOrConnectWithoutUserInput = {
    where: BookmarkFolderWhereUniqueInput
    create: XOR<BookmarkFolderCreateWithoutUserInput, BookmarkFolderUncheckedCreateWithoutUserInput>
  }

  export type BookmarkFolderCreateManyUserInputEnvelope = {
    data: BookmarkFolderCreateManyUserInput | BookmarkFolderCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BlockedUserCreateWithoutUserInput = {
    id?: string
    channelId: string
    channelName?: string | null
    createdAt?: Date | string
  }

  export type BlockedUserUncheckedCreateWithoutUserInput = {
    id?: string
    channelId: string
    channelName?: string | null
    createdAt?: Date | string
  }

  export type BlockedUserCreateOrConnectWithoutUserInput = {
    where: BlockedUserWhereUniqueInput
    create: XOR<BlockedUserCreateWithoutUserInput, BlockedUserUncheckedCreateWithoutUserInput>
  }

  export type BlockedUserCreateManyUserInputEnvelope = {
    data: BlockedUserCreateManyUserInput | BlockedUserCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MutedUserCreateWithoutUserInput = {
    id?: string
    channelId: string
    channelName?: string | null
    createdAt?: Date | string
  }

  export type MutedUserUncheckedCreateWithoutUserInput = {
    id?: string
    channelId: string
    channelName?: string | null
    createdAt?: Date | string
  }

  export type MutedUserCreateOrConnectWithoutUserInput = {
    where: MutedUserWhereUniqueInput
    create: XOR<MutedUserCreateWithoutUserInput, MutedUserUncheckedCreateWithoutUserInput>
  }

  export type MutedUserCreateManyUserInputEnvelope = {
    data: MutedUserCreateManyUserInput | MutedUserCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type YtCredentialUpsertWithoutUserInput = {
    update: XOR<YtCredentialUpdateWithoutUserInput, YtCredentialUncheckedUpdateWithoutUserInput>
    create: XOR<YtCredentialCreateWithoutUserInput, YtCredentialUncheckedCreateWithoutUserInput>
    where?: YtCredentialWhereInput
  }

  export type YtCredentialUpdateToOneWithWhereWithoutUserInput = {
    where?: YtCredentialWhereInput
    data: XOR<YtCredentialUpdateWithoutUserInput, YtCredentialUncheckedUpdateWithoutUserInput>
  }

  export type YtCredentialUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    credential?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type YtCredentialUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    credential?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentLikeUpsertWithWhereUniqueWithoutUserInput = {
    where: CommentLikeWhereUniqueInput
    update: XOR<CommentLikeUpdateWithoutUserInput, CommentLikeUncheckedUpdateWithoutUserInput>
    create: XOR<CommentLikeCreateWithoutUserInput, CommentLikeUncheckedCreateWithoutUserInput>
  }

  export type CommentLikeUpdateWithWhereUniqueWithoutUserInput = {
    where: CommentLikeWhereUniqueInput
    data: XOR<CommentLikeUpdateWithoutUserInput, CommentLikeUncheckedUpdateWithoutUserInput>
  }

  export type CommentLikeUpdateManyWithWhereWithoutUserInput = {
    where: CommentLikeScalarWhereInput
    data: XOR<CommentLikeUpdateManyMutationInput, CommentLikeUncheckedUpdateManyWithoutUserInput>
  }

  export type CommentLikeScalarWhereInput = {
    AND?: CommentLikeScalarWhereInput | CommentLikeScalarWhereInput[]
    OR?: CommentLikeScalarWhereInput[]
    NOT?: CommentLikeScalarWhereInput | CommentLikeScalarWhereInput[]
    id?: StringFilter<"CommentLike"> | string
    commentId?: StringFilter<"CommentLike"> | string
    videoId?: StringFilter<"CommentLike"> | string
    userId?: StringFilter<"CommentLike"> | string
    type?: StringFilter<"CommentLike"> | string
    createdAt?: DateTimeFilter<"CommentLike"> | Date | string
  }

  export type UserActionUpsertWithWhereUniqueWithoutUserInput = {
    where: UserActionWhereUniqueInput
    update: XOR<UserActionUpdateWithoutUserInput, UserActionUncheckedUpdateWithoutUserInput>
    create: XOR<UserActionCreateWithoutUserInput, UserActionUncheckedCreateWithoutUserInput>
  }

  export type UserActionUpdateWithWhereUniqueWithoutUserInput = {
    where: UserActionWhereUniqueInput
    data: XOR<UserActionUpdateWithoutUserInput, UserActionUncheckedUpdateWithoutUserInput>
  }

  export type UserActionUpdateManyWithWhereWithoutUserInput = {
    where: UserActionScalarWhereInput
    data: XOR<UserActionUpdateManyMutationInput, UserActionUncheckedUpdateManyWithoutUserInput>
  }

  export type UserActionScalarWhereInput = {
    AND?: UserActionScalarWhereInput | UserActionScalarWhereInput[]
    OR?: UserActionScalarWhereInput[]
    NOT?: UserActionScalarWhereInput | UserActionScalarWhereInput[]
    id?: StringFilter<"UserAction"> | string
    userId?: StringFilter<"UserAction"> | string
    videoId?: StringFilter<"UserAction"> | string
    commentId?: StringFilter<"UserAction"> | string
    actionType?: StringFilter<"UserAction"> | string
    content?: StringNullableFilter<"UserAction"> | string | null
    createdAt?: DateTimeFilter<"UserAction"> | Date | string
  }

  export type ListUpsertWithWhereUniqueWithoutUserInput = {
    where: ListWhereUniqueInput
    update: XOR<ListUpdateWithoutUserInput, ListUncheckedUpdateWithoutUserInput>
    create: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput>
  }

  export type ListUpdateWithWhereUniqueWithoutUserInput = {
    where: ListWhereUniqueInput
    data: XOR<ListUpdateWithoutUserInput, ListUncheckedUpdateWithoutUserInput>
  }

  export type ListUpdateManyWithWhereWithoutUserInput = {
    where: ListScalarWhereInput
    data: XOR<ListUpdateManyMutationInput, ListUncheckedUpdateManyWithoutUserInput>
  }

  export type ListScalarWhereInput = {
    AND?: ListScalarWhereInput | ListScalarWhereInput[]
    OR?: ListScalarWhereInput[]
    NOT?: ListScalarWhereInput | ListScalarWhereInput[]
    id?: StringFilter<"List"> | string
    userId?: StringFilter<"List"> | string
    name?: StringFilter<"List"> | string
    description?: StringNullableFilter<"List"> | string | null
    isPublic?: BoolFilter<"List"> | boolean
    createdAt?: DateTimeFilter<"List"> | Date | string
    updatedAt?: DateTimeFilter<"List"> | Date | string
  }

  export type ListFollowUpsertWithWhereUniqueWithoutUserInput = {
    where: ListFollowWhereUniqueInput
    update: XOR<ListFollowUpdateWithoutUserInput, ListFollowUncheckedUpdateWithoutUserInput>
    create: XOR<ListFollowCreateWithoutUserInput, ListFollowUncheckedCreateWithoutUserInput>
  }

  export type ListFollowUpdateWithWhereUniqueWithoutUserInput = {
    where: ListFollowWhereUniqueInput
    data: XOR<ListFollowUpdateWithoutUserInput, ListFollowUncheckedUpdateWithoutUserInput>
  }

  export type ListFollowUpdateManyWithWhereWithoutUserInput = {
    where: ListFollowScalarWhereInput
    data: XOR<ListFollowUpdateManyMutationInput, ListFollowUncheckedUpdateManyWithoutUserInput>
  }

  export type ListFollowScalarWhereInput = {
    AND?: ListFollowScalarWhereInput | ListFollowScalarWhereInput[]
    OR?: ListFollowScalarWhereInput[]
    NOT?: ListFollowScalarWhereInput | ListFollowScalarWhereInput[]
    id?: StringFilter<"ListFollow"> | string
    userId?: StringFilter<"ListFollow"> | string
    listId?: StringFilter<"ListFollow"> | string
    createdAt?: DateTimeFilter<"ListFollow"> | Date | string
  }

  export type BookmarkFolderUpsertWithWhereUniqueWithoutUserInput = {
    where: BookmarkFolderWhereUniqueInput
    update: XOR<BookmarkFolderUpdateWithoutUserInput, BookmarkFolderUncheckedUpdateWithoutUserInput>
    create: XOR<BookmarkFolderCreateWithoutUserInput, BookmarkFolderUncheckedCreateWithoutUserInput>
  }

  export type BookmarkFolderUpdateWithWhereUniqueWithoutUserInput = {
    where: BookmarkFolderWhereUniqueInput
    data: XOR<BookmarkFolderUpdateWithoutUserInput, BookmarkFolderUncheckedUpdateWithoutUserInput>
  }

  export type BookmarkFolderUpdateManyWithWhereWithoutUserInput = {
    where: BookmarkFolderScalarWhereInput
    data: XOR<BookmarkFolderUpdateManyMutationInput, BookmarkFolderUncheckedUpdateManyWithoutUserInput>
  }

  export type BookmarkFolderScalarWhereInput = {
    AND?: BookmarkFolderScalarWhereInput | BookmarkFolderScalarWhereInput[]
    OR?: BookmarkFolderScalarWhereInput[]
    NOT?: BookmarkFolderScalarWhereInput | BookmarkFolderScalarWhereInput[]
    id?: StringFilter<"BookmarkFolder"> | string
    userId?: StringFilter<"BookmarkFolder"> | string
    name?: StringFilter<"BookmarkFolder"> | string
    createdAt?: DateTimeFilter<"BookmarkFolder"> | Date | string
  }

  export type BlockedUserUpsertWithWhereUniqueWithoutUserInput = {
    where: BlockedUserWhereUniqueInput
    update: XOR<BlockedUserUpdateWithoutUserInput, BlockedUserUncheckedUpdateWithoutUserInput>
    create: XOR<BlockedUserCreateWithoutUserInput, BlockedUserUncheckedCreateWithoutUserInput>
  }

  export type BlockedUserUpdateWithWhereUniqueWithoutUserInput = {
    where: BlockedUserWhereUniqueInput
    data: XOR<BlockedUserUpdateWithoutUserInput, BlockedUserUncheckedUpdateWithoutUserInput>
  }

  export type BlockedUserUpdateManyWithWhereWithoutUserInput = {
    where: BlockedUserScalarWhereInput
    data: XOR<BlockedUserUpdateManyMutationInput, BlockedUserUncheckedUpdateManyWithoutUserInput>
  }

  export type BlockedUserScalarWhereInput = {
    AND?: BlockedUserScalarWhereInput | BlockedUserScalarWhereInput[]
    OR?: BlockedUserScalarWhereInput[]
    NOT?: BlockedUserScalarWhereInput | BlockedUserScalarWhereInput[]
    id?: StringFilter<"BlockedUser"> | string
    userId?: StringFilter<"BlockedUser"> | string
    channelId?: StringFilter<"BlockedUser"> | string
    channelName?: StringNullableFilter<"BlockedUser"> | string | null
    createdAt?: DateTimeFilter<"BlockedUser"> | Date | string
  }

  export type MutedUserUpsertWithWhereUniqueWithoutUserInput = {
    where: MutedUserWhereUniqueInput
    update: XOR<MutedUserUpdateWithoutUserInput, MutedUserUncheckedUpdateWithoutUserInput>
    create: XOR<MutedUserCreateWithoutUserInput, MutedUserUncheckedCreateWithoutUserInput>
  }

  export type MutedUserUpdateWithWhereUniqueWithoutUserInput = {
    where: MutedUserWhereUniqueInput
    data: XOR<MutedUserUpdateWithoutUserInput, MutedUserUncheckedUpdateWithoutUserInput>
  }

  export type MutedUserUpdateManyWithWhereWithoutUserInput = {
    where: MutedUserScalarWhereInput
    data: XOR<MutedUserUpdateManyMutationInput, MutedUserUncheckedUpdateManyWithoutUserInput>
  }

  export type MutedUserScalarWhereInput = {
    AND?: MutedUserScalarWhereInput | MutedUserScalarWhereInput[]
    OR?: MutedUserScalarWhereInput[]
    NOT?: MutedUserScalarWhereInput | MutedUserScalarWhereInput[]
    id?: StringFilter<"MutedUser"> | string
    userId?: StringFilter<"MutedUser"> | string
    channelId?: StringFilter<"MutedUser"> | string
    channelName?: StringNullableFilter<"MutedUser"> | string | null
    createdAt?: DateTimeFilter<"MutedUser"> | Date | string
  }

  export type UserCreateWithoutYtCredentialInput = {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    channelId?: string | null
    commentLikes?: CommentLikeCreateNestedManyWithoutUserInput
    actions?: UserActionCreateNestedManyWithoutUserInput
    lists?: ListCreateNestedManyWithoutUserInput
    listFollows?: ListFollowCreateNestedManyWithoutUserInput
    bookmarkFolders?: BookmarkFolderCreateNestedManyWithoutUserInput
    blockedUsers?: BlockedUserCreateNestedManyWithoutUserInput
    mutedUsers?: MutedUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutYtCredentialInput = {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    channelId?: string | null
    commentLikes?: CommentLikeUncheckedCreateNestedManyWithoutUserInput
    actions?: UserActionUncheckedCreateNestedManyWithoutUserInput
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
    listFollows?: ListFollowUncheckedCreateNestedManyWithoutUserInput
    bookmarkFolders?: BookmarkFolderUncheckedCreateNestedManyWithoutUserInput
    blockedUsers?: BlockedUserUncheckedCreateNestedManyWithoutUserInput
    mutedUsers?: MutedUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutYtCredentialInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutYtCredentialInput, UserUncheckedCreateWithoutYtCredentialInput>
  }

  export type UserUpsertWithoutYtCredentialInput = {
    update: XOR<UserUpdateWithoutYtCredentialInput, UserUncheckedUpdateWithoutYtCredentialInput>
    create: XOR<UserCreateWithoutYtCredentialInput, UserUncheckedCreateWithoutYtCredentialInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutYtCredentialInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutYtCredentialInput, UserUncheckedUpdateWithoutYtCredentialInput>
  }

  export type UserUpdateWithoutYtCredentialInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    commentLikes?: CommentLikeUpdateManyWithoutUserNestedInput
    actions?: UserActionUpdateManyWithoutUserNestedInput
    lists?: ListUpdateManyWithoutUserNestedInput
    listFollows?: ListFollowUpdateManyWithoutUserNestedInput
    bookmarkFolders?: BookmarkFolderUpdateManyWithoutUserNestedInput
    blockedUsers?: BlockedUserUpdateManyWithoutUserNestedInput
    mutedUsers?: MutedUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutYtCredentialInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    commentLikes?: CommentLikeUncheckedUpdateManyWithoutUserNestedInput
    actions?: UserActionUncheckedUpdateManyWithoutUserNestedInput
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
    listFollows?: ListFollowUncheckedUpdateManyWithoutUserNestedInput
    bookmarkFolders?: BookmarkFolderUncheckedUpdateManyWithoutUserNestedInput
    blockedUsers?: BlockedUserUncheckedUpdateManyWithoutUserNestedInput
    mutedUsers?: MutedUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCommentLikesInput = {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    channelId?: string | null
    ytCredential?: YtCredentialCreateNestedOneWithoutUserInput
    actions?: UserActionCreateNestedManyWithoutUserInput
    lists?: ListCreateNestedManyWithoutUserInput
    listFollows?: ListFollowCreateNestedManyWithoutUserInput
    bookmarkFolders?: BookmarkFolderCreateNestedManyWithoutUserInput
    blockedUsers?: BlockedUserCreateNestedManyWithoutUserInput
    mutedUsers?: MutedUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCommentLikesInput = {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    channelId?: string | null
    ytCredential?: YtCredentialUncheckedCreateNestedOneWithoutUserInput
    actions?: UserActionUncheckedCreateNestedManyWithoutUserInput
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
    listFollows?: ListFollowUncheckedCreateNestedManyWithoutUserInput
    bookmarkFolders?: BookmarkFolderUncheckedCreateNestedManyWithoutUserInput
    blockedUsers?: BlockedUserUncheckedCreateNestedManyWithoutUserInput
    mutedUsers?: MutedUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCommentLikesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentLikesInput, UserUncheckedCreateWithoutCommentLikesInput>
  }

  export type UserUpsertWithoutCommentLikesInput = {
    update: XOR<UserUpdateWithoutCommentLikesInput, UserUncheckedUpdateWithoutCommentLikesInput>
    create: XOR<UserCreateWithoutCommentLikesInput, UserUncheckedCreateWithoutCommentLikesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommentLikesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommentLikesInput, UserUncheckedUpdateWithoutCommentLikesInput>
  }

  export type UserUpdateWithoutCommentLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    ytCredential?: YtCredentialUpdateOneWithoutUserNestedInput
    actions?: UserActionUpdateManyWithoutUserNestedInput
    lists?: ListUpdateManyWithoutUserNestedInput
    listFollows?: ListFollowUpdateManyWithoutUserNestedInput
    bookmarkFolders?: BookmarkFolderUpdateManyWithoutUserNestedInput
    blockedUsers?: BlockedUserUpdateManyWithoutUserNestedInput
    mutedUsers?: MutedUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCommentLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    ytCredential?: YtCredentialUncheckedUpdateOneWithoutUserNestedInput
    actions?: UserActionUncheckedUpdateManyWithoutUserNestedInput
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
    listFollows?: ListFollowUncheckedUpdateManyWithoutUserNestedInput
    bookmarkFolders?: BookmarkFolderUncheckedUpdateManyWithoutUserNestedInput
    blockedUsers?: BlockedUserUncheckedUpdateManyWithoutUserNestedInput
    mutedUsers?: MutedUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutActionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    channelId?: string | null
    ytCredential?: YtCredentialCreateNestedOneWithoutUserInput
    commentLikes?: CommentLikeCreateNestedManyWithoutUserInput
    lists?: ListCreateNestedManyWithoutUserInput
    listFollows?: ListFollowCreateNestedManyWithoutUserInput
    bookmarkFolders?: BookmarkFolderCreateNestedManyWithoutUserInput
    blockedUsers?: BlockedUserCreateNestedManyWithoutUserInput
    mutedUsers?: MutedUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    channelId?: string | null
    ytCredential?: YtCredentialUncheckedCreateNestedOneWithoutUserInput
    commentLikes?: CommentLikeUncheckedCreateNestedManyWithoutUserInput
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
    listFollows?: ListFollowUncheckedCreateNestedManyWithoutUserInput
    bookmarkFolders?: BookmarkFolderUncheckedCreateNestedManyWithoutUserInput
    blockedUsers?: BlockedUserUncheckedCreateNestedManyWithoutUserInput
    mutedUsers?: MutedUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActionsInput, UserUncheckedCreateWithoutActionsInput>
  }

  export type UserUpsertWithoutActionsInput = {
    update: XOR<UserUpdateWithoutActionsInput, UserUncheckedUpdateWithoutActionsInput>
    create: XOR<UserCreateWithoutActionsInput, UserUncheckedCreateWithoutActionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActionsInput, UserUncheckedUpdateWithoutActionsInput>
  }

  export type UserUpdateWithoutActionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    ytCredential?: YtCredentialUpdateOneWithoutUserNestedInput
    commentLikes?: CommentLikeUpdateManyWithoutUserNestedInput
    lists?: ListUpdateManyWithoutUserNestedInput
    listFollows?: ListFollowUpdateManyWithoutUserNestedInput
    bookmarkFolders?: BookmarkFolderUpdateManyWithoutUserNestedInput
    blockedUsers?: BlockedUserUpdateManyWithoutUserNestedInput
    mutedUsers?: MutedUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    ytCredential?: YtCredentialUncheckedUpdateOneWithoutUserNestedInput
    commentLikes?: CommentLikeUncheckedUpdateManyWithoutUserNestedInput
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
    listFollows?: ListFollowUncheckedUpdateManyWithoutUserNestedInput
    bookmarkFolders?: BookmarkFolderUncheckedUpdateManyWithoutUserNestedInput
    blockedUsers?: BlockedUserUncheckedUpdateManyWithoutUserNestedInput
    mutedUsers?: MutedUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BookmarkFolderCreateWithoutBookmarksInput = {
    id?: string
    name: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBookmarkFoldersInput
  }

  export type BookmarkFolderUncheckedCreateWithoutBookmarksInput = {
    id?: string
    userId: string
    name: string
    createdAt?: Date | string
  }

  export type BookmarkFolderCreateOrConnectWithoutBookmarksInput = {
    where: BookmarkFolderWhereUniqueInput
    create: XOR<BookmarkFolderCreateWithoutBookmarksInput, BookmarkFolderUncheckedCreateWithoutBookmarksInput>
  }

  export type BookmarkFolderUpsertWithoutBookmarksInput = {
    update: XOR<BookmarkFolderUpdateWithoutBookmarksInput, BookmarkFolderUncheckedUpdateWithoutBookmarksInput>
    create: XOR<BookmarkFolderCreateWithoutBookmarksInput, BookmarkFolderUncheckedCreateWithoutBookmarksInput>
    where?: BookmarkFolderWhereInput
  }

  export type BookmarkFolderUpdateToOneWithWhereWithoutBookmarksInput = {
    where?: BookmarkFolderWhereInput
    data: XOR<BookmarkFolderUpdateWithoutBookmarksInput, BookmarkFolderUncheckedUpdateWithoutBookmarksInput>
  }

  export type BookmarkFolderUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBookmarkFoldersNestedInput
  }

  export type BookmarkFolderUncheckedUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutListsInput = {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    channelId?: string | null
    ytCredential?: YtCredentialCreateNestedOneWithoutUserInput
    commentLikes?: CommentLikeCreateNestedManyWithoutUserInput
    actions?: UserActionCreateNestedManyWithoutUserInput
    listFollows?: ListFollowCreateNestedManyWithoutUserInput
    bookmarkFolders?: BookmarkFolderCreateNestedManyWithoutUserInput
    blockedUsers?: BlockedUserCreateNestedManyWithoutUserInput
    mutedUsers?: MutedUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutListsInput = {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    channelId?: string | null
    ytCredential?: YtCredentialUncheckedCreateNestedOneWithoutUserInput
    commentLikes?: CommentLikeUncheckedCreateNestedManyWithoutUserInput
    actions?: UserActionUncheckedCreateNestedManyWithoutUserInput
    listFollows?: ListFollowUncheckedCreateNestedManyWithoutUserInput
    bookmarkFolders?: BookmarkFolderUncheckedCreateNestedManyWithoutUserInput
    blockedUsers?: BlockedUserUncheckedCreateNestedManyWithoutUserInput
    mutedUsers?: MutedUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutListsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutListsInput, UserUncheckedCreateWithoutListsInput>
  }

  export type ListItemCreateWithoutListInput = {
    id?: string
    commentId: string
    videoId: string
    authorName: string
    authorThumb?: string | null
    content: string
    likeCount: string
    replyCount: string
    publishedTime: string
    createdAt?: Date | string
  }

  export type ListItemUncheckedCreateWithoutListInput = {
    id?: string
    commentId: string
    videoId: string
    authorName: string
    authorThumb?: string | null
    content: string
    likeCount: string
    replyCount: string
    publishedTime: string
    createdAt?: Date | string
  }

  export type ListItemCreateOrConnectWithoutListInput = {
    where: ListItemWhereUniqueInput
    create: XOR<ListItemCreateWithoutListInput, ListItemUncheckedCreateWithoutListInput>
  }

  export type ListItemCreateManyListInputEnvelope = {
    data: ListItemCreateManyListInput | ListItemCreateManyListInput[]
    skipDuplicates?: boolean
  }

  export type ListFollowCreateWithoutListInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutListFollowsInput
  }

  export type ListFollowUncheckedCreateWithoutListInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type ListFollowCreateOrConnectWithoutListInput = {
    where: ListFollowWhereUniqueInput
    create: XOR<ListFollowCreateWithoutListInput, ListFollowUncheckedCreateWithoutListInput>
  }

  export type ListFollowCreateManyListInputEnvelope = {
    data: ListFollowCreateManyListInput | ListFollowCreateManyListInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutListsInput = {
    update: XOR<UserUpdateWithoutListsInput, UserUncheckedUpdateWithoutListsInput>
    create: XOR<UserCreateWithoutListsInput, UserUncheckedCreateWithoutListsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutListsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutListsInput, UserUncheckedUpdateWithoutListsInput>
  }

  export type UserUpdateWithoutListsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    ytCredential?: YtCredentialUpdateOneWithoutUserNestedInput
    commentLikes?: CommentLikeUpdateManyWithoutUserNestedInput
    actions?: UserActionUpdateManyWithoutUserNestedInput
    listFollows?: ListFollowUpdateManyWithoutUserNestedInput
    bookmarkFolders?: BookmarkFolderUpdateManyWithoutUserNestedInput
    blockedUsers?: BlockedUserUpdateManyWithoutUserNestedInput
    mutedUsers?: MutedUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutListsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    ytCredential?: YtCredentialUncheckedUpdateOneWithoutUserNestedInput
    commentLikes?: CommentLikeUncheckedUpdateManyWithoutUserNestedInput
    actions?: UserActionUncheckedUpdateManyWithoutUserNestedInput
    listFollows?: ListFollowUncheckedUpdateManyWithoutUserNestedInput
    bookmarkFolders?: BookmarkFolderUncheckedUpdateManyWithoutUserNestedInput
    blockedUsers?: BlockedUserUncheckedUpdateManyWithoutUserNestedInput
    mutedUsers?: MutedUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ListItemUpsertWithWhereUniqueWithoutListInput = {
    where: ListItemWhereUniqueInput
    update: XOR<ListItemUpdateWithoutListInput, ListItemUncheckedUpdateWithoutListInput>
    create: XOR<ListItemCreateWithoutListInput, ListItemUncheckedCreateWithoutListInput>
  }

  export type ListItemUpdateWithWhereUniqueWithoutListInput = {
    where: ListItemWhereUniqueInput
    data: XOR<ListItemUpdateWithoutListInput, ListItemUncheckedUpdateWithoutListInput>
  }

  export type ListItemUpdateManyWithWhereWithoutListInput = {
    where: ListItemScalarWhereInput
    data: XOR<ListItemUpdateManyMutationInput, ListItemUncheckedUpdateManyWithoutListInput>
  }

  export type ListItemScalarWhereInput = {
    AND?: ListItemScalarWhereInput | ListItemScalarWhereInput[]
    OR?: ListItemScalarWhereInput[]
    NOT?: ListItemScalarWhereInput | ListItemScalarWhereInput[]
    id?: StringFilter<"ListItem"> | string
    listId?: StringFilter<"ListItem"> | string
    commentId?: StringFilter<"ListItem"> | string
    videoId?: StringFilter<"ListItem"> | string
    authorName?: StringFilter<"ListItem"> | string
    authorThumb?: StringNullableFilter<"ListItem"> | string | null
    content?: StringFilter<"ListItem"> | string
    likeCount?: StringFilter<"ListItem"> | string
    replyCount?: StringFilter<"ListItem"> | string
    publishedTime?: StringFilter<"ListItem"> | string
    createdAt?: DateTimeFilter<"ListItem"> | Date | string
  }

  export type ListFollowUpsertWithWhereUniqueWithoutListInput = {
    where: ListFollowWhereUniqueInput
    update: XOR<ListFollowUpdateWithoutListInput, ListFollowUncheckedUpdateWithoutListInput>
    create: XOR<ListFollowCreateWithoutListInput, ListFollowUncheckedCreateWithoutListInput>
  }

  export type ListFollowUpdateWithWhereUniqueWithoutListInput = {
    where: ListFollowWhereUniqueInput
    data: XOR<ListFollowUpdateWithoutListInput, ListFollowUncheckedUpdateWithoutListInput>
  }

  export type ListFollowUpdateManyWithWhereWithoutListInput = {
    where: ListFollowScalarWhereInput
    data: XOR<ListFollowUpdateManyMutationInput, ListFollowUncheckedUpdateManyWithoutListInput>
  }

  export type ListCreateWithoutItemsInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutListsInput
    followers?: ListFollowCreateNestedManyWithoutListInput
  }

  export type ListUncheckedCreateWithoutItemsInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    followers?: ListFollowUncheckedCreateNestedManyWithoutListInput
  }

  export type ListCreateOrConnectWithoutItemsInput = {
    where: ListWhereUniqueInput
    create: XOR<ListCreateWithoutItemsInput, ListUncheckedCreateWithoutItemsInput>
  }

  export type ListUpsertWithoutItemsInput = {
    update: XOR<ListUpdateWithoutItemsInput, ListUncheckedUpdateWithoutItemsInput>
    create: XOR<ListCreateWithoutItemsInput, ListUncheckedCreateWithoutItemsInput>
    where?: ListWhereInput
  }

  export type ListUpdateToOneWithWhereWithoutItemsInput = {
    where?: ListWhereInput
    data: XOR<ListUpdateWithoutItemsInput, ListUncheckedUpdateWithoutItemsInput>
  }

  export type ListUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutListsNestedInput
    followers?: ListFollowUpdateManyWithoutListNestedInput
  }

  export type ListUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followers?: ListFollowUncheckedUpdateManyWithoutListNestedInput
  }

  export type UserCreateWithoutListFollowsInput = {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    channelId?: string | null
    ytCredential?: YtCredentialCreateNestedOneWithoutUserInput
    commentLikes?: CommentLikeCreateNestedManyWithoutUserInput
    actions?: UserActionCreateNestedManyWithoutUserInput
    lists?: ListCreateNestedManyWithoutUserInput
    bookmarkFolders?: BookmarkFolderCreateNestedManyWithoutUserInput
    blockedUsers?: BlockedUserCreateNestedManyWithoutUserInput
    mutedUsers?: MutedUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutListFollowsInput = {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    channelId?: string | null
    ytCredential?: YtCredentialUncheckedCreateNestedOneWithoutUserInput
    commentLikes?: CommentLikeUncheckedCreateNestedManyWithoutUserInput
    actions?: UserActionUncheckedCreateNestedManyWithoutUserInput
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
    bookmarkFolders?: BookmarkFolderUncheckedCreateNestedManyWithoutUserInput
    blockedUsers?: BlockedUserUncheckedCreateNestedManyWithoutUserInput
    mutedUsers?: MutedUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutListFollowsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutListFollowsInput, UserUncheckedCreateWithoutListFollowsInput>
  }

  export type ListCreateWithoutFollowersInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutListsInput
    items?: ListItemCreateNestedManyWithoutListInput
  }

  export type ListUncheckedCreateWithoutFollowersInput = {
    id?: string
    userId: string
    name: string
    description?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ListItemUncheckedCreateNestedManyWithoutListInput
  }

  export type ListCreateOrConnectWithoutFollowersInput = {
    where: ListWhereUniqueInput
    create: XOR<ListCreateWithoutFollowersInput, ListUncheckedCreateWithoutFollowersInput>
  }

  export type UserUpsertWithoutListFollowsInput = {
    update: XOR<UserUpdateWithoutListFollowsInput, UserUncheckedUpdateWithoutListFollowsInput>
    create: XOR<UserCreateWithoutListFollowsInput, UserUncheckedCreateWithoutListFollowsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutListFollowsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutListFollowsInput, UserUncheckedUpdateWithoutListFollowsInput>
  }

  export type UserUpdateWithoutListFollowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    ytCredential?: YtCredentialUpdateOneWithoutUserNestedInput
    commentLikes?: CommentLikeUpdateManyWithoutUserNestedInput
    actions?: UserActionUpdateManyWithoutUserNestedInput
    lists?: ListUpdateManyWithoutUserNestedInput
    bookmarkFolders?: BookmarkFolderUpdateManyWithoutUserNestedInput
    blockedUsers?: BlockedUserUpdateManyWithoutUserNestedInput
    mutedUsers?: MutedUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutListFollowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    ytCredential?: YtCredentialUncheckedUpdateOneWithoutUserNestedInput
    commentLikes?: CommentLikeUncheckedUpdateManyWithoutUserNestedInput
    actions?: UserActionUncheckedUpdateManyWithoutUserNestedInput
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
    bookmarkFolders?: BookmarkFolderUncheckedUpdateManyWithoutUserNestedInput
    blockedUsers?: BlockedUserUncheckedUpdateManyWithoutUserNestedInput
    mutedUsers?: MutedUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ListUpsertWithoutFollowersInput = {
    update: XOR<ListUpdateWithoutFollowersInput, ListUncheckedUpdateWithoutFollowersInput>
    create: XOR<ListCreateWithoutFollowersInput, ListUncheckedCreateWithoutFollowersInput>
    where?: ListWhereInput
  }

  export type ListUpdateToOneWithWhereWithoutFollowersInput = {
    where?: ListWhereInput
    data: XOR<ListUpdateWithoutFollowersInput, ListUncheckedUpdateWithoutFollowersInput>
  }

  export type ListUpdateWithoutFollowersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutListsNestedInput
    items?: ListItemUpdateManyWithoutListNestedInput
  }

  export type ListUncheckedUpdateWithoutFollowersInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ListItemUncheckedUpdateManyWithoutListNestedInput
  }

  export type UserCreateWithoutBookmarkFoldersInput = {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    channelId?: string | null
    ytCredential?: YtCredentialCreateNestedOneWithoutUserInput
    commentLikes?: CommentLikeCreateNestedManyWithoutUserInput
    actions?: UserActionCreateNestedManyWithoutUserInput
    lists?: ListCreateNestedManyWithoutUserInput
    listFollows?: ListFollowCreateNestedManyWithoutUserInput
    blockedUsers?: BlockedUserCreateNestedManyWithoutUserInput
    mutedUsers?: MutedUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBookmarkFoldersInput = {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    channelId?: string | null
    ytCredential?: YtCredentialUncheckedCreateNestedOneWithoutUserInput
    commentLikes?: CommentLikeUncheckedCreateNestedManyWithoutUserInput
    actions?: UserActionUncheckedCreateNestedManyWithoutUserInput
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
    listFollows?: ListFollowUncheckedCreateNestedManyWithoutUserInput
    blockedUsers?: BlockedUserUncheckedCreateNestedManyWithoutUserInput
    mutedUsers?: MutedUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBookmarkFoldersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBookmarkFoldersInput, UserUncheckedCreateWithoutBookmarkFoldersInput>
  }

  export type BookmarkCreateWithoutFolderInput = {
    id?: string
    userId: string
    commentId: string
    videoId: string
    authorName: string
    authorThumb?: string | null
    content: string
    likeCount: string
    replyCount: string
    publishedTime: string
    createdAt?: Date | string
  }

  export type BookmarkUncheckedCreateWithoutFolderInput = {
    id?: string
    userId: string
    commentId: string
    videoId: string
    authorName: string
    authorThumb?: string | null
    content: string
    likeCount: string
    replyCount: string
    publishedTime: string
    createdAt?: Date | string
  }

  export type BookmarkCreateOrConnectWithoutFolderInput = {
    where: BookmarkWhereUniqueInput
    create: XOR<BookmarkCreateWithoutFolderInput, BookmarkUncheckedCreateWithoutFolderInput>
  }

  export type BookmarkCreateManyFolderInputEnvelope = {
    data: BookmarkCreateManyFolderInput | BookmarkCreateManyFolderInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutBookmarkFoldersInput = {
    update: XOR<UserUpdateWithoutBookmarkFoldersInput, UserUncheckedUpdateWithoutBookmarkFoldersInput>
    create: XOR<UserCreateWithoutBookmarkFoldersInput, UserUncheckedCreateWithoutBookmarkFoldersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBookmarkFoldersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBookmarkFoldersInput, UserUncheckedUpdateWithoutBookmarkFoldersInput>
  }

  export type UserUpdateWithoutBookmarkFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    ytCredential?: YtCredentialUpdateOneWithoutUserNestedInput
    commentLikes?: CommentLikeUpdateManyWithoutUserNestedInput
    actions?: UserActionUpdateManyWithoutUserNestedInput
    lists?: ListUpdateManyWithoutUserNestedInput
    listFollows?: ListFollowUpdateManyWithoutUserNestedInput
    blockedUsers?: BlockedUserUpdateManyWithoutUserNestedInput
    mutedUsers?: MutedUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBookmarkFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    ytCredential?: YtCredentialUncheckedUpdateOneWithoutUserNestedInput
    commentLikes?: CommentLikeUncheckedUpdateManyWithoutUserNestedInput
    actions?: UserActionUncheckedUpdateManyWithoutUserNestedInput
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
    listFollows?: ListFollowUncheckedUpdateManyWithoutUserNestedInput
    blockedUsers?: BlockedUserUncheckedUpdateManyWithoutUserNestedInput
    mutedUsers?: MutedUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BookmarkUpsertWithWhereUniqueWithoutFolderInput = {
    where: BookmarkWhereUniqueInput
    update: XOR<BookmarkUpdateWithoutFolderInput, BookmarkUncheckedUpdateWithoutFolderInput>
    create: XOR<BookmarkCreateWithoutFolderInput, BookmarkUncheckedCreateWithoutFolderInput>
  }

  export type BookmarkUpdateWithWhereUniqueWithoutFolderInput = {
    where: BookmarkWhereUniqueInput
    data: XOR<BookmarkUpdateWithoutFolderInput, BookmarkUncheckedUpdateWithoutFolderInput>
  }

  export type BookmarkUpdateManyWithWhereWithoutFolderInput = {
    where: BookmarkScalarWhereInput
    data: XOR<BookmarkUpdateManyMutationInput, BookmarkUncheckedUpdateManyWithoutFolderInput>
  }

  export type BookmarkScalarWhereInput = {
    AND?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
    OR?: BookmarkScalarWhereInput[]
    NOT?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
    id?: StringFilter<"Bookmark"> | string
    userId?: StringFilter<"Bookmark"> | string
    folderId?: StringNullableFilter<"Bookmark"> | string | null
    commentId?: StringFilter<"Bookmark"> | string
    videoId?: StringFilter<"Bookmark"> | string
    authorName?: StringFilter<"Bookmark"> | string
    authorThumb?: StringNullableFilter<"Bookmark"> | string | null
    content?: StringFilter<"Bookmark"> | string
    likeCount?: StringFilter<"Bookmark"> | string
    replyCount?: StringFilter<"Bookmark"> | string
    publishedTime?: StringFilter<"Bookmark"> | string
    createdAt?: DateTimeFilter<"Bookmark"> | Date | string
  }

  export type UserCreateWithoutBlockedUsersInput = {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    channelId?: string | null
    ytCredential?: YtCredentialCreateNestedOneWithoutUserInput
    commentLikes?: CommentLikeCreateNestedManyWithoutUserInput
    actions?: UserActionCreateNestedManyWithoutUserInput
    lists?: ListCreateNestedManyWithoutUserInput
    listFollows?: ListFollowCreateNestedManyWithoutUserInput
    bookmarkFolders?: BookmarkFolderCreateNestedManyWithoutUserInput
    mutedUsers?: MutedUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBlockedUsersInput = {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    channelId?: string | null
    ytCredential?: YtCredentialUncheckedCreateNestedOneWithoutUserInput
    commentLikes?: CommentLikeUncheckedCreateNestedManyWithoutUserInput
    actions?: UserActionUncheckedCreateNestedManyWithoutUserInput
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
    listFollows?: ListFollowUncheckedCreateNestedManyWithoutUserInput
    bookmarkFolders?: BookmarkFolderUncheckedCreateNestedManyWithoutUserInput
    mutedUsers?: MutedUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBlockedUsersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBlockedUsersInput, UserUncheckedCreateWithoutBlockedUsersInput>
  }

  export type UserUpsertWithoutBlockedUsersInput = {
    update: XOR<UserUpdateWithoutBlockedUsersInput, UserUncheckedUpdateWithoutBlockedUsersInput>
    create: XOR<UserCreateWithoutBlockedUsersInput, UserUncheckedCreateWithoutBlockedUsersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBlockedUsersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBlockedUsersInput, UserUncheckedUpdateWithoutBlockedUsersInput>
  }

  export type UserUpdateWithoutBlockedUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    ytCredential?: YtCredentialUpdateOneWithoutUserNestedInput
    commentLikes?: CommentLikeUpdateManyWithoutUserNestedInput
    actions?: UserActionUpdateManyWithoutUserNestedInput
    lists?: ListUpdateManyWithoutUserNestedInput
    listFollows?: ListFollowUpdateManyWithoutUserNestedInput
    bookmarkFolders?: BookmarkFolderUpdateManyWithoutUserNestedInput
    mutedUsers?: MutedUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBlockedUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    ytCredential?: YtCredentialUncheckedUpdateOneWithoutUserNestedInput
    commentLikes?: CommentLikeUncheckedUpdateManyWithoutUserNestedInput
    actions?: UserActionUncheckedUpdateManyWithoutUserNestedInput
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
    listFollows?: ListFollowUncheckedUpdateManyWithoutUserNestedInput
    bookmarkFolders?: BookmarkFolderUncheckedUpdateManyWithoutUserNestedInput
    mutedUsers?: MutedUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutMutedUsersInput = {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    channelId?: string | null
    ytCredential?: YtCredentialCreateNestedOneWithoutUserInput
    commentLikes?: CommentLikeCreateNestedManyWithoutUserInput
    actions?: UserActionCreateNestedManyWithoutUserInput
    lists?: ListCreateNestedManyWithoutUserInput
    listFollows?: ListFollowCreateNestedManyWithoutUserInput
    bookmarkFolders?: BookmarkFolderCreateNestedManyWithoutUserInput
    blockedUsers?: BlockedUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMutedUsersInput = {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    channelId?: string | null
    ytCredential?: YtCredentialUncheckedCreateNestedOneWithoutUserInput
    commentLikes?: CommentLikeUncheckedCreateNestedManyWithoutUserInput
    actions?: UserActionUncheckedCreateNestedManyWithoutUserInput
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
    listFollows?: ListFollowUncheckedCreateNestedManyWithoutUserInput
    bookmarkFolders?: BookmarkFolderUncheckedCreateNestedManyWithoutUserInput
    blockedUsers?: BlockedUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMutedUsersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMutedUsersInput, UserUncheckedCreateWithoutMutedUsersInput>
  }

  export type UserUpsertWithoutMutedUsersInput = {
    update: XOR<UserUpdateWithoutMutedUsersInput, UserUncheckedUpdateWithoutMutedUsersInput>
    create: XOR<UserCreateWithoutMutedUsersInput, UserUncheckedCreateWithoutMutedUsersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMutedUsersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMutedUsersInput, UserUncheckedUpdateWithoutMutedUsersInput>
  }

  export type UserUpdateWithoutMutedUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    ytCredential?: YtCredentialUpdateOneWithoutUserNestedInput
    commentLikes?: CommentLikeUpdateManyWithoutUserNestedInput
    actions?: UserActionUpdateManyWithoutUserNestedInput
    lists?: ListUpdateManyWithoutUserNestedInput
    listFollows?: ListFollowUpdateManyWithoutUserNestedInput
    bookmarkFolders?: BookmarkFolderUpdateManyWithoutUserNestedInput
    blockedUsers?: BlockedUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMutedUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    ytCredential?: YtCredentialUncheckedUpdateOneWithoutUserNestedInput
    commentLikes?: CommentLikeUncheckedUpdateManyWithoutUserNestedInput
    actions?: UserActionUncheckedUpdateManyWithoutUserNestedInput
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
    listFollows?: ListFollowUncheckedUpdateManyWithoutUserNestedInput
    bookmarkFolders?: BookmarkFolderUncheckedUpdateManyWithoutUserNestedInput
    blockedUsers?: BlockedUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CommentLikeCreateManyUserInput = {
    id?: string
    commentId: string
    videoId: string
    type: string
    createdAt?: Date | string
  }

  export type UserActionCreateManyUserInput = {
    id?: string
    videoId: string
    commentId: string
    actionType: string
    content?: string | null
    createdAt?: Date | string
  }

  export type ListCreateManyUserInput = {
    id?: string
    name: string
    description?: string | null
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ListFollowCreateManyUserInput = {
    id?: string
    listId: string
    createdAt?: Date | string
  }

  export type BookmarkFolderCreateManyUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type BlockedUserCreateManyUserInput = {
    id?: string
    channelId: string
    channelName?: string | null
    createdAt?: Date | string
  }

  export type MutedUserCreateManyUserInput = {
    id?: string
    channelId: string
    channelName?: string | null
    createdAt?: Date | string
  }

  export type CommentLikeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentLikeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentLikeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserActionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserActionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserActionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ListItemUpdateManyWithoutListNestedInput
    followers?: ListFollowUpdateManyWithoutListNestedInput
  }

  export type ListUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ListItemUncheckedUpdateManyWithoutListNestedInput
    followers?: ListFollowUncheckedUpdateManyWithoutListNestedInput
  }

  export type ListUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListFollowUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    list?: ListUpdateOneRequiredWithoutFollowersNestedInput
  }

  export type ListFollowUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    listId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListFollowUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    listId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkFolderUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookmarks?: BookmarkUpdateManyWithoutFolderNestedInput
  }

  export type BookmarkFolderUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookmarks?: BookmarkUncheckedUpdateManyWithoutFolderNestedInput
  }

  export type BookmarkFolderUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockedUserUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockedUserUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockedUserUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MutedUserUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MutedUserUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MutedUserUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    channelId?: StringFieldUpdateOperationsInput | string
    channelName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListItemCreateManyListInput = {
    id?: string
    commentId: string
    videoId: string
    authorName: string
    authorThumb?: string | null
    content: string
    likeCount: string
    replyCount: string
    publishedTime: string
    createdAt?: Date | string
  }

  export type ListFollowCreateManyListInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type ListItemUpdateWithoutListInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorThumb?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    likeCount?: StringFieldUpdateOperationsInput | string
    replyCount?: StringFieldUpdateOperationsInput | string
    publishedTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListItemUncheckedUpdateWithoutListInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorThumb?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    likeCount?: StringFieldUpdateOperationsInput | string
    replyCount?: StringFieldUpdateOperationsInput | string
    publishedTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListItemUncheckedUpdateManyWithoutListInput = {
    id?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorThumb?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    likeCount?: StringFieldUpdateOperationsInput | string
    replyCount?: StringFieldUpdateOperationsInput | string
    publishedTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListFollowUpdateWithoutListInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutListFollowsNestedInput
  }

  export type ListFollowUncheckedUpdateWithoutListInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListFollowUncheckedUpdateManyWithoutListInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkCreateManyFolderInput = {
    id?: string
    userId: string
    commentId: string
    videoId: string
    authorName: string
    authorThumb?: string | null
    content: string
    likeCount: string
    replyCount: string
    publishedTime: string
    createdAt?: Date | string
  }

  export type BookmarkUpdateWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorThumb?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    likeCount?: StringFieldUpdateOperationsInput | string
    replyCount?: StringFieldUpdateOperationsInput | string
    publishedTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkUncheckedUpdateWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorThumb?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    likeCount?: StringFieldUpdateOperationsInput | string
    replyCount?: StringFieldUpdateOperationsInput | string
    publishedTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkUncheckedUpdateManyWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    commentId?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorThumb?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    likeCount?: StringFieldUpdateOperationsInput | string
    replyCount?: StringFieldUpdateOperationsInput | string
    publishedTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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