import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import AddBooks from "../Pages/AddBooks";
import AddComics from "../Pages/AddComics";
import AddJournals from "../Pages/AddJournals";

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
]);
export default router;
