import execa from 'execa';
import logger from './logger';

export interface UpdateOptions {
  branch?: string;
  from?: string;
  fetch?: boolean;
  message?: string;
}

async function git(...args: string[]) {
  logger.debug(`Running 'git ${args.join(' ')}'`);
  const result = await execa('git', args);
  logger.debug(result.stdout);
  return result;
}

export default async function update({
  branch,
  from = 'master',
  fetch = true,
  message,
}: UpdateOptions) {
  const target = branch || (await git('rev-parse', '--abbrev-ref', 'HEAD')).stdout;

  if (target === from) {
    throw new Error(`Source and target branch cannot be equal (both '${target}').
Use the 'branch' and 'from' options to change them.`);
  }

  logger.info(`Updating '${target}' from '${from}'...`);

  if (fetch) {
    logger.info('Fetching remote changes...');
    await git('fetch', '--all');
  }

  logger.info('Applying changes...');
  await git('checkout', target)
    .catch(() => {
      logger.warn('Failed to checkout target branch.');
      // FIXME: Make optional (e.g. with 'create' option)
      logger.info('Creating target branch...');
      return git('checkout', '-b', target);
    });

  const commitMessage = message || `chore: Update from ${from}`;
  await git('merge', from, '-m', commitMessage);

  logger.info('Update complete!');
  logger.info(`Run 'git push' to upload your changes`);
}
