import { useLocation } from 'react-router-dom'

function CheckoutSteps() {
  const location = useLocation()

  const steps = [
    { name: 'Cart', path: '/cart' },
    { name: 'Checkout', path: '/checkout' },
    { name: 'Done', path: '/thankyou' }
  ]

  const currentIndex = steps.findIndex(step =>
    location.pathname === step.path
  )

  return (
    <div className="flex justify-center items-center mb-10">

      {steps.map((step, index) => {
        const isActive = location.pathname === step.path
        const isCompleted = index < currentIndex

        return (
          <div key={index} className="flex items-center">

            {/* Circle */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full font-bold
              ${
                isActive
                  ? 'bg-green-500 text-white'
                  : isCompleted
                  ? 'bg-green-300 text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {index + 1}
            </div>

            {/* Label */}
            <div className="text-sm mx-2 font-semibold">
              {step.name}
            </div>

            {/* Line (except last step) */}
            {index !== steps.length - 1 && (
              <div className="w-10 h-1 bg-gray-300 mx-2 rounded"></div>
            )}

          </div>
        )
      })}

    </div>
  )
}

export default CheckoutSteps