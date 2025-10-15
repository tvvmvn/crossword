import { Html, Head, Main, NextScript } from "next/document";
import { Analytics } from '@vercel/analytics/next';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <Analytics />
        <NextScript />
      </body>
    </Html>
  );
}
