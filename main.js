// Skills data
const skills = [
    { name: "Roblox Building", description: "Advanced proficiency in Low & High Poly Roblox building themes." },
    { name: "Roblox UI Design", description: "Learning low-poly/medium-poly Graphical User Interface Design." },
    { name: "Luau Programmer", description: "Learning/Indermediate Luau Programmer." },
    { name: "Clothing Designer", description: "Learning/Indermediate Clothing Designer for the Roblox Platform.." },
];

// Tags system
const categories = {
    'Building': ['Low-Poly', 'High-Poly', 'Environmental Design'],
    'Scripting': ['Luau', 'Menu', 'Database', 'User Interface'],
    'UI Design': ['Low-Poly UI', 'Medium-Poly UI'],
    'Clothing Design': ['Staff Shirts', 'Plain Shirts'],
 
};

// Previous work data
const previousWork = [
    { name: "High-Poly Road", image: "HighPoly1.png", category: "Building", type: "High-Poly" },
    { name: "High-Poly Entrance", image: "HighPoly2.png", category: "Building", type: "High-Poly" },
    { name: "High-Poly Entrance 2", image: "HighPoly3.png", category: "Building", type: "High-Poly" },
    { name: "High-Poly Interior", image: "HighPoly4.png", category: "Building", type: "High-Poly" },
    { name: "Medium-Poly Radio", image: "MediumPolyRadio.png", category: "UI Design", type: "Medium-Poly UI" },
    { name: "Low-Poly Cave", image: "LowPolyCave.png", category: "Building", type: "Low-Poly" },
    { name: "Low-Poly Cave Entrance", image: "LowPolyCaveEntrance.png", category: "Building", type: "Low-Poly" },
    { name: "Low-Poly Map Design", image: "LowPolyMapDesign.png", category: "Building", type: "Low-Poly" },
    { name: "Low-Poly Cabin", image: "LowPolyCabin.png", category: "Building", type: "Low-Poly" },
    { name: "Low-Poly Snowman", image: "LowPolySnowMan.png", category: "Building", type: "Low-Poly" },
    { name: "Low-Poly Cabin", image: "LowPolyRNGCabin.png", category: "Building", type: "Low-Poly" },
    { name: "Low-Poly Map Design", image: "LowPolyRNGMapDesign.png", category: "Building", type: "Low-Poly" },
    { name: "Low-Poly Cave Entrance", image: "LowPolyRNGCaveEntrance.png", category: "Building", type: "Low-Poly" },

];

// Commissions data
const commissions = [
    {
        name: "Voice Control",
        logo: "VoiceControl.png",
        payout: "200K Robux",
        description: "Tasked with the building of World 3 for Voice Control & RunUp Studios",
        tags: ["Building"],
        link: "https://www.roblox.com/games/17800309532/Voice-Control"
    },
    {
        name: "Al's RNG",
        logo: "AlsRNG.png",
        payout: "20K Robux",
        description: "Tasked with building the main map for AL's Rng and GreenBey56's Studio.",
        tags: ["Building"],
        link: "https://www.roblox.com/games/16638124623/Als-RNG"
    },
];

// DOM elements for skills, commissions, and modal
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

// Pagination for Commissions
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
            <img src="images/${commission.logo}" alt="${commission.name}">
            <div class="commission-name">${commission.name}</div>
        `;
        commissionItem.addEventListener('click', () => showModal(commission));
        commissionsContainer.appendChild(commissionItem); // Append to container
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
    commissionsContainer.innerHTML = ''; // Clear content ONLY when starting from page 1
    loadCommissions(currentCommissionsPage); // Load initial commissions
});

// Modal functionality for commissions
function showModal(commission) {
    modalTitle.innerHTML = `<a href="${commission.link}" target="_blank">${commission.name}</a>`;
    modalLogo.src = `images/${commission.logo}`;
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

// Load Skills into the container
skills.forEach(skill => {
    const skillBox = document.createElement('div');
    skillBox.className = 'skill-box';
    skillBox.innerHTML = `
        <h3>${skill.name}</h3>
        <p>${skill.description}</p>
    `;
    skillsContainer.appendChild(skillBox);
});

// Pagination for Previous Work
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
            <img src="images/${work.image}" alt="${work.name}" class="work-image">
            <div class="work-name">${work.name}</div>
        `;
        workItem.querySelector('img').addEventListener('click', () => showWorkModal(work));
        galleryContainer.appendChild(workItem); // Append to container without clearing
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
    galleryContainer.innerHTML = ''; // Clear only when going back to page 1
    loadWork(currentWorkPage); // Reload first four works
});

// Populate and filter Previous Work
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

    filterWork(); // Initial load of previous work based on filters
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

    // Reset to first page and reload the displayed works
    currentWorkPage = 1; 
    galleryContainer.innerHTML = ''; 
    loadWork(currentWorkPage);
}

// Modal functionality for previous work
function showWorkModal(work) {
    modalTitle.textContent = work.name;
    modalLogo.src = `images/${work.image}`;
    modalPayout.textContent = '';
    modalDescription.textContent = `Category: ${work.category}, Type: ${work.type}`;

    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10);
}

// Initialize
loadCommissions(currentCommissionsPage);
loadPreviousWork();
