import { Redirect, Route } from 'react-router-dom';

interface IComp {
    children: any;
    path: any;
}

export const UnprivateRoute: React.FC<IComp> = ({ children, ...rest }) => {
    let auth = localStorage.getItem('auth');
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth ? (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          ) : (
            children
          )
        }
      />
    );
}

export default UnprivateRoute