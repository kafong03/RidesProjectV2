// ContactPage.js
import React from 'react';
import '../CSS/ContactCSS.css'

const ContactPage = () => {
  return (
    <div className="mainContainer">
      <div className="titleContainer">Contact Us</div>
      <p>If you are experiencing any web application errors, please feel free to contact the web application developers.</p>

      <h2>Developer Contacts</h2>
      <table id="contact">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>

          <tr>
            <td><b>Kele Fong</b></td>
            <td>
              <a href="mailto:kelef@uci.edu">kelef@uci.edu</a>
            </td>
            <td>
              <a href="tel:+1510-362-6117">(510) 362-6117</a>
            </td>
          </tr>

          <tr>
            <td><b>Connor Lee</b></td>
            <td>
              <a href="mailto:connojl2@uci.edu">connojl2@uci.edu</a>
            </td>
            <td>
              <a href="tel:+1949-610-2857">(949) 610-2857</a>
            </td>
          </tr>

          <tr>
            <td><b>Kaylee Yee</b></td>
            <td>
              <a href="mailto:kayleeay@uci.edu">kayleeay@uci.edu</a>
            </td>
            <td>
              <a href="tel:+1858-204-1505">(858) 204-1505</a>
            </td>
          </tr>

          <tr>
            <td><b>Aaron Gee</b></td>
            <td>
              <a href="mailto:agee4@uci.edu">agee4@uci.edu</a>
            </td>
            <td>
              <a href="tel:+1916-385-7559">(916) 385-7559</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ContactPage;