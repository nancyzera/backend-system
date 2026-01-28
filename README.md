# Student Course Registration System (Backend)

## System Overview (Task 1)
A Node.js backend using Express and MySQL/MariaDB to handle student registrations and course enrollments for a TVET institution.

## Data Flow (Task 5)
1. **Client**: Sends HTTP requests (GET/POST) via Browser or Postman.
2. **Server**: Node.js/Express processes logic and interacts with the database using the `mysql2` driver.
3. **Database**: MariaDB stores data in `students`, `courses`, and `enrollments` tables.
   erDiagram
    STUDENTS ||--o{ ENROLLMENTS : "registers"
    COURSES ||--o{ ENROLLMENTS : "contains"
    
    STUDENTS {
        int id PK
        string name
        string email UK
    }
    COURSES {
        int id PK
        string course_name
        int credits
    }
    ENROLLMENTS {
        int id PK
        int student_id FK
        int course_id FK
        timestamp enrollment_date
    }



## Challenges & Solutions
- **Terminal Paths**: Fixed the "mysql command not found" by using the absolute path to XAMPP.
- **Git Branching**: Resolved the local `master` vs remote `main` conflict by renaming the branch.
- **Dependencies**: Managed `node_modules` size by implementing a `.gitignore` file.
