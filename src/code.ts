// figma.showUI(__html__, { width:250, height:150 });

const colorSort = require('color-sorter')
const hexSorter = require('hexSorter');

let ref = []
let posX = []
let posY = []
let master = []

// figma.ui.postMessage({ type:'load' })

// figma.ui.onmessage = async msg => {
	// if (msg.type === "sort") {
		console.log('sorting...')

		
		// let columns:number = parseInt(msg.columns, 10)
		// let spacing:number = parseInt(msg.spacing, 10)
		let columns:number = 10
		let spacing:number = 40
		

		for (const node of figma.currentPage.selection) {
			if ("fills" in node) {
				let colors:any = node.fills[0].color
				let hex:any = hexToRgb(colors.r, colors.g, colors.b)

				master.push({
					id:node.id,
					color:hex,
					width: node.width,
					height: node.height
				})

				ref.push(hex)
				posX.push(node.x)
				posY.push(node.y)

			}
		}

		let styles = colorSort(ref)
		let startX:number = Math.min(...posX)
		let startY:number = Math.min(...posY)
		let width:number = master[0].width
		let height: number = master[0].height
		let base:number = 0
		let level:number = 0

		var start = new Date().getTime();
		styles.forEach((color:any) => {
			master.forEach(val => {
				if (val.color === color) {
					let nodeId = val.id
					let node = figma.getNodeById(nodeId)
					if ("x" in node) {
						
						// wrap to new line when reaching end of row
						// numerate level for y-axis
						if (base == columns) {
							base = 0
							level++
						}

						node.x = startX + (width * base) + (spacing * base) 
						node.y = startY + (height * level) + (spacing * level) 
						base++
					}



				}
			})

		})

		var end = new Date().getTime();
		var time = end - start;
		console.log(`Execution time:${time}ms`)
		figma.closePlugin()
	// }
// }




function hexToRgb(red:number, green:number, blue:number) {
	var redHEX = rgbToHex(red)
	var greenHEX = rgbToHex(green)
	var blueHEX = rgbToHex(blue)

	return redHEX + greenHEX + blueHEX
}

function rgbToHex(rgb:any) {
	rgb = Math.floor(rgb * 255)
	var hex = Number(rgb).toString(16)
	if (hex.length < 2) {
		hex = '0' + hex
	}
	return hex
}