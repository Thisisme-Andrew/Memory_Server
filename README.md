# Memory Server

Backend for a full-stack travel memory application where users can save photo-based memories and attach them to real-world locations.

This repository is the **backend portion** of a larger school project. While the frontend was built collaboratively with `Next.js`, **I designed and implemented the backend myself** using `Node.js`, `Express.js`, and an `Azure MySQL` cloud database. I also helped connect parts of the frontend to the API layer I created.

## Table of Contents
- [About](#about)
- [Why This Project Matters](#why-this-project-matters)
- [Backend Highlights](#backend-highlights)
- [Architecture](#architecture)
- [Data Model](#data-model)
- [API Overview](#api-overview)
- [Tech Stack](#tech-stack)
- [Running Locally](#running-locally)
- [What I Learned](#what-i-learned)

## About

`Memory Server` powers an app built to help travelers preserve memories by storing photos and linking them to specific places. The backend handles the application's core data flows:

- user registration, login, profile updates, and password reset
- creating and retrieving memories tied to map coordinates
- associating memories with collaborators
- attaching image URLs to memories
- updating and deleting related records across multiple tables

The project was especially important to me because it was my **first full backend build**. I used it to learn how to design a server from the ground up, structure a codebase with MVC principles, and expose RESTful endpoints that a frontend could reliably consume.

## Why This Project Matters

For portfolio purposes, this repository best represents my individual contribution to the overall application.

- I built the backend end-to-end rather than only contributing isolated tickets.
- I learned how to break application logic into `routes`, `controllers`, `services`, `models`, and `configuration`.
- I implemented CRUD-focused REST APIs for the app's main resources: `users`, `memories`, collaborators, and images.
- I integrated the backend with a **cloud-hosted relational database on Azure**, which gave me hands-on experience working beyond a local-only setup.
- I worked on the contract between frontend and backend by helping wire some API usage from the client side.

## Backend Highlights

### MVC-style organization

The codebase follows an MVC-inspired structure:

- `routes/` defines HTTP endpoints
- `controllers/` handles request/response flow
- `services/` contains business logic and database operations
- `models/` shapes application data
- `config/` stores environment-driven database configuration

This separation made the project easier to reason about and gave me early experience designing maintainable server-side code.

### REST API design

The backend exposes endpoints under:

- `/api/users`
- `/api/memories`

These endpoints support creating, reading, updating, and deleting application data, including more specific actions such as:

- retrieving memories created by a specific user
- retrieving memories a user collaborated on
- updating memory location, title, and privacy settings
- adding and removing collaborators
- adding and removing image references

### Relational data handling

The memory feature is modeled across multiple related tables rather than a single flat object. A memory can include:

- a creator
- a title
- privacy state
- longitude and latitude
- many collaborators
- many image URLs

That required thinking through one-to-many style relationships and how to reconstruct useful API responses from normalized database records.

### Multi-step database operations

Creating and deleting memories is more than a single insert or delete. The backend coordinates changes across memory, collaborator, and image tables, including transaction-based flows for related inserts. Building that logic helped me understand how backend systems maintain consistency across connected records.

## Architecture

The project is intentionally lightweight and centered around Express, but still structured like a real backend service:

```text
server.js
config/
controllers/
models/
routes/
services/
  database_general/
  memories/
  users/
```

### Request flow

1. A client sends a request to an Express route.
2. The route forwards the request to a controller.
3. The controller validates/extracts inputs and calls a service function.
4. The service performs business logic and database operations.
5. A JSON response is returned to the frontend.

This project gave me practical experience thinking in layers instead of writing everything in a single file.

## Data Model

At a high level, the backend manages these concepts:

### Users

- account creation
- login lookup
- profile editing
- password reset

### Memories

- creator ID
- memory name/title
- privacy flag
- latitude and longitude

### Collaborators

- links a user to a memory
- allows a memory to be shared with multiple people

### Images

- stores image URLs associated with a memory
- allows multiple images per memory

This structure let me represent richer user interactions than basic single-table CRUD.

## API Overview

### User endpoints

- `POST /api/users/register`
- `GET /api/users/login`
- `PUT /api/users/edit`
- `DELETE /api/users/remove`
- `GET /api/users/:id`
- `GET /api/users/`
- `PUT /api/users/reset-password`

### Memory endpoints

- `POST /api/memories/add`
- `GET /api/memories/getAllByUser`
- `GET /api/memories/getAllWithCollaboratedByUser`
- `GET /api/memories/all`
- `GET /api/memories/:id`
- `POST /api/memories/editLongitudeLatitude`
- `POST /api/memories/editTitle`
- `POST /api/memories/editIsPrivate`
- `POST /api/memories/addCollaborators`
- `POST /api/memories/addImages`
- `DELETE /api/memories/removeCollaborators`
- `DELETE /api/memories/removeImages`
- `DELETE /api/memories/removeMemory`

## Tech Stack

### Backend

- `Node.js`
- `Express.js`
- `JavaScript (ES Modules)`

### Database

- `MySQL`
- `Azure Database for MySQL`
- `mysql2`

### Supporting packages

- `cors`
- `dotenv`

### Full-stack context

- frontend built with `Next.js`
- backend in this repository built by me

## Running Locally

### Prerequisites

- `Node.js`
- access to the project's environment variables
- access to the Azure MySQL instance used by the app

### Environment variables

This project expects a `.env` file with values for:

- `DB_HOST_ADDRESS`
- `DB_USERNAME`
- `DB_PASSWORD`
- `DATABASE_NAME`
- `PORT`

It also uses the SSL certificate located at:

- `config/DigiCertGlobalRootCA.crt.pem`

### Install and start

```bash
npm install
npm start
```

By default, the server runs on the port defined in `.env`, or falls back to `5050`.

## What I Learned

This project helped me build foundational backend skills that I plan to keep growing:

- designing REST APIs that a frontend can integrate with
- structuring a backend with MVC-style separation of concerns
- working with a relational schema instead of only simple in-memory data
- handling multi-table create, update, and delete flows
- connecting a Node/Express backend to a cloud-hosted Azure MySQL database
- thinking about how backend responses should be shaped for frontend use

Because this was my first backend project, it was also where I learned how much thought goes into application structure, database design, and making sure different parts of a stack communicate clearly.
