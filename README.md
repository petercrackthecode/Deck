# Deck

![1](https://user-images.githubusercontent.com/64865136/115148565-c3b97700-a07d-11eb-8e63-75c94974efc6.jpg)


## What is Deck?
"An admin board to manage your employees' access to workplace's resources."
Deck is a platform for admins and managers to handle the access of the company's data and resources. Any employee being able to access the data even after leaving the company may result in a privacy breach on the company's end. Deck solves this problem.

## Motivation
One of our teammates noticed a security loophole with the current authentication flow after completing his internship. Even when his email was deleted, he still had the access to the company's MongoDB database just by typing email & password correctly. 

Organizations lacking an efficient and secure method to allocate an employee their resources seemed to be an extrinsic problem. We built Deck to solve this problem.

## Screenshots

![media](https://user-images.githubusercontent.com/64865136/115155362-47369080-a09d-11eb-9645-162bb7a32093.gif)

![5](https://user-images.githubusercontent.com/64865136/115155283-d1cac000-a09c-11eb-9430-ad4dbdc5206c.jpg)

## Tech/framework used

<b>Built with</b>
- Node.js
- React
- MongoDB

## Features

- The architecture of multiple components that we've implemented.
- An admin on logging in on Deck can see who has the access to which resource either viewing it by employee list or by resource/service list and can disable/enable the access of that resource by the user with a simple toggle switch.
- Implementation and integration of oAuth service which is like that of "google sign in/sign up."
- Someone on a 3rd party platform can use authentication with Deck (provided that the platform has Deck authentication integrated) and get access to their account if the admin authorise it.

## Installation

- [Install Node JS] (https://nodejs.org/en/download/)
- [Install React] (https://www.tutorialspoint.com/reactjs/reactjs_environment_setup.htm)

    - **Step 1**  (Backend)
      npm install
      
      node server.js
      
      
      
    - **Step 2** (Frontend)

      cd client (or any other directory name)
      
      npm install
      
      npm start
      

## Contribute

Found a bug? See the scope of adding another feature? Feel free to contribute!

- Contact any one of us for any assistance you need
- Create an issue under the issues tab, or comment under an already opened issue
- Wait for you to get assigned to it and then start working
- Make a PR!

## License

 - MIT : http://opensource.org/licenses/MIT
