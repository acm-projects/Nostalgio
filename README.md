
<p align="center">
  <img src="https://github.com/acm-projects/Nostalgio/blob/main/listening-to-music-spongebob.gif"/>
</p>

# <h1 align="center">Nostalgio</h1>

<p align="center">
Nostalgio is an app that captures your listening and travel habits to make your travel and music experiences memorable. By linking to your Spotify account, it uses your listening patterns and data on what others have listened to at the same location to predict and recommend music you might enjoy. Nostalgio enhances your daily life and travel experiences by creating a musical map of your journeys, turning ordinary moments into memorable ones with personalized, location-specific music.
</p>

## MVP (Minimum Viable Product)


* User account with user authentication
* Memory saving (Allows users to save a list of songs attributed to a location)
* Memory map visualization (A map that depicts locations traveled and its associated memories & songs over time)
* Spotify integration to create playlists from these memories
* Music suggestion based off of previous travel and listening habits
* Track and display songs listened to by friends on map. (Can comment/react)
  



## Stretch Goals

* Audio recognition: recognizes songs in the area and adds it to your memories for that location.
* Augmented Reality (AR) integration (AR trails that guide users through a city or location with music suggestions popping up at different spots. As users walk along the trail, they can experience the music history associated with each landmark.)



<details> <summary>**Week 1: Set Up :rocket:**</summary>
General:
Discuss with the team who is handling frontend/backend and the overall project/tech stack.
Set up communication channels, environments, and scheduling tools (e.g., WhenToMeet). 📆
Go over GitHub basics and establish a repository structure.
Begin brainstorming the key features and user flow of the app.
Backend:
Start researching AWS services and relevant frameworks.
Discuss how to structure the database to handle location-based music data.
Frontend:
Create a Figma account and start working on UI designs 🎨.
Focus on low-fidelity wireframes for key app screens.
</details> <details> <summary>**Week 2: Starting Out ⭐**</summary>
Frontend:
Continue working on Figma designs, transitioning from low-fidelity to high-fidelity mockups.
Learn React Native basics and explore MapBox documentation for location services integration.
Backend:
Begin setting up the User Authentication and Database structure. Aim to have a basic working prototype by the end of the week.
Start exploring Spotify’s API for potential integration points.
</details> <details> <summary>**Week 3: Initial Coding ⚙️**</summary>
Frontend:
Start implementing pages and routing. Suggested pages to focus on:
Profile Page: Features finalized in Week 1.
Memory Map Page: Begin integrating MapBox for location-based memory visualization.
Community/Stats Page: Display user interactions and app statistics.
Ensure the basic map display is functional by the end of the week.
Backend:
Design and implement the database schema that will store location, music data, and user interactions.
Start developing the location-based music suggestion algorithm, focusing on gathering data from Spotify and other sources.
Integrate Spotify API and begin storing relevant data in the database.
</details> <details> <summary>**Weeks 4 & 5: Feature Development 🛠️**</summary>
Frontend:
Continue refining and implementing frontend components:
Home Page: Start integrating key UI components, ensuring consistency with the Figma designs.
Memory Map Page: Enhance the interaction with the map, allowing users to view and save music memories.
Music Suggestion Page: Display suggested tracks based on the user's current or saved locations.
Work on responsive design and cross-platform compatibility.
Backend:
Finalize the music suggestion algorithm, ensuring it accurately suggests tracks based on the user’s location history.
Develop endpoints for location and music data retrieval, allowing the frontend to query the database efficiently.
Begin connecting the frontend with backend services, testing data flow between them.
</details> <details> <summary>**Weeks 6 & 7: Integration & Testing 🔄**</summary>
Frontend:
Continue polishing the frontend, focusing on the user experience.
Start integrating backend services into the app, ensuring smooth data retrieval and display.
Work on user interaction elements, such as saving memories, and viewing suggestions.
Backend:
Complete the implementation of the suggestion algorithm and optimize it for performance.
Ensure robust data validation and error handling in the backend services.
Begin stress testing the system with simulated user data and load scenarios.
General:
The frontend and backend teams should work closely to ensure all components are communicating correctly.
Start writing unit tests and integration tests for critical components.
</details> <details> <summary>**Weeks 8 & 9: Final Touches & Optimization 🚧**</summary>
Frontend:
Finalize all UI components and ensure consistency across the app.
Conduct usability testing to identify any user experience issues.
Work on any remaining features and polish the overall design.
Backend:
Optimize database queries and backend services for faster response times.
Ensure the suggestion algorithm is fine-tuned and producing accurate recommendations.
Finalize all APIs and ensure they are well-documented for future reference.
</details> <details> <summary>**Week 10: Pre-Launch & Presentation Preparation 🎉**</summary>
General:
Conduct a full system test to ensure everything is working as expected.
Fix any last-minute bugs and issues.
Prepare presentation materials, including slides and a demo video.
Rehearse the presentation and demo to ensure smooth delivery.
</details>














<details>
  
**<summary>Week 1: Set Up :rocket:</summary>**

#### General:
- Discuss with the team who’s frontend/backend and the overall project/tech stack
- Set up communication, environments, and WhenToMeet(Link available in doc) 📆
- Go over GitHub basics
- Low Fidelity with everyone

#### Backend:
- Start looking into AWS and frameworks
#### Frontend:
- Create a Figma account and start working on UI designs 🎨

<br>
</details>

<details>
**<summary>Week 2: Starting Out ⭐</summary>**

#### Frontend:
  - Learn React Native + Look at MapBox Documentation
  - Finish up the Figma Design by the end of this week

#### Backend:
- Start setting up the User Authentication and the Database. Have a working     
  prototype by the end of the 2nd week
- Keep doing research with the AWS Tech Stack
- Spotify Integration: Begin exploring Spotify’s API for potential integration   
  points

<br>
</details>

<details>
**<summary>Week 3: Coding ⚙️</summary>**

#### Frontend:
  - Start implementing pages/routing. Suggested Pages:
      - Profile Page (Features Hashed out Week 1)
      - Mind Map Page (Features Hashed out Week 1)
      - Community/Stats Page (Features Hashed out Week 1)
  - Have basic map display set up

#### Backend:
- Location-Music suggesting algorithm
- Database schema 
- 

<br>
</details>



- Week 1: Assign Roles & Set Up
- Week 2: Wireframing & Research
- Week 3: Start Implementation
  - Frontend: start coding basic template of front-end pages/routing in React Native
  - Backend: Database set up & API integration
- Week 4: Implementing Memory Features/Logic
  - Frontend: code memory input components & map features with Mapbox
  - Backend: code backend logic for saving & retrieving memories
- Week 5/6: Map Visualization & Enhancements | Music Suggestions & Popular Songs 
  - Frontend: implement markers for user journeys/enhance map details, ability to comment/react on other user’s updates, display popular song choices (could be top 5 songs, top 5 genres, up      to participants → some kind of public listening data)
  - Backend: implement real-time updates of listening history of what other users have listened to at certain locations & ability to comment/react to it, Music suggesting algorithm based off     of what the user has been listening to
- Week 7/8: Continue progress on Music Suggesting & UI Enhancements & User Auth, Presentation prep, Final Touches
- Week 9/10: Presentation Clean up & Final Touches


## Tech Stack
* Wireframing: Figma
* IDE: VSC
* Frontend: [React Native](https://reactnative.dev/) with [MapBox Gl](https://docs.mapbox.com/help/glossary/maps-sdk-for-react-native/)
  * React Native is a cross compatible framework that paired with expo allows you to bring your apps to life while in development phases
  * MapBox is a community-maintained React Native library that provides reusable JavaScript components for integrating Mapbox maps into iOS and Android apps.
* Backend: [AWS Lambda](https://www.serverless.com/aws-lambda), [DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)/[S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) Or [Firebase/Firestore](https://firebase.google.com/docs/firestore), [Spotify API](https://developer.spotify.com/documentation/web-api), [MapBox API](https://docs.mapbox.com/api/overview/)
  * AWS Lambda is a compute service that runs your code in response to events and automatically manages the compute resources
  * DynamoDB and S3 continue with the fully AWS approach however, Firebase/Firestore work great as needed
* User Authentication: [Firebase / React Native Authentication](https://rnfirebase.io/auth/usage) or [Auth0](https://auth0.com/docs)

## Software to Install
  - [Visual Studio Code](https://code.visualstudio.com/)
  - [Figma](https://www.figma.com/downloads/)
  - [React Native](https://reactnative.dev/docs/environment-setup)
  - [Firebase](https://firebase.google.com/docs/web/setup)
  - [DynamoDB](https://aws.amazon.com/dynamodb/)
  - [Node](https://nodejs.org/en/)
  - [Express](https://expressjs.com/)
  - [Git](https://git-scm.com/downloads)

## Tutorials and Resources  
  **General**
  - [Success in ACM Projects](https://docs.google.com/document/d/18Zi3DrKG5e6g5Bojr8iqxIu6VIGl86YBSFlsnJnlM88/edit#heading=h.ky82xv3vtbpi)
  - [API Crash Course w/ timestamps](https://www.youtube.com/watch?v=GZvSYJDk-us)
  - [GitHub Cheat Sheet #1](https://education.github.com/git-cheat-sheet-education.pdf)
  - [GitHub Cheat Sheet #2](https://drive.google.com/file/d/1OddwoSvNJ3dQuEBw3RERieMXmOicif9_/view)
  
  **Front-end**
  - [Introduction to Wireframing in Figma](https://www.youtube.com/watch?v=6t_dYhXyYjI)
  - [React Native Crash Course](https://www.youtube.com/watch?v=w7ejDZ8SWv8)
  - [27 Best UI/UX Practices](https://729solutions.com/ux-ui-best-practices/)
  - [MapBox Tutorial](https://www.youtube.com/watch?v=JJatzkPcmoI)
  - [Building Maps in React Native](https://medium.com/@mshuecodev/building-maps-in-react-native-with-mapbox-a-step-by-step-tutorial-6491f2190db9)
  
  **Back-end**
  - [Node.js Crash Course](https://www.youtube.com/watch?v=zb3Qk8SG5Ms&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU)
  - [Express & Node Intro](https://youtu.be/jivyItmsu18?si=YbLWhSxKg1C44Qht)
  - [DynamoDB & React Native](https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/build-a-serverless-react-native-mobile-app-by-using-aws-amplify.html)
  - [AWS Lambda & React Native](https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/build-a-serverless-react-native-mobile-app-by-using-aws-amplify.html)
  - [AWS S3 & React Native](https://jaka-tertinek.medium.com/upload-files-from-react-native-app-to-aws-s3-3d3cb85e9d4)
  - [Firebase / React Native Authentication Tutorial](https://www.youtube.com/watch?v=ONAVmsGW6-M)

## Git Commands

| Command                       | What it does                        |
| ----------------------------- | ----------------------------------- |
| git branch                    | lists all the branches              |
| git branch "branch name"      | makes a new branch                  |
| git checkout "branch name"    | switches to speicified branch       |
| git checkout -b "branch name" | combines the previous 2 commands    |
| git add .                     | finds all changed files             |
| git commit -m "Testing123"    | commit with a message               |
| git push origin "branch"      | push to branch                      |
| git pull origin "branch"      | pull updates from a specific branch |
  
  ## Meet the Team

 * Frontend
   * 

* Backend
  * 
      
* Project Manager: Shraddha Subash
  
* Industry Mentor: Erik Rodriguez
