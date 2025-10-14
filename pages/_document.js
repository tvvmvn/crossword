import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <div className="bg-gray-100">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  );
}
