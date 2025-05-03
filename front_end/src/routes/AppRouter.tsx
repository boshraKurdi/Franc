import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import SuspendPage from '@components/feedback/SuspendPage/SuspendPage';
import { useAppSelector } from '@hooks/app';
const BookInfo = lazy(() => import('@pages/BookInfo/BookInfo'));
const Login = lazy(() => import('@pages/Login/Login'));
const Books = lazy(() => import('@pages/Admin/Books/Books'));
const HomePage = lazy(() => import('@pages/HomePage'));
const Home = lazy(() => import('@pages/Home/Home'));
const Register = lazy(() => import('@pages/Register/Register'));
const Courses = lazy(() => import('@pages/Courses/Courses'));
const CourseInfo = lazy(() => import('@pages/CourseInfo/CourseInfo'));
const Profile = lazy(() => import('@pages/Profile/Profile'));
const QuizTest = lazy(() => import('@pages/QuizTest/QuizTest'));
const Level = lazy(() => import('@pages/Level/Level'));
const Unit = lazy(() => import('@pages/Unit/Unit'));
const Lesson = lazy(() => import('@pages/Lesson/Lesson'));
const QuizUnit = lazy(() => import('@pages/QuizUnit/QuizUnit'));
const QuizLesson = lazy(() => import('@pages/QuizLesson/QuizLesson'));
const Dashboard = lazy(() => import('@pages/Admin/Dashboard/Dashboard'));
const Main = lazy(() => import('@pages/Admin/Main/Main'));
const Operations = lazy(() => import('@pages/Admin/Operations/Operations'));
const Settings = lazy(() => import('@pages/Admin/Settings/Settings'));
const Book = lazy(() => import('@pages/Book/Book'));
const Statestics = lazy(() => import('@pages/Admin/Statestics/Statestics'));
const QuizLevelPage = lazy(() => import('@pages/Admin/QuizLevelPage/QuizLevelPage'));
const QuizUnitPage = lazy(() => import('@pages/Admin/QuizUnitPage/QuizUnitPage'));
const QuizLessonPage = lazy(() => import('@pages/Admin/QuizLessonPage/QuizLessonPage'));
const Certificate = lazy(() => import('@pages/Certificate/Certificate'));
const Payment = lazy(() => import('@pages/Payment/Payment'));
const Payments = lazy(() => import('@pages/Admin/Payments/Payments'));
QuizUnit
function App() {
  const { language } = useAppSelector(state => state.language)
  document.body.dataset.lang = language;

  const router = createBrowserRouter([{
    path: '/',
    element: <SuspendPage ><HomePage /></SuspendPage>,
    children: [{
      index: true, element: <Home />,
    }, {
      path: '/login',
      element: <SuspendPage> <Login /></SuspendPage>


    }, {
      path: '/register',
      element: <SuspendPage> <Register /></SuspendPage>


    }, {
      path: '/courses',
      element: <SuspendPage> <Courses /></SuspendPage>

    }
      , {
      path: '/books',
      element: <SuspendPage> <Book /></SuspendPage>

    }
      , {
      path: '/books/:id/show',
      element: <SuspendPage> <BookInfo /></SuspendPage>

    }
      , {
      path: '/books/:id/show/buy',
      element: <SuspendPage> <Payment /></SuspendPage>

    }
      , {
      path: '/profile',
      element: <SuspendPage> <Profile /></SuspendPage>

    }
      , {
      path: '/courses/:id/show',
      element: <SuspendPage> <CourseInfo /></SuspendPage>

    }
      , {
      path: '/courses/:id/show/quiz',
      element: <SuspendPage> <QuizTest /></SuspendPage>

    }, {
      path: '/courses/:id/levels/:idLevel',
      element: <SuspendPage> <Level /></SuspendPage>

    }
      , {
      path: '/courses/:id/levels/:idLevel/units/:idUnit',
      element: <SuspendPage> <Unit /></SuspendPage>
    }
      , {
      path: '/courses/:id/levels/:idLevel/units/:idUnit/quiz',
      element: <SuspendPage> <QuizUnit /></SuspendPage>
    }
      , {
      path: '/courses/:id/levels/:idLevel/units/:idUnit/lessons/:idLesson',
      element: <SuspendPage> <Lesson /></SuspendPage>
    }
      , {
      path: '/courses/:id/levels/:idLevel/units/:idUnit/lessons/:idLesson/quiz',
      element: <SuspendPage> <QuizLesson /></SuspendPage>
    }
      , {
      path: 'certificate/:id',
      element: <SuspendPage> <Certificate /></SuspendPage>
    }


    ]
  }, {
    path: '/dashboard',
    element: <SuspendPage ><Dashboard /></SuspendPage>,
    children: [{
      index: true, element: <Dashboard />,
    }, {
      path: 'operations',
      element: <SuspendPage ><Operations /></SuspendPage>,
    },
    {
      path: 'main',
      element: <SuspendPage ><Main /></SuspendPage>,
    },
    {
      path: 'settings',
      element: <SuspendPage ><Settings /></SuspendPage>,
    }
      ,
    {
      path: 'books',
      element: <SuspendPage ><Books /></SuspendPage>,
    }
      ,
    {
      path: 'quiz_course',
      element: <SuspendPage ><QuizLevelPage /></SuspendPage>,
    },
      ,
    {
      path: 'quiz_unit',
      element: <SuspendPage ><QuizUnitPage /></SuspendPage>,
    },
      ,
    {
      path: 'quiz_lesson',
      element: <SuspendPage ><QuizLessonPage /></SuspendPage>,
    },
    {
      path: 'states',
      element: <SuspendPage ><Statestics /></SuspendPage>,
    },
    {

      path: 'payments',
      element: <SuspendPage ><Payments /></SuspendPage>,
    }, {
      path: 'profile',
      element: <SuspendPage> <Settings /></SuspendPage>

    }
      , {
      path: 'courses/:id/show',
      element: <SuspendPage> <CourseInfo /></SuspendPage>

    }, {
      path: 'courses',
      element: <SuspendPage> <Courses /></SuspendPage>

    }
      , {
      path: 'courses/:id/levels/:idLevel',
      element: <SuspendPage> <Level /></SuspendPage>

    }, {
      path: 'courses/:id/levels/:idLevel/units/:idUnit',
      element: <SuspendPage> <Unit /></SuspendPage>
    }
      , {
      path: 'courses/:id/levels/:idLevel/units/:idUnit/quiz',
      element: <SuspendPage> <QuizUnit /></SuspendPage>
    }
      , {
      path: 'courses/:id/levels/:idLevel/units/:idUnit/lessons/:idLesson',
      element: <SuspendPage> <Lesson /></SuspendPage>
    }
      , {
      path: 'courses/:id/levels/:idLevel/units/:idUnit/lessons/:idLesson/quiz',
      element: <SuspendPage> <QuizLesson /></SuspendPage>
    }

    ]
  }
  ])
    ;

  return <RouterProvider router={router} />

}

export default App
