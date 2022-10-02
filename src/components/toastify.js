import { Flip, Slide, toast } from 'react-toastify';

const notify = (text, type) => {
    if (type === "success"){
        toast.success(text, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            });
    }else{
        toast.error(text, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            });
    }
}

export default notify;