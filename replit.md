# Portfolio Website

## Overview
This is a bilingual (Indonesian/English) portfolio website featuring static HTML pages with language switching functionality. The website showcases articles about tolerance and includes Home, About, Contact, and Articles pages.

**Current State:** Fully functional and deployed on Replit with Python HTTP server.

## Recent Changes
- **2025-11-07**: Initial Replit setup
  - Created Python HTTP server to serve static files from `website-folder/`
  - Configured workflow to run on port 5000 with webview output
  - Added `.gitignore` for Python project
  - Configured deployment settings for autoscale
  - Added cache control headers to prevent browser caching issues

## Project Architecture

### Structure
```
.
├── website-folder/          # All website files
│   ├── index.html          # Home page
│   ├── about.html          # About/biography page
│   ├── contact.html        # Contact form page
│   ├── articles.html       # Article about tolerance
│   ├── style.css           # Global styles
│   └── lang.js             # Bilingual language switcher
├── server.py               # Python HTTP server (serves from website-folder)
├── .gitignore              # Python gitignore
└── replit.md               # This file
```

### Technology Stack
- **Frontend**: Pure HTML5, CSS3, and Vanilla JavaScript
- **Language Support**: Indonesian (ID) and English (EN) with automatic detection
- **Server**: Python 3.11 with built-in http.server module
- **Deployment**: Replit autoscale deployment

### Key Features
1. **Bilingual Support**: Automatic language detection based on browser settings
2. **Language Persistence**: User's language choice saved in localStorage
3. **Responsive Design**: Works on mobile, tablet, and desktop
4. **Accessible Navigation**: ARIA attributes for dropdown menus
5. **Contact Form**: Client-side validation (currently demo mode)
6. **Cache Prevention**: Cache-Control headers prevent stale content

## Development

### Running Locally
The workflow is already configured. The server runs automatically on:
- **URL**: http://0.0.0.0:5000
- **Command**: `python server.py`

### Making Changes
1. Edit HTML files in `website-folder/`
2. Changes to static files are immediately visible (no rebuild needed)
3. If changing server.py, restart the workflow

### Language Switching
The `lang.js` script:
- Auto-detects browser language on first visit
- Shows content with class `.lang-id` for Indonesian
- Shows content with class `.lang-en` for English
- Persists choice in localStorage

## Deployment
Configured for Replit autoscale deployment:
- Runs `python server.py` in production
- Serves on port 5000
- No build step required (static files)

## User Preferences
None specified yet.
