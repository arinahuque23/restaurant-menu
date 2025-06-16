
import { useCart } from "@/shared/context/CartContext"
import { Trash } from "lucide-react"

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()

  const total = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)

  return (
    <div className="min-h-screen bg-gray-50 pt-16 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-4 bg-white rounded shadow">
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-semibold">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-800">
                  <Trash />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center p-4 border-t mt-4">
            <span className="text-xl font-bold">Total: ${total.toFixed(2)}</span>
            <button
              onClick={() => alert("Order placed!")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
