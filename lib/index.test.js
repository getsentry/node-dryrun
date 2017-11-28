'use strict';

/* eslint-env jest */
/* eslint-disable global-require */

afterEach(() => {
  delete process.env.DRY_RUN;
});

describe('environment', () => {
  function expectEnv(env, active) {
    if (env != null) {
      process.env.DRY_RUN = env;
    }

    jest.resetModules();
    const dryrun = require('./index');

    expect(dryrun.isDryRun()).toBe(active);
    expect(dryrun.shouldPerform()).toBe(!active);
  }

  test('undefined', () => expectEnv(undefined, false));
  test('empty', () => expectEnv('', false));
  test('false', () => expectEnv('false', false));
  test('0', () => expectEnv('0', false));
  test('no', () => expectEnv('no', false));
  test('true', () => expectEnv('true', true));
  test('1', () => expectEnv('1', true));
  test('yes', () => expectEnv('yes', true));
  test('bla', () => expectEnv('bla', true));
});

describe('setDryRun', () => {
  function expectSet(flag, active) {
    const dryrun = require('./index');
    dryrun.setDryRun(flag);

    expect(dryrun.isDryRun()).toBe(active);
    expect(dryrun.shouldPerform()).toBe(!active);
  }

  test('empty', () => expectSet(undefined, true));
  test('true', () => expectSet(true, true));
  test('false', () => expectSet(false, false));
});

test('reset', () => {
  const dryrun = require('./index');

  dryrun.setDryRun(true);
  dryrun.resetDryRun();

  expect(dryrun.isDryRun()).toBe(false);
  expect(dryrun.shouldPerform()).toBe(true);
});
