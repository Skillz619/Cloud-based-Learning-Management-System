## Cloud Based Learning Management System


An overview of the project structure. For example:

- `backend/`: Contains the backend code.
- `frontend/`: Contains the frontend code.
- `Diagrams/`: Contains diagrams related to the project.



# **Starting the Backend**
```
cd backend
npm start
```

# **Starting the Frontend**
```
cd frontend
npm start
```

# **Tech Stack**
**Frontend:** React JS

**Backend:** Node JS

**Database:** MongoDB Atlas

**Cloud :** AWS cloud - Deployed via EC2 with Load balancing(ALB) and ALG.

# Design Choices

## Backend Development

### Backend Schemas and Routes

- Implemented robust backend schemas and routes for essential entities such as students, faculty, admin, assignments, announcements, quizzes, grades. This ensures a well-structured and organized data flow within the application.

### Scalability through Deployment

- Opted for EC2 with Load Balancing during deployment, ensuring scalability and reliability. This choice enables the application to efficiently handle varying loads, distributing traffic across multiple instances for improved performance.

### Database Choice

- Utilized MongoDB Atlas as the database solution. MongoDB's NoSQL architecture provides flexibility in handling diverse data types, facilitating efficient storage and retrieval of complex data structures relevant to the project.

### Authentication and Authorization

- Implemented JSON Web Token (JWT) based authentication for secure user sessions and authorization. JWTs provide a stateless approach to authentication, enhancing scalability and security.
- Utilized industry-standard bcrypt library for hashing and salting user passwords before storage, ensuring robust protection against brute-force attacks.

### Code Structure and Organization

- Followed a modular approach by separating concerns into different modules (e.g., controllers, services, models), promoting code reusability, maintainability, and testability.
- Leveraged middleware functions for common operations like error handling, request validation, and logging, improving code organization and consistency.

### API Design and Documentation

- Designed a RESTful API adhering to best practices, ensuring a consistent and intuitive interface for client-side interactions.
- Documented the API using tools like Swagger or Postman, providing clear and comprehensive information for developers to understand and consume the API effectively.


**Frontend Architecture and User Interface Design:**

1. **Comprehensive Frontend Architecture:**
   - Designed a comprehensive frontend architecture that encompasses key user interfaces, including the home page,creating subjects, posting quizzes, grading student, viewing grades. This design choice ensures a cohesive and seamless user experience.

2. **User-Focused UI Design:**
   - Prioritized user experience by focusing on user interfaces such as sign-up, login, and intuitive navigation across key pages. This design approach enhances user engagement and satisfaction.

3. **Documentation and Diagrams:**
   - Included detailed diagrams and a README file as part of the frontend architecture. This documentation provides clarity to developers and stakeholders, aiding in understanding the project's structure and facilitating smoother collaboration.

4. **Integrated Frontend with Backend:**
   - Integrated frontend components seamlessly with the backend, ensuring a cohesive and responsive application. This design choice enhances data flow and interaction between different layers of the application.


# **XP Values**

1. **Communication:**
   - Implemented a diverse set of communication channels, including weekly Zoom and WhatsApp status calls, supplemented by a dedicated collaboration platform (e.g., Slack or Microsoft Teams). This multi-channel approach facilitated real-time communication, quick updates, and dynamic discussions, fostering a more connected and agile development environment.

2. **Feedback:**
   - Instituted iterative review sessions at key development milestones, beyond regular status updates. Utilizing collaborative tools like Zoom and shared documents, these sessions allowed for real-time feedback from team members and stakeholders. This iterative feedback approach ensured swift adjustments, promoting a responsive and user-focused development cycle.

# **UI WIRE FRAMES**
[LMSWireframe Diagrams.pdf](https://github.com/gopinathsjsu/teamprojectsection-01-cmpe202-tuesday-kinetic_spring/blob/0808d8673349199cbbd294c2f01fe11d711a4a86/Diagrams/Frontend/LMSWireframe%20Diagrams.pdf)



# **Features Set**


1. **User Authentication and Role-Based Access Control**:
   Implemented a secure user authentication system that allows Faculty, Students, and Admins to log in securely. Use role-based access control to enforce different levels of permissions and access privileges based on user roles. This ensures that each user can only access functionalities and information relevant to their role within the LMS.

2. **Homepage Customization Based on User Role**:
   Customize the homepage of the LMS based on the logged-in user's role. Faculty members should see a dashboard displaying courses they are teaching across different semesters, along with options to manage course content and grading. Students should see a list of their enrolled courses, upcoming assignments, and grades. Admins have access to course management tools and administrative functions.


3. **Course Management for Faculty**:
   Provide Faculty members with comprehensive course management tools to view, add, edit, and organize courses across different semesters. This includes the ability to upload course materials, set assignments and quizzes, post announcements, and manage student enrollment.

4. **Course Enrollment and Assignment Management**:
   Implement features for course enrollment, allowing Students to browse available courses and enroll in them. Admins should have the capability to assign Faculty members to teach specific courses for upcoming semesters, managing course allocations efficiently within the system.



5. **Content Management**:
   Enable Faculty to manage course content effectively by providing tools to upload, organize, and update course materials such as lectures, readings, and multimedia resources. Students should have access to view and download published course content, including assignments, quizzes, and supplementary materials.

6. **Grading System**:
   Develop a robust grading system that allows Faculty to evaluate and assign grades for student submissions. Provide a user-friendly interface for Faculty to input grades, provide feedback, and communicate assessment results to students. Students should be able to view their grades and feedback for each course they are enrolled in.

7. **Profile Management**:
   Offer users (Faculty, Students) have the ability to manage their profile information within the LMS. This includes updating personal details, contact information, and notification preferences to tailor their LMS experience according to individual preferences.

8. **Announcements and Communication Tools**:
   Implement features for Faculty to post announcements and communicate important updates to students within each course. Include messaging or notification functionalities to facilitate effective communication between Faculty and students regarding course-related matters.


9. **Assignment and Quiz Management**:
    Allow Faculty to create, manage, and distribute assignments and quizzes within the LMS. Students should be able to access assigned tasks, submit their work online, and receive automated feedback or grades based on Faculty evaluations.


10. **RESTful API Development**:
    Build RESTful APIs to support various LMS functionalities, allowing seamless integration with the front-end user interfaces (UIs) and facilitating data exchange between different components of the system. Ensure APIs are well-documented, secure, and efficient in handling requests and responses.

11. **Cloud Deployment**:
    Deploy the LMS backend (including APIs and database) on a cloud platform such as AWS (Amazon Web Services) to ensure scalability, reliability, and accessibility. Utilize auto-scaling features and load balancers to handle varying levels of user traffic and ensure high availability of the application.



12. **Responsive UI Design and Wireframes**:
    Create intuitive and responsive user interfaces (UIs) for the LMS, ensuring optimal user experience across devices (desktops, tablets, mobile phones). Develop wireframes and design mockups for key screens (e.g., course dashboard, profile settings) to visualize user interactions and navigation paths within the application.

# **USE CASE Diagram**

![Use Case Diagram.jpeg](https://github.com/gopinathsjsu/teamprojectsection-01-cmpe202-tuesday-kinetic_spring/blob/0808d8673349199cbbd294c2f01fe11d711a4a86/Diagrams/Backend/Use%20Case%20diagram.jpeg)


# **DEPLOYMENT DIAGRAM**
![DeploymentDiagram.png](https://github.com/gopinathsjsu/teamprojectsection-01-cmpe202-tuesday-kinetic_spring/blob/7fdc35c16ace4423dcfdc9a41a3c5b3bdc6211e9/Diagrams/Backend/DeploymentDiagram.png)


# **COMPONENT DIAGRAM**
![componenet diagram](https://github.com/gopinathsjsu/teamprojectsection-01-cmpe202-tuesday-kinetic_spring/assets/160942470/833c6dce-a893-44d6-83d3-ffc1cf8f5494)


# **ARCHITECTURE DIAGRAM**
![Architecture Diagram](https://github.com/gopinathsjsu/teamprojectsection-01-cmpe202-tuesday-kinetic_spring/assets/160942470/538a80b2-22fa-4e77-a499-690656217502)


