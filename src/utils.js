export const createTodoItem = (label) => {
    return {
        label,
        important: false,
        done: false,
        id: new Date().valueOf()
    }
};

export const localStorageHelper = {
    load() {
        const stored = localStorage.getItem("todoData");
        return stored == null ? undefined : JSON.parse(stored);
    },
    store(value) {
        localStorage.setItem("todoData", JSON.stringify(value));
    }
};
