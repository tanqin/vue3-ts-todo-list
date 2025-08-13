import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface ITodo {
  id: number
  content: string
  completed: boolean
}

export const useTodoStore = defineStore(
  'todo',
  () => {
    // 待办列表
    const todoList = ref<ITodo[]>([])

    // 新增待办
    function addTodo(todo: ITodo) {
      todoList.value.push(todo)
    }

    // 删除待办
    function deleteTodo(id: number) {
      const todoIndex = todoList.value.findIndex((todo) => todo.id === id)
      todoList.value.splice(todoIndex, 1)
    }

    return { todoList, addTodo, deleteTodo }
  },
  {
    persist: true,
  },
)
