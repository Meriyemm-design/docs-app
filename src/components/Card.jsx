import React from "react";
import { FaRegFileLines } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

const Card = ({ data, reference, isDeleteMode, onDelete }) => {
  return (
    <motion.div
      drag={!isDeleteMode} // Disable drag in delete mode
      dragConstraints={reference}
      whileDrag={{ scale: 1.1 }}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }}
      className="relative flex-shrink-0 w-60 h-72 rounded-[40px] bg-zinc-900/90 my-1 p-6 text-white backdrop-blur-md border border-white/10 shadow-lg overflow-hidden cursor-pointer"
    >
      {/* Delete Button (shown only in delete mode) */}
      {isDeleteMode && (
        <button
          onClick={onDelete}
          className="absolute top-4 right-[1rem] z-10 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          <FaTrash size={14} />
        </button>
      )}

      <FaRegFileLines size={"20"} />
      <p className="text-sm mt-5 text-left font-normal">{data.desc}</p>

      <div className="footer absolute bottom-0 left-0 w-full">
        <div className="flex items-center justify-between h-12 py-3 px-6 mb-[6px]">
          <h6 className="font-normal">{data.fileSize}</h6>

          <span className="w-7 h-7 rounded-full bg-gray-300 text-black flex items-center justify-center cursor-pointer">
            {data.close ? (
              <IoCloseCircleOutline size={"18"} />
            ) : (
              <FiDownload size={"16"} />
            )}
          </span>
        </div>

        {data.tag.isOpen && (
          <div
            className={`footer-tag w-full h-12 flex items-center justify-center font-medium rounded-b-[40px] cursor-pointer 
            ${data.tag.tagColor} transition-colors`}
          >
            <h4> {data.tag.tagTitle} </h4>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
