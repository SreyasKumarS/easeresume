import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import ProtectedRoute from './components/protectedRoutes'


import Register from './screens/registrationScreen';
import Login from './screens/loginScreen';
import Dashboard from './screens/resumeDashboard';
import ResumePreviewPage from './components/ResumePreview';
import ForgotPasswordPage from './screens/forgotPassword'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="/users/register" />} />
      <Route path="users">
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login  />} />
        <Route path="Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="ResumePreview/:id" element={<ResumePreviewPage />} />
        <Route path="ForgotPassword" element={<ForgotPasswordPage />} />
      </Route>
    </Route>
  )
);

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);