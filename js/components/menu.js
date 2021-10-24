import { getUser } from '../libs/localStorageHelpers.js';

let menu = document.querySelector('.menu');
(function () {
	if (getUser('user')) {
		let getUserName = JSON.parse(getUser('user')).email;
		menu.innerHTML = `
		<nav class="navbar navbar-expand-lg navbar-light bg-success">
			<div class="container">
				<a class="navbar-brand" href="index.html">Articles list</a>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item">
							<a class="nav-link active" aria-current="page" href="index.html">Home</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="favourites.html">Favourites</a>
						</li>	
						<li class="nav-item">
							<a class="nav-link" href="user.html">Modify Articles</a>
						</li>					
					</ul>
					<div>
						<p class="fs-4"> Welcome <span class=" font-weight-bold text-light">${getUserName}</span></p>
					</div>	
					<button class="logout btn btn-danger">Logout</button>								
				</div>									
			</div>
		</nav>
		`;
	} else {
		menu.innerHTML = `
		<nav class="navbar navbar-expand-lg navbar-light bg-success">
			<div class="container">
				<a class="navbar-brand" href="index.html">Articles list</a>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item">
							<a class="nav-link active" aria-current="page" href="index.html">Home</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="favourites.html">Favourites</a>
						</li>						
					</ul>	
					<a class="btn btn-danger" href="login.html">Login</a>						
				</div>								
			</div>
		</nav>
		`;
	}
	const logout = document.querySelector('.logout');
	if (logout !== null) {
		logout.onclick = function () {
			localStorage.clear();
			window.location.href = './index.html';
		};
	}
})();
