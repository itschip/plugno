# Plugs.no

## Technology and project details

This project is a monorepo, and split up in three different apps/packages.

- `apps` - The React and React Native application for Plugs/Plugs.
- `api` - The backend built in Go.
- `packages` - Other reusable packages used internally within the React projects. Such as configs, ui libs and more.

### Frontend / App

I decided go for Next.JS as the frontend framework, while still keeping our backend in Go. I started out with React and CSR, but I had too many concerns about SEO and other goodies that Next provides.

The choice for using Expo, instead of just React-Native, is the ease of use, and abstractions I don't want to spend time on handling myself. Building the app with Expo is also awesome.

### Backend

Nothing much here. I chose Go because I wanted a fast and robust backend, something Node does not offer :eyes:

Seriously though, I like Go, as well as it would be nice to learn more. Would probably have gone for Node if I wanted to write the backend quicker.

