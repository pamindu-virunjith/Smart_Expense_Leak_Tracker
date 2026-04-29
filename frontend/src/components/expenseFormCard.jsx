function FormCard({ expense, setExpense, handleSubmit, method, loading }) {
  return (
    <section className="max-w-4xl mx-auto bg-white p-10 rounded-2xl border border-gray-100 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-8">
        {`${method === "Update" ? "Update existing" : "New"} Expense`}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Amount */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-800">
              Amount (LKR)
            </label>
            <input
              type="number"
              className="w-full bg-[#F3F4F6] border-none rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              value={expense.amount}
              onChange={(e) =>
                setExpense({ ...expense, amount: e.target.value })
              }
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-lg font-medium text-gray-800">
              Category
            </label>
            <select
              className="w-full bg-[#F3F4F6] border-none rounded-lg p-3 focus:ring-2 focus:ring-blue-500 appearance-none"
              value={expense.category}
              onChange={(e) =>
                setExpense({ ...expense, category: e.target.value })
              }
            >
              <option value="">Select category</option>
              <option value="food">Food</option>
              <option value="shopping">Shopping</option>
              <option value="bills">Bills</option>
              <option value="education">Education</option>
              <option value="health">Health</option>
              <option value="entertainment">Entertainment</option>
              <option value="transport">Transport</option>
              <option value="subscriptions">Subscriptions</option>
              <option value="drinks">Drinks</option>
              <option value="bills">Other</option>
            </select>
          </div>
        </div>

        {/* Date */}
        <div className="space-y-2 w-1/2 pr-4">
          <label className="block text-lg font-medium text-gray-800">
            Date
          </label>
          <input
            type="date"
            className="w-full bg-[#F3F4F6] border-none rounded-lg p-3 focus:ring-2 focus:ring-blue-500 text-gray-500"
            value={expense.date.split("T")[0]}
            onChange={(e) => setExpense({ ...expense, date: e.target.value })}
          />
        </div>

        {/* Note */}
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-800">
            Note (optional)
          </label>
          <textarea
            rows="4"
            className="w-full bg-[#F3F4F6] border-none rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            value={expense.note}
            onChange={(e) => setExpense({ ...expense, note: e.target.value })}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-[#3B82F6] hover:bg-blue-600 cursor-pointer text-white"}`}
        >
          {loading ? "adding..." : `${method} Expense`}
        </button>
      </form>
    </section>
  );
}

export default FormCard;
