const form = document.querySelector('#form')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  getColors(event)
})

function getColors(event) {
  const query = event.target[0].value

  fetch('/palette', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      query,
    }),
  })
    .then((response) => response.json())
    .then(({ colors }) => {
      const container = document.querySelector('.container')

      createColorBoxes(colors, container)
    })
}

function createColorBoxes(colors, parent) {
  parent.innerHTML = ''
  for (let color of colors) {
    const div = document.createElement('div')
    div.classList.add('color')
    div.style.backgroundColor = color
    div.style.width = `calc(100% / ${colors.length})`

    div.addEventListener('click', () => {
      navigator.clipboard.writeText(color)
    })

    const span = document.createElement('span')
    span.classList.add('code')
    span.innerText = color
    div.appendChild(span)

    parent.appendChild(div)
  }
}
