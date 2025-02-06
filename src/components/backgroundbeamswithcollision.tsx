import React, { useState } from "react";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Animation from "../assets/Animations/Animation - 1730955775370.json";
import Button1 from "./ui/button1";

export function BackgroundBeamsWithCollisionDemo() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage("");
  };

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // prevent form submission default behavior
    const email = (
      document.querySelector('input[type="text"]') as HTMLInputElement
    ).value;
    const password = (
      document.querySelector('input[type="password"]') as HTMLInputElement
    ).value;

    try {
      // In backgroundBoxesDemo.jsx
      const response = await fetch("http://10.245.146.250:5005/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies with the request
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // console.log("Response Data:", data); // Log the response data

      // Redirect to home page if login is successful
      if (response.ok) {
        navigate("/home");
      } else {
        setErrorMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login.");
    }
  };

  return (
    <>
      <BackgroundBeamsWithCollision>
        <div className="flex flex-col items-center space-y-4">
          {/* h2 in one line */}
          <div>
            <h2 className="text-white text-5xl font-bold text-center font-poppins">
              <p className="p-2 font-poppins">Welcome to</p>
              <span className="bg-clip-text md:text-7xl text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-poppins">
                SketchVision AI
              </span>
            </h2>
          </div>
          {/* p as a separate line */}
          <div>
            <p className="text-white text-sm md:text-3xl max-w-xl mt-4 text-center font-semibold tracking-wide p-6">
              Transform Crimp Analysis with <br />
              <span className="p-4 block bg-clip-text text-transparent bg-gradient-to-r md:text-4xl from-red-600 to-violet-500 font-poppins">
                'AI-Powered' Precision.
              </span>
            </p>
          </div>
          {/* div for button as a separate line */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 justify-center">
            <Button onClick={openModal}>Login</Button>
            {/* replaced plain button with custom Button */}
          </div>
        </div>
      </BackgroundBeamsWithCollision>

      {isModalOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-[#FFFAEC] w-7/12 h-3/5 rounded-lg shadow-lg flex relative">
            {/* Left half with Lottie animation */}
            <div className="w-1/2 rounded-l-lg flex items-center justify-center overflow-hidden">
              <Lottie
                animationData={Animation}
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            {/* Right half with login form */}
            <div className="w-1/2 p-6">
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              <form>
                <label className="block mb-2">
                  <span className="text-gray-700 font-semibold">Email</span>
                  <input
                    type="text" // changed from "text" to "email"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  />
                </label>
                <label className="block mb-8">
                  <span className="text-gray-700 font-semibold">Password</span>
                  <input
                    type="password"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  />
                </label>
                {errorMessage && (
                  <div className="text-red-500 mb-4">{errorMessage}</div>
                )}
                {/* Replace plain button with custom Button */}
                <Button1 onClick={handleLogin}>Login</Button1>
              </form>
            </div>

            {/* Close "X" button in the top-right corner */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
