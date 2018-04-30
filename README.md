# SecureBlog
Secure Blog project for CS166 @ SJSU. Feature list will be documented in README.

Project

The purpose of the project is to demonstrate your grasp of the basic concepts in information security. This is an individual project. You will develop a Security Blog web application that provides description of the concepts you learned in this class. You will provide utility pages to do some calculations for the topics we covered in the class. You will provide web pages to demonstrate some of the OWASP top-10 security vulnerabilities. You will provides pages that correct the vulnerabilities.

You can use the XAMPP software stack to create a 3-tier web application. User interface will be created using standard HTML, CSS and Javascript. For extra credit, you can use Bootstrap, Angular JS, JQuery and other GUI libraries. Middle tier will consist of Tomcat web application server and JSP pages. Backend will consist of mysql database. You will deploy your project in Amazon Web Services cloud.

Requirements
1. Install and configure XAMPP stack.

2. Blog web application with a minimum of the following pages. 10 points

Registration screen

Login screen

Blog list screen

Normal user - add blog item, delete own blog item

Administrator - delete any blog item

First blog item authored by you: "Behind the scene tour" where you describe the details of how you built this site. This should include screenshot of your firewall rules and any relevant information to highlight security features.

Footer with privacy statement page.

Logout


3. Normal security features: 10 points

Authentication: passwords must be hashed and salted.

Authorization: normal user and administrator roles need to be implemented.

Availability: registration form should include some sort of CAPTCHA.

Session management: use sessions correctly to remember user.

All pages mush be free of injection attacks (except for attack demo pages)

All forms must use POST method and should have CSRF prevention token (except for attack demo pages)

4. Required content: 5 points

First blog item authored by you: "Behind the scene tour" where you describe the details of how you built this site. This should include screenshot of your firewall rules and any relevant information to highlight security features.

Privacy statement.

At least 3 other blog items posted by you, relevant to the content of CS166.

5. Feature demonstrations: 20 points

Demonstrate SQL injection attack and how to prevent it.

Demonstrate Cross site script injection attack and show possible defenses.

Demonstrate web site defacing.

Demonstrate how cookies work. Remember user by cookie - last visited page and time.

Demonstrate session management using JSP / Servlet session mechanism

6. Bonus features: any additional features you think are important: up to 20 bonus points


Some ideas:

Various crypto encryption / decryption pages

Interesting CAPTCHA

Interesting cookie alternatives

Multi-factor authentication

Mobile application?


7. Deploy to AWS cloud: 5 points

Create AWS account and setup a small VM. Configure securiy groups.Install and configure XAMPP stack. Take screen shots of security groups and include them in your blog article 1: "Behind the scene tour of this site" Alternative: non AWS VMs are OK but you need to demonstrate firewall settings.