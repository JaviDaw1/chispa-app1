// eslint-disable-next-line no-unused-vars
import React from 'react';
import Login from './Login';
import Header from '../components/Header';

export default function HomePage() {
    return (
        <div>
            <Header />
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-4xl font-bold">Bienvenido</h1>
            </div>
        </div>
    )
}