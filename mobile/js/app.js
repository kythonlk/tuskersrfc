const app = {
    user: null,
    profile: null,

    async init() {
        this.user = await auth.getCurrentUser();
        if (this.user) {
            await this.loadProfile();
            this.showHome();
        } else {
            this.showAuth();
        }

        this.setupEventListeners();
        this.loadIGPosts();
        this.loadFixtures();
        this.loadSponsors();
        
        // Initialize Lucide
        lucide.createIcons();
    },

    setupEventListeners() {
        // Login Form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                try {
                    await auth.signIn(email, password);
                    this.user = await auth.getCurrentUser();
                    await this.loadProfile();
                    this.showHome();
                } catch (error) {
                    alert('Login failed: ' + error.message);
                }
            });
            // Sign Up Form
            const signupForm = document.getElementById('signup-form');
            const signupAvatarInput = document.getElementById('signup-avatar');
            
            if (signupAvatarInput) {
                signupAvatarInput.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (re) => {
                            document.getElementById('signup-avatar-preview').innerHTML = `<img src="${re.target.result}">`;
                        };
                        reader.readAsDataURL(file);
                    }
                });
            }

            if (signupForm) {
                signupForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const name = document.getElementById('signup-name').value;
                    const email = document.getElementById('signup-email').value;
                    const password = document.getElementById('signup-password').value;
                    const phone = document.getElementById('signup-phone').value;
                    const avatarFile = signupAvatarInput?.files[0];
                    
                    try {
                        await auth.signUp(email, password, name, phone, avatarFile);
                        alert('Registration successful! Please check your email for verification.');
                        this.showAuth('login');
                    } catch (error) {
                        alert('Registration failed: ' + error.message);
                    }
                });
            }

            // Profile Form
            const profileForm = document.getElementById('profile-form');
            const editAvatarInput = document.getElementById('edit-avatar');

            if (editAvatarInput) {
                editAvatarInput.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (re) => {
                            document.getElementById('edit-avatar-preview').innerHTML = `<img src="${re.target.result}">`;
                        };
                        reader.readAsDataURL(file);
                    }
                });
            }

            if (profileForm) {
                profileForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const updates = {
                        full_name: document.getElementById('edit-name').value,
                        email: document.getElementById('edit-email').value,
                        mobile_primary: document.getElementById('edit-phone1').value,
                        mobile_secondary: document.getElementById('edit-phone2').value,
                    };
                    
                    const avatarFile = editAvatarInput?.files[0];
                    
                    try {
                        if (avatarFile) {
                            updates.avatar_url = await auth.uploadAvatar(this.user.id, avatarFile);
                        }
                        await auth.updateProfile(updates);
                        alert('Profile updated!');
                        await this.loadProfile();
                        this.showSubView('membership-card');
                    } catch (error) {
                        alert('Update failed: ' + error.message);
                    }
                });
            }
        }
    },

    async loadProfile() {
        if (!this.user) return;
        const { data, error } = await supabaseClient
            .from('mob_members')
            .select('*')
            .eq('id', this.user.id)
            .single();

        if (data) {
            this.profile = data;
            this.updateProfileUI();
        }
    },

    updateProfileUI() {
        if (!this.profile) return;
        
        // 1. Update Profile Settings View
        document.getElementById('profile-name').textContent = this.profile.full_name;
        document.getElementById('member-id').textContent = this.profile.member_id || 'N/A';
        
        // 2. Update Digital Card View (Image 7)
        document.getElementById('card-name').textContent = this.profile.full_name.toUpperCase();
        document.getElementById('card-number').textContent = `TUSKER-${this.profile.member_id?.slice(-4) || '0001'}`;
        document.getElementById('card-expiry').textContent = this.profile.expiry_date ? 
            new Date(this.profile.expiry_date).toLocaleDateString() : 'LIFE MEMBER';

        // Update Avatars
        this.renderAvatar('header-avatar', this.profile.avatar_url, this.profile.full_name);
        this.renderAvatar('profile-avatar', this.profile.avatar_url, this.profile.full_name);
        this.renderAvatar('card-avatar', this.profile.avatar_url, this.profile.full_name);
        
        // 3. Generate QR Code
        const qrContainer = document.getElementById("qrcode");
        qrContainer.innerHTML = ""; // Clear previous
        new QRCode(qrContainer, {
            text: `https://dubaituskers.com/verify/${this.profile.member_id}`,
            width: 180,
            height: 180,
            colorDark : "#000033",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        
        // Fill edit form
        document.getElementById('edit-name').value = this.profile.full_name;
        document.getElementById('edit-email').value = this.profile.email;
        document.getElementById('edit-phone1').value = this.profile.mobile_primary || '';
        document.getElementById('edit-phone2').value = this.profile.mobile_secondary || '';
        if (this.profile.avatar_url) {
            document.getElementById('edit-avatar-preview').innerHTML = `<img src="${this.profile.avatar_url}">`;
        } else {
            this.renderAvatar('edit-avatar-preview', null, this.profile.full_name);
        }
    },

    async loadIGPosts() {
        try {
            const response = await fetch('ig/posts_data.json');
            const posts = await response.json();
            
            const container = document.getElementById('news-carousel');
            if (!container) return;
            
            if (!posts || posts.length === 0) {
                container.innerHTML = '<div class="loading">No posts available</div>';
                return;
            }
            
            container.innerHTML = posts.map(post => `
                <div class="news-card">
                    <div class="news-header">
                        <img src="../src/images/logo.webp" class="news-header-logo">
                        <div class="news-header-info">
                            <h4>Dubai Tuskers RFC</h4>
                            <span>Recent Post</span>
                        </div>
                    </div>
                    <img src="ig/${post.local_file}" class="news-image" onerror="this.src='../src/images/logo-full.webp'">
                    <div class="news-content">
                        <p>${post.caption}</p>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading IG posts:', error);
            const container = document.getElementById('news-carousel');
            if (container) container.innerHTML = '<div class="loading">Failed to load social feed</div>';
        }
    },

    renderAvatar(containerId, url, name) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (url) {
            container.innerHTML = `<img src="${url}" alt="${name}">`;
        } else {
            const initial = name ? name.charAt(0).toUpperCase() : '?';
            container.innerHTML = `<span class="avatar-initials">${initial}</span>`;
        }
    },

    async loadFixtures() {
        const { data: upcoming } = await supabaseClient
            .from('mob_fixtures')
            .select('*')
            .eq('is_past', false)
            .order('match_date', { ascending: true });

        const { data: past } = await supabaseClient
            .from('mob_fixtures')
            .select('*')
            .eq('is_past', true)
            .order('match_date', { ascending: false });

        this.renderFixtures('upcoming-carousel', upcoming);
        this.renderFixtures('past-carousel', past);
    },

    renderFixtures(containerId, fixtures) {
        const container = document.getElementById(containerId);
        if (!container) return;
        if (!fixtures || fixtures.length === 0) {
            container.innerHTML = '<div class="no-data">No fixtures found</div>';
            return;
        }

        container.innerHTML = fixtures.map(f => `
            <div class="fixture-card">
                <div class="teams">
                    <div class="team">
                        <img src="${f.logo_a || '../src/images/logo.webp'}" class="team-logo">
                        <p>${f.team_a}</p>
                    </div>
                    <div class="vs">VS</div>
                    <div class="team">
                        <img src="${f.logo_b || '../src/images/logo.webp'}" class="team-logo">
                        <p>${f.team_b}</p>
                    </div>
                </div>
                <div class="score">${f.is_past ? `${f.score_a} - ${f.score_b}` : 'VS'}</div>
                <div class="match-info">
                    <p>📅 ${new Date(f.match_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p>📍 ${f.venue}</p>
                    <p>${f.match_type}</p>
                </div>
            </div>
        `).join('');
    },

    async loadSponsors() {
        const { data } = await supabaseClient
            .from('mob_sponsors')
            .select('*')
            .order('order_index', { ascending: true });

        const container = document.getElementById('sponsors-grid');
        const cardContainer = document.getElementById('card-sponsors-grid');
        
        if (!container && !cardContainer) return;

        const html = (!data || data.length === 0) ? `
            <div class="sponsor-card"><img src="../src/images/lion.webp"></div>
            <div class="sponsor-card"><img src="../src/images/diddeniya.webp"></div>
        ` : data.map(s => `
            <div class="sponsor-card">
                <img src="${s.logo_url}" alt="${s.name}">
            </div>
        `).join('');

        if (container) container.innerHTML = html;
        if (cardContainer) cardContainer.innerHTML = html;
    },

    showAuth(mode = 'login') {
        if (mode === 'login') {
            document.getElementById('view-auth').classList.remove('hidden');
            document.getElementById('view-signup').classList.add('hidden');
        } else {
            document.getElementById('view-auth').classList.add('hidden');
            document.getElementById('view-signup').classList.remove('hidden');
        }
        document.getElementById('view-main').classList.add('hidden');
    },

    showHome() {
        document.getElementById('view-auth').classList.add('hidden');
        document.getElementById('view-signup').classList.add('hidden');
        document.getElementById('view-main').classList.remove('hidden');
        this.showSubView('home');
    },

    showSubView(viewId) {
        // Hide all sub-views
        document.querySelectorAll('.sub-view').forEach(v => v.classList.add('hidden'));
        // Show target sub-view
        document.getElementById('content-' + viewId).classList.remove('hidden');

        // Update nav active state
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.classList.remove('active');
            // Check if the button's onclick contains the viewId
            if (btn.getAttribute('onclick')?.includes(`'${viewId}'`)) {
                btn.classList.add('active');
            }
        });

        // Re-initialize icons for the new view
        lucide.createIcons();
    }
};

// Initialize App
app.init();
