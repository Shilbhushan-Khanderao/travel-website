(function () {
    "use strict";

    document.addEventListener('DOMContentLoaded', function () {
        var backToTop = document.querySelector('.back-to-top');
        var requestForm = document.getElementById('customerRequestForm');
        var requestStatus = document.getElementById('requestStatus');
        var navbarToggler = document.querySelector('.navbar-toggler');
        var navbarCollapse = document.getElementById('navbarCollapse');

        function updateBackToTopVisibility() {
            if (!backToTop) {
                return;
            }

            backToTop.style.display = window.scrollY > 100 ? 'inline-flex' : 'none';
        }

        function closeNavbar() {
            if (!navbarToggler || !navbarCollapse) {
                return;
            }

            navbarCollapse.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
        }

        function closeDropdowns() {
            document.querySelectorAll('.navbar .dropdown.show').forEach(function (dropdown) {
                dropdown.classList.remove('show');
                var menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.classList.remove('show');
                }
                var toggle = dropdown.querySelector('.dropdown-toggle');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }

        updateBackToTopVisibility();
        window.addEventListener('scroll', updateBackToTopVisibility, { passive: true });

        if (backToTop) {
            backToTop.addEventListener('click', function (event) {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        if (navbarToggler && navbarCollapse) {
            navbarToggler.setAttribute('aria-controls', 'navbarCollapse');
            navbarToggler.setAttribute('aria-expanded', 'false');

            navbarToggler.addEventListener('click', function () {
                var isOpen = navbarCollapse.classList.toggle('show');
                navbarToggler.setAttribute('aria-expanded', String(isOpen));
                if (!isOpen) {
                    closeDropdowns();
                }
            });

            navbarCollapse.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', function () {
                    if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                        closeNavbar();
                    }
                });
            });
        }

        document.querySelectorAll('.navbar .dropdown-toggle').forEach(function (toggle) {
            toggle.addEventListener('click', function (event) {
                var dropdown = toggle.closest('.dropdown');

                if (!dropdown) {
                    return;
                }

                event.preventDefault();

                var isOpen = dropdown.classList.contains('show');
                closeDropdowns();

                if (!isOpen) {
                    dropdown.classList.add('show');
                    var menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) {
                        menu.classList.add('show');
                    }
                    toggle.setAttribute('aria-expanded', 'true');
                }
            });
        });

        document.addEventListener('click', function (event) {
            if (!event.target.closest('.navbar')) {
                closeDropdowns();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeNavbar();
                closeDropdowns();
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth >= 992) {
                closeNavbar();
                closeDropdowns();
            }
        });

        if (requestForm) {
            requestForm.addEventListener('submit', async function (event) {
                event.preventDefault();

                var submitButton = requestForm.querySelector('button[type="submit"]');

                if (!submitButton) {
                    return;
                }

                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';

                if (requestStatus) {
                    requestStatus.textContent = 'Sending the request to the guide.';
                }

                try {
                    var response = await fetch(requestForm.action, {
                        method: 'POST',
                        body: new FormData(requestForm),
                        headers: {
                            Accept: 'application/json'
                        }
                    });

                    var payload = null;

                    try {
                        payload = await response.json();
                    } catch (parseError) {
                        payload = null;
                    }

                    if (response.ok && payload && payload.success) {
                        if (requestStatus) {
                            requestStatus.textContent = payload.message || 'Request sent successfully.';
                        }
                        requestForm.reset();
                    } else if (requestStatus) {
                        requestStatus.textContent = (payload && payload.message) ? payload.message : 'Unable to send the request.';
                    }
                } catch (error) {
                    if (requestStatus) {
                        requestStatus.textContent = 'Unable to send the request right now. Please try again later.';
                    }
                } finally {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send request';
                }
            });
        }
    });
})();

