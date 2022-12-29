<script setup>
import { onMounted, ref, nextTick } from 'vue';
import Popup from '../components/Popup.vue'
import draggable from 'vuedraggable'
import TaskServices from '../firebase/task/task'

const formCreateTask = ref({})
const editing = ref({})
const formCreateGroup = ref({})
const tasks = ref([])
const taskGroups = ref([])
const formEditTask = ref({})
const selectedTask = ref(null)
const showPopupDetail = ref(false)
const showPopupCreateGroup = ref(false)
const showPopupCreateTask = ref(false)
const createGroup = () => {
  try {
    if (!formCreateGroup.value.name) {
      Swal.fire('Error!', 'Invalid data', 'error')
      nextTick(() => {
        showPopupCreateGroup.value = true
      })
      return
    }
    TaskServices.createTaskGroup(JSON.parse(JSON.stringify(formCreateGroup.value)))
    formCreateGroup.value = {}
    showPopupCreateGroup.value = false
    Swal.fire('Added!', '', 'success')
  } catch (error) {
    Swal.fire('Error!', String(error), 'error')
  }
}
const deleteTask = () => {
  Swal.fire({
    title: 'Are you sure want to remove this item? This action cannot be undo.',
    showCancelButton: true,
    confirmButtonText: 'Remove',
  }).then((result) => {
    if (result.isConfirmed) {
      TaskServices.deleteTask(formEditTask.value.id)
      selectedTask.value = null
      showPopupDetail.value = false
    }
  })
}
const createTask = () => {
  try {
    if (!formCreateTask.value.groupId || !formCreateTask.value.name) {
      Swal.fire('Error!', 'Invalid data', 'error')
      nextTick(() => {
        showPopupCreateTask.value = true
      })
      return
    }
    TaskServices.createTask(JSON.parse(JSON.stringify(formCreateTask.value)))
    formCreateTask.value.name = ''
    formCreateTask.value.description = ''
    showPopupCreateTask.value = false
    Swal.fire('Added!', '', 'success')
  } catch (error) {
    Swal.fire('Error!', String(error), 'error')
  }
}
const onMoveTask = (e, groupObj) => {
  if (e.added) {
    TaskServices.updateTask(e.added.element.id, { groupId: groupObj.id })
  }
  if (e.added || e.moved || e.removed) {
    TaskServices.updateTaskGroup(groupObj.id, {
      lastSortTasks: groupObj.tasks.map(e => e.id)
    })
  }
}
const mapTaskToGroup = () => {
  taskGroups.value = taskGroups.value.map(e => {
    let groupTasks = tasks.value.filter(task => String(task.groupId) === String(e.id))
    if (e.lastSortTasks) {
      const added = []
      let sorted = e.lastSortTasks.reduce((resultArr, id) => {
        const item = groupTasks.find(e => e.id === id)
        if (item) {
          resultArr.push(item)
          added.push(item.id)
        }
        return resultArr
      }, [])
      sorted = [...sorted, ...groupTasks.filter(e => !added.includes(e.id))]
      groupTasks = sorted
    }
    return {
      ...e,
      tasks: groupTasks
    }
  })
}
const openEditTaskField = field => {
  editing.value[field] = !editing.value[field]
  nextTick(() => {
    document.querySelector(`#task-${field}-edit`).focus()
  })
}
const onBlurEditTaskField = field => {
  editing.value[field] = false
  if (field === 'name' && !formEditTask.value[field]) {
    formEditTask.value[field] = selectedTask.value[field]
    return
  }
  TaskServices.updateTask(formEditTask.value.id, { [field]: formEditTask.value[field] })
}
const onChangeGroup = groupId => {
  TaskServices.updateTask(formEditTask.value.id, { groupId })
}
const viewDetailTask = taskObj => {
  showPopupDetail.value = true
  selectedTask.value = JSON.parse(JSON.stringify(taskObj))
  formEditTask.value = JSON.parse(JSON.stringify(taskObj))
}
onMounted(() => {
  TaskServices.getTasks(data => {
    tasks.value = data
    mapTaskToGroup()
  })
  TaskServices.getTaskGroups((data = []) => {
    taskGroups.value = data
    mapTaskToGroup()
  })
})
</script>
<template>
  <div class="h-full flex flex-col p-4">
    <h1 class="text-4xl font-bold">Tasks Management</h1>
    <div class="flex-1 overflow-y-auto">
      <div class="my-4">
        <button class="py-2 px-10 rounded-md bg-blue-400 text-white" @click="showPopupCreateGroup = true">Create Group</button>
        <Popup v-model="showPopupCreateGroup" title="Create Group" @ok="createGroup">
          <form @submit.stop="createGroup">
            <div>
              <label for="groupName"></label>
              <input id="groupName" v-model="formCreateGroup.name" type="text" class="border-2 w-full p-2 rounded-sm" placeholder="Group Name...">
            </div>
          </form>
        </Popup>
        <button class="py-2 px-10 rounded-md bg-blue-400 text-white ml-5" @click="showPopupCreateTask = true">Create Task</button>
        <Popup v-model="showPopupCreateTask" title="Create Task" @ok="createTask">
          <form @submit.stop="createTask">
            <div>
              <label for="groupId"></label>
              <v-select appendToBody v-model="formCreateTask.groupId" :clearable="false" :options="taskGroups" label="name" :reduce="e => e.id"></v-select>
            </div>
            <div class="mt-2">
              <label for="taskName"></label>
              <input id="taskName" v-model="formCreateTask.name" type="text" class="border-2 w-full p-2 rounded-sm" placeholder="Task Name...">
            </div>
            <div class="mt-2">
              <label for="taskDescription"></label>
              <textarea id="taskDescription" v-model="formCreateTask.description" type="text" class="border-2 w-full p-2 rounded-sm" placeholder="Description..."></textarea>
            </div>
          </form>
        </Popup>
      </div>
      <div class="flex flex-nowrap -mr-2">
        <div v-for="(groupObj, gIndex) in taskGroups" :key="`group-${gIndex}`" class="flex-[0_0_25%] px-2">
          <div class="p-2  border-[1px] rounded-md">
            <h3 class="text-2xl font-bold">{{ groupObj.name }}</h3>
            <div class="mt-2 pt-2 border-t-2">
              <draggable
                :list="groupObj.tasks"
                group="task"
                class="list-group"
                @change="onMoveTask($event, groupObj)"
                itemKey="id"
              >
                <template #item="{ element }">
                  <div class="list-group-item border-2 p-1 rounded-md mt-1 first:mt-0" @click="viewDetailTask(element)">
                    {{ element.name }}
                  </div>
                </template>
              </draggable>
              <template v-if="!(groupObj.tasks && groupObj.tasks.length)">
                No tasks.
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Popup v-if="selectedTask" v-model="showPopupDetail" hideButtons>
      <template #title>
        <div class="flex justify-between items-center mb-5">
          <div class="overflow-x-auto text-xl font-bold">
            <input v-if="editing['name']" v-model="formEditTask.name" type="text" class="border-2 w-full p-2 rounded-sm" placeholder="Enter name..." id="task-name-edit" @blur="onBlurEditTaskField('name')">
            <h2 v-else @click="openEditTaskField('name')">{{ formEditTask.name }}</h2>
          </div>
          <div>
            <button class="py-2 px-10 rounded-md bg-red-400 text-white" @click="deleteTask">Delete</button>
          </div>
        </div>
      </template>
      <v-select appendToBody v-model="formEditTask.groupId" @update:modelValue="onChangeGroup" :clearable="false" :options="taskGroups" label="name" :reduce="e => e.id"></v-select>
      <div class="mt-3 text-sm font-semibold text-gray-500">Description:</div>
      <textarea v-if="editing['description']" v-model="formEditTask.description" type="text" class="border-2 w-full p-2 rounded-sm" placeholder="Enter description..." id="task-description-edit" @blur="onBlurEditTaskField('description')"></textarea>
      <div v-else class="whitespace-pre border-2 p-1 rounded-md" @click="openEditTaskField('description')">
        <span v-if="formEditTask.description">{{ formEditTask.description  }}</span>
        <span v-else class="text-gray-200">Click to edit description...</span>
      </div>
    </Popup>
  </div>
</template>