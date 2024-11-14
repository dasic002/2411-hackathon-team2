![CI logo](https://codeinstitute.s3.amazonaws.com/fullstack/ci_logo_small.png)

Welcome USER_NAME,

This is the Code Institute student template for Gitpod. We have preinstalled all of the tools you need to get started. It's perfectly ok to use this template as the basis for your project submissions.

You can safely delete this README.md file or change it for your own project. Please do read it at least once, though! It contains some important information about Gitpod and the extensions we use. Some of this information has been updated since the video content was created. The last update to this file was: **June 18, 2024**

---

## Design

### User Personas

<table>
    <tr>
        <th>Name</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>
            <img style='width:80px'src="/assets/media/readme/persona-1.png">
            <p style="font-weight:bold; margin:0">Michael </p>
            <p>The Independent Visionary </p>
          </hd>
        <td>
            <ul>
              <li>Age: 34</li>
              <li>Occupation: Software Engineer</li>
              <li> Visual Impairment: Moderate vision loss due to retinitis pigmentosa</li>
              <li>  Tech Proficiency:  High</li>
              <li>  Location: Urban area</li>
              <li>  Goals:  Stay informed about current weather and news without straining his eyes.Use technology to maintain an independent lifestyle</li>
              <li>  Frustrations: Websites that aren't compatible with screen readers.
            Unorganized information that makes navigation difficult.</li>
              <li>  Preferred Features: Voice-assisted navigation and news reading.
            High-contrast design and adjustable text sizes.</li>
            </ul>
        </td>
    </tr>
      <tr>
        <td>
            <img style='width:80px'src="/assets/media/readme/persona-2.png">
            <p style="font-weight:bold; margin:0">Linda </p>
            <p>The Devoted Caregiver </p>
          </hd>
        <td>
            <ul>
              <li>Age: 34</li>
              <li>Occupation:  Homemaker</li>
              <li> Role: Caregiver to her visually impaired teenage son</li>
              <li>  Tech Proficiency:  Moderate</li>
              <li>  Location: Suburban area</li>
              <li>  Goals: Find reliable resources that support her son's independence.
            Simplify access to information for her son.</li>
              <li>  Frustrations: Limited resources and tools specifically catering to teenagers with visual impairments.Complicated technology that her son struggles to use.</li>
              <li>  Preferred Features: Simple and intuitive UI for easy learning.
          Personalization options to cater to specific needs..</li>
            </ul>
        </td>
    </tr>
  </tr>
    <tr>
        <td>
            <img style='width:80px'src="/assets/media/readme/persona-3.png">
            <p style="font-weight:bold; margin:0">Sarah </p>
            <p>The Outreach Advocate </p>
          </hd>
        <td>
            <ul>
              <li>Age: 45</li>
              <li>Occupation: Non-profit Worker in Vision Rehabilitation Services</li>
              <li> Visual Impairment:  None</li>
              <li>  Tech Proficiency:  Moderate</li>
              <li>  Location:  Rural area</li>
              <li>  Goals: Advocate for better technological solutions for visually impaired individuals.Educate clients on accessible technology.</li>
              <li>  Frustrations: Lack of awareness about assistive technologies.
Continuous adaptation to new technologies for her clients.</li>
              <li>  Preferred Features: Comprehensive guides for educators and caregivers.
Supportive community or feedback section for sharing insights.</li>
            </ul>
        </td>
    </tr>
   <tr>
        <td>
            <img style='width:80px'src="/assets/media/readme/persona-4.png">
            <p style="font-weight:bold; margin:0">David </p>
            <p>The News Enthusiast </p>
          </hd>
        <td>
            <ul>
              <li>Age: 67</li>
              <li>Occupation: Retired Teacher</li>
              <li> Visual Impairment: Age-related macular degeneration</li>
              <li>  Tech Proficiency:  Moderate</li>
              <li>  Location: Urban area</li>
              <li>  Goals: Keep up with daily news and weather predictions without dependency on others.Utilize voice features to circumvent declining eyesight.</li>
              <li>  Frustrations: Small fonts and cluttered web layouts.
Slow-loading pages or sites that are not voice-enabled.</li>
              <li>  Preferred Features: Customized news content read aloud at scheduled times.Easy navigation using large buttons and simplified layout.</li>
            </ul>
        </td>
    </tr>
 <tr>
        <td>
            <img style='width:80px'src="/assets/media/readme/persona-5.png">
            <p style="font-weight:bold; margin:0">Anika </p>
            <p>The Tech-Savvy Student </p>
          </hd>
        <td>
            <ul>
              <li>Age: 16</li>
              <li>Occupation: High School Student</li>
              <li> Visual Impairment: Congenital blindness </li>
              <li>  Tech Proficiency:  High</li>
              <li>  Location: Suburban area</li>
              <li>  Goals: Access weather updates for planning daily activities. Stay informed on current events relevant to her interests.</li>
              <li>  Frustrations: Limited age-appropriate visual impairment tools. Sometimes feels left out of mainstream media consumption.</li>
              <li>  Preferred Features: Engaging content presentation with voice customization. Interactive elements that work well with assistive tech devices.</li>
            </ul>
        </td>
    </tr>
</table>

---

## Gitpod Reminders

To run a frontend (HTML, CSS, Javascript only) application in Gitpod, in the terminal, type:

`python3 -m http.server`

A blue button should appear to click: _Make Public_,

Another blue button should appear to click: _Open Browser_.

To run a backend Python file, type `python3 app.py` if your Python file is named `app.py`, of course.

A blue button should appear to click: _Make Public_,

Another blue button should appear to click: _Open Browser_.

By Default, Gitpod gives you superuser security privileges. Therefore, you do not need to use the `sudo` (superuser do) command in the bash terminal in any of the lessons.

To log into the Heroku toolbelt CLI:

1. Log in to your Heroku account and go to _Account Settings_ in the menu under your avatar.
2. Scroll down to the _API Key_ and click _Reveal_
3. Copy the key
4. In Gitpod, from the terminal, run `heroku_config`
5. Paste in your API key when asked

You can now use the `heroku` CLI program - try running `heroku apps` to confirm it works. This API key is unique and private to you, so do not share it. If you accidentally make it public, you can create a new one with _Regenerate API Key_.

### Connecting your Mongo database

- **Connect to Mongo CLI on a IDE**
- navigate to your MongoDB Clusters Sandbox
- click **"Connect"** button
- select **"Connect with the MongoDB shell"**
- select **"I have the mongo shell installed"**
- choose **mongosh (2.0 or later)** for : **"Select your mongo shell version"**
- choose option: **"Run your connection string in your command line"**
- in the terminal, paste the copied code `mongo "mongodb+srv://<CLUSTER-NAME>.mongodb.net/<DBname>" --apiVersion 1 --username <USERNAME>`
  - replace all `<angle-bracket>` keys with your own data
- enter password _(will not echo **\*\*\*\*** on screen)_

---

## Release History

We continually tweak and adjust this template to help give you the best experience. Here is the version history:

**June 18, 2024,** Add Mongo back into template

**June 14, 2024,** Temporarily remove Mongo until the key issue is resolved

**May 28 2024:** Fix Mongo and Links installs

**April 26 2024:** Update node version to 16

**September 20 2023:** Update Python version to 3.9.17.

**September 1 2021:** Remove `PGHOSTADDR` environment variable.

**July 19 2021:** Remove `font_fix` script now that the terminal font issue is fixed.

**July 2 2021:** Remove extensions that are not available in Open VSX.

**June 30 2021:** Combined the P4 and P5 templates into one file, added the uptime script. See the FAQ at the end of this file.

**June 10 2021:** Added: `font_fix` script and alias to fix the Terminal font issue

**May 10 2021:** Added `heroku_config` script to allow Heroku API key to be stored as an environment variable.

**April 7 2021:** Upgraded the template for VS Code instead of Theia.

**October 21 2020:** Versions of the HTMLHint, Prettier, Bootstrap4 CDN and Auto Close extensions updated. The Python extension needs to stay the same version for now.

**October 08 2020:** Additional large Gitpod files (`core.mongo*` and `core.python*`) are now hidden in the Explorer, and have been added to the `.gitignore` by default.

**September 22 2020:** Gitpod occasionally creates large `core.Microsoft` files. These are now hidden in the Explorer. A `.gitignore` file has been created to make sure these files will not be committed, along with other common files.

**April 16 2020:** The template now automatically installs MySQL instead of relying on the Gitpod MySQL image. The message about a Python linter not being installed has been dealt with, and the set-up files are now hidden in the Gitpod file explorer.

**April 13 2020:** Added the _Prettier_ code beautifier extension instead of the code formatter built-in to Gitpod.

**February 2020:** The initialisation files now _do not_ auto-delete. They will remain in your project. You can safely ignore them. They just make sure that your workspace is configured correctly each time you open it. It will also prevent the Gitpod configuration popup from appearing.

**December 2019:** Added Eventyret's Bootstrap 4 extension. Type `!bscdn` in a HTML file to add the Bootstrap boilerplate. Check out the <a href="https://github.com/Eventyret/vscode-bcdn" target="_blank">README.md file at the official repo</a> for more options.

---

## FAQ about the uptime script

**Why have you added this script?**

It will help us to calculate how many running workspaces there are at any one time, which greatly helps us with cost and capacity planning. It will help us decide on the future direction of our cloud-based IDE strategy.

**How will this affect me?**

For everyday usage of Gitpod, it doesn’t have any effect at all. The script only captures the following data:

- An ID that is randomly generated each time the workspace is started.
- The current date and time
- The workspace status of “started” or “running”, which is sent every 5 minutes.

It is not possible for us or anyone else to trace the random ID back to an individual, and no personal data is being captured. It will not slow down the workspace or affect your work.

**So….?**

We want to tell you this so that we are being completely transparent about the data we collect and what we do with it.

**Can I opt out?**

Yes, you can. Since no personally identifiable information is being captured, we'd appreciate it if you let the script run; however if you are unhappy with the idea, simply run the following commands from the terminal window after creating the workspace, and this will remove the uptime script:

```
pkill uptime.sh
rm .vscode/uptime.sh
```

**Anything more?**

Yes! We'd strongly encourage you to look at the source code of the `uptime.sh` file so that you know what it's doing. As future software developers, it will be great practice to see how these shell scripts work.

---

Happy coding!
