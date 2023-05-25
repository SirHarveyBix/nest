import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
  // delete test.sqlite after every tests
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (error) {}
});
