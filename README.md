# kyt-proto

Built using [kyt](https://github.com/NYTimes/kyt)

Note: If an `fs.js` error shows up on server start, replace line 72 of `node_modules/kyt/webpack.base.js` to:
```
fs.writeFileSync(assetsFilePath, JSON.stringify(assets, null, ' '), 'utf8');
```
