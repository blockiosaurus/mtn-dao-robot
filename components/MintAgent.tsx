'use client';

import { useState } from 'react';

export default function MintAgent() {
    const [isMinting, setIsMinting] = useState(false);

    const handleMint = async () => {
        try {
            setIsMinting(true);
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to mint agent');
            }

            const data = await response.json();
            console.log('Minted agent:', data);
            // You can add additional handling here, like showing a success message
        } catch (error) {
            console.error('Error minting agent:', error);
            // You can add error handling here, like showing an error message
        } finally {
            setIsMinting(false);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <button
                onClick={handleMint}
                disabled={isMinting}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition-colors"
            >
                {isMinting ? 'Minting...' : 'Mint New Agent'}
            </button>
        </div>
    );
} 