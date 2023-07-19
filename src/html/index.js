
// Highlight current nav item
var buttons = document.querySelectorAll('.nav-menu button');

buttons.forEach(function (button) {
    if (!button.classList.contains('settings') && !button.classList.contains('current-home')) {
        button.addEventListener('click', function () {
            buttons.forEach(function (button) {
                button.classList.remove('current') && button.classList.remove('current-home');
            });
            button.classList.add('current');
        });
    }
    if (button.classList.contains('current-home')) {
        button.addEventListener('click', function () {
            buttons.forEach(function (button) {
                button.classList.remove('current') && button.classList.remove('current-home');
            });
            button.classList.add('current-home');
        });
    }
});
