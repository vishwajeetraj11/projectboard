import { useAuth0 } from '@auth0/auth0-react';
import "animate.css/animate.min.css";
import { Loader } from 'components/Loader';
import { cssTransition, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes } from 'routes';
// import {} from 'socket.io-client'

const slideUp = cssTransition({
  enter: "animate__animated animate__slideInUp",
  exit: "animate__animated animate__slideOutDown"
});

export const App = () => {

  return (
    <div className="App">
      <Routes />
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
    </div>
  );
};


