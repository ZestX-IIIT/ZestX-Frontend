# Webkriti Project

ZestX: Futuristic Fest Website

Hosted Link : http://zestx.netlify.app/

<br>

<div align="center" width="100%">
 
[![Netlify Status](https://api.netlify.com/api/v1/badges/d14b602c-8e13-4e58-9c11-0c1226124b82/deploy-status)](https://app.netlify.com/sites/zestx/deploys)
</div>


<br>

ZestX Backend Repository: https://github.com/ZestX-IIIT/ZestX-Backend


<br>

## Overview

ZestX for the webkirti : We have made for a month-long fest website with various events. Our website has two modes: visitors and admin.

Visitors can register for the various events taking place. For that, they first require to register. A verification mail will be sent to the user. Once verified, the user can explore the website and the events going on. The visitor’s dashboard would contain their details and the list of events they are registered in, and the past event they participated in before. The user can change his details as well. For that, he needs to provide the password. Users can even change their email address and a new verification mail would e sent to the new mail address. The user also has access to change the password. Finally, a log-out button for the user.

Next comes the admin mode. Admin log-in credentials are directly linked to the database. Admin would log in and would be redirected to the admin page where admin can manage the users. All the events would be displayed on the admin page, including the user registered for the same. Admin can add more external users to a particular event and can remove anyone from any event. In short, it has direct access to the database.

## How does it work?

We will be attaching screenshots for phone, tablet and desktop in a single poster

When you open our website, a remarkable landing page would is displayed, giving you the option for the sign in and sign up:

<br>

![Landing Page Image](https://github.com/ZestX-IIIT/ZestX/blob/main/assets/_readme_assets/Compressed_readme_assests/1.webp)

<br>

Then comes the sign-in, sign-up page.

<br>

![Sign-in page Image](https://github.com/ZestX-IIIT/ZestX/blob/main/assets/_readme_assets/Compressed_readme_assests/2.webp)

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

 ![Home Page Image](https://github.com/ZestX-IIIT/ZestX/blob/main/assets/_readme_assets/Compressed_readme_assests/3.webp)

<br>
<br>

After that, we have the event details page having all the information for each event and a button to register.

<br>
<br>

![Event Details Page Image](https://github.com/ZestX-IIIT/ZestX/blob/main/assets/_readme_assets/Compressed_readme_assests/4.webp)

<br>
<br>

Then we have a user dashboard containing your information and the events you are associated with in fest.

<br>
<br>

![User Profile Page Image](https://github.com/ZestX-IIIT/ZestX/blob/main/assets/_readme_assets/Compressed_readme_assests/5.webp)

<br>
<br>

We, too, have to edit information and change password pages for the user.

<br>
<br>

![Edit Information Page Image](https://github.com/ZestX-IIIT/ZestX/blob/main/assets/_readme_assets/Compressed_readme_assests/6.webp)

<br>
<br>

![Change password Page Image](https://github.com/ZestX-IIIT/ZestX/blob/main/assets/_readme_assets/Compressed_readme_assests/7.webp)

<br>
<br>

</ul>

### Admin Login:

<ul>
Admin would have a single user management page containing information for all the events and a list of all the users registered in that event, whether added by admin or registered through the website.

<br>
<br>

![ Admin Page Image](https://github.com/ZestX-IIIT/ZestX/blob/main/assets/_readme_assets/Compressed_readme_assests/8.webp)

<br>
<br>

![ Add user Image](https://github.com/ZestX-IIIT/ZestX/blob/main/assets/_readme_assets/Compressed_readme_assests/9.webp)

<br>
<br>

</ul>

## Features

### Security Features
<ol>
<li>Our website is more focused on security, and for that, we will be sending a verification mail to the visitor. Visitors can register only when the verification gets completed.
</li>
<li>Later, if the user tries to change the mail, a verification mail would be sent to the visitor’s new mail address.
</li>
<li>Similarly, we send a mail if a visitor forgets the password. There too, we send a link for the new webpage where users can change their passwords.
</li>
<li>Passwords too have constraints, which is, it’s mandatory to add one lowercase letter, one uppercase letter, one digit, one unique character with a minimum length of six characters.
</li>
<li>Redirection is also an essential factor in our website. If a visitor tries to open the main admin page, he would be automatically redirected to the homepage. Similar redirection is on the sign-in page, where the web page is opened according to the login credentials. Other necessary redirections too are added.
</li>
<li>We haven’t used any passwords in our code. We tried to keep our security intact.</li>


</ol>

### Utilization Features
<ol>
<li>Our pages are fully responsive for all the devices to add the functionality of opening our website on any device.
</li>
<li>We have done DOM manipulation and tried to open all the pages of the homepage without refreshing the page. 
</li>
<li>Visitors can go through all the events, get all the information about the event by clicking the posters, and register. </li>
<li>Users can change their personal information, including the password.
</li>
<li>Admin can add/remove any user from any event, and admin credentials are directly linked to the database.
</li>
<li>We have added some incredible animations and UI enhancing features to our website, like a scrollable progress bar.
</li>

</ol>

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

