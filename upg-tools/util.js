const yargs = require('yargs');
const Resource = require('./Resource');

yargs
  .command('build <files...>', 'Build Resources', (yarg) => {
    return yarg.positional('files', {
      describe: 'Build CSVs into Sandbox Resourecs',
    });
  }, (argv) => {
    Resource.buildResourceFile(argv.files);
  })
  .strictCommands()
  .demandCommand(1)
  .argv;
