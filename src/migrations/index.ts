import * as migration_20261009_115956_migration from './20261009_115956_migration';

export const migrations = [
  {
    up: migration_20261009_115956_migration.up,
    down: migration_20261009_115956_migration.down,
    name: '20261009_115956_migration'
  },
];
