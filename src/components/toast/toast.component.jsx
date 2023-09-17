import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContainerForToast = () => {
  return (
    <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default ContainerForToast;
