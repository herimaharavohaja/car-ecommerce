import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SuccessPage from "../message/MessageSucces";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(4, "Name must be at least 4 characters long"),
  firstName: z.string().min(6, "First Name must be at least 6 characters long"),
  phoneNumber: z.string().min(10, "Phone Number must be at least 10 characters long").max(15, "Phone Number must not exceed 15 characters"), 
  message: z.string().optional(),
});

interface FormValues {
  email: string;
  name: string;
  firstName: string;
  phoneNumber: string;
  message?: string;
}

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  carId: string;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, carId }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormValues>({
    resolver: zodResolver(schema) 
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      setTimeout(async () => {
        const response = await fetch("http://localhost:3001/appointments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ ...data, car_id: carId })
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Form submitted successfully!");
        setValue("email", "");
        setValue("name", "");
        setValue("firstName", "");
        setValue("phoneNumber", "");
        setValue("message", "");
        setShowSuccess(true);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.name as keyof FormValues, e.target.value);
  };

  if (!isVisible) return null;

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={() => onClose()}
    >
      <div className="w-[600px] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <button
          className="text-white text-xl place-self-end"
          onClick={onClose}
        >
          x
        </button>
        <div className="bg-white p-2 rounded">
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label id="email" className="block mb-1 text-sm font-medium">
                Your email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className={`shadow-sm   text-sm rounded-lg  block w-full p-2.5 border dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light ${errors.email ? 'border-red-500' : ''}`}
                placeholder="name@flowbite.com"
                required
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-5">
              <label id="name" className="block mb-1 text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className={`shadow-sm   text-sm rounded-lg  block w-full p-2.5 border dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light ${errors.name ? 'border-red-500' : ''}`}
                required
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div className="mb-5">
              <label id="firstName" className="block mb-1 text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName")}
                className={`shadow-sm   text-sm rounded-lg  block w-full p-2.5 border dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light ${errors.email ? 'border-red-500' : ''}`}
                required
                onChange={handleChange}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div className="mb-5">
              <label id="phoneNumber" className="block mb-1 text-sm font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                {...register("phoneNumber")}
                className={`shadow-sm   text-sm rounded-lg  block w-full p-2.5 border dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light ${errors.phoneNumber ? 'border-red-500' : ''}`}
                required
                onChange={handleChange}
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
            </div>
            <div className="mb-5">
              <label id="message" className="block mb-2 text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                {...register("message")}
                className={`shadow-sm resize-none  text-sm rounded-lg  block w-full p-2.5 border dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light ${errors.message ? 'border-red-500' : ''}`}
                style={{ minHeight: "100px", maxHeight: "200px" }}
                value={message}
                onChange={handleMessageChange}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-blue-700 hover:bg-blue-800 focus
              :ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              
              {isSubmitting ? "Submitting..." : "Reservation rendez-vous"}
            </button>
          </form>
          {showSuccess && <SuccessPage />}
        </div>
      </div>
    </div>
  );
};

export default Modal;
