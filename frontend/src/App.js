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


// App.js
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { restoreUser } from "./store/session";
import SpotGrid from "./components/SpotGrid/SpotGrid";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import Modals from "./components/Modals";
import Header from "./components/Header/Header";

export default function App() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log("Searching for:", term); // Log the search term
  };

  return (
    <div>
      <Modals />
      <Switch>
        <Route exact path="/">
          <Header className="homepageHeader" onSearch={handleSearch} />
          {/* Pass searchTerm to SpotGrid */}
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
