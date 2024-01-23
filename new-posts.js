const fs = require('fs');
const tickerTags = require('./ticker-tags.js')


const date = (new Date()).toLocaleDateString('en-ZA'); // yyyy/MM/dd
const reports = ['MTP', 'CTA'];

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const yesterdate = yesterday.toLocaleDateString('en-ZA'); // yyyy/MM/dd

if (!fs.existsSync(`./src/posts/${date}`)) {
    fs.mkdirSync(`./src/posts/${date}`)
}

function getReportTickers(ticker) {
    if (['SLV', 'silver'].includes(ticker)) {
        return {
            MTP: 'SLV',
            CTA: 'silver'
        }
    }
    if (['GLD', 'gold'].includes(ticker)) {
        return {
            MTP: 'GLD',
            CTA: 'gold'
        }
    }
    if (['UUP', 'dollar'].includes(ticker)) {
        return {
            MTP: 'UUP',
            CTA: 'dollar'
        }
    }
    return {
        MTP: ticker,
        CTA: ticker
    }
}

reports.forEach(report => {
    fs.readdir(`./src/.vuepress/public/assets/img/${date}/${report}`, (err, files) => {
        files.forEach(file => {
            const tickers = getReportTickers((file.split('.'))[0]);
            const postPath = `./src/posts/${date}/${tickers.MTP}.md`;
            if (!fs.existsSync(postPath)) {
                fs.writeFile(postPath, `
---
date: ${date.replace(/\//g, '-')}
title: ${tickers.MTP} on ${(new Date(date)).toLocaleDateString()}
tags: 
  - ${tickers.MTP}
  ${tickerTags[tickers.MTP] || ''}
---
<div class="post">
<snapshot-grid 
    :reports="['${yesterdate}/CTA/${tickers.CTA}', '${date}/CTA/${tickers.CTA}', '${date}/MTP/${tickers.MTP}']"
    chart="${date}/Chart/${tickers.MTP}"
/>
<p>

</p>
<p>

</p>
</div>
                `.trim(), err => {
                    if (err) {
                        console.log(`${tickers.MTP}: ${err}`);
                        return;
                    }
                    console.log(`post created for ${tickers.MTP}`);
                })
            }
        });
    });
})
