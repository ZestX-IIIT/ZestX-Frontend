# Webkriti Project

ZestX: Futuristic Fest Website

<p  style="text-align: center;">
</p>

## Overview

ZestX for the webkirti. We have a month-long fest with various events. Our website has two modes: visitors and admin.

Visitors can register for the various events taking place. For that, they first require to register. A verification mail will be sent to the user. Once verified, the user can explore the website and the events going on. The visitor’s dashboard would contain their details and the list of events they are registered in, and the past event they participated in before. The user can change his details as well. For that, he needs to provide the password. Users can even change their email address and a new verification mail would e sent to the new mail address. The user also has access to change the password. Finally, a log-out button for the user.

Next comes the admin mode. Admin log-in credentials are directly linked to the database. Admin would log in and would be redirected to the admin page where admin can manage the users. All the events would be displayed on the admin page, including the user registered for the same. Admin can add more external users to a particular event and can remove anyone from any event. In short, it has direct access to the database.

## How does it work?

When you open our website, a remarkable landing page would is displayed, giving you the option for the sign in and sign up:
<br>
<br>
![Landing Page Image](https://github.com/ZestX-IIIT/ZestX/blob/main/assets/_readme_assets/1.png)
<br>

Then comes the sign-in, sign-up page.
<br>
<br>

The next page would be loaded based on your credentials. As mentioned above, we have two modes, visitor mode and the admin mode:
<br>
<br>

### Visitors Login

<ul>
 If the visitor logins, a respective home page would be opened. The home page contains all the details for our fest.
<br>
<br>
After that, we have the event details page having all the information for each event and a button to register.
<br>
<br>
Then we have a user dashboard containing your information and the events you are associated with in fest.
<br>
<br>
We, too, have to edit information and change password pages for the user.
<br>
<br>
</ul>

### Admin Login:

<ul>
Admin would have a single user management page containing information for all the events and a list of all the users registered in that event, whether added by admin or registered through the website.
<br>
<br>
</ul>

## Tech Stack Used

**Client Side** :

 
<li> HTML </li>
<li> CSS</li>
 <li>Javascript</li>
<li>External Libraries:</li>
<ul>
<li> <a href="https://lottiefiles.com/">Lottie</a>
</li>
<li><a href="https://michalsnik.github.io/aos/">AOS</a>
</li>
</ul>


**Server Side** :

<li> Node 
<ul>
<li>bcrypt</li>
<li>cors</li>
<li>dotenv</li>
<li>heroku</li>
<li>jsonwebtoken</li>
<li>nodemailer</li>
<li>nodemon</li>
<li>path</li>
<li>pg</li>
</ul>
</li>
<li>Express </li>
<li>PostgreSQL</li>


## Authors

- [Akash Gupta](https://github.com/akashgupta1909)
- [Harshil Mendpara](https://github.com/HarshilMendpara)
- [Raj Varsani](https://github.com/RajVarsani)

