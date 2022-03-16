import * as $ from 'jquery'


function createAnalytics(): object {
    let isDestroyed = false
    let counter: number = 0
    const listener = (): number => counter++
    
    $(document).on('click', listener)
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

window['analytics'] = createAnalytics()
