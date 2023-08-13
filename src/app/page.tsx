'use client';
declare global {
  interface Window {
    snap: any;
  }
}

import { useState } from 'react';

export default function Home() {
  const [amount, setAmount] = useState(0);

  const pay = async () => {
    console.log('amount', amount);
    const result = await fetch('/api/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log('err', err);
      });

    const {
      transaction: { token },
    } = result;

    window.snap.pay(token, {
      onSuccess: function (result: any) {
        console.log('onSuccess', result);
      },
      onPending: function (result: any) {
        console.log('onPending', result);
      },
      onError: function (result: any) {
        console.log('onError', result);
      },
      onClose: function (result: any) {
        console.log('onClose', result);
      },
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-6xl font-bold text-center">Test Payment</h1>

        <div>
          <div className="flex flex-col">
            <label className="text-xl font-bold">Rupiah Amount</label>
            <input
              className="border-2 border-gray-300 p-2 rounded-lg"
              type="number"
              style={{ color: 'black' }}
              onChange={(e) => setAmount(parseInt(e.target.value, 10))}
            />
          </div>
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded-lg mt-4"
            onClick={pay}
          >
            Pay
          </button>
        </div>
      </div>
    </main>
  );
}
