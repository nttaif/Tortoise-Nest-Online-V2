"use client";

import React from "react";

export default function AboutmeComponent() {
    return (
        <div className="p-8 max-w-4xl mx-auto text-left">
            <section className="mb-6">
                <h2 className="text-xl font-bold">About Me</h2>
                <div className="mt-2 text-sm text-gray-500">
                    <p >
                        A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence was created for the bliss of souls like mine.I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.
                    </p>
                    <p >
                        A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.
                    </p>
                </div>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-semibold">Skills</h2>
                <div className="flex flex-wrap gap-2 mt-2 ">
                    {["Admin", "Dashboard", "Photoshop", "Bootstrap", "Responsive", "Crypto"].map(
                        (skill, index) => (
                            <span
                                key={index}
                                className="bg-stone-400 text-blue-900 text-xs font-semibold px-3 py-1  rounded-md"
                            >
                                {skill}
                            </span>
                        )
                    )}
                </div>
            </section>

            <section className="mb-6">
                <h2 className="text-lg font-semibold">Language</h2>
                <p className="mt-2 text-sm">English &bull; French &bull; Bangla</p>
            </section>

            <section>
                <h2 className="text-lg font-semibold">Personal Information</h2>
                <div className="mt-2 text-sm space-y-2">
                    <p><strong>Name:</strong> Quynh Ngo</p>
                    <p><strong>Email:</strong> quynhngoo123@gmai.com</p>
                    <p><strong>Availability:</strong> Full Time (Free Lancer)</p>
                    <p><strong>Age:</strong> 20</p>
                    <p><strong>Location:</strong> Dong Nai</p>
                    <p><strong>Year Experience:</strong> 02 Year Experiences</p>
                </div>
            </section>
        </div>
    );
}
