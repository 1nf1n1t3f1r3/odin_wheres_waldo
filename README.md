# README

Repo for The Odin Project's 'Where's Waldo' assignment.
https://www.theodinproject.com/lessons/react-new-where-s-waldo-a-photo-tagging-app

It works with React on the Frontend and Rails on the Backend. When clicking a location, React sends the relative coordinates to the Rails DB, and Rails will check if Waldo (or the other characters) are there. If they are, Rails will inform React and thus the user. Once Rails confirms all are found, it stores the time since opening the page and that moment. The user can choose to enter it on the leaderboards, along with a name.

My version doesn't require typing the a character's name when finding them; clicking is sufficient and typing is clunky UX, in my opinion.

Assignment:
Think about what you’ll need to do to get this all working together. This is where it’s really helpful to think it completely through on paper or a whiteboard ahead of time! A few minutes of thought can save you from wasting an hour on coding.
Build the front end functionality without actually using any calls to the back end yet. Specifically, create the functionality that pops the targeting box and dropdown menu on the screen when the user clicks on the photo and removes it when the user clicks away.
Now hook up the functionality for validating with your backend whether or not the user has clicked the right place for the character they selected from the dropdown. Note: Depending on how you are getting the coordinates of a user’s clicks, different screen sizes may produce different coordinates. This could cause your app to record coordinates properly on a large screensize, but not smaller ones. Knowing this, you may need to implement methods to your click logic that will normalize coordinates across different screensizes.
Tie it into your frontend so you can seamlessly select characters, validate them, and place the appropriate markers on the map if the selection was correct.
Add in the ability to time the user from when they first load the page and then display their “score” (time) when they successfully identify all characters. Create a popup that asks them to enter their name for the high scores table if they have earned it.
Play with it!
Push your solution to GitHub and deploy it to any of the hosting options. Additionally, submit your solutions below. This is a serious project, congratulations!
Extra credit
Load many images into your database and allow the user to select from among them before starting the game.
