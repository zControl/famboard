export interface ApiRoot {
    timestamp: string;
    greeting: string;
    message: string;
    environment: string;
    docsURL: string;
    endpoints: {
      version: string;
      health: string;
    }
}

export interface ApiVersion {
  version: string;
}

export interface ApiHealth {
    status: string;
    info: {
      database: {
        status: string;
      }
    },
    error: object;
    details: {
      database: {
        status: string;
      }
    }
}