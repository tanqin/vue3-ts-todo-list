<script setup lang="ts">
import { useTodoStore, type ITodo } from '@/stores/todo'
import { ref } from 'vue'

const { todoList, addTodo, deleteTodo } = useTodoStore()

// 过滤后待办列表
const filterTodoList = ref<ITodo[]>(todoList)
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

// 查询待办
function handleSearch() {
  filterTodoList.value = todoList.filter((todo) => todo.content.includes(inputContent.value.trim()))
}

// 重置待办
function handleReset() {
  filterTodoList.value = todoList
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
      <input type="text" v-model="inputContent" />
      <button type="submit" @click="handleAddOrUpdate">添加</button>
      <button @click="handleSearch">查询</button>
      <button @click="handleReset">重置</button>
    </form>
    <ul>
      <li class="todo" v-for="todo in filterTodoList" :key="todo.id">
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

.todo {
  line-height: 1;
  padding: 5px 0;
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
