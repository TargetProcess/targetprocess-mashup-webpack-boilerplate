import $ from 'jQuery';
import './style.css';

module.exports = function() {

    $('body').append(`
        <div class="tmwb-overlay">You did it!</div>
    `);
};
