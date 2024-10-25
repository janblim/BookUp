import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import MainPage from '../components/MainPage';
import BookPage from '../components/BookPage';
import SortedPage from '../components/SortedPage';
import FavoritePage from '../components/FavoritePage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "books/:book_id",
        element: <BookPage />
      },
      {
        path: "sorted/:sorted_by",
        element: <SortedPage />
      },
      {
        path: "books/favorites",
        element: <FavoritePage />
      }
    ],
  },
]);
