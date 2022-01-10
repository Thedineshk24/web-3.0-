import { Loader, Services, Transaction, Welcome } from "./components/index";
import { NavBar, Footer } from "./layout/index";

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <NavBar />
        <Welcome />
      </div>
      <Services />
      <Transaction />
      <Footer />
    </div>
  );
};

export default App;
