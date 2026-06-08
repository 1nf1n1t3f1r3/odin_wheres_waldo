# README

Repo for The Odin Project's 'Where's Waldo' assignment.
https://www.theodinproject.com/lessons/react-new-where-s-waldo-a-photo-tagging-app

## Summary

It works with React on the Frontend and Rails on the Backend. When clicking a location, React sends the relative coordinates to the Rails DB, and Rails will check if Waldo (or the other characters) are there. If they are, Rails will inform React and thus the user. Once Rails confirms all are found, it stores the time since opening the page and that moment. The user can choose to enter it on the leaderboards, along with a name.

## Difference with my Version

My version doesn't require typing the a character's name when finding them; clicking is sufficient and typing is clunky UX, in my opinion.

## Assignment:

Think about what you’ll need to do to get this all working together. This is where it’s really helpful to think it completely through on paper or a whiteboard ahead of time! A few minutes of thought can save you from wasting an hour on coding.
Build the front end functionality without actually using any calls to the back end yet. Specifically, create the functionality that pops the targeting box and dropdown menu on the screen when the user clicks on the photo and removes it when the user clicks away.
Now hook up the functionality for validating with your backend whether or not the user has clicked the right place for the character they selected from the dropdown. Note: Depending on how you are getting the coordinates of a user’s clicks, different screen sizes may produce different coordinates. This could cause your app to record coordinates properly on a large screensize, but not smaller ones. Knowing this, you may need to implement methods to your click logic that will normalize coordinates across different screensizes.
Tie it into your frontend so you can seamlessly select characters, validate them, and place the appropriate markers on the map if the selection was correct.
Add in the ability to time the user from when they first load the page and then display their “score” (time) when they successfully identify all characters. Create a popup that asks them to enter their name for the high scores table if they have earned it.
Play with it!
Push your solution to GitHub and deploy it to any of the hosting options. Additionally, submit your solutions below. This is a serious project, congratulations!
Extra credit
Load many images into your database and allow the user to select from among them before starting the game.

## Thoughts on the Building Process

Finding Waldo wasn't even the hardest part of the assignment! Though, to be fair, I did wound up using only maps where I could find the answers online. There are more Where's Waldo maps than just these two, but two demonstrate the concept well enough.

### Frontend: Waldo & Mouse

Building the Front-End was recommended to do first, so I did. At first it was a simple one-page app, with some components to hold the image and the characters that needed to be found. Every character goes in React state with an {} object, holding its coords. The Mouse is also in state, and uses the imageRef to see where it is. imageRef lets us convert actual coords to percentage coords. At that point, we only need to compare coords to the character data and check off the character.

### Frontend: Found Character

In order to keep score in the front-end we use a startTimeRef, then when a character is found, we detract it from the current time. It didn't feel quite right to not get feedback while clicking Waldo. With the character panels at the bottom of the screen, you wouldn't see that you found anything, so there's little notification to tell you you found it. I don't really know why, but I wanted to put the notification directly on top of the coords of the character's state, rather than the coords where the user clicked. That was an unnecessary pain, so I eventually just took the mouseCoords. When the user finds something, React will display a notification with the {notification && (...)} pattern with absolute position and the mouseCoords. It'll disappear after a set time based on a notificationTimerRef. When all characters are found, there's a slightly different one to let the user know.

### Backend: Swapping Parts

To put this 'safely' on the back-end, there's a model for Maps, which owns the models Characters and Scores (so we can have more than 1 map). Coord data moves from React State to seeds.rb. The validate_click logic gets moved to the characters_controller. At this point the code was a total mess so it was time to clean it up a little. With everything modularized, just the click needed to get swapped out. Now it's a try POST (JSON) request for the backend that checks if it's there; the answers no longer hiddden in the DOM.

### Backend: Map Controller

Up to this point, everything had been only one map, but it was time to add another. 'Home' now became a level selector and GameArena is where the actual game is played. I also added a slug to find them by URL. I forgot about Rails incrementing the ID of the map when I reseeded the DB, so I spent a little too long being confused about why my IDs didn't work anymore.

### Backend: Score Keeping

Obviously, we also can't trust the user to not cheat with their own times. So, the MapsController, on its show function, immediately starts the timer on the backend, which is what's used for the scoring now, and that gets passsed to ScoresController. The user can upload their score by a JSON Post request, adding their name and mapID to store it in the DB. React will render the top 10 scores on the DB.

Upload to Render + Neon and done!
