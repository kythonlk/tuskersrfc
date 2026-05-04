import instaloader

def fetch_club_posts(username):
    L = instaloader.Instaloader()
    
    # Optional: Login if the account is private or to avoid rate limits
    # L.login("your_username", "your_password") 

    profile = instaloader.Profile.from_username(L.context, username)
    
    posts_data = []
    # Fetch the last 5 posts
    for count, post in enumerate(profile.get_posts()):
        if count >= 5: break
        
        posts_data.append({
            "url": post.url,
            "link": f"https://www.instagram.com/p/{post.shortcode}/",
            "caption": post.caption,
            "likes": post.likes
        })
    
    return posts_data

if __name__ == "__main__":
    club_posts = fetch_club_posts("dubaituskersrfc")
    for p in club_posts:
        print(f"Post: {p['link']} | Image: {p['url']}")