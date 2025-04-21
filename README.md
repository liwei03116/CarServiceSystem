
**Summary**

This monorepo provides a full‑stack Car Service System comprising a backend API, a web frontend, and a mobile admin app. ([nodejs.org](https://nodejs.org/?utm_source=chatgpt.com)) The backend API uses Node.js (v14+) and Express to handle HTTP requests and persists data in MongoDB. ([nodejs.org](https://nodejs.org/api/all.html?utm_source=chatgpt.com), [expressjs.com](https://expressjs.com/?utm_source=chatgpt.com)) The web frontend, built with React via Create React App, offers a responsive administrative dashboard. ([react.dev](https://react.dev/?utm_source=chatgpt.com)) The mobile admin application is developed in React Native for cross‑platform management on iOS and Android. ([reactnative.dev](https://reactnative.dev/docs/getting-started?utm_source=chatgpt.com))

## Components

- **Backend API**: Implements RESTful endpoints using Node.js and Express, with MongoDB as the data store. ([nodejs.org](https://nodejs.org/api/all.html?utm_source=chatgpt.com), [expressjs.com](https://expressjs.com/?utm_source=chatgpt.com), [mongodb.com](https://www.mongodb.com/docs/drivers/node/current/?utm_source=chatgpt.com))
- **Web Frontend**: A React (Create React App) application providing administrative and customer interfaces. ([react.dev](https://react.dev/?utm_source=chatgpt.com))
- **Mobile Admin App**: A React Native app for administrators, featuring real‑time notifications and offline support. ([reactnative.dev](https://reactnative.dev/docs/getting-started?utm_source=chatgpt.com), [reactnavigation.org](https://reactnavigation.org/?utm_source=chatgpt.com))

## Technology Stack

- **Backend** uses Node.js (v14+) for runtime ([nodejs.org](https://nodejs.org/api/all.html?utm_source=chatgpt.com)), Express (v4+) as the web framework ([expressjs.com](https://expressjs.com/?utm_source=chatgpt.com)), and MongoDB for data storage ([mongodb.com](https://www.mongodb.com/docs/drivers/node/current/?utm_source=chatgpt.com)).
- **Web Frontend** is built with React (v18+) via Create React App ([react.dev](https://react.dev/?utm_source=chatgpt.com)).
- **Mobile Admin** is developed in React Native (latest stable) for cross‑platform mobile on iOS and Android ([reactnative.dev](https://reactnative.dev/docs/getting-started?utm_source=chatgpt.com)); it uses Redux for state management ([redux.js.org](https://redux.js.org/?utm_source=chatgpt.com)), Axios for HTTP requests ([axios-http.com](https://axios-http.com/docs/intro?utm_source=chatgpt.com)), and React Navigation for navigation ([reactnavigation.org](https://reactnavigation.org/docs/getting-started/?utm_source=chatgpt.com)).
- **Development Tools** include Git for version control ([git-scm.com](https://git-scm.com/doc?utm_source=chatgpt.com)) and Yarn for package management ([yarnpkg.com](https://yarnpkg.com/?utm_source=chatgpt.com)).

## Repository Structure

```plaintext
CarServiceSystem/
├── backend/           # Node.js + Express API
├── web-frontend/      # React (CRA) web app
└── mobileAdmin/       # React Native mobile admin app
```

## Getting Started

### Prerequisites

- Git (version control)
- Node.js v14+ and npm or Yarn
- MongoDB instance (local or hosted)
- Android Studio / Xcode (for mobile builds)
- React Native CLI (for mobile) ([reactnative.dev](https://reactnative.dev/docs/environment-setup?utm_source=chatgpt.com))

### Clone and Install

```bash
git clone https://github.com/liwei03116/CarServiceSystem.git
cd CarServiceSystem
```

#### 1. Backend

```bash
cd backend
npm install    # or yarn install
```
Create a `.env` file:
```dotenv
MONGODB_URI=<your-mongo-connection-string>
PORT=4000
```
Start the server:
```bash
npm start
```

#### 2. Web Frontend

```bash
cd web-frontend
npm install    # or yarn install
npm start      # opens http://localhost:3000
```

#### 3. Mobile Admin

```bash
cd mobileAdmin
npm install    # or yarn install
cp .env.example .env
# edit .env → API_BASE_URL=https://your.api.endpoint
npx react-native run-android    # Android
npx pod-install ios && npx react-native run-ios  # iOS
```

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m "Add some feature"`.
4. Push to your fork: `git push origin feature/YourFeature`.
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

