const env = process.env.REACT_APP_ENV;

const serverConstants = {
    baseURL: env === 'production' ? 'https://production-url.com' :
        env === 'staging' ? 'https://staging-url.com' :
            'http://localhost:8080' // Default to local
};

export default serverConstants;