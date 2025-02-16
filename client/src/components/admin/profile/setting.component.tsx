"use client";

import React from "react";

export default function SettingComponent() {
    return (
        <div className="max-w-2xl mx-auto p-6 text-gray-700">
            <h2 className="text-xl font-bold text-indigo-600 mb-4">Account Setting</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-xs">Email</label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200"
                        placeholder="Email"
                    />
                </div>
                <div>
                    <label className="block text-xs">Password</label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200"
                        placeholder="Password"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-xs">Address</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200"
                    placeholder="1234 Main St"
                />
            </div>

            <div className="mb-4">
                <label className="block text-xs">Address 2</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200"
                    placeholder="Apartment, studio, or floor"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-xs">City</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200"
                    />
                </div>
                <div>
                    <label className="block text-xs">State</label>
                    <select
                        className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200"
                    >
                        <option value="">Choose...</option>
                        <option value="CA">Option 1</option>
                        <option value="TX">Option 2</option>
                        <option value="FL">Option 3</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm">Zip</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200"
                    />
                </div>
            </div>

            <div className="flex items-center mb-4">
                <input
                    type="checkbox"
                    className="mr-2"
                />
                <label className="text-sm">Check me out</label>
            </div>

            <button className="bg-indigo-600 text-white px-6 py-2 rounded-md">Sign in</button>
        </div>
    );
}
