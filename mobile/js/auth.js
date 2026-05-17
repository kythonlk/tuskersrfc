const auth = {
    async signIn(email, password) {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    },

    async signUp(email, password, fullName, phone, avatarFile) {
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    mobile_primary: phone
                }
            }
        });
        if (error) throw error;
        
        let avatarUrl = null;
        if (avatarFile && data.user) {
            avatarUrl = await this.uploadAvatar(data.user.id, avatarFile);
        }

        // Create entry in memberships as pending approval (admin only creates members after approval)
        if (data.user) {
            const nameParts = fullName.trim().split(/\s+/);
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';

            const { error: profileError } = await supabaseClient
                .from('memberships')
                .insert({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone: phone,
                    avatar_url: avatarUrl,
                    status: 'pending',
                    membership_type: 'supporter' // default scheme for new mobile applicants
                });
            if (profileError) console.error('Pending membership registration error:', profileError);
        }
        
        return data;
    },

    async uploadAvatar(userId, file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}/${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabaseClient.storage
            .from('avatars')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabaseClient.storage
            .from('avatars')
            .getPublicUrl(filePath);

        return data.publicUrl;
    },

    async signOut() {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;
        app.showAuth();
    },

    async getCurrentUser() {
        const { data: { user } } = await supabaseClient.auth.getUser();
        return user;
    },

    async updateProfile(updates) {
        const user = await this.getCurrentUser();
        if (!user) throw new Error('No user logged in');

        const nameParts = (updates.full_name || '').trim().split(/\s+/);
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        const membershipsUpdates = {
            first_name: firstName,
            last_name: lastName,
            email: updates.email,
            phone: updates.mobile_primary,
            whatsapp: updates.mobile_secondary,
        };

        if (updates.avatar_url) {
            membershipsUpdates.avatar_url = updates.avatar_url;
        }

        // Try updating in memberships table
        const { data, error } = await supabaseClient
            .from('memberships')
            .update(membershipsUpdates)
            .eq('email', user.email);

        if (error) {
            // Check if user is in mob_members as fallback
            const { data: fbData, error: fbError } = await supabaseClient
                .from('mob_members')
                .update({
                    full_name: updates.full_name,
                    email: updates.email,
                    mobile_primary: updates.mobile_primary,
                    mobile_secondary: updates.mobile_secondary,
                    avatar_url: updates.avatar_url
                })
                .eq('id', user.id);
            if (fbError) throw fbError;
            return fbData;
        }
        return data;
    },

    async changePassword(newPassword) {
        const { data, error } = await supabaseClient.auth.updateUser({
            password: newPassword
        });
        if (error) throw error;
        return data;
    }
};
