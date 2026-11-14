// Keep the work banner subtly tied to the user's scroll direction.
(function () {
	const marquee = document.querySelector('.work-marquee');
	if (!marquee) return;

	let lastScrollY = window.scrollY;
	let offset = 0;
	let framePending = false;

	function updateMarquee() {
		const scrollDelta = window.scrollY - lastScrollY;
		lastScrollY = window.scrollY;

		if (scrollDelta < 0) {
			offset -= Math.abs(scrollDelta) * 0.7;
		} else if (scrollDelta > 0) {
			offset += scrollDelta * 0.15;
		}

		offset = Math.max(-marquee.scrollWidth * 0.35, Math.min(0, offset));
		marquee.style.setProperty('--marquee-x', `${offset}px`);
		framePending = false;
	}

	window.addEventListener('scroll', function () {
		if (!framePending) {
			framePending = true;
			window.requestAnimationFrame(updateMarquee);
		}
	}, { passive: true });
})();

(function () {
	const heroArt = document.querySelector('.hero-art');
	const draggableItems = document.querySelectorAll('.hero-note, .hero-tag, .hero-signature');
	if (!heroArt || !draggableItems.length) return;

	draggableItems.forEach(function (item) {
		item.addEventListener('pointerdown', function (event) {
			const artRect = heroArt.getBoundingClientRect();
			const itemRect = item.getBoundingClientRect();
			const offsetX = event.clientX - itemRect.left;
			const offsetY = event.clientY - itemRect.top;

			item.classList.add('is-dragging');
			item.setPointerCapture(event.pointerId);

			function moveItem(moveEvent) {
				const maxLeft = artRect.width - itemRect.width;
				const maxTop = artRect.height - itemRect.height;
				const left = Math.max(0, Math.min(maxLeft, moveEvent.clientX - artRect.left - offsetX));
				const top = Math.max(0, Math.min(maxTop, moveEvent.clientY - artRect.top - offsetY));

				item.style.left = `${left}px`;
				item.style.top = `${top}px`;
				item.style.right = 'auto';
				item.style.bottom = 'auto';
			}

			function stopDragging() {
				item.classList.remove('is-dragging');
				item.removeEventListener('pointermove', moveItem);
				item.removeEventListener('pointerup', stopDragging);
				item.removeEventListener('pointercancel', stopDragging);
			}

			item.addEventListener('pointermove', moveItem);
			item.addEventListener('pointerup', stopDragging);
			item.addEventListener('pointercancel', stopDragging);
			event.preventDefault();
		});
	});
})();
