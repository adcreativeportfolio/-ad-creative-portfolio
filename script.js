document.addEventListener("DOMContentLoaded", function () {

    /* =================================
       1. MOBILE NAVIGATION MENU
    ================================= */

    const menuButton = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    function closeMenu() {
        navLinks.classList.remove("active");

        menuButton.innerHTML = "☰";
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
    }

    menuButton.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("active");

        menuButton.innerHTML = isOpen ? "✕" : "☰";

        menuButton.setAttribute("aria-expanded", String(isOpen));

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    document.addEventListener("click", function (event) {
        if (
            navLinks.classList.contains("active") &&
            !navLinks.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {
            closeMenu();
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 700) {
            closeMenu();
        }
    });


    /* =================================
       2. SMOOTH SCROLLING
    ================================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    /* =================================
       3. SCROLL REVEAL ANIMATIONS
    ================================= */

    const revealElements = document.querySelectorAll(
        ".hero-content, .hero-visual, #work > .section-label, #work > h2, #work > .section-description, .project, #contact > *"
    );

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reduceMotion) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(function (element) {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });

    }


    /* =================================
   4. INTERACTIVE PORTFOLIO VIDEOS
================================= */

const videos = document.querySelectorAll(".project video");

videos.forEach(function (video) {

    const project = video.closest(".project");

    const videoObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    videos.forEach(function (otherVideo) {
                        if (otherVideo !== video) {
                            otherVideo.pause();
                        }
                    });

                    video.muted = true;

                    video.play().catch(function () {
                        console.log("Autoplay requires user interaction.");
                    });

                } else {
                    video.pause();
                }

            });

        },
        {
            threshold: 0.65
        }
    );

    videoObserver.observe(video);

    const actions = document.createElement("div");
    actions.className = "video-actions";

    const fullscreenButton = document.createElement("button");
    fullscreenButton.className = "fullscreen-button";
    fullscreenButton.type = "button";
    fullscreenButton.textContent = "View Fullscreen";

    fullscreenButton.addEventListener("click", async function () {

        try {

            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else if (video.requestFullscreen) {
                await video.requestFullscreen();
            } else if (video.webkitEnterFullscreen) {
                video.webkitEnterFullscreen();
            }

        } catch (error) {
            console.log("Fullscreen unavailable:", error);
        }

    });

    actions.appendChild(fullscreenButton);
    project.appendChild(actions);

});
    /* =================================
       5. CONTACT BUTTON INTERACTIONS
    ================================= */

    const copyButton = document.getElementById("copy-email");
    const copyStatus = document.getElementById("copy-status");

    const emailAddress = "seiddin.9@gmail.com";

    copyButton.addEventListener("click", async function () {

        try {

            await navigator.clipboard.writeText(emailAddress);

            copyButton.textContent = "Copied!";
            copyStatus.textContent = "Email address copied successfully.";

        } catch (error) {

            // Fallback for browsers without Clipboard API
            const temporaryInput = document.createElement("textarea");

            temporaryInput.value = emailAddress;
            temporaryInput.style.position = "fixed";
            temporaryInput.style.opacity = "0";

            document.body.appendChild(temporaryInput);

            temporaryInput.select();

            const copied = document.execCommand("copy");

            temporaryInput.remove();

            if (copied) {

                copyButton.textContent = "Copied!";
                copyStatus.textContent = "Email address copied successfully.";

            } else {

                copyStatus.textContent =
                    "Please copy manually: " + emailAddress;

            }

        }

        setTimeout(function () {
            copyButton.textContent = "Copy Email";
        }, 2500);

    });


    console.log("AD Creative is ready!");

});
