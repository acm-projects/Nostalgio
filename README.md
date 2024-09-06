
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



## Milestones

<details closed>
  <summary>  <strong> Week 1: Setup ⚓ </strong> </summary>
  <br>

- General:
  - Assign roles for front-end and back-end development.
  - Discuss overall project scope, tech stack/options (React Native for frontend, AWS for backend)
  - Schedule meetings for weekly meetings
  - Start Low fidelity with everyone to get a vision of the app
- Frontend:
  - Start working on figma and be ready to show progress dev night
  - Learn React Native/Flutter and decide which you wanna work with
- Backend:
  - Research AWS and begin setting up your environment (AWS EC2, S3).
  - Start exploring database frameworks (e.g., MongoDB, DynamoDB).
  - Explore Spotify API

</details>
<details closed>
  <summary>  <strong> Week 1: Getting Started 🏃 </strong> </summary>
  <br>
  
- Frontend:
  - Figma design complete
  - Basic Routing: Implement initial routing in React Native to connect key screens.
- Backend:
  - Continue researching the AWS tech stack 
  - Database Schema: Design the DynamoDB schema to store user data, memories, and listening history.
  - Mapbox Integration: Begin researching how to integrate Mapbox into the app for location tracking.
  - Begin brainstorming and researching the music suggestion algorithm based on location and listening habits.

</details>

<details closed>
  <summary>  <strong> Week 3/4: Implementation 🤓 </strong> </summary>
  <br>

- General:
  - Team Sync: Regular check-ins to address any blockers, especially since the team is new to the tech stack.
- Frontend:
  - Core Pages: Begin coding key components such as the Memory Input Page, Map Visualization Page, and Music Suggestion Page.
  - Mapbox Integration: Start integrating Mapbox into the frontend to display user locations and memory markers.
- Backend:
  - Database Setup: Implement the DynamoDB schema, focusing on saving and retrieving user memories and listening data.
  - Spotify API Integration: Set up initial connections to the Spotify API to fetch user listening data.
  - Mapbox API: Set up backend logic to handle location data and pass it to the frontend.

</details>

<details closed>
  <summary>  <strong> Week 5/6: Key Features + Enhancements 🎵📊 </strong> </summary>
  <br>

- General:
  - Midway Review: Review progress, adjust goals if necessary, and ensure both frontend and backend are on track for integration.
- Frontend:
  - Memory Visualization: Enhance map visualization with memory markers, user journeys, and interaction features (comments, reactions).
  - Popular Songs Display: Implement UI to display popular songs and genres at specific locations.
- Backend:
  - Memory Logic: Finalize backend logic for saving and retrieving memories and associated music.
  - Real-Time Updates: Implement real-time updates for what other users have listened to at certain locations.
  - Music Suggestion Algorithm: Start developing the core algorithm for music suggestions based on user data and location.

</details>

<details closed>
  <summary>  <strong> Week 7/8: Integration & UI Enhancements 🎵🏁 </strong> </summary>
  <br>

- General:
  - Presentation Prep: Start preparing the presentation and demo, focusing on the key features and how they work together.
- Frontend:
  - UI Enhancements: Polish the UI and ensure smooth navigation between different pages.
  - Integration Testing: Begin testing the integration between frontend and backend, especially for features like memory saving, map visualization, and music suggestions.
- Backend:
  - Final Integration: Complete the integration of all APIs (Spotify, Mapbox) and ensure the backend is fully functional.
  - User Authentication: Finalize the user authentication flow and connect it with the database.
  - Music Suggestion Algorithm: Start developing the core algorithm for music suggestions based on user data and location.

</details>

<details closed>
  <summary>  <strong> Week 9/10: Final Touches & Presentation Prep 💪📢 </strong> </summary>
  <br>

- General:
  - Bug Fixes & Polish: Address any bugs, finalize UI/UX, and ensure the app is stable and ready for presentation.
  - Final Testing: Conduct thorough testing of all features, focusing on user journeys and the core algorithm.
  - Presentation: Prepare slides, script, and rehearse the demo. Ensure everyone is confident with their part of the presentation.

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
  - Backend: implement real-time updates of listening history of what other users have listened to at certain locations & ability to comment/react to it, Music suggesting algorithm based off of what the user has been listening to
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
  - [React Native](https://reactnative.dev/docs/environment-setup)
  - [DynamoDB](https://aws.amazon.com/dynamodb/) / [Firebase](https://firebase.google.com/docs/web/setup)
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

## Competition 🫢
* Spotify - even though they have recommended playlists, they not location based and don't have a feature to save these memories onto a map
* Shazam - Shazam identifies songs based on audio samples and offers a way to discover new music. It also has some location-based features that show popular songs in specific areas. But it 
  does not have the memory map 
  
## Meet the Team

Developers ⭐: 
* Sai Chauhan
* Izma	Khurram
* Andres Garcia Sanchez
* Shivansh Vaidhyanathan
* Sanjita Medishetty
      
Project Manager 🤺: Shraddha Subash

Industry Mentor 👔: Erik Rodriguez
