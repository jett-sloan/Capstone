import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
const About = () => {
  const [photos] = useState([
    "https://mail.google.com/mail/u/0?ui=2&ik=8869e14188&attid=0.7&permmsgid=msg-a:r916118493615353680&th=19098dc3424d8b90&view=fimg&fur=ip&sz=s0-l75-ft&attbid=ANGjdJ9L5J-5Yz8ATgWg_y_YO1lxq2apkdmm-TcUgx1ETbIiAp6EMOJwPHLsTdX1KRMh1j1eZFuq20ItOrQPXrTgvmkBjHBKvBeVICmgt9aakuBtXRx57qUh6dgsVXo&disp=emb&realattid=9F13A94C-40F3-4917-940C-31790D7D89B3",
    "https://mail.google.com/mail/u/0?ui=2&ik=8869e14188&attid=0.4&permmsgid=msg-a:r916118493615353680&th=19098dc3424d8b90&view=fimg&fur=ip&sz=s0-l75-ft&attbid=ANGjdJ8z6u9mwICNM5WOLHWyMZyVWpiTNsNlnts8LjiYreaSqK6KdZ2CWckxB05SMeA_zHydMK2DfqPrz5FXR8siUcxWjN31SYHZdN28jhCZf3yCVKDxHprdK8c66pI&disp=emb&realattid=96ED04F0-A39E-4C2A-BE94-4FC252EE417F",
    "https://mail.google.com/mail/u/0?ui=2&ik=8869e14188&attid=0.6&permmsgid=msg-a:r916118493615353680&th=19098dc3424d8b90&view=fimg&fur=ip&sz=s0-l75-ft&attbid=ANGjdJ-GMyi8vwxOrrOUXwcg6codtB-cjva24nnYayXPlvA-DJ0Rdn2kX4hbKtAoirtMybB-gX3zRk6gPqnMutXxJshRtVNWb9aWdkWPSPlpcWNJ3hkzQIMCPeFtq7M&disp=emb&realattid=D1DA0D96-111A-4CE1-85ED-19B0B5B7C177",
    "https://mail.google.com/mail/u/0?ui=2&ik=8869e14188&attid=0.8&permmsgid=msg-a:r916118493615353680&th=19098dc3424d8b90&view=fimg&fur=ip&sz=s0-l75-ft&attbid=ANGjdJ9zuKKBiEbC3B1pNRDKZ0Ur17UwT0u3p9TeVbKJz972KpDd0lJPhXfyHSel-2AjpYVFh4KFzTUMuyvPnNie60du5x1hJ5fAcCq3cuIdVRgKxAY8CVKiE_APDHs&disp=emb&realattid=0581AFD8-DE35-4B5E-AFD8-C0A237BB3D42"
  ]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card p-4">
            <h2 className="card-title text-center mb-4">About Us</h2>
            <p className="card-text">
              We are dedicated to providing the best window washing services in the area. Our mission is to ensure your windows are crystal clear, enhancing the beauty and comfort of your home or office.
            </p>
            <p className="card-text">
              Our team consists of skilled professionals who are committed to delivering exceptional results and outstanding customer service. With years of experience, we guarantee satisfaction with every service.
            </p>
            <p className="card-text">
              Contact us today to learn more about our services and to schedule your next window cleaning appointment.
            </p>
          </div>
        </div>
      </div>

      {/* Photo Carousel */}
      <div className="row mt-5">
        <div className="col-md-8 offset-md-2">
          <Carousel>
            {photos.map((photo, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={photo}
                  alt={`Slide ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default About;
