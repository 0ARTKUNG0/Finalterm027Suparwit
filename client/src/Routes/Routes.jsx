import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import AddBooks from "../Pages/AddBooks";
import AddComics from "../Pages/AddComics";
import AddJournals from "../Pages/AddJournals";
import UpdateBooks from "../Pages/UpdateBooks";
import UpdateComics from "../Pages/UpdateComics";
import UpdateJournals from "../Pages/UpdateJournals";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/add-books",
        element: <AddBooks />,
    },
    {
        path: "/add-comics",
        element: <AddComics />,
    },
    {
        path: "/add-journals",
        element: <AddJournals />,
    },
    {
        path: "/update-book/:id",
        element: <UpdateBooks />,
    },
    {
        path: "/update-comic/:id",
        element: <UpdateComics />,
    },
    {
        path: "/update-journal/:id",
        element: <UpdateJournals />,
    },
]);
export default router;
