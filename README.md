<div align="center">
  <img src="https://github.com/acm-projects/Nostalgio/blob/main/listening-to-music-spongebob.gif" alt="Listening to Music GIF">
<div/>
<p align="center">
  <img src="https://github.com/user-attachments/assets/f8d01aaf-9331-4053-9566-cbb3b495574d.gif"/>
</p>

# <h1 align="center">Nostalgio</h1>

<p align="center">
Nostalgio is an app that captures your listening and travel habits to make your travel and music experiences memorable. By linking to your Spotify account, it uses your listening patterns and data on what others have listened to at the same location to predict and recommend music you might enjoy. Nostalgio enhances your daily life and travel experiences by creating a musical map of your journeys, turning ordinary moments into memorable ones with personalized, location-specific music.
</p>

<!-- Left-align the following content -->
<div style="text-align: left;">
  <p>
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
  
  - Week 1: Assign Roles & Set Up
  - Week 2: Wireframing & Research
  - Week 3: Start Implementation
    - Frontend: start coding basic template of front-end pages/routing in React Native
    - Backend: Database set up & API integration
  - Week 4: Implementing Memory Features/Logic
    - Frontend: code memory input components & map features with Mapbox
    - Backend: code backend logic for saving & retrieving memories
  - Week 5/6: Map Visualization & Enhancements | Music Suggestions & Popular Songs 
    - Frontend: implement markers for user journeys/enhance map details, ability to comment/react on other user’s updates, display popular song choices (could be top 5 songs, top 5 genres, up to participants → some kind of public listening data)
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
</div>
  ## Meet the Team

 * Frontend
   * 

* Backend
  * 
      
* Project Manager: Shraddha Subash
  
* Industry Mentor: Erik Rodriguez
