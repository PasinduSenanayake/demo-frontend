export class ServerError extends Error {
    response;

    constructor(response, ...params) {
      super(...params);
  
      Error.captureStackTrace(this, ServerError);
  
      this.name = 'ServerError';
      this.response = {};
      return this;
    }
  }
  
  export function parseError(error) {
    return error || 'Something went wrong';
  }
  
  export async function request(url, options = {}) {
    const config = {
      method: 'GET',
      ...options,
    };
    const errors = [];
  
    if (!url) {
      errors.push('url');
    }
  
    if (!config.payload && config.method !== 'GET' && config.method !== 'DELETE') {
      errors.push('payload');
    }
  
    if (errors.length) {
      const errorMsg = `Error! You must pass \`${errors.join('`, `')}\``;

      throw new Error(errorMsg);
    }
  
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    };
  
    const params = {
      headers,
      method: config.method,
    };
  
  
    return fetchPromise(url, params);
  }
  
  const fetchPromise = (url, params) =>
    fetch(url, params).then(async response => {
      if (response.status > 299) {
        const error = new ServerError(response.statusText);
        const contentType = response.headers.get('content-type');
  
        if (contentType && contentType.includes('application/json')) {
          error.response = {
            status: response.status,
            data: await response.json(),
          };
        } else {
          error.response = {
            status: response.status,
            data: await response.text(),
          };
        }
        throw error;
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        }
        return response.blob();
      }
    });
  