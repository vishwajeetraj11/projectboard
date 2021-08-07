import { StylesProvider } from '@material-ui/core';
import "animate.css/animate.min.css";
import { Landing } from 'pages/Landing';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { cssTransition, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Board } from './pages/Board';
import { Home } from './pages/Home';


const slideUp = cssTransition({
  enter: "animate__animated animate__slideInUp",
  exit: "animate__animated animate__slideOutDown"
});

export const App = () => {
  return (
    <div className="App">
      <StylesProvider injectFirst>
        <BrowserRouter>
          <Switch>
            <Route path='/home' exact component={Landing} />
            <Route path='/' exact component={Home} />
            <Route path='/board' exact component={Board} />
          </Switch>
        </BrowserRouter>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          transition={slideUp}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </StylesProvider>
    </div>
  );
};


