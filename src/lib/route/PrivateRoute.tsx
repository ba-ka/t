import { Redirect, Route } from 'react-router-dom';

interface IComp {
    children: any;
    path: any;
}

export const PrivateRoute: React.FC<IComp> = ({ children, ...rest }) => {
    let auth = localStorage.getItem('auth');
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}

export default PrivateRoute