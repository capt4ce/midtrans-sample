import { NextResponse } from 'next/server';

const midtransClient = require('midtrans-client');

export async function POST(request: Request) {
    const body = await request.json();
    const { amount } = body;

    const midtransSnap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY,
        clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
    });

    const parameter = {
        "payment_type": "qris",
        transaction_details: {
            order_id: `ORDER-${Date.now()}`,
            gross_amount: amount,
        },
    };
    const transaction = await midtransSnap.createTransaction(parameter);
    console.log(transaction);


    return NextResponse.json({ transaction });
}
