export default class OptimizedStorageManager {
  constructor(storageMethod, prefix, bucketSize) {
    try {
      // Some browsers (private mode) expose localStorage but throw on write.
      storageMethod.setItem("__available__", true);

      if (storageMethod.removeItem) {
        storageMethod.removeItem("__available__");
      }
    } catch (e) {
      throw new Error("Storage method is not currently available.");
    }

    this.storageMethod = storageMethod;
    this.prefix = prefix || "";
    this.bucketSize = bucketSize || 16;

    this.cachedLevelResults = [];

    // Read operation from storage method
    this.cacheLevelResults();
  }

  cacheLevelResults() {
    let cachedLevelResults = [];
    let i = 0;

    while (true) {
      const bucket = this.getLevelResultBucket(i);

      if (bucket.length === 0) {
        break;
      }

      cachedLevelResults = cachedLevelResults.concat(bucket);
      i++;
    }

    this.cachedLevelResults = cachedLevelResults;
  }

  getLevelResultBucket(bucket) {
    const results = this.storageMethod.getItem(
      this.prefix + "level_results_bucket_" + bucket,
    );

    return results ? JSON.parse(results) : [];
  }

  setLevelResultBucket(bucket, results) {
    this.storageMethod.setItem(
      this.prefix + "level_results_bucket_" + bucket,
      JSON.stringify(results),
    );
  }

  setCurrentLevel(level) {
    this.storageMethod.setItem(this.prefix + "level_current", level);
  }

  incrementCurrentLevel() {
    this.setCurrentLevel(this.getCurrentLevel() + 1);
  }

  getCurrentLevel() {
    return (
      parseInt(this.storageMethod.getItem(this.prefix + "level_current"), 10) ||
      1
    );
  }

  getLevelResults() {
    return this.cachedLevelResults;
  }

  setLevelResult(level, result) {
    const levelIndex = level - 1;
    const bucket = Math.floor(levelIndex / this.bucketSize);

    const results = this.getLevelResultBucket(bucket);

    results[levelIndex % this.bucketSize] = result;

    // Add level result to cache
    this.cachedLevelResults[levelIndex] = result;

    // Level results are placed into buckets to simplify writes
    this.setLevelResultBucket(bucket, results);
  }

  getLevelResult(level) {
    return this.getLevelResults()[level - 1];
  }
}
