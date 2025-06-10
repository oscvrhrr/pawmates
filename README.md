
# 🐶 Hello there! Welcome to Pawmates 
This is the front-end part of a dog adoption application. Here is the [Live demo](https://pawmates-two.vercel.app/)


## Objective
The objective of this project was to integrate Fetch's API with a React frontend all written in TypeScript.
User should be able to view a list of dogs available for adoption. Filter by breed, age, and have the query results paginated. I chose React, Vite, TypeScript because I wanted to make this a full client side app and focus on building a great user experience. I used TypeScript to prevent bugs and make my codebase easier to maintain and understand. For Design I used shadcn (the worlds best library!) to create a clean design system that can easily be customized and extended to my taste. State management was handled with native react hooks, context and reducers, although this might cause rerenders throughtout the tree. I figured the app was small enough to justify this approach. Some things I would do differently would be to add Jest for unit testing.

### Features

- [x] User can login and logout
- [x] View all breeds
- [x] Filter by breed and age
- [x] Sort the dogs by breed
- [x] Save dogs to a favorites list
- [x] Remove dogs from favorites list
- [x] Responsive design
- [x] Results are paginated
- [x] User gets matched with a dog from their favorites list

## Tech Stack

- React
- TypeScript
- Vite
- Shadcn (the worlds best library!)
- Tailwind
- React Router


## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)



## Prerequisites

- Node.js
- npm

## Installation

Follow the steps below to set up the project.

## Clone the Repository

```bash
git clone https://github.com/oscvrhrr/pawmates.git
cd pawmates
```

## Setup Environment Variables 

Create a `.env` file in the root 

```env
# Example .env (add the following variable)
VITE_API_URL=https://frontend-take-home-service.fetch.com
```

## Setup Project

Navigate to the `/` directory and run the following commands:

```bash
# /
npm install
npm run dev
```

The client is running on port 3000



