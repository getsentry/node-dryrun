'use strict';

/**
 * If the code calling this module is in dry run mode, it causes no side effects
 */

/** Global variable tracking the value of `process.env.DRY_RUN` */
let dryRun;

/**
 * Tracks whether `setDryRun` has been used to manually override the value of
 * `dryRun`
 */
let manualOverride = false;

/**
 * Resets `dryRun` to the value of `process.env.DRY_RUN`.
 */
function resetDryRun() {
  dryRun = String(process.env.DRY_RUN || '');
  manualOverride = false;
}

/**
 * Returns whether the `DRY_RUN` flag is set in the environment, to anything
 * other than `false`, `0` or `no`.
 *
 * If true, the code calling this should execute in a "pure" mode (i.e. without
 * any side effects). This is the opposite of {@link shouldPerform}. Use
 * {@link setDryRun} to manually override the value (or lack thereof) in the
 * environment.
 *
 * @returns {bool}
 */
function isDryRun() {
  // When used in tests, this module is initialized before any tests run. That
  // means that if the tests set `process.env.DRY_RUN`, its new value won't get
  // picked up unless we go and grab it here. That said, always grabbing it here
  // breaks `setDryRun`, so if that's been called (and `resetDryRun` hasn't been
  // called afterwards), then let that value take precedence.
  if (!manualOverride) {
    resetDryRun();
  }

  return (
    Boolean(dryRun) && dryRun !== 'false' && dryRun !== '0' && dryRun !== 'no'
  );
}

/**
 * Overrides the `DRY_RUN` value set in the environment
 *
 * @param {bool} active Whether to turn `DRY_RUN` on or off
 */
function setDryRun(active) {
  dryRun = String(active == null ? true : active);
  manualOverride = true;
}

/**
 * Returns whether the `DRY_RUN` flag is absent in the environment, or set to
 * `false`, `0` or `no`.
 *
 * If true, the code calling this may cause side effects. This is the opposite
 * of {@link isDryRun}. Use {@link setDryRun} to manually override the value (or
 * lack thereof) in the environment.
 *
 * @returns {bool}
 */
function shouldPerform() {
  return !isDryRun();
}

// Initialize the `DRY_RUN` value
resetDryRun();

module.exports = {
  isDryRun,
  setDryRun,
  shouldPerform,
  resetDryRun,
};
