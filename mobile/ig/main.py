import json
import os
import requests
from bs4 import BeautifulSoup

# The HTML snippet provided (shortened for the script, but assumes you've saved your input as 'ig_data.html')
# If you have it as a string, replace open() with the string variable.
html_data = """<div style="display: flex; flex-direction: column; padding-bottom: 0px; padding-top: 0px; position: relative;"><div class="_ac7v x1ty9z65 xzboxd6"><div class="x1lliihq x1n2onr6 xh8yej3 x4gyw5p x14z9mp xhe4ym4 xaudc5v x1j53mea"><a class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz" href="https://applink.instagram.com/dubaituskersrfc?ig_mid=CA4646CC-5F1F-419B-AFBE-4D1F00152861&amp;utm_source=igweb&amp;fall_back_to_web=false" role="link" tabindex="0"><div class="_aagu"><div class="_aagv" style="padding-bottom: 133.333%;"><img alt="Ready to level up your rugby game? 🐘🔥

The Tusker family is growing — and YOU can be part of it!
2026 memberships are officially OPEN.

From competitive play to unforgettable moments off the field, this is more than a club… it’s a community.

Join today 👉 www.dubaituskers.com/membership
Let’s run it together 💪🏉

#DubaiTuskers #RugbyLife #JoinTheTeam #DubaiRugby #RugbyFamily #PlayRugby #RugbyUAE #TeamSpirit #RugbyCommunity #DubaiSports 
#oneteam #onedream #onefamily" class="x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3" crossorigin="anonymous" src="https://instagram.ffjr1-5.fna.fbcdn.net/v/t39.30808-6/680510767_122174445182910375_5007402513288617048_n.jpg?stp=dst-jpg_e35_p240x240_tt6&amp;_nc_cat=100&amp;ig_cache_key=Mzg4MzgxODQ3MTAzMzU5MDExMA%3D%3D.3-ccb7-5&amp;ccb=7-5&amp;_nc_sid=58cdad&amp;efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&amp;_nc_ohc=uH_BJcvZ1YYQ7kNvwGtaGUw&amp;_nc_oc=Adq6bbBP-pE_lR1F7gG1YgWATcUtFYvmc38osFotBfHveZkz5WElg7_SyH_DPbeJK80&amp;_nc_zt=23&amp;_nc_ht=instagram.ffjr1-5.fna&amp;_nc_gid=CfucICm1xS-PxUeX4kfamw&amp;_nc_ss=7b689&amp;oh=00_Af56DsHCNirDGw9mgHBu76SZh5KgrSNb9c2mt9--oM0efg&amp;oe=69FE328F" style="object-fit: cover;"></div><div class="x1ey2m1c xtijo5x x1o0tod x10l6tqk x13vifvy"></div></div><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"></div></a></div><div class="x1lliihq x1n2onr6 xh8yej3 x4gyw5p x14z9mp xhe4ym4 xaudc5v x1j53mea"><a class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz" href="https://applink.instagram.com/dubaituskersrfc?ig_mid=CA4646CC-5F1F-419B-AFBE-4D1F00152861&amp;utm_source=igweb&amp;fall_back_to_web=false" role="link" tabindex="0"><div class="_aagu"><div class="_aagv" style="padding-bottom: 133.333%;"><img alt="We train like champions, we play like family. 🏉
Join the movement Touch Rugby with Dubai Tuskers.

#DubaiTuskers #TouchRugby #RugbyFamily #OneTeamOneDream #RugbyLife #TrainHardPlayHard #Brotherhood #DubaiSports #RugbyPassion #TuskersUnited  #oneteam #onedream #onefamily" class="x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3" crossorigin="anonymous" src="https://instagram.ffjr1-4.fna.fbcdn.net/v/t51.82787-15/682360272_17885445417516154_1767621121714322419_n.jpg?stp=dst-jpg_e15_p240x240_tt6&amp;_nc_cat=107&amp;ig_cache_key=Mzg3OTU1NTI1ODE5MTk3NDE4ODE3ODg1NDQ1NDIwNTE2MTU0.3-ccb7-5&amp;ccb=7-5&amp;_nc_sid=58cdad&amp;efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjcyMHgxMjgwLnNkci5DMyJ9&amp;_nc_ohc=eaumAk9xa5sQ7kNvwHM99PK&amp;_nc_oc=AdozIBo95fnh2nSc8_EO0kIdeRIjGz3ezBUDOyEinneKJtj7hn_n2x6KoFVaD3GOEz8&amp;_nc_zt=23&amp;_nc_ht=instagram.ffjr1-4.fna&amp;_nc_gid=CfucICm1xS-PxUeX4kfamw&amp;_nc_ss=7b689&amp;oh=00_Af4TA0ds0y-X_Aq3yyb438gW0YSM5CbcQwSE6e941ogpdw&amp;oe=69FE1A18" style="object-fit: cover;"></div><div class="x1ey2m1c xtijo5x x1o0tod x10l6tqk x13vifvy"></div></div><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"><div class="x972fbf x10w94by x1qhh985 x14e42zd x1ey2m1c x9f619 x78zum5 xdt5ytf x2lah0s xln7xf2 xk390pu xtijo5x x1o0tod xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x47corl x10l6tqk x13vifvy x11njtxf x6s0dn4 xl56j7k"><div class="html-div xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1xmf6yo x1xegmmw x1e56ztr x13fj5qh x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"><svg aria-label="Video" class="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Video</title><path d="M5.888 22.5a3.46 3.46 0 0 1-1.721-.46l-.003-.002a3.451 3.451 0 0 1-1.72-2.982V4.943a3.445 3.445 0 0 1 5.163-2.987l12.226 7.059a3.444 3.444 0 0 1-.001 5.967l-12.22 7.056a3.462 3.462 0 0 1-1.724.462Z"></path></svg></div></div></div></a></div><div class="x1lliihq x1n2onr6 xh8yej3 x4gyw5p x14z9mp xhe4ym4 xaudc5v x1j53mea"><a class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz" href="https://applink.instagram.com/dubaituskersrfc?ig_mid=CA4646CC-5F1F-419B-AFBE-4D1F00152861&amp;utm_source=igweb&amp;fall_back_to_web=false" role="link" tabindex="0"><div class="_aagu"><div class="_aagv" style="padding-bottom: 133.333%;"><img alt="**الإمارات ليست مجرد دولة… بل هي شعور بالفخر، وتاريخ من الإنجازات، وروح متجذرة في الأصالة 🇦🇪
أرضٌ تمنح أكثر مما يُتوقّع، وشعبها يجسّد الكرم، وروحها عنوان العظمة.
حفظ الله الإمارات وباركها بالأمن والقوة والعزة الدائمة.
ودامت دولة الإمارات آمنةً، قويةً، ومليئةً بالفخر.**

The UAE is more than a country… it is a feeling of pride, a history of achievements, and a soul built on authenticity 🇦🇪 
A land that gives beyond expectations, whose people reflect kindness and whose spirit stands for greatness. 

May Allah protect the Emirates and bless it with peace, strength, and lasting honor.May the UAE always remain safe, strong, and full of pride." class="x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3" crossorigin="anonymous" src="https://instagram.ffjr1-4.fna.fbcdn.net/v/t39.30808-6/670627581_122172133664910375_3890584637948194225_n.jpg?stp=dst-jpg_e35_p240x240_tt6&amp;_nc_cat=106&amp;ig_cache_key=Mzg3Mjg4OTAzNjEyMTk4NTUyNA%3D%3D.3-ccb7-5&amp;ccb=7-5&amp;_nc_sid=58cdad&amp;efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjExNTJ4MTQ0MC5zZHIuQzMifQ%3D%3D&amp;_nc_ohc=0Ve1D9DX91UQ7kNvwFvvHHT&amp;_nc_oc=AdqGL_C0AsVQOCw7UhQ1lNyIhFbJZaqRBw-1zAfIN73Q8IsIKR_9YzE0yvNsT3VPQw4&amp;_nc_zt=23&amp;_nc_ht=instagram.ffjr1-4.fna&amp;_nc_gid=CfucICm1xS-PxUeX4kfamw&amp;_nc_ss=7b689&amp;oh=00_Af5EGl9Kx0htYHZh18xUe_1nmNkNnB04Nd_AAO0U3mvNIQ&amp;oe=69FE3DFD" style="object-fit: cover;"></div><div class="x1ey2m1c xtijo5x x1o0tod x10l6tqk x13vifvy"></div></div><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"></div></a></div></div><div class="_ac7v x1ty9z65 xzboxd6"><div class="x1lliihq x1n2onr6 xh8yej3 x4gyw5p x14z9mp xhe4ym4 xaudc5v x1j53mea"><a class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz" href="https://applink.instagram.com/dubaituskersrfc?ig_mid=CA4646CC-5F1F-419B-AFBE-4D1F00152861&amp;utm_source=igweb&amp;fall_back_to_web=false" role="link" tabindex="0"><div class="_aagu"><div class="_aagv" style="padding-bottom: 133.333%;"><img alt="In moments of challenge, unity makes us stronger. 🇦🇪
We stand with the UAE—honoring the leadership, government, and brave armed forces who protect and uplift this nation every day.

Proud to call this home. Today and always.

With the UAE, today and forever. ❤️🤍💚🖤

#UAE #UnitedWeStand #ProudToBeUAE #DubaiTuskers #Respect Strength Unity AlwaysTogether" class="x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3" crossorigin="anonymous" src="https://instagram.ffjr1-6.fna.fbcdn.net/v/t51.82787-15/654165426_17879314068516154_4061737280613966203_n.jpg?stp=dst-jpg_e35_s320x320_tt6&amp;_nc_cat=104&amp;ig_cache_key=Mzg1Njk2ODQwMTMyNzg1Mjk5Ng%3D%3D.3-ccb7-5&amp;ccb=7-5&amp;_nc_sid=58cdad&amp;efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5zZHIuQzMifQ%3D%3D&amp;_nc_ohc=MYz1lIasO4sQ7kNvwFf6-_z&amp;_nc_oc=AdpzUmlPYbGtTUZc-jHXWI0Jn4AUkoI-cWugAshBoHiXYH5rB-ZtKfxRA5EYjnCZFgU&amp;_nc_zt=23&amp;_nc_ht=instagram.ffjr1-6.fna&amp;_nc_gid=CfucICm1xS-PxUeX4kfamw&amp;_nc_ss=7b689&amp;oh=00_Af4U-gYJnz841YzgpmWPa53r-JkJKQi1XST-pPH2bQLLYg&amp;oe=69FE3DFF" style="object-fit: cover;"></div><div class="x1ey2m1c xtijo5x x1o0tod x10l6tqk x13vifvy"></div></div><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"></div></a></div><div class="x1lliihq x1n2onr6 xh8yej3 x4gyw5p x14z9mp xhe4ym4 xaudc5v x1j53mea"><a class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz" href="https://applink.instagram.com/dubaituskersrfc?ig_mid=CA4646CC-5F1F-419B-AFBE-4D1F00152861&amp;utm_source=igweb&amp;fall_back_to_web=false" role="link" tabindex="0"><div class="_aagu"><div class="_aagv" style="padding-bottom: 133.333%;"><img alt="Wishing you a blessed and joyful Eid Mubarak filled with happiness, peace, and prosperity. May this special occasion bring unity, strength, and success to you and your loved ones—on and off the field. 🤍🏉

#EidMubarak #DubaiTuskers #RugbyFamily #BlessedMoments #TeamSpirit #celebratetogether  #oneteam #onedream #onefamily" class="x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3" crossorigin="anonymous" src="https://instagram.ffjr1-4.fna.fbcdn.net/v/t39.30808-6/652903960_122168589992910375_2424808095038382676_n.jpg?stp=dst-jpg_e35_p240x240_tt6&amp;_nc_cat=107&amp;ig_cache_key=Mzg1NjM4NTE3NjkzMTUyODE3Mw%3D%3D.3-ccb7-5&amp;ccb=7-5&amp;_nc_sid=58cdad&amp;efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjk2MHgxMjAwLnNkci5DMyJ9&amp;_nc_ohc=DQ2jQyEYHZcQ7kNvwGSV_iw&amp;_nc_oc=Adruh2iXzldI7fpn4C0UtapYzZKzu6LxufUo_ZUwyqeEjOfE4zGxtY_hgEzfQfqGYlI&amp;_nc_zt=23&amp;_nc_ht=instagram.ffjr1-4.fna&amp;_nc_gid=CfucICm1xS-PxUeX4kfamw&amp;_nc_ss=7b689&amp;oh=00_Af7QgdxiDo2T2aSscNKEwyVUYjkQTZC3q5tSCTBnm9oKOQ&amp;oe=69FE10BF" style="object-fit: cover;"></div><div class="x1ey2m1c xtijo5x x1o0tod x10l6tqk x13vifvy"></div></div><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"></div></a></div><div class="x1lliihq x1n2onr6 xh8yej3 x4gyw5p x14z9mp xhe4ym4 xaudc5v x1j53mea"><a class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz" href="https://applink.instagram.com/dubaituskersrfc?ig_mid=CA4646CC-5F1F-419B-AFBE-4D1F00152861&amp;utm_source=igweb&amp;fall_back_to_web=false" role="link" tabindex="0"><div class="_aagu"><div class="_aagv" style="padding-bottom: 133.333%;"><img alt="The Pre Rugby Season with the Dubai Tuskers RFC is here! Every Tuesday &amp; Thursday evening, we’re bringing the community together for fast, fun, and social rugby.

⏰ Time: 7:30 PM – 9:30 PM 
📆 Day: Every Tuesday &amp; Thursday
📍 Zabeel Park
📱 +971 52 132 9719

Whether you’re a seasoned player or just want to enjoy the game, everyone is welcome. Come down, get involved, meet great people, and enjoy the spirit of rugby with the Tuskers family. 💛

Let’s run, pass, and have some fun — see you on the field!

#DubaiTuskers #TouchRugby #DubaiRugby #RugbyCommunity #ThursdayRugby #DubaiSports #RugbyLife #TuskersFamily  #oneteam #onedream #onefamily" class="x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3" crossorigin="anonymous" src="https://instagram.ffjr1-2.fna.fbcdn.net/v/t39.30808-6/650235666_122167561640910375_5182339135153488917_n.jpg?stp=c0.0.1439.1080a_cp6_dst-jpg_e35_s240x240_tt6&amp;_nc_cat=110&amp;ig_cache_key=Mzg1MTgyMDM5OTQzNzIxMjUxNA%3D%3D.3-ccb7-5&amp;ccb=7-5&amp;_nc_sid=58cdad&amp;efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTA4MC5zZHIuQzMifQ%3D%3D&amp;_nc_ohc=FqyPWJfyY1gQ7kNvwG-2a9a&amp;_nc_oc=AdrsOZ7FnxPDcMTEumfaej9KLZYlDEHVoAyoD0wQxnT78MZXRvsVUPQL4eSSd8D4GC0&amp;_nc_zt=23&amp;_nc_ht=instagram.ffjr1-2.fna&amp;_nc_gid=CfucICm1xS-PxUeX4kfamw&amp;_nc_ss=7b689&amp;oh=00_Af5iT7aKMCpi8LBnV_Pm6iE3-hOqmk1Wk-YC7_5Dk63NRg&amp;oe=69FE1613" style="object-fit: cover;"></div><div class="x1ey2m1c xtijo5x x1o0tod x10l6tqk x13vifvy"></div></div><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"><div class="xuk3077 x972fbf x10w94by x1qhh985 x14e42zd x1ey2m1c x9f619 x78zum5 xdt5ytf x2lah0s xln7xf2 xk390pu xtijo5x x1o0tod x1nhvcw1 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x47corl x10l6tqk x13vifvy x11njtxf"><div class="html-div xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1xmf6yo x1xegmmw x1e56ztr x13fj5qh x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"><svg aria-label="Carousel" class="x1lliihq x1n2onr6 x9bdzbf" fill="currentColor" height="20" role="img" viewBox="0 0 48 48" width="20"><title>Carousel</title><path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"></path></svg></div></div></div></a></div></div><div class="_ac7v x1ty9z65 xzboxd6"><div class="x1lliihq x1n2onr6 xh8yej3 x4gyw5p x14z9mp xhe4ym4 xaudc5v x1j53mea"><a class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz" href="https://applink.instagram.com/dubaituskersrfc?ig_mid=CA4646CC-5F1F-419B-AFBE-4D1F00152861&amp;utm_source=igweb&amp;fall_back_to_web=false" role="link" tabindex="0"><div class="_aagu"><div class="_aagv" style="padding-bottom: 133.333%;"><img alt="Standing with pride under the flag we call home. 🇦🇪
At Dubai Tuskers RFC, rugby is more than a game — it’s about unity, respect, and love for the country that brings us all together.

“O Allah, make this country safe.”
A prayer for peace, strength, and prosperity for the United Arab Emirates.

Proud to play. Proud to belong. Proud to stand for this nation. 🐘🏉

Hashtags:

#DubaiTuskers #UAERugby #ProudToPlay #UAEPride #RugbyFamily #DubaiSports #TuskersRFC #RugbyLife #UAE #OneTeamOneDream #SportsUnity #RespectTheGame #RugbyCommunity  #oneteam #onedream #onefamily" class="x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3" crossorigin="anonymous" src="https://instagram.ffjr1-1.fna.fbcdn.net/v/t39.30808-6/650247342_122167424642910375_8986900342493345729_n.jpg?stp=dst-jpg_e35_p240x240_tt6&amp;_nc_cat=105&amp;ig_cache_key=Mzg1MTE5MTE1NjM2Mjc3MjIxOQ%3D%3D.3-ccb7-5&amp;ccb=7-5&amp;_nc_sid=58cdad&amp;efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjExNTJ4MTQ0MC5zZHIuQzMifQ%3D%3D&amp;_nc_ohc=FO4MViiV4hYQ7kNvwFlKsAt&amp;_nc_oc=AdpFRWg_9DthfEEdo3RlaSjt3JAMgTJ0lx78kl8nuSGxc9M4FSYmAP5Y6wiiCIg83tM&amp;_nc_zt=23&amp;_nc_ht=instagram.ffjr1-1.fna&amp;_nc_gid=CfucICm1xS-PxUeX4kfamw&amp;_nc_ss=7b689&amp;oh=00_Af6dO-p6X-b9tPmvwio0AkkU7BKWlX8ug3bqVq4IaRcLXg&amp;oe=69FE2DDE" style="object-fit: cover;"></div><div class="x1ey2m1c xtijo5x x1o0tod x10l6tqk x13vifvy"></div></div><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"></div></a></div><div class="x1lliihq x1n2onr6 xh8yej3 x4gyw5p x14z9mp xhe4ym4 xaudc5v x1j53mea"><a class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz" href="https://applink.instagram.com/dubaituskersrfc?ig_mid=CA4646CC-5F1F-419B-AFBE-4D1F00152861&amp;utm_source=igweb&amp;fall_back_to_web=false" role="link" tabindex="0"><div class="_aagu"><div class="_aagv" style="padding-bottom: 133.333%;"><img alt="Happy Birthday to His Highness Mohamed bin Zayed Al Nahyan 🎉
A visionary leader whose wisdom, strength, and dedication continue to guide the UAE toward prosperity and unity. 🇦🇪

Wishing His Highness continued health, happiness, and success in leading the nation forward.

With respect and pride,
Dubai Tuskers RFC 🐘

#MBZ #MohamedBinZayed #UAELeadership
#UAEPresident #AbuDhabi #UAE #PrideOfUAE
#UAENationalPride #HappyBirthdayMBZ
#VisionaryLeader #Leadership #DubaiCommunity
#DubaiTuskers #RugbyUAE #UAESports" class="x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3" crossorigin="anonymous" src="https://instagram.ffjr1-6.fna.fbcdn.net/v/t39.30808-6/650384829_122167256576910375_8361561691263869622_n.jpg?stp=dst-jpg_e35_p240x240_tt6&amp;_nc_cat=104&amp;ig_cache_key=Mzg1MDQ3Mjg5NDcxMjExNzQ3Ng%3D%3D.3-ccb7-5&amp;ccb=7-5&amp;_nc_sid=58cdad&amp;efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwMjR4MTI4MC5zZHIuQzMifQ%3D%3D&amp;_nc_ohc=1SRGHP9spPIQ7kNvwE03IEp&amp;_nc_oc=AdoUfAT-SbjCLrAbp-PWft2BEO7b89FbRbsVlj4obZNfN6FnlRb3GYGW9yIH6BPktUQ&amp;_nc_zt=23&amp;_nc_ht=instagram.ffjr1-6.fna&amp;_nc_gid=CfucICm1xS-PxUeX4kfamw&amp;_nc_ss=7b689&amp;oh=00_Af5KNmeLrtwqXrZXlg3LDsP0r9nf48nqmkwMO92uJmYaqg&amp;oe=69FE28E6" style="object-fit: cover;"></div><div class="x1ey2m1c xtijo5x x1o0tod x10l6tqk x13vifvy"></div></div><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"></div></a></div><div class="x1lliihq x1n2onr6 xh8yej3 x4gyw5p x14z9mp xhe4ym4 xaudc5v x1j53mea"><a class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz" href="https://applink.instagram.com/dubaituskersrfc?ig_mid=CA4646CC-5F1F-419B-AFBE-4D1F00152861&amp;utm_source=igweb&amp;fall_back_to_web=false" role="link" tabindex="0"><div class="_aagu"><div class="_aagv" style="padding-bottom: 133.333%;"><img alt="Ramadan Kareem 🌙✨
May this holy month bring peace to your heart, strength to your spirit, and unity to our community.

From the field to faith — we stand together.
🤍 Ramadan Kareem from Dubai Tuskers RFC.

#RamadanKareem #DubaiTuskers #OneTeamOneFamily #RugbySpirit #BlessedMonth #oneteam #onedream #onefamily" class="x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3" crossorigin="anonymous" src="https://instagram.ffjr1-4.fna.fbcdn.net/v/t39.30808-6/635133911_122163889712910375_6768186602429599658_n.jpg?stp=dst-jpg_e35_p240x240_tt6&amp;_nc_cat=106&amp;ig_cache_key=MzgzNTE1NTgyNzE1MDE1OTA4MQ%3D%3D.3-ccb7-5&amp;ccb=7-5&amp;_nc_sid=58cdad&amp;efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&amp;_nc_ohc=3Jr62yG77mkQ7kNvwFQ_Z5g&amp;_nc_oc=AdqWq-oB_85QEJUQgPkpGgvmzvyHGFDuA3j_FE8lDF-4q-sBysls-AiikoExjImki_4&amp;_nc_zt=23&amp;_nc_ht=instagram.ffjr1-4.fna&amp;_nc_gid=CfucICm1xS-PxUeX4kfamw&amp;_nc_ss=7b689&amp;oh=00_Af7crUm4KSOfKG0PNit0CXsjVCfyla8a9aGLbFk-1v0Txg&amp;oe=69FE2A34" style="object-fit: cover;"></div><div class="x1ey2m1c xtijo5x x1o0tod x10l6tqk x13vifvy"></div></div><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"></div></a></div></div><div class="_ac7v x1ty9z65 xzboxd6"><div class="x1lliihq x1n2onr6 xh8yej3 x4gyw5p x14z9mp xhe4ym4 xaudc5v x1j53mea"><a class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz" href="https://applink.instagram.com/dubaituskersrfc?ig_mid=CA4646CC-5F1F-419B-AFBE-4D1F00152861&amp;utm_source=igweb&amp;fall_back_to_web=false" role="link" tabindex="0"><div class="_aagu"><div class="_aagv" style="padding-bottom: 133.333%;"><img alt="Be more than a fan — be part of the herd 🐘
The Dubai Tuskers RFC Supporter Membership gives you exclusive perks, discounts, events, and official merch — all while backing your club for a full year.
💛 AED 375
Join the Tuskers family today.

👉 Register now: www.dubaituskers.com/membership

#DubaiTuskers #TuskersRFC #JoinTheHerd 🐘 #SupportLocalRugby #RugbyFamily #RugbyLife
#RugbyCommunity #ClubSupporter #BackTheBadge #RugbyUAE #DubaiRugby  #oneteam #onedream #onefamily" class="x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3" crossorigin="anonymous" src="https://instagram.ffjr1-2.fna.fbcdn.net/v/t39.30808-6/629246204_122162468990910375_5347168840689374807_n.jpg?stp=dst-jpg_e35_p240x240_tt6&amp;_nc_cat=110&amp;ig_cache_key=MzgyODk2MzU3Mzg3OTU2NzEyMw%3D%3D.3-ccb7-5&amp;ccb=7-5&amp;_nc_sid=58cdad&amp;efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&amp;_nc_ohc=tkraxKMXv0MQ7kNvwGrFL6W&amp;_nc_oc=Adqj-OOlKfMm1br5Z-L7GsL3dHwUGmq0Pjtz_T_XKk-AfStxFM1qUf4Nx9ZFl15Ix9U&amp;_nc_zt=23&amp;_nc_ht=instagram.ffjr1-2.fna&amp;_nc_gid=CfucICm1xS-PxUeX4kfamw&amp;_nc_ss=7b689&amp;oh=00_Af5kSU5Mo9KYWJclzvRLtMjsNSzd7NeepNDARIa4_aGHBw&amp;oe=69FE3A23" style="object-fit: cover;"></div><div class="x1ey2m1c xtijo5x x1o0tod x10l6tqk x13vifvy"></div></div><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"></div></a></div><div class="x1lliihq x1n2onr6 xh8yej3 x4gyw5p x14z9mp xhe4ym4 xaudc5v x1j53mea"><a class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz" href="https://applink.instagram.com/dubaituskersrfc?ig_mid=CA4646CC-5F1F-419B-AFBE-4D1F00152861&amp;utm_source=igweb&amp;fall_back_to_web=false" role="link" tabindex="0"><div class="_aagu"><div class="_aagv" style="padding-bottom: 133.333%;"><img alt="Strong partnerships build strong teams 💪
A heartfelt thank you to @mcgsalbarsha for their continued support of Dubai Tuskers RFC.
We truly appreciate the trust and belief in our journey and look forward to growing together in 2026 and the years ahead 🤝🐘

#DubaiTuskersRFC #PartnershipAnnouncement #ThankYouSponsors #MCGsByMcGettigans #RugbyCommunity #StrongerTogether #2026AndBeyond  #oneteam #onedream #onefamily" class="x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3" crossorigin="anonymous" src="https://instagram.ffjr1-6.fna.fbcdn.net/v/t39.30808-6/625890169_122161975430910375_7904479699170638770_n.jpg?stp=dst-jpg_e35_p240x240_tt6&amp;_nc_cat=104&amp;ig_cache_key=MzgyNjYyOTQ5NDk5MjM3ODY2MQ%3D%3D.3-ccb7-5&amp;ccb=7-5&amp;_nc_sid=58cdad&amp;efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&amp;_nc_ohc=WG0dAdk1o-sQ7kNvwENCjuG&amp;_nc_oc=Adq6QH7QJjiTUW65s92qA2il2070c5hqXs7WEKREAYIQhqCIU4BdYrHapoz09PLzsH4&amp;_nc_zt=23&amp;_nc_ht=instagram.ffjr1-6.fna&amp;_nc_gid=CfucICm1xS-PxUeX4kfamw&amp;_nc_ss=7b689&amp;oh=00_Af4gOzveye0DvcF5Ej6rjLqO8rVCqZnWeWW2oqyOaS8lWQ&amp;oe=69FE3BB3" style="object-fit: cover;"></div><div class="x1ey2m1c xtijo5x x1o0tod x10l6tqk x13vifvy"></div></div><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"></div></a></div><div class="x1lliihq x1n2onr6 xh8yej3 x4gyw5p x14z9mp xhe4ym4 xaudc5v x1j53mea"><a class="x1i10hfl xjbqb8w x1ejq31n x18oe1m7 x1sy0etr xstzfhl x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xt0psk2 x3ct3a4 xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz" href="https://applink.instagram.com/dubaituskersrfc?ig_mid=CA4646CC-5F1F-419B-AFBE-4D1F00152861&amp;utm_source=igweb&amp;fall_back_to_web=false" role="link" tabindex="0"><div class="_aagu"><div class="_aagv" style="padding-bottom: 133.333%;"><img alt="Big news off the field! 💥

GulfSportz joins the Tuskers family as our Official Media Partner.
Let’s tell our story louder, bolder, and stronger 🐘📸

#PartnershipAnnouncement #DubaiTuskers #GulfSportzMedia  #asiarugby #dubai7s #oneteam #onedream #onefamily" class="x5yr21d xu96u03 x10l6tqk x13vifvy x87ps6o xh8yej3" crossorigin="anonymous" src="https://instagram.ffjr1-6.fna.fbcdn.net/v/t39.30808-6/622928177_122160714248910375_6506019454318740954_n.jpg?stp=dst-jpg_e35_s150x150_tt6&amp;_nc_cat=104&amp;ig_cache_key=MzgyMDY4MDE2NTMwODMzMzM4Nw%3D%3D.3-ccb7-5&amp;ccb=7-5&amp;_nc_sid=58cdad&amp;efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTA4MC5zZHIuQzMifQ%3D%3D&amp;_nc_ohc=SYsdvqxYq7kQ7kNvwHZcWBW&amp;_nc_oc=AdotBaiNEQmIFdR-6rauwPcTQRpqPBIkxdqVD2udb8r4Od97RzjqFMEnF-YavEFlO9w&amp;_nc_zt=23&amp;_nc_ht=instagram.ffjr1-6.fna&amp;_nc_gid=CfucICm1xS-PxUeX4kfamw&amp;_nc_ss=7b689&amp;oh=00_Af7yevSYRxHyG_qS4YRzC2ESrG2HbBgkz6s_LuFzsOeFoQ&amp;oe=69FE33FE" style="object-fit: cover;"></div><div class="x1ey2m1c xtijo5x x1o0tod x10l6tqk x13vifvy"></div></div><div class="html-div xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x9f619 xjbqb8w x78zum5 x15mokao x1ga7v0g x16uus16 xbiv7yw x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1"></div></a></div></div></div>"""


def download_tuskers_feed(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Setup local storage
    folder_name = "dubai_tuskers_media"
    if not os.path.exists(folder_name):
        os.makedirs(folder_name)

    posts_list = []
    # Find all post containers
    # Looking for the 'a' tags which wrap the images in your HTML
    post_links = soup.find_all('a', href=True)

    print(f"Found {len(post_links)} potential posts. Starting download...")

    for i, link in enumerate(post_links):
        img_tag = link.find('img')
        if not img_tag:
            continue

        # 1. Extract Data
        img_url = img_tag.get('src')
        caption = img_tag.get('alt', 'No caption available')
        
        # Determine Type (Video/Carousel icons are in SVGs)
        post_type = "image"
        if link.find('svg', {'aria-label': 'Video'}):
            post_type = "video_thumbnail"
        elif link.find('svg', {'aria-label': 'Carousel'}):
            post_type = "carousel"

        # 2. Setup Filename
        file_extension = ".jpg" # IG thumbnails are typically jpg
        filename = f"tuskers_post_{i+1}{file_extension}"
        local_path = os.path.join(folder_name, filename)

        # 3. Download the Image
        try:
            response = requests.get(img_url, stream=True, timeout=10)
            if response.status_code == 200:
                with open(local_path, 'wb') as f:
                    for chunk in response.iter_content(1024):
                        f.write(chunk)
                download_success = True
            else:
                download_success = False
        except Exception as e:
            print(f"Error downloading {filename}: {e}")
            download_success = False

        # 4. Add to JSON structure
        posts_list.append({
            "post_index": i + 1,
            "type": post_type,
            "caption": caption.strip(),
            "local_file": local_path,
            "original_source": img_url,
            "downloaded": download_success
        })

    # 5. Save the JSON file
    with open('posts_data.json', 'w', encoding='utf-8') as jf:
        json.dump(posts_list, jf, indent=4, ensure_ascii=False)

    print(f"--- Process Complete ---")
    print(f"Images saved to: /{folder_name}")
    print(f"Data saved to: posts_data.json")

if __name__ == "__main__":
    # Ensure you have the 'requests' and 'beautifulsoup4' libraries installed
    # pip install requests beautifulsoup4
    download_tuskers_feed(html_data)