'use client';

import { createUserData } from "../store/store";
import { useEffect } from 'react';


 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  useEffect(() => {
    createUserData();
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}