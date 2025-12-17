# Loan API

A RESTful API for managing loan applications with Express.js, TypeScript, and Prisma.

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd loan-api
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

## Database Setup

1. Start the PostgreSQL database:

```bash
npm run db:up
```

2. Run database migrations:

```bash
npm run db:migrate:dev
```

3. Generate Prisma Client:

```bash
npm run prisma:generate
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

### Production Mode

```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production server
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run db:up` - Start database container
- `npm run db:down` - Stop database container
- `npm run db:reset` - Reset database and run migrations
- `npm run db:migrate` - Apply existing migrations
- `npm run db:migrate:dev` - Create and apply new migration
- `npm run prisma:generate` - Generate Prisma Client
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## API Endpoints

### Request a Loan

```
POST /loans/request
```

**Request Body:**

```json
{
  "user_id": "Bruce",
  "mrp": 100000000,
  "dp": 20000000,
  "vehicle_year": 2018,
  "police_number": "B 1234 BYE",
  "machine_number": "SDR72V25000W201"
}
```

### Approve a Loan

```
POST /loans/approve
```

**Request Body:**

```json
{
  "user_id": "Bruce",
  "police_number": "B 1234 BYE"
}
```

## Project Structure

```
loan-api/
├── prisma/              # Prisma schema and migrations
├── src/
│   ├── api/
│   │   ├── controllers/ # Request handlers
│   │   └── middleware/  # Express middleware
│   ├── database/
│   │   ├── config/      # Database configuration
│   │   └── repositories/# Data access layer
│   ├── mappers/         # Data transformation
│   ├── services/        # Business logic
│   └── shared/          # Shared types and utilities
├── docker-compose.yml   # Docker configuration
└── package.json
```

## Tech Stack

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Testing:** Jest
- **Code Quality:** ESLint, Prettier

## License

MIT
