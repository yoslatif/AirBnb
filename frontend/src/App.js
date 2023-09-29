import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/Spots/SpotList";  // Import the SpotList component
import SpotDetail from './components/Spots/SpotDetail';
import CreateSpotForm from './components/Spots/CreateSpotForm';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <SpotList />
          </Route>
          <Route path="/spots/:id" component={SpotDetail} />
          <Route path="/create-spot" component={CreateSpotForm} />
          {/* other routes */}
        </Switch>
      )}
    </>
  );
}

export default App;



