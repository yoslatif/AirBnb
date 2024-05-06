// // App.js
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { Route, Switch } from "react-router-dom";
// import { restoreUser } from "./store/session";
// import SpotGrid from "./components/SpotGrid/SpotGrid";
// import SpotDetails from "./components/SpotDetails/SpotDetails";
// import Modals from "./components/Modals";
// import Header from "./components/Header/Header";

// export default function App() {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(restoreUser());
//   }, [dispatch]);

//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearch = (term) => {
//     setSearchTerm(term);
//     console.log("Search term set to:", term); // For debugging
//   };

//   return (
//     <div>
//       <Modals />
//       <Switch>
//         <Route exact path="/">
//           <Header className="homepageHeader" onSearch={handleSearch} />
//           <SpotGrid searchTerm={searchTerm} />
//         </Route>
//         <Route path="/spots/:spotId">
//           <SpotDetails />
//         </Route>
//         <Route path="/spotsgrid">
//           <Header className="homepageHeader" onSearch={handleSearch} />
//           <SpotGrid searchTerm={searchTerm} />
//         </Route>
//         <Route path="*">
//           <SpotDetails />
//         </Route>
//       </Switch>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { restoreUser } from "./store/session";
import SpotGrid from "./components/SpotGrid/SpotGrid";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import Modals from "./components/Modals";
import Header from "./components/Header/Header";

export default function App() {
  const dispatch = useDispatch();
  const history = useHistory(); // Get the history object to listen for navigation events
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log("Searching for:", term);
  };

  // Listen for changes in the location
  useEffect(() => {
    // Create an unlisten function
    const unlisten = history.listen((location) => {
      // If we're on the home page ("/"), reset the search term
      if (location.pathname === "/") {
        setSearchTerm("");
      }
    });

    // Cleanup the listener on component unmount
    return () => unlisten();
  }, [history]);

  return (
    <div>
      <Modals />
      <Switch>
        <Route exact path="/">
          <Header className="homepageHeader" onSearch={handleSearch} />
          <SpotGrid searchTerm={searchTerm} />
        </Route>
        <Route path="/spots/:spotId">
          <SpotDetails />
        </Route>
        <Route path="/spotsgrid">
          <Header className="homepageHeader" onSearch={handleSearch} />
          <SpotGrid searchTerm={searchTerm} />
        </Route>
        <Route path="*">
          <SpotDetails />
        </Route>
      </Switch>
    </div>
  );
}
