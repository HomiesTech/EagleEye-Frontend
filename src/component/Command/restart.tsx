import { useState } from 'react';
import axios from 'axios';
import CONSTANTS from '../../config/constant';

const RestartESPPage = () => {
  const [macAddress, setMacAddress] = useState('');
  const [command, setCommand] = useState('restart'); // Default command set to "restart"
  const [relayNo, setRelayNo] = useState('');
  const [state, setState] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setLoading(true);

    const data = {
      mac_address: macAddress,
      command,
      relay_no: relayNo,
      state,
    };

    try {
      const res = await axios.post(CONSTANTS.restart, data);
      setResponseMessage(res.data.message);
      setErrorMessage('');
    } catch {
      setErrorMessage('An unexpected error occurred');
      setResponseMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white min-h-screen p-6">
      <h1 className="text-center text-white mb-5 text-2xl">Restart ESP</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="flex items-center mb-4">
          <label className="w-28 font-bold">MAC Address:</label>
          <input
            type="text"
            value={macAddress}
            onChange={(e) => setMacAddress(e.target.value.replace(/_/g, ":").replace(/\s+/g, ""))}
            required
            className="flex-1 p-2 rounded border border-gray-300 text-black"
          />
        </div>

        <div className="flex items-center mb-4">
          <label className="w-28 font-bold">Command:</label>
          <select
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            required
            className="flex-1 p-2 rounded border border-gray-300 text-black"
          >
            <option value="change-relay">Change Relay</option>
            <option value="restart">Restart</option>
          </select>
        </div>

        {command === 'change-relay' && (
          <>
            <div className="flex items-center mb-4">
              <label className="w-28 font-bold">Relay No:</label>
              <select
                value={relayNo}
                onChange={(e) => setRelayNo(e.target.value)}
                required
                className="flex-1 p-2 rounded border border-gray-300 text-black"
              >
                <option value="">Select Relay</option>
                {[...Array(8)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center mb-4">
              <label className="w-28 font-bold">State:</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                className="flex-1 p-2 rounded border border-gray-300 text-black"
              >
                <option value="">Select State</option>
                <option value="0">Off</option>
                <option value="1">On</option>
              </select>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded cursor-pointer font-bold disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Execute'}
        </button>
      </form>

      {loading && (
        <div className="text-center mt-5">
          <p>Loading...</p>
        </div>
      )}

      {responseMessage && (
        <p className="text-white mt-5 text-center">{responseMessage}</p>
      )}
      {errorMessage && (
        <p className="text-white mt-5 text-center">{errorMessage}</p>
      )}
    </div>
  );
};

export default RestartESPPage;
