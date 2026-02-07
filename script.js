// --- 1. Theme Switch ---
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') toggleSwitch.checked = true;
}
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}
toggleSwitch.addEventListener('change', switchTheme, false);

// --- 2. Modal Logic ---
const modal = document.getElementById("projectModal");
const title = document.getElementById("modalTitle");
const desc = document.getElementById("modalDesc");
const tech = document.getElementById("modalTech");

function openModal(projectTitle, projectDesc, projectTech) {
    title.innerText = projectTitle;
    desc.innerText = projectDesc;
    tech.innerText = projectTech;
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// --- 4. News Modal Logic ---
const newsModal = document.getElementById("newsModal");
const fullNewsList = document.getElementById("fullNewsList");
const seeMoreBtn = document.getElementById("seeMoreNews");

// You can define all your news here as an array of objects
// const allNews = [
//     { date: "Jan 21", year: "2026", title: "Promoted to Software Engineer 2", tag: "Awarded early promotion via the SEP Accelerated Promotion Program at JPMC." },
//     { date: "2023", year: "IEEE", title: "Published Research Paper", tag: "Cardiovascular Risk Prediction published in IEEE." },
//     { date: "2023", year: "SIH", title: "Smart India Hackathon Winner", tag: "Secured 1st rank nationally in the Grand Finale." },
//     { date: "May 15", year: "2024", title: "Graduated Valedictorian", tag: "Ranked 1st among all engineering departments at VIT Pune." },
//     { date: "Aug 10", year: "2023", title: "Best Outgoing Student Award", tag: "Recognized for academic excellence and leadership by the Institute." }
// ];
const allNews = [
    { 
        date: "Jan 21", year: "2026", 
        category: "professional", 
        title: "I got an early promotion! Yay!", 
        tag: "Promoted to SDE2 via the SEP Accelerated Program — an honor given to only 8-10% of the 2024 global graduate pool." 
    },
    { 
        date: "2023", year: "IEEE", 
        category: "research", // Add this
        title: "Published Research Paper", 
        tag:     "Cardiovascular Risk Prediction on AWS." 
    },
    { 
        date: "2023", year: "IEEE", 
        category: "research", // Add this
        title: "Published Research Paper", 
        tag:     "Cardiovascular Risk Prediction on AWS." 
    },
    { 
        date: "2023", year: "SIH", 
        category: "award", // Add this
        title: "Smart India Hackathon Winner", 
        tag: "1st rank nationally in the Grand Finale." 
    },
    {
        date: "May 15", year: "2024", 
        category: "award",
        title: "Graduated Valedictorian", 
        tag: "Ranked 1st among all engineering departments at VIT Pune." 
    },
    {
        date: "May 15", year: "2024", 
        category: "award",
        title: "Graduated Valedictorian", 
        tag: "Ranked 1st among all engineering departments at VIT Pune." 
    }
];

function openNewsModal() {
    fullNewsList.innerHTML = '';
    allNews.forEach(item => {
        const categoryClass = `badge-${item.category}`;
        const categoryText = item.category.toUpperCase();

        fullNewsList.innerHTML += `
            <div class="news-card">
                <span class="badge ${categoryClass}">${categoryText}</span>
                
                <div class="news-date-box">
                    <span>${item.date}</span>
                    <span>${item.year}</span>
                </div>
                
                <div class="news-content" style="padding-top: 5px;">
                    <p>${item.title}</p>
                    <span class="news-tag">${item.tag}</span>
                </div>
            </div>`;
    });
    newsModal.style.display = "flex";
    document.body.classList.add('no-scroll');
}

function closeNewsModal() {
    newsModal.style.display = "none";
    document.body.classList.remove('no-scroll');
}

// Ensure the project modal also locks scroll
function openModal(projectTitle, projectDesc, projectTech) {
    title.innerText = projectTitle;
    desc.innerText = projectDesc;
    tech.innerText = projectTech;
    modal.style.display = "flex"; // Changed to flex
    document.body.classList.add('no-scroll');
}

function closeModal() {
    modal.style.display = "none";
    document.body.classList.remove('no-scroll');
}

seeMoreBtn.addEventListener('click', openNewsModal);

// Update window.onclick to handle both modals
window.onclick = function(event) {
    if (event.target == modal) closeModal();
    if (event.target == newsModal) closeNewsModal();
}

// --- 3. Gallery Logic ---
const track = document.getElementById('sliderTrack');
const wrapper = document.getElementById('sliderWrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const originalContent = track.innerHTML;
track.innerHTML = originalContent + originalContent + originalContent;

const cardWidth = 480; 
const itemsPerSet = 4;
const setWidth = cardWidth * itemsPerSet;
let currentTrans = -setWidth; 
track.style.transform = `translateX(${currentTrans}px)`;

let isDown = false, startX, scrollLeft, isPaused = false, autoScrollSpeed = 0.8, animationId;

function autoScroll() {
    if (!isPaused) {
        currentTrans -= autoScrollSpeed;
        checkBoundary();
        track.style.transform = `translateX(${currentTrans}px)`;
    }
    animationId = requestAnimationFrame(autoScroll);
}
animationId = requestAnimationFrame(autoScroll);

function checkBoundary() {
    if (currentTrans <= -(setWidth * 2)) currentTrans += setWidth;
    if (currentTrans >= 0) currentTrans -= setWidth;
}

wrapper.addEventListener('mousedown', (e) => { isDown = true; isPaused = true; wrapper.style.cursor = 'grabbing'; startX = e.pageX - wrapper.offsetLeft; scrollLeft = currentTrans; });
wrapper.addEventListener('mouseleave', () => { isDown = false; isPaused = false; wrapper.style.cursor = 'grab'; });
wrapper.addEventListener('mouseup', () => { isDown = false; isPaused = false; wrapper.style.cursor = 'grab'; });
wrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1.5;
    currentTrans = scrollLeft + walk;
    if (currentTrans <= -(setWidth * 2)) currentTrans += setWidth;
    if (currentTrans >= 0) currentTrans -= setWidth;
    track.style.transform = `translateX(${currentTrans}px)`;
});

function slideBy(amount) {
    isPaused = true;
    track.style.transition = 'transform 0.5s ease-in-out';
    currentTrans += amount;
    track.style.transform = `translateX(${currentTrans}px)`;
    setTimeout(() => {
        track.style.transition = 'none';
        if (currentTrans <= -(setWidth * 2)) currentTrans += setWidth;
        if (currentTrans >= 0) currentTrans -= setWidth;
        track.style.transform = `translateX(${currentTrans}px)`;
        isPaused = false;
    }, 500);
}

prevBtn.addEventListener('click', () => slideBy(cardWidth));
nextBtn.addEventListener('click', () => slideBy(-cardWidth));
wrapper.addEventListener('mouseenter', () => isPaused = true);