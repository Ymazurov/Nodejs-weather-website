
const weatherForm = document.getElementById('searchForm')
const search = document.getElementById('input')
const messageOne = document.getElementById('message1')
const messageTwo = document.getElementById('message2')



weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value
  messageTwo.textContent = ''

  messageOne.textContent = 'Loading...'

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
  })
})
