let todos = [{
        id: 1,
        contents: "HTML",
        completed: true,
    },
    {
        id: 2,
        contents: "CSS",
        completed: false,
    },
    {
        id: 3,
        contents: "JS",
        completed: true,
    },
];

//* queryselectors
let navId = "all";
const $input = document.querySelector(".input");
const $inputTodo = document.querySelector(".input-todo");
const $ul = document.querySelector(".todo_list");
const $button = document.querySelector("button");
const $todos = document.querySelector(".todos");
const $clearCompleted = document.querySelector(".clear-completed > .btn");
const $activeTodos = document.querySelector(".active-todos");
const $completedTodos = document.querySelector(".completed-todos");
const $completeAll = document.getElementById("ck-complete-all");
const $nav = document.querySelector(".nav");

function todoContent() {
    let filterTodos = [];

    if (navId === "all") filterTodos = [...todos];
    else if (navId === "active")
        filterTodos = todos.filter((todo) => !todo.completed);
    else filterTodos = todos.filter((todo) => todo.completed);

    html = "";

    //* sort 순서 정렬
    filterTodos.sort((a, b) => b.id - a.id);
    filterTodos.forEach((todo) => {
        html += `<li id = "${todo.id}" >
        <input class = "checkbox" type = "checkbox" ${
          todo.completed ? "checked" : ""
        }>${todo.contents}<button class = "del"> 🗑</button>
        </li>`;
    });

    $ul.innerHTML = html;

    //* complete 개수 left 개수 출력
    $activeTodos.innerHTML = todos.filter(
        (todo) => todo.completed !== true
    ).length;
    $completedTodos.innerHTML = todos.filter(
        (todo) => todo.completed === true
    ).length;
}

window.onload = todoContent();

//* id 값 생성기
const idGenerator = () => {
    return todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
}

//* 제거
const removeTodo = (id) => {
    todos = todos.filter((todo) => todo.id !== +id);
    todoContent();
};

//* completed 변환
const completedTodo = (id) => {
    todos = todos.map((todo) =>
        todo.id === +id ? {
            ...todo,
            completed: !todo.completed,
        } :
        todo
    );
    todoContent();
};

//* functions
$ul.onclick = (e) => {
    if (!e.target.matches(".todo_list > li > .del")) return;
    removeTodo(e.target.parentNode.id);
};

$ul.onchange = (e) => {
    completedTodo(e.target.parentNode.id);
};

$input.onclick = (e) => {
    newTodo = {
        id: idGenerator(),
        contents: $inputTodo.value,
        completed: false,
    };

    todos = [...todos, newTodo];
    todoContent();
    $inputTodo.value = "";
};

$inputTodo.onkeyup = (e) => {
    if (e.keyCode !== 13 || $inputTodo.value.trim() === "") return;
    newTodo = {
        id: idGenerator(),
        contents: $inputTodo.value,
        completed: false,
    };

    todos = [...todos, newTodo];
    todoContent();
    $inputTodo.value = "";
};

$ul.onchange = (e) => {
    if (!e.target.matches("li > input")) return;
    todos = todos.map(
        (todo) =>
        (todo =
            todo.id === +e.target.parentNode.id ? {
                ...todo,
                completed: !todo.completed,
            } :
            todo)
    );
    todoContent();
};

$clearCompleted.onclick = (e) => {
    todos = todos.filter((todo) => todo.completed !== true);
    todoContent();
};

//* 전체완료버튼
$completeAll.onchange = () => {
    todos = todos.map(todo => ({
        ...todo,
        completed: $completeAll.checked
    }))
    todoContent();
};

// $completeAll.onchange = (e) => {
//     if (e.target.checked) {
//         todos = todos.map(
//             (todo) =>
//             (todo = {
//                 ...todo,
//                 completed: true,
//             })
//         );
//         todoContent();
//         return;
//     }
//     todos = todos.map(
//         (todo) =>
//         (todo = {
//             ...todo,
//             completed: false,
//         })
//     );
//     todoContent();
// };

//* active class 추가 제거
$nav.onclick = (e) => {
    [...$nav.children].forEach((item) => item.classList.remove("active"));
    e.target.className = "active";
    navId = e.target.id;
    todoContent();
};