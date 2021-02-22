const puppeteer = require('puppeteer');
const cheerio   = require('cheerio');

(async () => {

    async function getBody(url, delayTime) {
        function delay(time) {
            return new Promise(function(resolve) { 
                setTimeout(resolve, time)
            });
        }

        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox"]
        });
        const page = await browser.newPage();
        await page.setViewport({
          width: 1366,
          height: 768
        });
        const DOM = await page.goto(url);

        await delay(delayTime);

        return await page.evaluate(() => document.body.outerHTML);
    }

    const body = await getBody('https://place.map.kakao.com/1948529078', 1000);

    const $ = cheerio.load(body);


    const bg_present = cheerio.html($('.bg_present'));

    console.log();

    const innerStyle = $('.bg_present').attr('style');

    const pattern = /\(\'+/;

    const ret = pattern.exec(innerStyle)['input'];


    console.log(ret.substring(22, ret.length - 2));



})();
