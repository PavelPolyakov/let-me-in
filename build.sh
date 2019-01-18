# prepare dist folders structure
rm -rf ./dist
mkdir dist
cd dist
mkdir background
mkdir popup
mkdir options
cd ..

# build

# manifest
cp manifest.json icon-locked.png icon-unlocked.png ./dist

# background
cd src/background
rollup --config
cd ../../
cp -r src/background/dist/. ./dist/background

# options
cd src/options
ls
npx env-cmd .env.prod npm run build
cd ../../
cp -r src/options/build/. ./dist/options
rm ./dist/options/manifest.json

# popup
# options
cd src/popup
npx env-cmd .env.prod npm run build
cd ../../
cp -r src/popup/build/. ./dist/popup
rm ./dist/popup/manifest.json