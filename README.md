                                                Netflix App

This basically is an application which works with two different APIs. The purpose of the same is to provide an update about the changes that take place in the Netflix media library.
When a user looks for movies or series on Netflix, they never get an update of this kind and what is more, the results shown to the user are customized for each individual. Moreover, there is no option for the user to be notified about which movies are coming into the platform and which ones are leaving the same.
The personalized algorithms work very well, but they do not necessarily reflect what a user might want to watch before it leaves the platform, or as soon as it enters it.

<img width="1278" alt="Screenshot 2019-11-25 at 18 30 59" src="https://user-images.githubusercontent.com/29626222/69665467-bff11300-108a-11ea-89fc-6d684e345762.png">

For the “What's new?” option, the user can enter the number of dates back he/she would like to see the updates for. The minimum is one date and the maximum is 60 days.

<img width="1277" alt="Screenshot 2019-11-25 at 18 31 10" src="https://user-images.githubusercontent.com/29626222/69665479-c2ec0380-108a-11ea-8174-2a1eba63d837.png">

Because there are two APIs involved the search might take a few seconds

<img width="1280" alt="Screenshot 2019-11-25 at 18 31 52" src="https://user-images.githubusercontent.com/29626222/69665523-da2af100-108a-11ea-835e-35696e79dfcf.png">

In case there are no updates for the selected dates, the following message is displayed:

<img width="1274" alt="Screenshot 2019-11-25 at 18 31 53" src="https://user-images.githubusercontent.com/29626222/69665524-da2af100-108a-11ea-828c-683d12572f80.png">

If there are actually results for the selected dates, the list of movies will be displayed in the form of cards, where on the front of the same, the name of the movie, movie poster, type of element (movie or series), genre, country of origin and year of release, is displayed.
If one scrolls the mouse on the cards, the back side is shown. There one can find the summary of the movie, the actors and the language of the same.

<img width="1274" alt="Screenshot 2019-11-25 at 18 32 47" src="https://user-images.githubusercontent.com/29626222/69665525-da2af100-108a-11ea-81ae-cf7b656fd376.png">

<img width="1280" alt="Screenshot 2019-11-25 at 18 32 48" src="https://user-images.githubusercontent.com/29626222/69665526-da2af100-108a-11ea-9686-a2907fe7f932.png">

As one can see, also the rating for the movie and a popcorn icon is displayed. The pop corn is partially covered based on how high the rating is. The higher the rating, the more one can see the popcorn icon.

As mentioned before, this application works based on two APIs. One which only provides the updates on Netflix, where the parameters provided by the user are applied, and a second one which searches for the rating for the elements provided by the first API. There are many elements from the first API which do not have an entry in the second secondAPI, because they work with two different data bases. The second API is one which gets the ratings from the already well known IMDb. It can also happen, that even though the entries exist in the IMDb, they do not have any user ratings yet. These entries could be filtered out as well, but given that it is the case for mostly non commercial movies, it is good to keep them available so people get a chance to at least know about them.

For the “Leaving” option, the user does not have the possibility to entere any parameters because the API itself does not allow them. This is because the items leaving the platform, seem to do it mostly in batches, where a group of items leave on groups after certain periods of time.

<img width="1279" alt="Screenshot 2019-11-25 at 18 33 29" src="https://user-images.githubusercontent.com/29626222/69665527-dac38780-108a-11ea-95ec-42ad2de5ba89.png">

The posters for the this part try to emulate the banner effect that one sometimes finds at movie theatres.

 <img width="1275" alt="Screenshot 2019-11-25 at 18 33 30" src="https://user-images.githubusercontent.com/29626222/69665528-dac38780-108a-11ea-9da8-52ff8cdca879.png">

The “New Seasons” section is similar to the first section, only that it specializes on new seasons for series only and therefore has less updated items than the general new items sections.

 <img width="1278" alt="Screenshot 2019-11-25 at 18 34 04" src="https://user-images.githubusercontent.com/29626222/69665529-dac38780-108a-11ea-83cf-33c634dd5a8a.png">

 <img width="1274" alt="Screenshot 2019-11-25 at 18 39 05" src="https://user-images.githubusercontent.com/29626222/69665530-dac38780-108a-11ea-9a48-ad3f823a1618.png">

Each card has a “Watch” button at the back of it:

 <img width="1280" alt="Screenshot 2019-11-25 at 18 39 10" src="https://user-images.githubusercontent.com/29626222/69665531-dac38780-108a-11ea-80f5-db2fbced202e.png">
 
 If one clicks on it, one is redirected to the Netflix website/application, where one actually watch the movie/series:

<img width="1278" alt="Screenshot 2019-11-25 at 18 39 15" src="https://user-images.githubusercontent.com/29626222/69665533-db5c1e00-108a-11ea-9d8c-2e85547fcdf7.png">
