We are going to create an application using React, TypeScript, Blueprint by Palentir, and Redux.

I have a project opened in VSCode that has these directories: server, client.

I've already created the react app in the client folder.

I want us to use these libraries along with styled-components. 

Start by giving me the code for creating a standard landing page. The landing page should state the name of the webapp TidyBytes.io, it should have a small description of the product (a webapp that hosts a suite of tools for working with and cleaning up datasets using ML models in the background; one example is a tool for working with tabular datasets), then a register and login button.



In the landing page code include anything else that might be standard for a company's landing page. We want this to look professional and modern.

We will be using an AppRoutes.tsx file to manage our routes. The landing page should have a register and login button. If I user clicks on the register or login page an appropriate modal pops up for them to enter their information. Once the form is completed the information is sent to the server side and then they are redireceted to tidybytes.io/dashboard.

I want you to start by starting from the most basic building blocks of elements we will need throught the project. Start by creating buttons, a modal for popping up a form to a user, a toast for indicating status/errors to the user, then give the code for the LandingPage.tsx (will go in routes directory), give the code for the AppRoutes.tsx, and then give the code for App.tsx.

Remember we are using React + TypeScript + Blueprint (use this as much as we can, we will just modify the styles a bit to make it fit our product), and Redux for app state.