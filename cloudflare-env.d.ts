declare namespace Cloudflare {
  interface Env {
    ADMIN_EMAIL?: string;
    CREDENTIAL_EXPORT_KEY?: string;
    ADMIN_PASSWORD_HASH?: string;
    ADMIN_PASSWORD_SALT?: string;
    DB?: D1Database;
    BUCKET?: R2Bucket;
  }
}
