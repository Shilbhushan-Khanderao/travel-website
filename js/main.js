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

                submitButton.textContent = 'Preparing...';
                submitButton.disabled = true;

                if (requestStatus) {
                    requestStatus.textContent = 'Connecting securely to WhatsApp...';
                }

                var formData = new FormData(requestForm);
                
                var name = formData.get('customerName') || '';
                var phone = formData.get('customerPhone') || '';
                var date = formData.get('travelDate') || '';
                var time = formData.get('travelTime') || '';
                var destination = formData.get('tripType') || '';
                var guests = formData.get('guests') || '';
                var cabType = formData.get('cabType') || '';
                var luggage = formData.get('luggage') || '';
                var message = formData.get('customerMessage') || '';

                var text = `*New Travel Enquiry*\n\n` +
                           `*Name:* ${name}\n` +
                           `*Phone:* ${phone}\n` +
                           `*Date:* ${date}\n` +
                           `*Time:* ${time}\n` +
                           `*Destination:* ${destination}\n` +
                           `*Travelers:* ${guests}\n` +
                           `*Cab Preference:* ${cabType}\n` +
                           `*Luggage:* ${luggage} kg\n` +
                           `*Message:* ${message}`;

                // --- 1. SEND EMAIL NOTIFICATION (Using Web3Forms - Free) ---
                // You need to get a free Access Key from https://web3forms.com and paste it below
                formData.append("access_key", "YOUR_WEB3FORMS_ACCESS_KEY_HERE");
                formData.append("subject", "New Travel Enquiry from " + name);
                
                try {
                    await fetch("https://api.web3forms.com/submit", {
                        method: "POST",
                        body: formData
                    });
                } catch(err) {
                    console.error("Email notification failed, but continuing to WhatsApp", err);
                }

                // --- 2. WHATSAPP REDIRECT ---
                // Replace with the actual business WhatsApp number (country code + number without plus sign)
                var whatsappNumber = "919872037571"; 
                var whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

                // Open WhatsApp in a new tab
                window.open(whatsappUrl, '_blank');
                
                // --- 3. RESET FORM ---
                submitButton.innerHTML = '<i class="fab fa-whatsapp mr-2"></i>Get Quote via WhatsApp';
                submitButton.disabled = false;
                requestForm.reset();
                if (requestStatus) {
                    requestStatus.innerHTML = '<strong class="text-success"><i class="fa fa-check-circle mr-1"></i> Ready! Please press send in WhatsApp.</strong>';
                }
            });
        }
    });
})();

