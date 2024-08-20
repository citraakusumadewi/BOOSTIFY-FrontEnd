import React, { useState, useEffect } from 'react';

const Coba: React.FC = () => {
  const [responseText, setResponseText] = useState<string>('');

  useEffect(() => {
    // Mengirim permintaan ke server backend melalui link Ngrok
    fetch('https://9c7f-103-233-100-231.ngrok-free.app/')
      .then(response => response.text())
      .then(data => {
        setResponseText(data); // Menyimpan respons dari server
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>{responseText}</h1> {/* Menampilkan respons dari server */}
    </div>
  );
};

export default Coba;
