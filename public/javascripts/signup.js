const form = document.querySelector('form');
	const url = form.action;
	const body = {};
  const inputs = form.querySelectorAll('input');

	inputs.forEach((input) => {
		body[input.name] = input.value;
	});

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const isValid = validate(form);

		if (isValid) {
			submitUserForm(url, body);
		}
	});

	function validate(element) {
		const inputs = element.querySelectorAll('input');
		let isValid = true;
		inputs.forEach((input) => {
			if (input.value === '') {
				isValid = false;
				input.classList.add('is-invalid');
			} else {
				input.classList.remove('is-invalid');
			}
		});

		if (!isValid) {
			alert('Please fill all the fields');
		} else {
			if (username.length < 3) {
				alert('Username must be at least 3 characters');
				return false;
			}
			if (password.length < 3) {
				alert('Password must be at least 3 characters');
				return false;
			}
		}

		return isValid;
	}

	function submitUserForm(url, body) {
		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify(body),
			redirect: 'follow',
		};

		fetch(url, requestOptions)
			.then((response) => {
				if (response.status == 200) {
					alert('User created successfully');
					window.location.href = '/';
				} else if (response.status == 400) {
					alert('User already exists');
				}
			})
			.catch((error) => console.log('error', error));
	}