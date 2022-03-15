function createAnalytics() {
    let isDestroyed = false
    let counter = 0
    const listener = () => {
        counter++
    }
    document.addEventListener('click', listener)
    return {
        destroy() {
            document.removeEventListener('click', listener)
            isDestroyed = true
        },
        getClicks() {
            if (isDestroyed) `Analytics was destroyed. Total clicks = ${counter}`
            return counter
        }
    }
}
console.log('test')

window.analytics = createAnalytics()
