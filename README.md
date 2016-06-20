
# Targetprocess Mashup Webpack Boilerplate

[Webpack](http://webpack.github.io) boilerplate to create Targetprocess mashup.

## Usage

Clone repository. 

Run `npm install`.

Edit `webpack/*.js` to make suitable for your needs. Edit source code in `src` folder. Edit mashup documentation in `docs` folder. Edit name and description for the Mashups Library in `src\manifest.json` file.

## Commands

Following commands are defined in the `package.json` file:
* Use `npm start` command for development of mashup. It build mashup in development configuration and deploy results to targetprocess `Mashups` folder. It also start webpack watcher that rebuild and redeploy code on changes. You need to set enviroment variable `TARGETPROCESS_MASHUPS_PATH` to a path to your folder with targetprocess mashups, e.g. `{git_root}\Code\Main\Tp.Web\JavaScript\Mashups\Common`.
* `npm run build:development` build mashup in development configuration and store results in `build\development` folder.
* `npm run build:manager` build mashup for usage in Mashups Manager UI and store results in `build\manager` folder. This results in a single `.js` file.
* `npm run build:library` build mashup for deploy to Mashups Library and store results in `build\library` folder. This script generates `manifest.cfg` file with placeholders and `manifest.baseinfo.json` with mashup description for the Library. It also process image urls from `docs\README.md` so that they are correct after uploading mashup to the Library. `./attack.jpg` become `https://github.com/TargetProcess/TP3MashupLibrary/raw/master/{mashup_name}/attack.jpg`

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

