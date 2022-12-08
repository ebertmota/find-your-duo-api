import '../http/config/module-alias';
import { execSync } from 'child_process';
import { join } from 'path';
import { PgConnection } from '../../infra/postgres/helpers/connection';

const args = process.argv.slice(3);
const stringArgs = args.join(' ');

function execute(command: string) {
  const prismaBinary = join(
    __dirname,
    '..',
    '..',
    '..',
    'node_modules',
    '.bin',
    'prisma',
  );
  execSync(`${prismaBinary} ${command}`, {
    env: {
      ...process.env,
      DATABASE_URL: PgConnection.generateDatabaseURL(),
    },
  });
}
execute(stringArgs);
