"use client";

import React, { FC, useState, useCallback } from 'react';

const SkidSteerControl: FC = () => {
    // Default endpoint
    const [roverEndpoint, setRoverEndpoint] = useState<string>('http://10.17.19.216');
    const [lastCommandTime, setLastCommandTime] = useState<number>(0);
    const STRAIGHT_TIMEOUT = 150;
    const TURN_TIMEOUT = 200;

    /**
     * Send a command to the rover, but only if enough time has passed since the last command
     * to prevent overwhelming the network
     */
    const sendCommand = useCallback((l: number, r: number): void => {
        const now = Date.now();
        const minDelay = 1; // Minimum delay between commands

        if (now - lastCommandTime < minDelay) {
            return;
        }

        const command = {
            T: 1,
            L: l,
            R: r
        };

        // Remove any trailing slash from the endpoint
        const baseUrl = roverEndpoint.replace(/\/$/, '');
        const url = `${baseUrl}/js?json=${JSON.stringify(command)}`;

        console.log('Sending command:', url);

        fetch(url, {
            method: 'GET',
            mode: 'no-cors',
        }).catch((err) => console.error('Failed to send command:', err));

        setLastCommandTime(now);
    }, [roverEndpoint, lastCommandTime]);

    // Handler functions for button actions
    const handleForward = () => {
        sendCommand(100, 100);  // Full speed forward
        setTimeout(() => sendCommand(0, 0), STRAIGHT_TIMEOUT);  // Stop after 100ms
    };

    const handleBackward = () => {
        sendCommand(-100, -100);  // Full speed backward
        setTimeout(() => sendCommand(0, 0), STRAIGHT_TIMEOUT);  // Stop after 100ms
    };

    const handleLeft = () => {
        sendCommand(-100, 100);  // Rotate left
        setTimeout(() => sendCommand(0, 0), TURN_TIMEOUT);  // Stop after 100ms
    };

    const handleRight = () => {
        sendCommand(100, -100);  // Rotate right
        setTimeout(() => sendCommand(0, 0), TURN_TIMEOUT);  // Stop after 100ms
    };

    const handleStop = () => {
        sendCommand(0, 0);  // Stop both motors
    };

    return (
        <div style={styles.container}>
            <h2>WAVE ROVER Control (TypeScript)</h2>

            <div style={styles.endpointControl}>
                <label htmlFor="endpoint">Rover Endpoint: </label>
                <input
                    id="endpoint"
                    type="text"
                    value={roverEndpoint}
                    onChange={(e) => setRoverEndpoint(e.target.value)}
                    style={styles.endpointInput}
                />
            </div>

            <div style={styles.controls}>
                <div style={styles.buttonRow}>
                    <button
                        onClick={handleForward}
                        style={styles.button}
                    >
                        ▲
                    </button>
                </div>
                <div style={styles.buttonRow}>
                    <button
                        onClick={handleLeft}
                        style={styles.button}
                    >
                        ◄
                    </button>
                    <button
                        onClick={handleStop}
                        style={{ ...styles.button, backgroundColor: '#ff6b6b' }}
                    >
                        ■
                    </button>
                    <button
                        onClick={handleRight}
                        style={styles.button}
                    >
                        ►
                    </button>
                </div>
                <div style={styles.buttonRow}>
                    <button
                        onClick={handleBackward}
                        style={styles.button}
                    >
                        ▼
                    </button>
                </div>
            </div>
        </div>
    );
};

// Updated styles
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: 20,
    },
    controls: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        marginTop: 30,
    },
    buttonRow: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
    },
    button: {
        width: '60px',
        height: '60px',
        fontSize: '24px',
        color: '#0A0',
        backgroundColor: '#AAA',
        border: '1px solid #666',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    endpointControl: {
        marginBottom: 20,
        color: '#AAA',
        fontSize: '20px',
    },
    endpointInput: {
        padding: '5px 10px',
        width: '300px',
        fontSize: '14px',
        color: '#333',
        border: '1px solid #666',
    },
};

export default SkidSteerControl;
