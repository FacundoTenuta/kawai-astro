const toggleButton = document.getElementsByClassName('toggle-menu-block')[0];
const navbarLinks = document.getElementsByClassName('top-tab-block')[0];
const addclosers = document.querySelectorAll('.block-popup');

const sidebar = document.getElementById('sidebar');
const blocko = document.querySelector('.block-o');

// Event listener for the toggle button
function toggleSidebar() {
	sidebar.classList.toggle('showside');
	sidebar.classList.toggle('hideside');
	blocko.classList.toggle('uside');
	kawaiAutoScale();
}

function PopupClose() {
	const howmanyclosers = document.querySelectorAll('.block-button-close');
	if (howmanyclosers.length) {
		for (let step = 0; step < howmanyclosers.length; step++) {
			const element = howmanyclosers[step].parentElement;
			element.style.display = 'none';
		}
	}
}

function OpenLink(getlink) {
	window.open(getlink, '_self');
}

function OpenPopup(getid) {
	document.getElementById(getid).style.display = 'flex';
}

function OpenTablo(tablo) {
	var tablos = document.querySelectorAll('.block-dropdown-tab-lo');

	if (tablos.length) {
		for (let step = 0; step < tablos.length; step++) {
			var element = tablos[step];
			element.style = 'display: none';
		}
	}

	for (let step = 0; step < tablos.length; step++) {
		let element = tablos[step];
		if (element.get) element.style = 'display: none';
	}

	if (getComputedStyle(document.getElementById(tablo)).display == 'flex') {
		document.getElementById(tablo).style = 'display: none';
	} else if (
		getComputedStyle(document.getElementById(tablo)).display == 'none'
	) {
		document.getElementById(tablo).style = 'display: flex';
	}
}

function OpenTab(gettab) {
	const howmanytabs = document.querySelectorAll('.tab-o');
	if (howmanytabs.length) {
		for (let step = 0; step < howmanytabs.length; step++) {
			const element = howmanytabs[step];
			element.style.display = 'none';
		}
	}
	document.getElementById(gettab).style.display = 'flex';
}

function applyDarkModeStyles() {
	document.body.style.backgroundColor = 'rgb(30, 30, 30)';
	document.querySelector('.topbar-o').style.color = 'white';
	document.querySelector('.sidebar-o').style.backgroundColor = 'rgb(36, 38, 38)';

	const blockCards = document.querySelectorAll('.block-card');
	blockCards.forEach((card) => {
		card.style.background = 'rgb(36, 38, 38)';
	});

	const elementsToStyle = document.querySelectorAll(
		'.block-text, p, a, ul, li, h1, h2, h3, h4, h5, h6, .side-tab-block-e, .block-input, .block-list-e, .block-dropdown-tab'
	);
	elementsToStyle.forEach((element) => {
		element.style.color = 'white';
	});
}

function enableDarkMode() {
	applyDarkModeStyles();
	localStorage.setItem('mode', 'dark');
}

function enableLightMode() {
	// Reset styles to the default light mode styles
	document.body.style.backgroundColor = '';

	const topbar = document.querySelector('.topbar-o');
	if (topbar) {
		topbar.style.color = '';
	}

	const sidebar = document.querySelector('.sidebar-o');
	if (sidebar) {
		sidebar.style.backgroundColor = '';
	}

	const blockCards = document.querySelectorAll('.block-card');
	blockCards.forEach((card) => {
		card.style.background = '';
	});

	const elementsToStyle = document.querySelectorAll(
		'.block-text, p, a, ul, li, h1, h2, h3, h4, h5, h6, .side-tab-block-e, .block-input, .block-list-e, .block-dropdown-tab'
	);
	elementsToStyle.forEach((element) => {
		element.style.color = '';
	});

	localStorage.setItem('mode', 'light');
}

function initializeTheme() {
	const storedMode = localStorage.getItem('mode');
	if (storedMode === 'dark') {
		enableDarkMode();
	} else {
		enableLightMode();
	}
}

function toggleTheme() {
	const currentMode = localStorage.getItem('mode');
	if (currentMode === 'dark') {
		enableLightMode();
	} else {
		enableDarkMode();
	}
}

// Function to set margin-top for .block-o dynamically
function kawaiAutoScale() {
	var topbar = document.querySelector('.topbar-o');
	var sidebar = document.querySelector('.sidebar-o');
	var blocko = document.querySelector('.block-o');

	if (topbar && sidebar && blocko) {
		var topbarHeight = topbar.offsetHeight;
		var sidebarWidth = sidebar.offsetWidth;
		var additionalMargin = 20;

		// Set margin-top for .block-o
		blocko.style.marginTop = `calc(${topbarHeight}px + ${additionalMargin}px)`;
		sidebar.style.top = `calc(${topbarHeight}px)`;
		blocko.style.width = `calc(100% - ${sidebarWidth}px)`;
		blocko.style.marginLeft = `${sidebarWidth}px`;
	}
}

// Call the function on window load and resize
window.addEventListener('load', kawaiAutoScale);
window.addEventListener('resize', kawaiAutoScale);

// Call this function to initialize the theme when the page loads
initializeTheme();

class KawaiBundler {
	constructor() {
		this.bundleData = {
			type: null,
			assets: [],
			script: null,
		};
	}

	static generateRandomId() {
		return Math.random().toString(36).substring(7);
	}

	static encodeBase64(str) {
		return btoa(str);
	}

	static decodeBase64(base64) {
		return atob(base64);
	}

	createBundle(type, assets = [], script = null) {
		this.bundleData.type = type;
		this.bundleData.assets = assets;
		this.bundleData.script = script;
	}

	getBundleJSON() {
		return JSON.stringify(this.bundleData);
	}

	async loadBundle(bundleData) {
		try {
			if (typeof bundleData == 'object') {
				// Use the provided bundle data directly
				this.bundleData = bundleData;
			} else if (typeof bundleData == 'string') {
				// Load from a URL
				const response = await fetch(bundleData);
				if (response.ok) {
					const jsonData = await response.json();
					this.bundleData = jsonData;
					console.log('success');
				} else {
					console.error('Failed to load bundle:', response.statusText);
					return null; // Return null on failure
				}
			} else {
				console.error('Invalid bundle data:', bundleData);
				return null; // Return null for invalid input
			}

			return this.bundleData; // Return the loaded data
		} catch (error) {
			console.error('Failed to load bundle:', error);
			return null; // Return null on error
		}
	}

	createBundleBlob() {
		const bundleJSON = this.getBundleJSON();
		return new Blob([bundleJSON], {
			type: 'application/json',
		});
	}

	downloadBundle() {
		const bundleBlob = this.createBundleBlob();
		const bundleUrl = URL.createObjectURL(bundleBlob);

		const downloadLink = document.createElement('a');
		downloadLink.href = bundleUrl;
		downloadLink.download = 'newbundle.kawaibundle';
		downloadLink.click();
	}

	activate() {
		const scriptTag = document.createElement('script');
		scriptTag.type = 'text/javascript';
		scriptTag.innerHTML = this.bundleData.script;
		document.body.appendChild(scriptTag);
		return this; // Add this line to return the instance
	}

	deactivate() {
		const scriptTag = document.querySelector(
			`script[data-type="${this.bundleData.type}"]`
		);
		if (scriptTag) {
			scriptTag.remove();
		}
	}
}
