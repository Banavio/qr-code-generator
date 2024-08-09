import React, { useEffect, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';



const QRGenerator = () => {
  const [url, setUrl] = useState('');
  const [color, setColor] = useState('#000000');
  const [style, setStyle] = useState('dots');
  const [fileType, setFileType] = useState('png');
  const [imageUrl, setImageUrl] = useState('');
  const [blobUrl, setBlobUrl] = useState(null);

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    const svg = document.querySelector('svg');
    if (canvas){
      const url = canvas.toDataURL(`image/${fileType}`);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qrcode.${fileType}`;
      a.click();
    }else if (svg){
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/{' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const a = document.createElement('a');
      a.href = svgUrl;
      a.download = `qrcode.svg`;
      a.click();
    }
  };

  useEffect(() => {
    if (imageUrl) {
      fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
          const blobUrl = URL.createObjectURL(blob);
          setBlobUrl(blobUrl);
        })
        .catch(error => console.error('Error fetching image:', error));
    }else{
      setBlobUrl(null);
    }
  }, [imageUrl]);

  return (
    <div className="flex flex-col items-center p-10 min-h-screen bg-base-200">
      <div className="p-5 shadow-md rounded-lg flex bg-base-100 shadow-xl">
        <div className="flex flex-col ml-10">
            
          <h2 className="text-2xl font-bold">Generate QR Code</h2>
            <div className="flex flex-col my-6">
                <div className="flex flex-col">
                    <label className="font-semibold">Enter or Paste URL <span className='text-secondary'>(Max 120)</span></label>
                    <input 
                    type="text"
                    placeholder="https://www.example.com"
                    className="input input-bordered w-full max-w-lg mt-2"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    maxLength={120}
                    />
                    <input 
                    type="text"
                    placeholder="Image URL"
                    className="input input-bordered w-full max-w-lg mt-2"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-col p-2 rounded-lg bg-white">
                <QRCode 
                value={url} 
                qrStyle={style}
                size={256} 
                bgColor="#ffffff"
                fgColor={color} 
                level="M"
                renderAs="canvas"
                // imageSettings={imageSettings}
                logoImage={blobUrl}
                removeQrCodeBehindLogo={true}
                logoPadding={10}
                eyeRadius={3}
                />
            </div>
        </div>
        <div className="flex flex-col ml-10">
          
          <div className="flex flex-col my-4">
            <label className="font-semibold">Style</label>
            <div className="flex space-x-2 mt-2">
              <button 
                onClick={() => setStyle('squares')}
                className={`btn ${style === 'squares' ? 'btn-active' : ''}`}
              >
                Square
              </button>
              <button 
                onClick={() => setStyle('dots')}
                className={`btn ${style === 'dots' ? 'btn-active' : ''}`}
              >
                Dot
              </button>
              <button
                onClick={() => setStyle('fluid')}
                className={`btn ${style === 'fluid' ? 'btn-active' : ''}`}
              >
                Fluid
              </button>
            </div>
          </div>

          <div className="flex flex-col my-4">
            <label className="font-semibold">Color</label>
            <div className="flex space-x-2 mt-2">
              <button 
                onClick={() => setColor('#000000')}
                className="btn btn-circle btn-outline"
                style={{ backgroundColor: '#000000' }}
              />
              <button 
                onClick={() => setColor('#1e3a8a')}
                className="btn btn-circle btn-outline"
                style={{ backgroundColor: '#1e3a8a' }}
              />
              <button 
                onClick={() => setColor('#ea580c')}
                className="btn btn-circle btn-outline"
                style={{ backgroundColor: '#ea580c' }}
              />
              <button 
                onClick={() => setColor('#dc2626')}
                className="btn btn-circle btn-outline"
                style={{ backgroundColor: '#dc2626' }}
              />
              <button 
                onClick={() => setColor('#15803d')}
                className="btn btn-circle btn-outline"
                style={{ backgroundColor: '#15803d' }}
              />
            </div>
          </div>

          <div className="flex flex-col my-4">
            <label className="font-semibold">File Type</label>
            <select 
              className="select select-bordered w-full max-w-xs mt-2"
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
            >
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="webp">WEBP</option>
            </select>
          </div>

          <button 
            onClick={handleDownload}
            className="btn btn-primary mt-4"
          >
            Download
          </button>
        </div>
      </div>

    </div>
  );
};

export default QRGenerator;
