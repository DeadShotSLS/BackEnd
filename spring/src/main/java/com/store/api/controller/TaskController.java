package com.store.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.store.api.exception.ResourceNotFoundException;
import com.store.api.model.Task;
import com.store.api.repository.TaskRepository;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TaskController {

    @Autowired
    TaskRepository taskRepository;

    @GetMapping("/task")
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PostMapping("/task")
    public Task createTask(@Valid @RequestBody Task task) {
        return taskRepository.save(task);
    }

    @GetMapping("/task/{id}")
    public Task getTaskById(@PathVariable(value = "id") Long taskId) {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));
    }

    @PutMapping("/task/{id}")
    public Task updateTask(@PathVariable(value = "id") Long taskId,
                                           @Valid @RequestBody Task taskDetails) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));

        task.setTitle(taskDetails.getTitle());
        task.setStatus(taskDetails.getStatus());

        Task updatedTask = taskRepository.save(task);
        return updatedTask;
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable(value = "id") Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));

        taskRepository.delete(task);

        return ResponseEntity.ok().build();
    }
}
