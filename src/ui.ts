import './ui.css'

const columns = <HTMLInputElement>document.getElementById("columns")
const spacing = <HTMLInputElement>document.getElementById("spacing")
const sort = <HTMLButtonElement>document.getElementById("sort")

onmessage = (event) => {

	console.log('plugin loaded...')

	sort.addEventListener('click', function (e) {
		parent.postMessage({
			pluginMessage: {
				type: 'sort',
				columns: columns.value,
				spacing: spacing.value
			}
		}, '*')
	})


}