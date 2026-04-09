import { chromium } from '@playwright/test';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshot-100.png', fullPage: true });
  await page.evaluate(() => document.body.style.zoom = '1.1');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot-110.png', fullPage: true });
  await browser.close();
  console.log('Screenshots saved');
})();
