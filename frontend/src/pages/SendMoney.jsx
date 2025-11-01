import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SendMoney = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state;

  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/v1/account/transfer", {
        to: user.userId,
        amount,
      });

      setType("success");
      setMessage("Payment successful!");

    } catch (err) {
      const msg = err.response?.data?.message || "Transaction failed";
      setType("error");
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>

          <div className="p-3">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">{user.firstName[0]}</span>
              </div>
              <h3 className="text-2xl font-semibold">{`${user.firstName} ${user.lastName}`}</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="amount">
                  Amount (in ₹)
                </label>

                <input
                  type="number"
                  id="amount"
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="Enter amount"
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>

              <button
                disabled={loading}
                onClick={handleTransfer}
                className="rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 w-full bg-green-500 active:bg-green-700 text-white disabled:opacity-50"
              >
                {loading ? "Sending..." : "Initiate Transfer"}
              </button>

              {message && (
                <div className={`text-center mt-1 ${type === "error" ? "text-red-600" : "text-green-600"}`}>
                  {message}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
