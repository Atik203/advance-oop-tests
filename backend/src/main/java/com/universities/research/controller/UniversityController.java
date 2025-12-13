package com.universities.research.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.universities.research.model.University;
import com.universities.research.service.UniversityService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/universities")
@RequiredArgsConstructor
public class UniversityController {
    private final UniversityService service;

    @GetMapping
    public ResponseEntity<List<University>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<University> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<University> create(@RequestBody University university) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(university));
    }

    @PutMapping("/{id}")
    public ResponseEntity<University> update(@PathVariable Long id, @RequestBody University university) {
        return ResponseEntity.ok(service.update(id, university));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<University> partialUpdate(@PathVariable Long id, @RequestBody University university) {
        return ResponseEntity.ok(service.partialUpdate(id, university));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
