# Support_ticket_management_system
This project is a scalable, real-world backend system designed to streamline support workflows through automation. It leverages a decoupled architecture with a robust REST API and a dynamic React frontend.
Key Features & Technical Implementation:
Automated Classification: Implements logic to automatically categorize and assign one of four priority levels to incoming tickets.
Robust Backend: Powered by Django REST Framework, featuring 6+ custom endpoints for ticket lifecycle management, filtering, and updates.
Dynamic Frontend: Built with React using functional components and Hooks (useState, useEffect) for real-time UI synchronization.
Data Integrity: Utilizes PostgreSQL with a complex schema of 6+ relational tables managed via Django ORM.
DevOps Ready: Fully containerized environment using Docker and Docker Compose, ensuring seamless deployment across frontend, backend, and database services.



This project is fully containerized to ensure a consistent development environment. Follow these steps to get the system running locally.
Prerequisites
Ensure you have the following installed:
Docker Desktop (or Docker Engine on Linux) Docker Compose 

Installation & Setup
Clone the Repository:
git clone https://github.com/guptaprashant931-boop/ai-ticket-management.git
cd ai-ticket-management

Environment Configuration:
Create a .env file in the root directory and add your database credentials for PostgreSQL:
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=db
DB_PORT=5432

Build and Run the Containers:
Use Docker Compose to build the images and start the services (Backend, Frontend, and Database):Bashdocker-compose up --build
Apply Database Migrations:
Once the containers are running, initialize your Django ORM models:
docker-compose exec backend python manage.py migrate

Access the Application:
Frontend: http://localhost:3000
Backend API: http://localhost:8000/api/ 
