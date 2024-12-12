import React from "react";

interface CustomerDetailsBoxProps {
  title: string;
  details: Record<string, string | number>;
}

const CustomerDetailsBox: React.FC<CustomerDetailsBoxProps> = ({ title, details }) => {
  return (
    <div className="p-4 bg-gray-900 border border-white">
      <h2 className="font-bold mb-2">{title}</h2>
      {Object.entries(details).map(([key, value]) => (
        <p key={key}>
          {key}: {value}
        </p>
      ))}
    </div>
  );
};

export default CustomerDetailsBox;
