# University Research Collaboration Platform

A full-stack CRUD application for managing university research collaborations, built with Spring Boot 3 (Java 21) and React with TypeScript.

## Project Structure

```
.
├── backend/                 # Spring Boot REST API
│   ├── pom.xml             # Maven configuration with Java 21
│   └── src/
│       └── main/
│           ├── java/       # Java source code
│           └── resources/  # Configuration files
├── frontend/               # React TypeScript application
│   ├── package.json       # NPM dependencies
│   ├── public/            # Static files
│   └── src/
│       ├── components/    # React components
│       ├── services/      # API services
│       ├── styles/        # CSS files
│       └── types/         # TypeScript types
└── README.md
```

## Technologies Used

### Backend
- **Java 21 LTS** - Latest long-term support version
- **Spring Boot 3.2.0** - REST API framework
- **Spring Data JPA** - Database ORM
- **H2 Database** - In-memory database
- **Maven 3.9.9** - Build tool
- **Lombok** - Code generation

### Frontend
- **React 18** - UI library
- **TypeScript 5** - Type safety
- **Axios** - HTTP client
- **React Router** - Navigation

## Getting Started

### Prerequisites
- Java 21 (OpenJDK recommended)
- Node.js 16+ and npm
- Maven 3.9+

### Installation

#### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   Backend runs on `http://localhost:8080`

#### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   Frontend runs on `http://localhost:3000`

## API Endpoints

### Universities
- `GET /api/universities` - Get all universities
- `GET /api/universities/{id}` - Get university by ID
- `POST /api/universities` - Create new university
- `PUT /api/universities/{id}` - Update entire university
- `PATCH /api/universities/{id}` - Partially update university
- `DELETE /api/universities/{id}` - Delete university

### Research Papers
- `GET /api/research-papers` - Get all papers
- `GET /api/research-papers/{id}` - Get paper by ID
- `POST /api/research-papers` - Create new paper
- `PUT /api/research-papers/{id}` - Update entire paper
- `PATCH /api/research-papers/{id}` - Partially update paper
- `DELETE /api/research-papers/{id}` - Delete paper

### Collaborations
- `GET /api/collaborations` - Get all collaborations
- `GET /api/collaborations/{id}` - Get collaboration by ID
- `POST /api/collaborations` - Create new collaboration
- `PUT /api/collaborations/{id}` - Update entire collaboration
- `PATCH /api/collaborations/{id}` - Partially update collaboration
- `DELETE /api/collaborations/{id}` - Delete collaboration

## Features

### Universities Management
- View all universities
- Create new university records
- Edit university information
- Delete universities
- Store: name, location, founded year, description

### Research Papers Management
- View all research papers
- Create new research papers
- Edit paper information
- Delete papers
- Store: title, authors, abstract, publication year, journal

### Collaborations Management
- View all collaborations
- Create partnerships between universities
- Edit collaboration details
- Delete collaborations
- Store: title, description, participating universities, dates, status

## Running Both Applications

1. **Terminal 1 - Backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm start
   ```

3. Open browser to `http://localhost:3000`

## Database

The application uses H2 in-memory database that:
- Automatically creates tables on startup
- Resets on application restart
- Can be accessed at `http://localhost:8080/api/h2-console`

## Build & Deployment

### Backend
```bash
cd backend
mvn clean package
java -jar target/research-collaboration-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
# Outputs to build/ directory
```

## Notes

- The application uses Java 21 for modern language features
- All endpoints support CORS for cross-origin requests
- In-memory H2 database is suitable for development/testing
- For production, replace H2 with PostgreSQL or MySQL

## Troubleshooting

### Backend won't start
- Ensure Java 21 is installed: `java -version`
- Check if port 8080 is available
- Run `mvn clean install` to rebuild

### Frontend won't start
- Delete `node_modules` and run `npm install` again
- Ensure port 3000 is available
- Check that backend API is running on port 8080

### CORS Errors
- Backend CORS is configured for `http://localhost:3000`
- Check that backend is running before starting frontend

## License

This is a lab assignment for Advanced Object-Oriented Programming course.
