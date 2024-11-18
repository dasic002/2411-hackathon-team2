# Testing

We have tested the application using using a manual testing strategy approach. We used a google sheet to create and structure the tests, and to keep track of the test cases.

_Go back to [README.md](README.md)_

## Table of Content

- [Testing](#testing)
  - [Table of Content](#table-of-content)
  - [Basic Functionality](#basic-functionality)
    - [Results](#results)
  - [HTML Validator](#html-validator)
    - [Results](#results-1)
  - [CSS Validator](#css-validator)
    - [Results](#results-2)
  - [User Stories](#user-stories)
    - [Results](#results-3)
  - [Compatibility](#compatibility)
    - [Results](#results-4)
  - [Responsiveness](#responsiveness)
    - [Results](#results-5)
  - [Accessibility](#accessibility)
    - [Results](#results-6)
  - [Performance](#performance)
    - [Results](#results-7)

## Basic Functionality

First, we tested the basic functionality of each page, including all links and navigation elements.

#### Results

| Test Case | Test Case Description                          | Expected Result                                                                                                                                                                                                                                        | Pass / Fail |
| --------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| TC01      | Validate each Link in the Top Navigation       | 1. Page should load<br>2. FAQ page loads<br>3. Teams page loads                                                                                                                                                                                        | PASS        |
| TC02      | Validate each Link in the Footer               | 1. Page should load<br>2. All social media links should open to relevant external links in new window<br>3. Contact Us link should open Contact Us / Teams page                                                                                        | PASS        |
| TC03      | Validate each link in Contact Us/Meet the Team | 1. Page should load<br>2. Link to Linkedin profiles for each team member should load in separate window <br>3. Link to github repositories for each team member should load in separate window <br>4. Home page should load<br>5. FAQ page should load | PASS        |
| TC04      | Validate each link in FAQ                      | 1. Page should load<br>2. Link to The Lighthouse Guild should open in a separate window<br>3. Link to Royal National Institute of Blind People should open in a separate window<br>4. Home page should load<br>5. Teams page should load               | PASS        |

---

## HTML Validator

We then tested the validation of each page using the [W3 HTML Validation Tool](https://validator.w3.org/)

#### Results

| Test Case | Test Case Description            | Expected Result                                                                                                                         | Pass / Fail |
| --------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| TC01      | Home page passes HTML validator  | 1. Navigate to the HTML Validator <br>2. Copy the link of the Home Page or validate by copy+paste its html<br>3. Verify that it passes  | FAIL        |
| TC02      | Teams page passes HTML validator | 1. Navigate to the HTML Validator <br>2. Copy the link of the Teams Page or validate by copy+paste its html<br>3. Verify that it passes | PASS        |
| TC03      | FAQ page passes HTML validator   | 1. Navigate to the HTML Validator <br>2. Copy the link of the FAQ Page or validate by copy+paste its html<br>3. Verify that it passes   | PASS        |

---

## CSS Validator

We then tested the validation of each page using the [W3 Jigsaw CSS Validation Tool](https://jigsaw.w3.org/css-validator/)

#### Results

| Test Case | Test Case Description                  | Expected Result                                                                                                                               | Pass / Fail |
| --------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| TC01      | Home page passes CSS Jigsaw validator  | 1. Navigate to the CSS Jigsaw Validator <br>2. Copy the link of the Home Page or validate by copy+paste its html<br>3. Verify that it passes  | PASS        |
| TC02      | Teams page passes CSS Jigsaw validator | 1. Navigate to the CSS Jigsaw Validator <br>2. Copy the link of the Teams Page or validate by copy+paste its html<br>3. Verify that it passes | PASS        |
| TC03      | FAQ page passes CSS Jigsaw validator   | 1. Navigate to the CSS Jigsaw Validator <br>2. Copy the link of the FAQ Page or validate by copy+paste its html<br>3. Verify that it passes   | PASS        |

---

## User Stories

We then tested each user story that we have created at the beginning of the current iteration.

#### Results

| Test Case | Test Case Description                                                                                                                                                                    | Expected Result                                                                                                                                                                               | Pass / Fail |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| TC01      | As a user, I want to see current weather information for my location                                                                                                                     | The user can access the weather of his location when opening the app.                                                                                                                         | PASS        |
| TC02      | As a user with visual impairments, I want to hear the weather information read aloud                                                                                                     | The user can start or pause by clicking a button or using keyboard to listen to the weather                                                                                                   | PASS        |
| TC03      | As a user, I want to browse latest news articles                                                                                                                                         | The user can browse through the most recent articles and news headlines                                                                                                                       | PASS        |
| TC04      | As a user, I want to hear news headlines and content read aloud                                                                                                                          | The user can start or pause the lecture thanks to a button                                                                                                                                    | PASS        |
| TC05      | As a visually impaired user, I want to use keyboard shortcuts to navigate the website, so that I can easily move between sections without needing a mouse.                               | Navigating through a website with a keyboard uses the TAB key to move forward and the SHIFT+TAB combination to move backwards.                                                                | PASS        |
| TC06      | As a developer, I want to implement semantic HTML and ARIA roles, so that screen readers can accurately interpret and navigate the page content.                                         | Maintain a clear and simple structure to make your HTML document easy to read and understand. Use semantic tags to enhance accessibility for screen readers and other assistive technologies. | PASS        |
| TC07      | As a user, I want the site to function seamlessly on all device sizes, so that I have a consistent experience, whether on a mobile device or desktop.                                    | 1. Open the deployed site on a mobile phone<br>2. Open the deployed site on a tablet<br>3. Open the deployed site on a desktop                                                                | PASS        |
| TC08      | As a user concerned about privacy, I want clear information on how my location data is used, so that I feel secure using the service.                                                    | Open the FAQ section on the deployed site and click on the privacy question.                                                                                                                  | PASS        |
| TC09      | As a user, I want to receive weather alerts for severe conditions, so that I can prepare accordingly.                                                                                    |                                                                                                                                                                                               | FAIL        |
| TC10      | As a non-native English speaker, I want to include an option to choose a different language or voice for the text-to-speech conversion, so I can understand the information more easily. | 1. Open the deployed site home page<br>2. Go to the voice section<br>3. Click on the drop down arrow and select a voice<br>4. Select play                                                     | FAIL        |
| TC11      | As a user I would like to have the option to adjust the speed or pitch of the audio, so I can listen comfortably.                                                                        | 1. Open the deployed site home page<br>2. Go to the speed and pitch section<br>3. While the voice is playing use the variable adjustment to change the pitch and change the speed<br>         | PASS        |
| TC12      | As a user I would like to see a FAQ section, so I can access common queries easily and self-serve.                                                                                       | 1. Open the deployed site.<br>2. From the menu bar select FAQ<br>3. A list of FAQ is displayed<br>4. Press on question to view answer, press on answer again to reduce it.                    | PASS        |
| TC13      | As a user, I can check today's weather by hours, so that I can dress accordingly.                                                                                                        |                                                                                                                                                                                               | PASS        |
| TC14      | As a user, I can filter the news, so I can access the latest news of the topics I want.                                                                                                  | The user can access the latest news of the topic he is interested in.                                                                                                                         | FAIL        |

---

## Compatibility

We then tested all pages for cross-browser compatibility to ensure that the site works on different browsers.

#### Results

| Test Case | Test Case Description           | Expected Result                                                                                            | Pass / Fail |
| --------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------- |
| TC01      | Page works with Google Chrome   | 1. Open Google Chrome<br>2. Navigate to the deployed page.<br>3. Verify the basic functionality of the app | PASS        |
| TC02      | Page works with Mozilla Firefox | 1. Open Firefox<br>2. Navigate to the deployed page.<br>3. Verify the basic functionality of the app       | PASS        |
| TC03      | Page works with Safari          | 1. Open Safari <br>2. Navigate to the deployed page.<br>3. Verify the basic functionality of the app       | PASS        |

---

## Responsiveness

The responsiveness was tested thanks to [Chrome Device toolbar](https://developer.chrome.com/docs/devtools/device-mode). Different screen sizes were tested to inspect the responsiveness of the website.

#### Results

| Test Case | Test Case Description              | Expected Result                                                                                                                                     | Pass / Fail |
| --------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| TC01      | Page works on mobile screens       | 1. Navigate to the deployed page.<br>2. Open the developer toos<br>3. Set the window size to 380px<br>4. Verify the basic functionality of the app  | PASS        |
| TC01      | Page works on tablet screens       | 1. Navigate to the deployed page.<br>2. Open the developer toos<br>3. Set the window size to 650px<br>4. Verify the basic functionality of the app  | PASS        |
| TC03      | Page works on desktop screens      | 1. Navigate to the deployed page.<br>2. Open the developer toos<br>3. Set the window size to 1200px<br>4. Verify the basic functionality of the app | PASS        |
| TC04      | Page works on wide screen desktops | 1. Navigate to the deployed page.<br>2. Open the developer toos<br>3. Set the window size to 2200px<br>4. Verify the basic functionality of the app | PASS        |

---

## Accessibility

Since this is a hackathon about accessibility, we went ahead and tested this part with a little more detail than usual.

We tested the page with:

- [WAVE WebAIM Evaluation Tool](https://wave.webaim.org/)
- a color blindness simulator for 9 different types of color blindness [Pileston Color Blind Visioin Simulator ](https://pilestone.com/pages/color-blindness-simulator-1?srsltid=AfmBOooS3NaYz6ZSMBzkC52-VBPHp0FpKVg1DJi_okGUmlTMUueONlkM)
- the accessibility tab of [Google Lighthouse](https://pagespeed.web.dev/).

#### Results

| Test Case | Test Case Description                                               | Expected Result                                                                                                                                                              | Pass / Fail |
| --------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| TC01      | Home page passes WAVE WebAIM validator                              | 1. Navigate to the WAVE WebAIM Validator <br>2. Copy the link of the Home Page <br>3. Verify that it passes                                                                  | PASS        |
| TC02      | Teams page passes WAVE WebAIM validator                             | 1. Navigate to the WAVE WebAIMValidator <br>2. Copy the link of the Teams Page <br>3. Verify that it passes                                                                  | PASS        |
| TC03      | FAQ page passes WAVE WebAIM validator                               | 1. Navigate to the WAVE WebAIM Validator <br>2. Copy the link of the FAQ Page <br>3. Verify that it passes                                                                   | PASS        |
| TC04      | Home page works well for people Green-weak (Deuteranomaly)<br>      | 1. Take a screenshot of the Home Page<br>2. Navigate to the Color Blind Simulator<br>3. Upload the image<br>4. Select the option<br>5. Verify that the elements are readable | PASS        |
| TC05      | Home page works well for people Red-weak (Protanomaly)<br>          | 1. Take a screenshot of the Home Page<br>2. Navigate to the Color Blind Simulator<br>3. Upload the image<br>4. Select the option<br>5. Verify that the elements are readable | PASS        |
| TC06      | Home page works well for people Blue-weak (Tritanomaly)<br>         | 1. Take a screenshot of the Home Page<br>2. Navigate to the Color Blind Simulator<br>3. Upload the image<br>4. Select the option<br>5. Verify that the elements are readable | PASS        |
| TC07      | Home page works well for people Green-weak (Deuteranomaly)<br>      | 1. Take a screenshot of the Home Page<br>2. Navigate to the Color Blind Simulator<br>3. Upload the image<br>4. Select the option<br>5. Verify that the elements are readable | PASS        |
| TC08      | Home page works well for people with Monochromacy (Tritanomaly)<br> | 1. Take a screenshot of the Home Page<br>2. Navigate to the Color Blind Simulator<br>3. Upload the image<br>4. Select the option<br>5. Verify that the elements are readable | PASS        |
| TC09      | Home page works well for people with Red-blind (Protanopy)<br>      | 1. Take a screenshot of the Home Page<br>2. Navigate to the Color Blind Simulator<br>3. Upload the image<br>4. Select the option<br>5. Verify that the elements are readable | PASS        |
| TC10      | Home page works well for people with Green-blind (Deuteranopy)<br>  | 1. Take a screenshot of the Home Page<br>2. Navigate to the Color Blind Simulator<br>3. Upload the image<br>4. Select the option<br>5. Verify that the elements are readable | PASS        |
| TC11      | Home page works well for people with Blue-blind (Deuteranopy)<br>   | 1. Take a screenshot of the Home Page<br>2. Navigate to the Color Blind Simulator<br>3. Upload the image<br>4. Select the option<br>5. Verify that the elements are readable | PASS        |
| TC12      | Home page works well for people with Blue Cone Monochromacy<br>     | 1. Take a screenshot of the Home Page<br>2. Navigate to the Color Blind Simulator<br>3. Upload the image<br>4. Select the option<br>5. Verify that the elements are readable | PASS        |
| TC13      | Home page passes Lighhouse accessiblity score with > 90%<br>        | 1. Open Google Lighthouse<br>2. Enter URL of Home Page<br>3. Verify that accessibility score passes                                                                          | PASS        |
| TC14      | Teams page passes Lighhouse accessiblity score with > 90%<br>       | 1. Open Google Lighthouse<br>2. Enter URL of Teams Page<br>3. Verify that accessibility score passes                                                                         | PASS        |
| TC15      | FAQ page passes Lighhouse accessiblity score with > 90%<br>         | 1. Open Google Lighthouse<br>2. Enter URL of FAQ Page<br>3. Verify that accessibility score passes                                                                           | PASS        |

---

## Performance

#### Results

---

[Lightouse](https://chromewebstore.google.com/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?pli=1) was used for performance testing.

1. Home page

![Home Page](/assets/media/_replace_with_lighthouse_result_.png)

2. Team Page

![Team Page](/assets/media/_replace_with_lighthouse_result_.png)

3. FAQ page

![FAQ Page](/assets/media/_replace_with_lighthouse_result_.png)

_Go back to [README.md](README.md)_
