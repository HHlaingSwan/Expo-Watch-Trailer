# MovieAppRN

A beautiful React Native app for browsing, searching, and saving your favorite movies. Built using Expo and powered by the TMDB (The Movie Database) API, MovieAppRN is the perfect starting point for mobile movie discovery.

## Features

- 📖 Browse trending and popular movies
- 🔎 Search for movies by title or keyword
- 📝 View detailed information, ratings, genres, and release dates, with the ability to save/unsave movies directly from the header.
- ⭐️ Save movies to your personal favorites list
- 🖼️ Enjoy clean UI and smooth navigation
- ✅ Visually identify saved movies on the main browsing screen with a bookmark icon.

## Tech Stack

- [Expo](https://expo.dev) & React Native
- [TMDB API](https://www.themoviedb.org/documentation/api)
- [React Navigation](https://reactnavigation.org/)
- React Hooks & AsyncStorage

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

## Key Functionalities

- **Infinite Scrolling:** The popular movies list automatically loads more content as you scroll down, providing a seamless browsing experience.
- **Dynamic Headers:** Movie details screen features a transparent, dynamic header with an integrated Save/Unsave bookmark button.
- **Local Persistence:** Your saved movies are stored locally on your device using `AsyncStorage`, so they remain available even after closing the app.
- **Context-Aware UI:** Movie cards across the app (Home, Search, and Details) instantly reflect their saved status.
- **Optimized Search:** Real-time search with debouncing to prevent unnecessary API calls while typing.

## Project Structure

- **app/** - Expo Router based screens and layouts.
- **components/** - Atomic UI components like `MovieCard` and `SearchingBar`.
- **services/** - Data fetching logic (`api.ts`), local storage management (`storage.ts`), and custom hooks (`useFetch.ts`).
- **assets/** - Static resources like images and icons.
- **hooks/** - Custom React hooks for shared logic.

## Contributing

Pull requests, suggestions, and issues are welcome! 
Feel feel to open an issue or PR to improve code, add features, or fix bugs.

## Credits
- [TMDB](https://www.themoviedb.org/) for movie data and imagery
- Expo & React Native community

## License

This project is open-source and available under the MIT License.

---

Enjoy discovering movies with MovieAppRN!
