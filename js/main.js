window.onload = function start() {
	const form = document.getElementById("form");
	const input = document.getElementById("input");
	const todosUl = document.getElementById("todos");
	const filterOption = document.querySelector(".filter-todo");

	filterOption.addEventListener("change", filterTodo);

	const todos = JSON.parse(localStorage.getItem("todos"));

	if (todos) {
		todos.forEach((todo) => {
			addTodo(todo);
		});
	}

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		addTodo();
	});

	function addTodo(todo) {
		let todoText = input.value;
		if (todo) {
			todoText = todo.text;
		}

		if (todoText) {
			const todoEl = document.createElement("li");
			if (todo && todo.completed) {
				todoEl.classList.add("completed");
			}
			todoEl.innerText = todoText;

			todoEl.addEventListener("click", () => {
				todoEl.classList.toggle("completed");
				document.getElementById("waka").play();
				updateLS();
			});

			todoEl.addEventListener("contextmenu", (e) => {
				e.preventDefault();
				todoEl.remove();
				updateLS();
			});

			todosUl.appendChild(todoEl);
			// todosUl.insertBefore(todoEl, todosUl.childNodes[0]);
			input.value = "";
			updateLS();
		}
	}

	function filterTodo(e) {
		const todos = [...todosUl.children];
		console.log(todos);
		todos.forEach(function (todoEl) {
			switch (e.target.value) {
				case "all":
					todoEl.style.display = "flex";
					break;
				case "completed":
					if (todoEl.classList.contains("completed")) {
						todoEl.style.display = "flex";
					} else {
						todoEl.style.display = "none";
					}
					break;
				case "uncompleted":
					if (!todoEl.classList.contains("completed")) {
						todoEl.style.display = "flex";
					} else {
						todoEl.style.display = "none";
					}
					break;
			}
		});
	}

	function updateLS() {
		const todos = [];

		todosEl = document.querySelectorAll("li");

		todosEl.forEach((todoEl) => {
			todos.push({
				text: todoEl.innerText,
				completed: todoEl.classList.contains("completed"),
			});
		});

		localStorage.setItem("todos", JSON.stringify(todos));
	}

	let clearBtn = document.createElement("button");
	clearBtn.id = "clearButton";
	clearBtn.innerHTML = "Clear List";
	document.getElementById("form").appendChild(clearBtn);
	clearBtn.addEventListener("click", function () {
		localStorage.clear();
		location.reload();
	});
};
