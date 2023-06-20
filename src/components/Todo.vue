<template>
  <div style="max-width: 600px">
    <!-- Heading -->
    <h2>Todo</h2>
    <!-- Input -->
    <div class="d-flex mt-5">
      <input type="text" v-model="field" placeholder="Enter task" />
      <button @click="setTask">set</button>
    </div>

    <!-- Task table -->
    <div>
      <div>
        <div>
          <div scope="col">Tasks</div>
        </div>
      </div>
      <div>
        <Task
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @delete-task="deleteTask"
          @change-status="changeStatus"
          @edit-task="editTask"
          @set-changes="setChanges"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import Task from "./Task.vue";
export default {
  name: "todo",
  components: { Task },
  data() {
    return {
      init:false,
      field: "",
    };
  },
  computed: {
    ...mapGetters(["getTodos"]),
    ...mapState({
      tasks: (state) => state.todos,
    }),
  },
  mounted() {
    if (localStorage.name) {
      this.name = localStorage.name;
    }
  },
  methods: {
    ...mapMutations(["addTodo", "changeStatus", "removeTodo", "editTodo"]),
    ...mapActions(["setValue"]),
    setTask() {
      this.setValue({
        type: "addTodo",
        value: { name: this.field, id: "" + new Date(), status: false },
      });
    },
    changeStatus(id) {
      this.setValue({ type: "changeStatus", value: id });
    },
    deleteTask(id) {
      this.setValue({ type: "removeTodo", value: id });
    },
    editTask(id, name) {
      this.setValue({ type: "editTodo", value: { id, name } });
    },
    setChanges(){
      localStorage.setItem("todo", JSON.stringify(this.tasks));
    }
  },
  mounted() {
    const todos = localStorage.getItem("todo");
    if (todos != undefined && todos != null) {
      this.setValue({
        type: "getFromLocalStorage",
        value: JSON.parse(todos),
      });
    }
    this.init = true
  },
  watch: {
    tasks(prev,carrent) {
      this.init && localStorage.setItem("todo", JSON.stringify(this.tasks));
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
.line-through {
  text-decoration: line-through;
}
</style>
