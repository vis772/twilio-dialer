'use client';

import { useState } from 'react';

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCall = async () => {
    if (!phoneNumber) {
      setStatus('Please enter a phone number.');
      return;
    }

    setIsLoading(true);
    setStatus('Dialing...');

    try {
      const res = await fetch('/api/outbound-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toPhone: phoneNumber }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus(`📞 Call started! Call SID: ${data.callSid}`);
      } else {
        setStatus('❌ Failed to call.');
      }
    } catch (error) {
      setStatus('❌ Error making the call.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Nova360 Outbound Dialer</h1>

        <label htmlFor="phone" className="block mb-2 font-medium">
          Enter Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          placeholder="+1XXXXXXXXXX"
          className="w-full p-2 border rounded mb-4"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <button
          onClick={handleCall}
          disabled={isLoading}
          className={`w-full py-2 rounded text-white ${
            isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Calling...' : 'Start Call'}
        </button>

        {status && <p className="mt-4 text-center">{status}</p>}
      </div>
    </div>
  );
}
