const fs = require('fs');
const puppeteer = require('puppeteer');
var rootPath = process.argv[2];
var staticPath = process.argv[3];
var style = process.argv[4];
var toolsMiscPath = process.argv[5];

if (!fs.existsSync(rootPath + '/' + staticPath + 'styles/' + style)) {
    console.log('Style folder does not exist');
    process.exit(-1);
}
var preview = rootPath + '/' + staticPath + 'styles/' + style + '/preview.html';
var output = rootPath + '/' + staticPath + 'stylespreview/full_' + style + '.png';

fs.copyFileSync(toolsMiscPath + '/render_base.html', preview, (err) => {
    if (err) throw err;
});

(async () => {
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 1000});
    await page.goto('file://' + preview);
    await page.screenshot({path: output});
    await browser.close();
    fs.unlink(preview);
})();
