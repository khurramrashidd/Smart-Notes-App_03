import "./Footer.css";

function Footer({ day }) {
  return (
    <footer className="footer">
      <p>
        Built by <strong>Khurram Rashid</strong> | React Learning Day {day}
      </p>
    </footer>
  );
}

export default Footer;