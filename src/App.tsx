import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedSiderV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./providers/authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  PatientCreate,
  PatientEdit,
  PatientList,
  PatientShow,
} from "./pages/patients";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Stack, Typography } from "@mui/material";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider(BASE_URL)}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={[
                {
                  name: "patients",
                  list: "/patients",
                  create: "/patients/create",
                  edit: "/patients/edit/:id",
                  show: "/patients/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "66O3GN-qFI3dx-g2LwQF",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <ThemedLayoutV2
                        Header={() => <Header sticky />}
                        Sider={() => (
                          <ThemedSiderV2
                            Title={({ collapsed }) => {
                              return (
                                <Stack
                                  direction="row"
                                  gap="16px"
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  <img
                                    width="45px"
                                    height="45px"
                                    src={`logo.png`}
                                    alt=" H&C Portal"
                                  />
                                  {!collapsed && (
                                    <Typography
                                      sx={{
                                        display: {
                                          xs: "none",
                                          sm: "inline-block",
                                        },
                                      }}
                                      variant="subtitle2"
                                    >
                                      H&C Portal
                                    </Typography>
                                  )}
                                </Stack>
                              );
                            }}
                            render={({ items, logout, collapsed }) => {
                              return (
                                <>
                                  {items}
                                  {logout}
                                </>
                              );
                            }}
                          />
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="patients" />}
                  />
                  <Route path="/patients">
                    <Route index element={<PatientList />} />
                    <Route path="create" element={<PatientCreate />} />
                    <Route path="edit/:id" element={<PatientEdit />} />
                    <Route path="show/:id" element={<PatientShow />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-outer"
                      fallback={<Outlet />}
                    >
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
