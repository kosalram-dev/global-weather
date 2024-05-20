# Getting Started

## Prerequisite

1. Clone the repository using the following command

```bash
git clone <repo_url>
```

2. Please refer `.nvmrc` for the node version and install the dependencies

```bash
# using npm
npm install

# OR using Yarn
yarn install
```

3. Copy the `.env.sample` and rename to `.env` in the root folder.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

1. Make sure the pod dependencies are installed. This is just a one time process.

```bash
cd ios/ && pod install
```

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```
