import "./Layout.css";
import Navbar from "../Navbar/Navbar";
import Routes from "../Routes/Routes"; // Add this line

export const Layout = () => {
  return (
    <div>
      <header>
        <h1>Amos fine and dine</h1>
        <Navbar />
      </header>
      <main className="wrapper">
        <Routes />
      </main>
      <footer className="wrapper">
        <p className="footer-text">&copy; 2023 Amo Livs</p>
      </footer>
    </div>
  );
};
