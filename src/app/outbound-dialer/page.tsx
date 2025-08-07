'use client';

import { useState } from 'react';

export default function OutboundDialer() {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Nova360 Outbound Dialer</h1>

        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Enter Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          placeholder="+1XXXXXXXXXX"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <button
          onClick={handleCall}
          disabled={isLoading}
          className={`w-full py-2 text-white rounded-lg ${
            isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Calling...' : 'Start Call'}
        </button>

        {status && (
          <p className="mt-4 text-center text-sm text-gray-700">{status}</p>
        )}
      </div>
    </div>
  );
}
