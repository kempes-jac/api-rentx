namespace NodeJS {
  interface ProcessEnv {
    APP_API_URL: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_BUCKET: string;
    AWS_BUCKET_REGION: string;
    AWS_BUCKET_URL: string;
    AWS_SECRET_ACCESS_KEY: string;
    DISK_TYPE: string;
    FORGOT_MAIL_URL: string;
    MAIL_HOST: string;
    MAIL_PORT:string;
    MAIL_USER:string;
    MAIL_PASSWORD:string;
    NODE_ENV: 'test' | 'prod';
    REFRESHTOKEN_SECRET: string;
    REDIS_HOST: string;
    REDIS_PORT: number;
    TOKEN_SECRET: string;
    TYPEORM_DATABASE: string;
    TYPEORM_HOST: string;
    TYPEORM_MIGRATIONS_DIR: string;
    TYPEORM_PASSWORD: string;
    TYPEORM_PORT: number;
    TYPEORM_USERNAME: string;
    TYPEORM_TESTDATABASE: string;
  }
}