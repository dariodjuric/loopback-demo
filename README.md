# LoopBack Demo

This is a small demo of [LoopBack](https://loopback.io/), an API framework for Node.js built on top of Express.

The demo shows how to:

* Expose a REST API
* Call an external API (GitHub)
* Use a database

## Installing the Application

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

To only install resolved dependencies in `package-lock.json`:

```sh
npm ci
```

## Running the Application

```sh
npm start:watch:debug
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000) in your browser.
