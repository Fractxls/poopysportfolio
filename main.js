const skills = [
    { name: "Roblox Builder", description: "Advanced proficiency in Low Poly Roblox building theme." },
    { name: "Roblox Terrain Artist", description: "Indermediate Roblox Environmental Artist." },
    { name: "Experienced Studio Manager", description: "Expertise with managing/controlling a Studio or Development group." },

];

const categories = {
    'Building': ['Low-Poly', 'Environmental Design'],
};

const previousWork = [
    { name: "Low-Poly Cave", Image: "LowPolyCave.png", category: "Building", type: "Low-Poly" },
    { name: "Low-Poly Cave Entrance", Image: "LowPolyCaveEntrance.png", category: "Building", type: "Low-Poly" },
    { name: "Low-Poly Map Design", Image: "LowPolyMapDesign.png", category: "Building", type: "Low-Poly" },
    { name: "Low-Poly Cabin", Image: "LowPolyCabin.png", category: "Building", type: "Low-Poly" },
    { name: "Low-Poly Snowman", Image: "LowPolySnowMan.png", category: "Building", type: "Low-Poly" },
    { name: "Low-Poly Cabin", Image: "LowPolyRNGCabin.png", category: "Building", type: "Low-Poly" },
    { name: "Low-Poly Map Design", Image: "LowPolyRNGMapDesign.png", category: "Building", type: "Low-Poly" },
    { name: "Low-Poly Cave Entrance", Image: "LowPolyRNGCaveEntrance.png", category: "Building", type: "Low-Poly" },
];

const commissions = [
    {
        name: "Voice Control",
        logo: "VoiceControl.png",
        payout: "200K Robux",
        description: "Tasked with the building of World 3 for Voice Control & RunUp Studios. - Collaborated with @Fractxls",
        tags: ["Building"],
        link: "https://www.roblox.com/games/17800309532/Voice-Control"
    },
    {
        name: "Al's RNG",
        logo: "AlsRNG.png",
        payout: "20K Robux",
        description: "Tasked with building the main map for AL's Rng and GreenBey56's Studio. - Collaborated with @Fractxls",
        tags: ["Building"],
        link: "https://www.roblox.com/games/16638124623/Als-RNG"
    },
];

const skillsContainer = document.getElementById('skills-container');
const commissionsContainer = document.getElementById('commissions-container');
const loadMoreCommissionsBtn = document.getElementById('load-more-commissions');
const showLessCommissionsBtn = document.getElementById('show-less-commissions');
const loadMorePreviousBtn = document.getElementById('load-more-previous');
const showLessPreviousBtn = document.getElementById('show-less-previous');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalLogo = document.getElementById('modal-logo');
const modalPayout = document.getElementById('modal-payout');
const modalDescription = document.getElementById('modal-description');
const categoryFilter = document.getElementById('category-filter');
const typeFilter = document.getElementById('type-filter');
const galleryContainer = document.getElementById('previous-container');
document.getElementById('current-year').textContent = new Date().getFullYear();

const commissionsPerPage = 4;
let currentCommissionsPage = 1;

function loadCommissions(page) {
    const start = (page - 1) * commissionsPerPage;
    const end = start + commissionsPerPage;
    const commissionSlice = commissions.slice(start, end);

    commissionSlice.forEach(commission => {
        const commissionItem = document.createElement('div');
        commissionItem.className = 'commission-item';
        commissionItem.innerHTML = `
            <img src="Images/${commission.logo}" alt="${commission.name}">
            <div class="commission-name">${commission.name}</div>
        `;
        commissionItem.addEventListener('click', () => showModal(commission));
        commissionsContainer.appendChild(commissionItem);
    });

    updateCommissionButtons();
}

function updateCommissionButtons() {
    if (currentCommissionsPage * commissionsPerPage < commissions.length) {
        loadMoreCommissionsBtn.style.display = 'block';
        showLessCommissionsBtn.style.display = 'none';
    } else {
        loadMoreCommissionsBtn.style.display = 'none';
        showLessCommissionsBtn.style.display = currentCommissionsPage > 1 ? 'block' : 'none';
    }
}

loadMoreCommissionsBtn.addEventListener('click', () => {
    currentCommissionsPage++;
    loadCommissions(currentCommissionsPage);
});

showLessCommissionsBtn.addEventListener('click', () => {
    currentCommissionsPage = 1;
    commissionsContainer.innerHTML = '';
    loadCommissions(currentCommissionsPage);
});

function showModal(commission) {
    modalTitle.innerHTML = `<a href="${commission.link}" target="_blank">${commission.name}</a>`;
    modalLogo.src = `Images/${commission.logo}`;
    modalPayout.textContent = `Payout: ${commission.payout}`;
    modalDescription.textContent = commission.description;

    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10);
}

closeModal.onclick = function () {
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 300);
    }
};

skills.forEach(skill => {
    const skillBox = document.createElement('div');
    skillBox.className = 'skill-box';
    skillBox.innerHTML = `
        <h3>${skill.name}</h3>
        <p>${skill.description}</p>
    `;
    skillsContainer.appendChild(skillBox);
});

const worksPerPage = 4;
let currentWorkPage = 1;
let filteredWork = [...previousWork];

function loadWork(page) {
    const start = (page - 1) * worksPerPage;
    const end = start + worksPerPage;
    const workSlice = filteredWork.slice(start, end);

    workSlice.forEach(work => {
        const workItem = document.createElement('div');
        workItem.className = 'work-item';
        workItem.innerHTML = `
            <img src="Images/${work.Image}" alt="${work.name}" class="work-Image">
            <div class="work-name">${work.name}</div>
        `;
        workItem.querySelector('img').addEventListener('click', () => showWorkModal(work));
        galleryContainer.appendChild(workItem);
    });

    updateWorkButtons();
}

function updateWorkButtons() {
    if (currentWorkPage * worksPerPage < filteredWork.length) {
        loadMorePreviousBtn.style.display = 'block';
        showLessPreviousBtn.style.display = 'none';
    } else {
        loadMorePreviousBtn.style.display = 'none';
        showLessPreviousBtn.style.display = currentWorkPage > 1 ? 'block' : 'none';
    }
}

loadMorePreviousBtn.addEventListener('click', () => {
    currentWorkPage++;
    loadWork(currentWorkPage);
});

showLessPreviousBtn.addEventListener('click', () => {
    currentWorkPage = 1;
    galleryContainer.innerHTML = '';
    loadWork(currentWorkPage);
});

function loadPreviousWork() {
    Object.keys(categories).forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    updateTypeFilter(categoryFilter.value);

    categoryFilter.addEventListener('change', () => {
        updateTypeFilter(categoryFilter.value);
        filterWork();
    });

    typeFilter.addEventListener('change', filterWork);

    filterWork();
}

function updateTypeFilter(selectedCategory) {
    const types = categories[selectedCategory] || [];
    typeFilter.innerHTML = '<option value="all">All Types</option>';
    
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeFilter.appendChild(option);
    });
}

function filterWork() {
    const selectedCategory = categoryFilter.value;
    const selectedType = typeFilter.value;
    
    filteredWork = previousWork.filter(work =>
        (selectedCategory === 'all' || work.category === selectedCategory) &&
        (selectedType === 'all' || work.type === selectedType)
    );

    currentWorkPage = 1; 
    galleryContainer.innerHTML = ''; 
    loadWork(currentWorkPage);
}

function showWorkModal(work) {
    modalTitle.textContent = work.name;
    modalLogo.src = `Images/${work.Image}`;
    modalPayout.textContent = '';
    modalDescription.textContent = `Category: ${work.category}, Type: ${work.type}`;

    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10);
}

function animateOnScroll() {
    const scrollElements = document.querySelectorAll('.scroll-animation');
    
    const observerOptions = {
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            const target = entry.target;

            if (entry.isIntersecting) {
                target.classList.add('show');
                target.classList.remove('hide');
            } else {
                target.classList.remove('show');
                target.classList.add('hide');
            }
        });
    }, observerOptions);

    scrollElements.forEach((el) => observer.observe(el));
}

function addScrollAnimation() {
    const workItems = document.querySelectorAll('.work-item');
    const commissionItems = document.querySelectorAll('.commission-item');

    workItems.forEach((item) => item.classList.add('scroll-animation'));
    commissionItems.forEach((item) => item.classList.add('scroll-animation'));
}

loadCommissions(currentCommissionsPage);
loadPreviousWork(currentWorkPage);
