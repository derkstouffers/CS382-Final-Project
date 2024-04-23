document.addEventListener('DOMContentLoaded', function() {
    // sign up and register stuff
    const login_btn = document.getElementById('login');
    const login_form = document.getElementById('login-form');
    const welcome_page = document.getElementById('welcome-page');

    login_btn.addEventListener('click', function() {
        welcome_page.style.display = 'none';
        login_form.style.display = 'flex';
    });
});