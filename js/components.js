/**
 * UI Component functions for the Lightning Network Gallery
 */

/**
 * Creates a project card element
 * @param {Object} project - Project data
 * @returns {HTMLElement} Project card element
 */
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-project', project.project_name.toLowerCase());
    card.setAttribute('data-tags', project.tags.join(',').toLowerCase());
    
    const links = project.links.map(link => 
        `<a href="${link.url}" target="_blank" rel="noopener" class="project-link">
            ${link.type}
        </a>`
    ).join('');

    const tags = project.tags.map(tag => 
        `<span class="project-tag">${tag}</span>`
    ).join('');

    card.innerHTML = `
        <div class="project-header">
            <div class="project-name">${project.project_name}</div>
            <div class="project-level">${project.project_level}</div>
        </div>
        ${links ? `<div class="project-links">${links}</div>` : ''}
        ${tags ? `<div class="project-tags">${tags}</div>` : ''}
    `;

    return card;
}

/**
 * Creates a category section
 * @param {Object} category - Category data
 * @returns {HTMLElement} Category section element
 */
function createCategorySection(category) {
    const section = document.createElement('section');
    section.className = 'category';
    section.setAttribute('data-category', category.name.toLowerCase());

    const header = document.createElement('div');
    header.className = 'category-header';
    header.innerHTML = `
        <h2>
            ${category.name}
            <span class="category-toggle">▼</span>
        </h2>
        <p class="category-description">${category.description}</p>
    `;

    const projectsGrid = document.createElement('div');
    projectsGrid.className = 'projects-grid hidden';

    category.items.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });

    section.appendChild(header);
    section.appendChild(projectsGrid);

    // Add click handler for accordion behavior
    header.addEventListener('click', () => {
        const isExpanded = section.classList.contains('expanded');
        
        // Close all other categories
        document.querySelectorAll('.category').forEach(cat => {
            cat.classList.remove('expanded');
            cat.querySelector('.projects-grid').classList.add('hidden');
        });

        // Toggle current category
        if (!isExpanded) {
            section.classList.add('expanded');
            projectsGrid.classList.remove('hidden');
        }
    });

    return section;
}

/**
 * Creates a tag element
 * @param {string} tag - Tag name
 * @param {number} count - Number of projects with this tag
 * @param {number} maxCount - Maximum tag count for sizing
 * @returns {HTMLElement} Tag element
 */
function createTagElement(tag, count, maxCount) {
    const tagElement = document.createElement('span');
    tagElement.className = 'tag';
    tagElement.textContent = `${tag} (${count})`;
    tagElement.setAttribute('data-tag', tag.toLowerCase());
    
    // Size tags based on frequency
    const size = Math.min(5, Math.max(1, Math.ceil((count / maxCount) * 5)));
    tagElement.classList.add(`size-${size}`);

    tagElement.addEventListener('click', () => {
        const isActive = tagElement.classList.contains('active');
        
        // Remove active from all tags
        document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
        
        if (!isActive) {
            tagElement.classList.add('active');
            filterByTag(tag);
        } else {
            showAllProjects();
        }
    });

    return tagElement;
}

/**
 * Creates the statistics panel content
 * @param {Object} stats - Statistics data
 * @returns {void}
 */
function updateStatsPanel(stats) {
    document.getElementById('totalProjects').textContent = stats.totalProjects;
    document.getElementById('totalCategories').textContent = stats.totalCategories;
    document.getElementById('projectsWithLinks').textContent = stats.projectsWithLinks;

    const breakdown = document.getElementById('categoryBreakdown');
    breakdown.innerHTML = '';
    
    stats.categoryBreakdown.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category-stat';
        categoryDiv.innerHTML = `
            <span>${category.name}</span>
            <span>${category.count} projects</span>
        `;
        breakdown.appendChild(categoryDiv);
    });
}

/**
 * Shows loading state
 */
function showLoading() {
    document.getElementById('loadingIndicator').classList.remove('hidden');
    document.getElementById('categoriesContainer').classList.add('hidden');
}

/**
 * Hides loading state
 */
function hideLoading() {
    document.getElementById('loadingIndicator').classList.add('hidden');
    document.getElementById('categoriesContainer').classList.remove('hidden');
}

/**
 * Shows error message
 * @param {string} message - Error message to display
 */
function showError(message = 'Unable to load project data. Please try refreshing the page.') {
    hideLoading();
    const errorElement = document.getElementById('errorMessage');
    errorElement.querySelector('p').textContent = message;
    errorElement.classList.remove('hidden');
}

/**
 * Debounce function for search input
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Highlights search terms in text
 * @param {string} text - Text to highlight
 * @param {string} searchTerm - Term to highlight
 * @returns {string} HTML with highlighted terms
 */
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

/**
 * Animates number counting
 * @param {HTMLElement} element - Element to animate
 * @param {number} target - Target number
 * @param {number} duration - Animation duration in ms
 */
function animateNumber(element, target, duration = 1000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}