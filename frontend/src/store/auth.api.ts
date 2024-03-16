import { IUserLogin, IUserSignup } from "../types/auth.types";
import { AppDispatch } from "./store";
import { errorAuth, getAllUsers, loadAuth, logoutAuth, successAuth, successLoginAuth } from "./auth.action";
import { toast } from "react-toastify";

export const signinApi = (userData: IUserLogin, navigate: any) => async (dispatch: AppDispatch) => {
     if (!userData.email || !userData.password) {
          toast.error("Fill the Details")
          return;
     }

     // start loading
     dispatch(loadAuth());

     try {
          const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/users/login`, {
               method: 'POST',
               body: JSON.stringify(userData),
               headers: {
                    'Content-Type': 'application/json'
               }
          })

          const data = await res.json();

          if (res.ok) {
               dispatch(successLoginAuth(data.user));
               navigate('/');
               toast.success(data.message)
          } else {
               dispatch(errorAuth());
               toast.error(data.message);
          }


     } catch (error: any) {
          console.log('error:', error);
          dispatch(errorAuth());
          toast.error(error.message);
     }
}


export const signupApi = (userData: IUserSignup, navigate: any) => async (dispatch: AppDispatch) => {
     if (!userData.name || !userData.email || !userData.password) return;

     // start loading
     dispatch(loadAuth());

     try {
          const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/users/register`, {
               method: "POST",
               body: JSON.stringify(userData),
               headers: {
                    'Content-Type': 'application/json'
               }
          })

          const data = await res.json();
          console.log(data)

          dispatch(res.ok ? successAuth() : errorAuth());
          if(res.ok){
            navigate('/login')
            toast.success(data.message)
          }else  toast.error(data.message)


     } catch (error: any) {
          console.log('error:', error);
          dispatch(errorAuth())
          toast.error(error.message);
     }
}

/**
 * for log-out only
 */
export const logoutApi = () => (dispatch: AppDispatch) => {
     dispatch(logoutAuth());
     window.location.replace('/')
}



export const getUsersApi = () => async (dispatch: AppDispatch) => {
     // Start loading
     dispatch(loadAuth());
   
     try {
       const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/users`, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json'
         }
       });
   
       const data = await res.json();
   
       if (res.ok) {
         dispatch(getAllUsers(data));
       } else {
         dispatch(errorAuth());
         toast.error(data.message);
       }
     } catch (error: any) {
       console.log('error:', error);
       dispatch(errorAuth());
       toast.error("Failed to fetch users");
     }
   }