import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import Root from "./Root";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router";
import { PostProvider } from "./context/post-context";
import { UserProvider } from "./context/user-context";
import { SignInputProvider } from "./context/check-signInput-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <UserProvider>
      <PostProvider>
        <SignInputProvider>
          <RouterProvider router={router} />
          <Root />
        </SignInputProvider>
      </PostProvider>
    </UserProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
