import { Layout, Typography } from "antd";
import { displayName } from "../package.json";
import Head from "next/head";
import type { AppProps } from "next/app";

import "antd/dist/antd.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{displayName}</title>
      </Head>
      <Layout>
        <Layout.Header style={{ display: "flex", alignItems: "center" }}>
          <Typography.Title level={4} style={{ color: "#fff", margin: 0 }}>
            {displayName}
          </Typography.Title>
        </Layout.Header>
        <Layout.Content style={{ padding: "48px" }}>
          <Component {...pageProps} />
        </Layout.Content>
      </Layout>
    </>
  );
}

export default MyApp;
