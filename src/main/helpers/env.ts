export const getEnvVar = (env: string): string => {
  return process.env[env] as string;
};

export const env = {
  postgres: {
    host: getEnvVar('POSTGRESQL_HOST'),
    password: getEnvVar('POSTGRESQL_PASSWORD'),
    database: getEnvVar('POSTGRESQL_DATABASE'),
    port: getEnvVar('POSTGRESQL_PORT'),
    username: getEnvVar('POSTGRESQL_USERNAME'),
  },
  appPort: getEnvVar('APP_PORT') || '3333',
};

export const verifyEnvironmentVariables = (): void => {
  const checkRequiredVars = (requiredVars: string[]): void => {
    requiredVars.forEach(requiredVar => {
      const varIsDefined = !!process.env[requiredVar];
      if (!varIsDefined) {
        throw new Error(`${requiredVar} environment variable is not defined`);
      }
    });
  };

  const requiredVars = [
    'POSTGRESQL_HOST',
    'POSTGRESQL_PASSWORD',
    'POSTGRESQL_DATABASE',
    'POSTGRESQL_PORT',
    'POSTGRESQL_USERNAME',
    'DATABASE_URL',
  ];

  checkRequiredVars(requiredVars);
};
