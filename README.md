# OuttaTheBlues
### Sneak Attacks For Your Own Good

## Inspiration

As connected as today's world is, we're so obsessed with what others are up to that we barely take care of ourselves.
With the Fitbit, we require a level of diligence that doesn't fit with the average person nowadays, and hence we're taking up the challenge of overcoming **Complacency and maybe even Ignorance**.

It's real world vs the digital world !


## What it does
It's a chrome extension that keeps track of your health for you by analyzing pictures of just your face over a fixed interval. And since we're ignorant about it, it doesn't expect you to do anything but show up in front of your screen.

## How we built it
We took a research-based approach to this project and got all our facts right. Turns out your face is enough to calculate body mass index (BMI), so we leveraged that to keep track of you in your real life rather than your digital world.

## Challenges we ran into
We figured we'd build out a neural network for facial feature classification but the dataset MORPH-II was 99$!
Also, the research papers we read didn't openly explain how they calculated the BMI from the face, but only told us the facial features they extracted. So we figured out an algorithm to calculate a new index and that articulates the same features as the BMI and used it relatively as an identification.
We had also never used Azure and it's APIs before, so that was quite a steep learning curve.

To add to that, finding the additional coordinate points on a face such as 'cheek bone', 'jaw width' among others were defenitly challenging. 

Lastly, a lot of us thought it was pretty unethical for us to take photos without permission, but turns out the images aren't saved, they are only analyzed and the data points are saved. Plus, we're going to agree to some terms and conditions first. ;)

## Accomplishments that we're proud of
Normalizing the image from pitch yarn and roll using the trigonometry, vector algebra and coordinate geometry that we learned in school is by far the most accomplished we've felt in a long time.

We've managed to keep it Ethical and maintained privacy dispite all odds! Your data stays with YOU.


## What we learned
It's better than a FitBit.

## What's next for OuttaTheBlues
OuttaTheBlues just identifies possible symptoms for depression, anxiety among other possible issues that our generation faces. The next step would be to tackle them with a little more work on getting perfect indexes and maybe even get our hands on the MORPH-II dataset to validate our finds. ;)
