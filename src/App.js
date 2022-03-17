import {
  Link,
  Route,
  Routes,
  useLocation,
  useParams,
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/about"} element={<About />}>
        <Route path={":userid"} element={<div>userID</div>} />
        <Route path={"kong"} element={<div>Kong</div>} />
      </Route>
      <Route path={"/search"} element={<Search />} />
    </Routes>
  );
}
export default App;

function Home() {
  return <Layout>HOME</Layout>;
}
function About() {
  // params 읽기
  const params = useParams();
  const location = useLocation();
  console.log(params);
  console.log(location.search);
  return (
    <Layout>
      <h1>About Base</h1>
      <Outlet />
    </Layout>
  );
}

function Search() {
  // query 읽기
  const location = useLocation();
  console.log(location.search);
  return <Layout>Search</Layout>;
}

function Layout({ children }) {
  return (
    <div>
      <div>
        <h3>Nav bar</h3>
        <Link to={"/"}>HOME</Link>
        <Link to={"/about"}>ABOUT</Link>
        <Link to={"/search"}>Search</Link>
      </div>
      {children}
    </div>
  );
}
