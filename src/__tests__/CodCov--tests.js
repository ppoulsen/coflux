/*
 * jest isn't great about grabbing all files for code cov.
 * This file makes sure jest knows about every js file in
 * the repo, so it can properly get code covereage info
 */

/*
 * THIS ISN'T WORKING ON CIRCLECI. LETS COME BACK LATER
 */

const glob = require('glob');

const jsFiles = glob.sync('src/**.js');

jest.autoMockOn();

const srcPath = jest.currentTestPath().replace(/__.*/, '');

jsFiles.forEach(file => {
  // don't load test files
  if (file.search('__tests__') !== -1) {
    return;
  }

  const absoluteFile = file.
    replace(/\//g, srcPath).
    replace('src', '');

  require(absoluteFile);
});

