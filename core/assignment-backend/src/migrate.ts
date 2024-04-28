import {AssignmentBackendApplication} from './application';
import {DataSource} from '@loopback/repository';

async function runCustomSql(app: AssignmentBackendApplication) {
  const dataSource: DataSource = await app.get('datasources.db'); // Adjust 'db' to your actual datasource name
  const sqlCheckSequence = `SELECT EXISTS (
    SELECT 1 FROM pg_sequences
    WHERE sequencename = 'order_id_seq'
  );`;

  const result = await dataSource.execute(sqlCheckSequence);
  const sequenceExists = result[0].exists;

  if (!sequenceExists) {
    const sqlCreateSequence = `CREATE SEQUENCE order_id_seq;`;
    await dataSource.execute(sqlCreateSequence);
  }

  const sqlAlterTable = `
    ALTER TABLE "order" ALTER COLUMN id TYPE integer USING id::integer;
    ALTER TABLE "order" ALTER COLUMN id SET DEFAULT nextval('order_id_seq'::regclass);
  `;
  await dataSource.execute(sqlAlterTable);

  console.log('Custom SQL executed');
}

export async function migrate(args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const app = new AssignmentBackendApplication();
  await app.boot();
  await app.migrateSchema({existingSchema});

  // Run custom SQL
  await runCustomSql(app);

  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
