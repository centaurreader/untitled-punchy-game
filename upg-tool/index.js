const yargs = require('yargs');
const Resource = require('./Resource');

yargs
  .command('build <files...>', 'Build JSON Resource Files from CSVs', (yarg) => {
    return yarg.positional('files', {
      describe: 'Build CSVs into Sandbox Resourecs',
    });
  }, (argv) => {
    Resource.buildFile(argv.files);
  })
  .strictCommands()
  .demandCommand(1)
  .argv;
