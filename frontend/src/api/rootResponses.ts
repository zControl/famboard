export interface ApiRootResponse {
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

export interface ApiVersionResponse {
  version: string;
}

export interface ApiHealthResponse {
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