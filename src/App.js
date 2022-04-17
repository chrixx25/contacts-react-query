import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ModalProvider from "mui-modal-provider";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from 'notistack';
import CssBaseline from "@mui/material/CssBaseline";
import UserProvider from "contexts/UserProvider";
import { GetUser } from 'utils/cookie';
import PrivateRoute from 'components/Routes/PrivateRoutes';
import PublicRoute from 'components/Routes/PublicRoutes';
import theme from "theme";
import Login from 'screens/login';
import Main from 'screens/main';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
      },
    },
  });
  const user = GetUser();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <UserProvider initialValue={user}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <ModalProvider>
              <Router>
                <Routes>
                  <Route
                    path='/login'
                    element={<PublicRoute component={Login} />}
                  />
                  <Route
                    path='/'
                    element={<PrivateRoute component={Main} />}
                  />
                </Routes>
              </Router>
            </ModalProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;