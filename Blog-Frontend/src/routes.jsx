import { Posts } from "./components/Posts/Posts";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage"
import { FeedPage } from "./pages/feed/FeedPage";

export const routes = [
    {
        path: '*',
        element: <NotFoundPage />
    },
    {
        path: '/feed',
        element: <FeedPage />,
        children: [
            {
                index: true,
                element: <p>Bienvenido al feed, selecciona una opción</p>
            },
            {
                path: 'posts',
                element: <Posts />
            }
        ]
    }
]