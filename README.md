
# Frontend Mentor - Ping coming soon page solution

This is a solution to the [Ping coming soon page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ping-single-column-coming-soon-page-5cadd051fec04111f7b848da). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Submit their email address using an `input` field
- Receive an error message when the `form` is submitted if:
  - The `input` field is empty. The message for this error should say _"Whoops! It looks like you forgot to add your email"_
  - The email address is not formatted correctly (i.e. a correct email address should have this structure: `name@host.tld`). The message for this error should say _"Please provide a valid email address"_

### Links

- Solution URL: [Solution](https://github.com/vdommala/ping-comming-soon-app.git)
- Live Site URL: [Live Site](https://vdommala.github.io/ping-comming-soon-app/)

## My process
- Used Angular framework to build the application.
- Used Reactive form validtion functions for displaying error message even though the there only one field keeping in mind that future form fields can be added.
- created error message directive which sets aria-invalid and aria-errormessage accesibility attributes to the input field.
- created a error message component which display error based on type of validation errors

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [Angular](https://angular.io/) with reactive forms and validation functions for implementing the email validations.
- Directive to bind aria-invalid and aria-errormessage to input field and listener for blur output.



## Author

- Frontend Mentor - [@vdommala](https://www.frontendmentor.io/profile/vdommala)


