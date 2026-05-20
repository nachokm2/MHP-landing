/**
 * Main entry point — imports and initialises all components.
 * Loaded with type="module" + defer, so DOM is ready on execution.
 */

import { initNav } from './components/nav.js';
import { initDashboard } from './components/dashboard.js';
import { initCounters } from './components/counters.js';

initNav();
initDashboard();
initCounters();
