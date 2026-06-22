# Redis Notes

## What is Redis?
- Redis is an in-memory data store and message broker.
- It is often used as a cache, session store, queue, leaderboard engine, or pub/sub broker.
- Redis keeps data in memory for speed, with optional persistence to disk.

## Key Redis concepts
- **Keys**: Unique identifiers for stored values.
- **Values**: Can be strings, hashes, lists, sets, sorted sets, bitmaps, hyperloglogs, streams.
- **TTL**: Time to live. Keys can expire after a fixed time.
- **Persistence**:
  - RDB snapshots: point-in-time snapshots saved to disk.
  - AOF: append-only log for every write operation.
- **Replication**: Master-slave replication for data redundancy and scaling reads.
- **Cluster**: Shards data across multiple Redis nodes for scalability.

## Common data structures
- `STRING`: Simple string values, can store JSON or serialized objects.
- `HASH`: Useful for objects, e.g. user data: `user:123` with fields.
- `LIST`: Ordered list of values. Great for queues with `LPUSH`/`RPOP`.
- `SET`: Unique unordered collection. Good for tags or membership sets.
- `ZSET` (sorted set): Items with scores, ideal for leaderboards.
- `STREAM`: Append-only log data structure for event streaming.

## Common use cases
- **Caching**: Store frequently read data for quick access.
  - Use `SET key value EX seconds` to expire entries.
  - Cache database query results or API responses.
- **Session storage**: Keep session state for web apps.
  - Store session object under `session:<id>`.
- **Rate limiting**: Count requests in a time window.
  - Use `INCR` and `EXPIRE` or `INCRBY`.
- **Queues**: Use `LPUSH` and `RPOP` or `XADD`/`XREAD` for streaming.
- **Pub/Sub**: Publish messages to channels and subscribe from services.
- **Leaderboards**: Use sorted sets to store scores and rank users.

## Redis commands cheat sheet
- Key management: `SET`, `GET`, `DEL`, `EXPIRE`, `TTL`, `KEYS`, `SCAN`
- Strings: `INCR`, `INCRBY`, `DECR`, `APPEND`
- Hashes: `HSET`, `HGET`, `HGETALL`, `HDEL`
- Lists: `LPUSH`, `RPUSH`, `LPOP`, `RPOP`, `LRANGE`
- Sets: `SADD`, `SMEMBERS`, `SREM`, `SISMEMBER`
- Sorted sets: `ZADD`, `ZRANGE`, `ZREVRANGE`, `ZREM`, `ZSCORE`
- Pub/Sub: `PUBLISH`, `SUBSCRIBE`, `UNSUBSCRIBE`
- Persistence: `SAVE`, `BGSAVE`, `BGREWRITEAOF`

## Redis in backend architecture
- Use Redis as a fast layer in front of a primary database.
- Keep cache logic simple: cache-aside is common.
- Invalidate or update cache when database writes happen.
- For session stores, middleware can read/write Redis before request handling.

## Best practices
- Use `SCAN` instead of `KEYS` in production to avoid blocking.
- Set TTL for cache keys to prevent stale data and memory bloat.
- Avoid storing huge values; keep objects small and efficient.
- Monitor memory usage and eviction strategy.
- Choose appropriate eviction policy: `volatile-lru`, `allkeys-lru`, etc.

## When not to use Redis
- Not a replacement for durable primary storage when strict durability is required.
- Not ideal for large immutable datasets that exceed memory capacity.
- Use a database when complex queries, transactions, and joins are needed.

## Useful Redis patterns
- **Cache-aside**: Load from cache, fallback to DB, then populate cache.
- **Write-through**: Write to cache and persistent store together.
- **Bloom filters**: Use bitmaps or hyperloglogs for membership tests.
- **Distributed locks**: Use `SET key value NX PX milliseconds`.

## Quick example
```js
const redis = require('redis');
const client = redis.createClient();

await client.connect();
await client.set('user:1', JSON.stringify({ name: 'Alice' }), { EX: 3600 });
const userJson = await client.get('user:1');
const user = JSON.parse(userJson);
```

## Summary
- Redis is powerful for fast stateful operations in backend systems.
- It excels at caching, sessions, queues, pub/sub, and leaderboard logic.
- Use Redis with attention to memory usage and persistence choice.
- Keep data simple and use expiration to manage the cache lifecycle.
