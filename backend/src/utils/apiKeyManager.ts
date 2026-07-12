import { config } from '../config';

interface ApiKeyStatus {
  key: string;
  exhaustedUntil: number; // Timestamp in MS when the rate limit expires
}

class ApiKeyManager {
  private static instance: ApiKeyManager;
  private keys: ApiKeyStatus[] = [];

  private constructor() {
    this.initializeKeys();
  }

  public static getInstance(): ApiKeyManager {
    if (!ApiKeyManager.instance) {
      ApiKeyManager.instance = new ApiKeyManager();
    }
    return ApiKeyManager.instance;
  }

  private initializeKeys() {
    // Collect all keys from environment variables starting with GOOGLE_API_KEY
    const envKeys = Object.keys(process.env).filter(k => k.startsWith('GOOGLE_API_KEY'));
    
    // Always add the default key from config first
    if (config.googleApiKey) {
      this.keys.push({ key: config.googleApiKey, exhaustedUntil: 0 });
    }

    // Add remaining keys
    for (const envKey of envKeys) {
      const val = process.env[envKey];
      if (val && val !== config.googleApiKey) {
        this.keys.push({ key: val, exhaustedUntil: 0 });
      }
    }

    if (this.keys.length === 0) {
      console.warn("⚠️ [ApiKeyManager] No Google API keys found in environment.");
    } else {
      console.log(`🔑 [ApiKeyManager] Initialized with ${this.keys.length} API keys for rotation.`);
    }
  }

  /**
   * Retrieves the next available API key that is not currently rate-limited.
   * If all keys are rate-limited, it will throw an error indicating how long to wait.
   */
  public getNextAvailableKey(): string {
    const now = Date.now();
    
    for (const status of this.keys) {
      if (now >= status.exhaustedUntil) {
        return status.key;
      }
    }

    // If we reach here, all keys are exhausted
    // Find the one that will unlock the soonest
    const soonestUnlock = Math.min(...this.keys.map(k => k.exhaustedUntil));
    const waitSeconds = Math.ceil((soonestUnlock - now) / 1000);
    
    throw new Error(`[ALL_KEYS_EXHAUSTED] All API keys have hit their rate limits. Please retry in ${waitSeconds}s.`);
  }

  /**
   * Marks a specific key as rate-limited for a duration
   */
  public markKeyExhausted(key: string, waitTimeSeconds: number) {
    const target = this.keys.find(k => k.key === key);
    if (target) {
      // Add a 2 second buffer to the wait time
      target.exhaustedUntil = Date.now() + ((waitTimeSeconds + 2) * 1000);
      console.warn(`🔄 [ApiKeyManager] Key starting with ${key.substring(0, 8)}... marked exhausted for ${Math.round(waitTimeSeconds)}s. Switching to next key.`);
    }
  }

  public getTotalKeys(): number {
    return this.keys.length;
  }
}

export const apiKeyManager = ApiKeyManager.getInstance();
