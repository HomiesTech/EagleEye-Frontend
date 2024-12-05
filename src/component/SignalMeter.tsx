import React from "react";

interface SignalProps {
  signalStrength?: number | null;
}

const SignalMeter: React.FC<SignalProps> = ({ signalStrength }) => {
  // Default values
  let deviceSignal = "N/A";
  let signalMeterWidth = 0;
  let attachClass = "bg-gray-300"; // Default Tailwind class for neutral state

  // Signal strength mapping
  if (signalStrength) {
    switch (signalStrength) {
      case 1:
        deviceSignal = "Excellent";
        signalMeterWidth = 100;
        attachClass = "bg-green-500";
        break;
      case 2:
        deviceSignal = "Very Good";
        signalMeterWidth = 80;
        attachClass = "bg-teal-400";
        break;
      case 3:
        deviceSignal = "Good";
        signalMeterWidth = 60;
        attachClass = "bg-yellow-400";
        break;
      case 4:
        deviceSignal = "Fair";
        signalMeterWidth = 40;
        attachClass = "bg-orange-500";
        break;
      case 5:
        deviceSignal = "Poor";
        signalMeterWidth = 20;
        attachClass = "bg-red-500";
        break;
      case 6:
        deviceSignal = "Very Poor";
        signalMeterWidth = 10;
        attachClass = "bg-red-800";
        break;
      default:
        break;
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-white-900">{deviceSignal}</span>
      </div>
      <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
        <div
          className={`h-2 ${attachClass}`}
          style={{ width: `${signalMeterWidth}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SignalMeter;
