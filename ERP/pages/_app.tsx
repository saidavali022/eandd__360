import * as React from "react";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import ThemeConfig from "@theme/index";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import DashboardLayout from "@layouts/dashboard";
import UserDashboardLayout from "@layouts/userdashboard";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import "@styles/globals.css";
import GlobalStyles from "@theme/globalStyles";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: React.FunctionComponent<AppPropsWithLayout> = (props) => {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;
  const pageLayout = Component.getLayout || ((page) => page);
  // if (Component.getLayout) {
  return pageLayout(
    <>
      <Provider store={store}>
        <SessionProvider session={session}>
          <ThemeConfig>
            <Component {...pageProps} />
          </ThemeConfig>
        </SessionProvider>
      </Provider>
    </>
  );
  // }

  // return (
  //   <>
  //     <Provider store={store}>
  //       <SessionProvider session={session}>
  //         <ThemeConfig>
  //           <Component {...pageProps} />
  //         </ThemeConfig>
  //       </SessionProvider>
  //     </Provider>
  //   </>
  // );
};

export default MyApp;
