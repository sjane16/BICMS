
# BICMS — Barangay Issuance and Complaint Management System

**A web-based platform for streamlining barangay document issuance, complaint management, and administrative services.**

[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://vercel.com/)

**[Live Application](https://bicms.vercel.app)** · **[Backend Repository](https://github.com/sjane16/BICMS_backend)**

---

## Overview

**Barangay Issuance and Complaint Management System (BICMS)** is an academic software development project designed to digitalize barangay administrative processes and improve the accessibility of community services.

The application provides a centralized platform for managing resident information, processing document requests, handling complaints, and supporting barangay administrative operations.

This repository contains the **frontend application**, developed using **React and Vite**, which communicates with a separately maintained PHP backend through HTTP API requests.

## Key Features

BICMS includes interfaces supporting the following modules:

| Module | Description |
|---|---|
| **User Authentication** | Login and registration interfaces for accessing the system. |
| **Resident Management** | Viewing, organizing, and managing resident information. |
| **Certificate Management** | Requesting documents, monitoring requests, and managing issuance workflows. |
| **Complaint Management** | Filing complaints, tracking their progress, and managing resolutions. |
| **Administrative Dashboard** | Centralized access to system information, statistics, and administrative activities. |
| **Reports** | Accessing certificate and complaint-related administrative reports. |
| **Profile Management** | Viewing and updating account information. |

## Application Preview
<img width="400" height="200" alt="bicms vercel app_" src="https://github.com/user-attachments/assets/e7b21490-e39f-479b-bc90-26dfb6ba688d" />

<img width="400" height="200" alt="image" src="https://github.com/user-attachments/assets/eb1b76d1-6f61-420e-8bb2-2293f3f75ba2" />
<img width="400" height="200" alt="image" src="https://github.com/user-attachments/assets/38b5ee32-adc9-4a23-bfba-7aee8977f1de" />
<img width="400" height="200" alt="image" src="https://github.com/user-attachments/assets/c428d3cd-a671-4fc8-be40-984270b07e92" />


## Technology Stack

The frontend application uses the following technologies:

| Category | Technology | Purpose |
|---|---|---|
| **UI Library** | React 19 | Building component-based user interfaces |
| **Build Tool** | Vite 7 | Development server and production builds |
| **Programming Language** | JavaScript | Frontend application logic |
| **Routing** | React Router DOM | Client-side navigation |
| **HTTP Client** | Axios | Communication with backend APIs |
| **Notifications** | React Toastify | Displaying user notifications |
| **Code Quality** | ESLint | Identifying code quality issues |
| **Deployment** | Vercel | Frontend application hosting |

## System Architecture

BICMS follows a **separated frontend and backend architecture**, allowing the client-side interface and server-side functionality to be maintained independently.

```text
                  USER
                   |
                   v
        +---------------------+
        |  FRONTEND           |
        |  React + Vite       |
        |  Hosted on Vercel   |
        +---------------------+
                   |
                   | HTTP API Requests
                   | Axios / JSON
                   v
        +---------------------+
        |  BACKEND            |
        |  PHP + Apache       |
        |  Docker             |
        +---------------------+
                   |
                   | Database Operations
                   v
        +---------------------+
        |  DATABASE           |
        |  MySQL-compatible   |
        +---------------------+
```

### Frontend

The React application handles user interactions, component rendering, form interfaces, client-side routing, and communication with backend services.

### Backend

The PHP backend processes application requests, manages server-side functionality, performs database operations, and supports document generation.

The backend source code is maintained in a separate repository:

**[BICMS Backend Repository](https://github.com/sjane16/BICMS_backend)**

## Getting Started

Follow these instructions to run the frontend application locally.

### Prerequisites

Make sure the following are installed:

- [Node.js](https://nodejs.org/) — Compatible with Vite 7
- npm
- [Git](https://git-scm.com/)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/sjane16/BICMS.git
```

**2. Navigate to the project directory**

```bash
cd BICMS
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env.local` file in the project root and configure the backend API URL:

```env
VITE_API_URL=https://bicms-backend.onrender.com
```

For local backend development, replace the URL with the address of your running PHP server.

> **Note:** The backend service must be accessible for API-dependent functionality to work. Do not store secrets in variables prefixed with `VITE_`, as they are exposed to the client-side application.

**5. Start the development server**

```bash
npm run dev
```

**6. Open the application**

Navigate to the local URL displayed in your terminal, typically:

```text
http://localhost:5173
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Generates an optimized production build |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint checks |

## Deployment

The BICMS frontend is hosted on **Vercel**.

**Live Application:** https://bicms.vercel.app

The frontend communicates with a separately hosted PHP backend using the configured API URL.

## Development and Collaboration

BICMS was developed as a collaborative academic software development project, with frontend and backend responsibilities divided between team members.

The team utilized **Visual Studio Code Live Share** for real-time collaboration, code integration, and development coordination.

### Development Team

| Developer | Role | Responsibilities |
|---|---|---|
| **[John Carlo Lacson](https://github.com/jacehyun)** | Frontend Developer | Implemented user interfaces, page styling, and client-side routing using React. |
| **[Samantha Jane Quibral](https://github.com/sjane16)** | Backend Developer | Developed server-side functionality, API endpoints, and database operations using PHP. |

## Project Repositories

The source code is organized into two repositories:

| Repository | Description |
|---|---|
| **[BICMS Frontend](https://github.com/sjane16/BICMS)** | React and Vite frontend application |
| **[BICMS Backend](https://github.com/sjane16/BICMS_backend)** | PHP backend, API endpoints, and database operations |

## Acknowledgments

BICMS was developed as an academic software development project through the collaborative efforts of its development team.

The project reflects the team's experience in frontend development, backend integration, web application design, and collaborative software development.
