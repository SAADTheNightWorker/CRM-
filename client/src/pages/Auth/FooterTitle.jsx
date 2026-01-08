import React from "react";

const FooterTitle = () => {
  return (
    <footer className="border-t border-gray-300 mt-10 py-6 flex flex-col items-center text-center">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} CRM Platform. All rights reserved.
      </p>

      <p className="text-sm text-gray-500">
        Developed and maintained by{" "}
        <span className="font-medium text-gray-700">
          M. Saad
        </span>
      </p>
    </footer>
  );
};

export default FooterTitle;
