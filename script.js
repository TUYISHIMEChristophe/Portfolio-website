document.addEventListener('DOMContentLoaded', () => {
    // ----------------- THEME TOGGLE -----------------
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    if (localStorage.getItem('theme') === 'dark') {
        body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        if (body.hasAttribute('data-theme')) {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    // ----------------- MOBILE MENU -----------------
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    // ----------------- SCROLL REVEAL -----------------
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) reveal.classList.add('active');
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // ----------------- ACTIVE NAV -----------------
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });
        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) a.classList.add('active');
        });
    });

    // ----------------- CONTACT FORM -----------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                let messages = JSON.parse(localStorage.getItem('messages') || '[]');
                messages.push(data);
                localStorage.setItem('messages', JSON.stringify(messages));

                alert('Message sent successfully!');
                contactForm.reset();
            } catch (error) {
                console.error('Submission error:', error);
                alert('Failed to send message. Please try again.');
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ----------------- OFFER PASSWORD -----------------
    const offerBtn = document.getElementById('offerBtn');
    const passwordBox = document.getElementById('passwordBox');
    const offerPassword = document.getElementById('offerPassword');
    const submitPassword = document.getElementById('submitPassword');
    const closePassword = document.getElementById('closePassword');

    const correctPassword = "myoffer123";

    offerBtn.addEventListener('click', () => {
        passwordBox.classList.remove('hidden');
        offerPassword.focus();
    });

    closePassword.addEventListener('click', () => {
        passwordBox.classList.add('hidden');
        offerPassword.value = "";
    });

    submitPassword.addEventListener('click', () => {
        if (offerPassword.value === correctPassword) {
            // save fullscreen state
            localStorage.setItem('fullscreenActive', fullscreenActive ? 'true' : 'false');
            window.location.href = 'hidden.html';
        } else {
            alert('Incorrect password!');
            offerPassword.value = "";
        }
    });

    offerPassword.addEventListener('keydown', e => {
        if (e.key === 'Enter') submitPassword.click();
    });
        // ----------------- SOURCE VIEW PROTECTION -----------------
    let sourceInput = "";
    const secretSourceWord = "source";

    // Disable right-click context menu
    document.addEventListener('contextmenu', e => e.preventDefault());

    // Disable common keys: Ctrl+U, F12, Ctrl+Shift+I
    document.addEventListener('keydown', e => {
        if ((e.ctrlKey && e.key.toLowerCase() === 'u') ||  // Ctrl+U
            (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') || // Ctrl+Shift+I
            (e.key === 'F12')) {
            e.preventDefault();
            alert('Viewing source is disabled. Type the secret word to unlock.');
        }

        // Check if typing the secret word
        if (e.key.length === 1) {
            sourceInput += e.key.toLowerCase();
        } else if (e.key === "Backspace") {
            sourceInput = sourceInput.slice(0, -1);
        } else if (e.key === "Enter") {
            if (sourceInput === secretSourceWord) {
                alert('Source viewing enabled!');
                // Remove protection
                document.oncontextmenu = null;
                document.onkeydown = null;
            }
            sourceInput = "";
        }
    });

    // ----------------- FULLSCREEN SECRET WORD -----------------
    let fullscreenActive = false;
    const secretWord = "mine";
    window.secretInput = "";

    document.addEventListener('keydown', e => {
        const activeTag = document.activeElement.tagName.toLowerCase();
        if (activeTag === 'input' || activeTag === 'textarea') return;

        if (e.key === "Enter") {
            if (window.secretInput.trim().toLowerCase() === secretWord) {
                if (!fullscreenActive) openFullscreen();
                else closeFullscreen();
                window.secretInput = '';
            } else {
                window.secretInput = '';
            }
        } else if (e.key.length === 1) {
            window.secretInput += e.key;
        } else if (e.key === "Backspace") {
            window.secretInput = window.secretInput.slice(0, -1);
        }
    });

    function openFullscreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) elem.requestFullscreen();
        else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
        else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
        else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
        fullscreenActive = true;
    }

    function closeFullscreen() {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
        fullscreenActive = false;
    }
    const projects = [
    {
        title: "My Profile",
        desc: "I am TUYISHIME Christophe, a Web Developer, UI/UX Designer, and Trading Analyst.",
        tags: ["React", "Node.js", "MongoDB"],
        img: "project1.png"
    }
    // {
    //     title: "E-Commerce Platform",
    //     desc: "A fully functional online store with cart functionality and payment integration.",
    //     tags: ["HTML", "CSS", "JavaScript"],
    //     img: "project2.png"
    // },
    // {
    //     title: "Task Manager App",
    //     desc: "A web-based task manager with local storage and message tracking.",
    //     tags: ["Vue.js", "Firebase", "Bootstrap"],
    //     img: "project3.png"
    // }
];

let currentProject = 0;

const projectTitle = document.getElementById('projectTitle');
const projectDesc = document.getElementById('projectDesc');
const projectTags = document.getElementById('projectTags');
const projectImg = document.getElementById('projectImg');
const prevBtn = document.getElementById('prevProject');
const nextBtn = document.getElementById('nextProject');

function showProject(index) {
    const project = projects[index];
    projectTitle.textContent = project.title;
    projectDesc.textContent = project.desc;

    projectTags.innerHTML = '';
    project.tags.forEach(tag => {
        const span = document.createElement('span');
        span.textContent = tag;
        projectTags.appendChild(span);
    });

    projectImg.src = project.img;
}

// Next/Prev functionality
nextBtn.addEventListener('click', () => {
    currentProject = (currentProject + 1) % projects.length;
    showProject(currentProject);
});

prevBtn.addEventListener('click', () => {
    currentProject = (currentProject - 1 + projects.length) % projects.length;
    showProject(currentProject);
});

// Initialize first project
showProject(currentProject);

});
