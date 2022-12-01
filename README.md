# Plugs.no

<img width="1512" alt="Screenshot 2022-11-29 at 17 31 01" src="https://user-images.githubusercontent.com/59088889/204587361-9a3683d8-06bc-4b60-806f-f58eb274c6b7.png">
WIP - Not a representation of the final product

## About Plug/Plugs - Motivation

After seeing the low amount of well-defined online services offering user-to-user help, I looked into creating a solution myself.
One of the most important things was for it to be quick, easy to use and trustworthty for the user-to-user.
Plug/Plugs will try to deliver a system where you access help from anyone, at anytime. This concept is called "Plugs".
Plugs will also have the option to list what they're capable of doing, and the time they're available (in realtime)

On the other hand, are jobs. These are your traditonal jobs which users can post, and anyone can offer to help in exchange for $$$.

Clearly, the "Plugs" will the most interesting concecpt of the application, and how to perfect it's use case. It'll be an exciting project which I hope
to keep open-source. (plz don't steal my idea. Contribute instead)

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

## Funding

I need investors!
