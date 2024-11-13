// ContactPage.tsx
import { motion } from "framer-motion";
import Header from "../components/Header";
import { getRandomNumber } from "../utils/getRandomNumber";
import { Suspense, useState } from "react";
import { BackgroundImageLoader } from "../utils/BackgroundImageLoader";
import Loading from "./Loading";

const ContactPage = () => {
  const [randomRotation, setRandomRotation] = useState(0);
  const handleHover = () => {
    setRandomRotation(getRandomNumber());
  };
  const backgroundImageSrc = "/images/eatsy-food.png";
  BackgroundImageLoader(backgroundImageSrc);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle form field changes
  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Form Data Submitted:", formData);

    // Example of API request
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    // });

    // Clear form
    setFormData({ name: "", email: "", message: "" });
  };
  return (
    <Suspense fallback={<Loading />}>
      <div
        className="bg-cover bg-bottom h-screen w-screen"
        style={{
          backgroundImage: `url(${backgroundImageSrc})`,
          overflow: "hidden",
        }}
      >
        <Header />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5, ease: "anticipate" }}
          className="p-8 text-center text-xl flex flex-col items-center"
        >
          <motion.h1
            onHoverStart={handleHover}
            whileHover={{ rotate: randomRotation }}
            className="text-3xl font-bold mb-4 font-jeju text-light w-fit"
          >
            Contact Us
          </motion.h1>
          <div className="flex items-center justify-center">
            <div className=" bg-white rounded-lg shadow-md">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col lg:flex-row lg:gap-4 ">
                  {" "}
                  <div>
                    <label
                      className="block font-medium text-left text-light font-jeju text-lg "
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-2 border-4 border-brand rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Eg: Magnus Carlsen"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block font-medium text-left text-light font-jeju text-lg "
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-2 border-4 border-brand rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block font-medium text-left text-light font-jeju text-lg "
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border-4 border-brand rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    rows={4}
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-brand text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </Suspense>
  );
};

export default ContactPage;
