# SvelteKit Boilerplate Project

## Overview

This is a modern full-stack SvelteKit application that is type-safe with TypeScript. It integrates with a SqlLite database using Drizzle ORM, includes UI components from Bits-UI, and uses Lucia and JWT for authentication.

## Tech Stack

- **Framework**: SvelteKit (latest version) with runes
- **Language**: TypeScript 5.0+
- **Database**: SqlLite
- **ORM**: Drizzle ORM
- **UI Components**: Bits-UI
- **Authentication**: Lucia and JWT
- **Node.js**: 23+
- **Package Manager**: npm

## Project Structure

```plaintext
**Development Guidelines**

Use TypeScript for all files
Follow SvelteKit filesystem routing
Keep components small and reusable
Use server-side validation
Implement proper error handling

**Authentication Requirements**
OAuth providers Google

**Database Schema**
Users table
Sessions table
Student table

Service table
Service Appointments table
Service Providers table
Service Subscription table

Push Notification table
Notification Subscription table
```

## Getting Started

### Prerequisites

- Node.js 23+
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.

### Building for Production

1. Build the project:
   ```bash
   npm run build
   ```
2. Preview the production build:
   ```bash
   npm run preview
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
