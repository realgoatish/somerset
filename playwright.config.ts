// import type { PlaywrightTestConfig } from '@playwright/test';
import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		// port: 4173
    timeout: 120 * 1000,
    url: 'http://localhost:5173',
    reuseExistingServer: true
	},
  testDir: 'tests',
  use: {
    baseURL: 'http://localhost:5173'
  }
};

export default config;
