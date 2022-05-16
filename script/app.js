(() => {
	const dropdownArea = document.querySelector('.nav__list');
	const hamburgerButton = document.querySelector('[data-hamburger]');
	const navElement = document.querySelector('.nav');
	const headerLinksElement = document.querySelector('.header__links');
	const hamburgerButtonImage = document.querySelector('[data-icon]');
	const changeAriaExpanded = target => {
		const actualExpandedState = target.getAttribute('aria-expanded');
		actualExpandedState === 'false'
			? target.setAttribute('aria-expanded', 'true')
			: target.setAttribute('aria-expanded', 'false');
	};

	const managingFocus = target => {
		const allInteractiveElements = target.querySelectorAll('.dropdown__link');
		let activeInteractiveElementID = 0;
		const lastInteractiveElementID = allInteractiveElements.length - 1;

		allInteractiveElements[activeInteractiveElementID].focus();

		target.addEventListener('keydown', ({ keyCode }) => {
			if (
				keyCode === 40 &&
				activeInteractiveElementID < lastInteractiveElementID
			) {
				activeInteractiveElementID++;
				allInteractiveElements[activeInteractiveElementID].focus();
			}
			if (keyCode === 38 && activeInteractiveElementID !== 0) {
				activeInteractiveElementID--;
				allInteractiveElements[activeInteractiveElementID].focus();
			}
		});
	};

	const changeArrowDirection = target => {
		const closestArrow = target.querySelector('[data-arrow]');
		const actualExpandedState = target.getAttribute('aria-expanded');

		actualExpandedState === 'false'
			? closestArrow.setAttribute('src', './assets/images/icon-arrow-down.svg')
			: closestArrow.setAttribute('src', './assets/images/icon-arrow-up.svg');
	};

	const showDropdown = target => {
		if (!target.classList.contains('btn')) return;
		const dropdownID = target.getAttribute('aria-controls');
		const dropdown = document.querySelector(`#${dropdownID}`);
		dropdown.classList.toggle('u-active');
		changeAriaExpanded(target);
		changeArrowDirection(target);
		managingFocus(dropdown);
	};

	const showMenu = () => {
		navElement.classList.toggle('nav__mobile');
		headerLinksElement.classList.toggle('u-flex');
		headerLinksElement.classList.toggle('u-mobile-links');
		hamburgerButtonImage.setAttribute(
			'src',
			`./assets/images/icon-${
				navElement.classList.contains('nav__mobile') ? 'close-menu' : 'menu'
			}.svg`
		);
	};

	dropdownArea.addEventListener('click', ({ target }) => {
		showDropdown(target);
	});

	const closeMenu = () => {
		if (window.innerWidth > 800) {
			navElement.classList.remove('nav__mobile');
			headerLinksElement.classList.remove('u-flex');
			headerLinksElement.classList.remove('u-mobile-links');
		}
	};

	hamburgerButton.addEventListener('click', showMenu);

	window.addEventListener('resize', closeMenu);
})();
