(() => {
	const dropdownArea = document.querySelector('.nav__list');

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

	const showDropdown = target => {
		if (!target.classList.contains('btn')) return;
		changeAriaExpanded(target);
		const dropdownID = target.getAttribute('aria-controls');
		const dropdown = document.querySelector(`#${dropdownID}`);
		dropdown.classList.toggle('u-active');

		managingFocus(dropdown);
	};

	dropdownArea.addEventListener('click', ({ target }) => {
		showDropdown(target);
	});
})();
