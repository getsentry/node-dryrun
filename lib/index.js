/**
 * If this bot is in dry run it executes no side effects
 */
let dryRun;

/**
 * Returns whether the DRY_RUN flag was set in the environment
 *
 * If true, the application should execute "pure" (i.e. without any)
 * side effects. This is the opposite of {@link shouldPerform}. Use
 * {@link setDryRun} to manually set the value.
 *
 * @returns {bool}
 */
function isDryRun() {
  return Boolean(dryRun)
    && dryRun !== 'false'
    && dryRun !== '0'
    && dryRun !== 'no';
}

/**
 * Overrides the DRY_RUN value set in the environment
 *
 * @param {bool} active Whether to turn DRY_RUN on or off
 */
function setDryRun(active = true) {
  dryRun = String(active);
}

/**
 * Returns whether the DRY_RUN flag was absent in the environment
 *
 * If true, the application may execute side effects. This is the
 * opposite of {@link isDryRun}. Use {@link setDryRun} to manually
 * set the value.
 *
 * @returns {bool}
 */
function shouldPerform() {
  return !isDryRun();
}

/**
 * Resets the DRY_RUN flag to the environment value
 */
function resetDryRun() {
  dryRun = String(process.env.DRY_RUN || '');
}

// Initialize the DRY_RUN value
resetDryRun();

module.exports = {
  isDryRun,
  setDryRun,
  shouldPerform,
  resetDryRun,
};
