const typeormForSeedConfig = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database:
    process.env.NODE_ENV !== 'test' ? process.env.POSTGRES_DB : 'auth_test_db',
  autoLoadEntities: true,
  entities: ['src/**/*.entity.{ts,js}'],
  synchronize: true,
  logging: true,
  factories: ['src/**/*.factory.{ts,js}'],
  seeds: ['src/**/*.seed.{.ts,.js}'],
};

export = typeormForSeedConfig;
