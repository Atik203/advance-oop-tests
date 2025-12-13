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

import com.universities.research.model.Collaboration;
import com.universities.research.service.CollaborationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/collaborations")
@RequiredArgsConstructor
public class CollaborationController {
    private final CollaborationService service;

    @GetMapping
    public ResponseEntity<List<Collaboration>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Collaboration> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Collaboration> create(@RequestBody Collaboration collaboration) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(collaboration));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Collaboration> update(@PathVariable Long id, @RequestBody Collaboration collaboration) {
        return ResponseEntity.ok(service.update(id, collaboration));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Collaboration> partialUpdate(@PathVariable Long id, @RequestBody Collaboration collaboration) {
        return ResponseEntity.ok(service.partialUpdate(id, collaboration));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
