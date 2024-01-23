const fs = require('fs');


const date = (new Date()).toLocaleDateString('en-ZA'); // yyyy/MM/dd
const reports = ['MTP', 'CTA'];

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const yesterdate = yesterday.toLocaleDateString('en-ZA'); // yyyy/MM/dd

if (!fs.existsSync(`./src/posts/${date}`)) {
    fs.mkdirSync(`./src/posts/${date}`)
}

reports.forEach(report => {
    fs.readdir(`./src/.vuepress/public/assets/img/${date}/${report}`, (err, files) => {
        files.forEach(file => {
            const ticker = (file.split('.'))[0];
            const postPath = `./src/posts/${date}/${ticker}.md`;
            if (!fs.existsSync(postPath)) {
                fs.writeFile(postPath, `
---
date: ${date.replace(/\//g, '-')}
title: ${ticker} on ${(new Date(date)).toLocaleDateString()}
tags: 
  - ${ticker}
---
<div class="post">
<snapshot-grid 
    :reports="['${yesterdate}/CTA/${ticker}', '${date}/CTA/${ticker}', '${date}/MTP/${ticker}']"
    chart="${date}/Chart/${ticker}"
/>
<p>

</p>
<p>

</p>
</div>
                `.trim(), err => {
                    if (err) {
                        console.log(`${ticker}: ${err}`);
                        return;
                    }
                    console.log(`post created for ${ticker}`);
                })
            }
        });
    });
})
