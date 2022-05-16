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
import { ToastContainer_box } from "@utils/defaultImports";
import "@fullcalendar/common/main.css";
import "@fullcalendar/timeline/main.css";
import "@fullcalendar/resource-timeline/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import "@styles/globals.css";
import GlobalStyles from "@theme/globalStyles";
import "react-toastify/dist/ReactToastify.css";

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
            {ToastContainer_box}
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
