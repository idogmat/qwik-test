<template>
    <div>
        <input v-if="editMode" v-model="editField" type="text">
      <span v-else
        @click="changeStatus"
        :style="{
          'cursor': 'pointer',
          'text-decoration':  task.status ? 'line-through' : 'auto',
        }"
      >
        {{ task.name }}
      </span>
    <button @click="deleteTask" >del</button>
    <button @click="changeMode" >{{editMode ? 'save' : 'edit'}}</button>
    </div>
</template>
<script>
import ITodo from '../store/index'
export default {
    name:'task',
    props:['task'],
    data(){
        return{
            editField: this.task.name || "",
            editMode:false
        }
    },
    methods: {
        changeStatus(){
            this.$emit('change-status', this.task.id )
            this.$emit('set-changes')
            
        },
        deleteTask(){
            this.$emit('delete-task', this.task.id )
            this.$emit('set-changes')
        },
        changeMode(){
            this.editMode=!this.editMode 
            if(!this.editMode) this.editTask()
        },
        editTask(){
            this.$emit( 'edit-task',this.task.id, this.editField)
            this.$emit('set-changes')
        },
    }
}

</script>
<style scoped></style>
