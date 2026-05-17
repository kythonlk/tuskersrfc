const app = {
    user: null,
    profile: null,
    cart: [],
    products: [],

    async init() {
        this.user = await auth.getCurrentUser();
        if (this.user) {
            await this.loadProfile();
            this.showHome();
        } else {
            this.profile = null;
            this.updateProfileUI(); // Clear UI for guest
            this.showAuth();
        }

        this.setupEventListeners();
        this.loadIGPosts();
        this.loadFixtures();
        this.loadSponsors();
        this.loadNotifications();
        this.loadProducts();

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
        
        // Fetch from memberships (the unified single table for all)
        const { data, error } = await supabaseClient
            .from('memberships')
            .select('*')
            .eq('email', this.user.email)
            .single();

        if (data) {
            this.profile = {
                ...data,
                full_name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                mobile_primary: data.phone || '',
                mobile_secondary: data.whatsapp || '',
                avatar_url: data.avatar_url || (data.passport_photo ? (data.passport_photo.startsWith('data:') ? data.passport_photo : `data:image/jpeg;base64,${data.passport_photo}`) : null)
            };
            this.updateProfileUI();
        } else {
            // Fallback to mob_members
            const { data: fbData } = await supabaseClient
                .from('mob_members')
                .select('*')
                .eq('id', this.user.id)
                .single();

            if (fbData) {
                this.profile = fbData;
                this.updateProfileUI();
            }
        }
    },

    updateProfileUI() {
        const isActive = this.profile && (this.profile.status === 'active' || this.profile.status === 'ACTIVE');

        // 1. Update Profile Settings View
        document.getElementById('profile-name').textContent = this.profile?.full_name || 'GUEST USER';
        document.getElementById('member-id').textContent = this.profile?.member_id || '--------';

        // Update status in the profile settings
        const statusEl = document.querySelector('.status-active');
        if (statusEl) {
            if (isActive) {
                statusEl.textContent = 'ACTIVE';
                statusEl.className = 'status-active';
            } else if (this.profile) {
                statusEl.textContent = (this.profile.status || 'PENDING').toUpperCase();
                statusEl.className = 'status-active text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded font-bold';
            } else {
                statusEl.textContent = 'INACTIVE';
                statusEl.className = 'status-active text-gray-500';
            }
        }

        // 2. Update Digital Card View
        document.getElementById('card-name').textContent = (this.profile?.full_name || 'GUEST USER').toUpperCase();
        document.getElementById('card-number').textContent = this.profile?.member_id ? `TUSKER-${this.profile.member_id}` : 'PENDING';
        document.getElementById('card-expiry').textContent = this.profile?.expiry_date ?
            new Date(this.profile.expiry_date).toLocaleDateString() : (isActive ? 'LIFE MEMBER' : 'PENDING APPROVAL');

        // Update Avatars
        this.renderAvatar('header-avatar', this.profile?.avatar_url, this.profile?.full_name || 'G');
        this.renderAvatar('profile-avatar', this.profile?.avatar_url, this.profile?.full_name || 'G');
        this.renderAvatar('card-avatar', this.profile?.avatar_url, this.profile?.full_name || 'G');

        // 3. Generate QR Code (only for active members with valid member_id)
        const qrContainer = document.getElementById("qrcode");
        qrContainer.innerHTML = "";
        if (isActive && this.profile?.member_id) {
            new QRCode(qrContainer, {
                text: `https://dubaituskers.com/verify/${this.profile.member_id}`,
                width: 180,
                height: 180,
                colorDark: "#000033",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        } else if (this.profile) {
            qrContainer.innerHTML = `
                <div class="no-qr text-center p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20" style="max-width: 250px; margin: 0.5rem auto;">
                    <p style="color: #f5a623; font-weight: bold; margin-bottom: 0.25rem; font-size: 14px; font-family: 'Rajdhani', sans-serif;">MEMBERSHIP PENDING APPROVAL</p>
                    <span style="color: #888; font-size: 11px; font-family: 'Rajdhani', sans-serif; display: block; line-height: 1.3;">Your registration is currently pending admin approval. Your digital QR card will activate once approved.</span>
                </div>
            `;
        } else {
            qrContainer.innerHTML = '<div class="no-qr">Sign in to view QR</div>';
        }

        // Fill edit form
        document.getElementById('edit-name').value = this.profile?.full_name || '';
        document.getElementById('edit-email').value = this.profile?.email || '';
        document.getElementById('edit-phone1').value = this.profile?.mobile_primary || '';
        document.getElementById('edit-phone2').value = this.profile?.mobile_secondary || '';
        if (this.profile?.avatar_url) {
            document.getElementById('edit-avatar-preview').innerHTML = `<img src="${this.profile.avatar_url}">`;
        } else {
            this.renderAvatar('edit-avatar-preview', null, this.profile?.full_name || 'G');
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
                        <img src="assets/logo.webp" class="news-header-logo">
                        <div class="news-header-info">
                            <h4>Dubai Tuskers RFC</h4>
                            <span>Recent Post</span>
                        </div>
                    </div>
                    <img src="ig/${post.local_file}" class="news-image" onerror="this.src='assets/logo-full.webp'">
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
            .from('fixtures')
            .select('*')
            .neq('status', 'completed')
            .order('match_date', { ascending: true });

        const { data: past } = await supabaseClient
            .from('fixtures')
            .select('*')
            .eq('status', 'completed')
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
                        <img src="${f.home_team_logo || 'assets/logo.webp'}" class="team-logo">
                        <p>${f.home_team}</p>
                    </div>
                    <div class="vs">VS</div>
                    <div class="team">
                        <img src="${f.away_team_logo || 'assets/logo.webp'}" class="team-logo">
                        <p>${f.away_team}</p>
                    </div>
                </div>
                <div class="score">${f.status === 'completed' ? `${f.home_score} - ${f.away_score}` : 'VS'}</div>
                <div class="match-info">
                    <p>📅 ${new Date(f.match_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p>📍 ${f.venue}</p>
                    <p>${f.competition}</p>
                </div>
            </div>
        `).join('');
    },

    async loadSponsors() {
        const { data } = await supabaseClient
            .from('sponsors')
            .select('*')
            .order('display_order', { ascending: true });

        const container = document.getElementById('sponsors-grid');
        const cardContainer = document.getElementById('card-sponsors-grid');

        if (!container && !cardContainer) return;

        // Hardcoded list matching website's Footer.tsx
        const hardcodedSponsors = [
            { name: 'ReHabME', logo_url: 'assets/rehab.jpeg' },
            { name: 'Diddeniya', logo_url: 'assets/diddeniya.webp' },
            { name: 'Spiderplus', logo_url: 'assets/spiderplus.webp' },
            { name: 'Thambapanni', logo_url: 'assets/thambapanni.webp' },
            { name: 'Fazaa', logo_url: 'assets/fazaa.webp' },
            { name: 'Gulf Sports', logo_url: 'assets/gulf.jpeg' },
            { name: 'McGettigan\'s', logo_url: 'assets/mcs.webp' },
        ];

        // Use database data if available, otherwise use hardcoded list
        const displayData = (data && data.length > 0) ? data : hardcodedSponsors;

        const html = displayData.map(s => `
            <div class="sponsor-card">
                <img src="${s.logo_url}" alt="${s.name}">
            </div>
        `).join('');

        if (container) container.innerHTML = html;
        if (cardContainer) cardContainer.innerHTML = html;
    },

    async loadNotifications() {
        const { data, error } = await supabaseClient
            .from('notifications')
            .select('*')
            .order('created_at', { ascending: false });

        const container = document.querySelector('.notifications-list');
        if (!container) return;

        if (error || !data || data.length === 0) {
            // Mock data if table doesn't exist yet
            const mockNotifs = [
                { id: 1, title: 'Match Update', content: 'Fixture confirmed for Nov 30th.', time: '2h ago', icon: 'trophy', unread: true },
                { id: 2, title: 'New Kit', content: '2026 Home Jersey in stock!', time: '5h ago', icon: 'shopping-bag', unread: true }
            ];
            this.renderNotifications(container, mockNotifs);
            document.getElementById('notif-count').textContent = '2';
        } else {
            this.renderNotifications(container, data);
            document.getElementById('notif-count').textContent = data.filter(n => !n.is_read).length.toString();
        }
    },

    renderNotifications(container, notifications) {
        container.innerHTML = notifications.map(n => `
            <div class="notification-item ${n.unread || !n.is_read ? 'unread' : ''}">
                <div class="notification-icon">
                    <i data-lucide="${n.icon || 'bell'}"></i>
                </div>
                <div class="notification-content">
                    <h4>${n.title}</h4>
                    <p>${n.content}</p>
                    <span class="notification-time">${n.time || this.formatTime(n.created_at)}</span>
                </div>
            </div>
        `).join('');
        lucide.createIcons();
    },

    async loadProducts() {
        const { data, error } = await supabaseClient
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        const container = document.getElementById('product-grid');
        if (!container) return;

        if (error || !data || data.length === 0) {
            // Mock products if table doesn't exist
            this.products = [
                { id: 'p1', name: '2026 Home Jersey', price: 250, image_url: 'assets/15s.webp', tag: 'NEW' },
                { id: 'p2', name: '7s Tournament Kit', price: 180, image_url: 'assets/7s.webp' }
            ];
        } else {
            this.products = data;
        }

        container.innerHTML = this.products.map(p => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${p.image_url}" alt="${p.name}">
                    ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}
                </div>
                <div class="product-info">
                    <h4>${p.name}</h4>
                    <p class="product-price">AED ${Number(p.price).toFixed(2)}</p>
                    <button class="btn-add-cart" onclick="app.addToCart('${p.id}')">
                        <i data-lucide="plus"></i>
                    </button>
                </div>
            </div>
        `).join('');
        lucide.createIcons();
    },

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            this.cart.push({ ...product, cartId: Date.now() });
            this.updateCartUI();

            // Simple toast/alert
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = `${product.name} added to cart!`;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
        }
    },

    removeFromCart(cartId) {
        this.cart = this.cart.filter(item => item.cartId !== cartId);
        this.updateCartUI();
    },

    updateCartUI() {
        const count = this.cart.length;
        const badge = document.getElementById('cart-count');
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';

        this.renderCart();
    },

    renderCart() {
        const container = document.getElementById('cart-items');
        const summary = document.getElementById('cart-summary');
        if (!container) return;

        if (this.cart.length === 0) {
            container.innerHTML = '<div class="no-data">Your cart is empty</div>';
            if (summary) summary.style.display = 'none';
            return;
        }

        if (summary) summary.style.display = 'block';

        let total = 0;
        container.innerHTML = this.cart.map(item => {
            total += Number(item.price);
            return `
                <div class="cart-item">
                    <img src="${item.image_url}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>AED ${Number(item.price).toFixed(2)}</p>
                    </div>
                    <button class="remove-btn" onclick="app.removeFromCart(${item.cartId})">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            `;
        }).join('');

        document.getElementById('cart-total-amount').textContent = `AED ${total.toFixed(2)}`;
        lucide.createIcons();
    },

    formatTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000 / 60); // minutes
        if (diff < 60) return `${diff}m ago`;
        if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
        return date.toLocaleDateString();
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
