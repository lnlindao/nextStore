import Head from "next/head";
import Image from "next/image";
import { Fragment } from "react";
import Navbar from "./Navbar";

export const Layout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <Fragment>
      <Head>
        <title>Publidimas</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className=" mx-auto flex z-40">
        <div className="flex-1">
          <Navbar />
        </div>
      </header>
      <main>{children}</main>
      <footer className="container py-11">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </Fragment>
  );
};