"use client";

import { SessionProvider } from "next-auth/react";
//the const Provide below is a higher order component
//which mean it will wrap other components in it
//meaning in the return, we will use SessionProvider but within it,
//we have to render the children
//since we use browser capabilites, we have to use client side to render
const Provider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
