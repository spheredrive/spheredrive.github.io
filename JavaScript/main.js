/**
 * ==========================================================================
 * SphereDrive Client Front-End Framework Core
 * Architectural setup prepared for seamless Supabase metadata queries
 * and direct asset streaming integrations via Cloudinary components.
 * ==========================================================================
 */

// --- DYNAMIC INFRASTRUCTURE ARCHITECTURE REFERENCE KEYS ---
const VAULT_CONFIG = {
    // Supabase Core Database Relational Configuration Anchors
    supabaseUrl: window.ENV?.SUPABASE_URL || 'https://sandbox-vault.supabase.co',
    supabaseAnonKey: window.ENV?.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder...',
    
    // Cloudinary Asset CDN Pipeline Optimization Targets
    cloudinaryCloudName: window.ENV?.CLOUDINARY_CLOUD_NAME || 'spheredrive-cdn-vault',
    cloudinaryUploadPreset: window.ENV?.CLOUDINARY_UPLOAD_PRESET || 'preset_lossless_direct'
};

// --- CLIENT STATE PERSISTENCE ENGINE ---
// Uses localStorage to let you toggle between guest and logged-in states easily during testing.
const SphereStore = {
    state: {
        isLoggedIn: localStorage.getItem('sd_session_active') === 'true'
    },
    setSession(status) {
        this.state.isLoggedIn = status;
        localStorage.setItem('sd_session_active', status ? 'true' : 'false');
    }
};

// --- MOCK DATA SEED FILES (Simulating Supabase Relational Output) ---
const mockSupabaseFiles = [
    {
        id: "7f-901a",
        name: "corporate_growth_matrix_2026",
        format: "pdf",
        type: "document",
        size: "2.4 MB",
        date: "2026-06-15",
        url: "#"
    },
    {
        id: "2b-44ef",
        name: "hero_background_optimized",
        format: "jpg",
        type: "image",
        size: "840 KB",
        date: "2026-07-02",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "9x-3321",
        name: "pipeline_automation_routine",
        format: "js",
        type: "code",
        size: "45 KB",
        date: "2026-05-29",
        url: "#"
    },
    {
        id: "4k-8820",
        name: "brand_sonic_signature",
        format: "mp3",
        type: "audio",
        size: "4.1 MB",
        date: "2026-04-12",
        url: "#"
    }
];

// --- APP CONTEXT INGESTION RUNTIME ---
class SphereDriveApp {
    constructor() {
        this.dynamicButton = document.getElementById('nav-dynamic-btn');
        this.logoLink = document.getElementById('logo-link');
    }

    init() {
        this.renderGlobalHeaderInterface();
        this.bindAuthenticationInterceptors();
        
        // Execute context-specific subsystem builders based on current layout endpoints
        const path = window.location.pathname;
        if (path.includes('dashboard.html')) {
            this.buildDashboardWorkspaceSubsystem();
        } else if (path.includes('file.html')) {
            this.buildFileInspectionPaneSubsystem();
        } else if (path.includes('pricing.html')) {
            this.initializePricingToggleSubsystem();
        }
    }

    /**
     * Intercepts navigation trees to render session states dynamically
     */
    renderGlobalHeaderInterface() {
        if (!this.dynamicButton || !this.logoLink) return;

        if (SphereStore.state.isLoggedIn) {
            this.dynamicButton.textContent = 'Upload Asset';
            this.dynamicButton.className = 'btn btn-primary';
            this.logoLink.setAttribute('href', 'dashboard.html');
        } else {
            this.dynamicButton.textContent = 'Login';
            this.dynamicButton.className = 'btn btn-secondary';
            this.logoLink.setAttribute('href', 'index.html');
        }
    }

    /**
     * Attaches structural events onto authentication simulation zones
     */
    bindAuthenticationInterceptors() {
        if (this.dynamicButton) {
            this.dynamicButton.addEventListener('click', (e) => {
                if (!SphereStore.state.isLoggedIn) {
                    e.preventDefault();
                    // Establish auth session validation sequence mock
                    SphereStore.setSession(true);
                    console.log("[Supabase Auth Initialization Engine]: Initializing JWT token mapping sequence...");
                    window.location.href = 'dashboard.html';
                } else {
                    // Trigger asset upload framework simulation targeting Cloudinary
                    this.triggerCloudinaryDirectIngest();
                }
            });
        }

        const logoutTrigger = document.getElementById('logout-trigger');
        if (logoutTrigger) {
            logoutTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                SphereStore.setSession(false);
                window.location.href = 'index.html';
            });
        }

        // Catch generic call-to-action blocks spread across marketing frames
        document.querySelectorAll('.auth-trigger-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (!SphereStore.state.isLoggedIn) {
                    SphereStore.setSession(true);
                    window.location.href = 'dashboard.html';
                } else {
                    window.location.href = 'dashboard.html';
                }
            });
        });
    }

    /**
     * Handles pricing period adjustment calculations
     */
    initializePricingToggleSubsystem() {
        const toggle = document.getElementById('pricing-toggle');
        const amounts = document.querySelectorAll('.price-display .amount');
        const monthlyLabel = document.getElementById('billing-monthly-label');
        const yearlyLabel = document.getElementById('billing-yearly-label');

        if (!toggle) return;

        toggle.addEventListener('change', () => {
            const isYearly = toggle.checked;
            
            if (isYearly) {
                monthlyLabel.classList.remove('active');
                yearlyLabel.classList.add('active');
            } else {
                monthlyLabel.classList.add('active');
                yearlyLabel.classList.remove('active');
            }

            amounts.forEach(amount => {
                const targetVal = isYearly ? amount.getAttribute('data-yearly') : amount.getAttribute('data-monthly');
                amount.textContent = targetVal;
            });
        });
    }

    /**
     * Assembles and builds user file lists inside dashboard storage grids
     */
    buildDashboardWorkspaceSubsystem() {
        // Enforce boundary redirect rule if user accesses dashboard while anonymous
        if (!SphereStore.state.isLoggedIn) {
            window.location.href = 'index.html';
            return;
        }

        const container = document.getElementById('file-grid-workspace');
        const loadingState = document.getElementById('dashboard-loading-state');
        const emptyState = document.getElementById('dashboard-empty-state');
        const searchInput = document.getElementById('dashboard-search');
        const sortFilter = document.getElementById('sort-filter');

        if (!container) return;

        // Simulate fast API roundtrip delay to make loading state visible
        loadingState.classList.remove('hidden');
        container.innerHTML = '';

        setTimeout(() => {
            loadingState.classList.add('hidden');
            this.renderFilteredFileWorkspace(mockSupabaseFiles, container, emptyState);

            // Bind filter matching logic
            const processFilters = () => {
                const query = searchInput.value.toLowerCase();
                const typeFilter = sortFilter.value;

                const processed = mockSupabaseFiles.filter(item => {
                    const matchesSearch = item.name.toLowerCase().includes(query);
                    const matchesType = typeFilter === 'all' || item.type === typeFilter;
                    return matchesSearch && matchesType;
                });

                this.renderFilteredFileWorkspace(processed, container, emptyState);
            };

            searchInput.addEventListener('input', processFilters);
            sortFilter.addEventListener('change', processFilters);

        }, 400);
    }

    /**
     * Renders filtered list data maps onto visual components cleanly
     */
    renderFilteredFileWorkspace(dataset, targetWrapper, emptyElement) {
        targetWrapper.innerHTML = '';
        
        if (dataset.length === 0) {
            emptyElement.classList.remove('hidden');
            return;
        }
        emptyElement.classList.add('hidden');

        dataset.forEach(file => {
            const card = document.createElement('a');
            card.className = 'file-card-interactive';
            card.setAttribute('href', `file.html?id=${file.id}`);

            let thumbnailContent = this.getFileFormatGlyphIcon(file.type);
            if (file.type === 'image' && file.url !== '#') {
                thumbnailContent = `<img src="${file.url}" alt="${file.name}">`;
            }

            card.innerHTML = `
                <div class="card-thumbnail-zone">
                    ${thumbnailContent}
                </div>
                <h4>${file.name}.${file.format}</h4>
                <div class="card-meta-line">
                    <span>${file.size}</span>
                    <span>${file.date}</span>
                </div>
            `;
            targetWrapper.appendChild(card);
        });
    }

    /**
     * Hydrates single item view panels using unique document URL ID keys
     */
    buildFileInspectionPaneSubsystem() {
        const params = new URLSearchParams(window.location.search);
        const objectId = params.get('id');

        const errorPane = document.getElementById('viewer-error');
        const contentPane = document.getElementById('viewer-content');

        if (!contentPane) return;

        const activeRecord = mockSupabaseFiles.find(item => item.id === objectId);

        if (!activeRecord) {
            errorPane.classList.remove('hidden');
            contentPane.classList.add('hidden');
            return;
        }

        // Hydrate UI metadata targets
        document.getElementById('meta-file-name').textContent = `${activeRecord.name}.${activeRecord.format}`;
        document.getElementById('meta-uuid').textContent = activeRecord.id;
        document.getElementById('meta-size').textContent = activeRecord.size;
        document.getElementById('meta-date').textContent = activeRecord.date;
        document.getElementById('meta-type-badge').textContent = `Sphere ${activeRecord.type} asset`;

        const previewZone = document.getElementById('preview-placeholder-zone');
        
        // Render previews conditionally based on format types
        if (activeRecord.type === 'image') {
            previewZone.innerHTML = `<img src="${activeRecord.url}" alt="Preview Context">`;
        } else {
            previewZone.innerHTML = this.getFileFormatGlyphIcon(activeRecord.type);
        }

        // Attach action click alert listeners
        document.getElementById('action-download-btn').onclick = () => alert(`[Cloudinary Ingestion Hook]: Fetching binary package payload stream matching key instance reference.`);
        document.getElementById('action-share-btn').onclick = () => alert(`Public security index URL snapshot copied successfully to operating system memory banks.`);
        document.getElementById('action-delete-btn').onclick = () => {
            alert(`[Supabase Remote Mutation]: Removing document matrix index registration key mapping matching node point ${activeRecord.id}.`);
            window.location.href = 'dashboard.html';
        };
    }

    /**
     * Resolves context icons corresponding to specific asset categories
     */
    getFileFormatGlyphIcon(type) {
        switch (type) {
            case 'image': return '<i class="fa-solid fa-image img-icon"></i>';
            case 'document': return '<i class="fa-solid fa-file-pdf pdf-icon"></i>';
            case 'code': return '<i class="fa-solid fa-file-code code-icon"></i>';
            case 'audio': return '<i class="fa-solid fa-file-audio text-accent"></i>';
            default: return '<i class="fa-solid fa-file-lines"></i>';
        }
    }

    /**
     * Triggers simulated Cloudinary direct ingestion processes
     */
    triggerCloudinaryDirectIngest() {
        alert(`[Cloudinary Direct Ingestion Stream Framework]: Initializing transfer pipelines using active preset reference configuration context: "${VAULT_CONFIG.cloudinaryUploadPreset}".`);
    }
}

// Ensure execution loop initializes gracefully when browser DOM completes mapping
document.addEventListener('DOMContentLoaded', () => {
    const app = new SphereDriveApp();
    app.init();
});
