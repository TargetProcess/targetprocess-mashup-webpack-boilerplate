/*globals mashup*/
import topMenuApi from 'tp3/mashups/topmenu';
import upsidedown from 'upsidedown'

var item = topMenuApi.addItem({
    title: mashup.config.buttonLabel
});

item.$element.on('click', () => {

    item.$element.text(upsidedown(item.$element.text()));

    require.ensure(['./overlay'], (require) => {

        require('./overlay')();
    });
});
