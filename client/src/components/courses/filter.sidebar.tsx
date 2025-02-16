"use client";

import React, { useState } from "react";

export default function FilterSidebar() {
    return (
        <div className="w-72 bg-gray-50 p-6 rounded-lg shadow-md border border-gray-300">
            <h2 className="text-2xl font-semibold mb-4">Categories</h2>

            {/* Danh sách danh mục */}
            <ul className="space-y-1 text-lg">
                {[
                    "All Category",
                    "Development",
                    "Art & Design",
                    "Business",
                    "Data Science",
                    "Finance",
                    "Health & Fitness",
                    "Lifestyle"
                ].map((category, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 border-gray-400" />
                        <span className="text-gray-700">{category}</span>
                    </li>
                ))}
            </ul>

            {/* Show More */}
            <button className="text-blue-600 mt-4 font-medium hover:underline">Show More +</button>

        </div>
    );
}
