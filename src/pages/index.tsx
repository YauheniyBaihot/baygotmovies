import { AboutMe } from "@/components/about-me/AboutMe";
import { Films } from "@/components/films/Films";
import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { Weddings } from "@/components/weddings/Weddings";
import Head from "next/head";

// TODO: set viewport, favicon, description
export default function Home() {
  return (
    <>
      <Head>
        <title>baygotmovies</title>
        <meta name="description" content="Wedding videographer, Alena" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Header />
      <AboutMe />
      <Weddings items={[]} />
      <Films items={[]} />
      <Footer />
      {/*<main className={styles.main}>*/}
      {/*  <SocialNetworkLink variant="telegram" path="test" />*/}
      {/*  <div className={styles.description}>*/}
      {/*    <p>*/}
      {/*      Get started by editing&nbsp; this cool page*/}
      {/*      <code className={styles.code}>src/pages/index.tsx</code>*/}
      {/*    </p>*/}
      {/*    <div>*/}
      {/*      <a*/}
      {/*        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*/}
      {/*        target="_blank"*/}
      {/*        rel="noopener noreferrer"*/}
      {/*      >*/}
      {/*        By{' '}*/}
      {/*        <Image*/}
      {/*          src="/vercel.svg"*/}
      {/*          alt="Vercel Logo"*/}
      {/*          className={styles.vercelLogo}*/}
      {/*          width={100}*/}
      {/*          height={24}*/}
      {/*          priority*/}
      {/*        />*/}
      {/*      </a>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className={styles.center}>*/}
      {/*    <Image*/}
      {/*      className={styles.logo}*/}
      {/*      src="/next.svg"*/}
      {/*      alt="Next.js Logo"*/}
      {/*      width={180}*/}
      {/*      height={37}*/}
      {/*      priority*/}
      {/*    />*/}
      {/*    <div className={styles.thirteen}>*/}
      {/*      <Image*/}
      {/*        src="/thirteen.svg"*/}
      {/*        alt="13"*/}
      {/*        width={40}*/}
      {/*        height={31}*/}
      {/*        priority*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className={styles.grid}>*/}
      {/*    <a*/}
      {/*      href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*/}
      {/*      className={styles.card}*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener noreferrer"*/}
      {/*    >*/}
      {/*      <h2 className={inter.className}>*/}
      {/*        Docs <span>-&gt;</span>*/}
      {/*      </h2>*/}
      {/*      <p className={inter.className}>*/}
      {/*        Find in-depth information about Next.js features and&nbsp;API.*/}
      {/*      </p>*/}
      {/*    </a>*/}
      {/*    <a*/}
      {/*      href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*/}
      {/*      className={styles.card}*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener noreferrer"*/}
      {/*    >*/}
      {/*      <h2 className={inter.className}>*/}
      {/*        Learn <span>-&gt;</span>*/}
      {/*      </h2>*/}
      {/*      <p className={inter.className}>*/}
      {/*        Learn about Next.js in an interactive course with&nbsp;quizzes!*/}
      {/*      </p>*/}
      {/*    </a>*/}
      {/*    <a*/}
      {/*      href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*/}
      {/*      className={styles.card}*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener noreferrer"*/}
      {/*    >*/}
      {/*      <h2 className={inter.className}>*/}
      {/*        Templates <span>-&gt;</span>*/}
      {/*      </h2>*/}
      {/*      <p className={inter.className}>*/}
      {/*        Discover and deploy boilerplate example Next.js&nbsp;projects.*/}
      {/*      </p>*/}
      {/*    </a>*/}
      {/*    <a*/}
      {/*      href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*/}
      {/*      className={styles.card}*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener noreferrer"*/}
      {/*    >*/}
      {/*      <h2 className={inter.className}>*/}
      {/*        Deploy <span>-&gt;</span>*/}
      {/*      </h2>*/}
      {/*      <p className={inter.className}>*/}
      {/*        Instantly deploy your Next.js site to a shareable URL*/}
      {/*        with&nbsp;Vercel.*/}
      {/*      </p>*/}
      {/*    </a>*/}
      {/*  </div>*/}
      {/*</main>*/}
    </>
  );
}
