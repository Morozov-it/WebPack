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
            if (isDestroyed) 'Analytics was destroyed'
            return counter
        }
    }
}

window.analytics = createAnalytics()
