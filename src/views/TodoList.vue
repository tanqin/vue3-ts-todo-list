<script setup lang="ts">
import { useTodoStore, type ITodo } from '@/stores/todo'
import { ref } from 'vue'

const { todoList, addTodo, deleteTodo } = useTodoStore()

// 输入框内容
const inputContent = ref('')
// 当前编辑待办项
const currentTodo = ref<ITodo>()

// 新增/更新待办
function handleAddOrUpdate() {
  // 判断是否处于编辑状态
  if (currentTodo.value) {
    currentTodo.value.content = inputContent.value
    inputContent.value = ''
    currentTodo.value = undefined
  } else {
    addTodo({
      id: Date.now(),
      content: inputContent.value,
      completed: false,
    })
  }
  inputContent.value = ''
}

// 编辑待办
function handleEdit(todo: ITodo) {
  currentTodo.value = todo
  inputContent.value = todo.content
}
</script>

<template>
  <main class="todo-list-container">
    <h1>Todo List</h1>
    <form @submit.prevent class="input-container">
      <input type="text" v-model="inputContent" /> <button @click="handleAddOrUpdate">添加</button>
    </form>
    <ul>
      <li v-for="todo in todoList" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" />
        <span class="todo-content" :class="{ completed: todo.completed }" :title="todo.content">{{
          todo.content
        }}</span>
        <button @click="handleEdit(todo)">编辑</button>
        <button @click="deleteTodo(todo.id)">删除</button>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.todo-list-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input-container {
  padding-bottom: 5px;
  margin-bottom: 5px;
  border-bottom: 1px solid;
}

.todo-content {
  display: inline-block;
  width: 170px;
  padding: 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.completed {
  text-decoration: line-through;
}
</style>
