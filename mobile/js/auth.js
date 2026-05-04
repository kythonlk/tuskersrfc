
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

        // Create entry in mob_members
        if (data.user) {
            const { error: profileError } = await supabaseClient
                .from('mob_members')
                .insert({
                    id: data.user.id,
                    full_name: fullName,
                    email: email,
                    mobile_primary: phone,
                    avatar_url: avatarUrl,
                    member_id: Math.floor(100000000 + Math.random() * 900000000).toString()
                });
            if (profileError) console.error('Profile creation error:', profileError);
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

        const { data, error } = await supabaseClient
            .from('mob_members')
            .update(updates)
            .eq('id', user.id);

        if (error) throw error;
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
