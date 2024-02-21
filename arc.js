const arc = (function(){
    const _encrypt = (text, key) => {
        result = []
        text = text.split("")
        key = key.split("").map(
            (character) => parseInt(character.charCodeAt(0).toString().split("").map(
                (character) => parseInt(character)
            ).reduce((count, number) => count + number, 0).toString().split("")[0])
        )
        while (key.length < text.length) {
            key = key.concat(key)
        }
        for (var character in text) {
            character = [character, text[character], key[character]]
            if (character[2] > 5) {
                result.push(String.fromCharCode(character[1].charCodeAt(0) + character[2]))
            } else {
                result.push(String.fromCharCode(character[1].charCodeAt(0) - character[2]))
            }
        }
        return btoa(result.join(""))
    }
    const _decrypt = (text, key) => {
        result = []
        text = atob(text).split("")
        key = key.split("").map(
            (character) => parseInt(character.charCodeAt(0).toString().split("").map(
                (character) => parseInt(character)
            ).reduce((count, number) => count + number, 0).toString().split("")[0])
        )
        while (key.length < text.length) {
            key = key.concat(key)
        }
        for (var character in text) {
            character = [character, text[character], key[character]]
            if (character[2] > 5) {
                result.push(String.fromCharCode(character[1].charCodeAt(0) - character[2]))
            } else {
                result.push(String.fromCharCode(character[1].charCodeAt(0) + character[2]))
            }
        }
        return result.join("")
    }
    return {
        encrypt(text) {
            return _encrypt(text, localStorage.getItem("session"))
        },
        decrypt(text) {
            return _decrypt(text, localStorage.getItem("session"))
        }
    }
})()
