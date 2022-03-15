export default class Post {
    constructor(title, img) {
        this.title = title
        this.img = img
        this.data = new Date()
    }
    toString() {
        return JSON.stringify({
            title: this.title,
            img: this.img,
            date: this.data.toJSON()
        })
    }
    get uppercaseTitle() {
        return this.title.toUpperCase()
    }
}