import * as migration_20261009_115956_migration from './20261009_115956_migration';
import * as migration_20261016_151400_migration from './20261016_151400_migration';

export const migrations = [
  {
    up: migration_20261009_115956_migration.up,
    down: migration_20261009_115956_migration.down,
    name: '20261009_115956_migration',
  },
  {
    up: migration_20261016_151400_migration.up,
    down: migration_20261016_151400_migration.down,
    name: '20261016_151400_migration'
  },
];
