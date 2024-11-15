![CI logo](https://codeinstitute.s3.amazonaws.com/fullstack/ci_logo_small.png)

# Hackathon team 2

Short paragraph - description of the project

View the live site[add link]

Preview Image [add img]

---

## Features

#### Navigation Menu

#### Hero Section

#### Weather Widget

#### News Widget

#### Footer

#### Contact Page

#### About Us Page

---

## Agile

#### Project Board

#### User Stories

#### MoSCoW Prioritization

---

## Design

![Hackathon Wireframes V4](https://github.com/user-attachments/assets/10cfc136-006c-4b16-a7a3-ed9adb19275d)


#### Colours

We described our project goals to ChatGPT and asked for 5 suggestions of a colour scheme for our application. We asked to include a background colour, a primary colour for headings, a secondary text and links, and an accent colour for buttons etc. Except for the background colour, we asked for 2 variations of each colour, leading to 5 colour schemes of 7 colours each:

<table>
 <tr>
        <th>Name</th>
        <th> Basic Color Scheme</th>
  </tr>
 <tr>
        <td><strong>1.</strong>(Classic Contrast)</td>
        <th><img style='width:100%'src="/assets/media/readme/basic-1.png"></th>
  </tr>
   <tr>
        <td><strong>2.</strong> (Subdued Sophistication)</td>
        <th><img style='width:100%'src="/assets/media/readme/basic-2.png"></th>
  </tr>
   <tr>
        <td><strong>3.</strong> (Nature Inspired)</td>
        <th><img style='width:100%'src="/assets/media/readme/basic-3.png"></th>
  </tr>
   <tr>
        <td><strong>4.</strong> (Warm Embrace)</td>
        <th><img style='width:100%'src="/assets/media/readme/basic-4.png"></th>
  </tr>
   <tr>
        <td><strong>5.</strong> (Monochrome Modernity)</td>
        <th><img style='width:100%'src="/assets/media/readme/basic-5.png"></th>
  </tr>
</table>

Keeping our user personas in mind, we then wanted to test how these colours would be seen by with different types of visual impairments, namely Colour Vision Deficiency. We created a mockup for our landing page and tested each layout for 8 types of colour blindness using a [Color Blind Vision Simulator](https://pilestone.com/pages/color-blindness-simulator-1?srsltid=AfmBOooS3NaYz6ZSMBzkC52-VBPHp0FpKVg1DJi_okGUmlTMUueONlkM) :

- Green-weak (Deuteranomaly)
- Red-weak (Protanomaly)
- Blue-weak (Tritanomaly)
- Monochromacy (Tritanomaly)
- Red-blind (Protanopy)
- Green-blind (Deuteranopy)
- Blue-blind (Deuteranopy)
- Blue Cone Monochromacy

<table>
 <tr>
        <th>Color Scheme</th>
        <th>Contrast Grid</th>
  </tr>
 <tr>
        <td><strong>1.</strong>(Classic Contrast)</td>
        <th><img style='width:100%'src="/assets/media/readme/color-scheme-1.png"></th>
  </tr>
   <tr>
        <td><strong>2.</strong> (Subdued Sophistication)</td>
        <th><img style='width:100%'src="/assets/media/readme/color-scheme-2.png"></th>
  </tr>
   <tr>
        <td><strong>3.</strong> (Nature Inspired)</td>
        <th><img style='width:100%'src="/assets/media/readme/color-scheme-3.png"></th>
  </tr>
   <tr>
        <td><strong>4.</strong> (Warm Embrace)</td>
        <th><img style='width:100%'src="/assets/media/readme/color-scheme-4.png"></th>
  </tr>
   <tr>
        <td><strong>5.</strong> (Monochrome Modernity)</td>
        <th><img style='width:100%'src="/assets/media/readme/color-scheme-5.png"></th>
  </tr>
</table>

We also used [EightShapes](https://contrast-grid.eightshapes.com/) to determine the contrast between each of the 7 shades of each colour scheme.

<table>
<tr>
      <th>Color Contrast Combinations</th>
  </tr>
  <tr>
      <td><img style='width:100%'src="/assets/media/readme/color-scheme-eight-grid.png"></td>
  </tr>
</table>

All colour schemes were readable for individuals with various types of visual impairments. Our criteria for choosing a scheme were:

- The colours should be visually inviting across different types of impairments
- The colours need to align with the website's purpose. In the morning, after waking up, warmer tones might be more comfortable for the eyes, as they can help reduce overstimulation.
- The colour combinations should achieve a high AAA rating or better, making them well-suited for our intended application with high colour contrast.

Based on these criteria, we observed:

- Colour Schemes 2, 3 and 5 look a bit strange for certain types of impairments
- Colour scheme 1 has a strong visual contrast and is visually appealing across impairment types. The bright tone could help with waking up.
- Colour schemes 2 and 5 score lower than the other schemes for certain combinations

Our final chosen colour scheme was **Color Scheme 1 (Classic Contrast)**, based on the results and a vote amongst our team members.

#### Typography

#### UX Research

To inform our design and layout decisions, we adopted a user-centric approach and sought to create user personas. We outlined our project goals to ChatGPT and asked for assistance in generating five user personas that represent our target audience for the application:

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
              <li>  Goals:  Stay informed about current weather and news without straining his eyes. Use technology to maintain an independent lifestyle</li>
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
              <li>Age: 52</li>
              <li>Occupation:  Homemaker</li>
              <li> Role: Caregiver to her visually impaired teenage son</li>
              <li>  Tech Proficiency:  Moderate</li>
              <li>  Location: Suburban area</li>
              <li>  Goals: Find reliable resources that support her son's independence.
            Simplify access to information for her son.</li>
              <li>  Frustrations: Limited resources and tools specifically catering to teenagers with visual impairments. Complicated technology that her son struggles to use.</li>
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
              <li>  Goals: Advocate for better technological solutions for visually impaired individuals. Educate clients on accessible technology.</li>
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
              <li>  Goals: Keep up with daily news and weather predictions without dependency on others. Utilize voice features to circumvent declining eyesight.</li>
              <li>  Frustrations: Small fonts and cluttered web layouts.
Slow-loading pages or sites that are not voice-enabled.</li>
              <li>  Preferred Features: Customized news content read aloud at scheduled times.Easy navigation using large buttons and a simplified layout.</li>
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

## Technologies

- HTML5
- CSS
- Javascript
- ...

---

## Testing

#### HTML validator

#### CSS validator

#### Responsiveness

#### Accessibility

#### Performance

#### Lighthouse

---

## Deployment

#### GitHub Pages

---

## Team

---

## Credits

- [Color Blind Vision Simulator](https://pilestone.com/pages/color-blindness-simulator-1?srsltid=AfmBOooS3NaYz6ZSMBzkC52-VBPHp0FpKVg1DJi_okGUmlTMUueONlkM) for testing the layout with different types of visual impairment
- [EightShapes Contrast Grid](https://contrast-grid.eightshapes.com/?version=1.1.0&background-colors=&foreground-colors=D3D3D3%0D%0A000000%0D%0A1C1C1C%0D%0A708090%0D%0AD3D3D3%0D%0AFF4500%0D%0ADC143C%0D%0A&es-color-form__tile-size=compact&es-color-form__show-contrast=aaa&es-color-form__show-contrast=aa&es-color-form__show-contrast=aa18&es-color-form__show-contrast=dnp) to test foreground and background color combinations of color schemes
