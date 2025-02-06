import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
    try {
        // const { searchParams } = new URL(request.url);
        // const message = searchParams.get('message');

        // if (!message) {
        //     return NextResponse.json(
        //         { error: 'Message is required' },
        //         { status: 400 }
        //     );
        // }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: 'system', content: 'Create a cool name for a jousting robot.' },
            ],
        });

        console.log(completion.choices[0].message);
        const name = completion.choices[0].message.content;



        return NextResponse.json(completion.choices[0].message);

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to process the request' },
            { status: 500 }
        );
    }
} 