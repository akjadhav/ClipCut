# ClipCut

## Inspiration

As fans of films and being part of the generation that grew up with much of its video entertainment deriving from the internet, we were always drawn to video as a medium for personal expression. That being said, the industry has been hit with copious amounts of criticisms lately. While the public is currently aware of the mistreatment of entertainment employees with the actors' and writers' strikes, they are still vastly aware of the undercompensation, mistreatment, and overworking of the people behind the scene.

Though critics have been harsh on current CGI and editing choices, the truth is the crew behind the scenes is overloaded with vast amounts and work and are not given the proper amount of time to complete their projects. They are rushed and forced to push uncompleted work to make unrealistic quotas.

This is where ClipCut comes in. Clip cut efficiently automates the preprocessing of the film leaving the user with digestible clips anywhere to sections of the movies to significant scenes of the film. ClipCut allows users to take each segment one by one describing it with transcribable text gathered from the scenes themselves. Moreover, Clip also uses generative AI to assign each segment a tone metric to aid users with basic scene analysis.

## What it does

ClipCut brings the power to the editors of films from animation to feature films. The software automates the preprocessing of the film, so film crews can allocate more of their time to use their artful skills to craft a more beautiful film.

Our product does all of the busy work of the film maker such as background noise suppression and stabilization. It is also able to transcribe scenes of the film and use that transcribable data along with sentiment analysis to sense the tone of the scene for the editor to swiftly work in.

The program gathers these scenes and cuts and creates segments which can be contextualized and identified by the transcripted dialogue. As the program compartmentalized the piece the artist is able to gain further insight without wasting the time of manually browsing through a possible feature length film.

Overall, our product does the following…

1. Automated background noise suppression and stabilization
2. Automated scene detection and cutting
3. Generates individual clip transcriptions
4. Generates sentiment analysis on each individual clip transcription for clip mood summary

## How we built it

ClipCut was built using a ReactJS frontend. We used Python and FastAPI to build an API to serve requests from ClipCut’s frontend. Our Python API used OpenCV scene detection in the backend. This allowed us to have maximum flexibility while also retaining the strong feature-set that ClipCut has to offer.

Our system was built upon high-level machine learning libraries and services. We used many technologies such as ChatGPT, OpenAI Whisper, and OpenCV to construct the multiple functionalities within the app, such as full video transcription, scene detection and cutting, sentiment analysis, and background noise suppression/stabilization.

## Challenges we ran into

As we went about the project we had to pivot more times than we would’ve hoped. We know this first hand as ClipCut wasn’t even our first idea. We tried several different ideas before ClipCut, but each had their own difficulties - from available APIs to technical feasibility given the time constraints. After an hour or two, we settled on ClipCut.

However, it wasn’t all sunshine and roses once we started on ClipCut. Every idea is never perfect the first time around, and we are first hand witnesses. We tried to use IBM Watson’s Video Analysis API, but soon realized the API has been recently deprecated. We switched to Google Cloud Video Intelligence API suite for analysing, editing, and storage, but the results were not up to our standard. Though the product worked, we were expecting better segments and clearer transcriptions. The great search then continued again as we scoured the internet to find new services and APIs. We ended up writing these ourselves. Using various libraries, we build the majority of our processing algorithm to run on our own Fast API server.

## Accomplishments that we're proud of

We are extremely proud that we made the project completely end-to-end for our user base. The project has high ease of use for our users, and is scalable for any length of video/type. Another accomplishment was not only the end product but also the work getting there. Finding and testing new technologies is always long and tedious. However, once we were able to find those hard-to-find services and APIs, we were able to make significant progress. Finally getting a product that would work in tandem with our application was always a major accomplishment.

A more sentimental accomplishment was our ability to grow and know each other. Though we were all strangers that met barely a day ago, we were able to grow closer and also have fun in and outside the competition. It never felt like work or a menial task when working with each other, and we are very happy to say we are proud of our teamwork and friendship we have gained through this competition.

## What we learned

Throughout our time building our project, we learned a great deal. As all great program ideas, we strayed off plan. Though we wanted to use Google Cloud Video Intelligence API as a tool to handle most of our video recognition and editing, we soon realized it was just not possible. We did a lot of research and found various other APIs and services that suited our project better. Although we thought it would be more convenient to use a tightly packaged suite, we realized we were wrong, and we had to branch out for a better, more reliable product.

Additionally, even though we ended with a successful product, we actually took a really long time to come up with the idea. At first, we were on the sustainability track trying to use AI to make green spaces. Problems soon arose with the API we were working with, and it was clear it would be an insurmountable problem. To be completely honest, we were stuck for a while. However, we were determined to make a great project for the competition, and we realized we had to move on and have another idea to do so.

## What's next for ClipCut

As ClipCut evolves we want to help create a greater user experience. We were limited in time, and we were still able to push a full end-to-end product. That being said, we know we still have much to improve on. If the user has more ease to examine and choose their segments, it would lead to a much better product. Additionally, we hope to eventually create a more involved environment for creators to use our product to do some of the editing.

Creating a full editing software in addition to our efficient automation preprocessing would be the most ideal situation. Though we don’t know how far we will get, we would like to see the project grow more than just a preprocessing software. It would be amazing if we could expand to editing and post production in the future.

Software wise, we have many different systems working behind the scenes, and although we want to expand the project we still also want to improve our existing structure. One example of this is the sentiment analysis of our segments using dialogue. We tried to convey the tone of the scenes as best as possible, but of course, movies aren’t so cut and dry. We hope to create more specific metrics with the sentiment analysis over time to better suit our users.

[Check it on DevPost](https://devpost.com/software/clipcut)
