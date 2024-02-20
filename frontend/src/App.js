// import logo from './logo.svg';
import './App.css';
import AdminEventPageForm from './components/AdminEventPageForm';
import AdminPlacePageForm from './components/AdminPlacePageForm';
import ConfirmPassword from './components/ConfirmPassword';
import Event from './components/Event';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Otp from './components/Otp';
import Place from './components/Place';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/getotp" element={<Otp />} />
          <Route exact path="/resetpassword" element={<ConfirmPassword />} />
          <Route exact path="/eventform" element={<AdminEventPageForm />} />
          <Route exact path="/event" element={<Event />} />
          <Route exact path="/placeform" element={<AdminPlacePageForm />} />
          <Route exact path="/placeDetails/:placeName" element={<Place />} />
          {/* <Route exact path="/auth/google"  />
          <Route exact path="/auth/google/" /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
