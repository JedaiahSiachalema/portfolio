# ICT251 Activity 3 — Interactive Personal Website

A responsive student portfolio built with HTML5, external CSS, and vanilla JavaScript.

## Files and folders

- `index.html` — page structure and personal content
- `css/styles.css` — colours, layout, responsiveness, focus states and themes
- `js/script.js` — interactive features
- `images/` — add your three Activity 2 photos (`photo1.jpg`, `photo2.jpg`, `photo3.jpg`)
- `videos/` — add your Activity 2 video (`intro.mp4`) and audio (`voice.mp3`)

## JavaScript features

1. Contact form validation and on-page preview (compulsory). It is a browser demonstration only; no message is sent.
2. Light/dark theme switch.
3. Expandable project details.
4. Project/skills search with reset and no-match feedback.
5. Gallery Previous/Next viewer with wrap-around boundaries.
6. Mobile navigation open/close.
7. Weekly study-hours calculator.

The assignment requires the compulsory contact form feature plus any three additional features. This starter contains more than three; test them all and be ready to explain how they work.

## Run locally in IntelliJ IDEA

Open this folder as a project in IntelliJ IDEA. Open `index.html` and use your browser to test it. If your IntelliJ edition has a built-in web preview/server, you may use it; otherwise open `index.html` in a browser or use a static-file server. Check the browser Developer Tools Console and Network tabs for errors and missing media.

## Before submission

- Replace the sample About Me paragraph with your own original Activity 2 paragraph (at least 50 words).
- Preserve your own Activity 2 content and media. Keep at least three hobbies, three learning steps, at least three learning-table data rows, three captioned photos, and your short video and audio recording.
- Put your actual image files in `images/` with the filenames used in the HTML, or update the paths to match your files exactly.
- Put your actual video and audio in `videos/` as `intro.mp4` and `voice.mp3`, or update the paths.
- Change the GitHub footer link to your repository URL.
- Test mobile layout at about 375 px and desktop at about 1280 px. Confirm no sideways scrolling.
- Make the GitHub repository accessible for marking.
- Add a small improvement after the first Render deployment, commit it, and confirm Render redeploys.
- Replace any sample wording or project claims that do not accurately describe your own work.

## Deploy to Render

Create a GitHub repository and push the contents of this folder so `index.html` is at the repository root. In Render, create a **Static Site** connected to that repository and use:

- Root Directory: leave blank
- Build Command: `echo "No build required"`
- Publish Directory: `.`
- Auto Deploy: enabled for the branch containing your final work (usually `main`)

After deployment, test the public `https://...onrender.com` URL, including images, audio, video, navigation, all JavaScript features and the contact form.
