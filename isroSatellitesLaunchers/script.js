document.addEventListener('DOMContentLoaded', function () {
    const selectType = document.getElementById('selectType')
    const tableBody = document.getElementById('tableBody')

    // Function to fetch data based on selection option/type
    function fetchData(type) {
        tableBody.innerHTML = '' // Clear existing table data

        fetch(`https://isro.vercel.app/api/${type}`)
            .then(response => {
                if(!response.ok) {
                    throw new Error(`Failed to fetch ${type}`)
                }
                return response.json()
            })
            .then(data => {

                // console.log(data)
                if (type === 'spacecrafts') {
                    for (let i = 0; i < data[type].length; i++) {
                        const tr = document.createElement('tr')
                        tr.innerHTML = `<td class='t-cell'>${data[type][i].id}</td><td class='t-cell'>${data[type][i].name}</td>`
                        tableBody.appendChild(tr)
                    }
                } else if (type === 'launchers') {
                    for (let i = 0; i < data[type].length; i++) {
                        const tr = document.createElement('tr')
                        tr.innerHTML = `<td class='t-cell'>${i + 1}</td><td class='t-cell'>${data[type][i].id}</td>`
                        tableBody.appendChild(tr)
                    }
                }
            })
            .catch(error => {
                console.error(`Error fetching ${type}:`, error)
                const errorDisplay = document.getElementById('error-display')
                errorDisplay.style.display = 'block'
            })
    }

    // Initial fetch based on the default selection
    fetchData(selectType.value)

    // Event listener for select change
    selectType.addEventListener('change', function () {
        fetchData(this.value)
    })
})
