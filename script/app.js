(() => {
	const dropdownArea = document.querySelector('.nav__list');

	const changeAriaExpanded = target => {
		const actualExpandedState = target.getAttribute('aria-expanded');
		actualExpandedState === 'false'
			? target.setAttribute('aria-expanded', 'true')
			: target.setAttribute('aria-expanded', 'false');
	};

	const managingFocus = target => {
		console.log(target);
		const allInteractiveElements = target.querySelectorAll('.dropdown__link');
		const lastInteractiveElementID = allInteractiveElements.length - 1;
		const lastInteractiveElement =
			allInteractiveElements[lastInteractiveElementID];

		lastInteractiveElement.addEventListener('blur', () => {
			target.classList.remove('u-active');
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
