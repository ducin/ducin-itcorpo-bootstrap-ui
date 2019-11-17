export const delay = (time) => new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, time)
})

export const waitUntil = async (
  conditionFn: () => Promise<boolean>,
  interval = 1000
) => {
  let conditionMet = await conditionFn()
  while (!conditionMet) {
    await delay(interval)
    conditionMet = await conditionFn()
  }
}
