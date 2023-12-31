<h1 align="center">JobTrack</h1>
<h3 align="center">A job application tracking system for jobseekers</h3>

<p align="center"><img src="https://github.com/bobbycoleman-dev/JobTrack/blob/main/Banner.jpg" alt="jobtrack-banner" align="center"/></p>

---

## Table of Contents

-   [Background](#background)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Screenshots](#screenshots)
-   [Functionality](#functionality)
-   [Design](#design)
-   [Running Locally](#running-locally)

---

## Background

I was recently a full-time student at Coding Dojo for full-stack software development, and with it coming to an end, I knew I had my work cut out for me to find my next opportunity. While using Google Sheets is a viable option, I wanted more out of tracking my job applications. My final stack in the bootcamp was C#/.NET and I found it to be the perfect stack for developing this project.

[Return to Table of Contents](#table-of-contents)

---

## Features

-   Login & Registration
-   Maintain Login State after browser close
-   Onboarding after registration to gather further jobseeker info
    -   Social links
    -   Set Daily Submit Goal
    -   Select theme
-   Dashboard for displaying:
    -   Applications submitted
    -   Applications heard back from
    -   Applications Rejected
    -   Daily Goal Completion
    -   Number of Interviews Scheduled
    -   Top Application
    -   Daily submitted chart
    -   Status chart
    -   Submitted Application data
-   Submitted Applications table: - Searchable, filterable, sortable - Status update directly from table - View application navigation
-   View individual applications - Company Name - Position Title - Location - Position Type - Company Website - Position Website - Current Status - Interviews - Contacts - Notes
-   Your social links (LinkedIn, GitHub, etc) are available to copy to clipboard when submitting an application
-   Choose your app theme from multiple light or dark themes

[Return to Table of Contents](#table-of-contents)

---

## Technologies Used

-   C#/.NET API backend
-   MySQL Database
-   React + Vite frontend
-   ReCharts
-   Tailwind frontend styling
-   DaisyUI for theme generation

[Return to Table of Contents](#table-of-contents)

---

## Screenshots

<p align="center">Login & Registration</p>
<p align="center"><img src="https://github.com/bobbycoleman-dev/JobTrack/blob/main/Screenshots/Login.jpg" alt="login" width="400"/> <img src="https://github.com/bobbycoleman-dev/JobTrack/blob/main/Screenshots/Register.jpg" alt="registration" width="400"/></p>

<p align="center">Onboarding</p>
<p align="center"><img src="https://github.com/bobbycoleman-dev/JobTrack/blob/main/Screenshots/Onboarding.jpg" alt="onboarding" width="400"/></p>

<p align="center">Dashboard (Dark Theme Variants)</p>
<p align="center"><img src="https://github.com/bobbycoleman-dev/JobTrack/blob/main/Screenshots/DashboardDark1.jpg" alt="dark1" width="400"/> <img src="https://github.com/bobbycoleman-dev/JobTrack/blob/main/Screenshots/DashboardDark2.jpg" alt="dark2" width="400"/></p>

<p align="center">Dashboard (Light Theme Variants)</p>
<p align="center"><img src="https://github.com/bobbycoleman-dev/JobTrack/blob/main/Screenshots/DashboardLight1.jpg" alt="light1" width="400"/> <img src="https://github.com/bobbycoleman-dev/JobTrack/blob/main/Screenshots/DashbaordLight2.jpg" alt="light2" width="400"/></p>

<p align="center">Log Application & View Application</p>
<p align="center"><img src="https://github.com/bobbycoleman-dev/JobTrack/blob/main/Screenshots/LogApp.jpg" alt="log-app" width="400"/> <img src="https://github.com/bobbycoleman-dev/JobTrack/blob/main/Screenshots/ViewApp.jpg" alt="view-app" width="400"/></p>

<p align="center">Interview Calendar & User Settings</p>
<p align="center"><img src="https://github.com/bobbycoleman-dev/JobTrack/blob/main/Screenshots/Interviews.jpg" alt="interview-calendar" width="400"/> <img src="https://github.com/bobbycoleman-dev/JobTrack/blob/main/Screenshots/UserSettings.jpg" alt="user-settings" width="400"/> </p>

---

## Functionality

When first visiting the site, you are brought to the Login screen if you have an account, or you can travel to the Registration screen to create an account. The registration form takes your full name, your email, and password/confirm password. After successfully registering, you are taken to the onboarding screen. Filling in the information on the onboarding screen is optional, but you can choose to complete it by filling in your social links (LinkedIn, GitHub, Portfolio, Personal Website, Other Website), choosing your daily application submit goal (defaulted at 5), and choosing your theme.

After logging in, your information is stored in your personal browser local storage to maintain your login state even after closing the browser, and you are brought to the home screen which features a navigation on the left and a beautiful dashboard that displays all the pertinent information for your applications.

The navigation on the left includes a link to the dashboard, a link to a calendar that displays your scheduled interviews (future feature), your personal user settings, and a button to log an application. At the bottom of the navigation, a user can choose a new theme that will also be stored in local storage for persistance.

Logging an application is a simple process by asking for the most basic information such as company name, position title, company and position websites, location, whether it is remote, hybrid, or on-site, and any notes you wish to include about the position. At the top of the log application screen are clickable texts for your submitted social links that copy them to your clipboard for quick copy and paste when submitting applications in another browser window.

The main part of the dashboard is the table that holds all your application information for a quick search. A user can search by Company or Position, can sort by newest, oldest, company a-z/z-a, and position a-z/z-a, and filter by application status. The table also has quick access to the company or position website.

Lastly, the view application screen shows all the information about a single application where a user can quickly update an app status or the notes.

[Return to Table of Contents](#table-of-contents)

---

## Design

The design for JobTrack is meant to be simple while still displaying a plethora of information that a jobseeker would want to see right as they log in. The information displayed at the top is quick and easy to spot, showing in the selected theme's primary color, the charts demonstrate easy-to-understand data, and the table shows a lot of information without being too overwhelming.

[Return to Table of Contents](#table-of-contents)

---

## Running Locally

Prerequisites: - Dotnet version 6

1. Clone the repository
2. cd into the `Client` folder and run `npm i` to install dependencies
3. cd into the `Server` folder and run `dotnet restore` to install the dotnet dependencies
4. In the `appsettings.json` for the server, you will need to update the default connection string if your MySQL password is not rootroot.
5. While in `Server`, run `dotnet watch run` or `dotnet run` to start the server
6. cd into `Client` and run `npm run dev` to start the client side.

[Return to Table of Contents](#table-of-contents)
