import React from "react";

export default function Map() {
  return (
    <div className="w-100">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1638.814640618897!2d10.743310800000012!3d34.764930299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1301d3175e24840f%3A0xe01c91f8053f0d4c!2sQP7V%2BX9Q%2C%20Sfax!5e0!3m2!1sfr!2stn!4v1751546192739!5m2!1sfr!2stn"
        width="100%"
        height={400}
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

    </div>
  );
}
