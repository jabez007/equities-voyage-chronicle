const fs = require('fs');
const tickerTags = require('./ticker-tags.js')

let today;
if (process.argv[2]) {
    today = new Date(process.argv[2]);
} else {
    today = new Date();
}
if (today.getDay() == 6) {
    today.setDate(today.getDate() - 1);
} else if (today.getDay() == 0) {
    today.setDate(today.getDate() - 2);
}
const date = today.toLocaleDateString('en-ZA'); // yyyy/MM/dd

const reports = ['MTP', 'CTA'];

const yesterday = new Date(date);
yesterday.setDate(yesterday.getDate() - 1);
if (yesterday.getDay() == 0) {
    yesterday.setDate(yesterday.getDate() - 2);
}
const yesterdate = yesterday.toLocaleDateString('en-ZA'); // yyyy/MM/dd

date.split("/").reduce((acc, curr) => {
    const newPath = `${acc}/${curr}`;
    if (!fs.existsSync(`./src/posts${newPath}`)) {
        fs.mkdirSync(`./src/posts${newPath}`);
        console.log(`directory created for ${newPath}`);
    }
    return newPath;
}, "")

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
    if (['UNG', 'natural_gas'].includes(ticker)) {
        return {
            MTP: 'UNG',
            CTA: 'natural_gas'
        }
    }
    return {
        MTP: ticker,
        CTA: ticker
    }
}

reports.forEach(report => {
    fs.readdir(`./src/.vuepress/public/assets/img/${date}/${report}`, (err, files) => {
        (files || []).forEach(file => {
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
