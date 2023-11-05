export const queryProducts = (req) => {

  const products = [
    {
      name: 'Apple',
      unit: 1
    },
    {
      name: 'Orange',
      unit: 2
    },
    {
      name: 'Banana',
      unit: 2
    }
  ]

  return {
    status: 'success',
    message: 'Successfully',
    statusCode: 200,
    products
  }
}