namespace NodeJS {
  interface ProcessEnv {
    TYPEORM_HOST: string;
    TYPEORM_USERNAME: string;
    TYPEORM_PASSWORD: string;
    TYPEORM_DATABASE: string;
    TYPEORM_TESTDATABASE: string;
    TYPEORM_PORT: number;
    TYPEORM_MIGRATIONS_DIR: string;
    TOKEN_SECRET: string;
    REFRESHTOKEN_SECRET: string;
    NODE_ENV: 'test' | 'prod';
    FORGOT_MAIL_URL: string;
    AWS_ACCES_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_BUCKET: string;
    AWS_BUCKET_REGION: string;
    AWS_BUCKET_URL: string;
    DISK_TYPE: string;
    APP_API_URL: string;
    MAIL_HOST: string;
    MAIL_PORT:string;
    MAIL_USER:string;
    MAIL_PASSWORD:string;
  }
}