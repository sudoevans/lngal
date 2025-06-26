/**
 * Main application logic for Lightning Network Gallery
 */

// Global state
let allData = null;
let currentFilter = 'all';
let currentSearch = '';
let currentTag = '';

/**
 * Initialize the application
 */
async function init() {
    showLoading();
    
    try {
        // Load data
        allData = await loadData();
        
        // Initialize UI
        setupEventListeners();
        renderCategories(allData.categories);
        renderTagCloud(allData.categories);
        renderStats(allData.categories);
        populateCategoryFilter(allData.categories);
        
        // Set last updated
        document.getElementById('lastUpdated').textContent = new Date().toLocaleDateString();
        
        hideLoading();
        
    } catch (error) {
        console.error('Failed to initialize app:', error);
        showError();
    }
}

/**
 * Load JSON data
 * @returns {Promise<Object>} Parsed JSON data
 */
async function loadData() {
    const response = await fetch('lngal_data.json');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce((e) => {
        currentSearch = e.target.value.toLowerCase();
        filterProjects();
    }, 300));

    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.addEventListener('change', (e) => {
        const selectedCategory = e.target.value.toLowerCase();
        filterByCategory(selectedCategory);
    });

    // Stats toggle
    const statsToggle = document.getElementById('statsToggle');
    const statsPanel = document.getElementById('statsPanel');
    statsToggle.addEventListener('click', () => {
        statsPanel.classList.toggle('hidden');
        statsToggle.textContent = statsPanel.classList.contains('hidden') ? '📊 Stats' : '📊 Hide Stats';
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            filterProjects();
        });
    });
}

/**
 * Render categories and projects
 * @param {Array} categories - Array of category data
 */
function renderCategories(categories) {
    const container = document.getElementById('categoriesContainer');
    container.innerHTML = '';

    categories.forEach(category => {
        const categorySection = createCategorySection(category);
        container.appendChild(categorySection);
    });
}

/**
 * Render tag cloud
 * @param {Array} categories - Array of category data
 */
function renderTagCloud(categories) {
    const tagCounts = {};
    
    // Count tag occurrences
    categories.forEach(category => {
        category.items.forEach(project => {
            project.tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });
    });

    // Sort tags by frequency
    const sortedTags = Object.entries(tagCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 30); // Show top 30 tags

    const maxCount = Math.max(...Object.values(tagCounts));
    const tagContainer = document.getElementById('tagContainer');
    tagContainer.innerHTML = '';

    sortedTags.forEach(([tag, count]) => {
        const tagElement = createTagElement(tag, count, maxCount);
        tagContainer.appendChild(tagElement);
    });
}

/**
 * Calculate and render statistics
 * @param {Array} categories - Array of category data
 */
function renderStats(categories) {
    const stats = calculateStats(categories);
    updateStatsPanel(stats);
}

/**
 * Calculate statistics from data
 * @param {Array} categories - Array of category data
 * @returns {Object} Statistics object
 */
function calculateStats(categories) {
    let totalProjects = 0;
    let projectsWithLinks = 0;
    const categoryBreakdown = [];

    categories.forEach(category => {
        const categoryCount = category.items.length;
        totalProjects += categoryCount;
        
        category.items.forEach(project => {
            if (project.links && project.links.length > 0) {
                projectsWithLinks++;
            }
        });

        categoryBreakdown.push({
            name: category.name,
            count: categoryCount
        });
    });

    return {
        totalProjects,
        totalCategories: categories.length,
        projectsWithLinks,
        categoryBreakdown
    };
}

/**
 * Populate category filter dropdown
 * @param {Array} categories - Array of category data
 */
function populateCategoryFilter(categories) {
    const select = document.getElementById('categoryFilter');
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name.toLowerCase();
        option.textContent = category.name;
        select.appendChild(option);
    });
}

/**
 * Filter projects based on current filters
 */
function filterProjects() {
    const allProjects = document.querySelectorAll('.project-card');
    const allCategories = document.querySelectorAll('.category');
    
    let visibleCount = 0;

    allCategories.forEach(category => {
        const projects = category.querySelectorAll('.project-card');
        let categoryHasVisible = false;

        projects.forEach(project => {
            const projectName = project.getAttribute('data-project');
            const projectTags = project.getAttribute('data-tags');
            const projectText = project.textContent.toLowerCase();

            const matchesSearch = !currentSearch || 
                projectName.includes(currentSearch) || 
                projectTags.includes(currentSearch) ||
                projectText.includes(currentSearch);

            const matchesTag = !currentTag || 
                projectTags.includes(currentTag.toLowerCase());

            if (matchesSearch && matchesTag) {
                project.style.display = 'block';
                categoryHasVisible = true;
                visibleCount++;
            } else {
                project.style.display = 'none';
            }
        });

        // Show/hide category based on whether it has visible projects
        if (categoryHasVisible) {
            category.style.display = 'block';
        } else {
            category.style.display = 'none';
        }
    });

    // Update UI feedback
    updateFilterFeedback(visibleCount);
}

/**
 * Filter by category
 * @param {string} categoryName - Category to filter by
 */
function filterByCategory(categoryName) {
    const allCategories = document.querySelectorAll('.category');
    
    allCategories.forEach(category => {
        const categoryData = category.getAttribute('data-category');
        
        if (!categoryName || categoryData === categoryName) {
            category.style.display = 'block';
        } else {
            category.style.display = 'none';
        }
    });
}

/**
 * Filter by tag
 * @param {string} tag - Tag to filter by
 */
function filterByTag(tag) {
    currentTag = tag;
    filterProjects();
}

/**
 * Show all projects (reset filters)
 */
function showAllProjects() {
    currentTag = '';
    currentSearch = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    
    // Show all projects and categories
    document.querySelectorAll('.project-card').forEach(project => {
        project.style.display = 'block';
    });
    
    document.querySelectorAll('.category').forEach(category => {
        category.style.display = 'block';
    });

    updateFilterFeedback(document.querySelectorAll('.project-card').length);
}

/**
 * Update filter feedback in UI
 * @param {number} count - Number of visible projects
 */
function updateFilterFeedback(count) {
    // Could add a results counter here in the future
    console.log(`Showing ${count} projects`);
}

/**
 * Handle keyboard shortcuts
 */
document.addEventListener('keydown', (e) => {
    // ESC to clear filters
    if (e.key === 'Escape') {
        showAllProjects();
        document.querySelectorAll('.tag').forEach(tag => tag.classList.remove('active'));
    }
    
    // Ctrl+F or Cmd+F to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
});

/**
 * Performance optimization: Intersection Observer for lazy loading
 */
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Could implement lazy loading of project details here
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
}

/**
 * Error handling for network issues
 */
window.addEventListener('online', () => {
    if (!allData) {
        location.reload();
    }
});

window.addEventListener('offline', () => {
    console.warn('Application is offline. Some features may not work.');
});

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Set up intersection observer after initial render
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(setupIntersectionObserver, 1000);
});