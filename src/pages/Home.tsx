import React, { ChangeEvent, useRef, useState, JSX } from "react";
import { motion } from "framer-motion";
import Button2 from "../components/ui/Button2";
import Lottie from "lottie-react";
import animationData from "../assets/Animations/Animation - 1738830873737 (2).json";

function Home(): JSX.Element {
  const fileInput1Ref = useRef<HTMLInputElement | null>(null);
  const [uploadProgress1, setUploadProgress1] = useState<number>(0);
  const [uploadSuccess1, setUploadSuccess1] = useState<boolean>(false);
  const [fileName1, setFileName1] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [comparisonResult, setComparisonResult] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClickFileInput = (
    inputRef: React.RefObject<HTMLInputElement | null>
  ): void => {
    inputRef.current?.click();
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    setUploadProgress: React.Dispatch<React.SetStateAction<number>>,
    setUploadSuccess: React.Dispatch<React.SetStateAction<boolean>>,
    setFileName: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUploadSuccess(false);
      setUploadProgress(0);

      const interval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            setUploadSuccess(true);
            return 100;
          }
          return prevProgress + 10;
        });
      }, 200);
    }
  };

  const handleRemoveFile = (
    setFileName: React.Dispatch<React.SetStateAction<string>>,
    setUploadSuccess: React.Dispatch<React.SetStateAction<boolean>>,
    setUploadProgress: React.Dispatch<React.SetStateAction<number>>
  ): void => {
    setFileName("");
    setUploadSuccess(false);
    setUploadProgress(0);
  };

  const handleCompare = async (): Promise<void> => {
    if (!fileName1) {
      alert("Please upload a file");
      return;
    }

    console.log("Sending file to the backend...");

    const formData = new FormData();
    if (fileInput1Ref.current && fileInput1Ref.current.files) {
      formData.append("file1", fileInput1Ref.current.files[0]);
    } else {
      alert("No file selected");
      return;
    }

    setIsProcessing(true);
    setShowModal(true);

    try {
      const response = await fetch("http://10.245.146.250:5005/detect", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("File sent to backend successfully:", data);
        alert("Defect detection complete!");
        setComparisonResult(data.annotated_image_url);
      } else {
        let errorMsg = "Error detecting defects.";
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch (err) {
          console.error("Failed to parse error response:", err);
        }
        console.error("Error:", errorMsg);
        alert(`Error detecting defects: ${errorMsg}`);
      }
    } catch (error) {
      console.error("Error sending file to backend:", error);
      alert("Failed to detect defects");
    } finally {
      setIsProcessing(false);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      backgroundColor: "#3d3d3d", // Added background color
    },
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center bg-[#212121] justify-center px-4">
        <h1 className="md:text-6xl text-6xl pb-12 pt-8 font-extrabold text-[white] font-rubik relative z-20 text-center">
          Welcome to{" "}
          <span className="text-7xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-rubik">
            SketchVision AI
          </span>
        </h1>

        <div className="flex justify-center w-full max-w-2xl">
          <motion.div
            initial={{ y: "-10vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              type: "easeOut",
              stiffness: 30,
              damping: 20,
            }}
            className="w-full h-60 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer bg-[#FBF5E5] hover:bg-[#FCE7C8] rounded-xl transition-all"
            onDrop={(e) => e.preventDefault()}
            onDragOver={(e) => e.preventDefault()}
          >
            <p className="text-gray-500 text-lg">Drag and Drop File</p>

            <button
              onClick={() => handleClickFileInput(fileInput1Ref)}
              className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-all"
            >
              Upload File
            </button>
            <input
              type="file"
              ref={fileInput1Ref}
              className="hidden"
              onChange={(e) =>
                handleFileChange(
                  e,
                  setUploadProgress1,
                  setUploadSuccess1,
                  setFileName1
                )
              }
            />

            {uploadProgress1 > 0 && uploadProgress1 < 100 && (
              <div className="mt-4 w-3/4 bg-gray-200 rounded-full h-2.5">
                <div
                  style={{ width: `${uploadProgress1}%` }}
                  className="bg-blue-500 h-2.5 rounded-full transition-all"
                ></div>
              </div>
            )}

            {uploadSuccess1 && (
              <>
                <p className="text-green-600 mt-2">
                  File uploaded successfully!
                </p>
                <div className="flex items-center mt-1 space-x-2">
                  <span className="text-gray-700">{fileName1}</span>
                  <button
                    onClick={() =>
                      handleRemoveFile(
                        setFileName1,
                        setUploadSuccess1,
                        setUploadProgress1
                      )
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Added spacing around the Compare button */}
        <div className="mt-10">
          <Button2
            isComparing={isProcessing}
            onClick={handleCompare}
            disabled={isProcessing}
          />
        </div>

        {comparisonResult && (
          <a
            href={comparisonResult}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-all"
            download="annotated_image.png"
          >
            Download Annotated Image
          </a>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            {isProcessing ? (
              <Lottie
                loop={defaultOptions.loop}
                autoplay={defaultOptions.autoplay}
                animationData={defaultOptions.animationData}
                rendererSettings={defaultOptions.rendererSettings}
                height={400}
                width={400}
              />
            ) : (
              <div>
                <p>Comparison complete!</p>
                <img
                  src={comparisonResult}
                  alt="Annotated result"
                  className="max-w-full max-h-96 mt-4"
                />
                <a
                  href={comparisonResult}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-all inline-block"
                  download="annotated_image.png"
                >
                  Download Annotated Image
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
