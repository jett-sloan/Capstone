import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import theTeam from '../pictures/about-page-pic.jpg'
import '../css/index.css'
const Home = () => {
  return (
    <div className="container-fluid p-0">
      <section className="hero bg-primary text-white text-center p-5">
        <div className="container">
          <h1 className="display-4">Welcome to Our Window Washing Service</h1>
          <p className="lead">Crystal clear windows, every time.</p>
          <a className="btn btn-secondary btn-lg" href="/quote">Get a Quote</a>
        </div>
      </section>

      <section className="about py-5">
        <div className="container">
          <h2>About Us</h2>
          <div className="row">
            <div className="col-md-6">
              <p className="lead">We offer professional window washing services and I'm also a certified full-stack software engineer.</p>
            </div>
            <div className="col-md-6">
              <img src={theTeam} className="img-fluid" alt="About Us" />
            </div>
          </div>
        </div>
      </section>



      <section className="contact py-5">
        <div className="container">
          <h2>Contact Us</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" className="form-control" id="name" name="name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="email" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea className="form-control" id="message" name="message"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
        </div>
      </section>

      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
          <p><a className="text-white" href="/privacy">Privacy Policy</a> | <a className="text-white" href="/terms">Terms of Service</a></p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
