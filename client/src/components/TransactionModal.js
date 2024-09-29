export default function TransactionModal({ isOpen, onClose, transaction }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Transaction Details</h3>
        {transaction && (
          <div className="space-y-2">
            <p><span className="font-semibold">ID:</span> {transaction.id}</p>
            <p><span className="font-semibold">Bank:</span> {transaction.bank}</p>
            <p><span className="font-semibold">Amount:</span> ${transaction.amount}</p>
            <p><span className="font-semibold">Date:</span> {transaction.date}</p>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Close
        </button>
      </div>
    </div>
  )
}
