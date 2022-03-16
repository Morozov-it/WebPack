const start = async () => {
    return await Promise.resolve('async is working')
}
start().then(console.log)

class Util {
    static id = Date.now()
}
console.log('Util ID', Util.id)

var unused = null