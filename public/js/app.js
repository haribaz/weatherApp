console.log('Client side javascript file is loaded!')

const form = document.querySelector('form')
const input = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')
const loader = document.querySelector('#loader')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.innerHTML = ''
    messageTwo.innerHTML = ''
    loader.classList.remove('hidden')
    const address = input.value
    const url = '/weather?address=' + address
    fetch(url).then((response) => {
    response.json().then((data) => {
        loader.classList.add('hidden')
        if (data.error) {
            messageOne.innerHTML = data.error
        } else {
            messageOne.innerHTML = data.location
            messageTwo.innerHTML = data.forecast
        }
    })
})

})
