# WhereToWatch

A full-stack web application that helps users find where their favorite movies and TV series are available for streaming across different countries.

## Features

- **Movie Search**: Search for movies by title and get detailed information (i.e release year and description)
- **TV Series Search**: Find TV shows and series with comprehensive details (i.e year it first aired and description)
- **Streaming Availability**: Discover where content is available to stream across different countries (either with a flatrate subscription, purchase, or rental)

- **Responsive Design**: Clean, modern interface that works across devices

## Tech Stack

### Frontend
- **React** (v19.1.0) - Modern UI library
- **React Router DOM** (v7.6.1) - Client-side routing
- **Axios** (v1.9.0) - HTTP client for API requests
- **CSS3** - Custom styling with animations and responsive design

### Backend
- **Node.js** with **Express.js** (v5.1.0) - Server framework
- **Axios** (v1.9.0) - External API requests
- **CORS** (v2.8.5) - Cross-origin resource sharing
- **dotenv** (v16.5.0) - Environment variable management

### External API
- **The Movie Database (TMDb) API** - Movie and TV show data with streaming information

## Project Structure

```
wtw/
├── backend/
│   ├── index.js              # Express server and API routes
│   ├── package.json          # Backend dependencies
│   └── node_modules/
├── frontend/
│   ├── public/
│   │   ├── index.html        # HTML template
│   │   ├── manifest.json     # PWA manifest
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Header.js     # Navigation header
│   │   │   ├── Home.js       # Landing page
│   │   │   ├── MovieSearch.js # Movie search functionality
│   │   │   ├── SeriesSearch.js # TV series search
│   │   │   ├── Card.js       # Result display cards
│   │   │   ├── Streaming.js  # Streaming platform info
│   │   │   ├── StreamingCard.js # Individual platform cards
│   │   │   ├── Footer.js     # Page footer
│   │   │   └── NotFound.js   # 404 error page
│   │   ├── styling/          # CSS stylesheets
│   │   │   ├── layout.css    # Main layout styles
│   │   │   ├── Header.css    # Header styling
│   │   │   ├── Home.css      # Home page styles
│   │   │   ├── Search.css    # Search page styles
│   │   │   ├── Card.css      # Result card styles
│   │   │   └── StreamingCard.css # Streaming card styles
│   │   ├── App.js            # Main application component
│   │   ├── index.js          # Application entry point
│   │   └── App.css           # Global styles
│   ├── package.json          # Frontend dependencies
│   └── node_modules/
├── .gitignore                # Git ignore rules
└── README.md                 # Project documentation
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- TMDb API key

### 1. Clone the Repository
```bash
git clone <repository-url>
cd wtw
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
API_TOKEN=Bearer YOUR_TMDB_API_KEY_HERE
```

**Getting a TMDb API Key:**
1. Sign up at [The Movie Database](https://www.themoviedb.org/)
2. Go to Settings > API
3. Request an API key
4. Use the API Read Access Token (v4 auth) as your `API_TOKEN`

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Running the Application

**Start the backend server:**
```bash
cd backend
node index.js
```
The server will run on `http://localhost:5000`

**Start the frontend development server:**
```bash
cd frontend
npm start
```
The React app will run on `http://localhost:3000`

## API Endpoints

The backend provides three main endpoints:

### POST `/find-movie`
Search for movies by title.
```json
{
  "title": "Movie Title"
}
```

### POST `/find-series`
Search for TV series by title.
```json
{
  "title": "Series Title"
}
```

### POST `/where-to-stream`
Get streaming availability for a specific movie or series.
```json
{
  "type": "movie", // or "tv"
  "id": "12345"    // TMDb ID
}
```

## Usage

1. **Home Page**: Choose between searching for movies or TV series
2. **Search**: Enter a title in the search box
3. **Results**: Browse through matching titles with descriptions and release dates
4. **Streaming Info**: Click on any title to see where it's available to stream
5. **Platform Details**: View available platforms organized by country, including rental, purchase, and subscription options

## Features in Detail

### Search Functionality
- Real-time search with loading indicators
- Comprehensive result filtering (excludes adult content, videos without overviews, and only first page of results at the moment)
- Error handling for API failures and no results

### Streaming Information
- Multi-country availability
- Categorized by streaming type:
- Alphabetically sorted platform lists

### User Experience
- Responsive design for mobile and desktop
- Smooth animations and hover effects
- Loading spinners for better feedback
- Clean, intuitive navigation

## Error Handling

The application includes comprehensive error handling:
- Network connectivity issues
- API rate limiting
- Invalid search queries
- Missing streaming data
- Server errors (500 testing endpoint available with query "error500")

### Environment Variables
- `API_TOKEN`: TMDb API Bearer token (required)

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Created by Meryl Marasigan

## Acknowledgments

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing comprehensive movie and TV data
- [Create React App](https://create-react-app.dev/) for the frontend boilerplate
- [Express.js](https://expressjs.com/) for the backend framework