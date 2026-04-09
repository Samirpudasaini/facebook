import { chromium } from '@playwright/test';

async function measure(zoom) {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  if (zoom !== 1) {
    await page.evaluate((z) => { document.body.style.zoom = z; }, zoom);
  }
  await page.waitForTimeout(500);
  const data = await page.evaluate(() => {
    const main = document.querySelector('.flex-1.flex.items-start.justify-center.px-4.py-8.lg\\:px-8');
    const wrapper = document.querySelector('.flex.flex-col.lg\\:flex-row.items-start.gap-10.lg\\:gap-24.max-w-\\[1200px\\].w-full');
    const left = document.querySelector('.flex-1.max-w-\\[760px\\]');
    const right = document.querySelector('.w-full.max-w-\\[396px\\].lg\\:border-l');
    const collage = document.querySelector('.relative.w-full.max-w-\\[560px\\].mx-auto.lg\\:mx-0.h-\\[460px\\].min-h-\\[520px\\].lg\\:h-\\[520px\\]');
    const rect = (el) => el ? el.getBoundingClientRect() : null;
    return {
      zoom: document.body.style.zoom || 1,
      main: rect(main),
      wrapper: rect(wrapper),
      left: rect(left),
      right: rect(right),
      collage: rect(collage),
    };
  });
  await browser.close();
  return data;
}

(async () => {
  console.log('100%', await measure(1));
  console.log('110%', await measure(1.1));
})();
