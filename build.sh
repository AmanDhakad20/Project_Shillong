#!/bin/sh
# Offline build with esbuild (same output as `npm run build` with Vite, minus hashing).
set -e
export NODE_PATH=/opt/npm-tools/node_modules
rm -rf dist && mkdir dist
/opt/npm-tools/node_modules/.bin/esbuild src/main.jsx --bundle --minify --format=iife --jsx=automatic --define:process.env.NODE_ENV=\"production\" --outfile=dist/app.js
cp -r public/img public/audio dist/
python3 - <<'PY'
h=open('index.html').read()
h=h.replace('<script type="module" src="/src/main.jsx"></script>','<script src="app.js"></script>')
h=h.replace('</head>','  <link rel="stylesheet" href="app.css">\n</head>')
open('dist/index.html','w').write(h)
PY
