import { CommandLineAction, CommandLineFlagParameter, CommandLineIntegerParameter,
  CommandLineParser, CommandLineStringParameter } from '@microsoft/ts-command-line';
import { bin, description, name } from '../package.json';
import logger from './lib/logger';
import update from './lib/update';

const [binName] = Object.keys(bin);

class UpdateBranchAction extends CommandLineAction {

  private from!: CommandLineStringParameter;
  private branch!: CommandLineStringParameter;
  private message!: CommandLineStringParameter;
  private noFetch!: CommandLineFlagParameter;

  public constructor() {
    super({
      actionName: 'update',
      summary: 'Updates a branch',
      documentation: 'Updates a branch',
    });
  }

  protected onDefineParameters(): void {
    this.branch = this.defineStringParameter({
      parameterLongName: '--branch',
      argumentName: 'TARGET',
      description: 'The branch to update. Defaults to the currently active branch.',
    });

    this.from = this.defineStringParameter({
      parameterLongName: '--from',
      argumentName: 'SOURCE',
      description: 'The branch to update from',
      defaultValue: 'master',
    });

    this.message = this.defineStringParameter({
      parameterLongName: '--message',
      parameterShortName: '-m',
      argumentName: 'MESSAGE',
      description: 'The merge commit message. Defaults to "chore: Update from SOURCE"',
    });

    this.noFetch = this.defineFlagParameter({
      parameterLongName: '--no-fetch',
      description: 'Do not fetch changes.',
    });
  }

  protected onExecute(): Promise<void> {
    return update({
      branch: this.branch.value,
      from: this.from.value,
      fetch: !this.noFetch.value,
      message: this.message.value,
    });
  }
}

class UpdateBranchCLI extends CommandLineParser {

  private verbose!: CommandLineFlagParameter;
  private silent!: CommandLineFlagParameter;
  private logLevel!: CommandLineIntegerParameter;

  public constructor() {
    super({
      toolFilename: binName,
      toolDescription: description,
    });

    this.addAction(new UpdateBranchAction());
  }

  protected onDefineParameters(): void {
    this.verbose = this.defineFlagParameter({
      parameterLongName: '--verbose',
      description: 'Enable additional logging',
    });

    this.silent = this.defineFlagParameter({
      parameterLongName: '--silent',
      parameterShortName: '-S',
      description: 'Suppress all logging',
    });

    this.logLevel = this.defineIntegerParameter({
      parameterLongName: '--log-level',
      parameterShortName: '-L',
      argumentName: 'LOG_LEVEL',
      description: 'Set the log level',
    });
  }

  protected onExecute(): Promise<void> {
    logger.setup({
      verbose: this.verbose.value,
      silent: this.silent.value,
      logLevel: this.logLevel.value,
    });

    return super.onExecute();
  }

}

if (!module.parent) {
  process.title = name;
  const cli = new UpdateBranchCLI();
  cli.execute(process.argv.slice(2));
}
