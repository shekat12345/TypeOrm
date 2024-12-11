// src/services/userStreamService.ts
import {Observable, Observer} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import axios from 'axios';
import {store} from './../redux/store'
const RANDOM_USER_API = 'https://randomusesdsdr.me/api/?results=10';
const errorHandler = (data)=>{
  store.dispatch({type:"SET_ERRORS",payload:data})
  
}
export const userStream = new Observable<string>(
  (observer: Observer<string>) => {
    axios
      .get(RANDOM_USER_API)
      .then(response => {
        observer.next(response.data.results);
        observer.complete();
      })
      .catch(error => {
        observer.error(error); 
        errorHandler({
          url: RANDOM_USER_API,
          method: error.method,
          headers: error.headers,
        })
        
      });
  },
).pipe(
  map((users: any) =>
    users.map((user: any, index: any) => {
      console.log(index);
      return {
        id: user.login.uuid,
        _id: index,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        avatar: user.picture.thumbnail,
      };
    }),
  ),

  catchError(error => {
    console.error('Error users:', error);
    throw error;
  }),
);
export const getData = setState => {
  userStream.subscribe(() => {});
  alert('hello');
};
