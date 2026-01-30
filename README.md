# MovieAppRN

A beautiful React Native app for browsing, searching, and saving your favorite movies. Built using Expo and powered by the TMDB (The Movie Database) API, MovieAppRN is the perfect starting point for mobile movie discovery.

## Features

- 📖 Browse trending and popular movies
- 🔎 Search for movies by title or keyword
- 📝 View detailed information, ratings, genres, and release dates
- ⭐️ Save movies to your personal favorites list
- 🖼️ Enjoy clean UI and smooth navigation

## Tech Stack

- [Expo](https://expo.dev) & React Native
- [TMDB API](https://www.themoviedb.org/documentation/api)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/) (or Context API – adjust as needed)

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/MovieAppRN.git
    cd MovieAppRN
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Obtain a TMDB API key:**
   - Sign up at [TMDB](https://www.themoviedb.org/) and request an API key.
   - Add your key to a `.env` file:
     ```
     TMDB_API_KEY=your_api_key_here
     ```
4. **Start the application:**
    ```bash
    npx expo start
    ```

   You can launch the app in Expo Go, Android emulator, or iOS simulator.

## Project Structure

- **app/** - All source code and screens
- **components/** - Reusable UI components
- **store/** - Redux state (or context)
- **assets/** - Images and fonts

## Contributing

Pull requests, suggestions, and issues are welcome! 
Feel free to open an issue or PR to improve code, add features, or fix bugs.

## Credits
- [TMDB](https://www.themoviedb.org/) for movie data and imagery
- Expo & React Native community

## License

This project is open-source and available under the MIT License.

---

Enjoy discovering movies with MovieAppRN!
