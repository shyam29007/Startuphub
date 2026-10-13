# StartupHub --- Startup Team Builder Platform

> **StartupHub** is a web platform designed to help people turn startup
> ideas into teams by connecting founders with developers and making it
> easier to discover startup projects, apply to contribute, and manage
> collaboration.

## Table of Contents

-   [Overview](#overview)
-   [Who Is StartupHub For?](#who-is-startuphub-for)
-   [Main Features](#main-features)
-   [How Users Use StartupHub](#how-users-use-startuphub)
-   [System Architecture](#system-architecture)
-   [Technology Stack](#technology-stack)
-   [Data and Access Model](#data-and-access-model)
-   [AI Chatbot](#ai-chatbot)
-   [Project Structure](#project-structure)
-   [Environment Configuration](#environment-configuration)
-   [Run Locally](#run-locally)
-   [Security Notes](#security-notes)
-   [Future Improvements](#future-improvements)

------------------------------------------------------------------------

## Overview

StartupHub is a startup collaboration and team-building platform. It
provides a shared place where startup founders can present their
business ideas and projects, while developers can discover opportunities
and apply to join projects that match their skills and interests.

An administrator helps maintain platform quality by managing categories
and overseeing platform data. The project also includes a separate
Node.js server for AI/chatbot functionality.

**Core idea:** bring startup ideas, people, and collaboration
opportunities together in one platform.

## Who Is StartupHub For?

### 1. Founders

Founders are users who have an idea or startup and want to build a team
around it.

They can: - Create and maintain their profile. - Publish business
information. - Create startup projects and describe the skills or help
they need. - Review applications related to their projects and manage
them according to the application's workflow.

### 2. Developers

Developers are users who want to contribute their technical skills to
startup projects.

They can: - Create and maintain their profile. - Browse projects that
are open to contributors. - Submit applications to projects. - Track and
manage their own applications, subject to the platform's implemented
workflow.

### 3. Administrators

Administrators maintain the platform and help keep its content
organized.

They can: - Manage project categories. - Review and manage platform
records using the admin dashboard and the permissions implemented by the
application. - Perform administrative actions protected by the
application's role checks.

> **Scope note:** Investor accounts, payments, contracts, messaging
> between users, and other features should only be described as
> available if they have actually been implemented. They are not assumed
> to be part of the current release.

## Main Features

-   **Role-based experience:** separate workflows for founders,
    developers, and administrators.
-   **Founder and business profiles:** present information about startup
    founders and businesses.
-   **Startup projects:** publish and discover opportunities to
    collaborate.
-   **Applications:** developers can apply to projects, while founders
    can review applications for their projects.
-   **Category management:** administrators can organize categories used
    by the platform.
-   **Firebase-backed data:** Firebase Authentication and Cloud
    Firestore support authentication and application data.
-   **Image uploads:** Cloudinary can be used for profile or other image
    uploads, depending on the components connected to the upload
    service.
-   **AI chatbot:** a separate Node.js server provides the backend for
    the Gemini-powered chatbot integration.

## How Users Use StartupHub

### Founder workflow

1.  Register or sign in as a founder.
2.  Complete the founder profile.
3.  Add business information, if that feature is enabled in the UI.
4.  Create a startup project with a description and relevant details.
5.  Keep the project information up to date.
6.  Review applications associated with the founder's projects and
    update them according to the available workflow.

### Developer workflow

1.  Register or sign in as a developer.
2.  Complete the developer profile.
3.  Browse open startup projects.
4.  Open a project and evaluate whether it matches their interests and
    skills.
5.  Submit an application.
6.  Return to the platform to view or manage the application, depending
    on the features enabled in the current version.


## System Architecture

The following diagram shows the intended high-level architecture based
on the project's React/Vite frontend, Firebase services, Cloudinary
upload service, and separate Node.js/Gemini server.

``` mermaid
flowchart TB
    U[Founder / Developer / Admin] --> UI[React + Vite Frontend]
    UI --> AUTH[Firebase Authentication]
    UI --> FS[Cloud Firestore]
    UI --> CL[Cloudinary Image Upload]
    UI --> API[Node.js Chatbot API]
    API --> GEM[Google Gemini API]
    AUTH --> RULES[Firestore Security Rules]
    FS --> RULES
```

### Request flow

1.  A user interacts with the React frontend in the browser.
2.  Firebase Authentication handles sign-in and identity.
3.  The frontend reads and writes Firestore data under the permissions
    defined by Firestore Security Rules.
4.  Image upload requests use the Cloudinary upload service when
    connected to the UI.
5.  Chatbot requests go to the Node.js server, which reads the Gemini
    key from a server-side environment variable and calls the Gemini
    API.
6.  The server returns the chatbot response to the frontend.

### Architecture layers

  -----------------------------------------------------------------------
  Layer                               Responsibility
  ----------------------------------- -----------------------------------
  Presentation                        React pages, reusable components,
                                      forms, dashboards, and navigation

  Application services                Service modules that wrap
                                      authentication, Firestore
                                      operations, uploads, and AI API
                                      calls

  Data and identity                   Firebase Authentication and Cloud
                                      Firestore

  Media                               Cloudinary for image uploads

  AI backend                          Node.js server and Gemini API
                                      integration

  Authorization                       Firestore Security Rules and
                                      backend-side validation where
                                      applicable
  -----------------------------------------------------------------------

## Technology Stack

  -----------------------------------------------------------------------
  Technology                          Purpose
  ----------------------------------- -----------------------------------
  React                               Frontend user interface

  Vite                                Frontend development server and
                                      build tooling

  React Router                        Client-side navigation, if used by
                                      the current app

  Firebase Authentication             User authentication

  Cloud Firestore                     Application data storage

  Cloudinary                          Image hosting and upload processing

  Node.js                             Server runtime for the chatbot API

  Gemini API                          AI responses through the backend

  Git and GitHub                      Source control and collaboration

  Vercel                              Frontend deployment, if configured
                                      for the current repository
  -----------------------------------------------------------------------

> Confirm the actual package files and deployment settings before
> treating every optional integration above as active in production.

## Data and Access Model

The Firestore rules supplied for this project contain rules for these
collections:

-   `users` --- user profiles and roles.
-   `businesses` --- founder/business records.
-   `projects` --- startup project records.
-   `applications` --- developer applications to projects.
-   `categories` --- categories managed by administrators.

The rules use role checks for `admin`, `founder`, and `developer`, and
deny access by default to collections without explicit rules.

Security rules must be tested against the real data schema and
application workflows. In particular: - Validate allowed profile fields
and data types. - Protect role and administrative fields from user
modification. - Validate project ownership, application ownership, and
status transitions. - Ensure Firestore queries are compatible with the
access rules. - Do not rely only on hiding dashboard links in the
frontend for authorization.

## AI Chatbot

The repository includes a separate `server/` directory with Node.js
files and an environment file. The server code references
`process.env.GEMINI_API_KEY`.

Recommended request flow:

``` mermaid
sequenceDiagram
    actor User
    participant Frontend as React Frontend
    participant Server as Node.js Chatbot Server
    participant Gemini as Gemini API

    User->>Frontend: Enter a question
    Frontend->>Server: Send chat request
    Server->>Server: Validate request and read server-side key
    Server->>Gemini: Request AI response
    Gemini-->>Server: Generate response
    Server-->>Frontend: Return response
    Frontend-->>User: Display answer
```

The Gemini key must stay on the server. Do not prefix it with `VITE_`,
place it in frontend source files, or commit it to GitHub. Add
server-side validation, request limits, and safe error handling before
production use.

## Project Structure

The visible project structure includes the following directories and
files:

``` text
team builder/
├── public/
├── server/
│   ├── .env                 # Local server secrets; do not commit
│   ├── index.js             # Chatbot/API server logic
│   ├── server.js            # Server entry/configuration (check actual usage)
│   ├── package.json
│   └── package-lock.json
├── src/
│   ├── assets/
│   ├── components/
│   ├── firebase/
│   │   └── firebaseConfig.js
│   ├── models/
│   ├── services/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

`dist/` is the generated frontend build output, and `node_modules/`
contains installed dependencies. They generally should not be committed
to Git.


-   Never commit `.env` files, Gemini keys, Cloudinary API secrets, or
    Firebase Admin service-account private keys.
-   Do not place backend secrets in React code or in `VITE_` variables.
-   Use Firebase Security Rules to enforce access; frontend route guards
    alone are not sufficient.
-   Validate all incoming server requests and restrict CORS to expected
    origins in production.
-   Apply rate limiting and safe error handling to AI endpoints.
-   Configure Cloudinary upload presets with suitable file-type, size,
    and upload restrictions.
-   Do not store passwords directly in Firestore.
-   Test role-based permissions using the Firebase Emulator Suite or
    Rules Playground.
-   If a secret was committed, rotate/revoke it first; removing it from
    the latest commit alone does not invalidate it.

## Future Improvements

Possible improvements, depending on project requirements: -
Notifications for application status changes. - Better search and
filters for projects, skills, and categories. - Founder-to-developer
messaging and collaboration spaces. - Profile and project verification
workflows. - More detailed admin audit logs. - Improved chatbot context,
conversation history, and safe request limits. - Automated tests for
service modules, API endpoints, and Firestore rules. - CI checks and
deployment documentation.

## Contributing

1.  Create a branch for your change.
2.  Keep changes focused and use clear commit messages.
3.  Do not commit credentials or local environment files.
4.  Test the relevant feature before opening a pull request.
5.  Document new environment variables and features in this README.

## License

Add a license appropriate for your project before distributing or
accepting external contributions.
