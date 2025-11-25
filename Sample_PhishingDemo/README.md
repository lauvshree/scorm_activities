
# Phishing Awareness — SCORM 1.2 (Light Theme, Stylized Quiz)

A single-SCO SCORM 1.2 package with 5 multiple-choice questions about phishing tactics. Immediate per-question feedback and overall score on submit. Language and examples are tailored for associate degree students aged 18–21. Light background theme for clean, high-contrast readability.

## Files
- `index.html`: Module content + stylized quiz (light theme)
- `css/style.css`: Theme and quiz styles
- `js/scorm.js`: Minimal SCORM 1.2 API wrapper
- `js/course.js`: Renders questions, immediate feedback, scoring, SCORM reporting
- `imsmanifest.xml`: SCORM manifest

## Upload to LMS
1. Upload the ZIP as a **SCORM 1.2** package.
2. Launch the SCO to take the quiz.
3. Score and completion are recorded (`cmi.core.score.raw`; `lesson_status` set to `passed`/`failed` using 80% threshold).

## Customization
- Edit questions in `js/course.js`.
- Change pass mark by modifying `const passed = pct >= 80`.
- Adjust styles in `css/style.css`.

## Notes
If opened outside an LMS, the SCORM API is mocked and results are *not* recorded. Upload to an LMS to track data.
